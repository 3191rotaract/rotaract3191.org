import { GOOGLE_SCRIPT_URL } from './sheetsConfig.mjs'
import { validateFields } from './validateFields.mjs'

function jsonResponse(status, data) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

/**
 * Builds a Netlify Functions v2 handler for a validate-then-append-to-Google-Sheet
 * form. `sheetName` selects (or creates) a tab in the Apps Script's spreadsheet;
 * `fields` describes the expected string fields, same shape as createFormHandler.
 *
 * Why this goes through a Netlify Function instead of the browser calling Apps
 * Script directly: Apps Script Web Apps don't send CORS headers, so a direct
 * browser fetch has to use mode: "no-cors", which makes the response opaque —
 * you can never tell whether the write actually succeeded or the URL was wrong.
 * Server-to-server requests (this function calling Apps Script) aren't subject
 * to CORS at all, so we get Apps Script's real JSON response back and can
 * surface a genuine success/error state to the user.
 */
export function createSheetsFormHandler({ sheetName, fields }) {
  return async (req) => {
    if (req.method !== 'POST') {
      return jsonResponse(405, { error: 'Method not allowed' })
    }

    if (GOOGLE_SCRIPT_URL.includes('PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE')) {
      console.error('GOOGLE_SCRIPT_URL is not configured in _lib/sheetsConfig.mjs')
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

    if (errors.length > 0) {
      return jsonResponse(400, { error: errors.join('; ') })
    }

    try {
      const scriptRes = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sheetName, fields: clean }),
        redirect: 'follow',
      })

      const data = await scriptRes.json().catch(() => ({}))

      if (!scriptRes.ok || data.ok !== true) {
        console.error('Apps Script rejected the submission:', scriptRes.status, data)
        return jsonResponse(502, { error: 'Something went wrong. Please try again later.' })
      }

      return jsonResponse(201, { ok: true })
    } catch (err) {
      console.error('Apps Script request failed:', err)
      return jsonResponse(502, { error: 'Something went wrong. Please try again later.' })
    }
  }
}
