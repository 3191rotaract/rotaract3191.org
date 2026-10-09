import { GOOGLE_SCRIPT_URL } from './sheetsConfig.mjs'
import { validateFields } from './validateFields.mjs'
import { validateFiles } from './validateFiles.mjs'

function jsonResponse(status, data) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

/**
 * Builds a Netlify Functions v2 handler for a validate-then-append-to-Google-Sheet
 * form. `sheetName` selects (or creates) a tab in the Apps Script's spreadsheet
 * — either a fixed string, or a function of the validated fields (e.g. to route
 * each submission to a different tab based on a field the user picked, such as
 * an avenue). `fields` describes the expected string fields, same shape as
 * createFormHandler. `scriptUrl` overrides which Apps Script deployment (and so
 * which spreadsheet) the submission is sent to; defaults to GOOGLE_SCRIPT_URL.
 * `files` (optional) describes photo/document fields, same shape as `fields`
 * but with `mimePattern`/`maxBytes` instead of `pattern`/`maxLength` — the
 * Apps Script uploads each to Drive and writes the share link into that
 * column, so treat it like any other field everywhere else (headers, etc).
 *
 * Why this goes through a Netlify Function instead of the browser calling Apps
 * Script directly: Apps Script Web Apps don't send CORS headers, so a direct
 * browser fetch has to use mode: "no-cors", which makes the response opaque —
 * you can never tell whether the write actually succeeded or the URL was wrong.
 * Server-to-server requests (this function calling Apps Script) aren't subject
 * to CORS at all, so we get Apps Script's real JSON response back and can
 * surface a genuine success/error state to the user.
 */
export function createSheetsFormHandler({ sheetName, fields, files, uniqueFields, scriptUrl }) {
  const url = scriptUrl ?? GOOGLE_SCRIPT_URL

  return async (req) => {
    if (req.method !== 'POST') {
      return jsonResponse(405, { error: 'Method not allowed' })
    }

    if (url.includes('PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE')) {
      console.error('Apps Script URL is not configured in _lib/sheetsConfig.mjs')
      return jsonResponse(500, { error: 'Form is not configured yet. Please try again later.' })
    }

    let body
    try {
      body = await req.json()
    } catch {
      return jsonResponse(400, { error: 'Invalid JSON body' })
    }

    if (body === null || typeof body !== 'object' || Array.isArray(body)) {
      return jsonResponse(400, { error: 'Invalid request body' })
    }

    const { errors, clean } = validateFields(fields, body)
    const { errors: fileErrors, clean: cleanFiles } = files ? validateFiles(files, body) : { errors: [], clean: {} }
    const allErrors = [...errors, ...fileErrors]

    if (allErrors.length > 0) {
      return jsonResponse(400, { error: allErrors.join('; ') })
    }

    const resolvedSheetName = typeof sheetName === 'function' ? sheetName(clean) : sheetName

    try {
      const scriptRes = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sheetName: resolvedSheetName, fields: clean, files: cleanFiles, uniqueFields }),
        redirect: 'follow',
      })

      const data = await scriptRes.json().catch(() => ({}))

      if (!scriptRes.ok) {
        console.error('Apps Script request failed:', scriptRes.status, data)
        if (scriptRes.status === 401 || scriptRes.status === 403) {
          return jsonResponse(502, {
            error: 'The form backend rejected the request. Please verify the Apps Script Web App is deployed with "Who has access: Anyone".',
          })
        }
        return jsonResponse(502, { error: `The form backend returned an error (${scriptRes.status}). Please try again later.` })
      }

      // data.ok === false here means Apps Script deliberately rejected the
      // submission (e.g. a uniqueFields duplicate) — surface its message
      // rather than the generic failure text.
      if (data.ok !== true) {
        return jsonResponse(409, { error: data.error || 'This submission could not be processed.' })
      }

      return jsonResponse(201, { ok: true })
    } catch (err) {
      console.error('Apps Script request failed:', err)
      return jsonResponse(502, { error: 'Something went wrong. Please try again later.' })
    }
  }
}
