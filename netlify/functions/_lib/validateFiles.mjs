const MAX_FILENAME_LENGTH = 120
const BASE64_PATTERN = /^[A-Za-z0-9+/]+={0,2}$/

/**
 * Validates the { name, mimeType, data } file objects a form sends alongside
 * its plain string fields (data is base64, no data: URL prefix). Mirrors
 * validateFields.mjs: rejects anything malformed outright rather than
 * passing it through to the Apps Script's base64 decoder.
 */
export function validateFiles(fileFields, body) {
  const errors = []
  const clean = {}

  for (const field of fileFields) {
    const raw = body[field.name]

    if (raw === undefined || raw === null) {
      if (field.required) errors.push(`${field.name} is required`)
      continue
    }

    if (typeof raw !== 'object' || Array.isArray(raw)) {
      errors.push(`${field.name} is not valid`)
      continue
    }

    const { name, mimeType, data } = raw

    if (typeof mimeType !== 'string' || (field.mimePattern && !field.mimePattern.test(mimeType))) {
      errors.push(`${field.name} must be an image`)
      continue
    }

    if (typeof data !== 'string' || data.length === 0 || !BASE64_PATTERN.test(data)) {
      errors.push(`${field.name} is not valid`)
      continue
    }

    const approxBytes = Math.floor((data.length * 3) / 4)
    if (field.maxBytes && approxBytes > field.maxBytes) {
      errors.push(`${field.name} must be smaller than ${Math.round(field.maxBytes / (1024 * 1024))}MB`)
      continue
    }

    const safeName =
      typeof name === 'string' && name.trim()
        ? name.trim().slice(0, MAX_FILENAME_LENGTH).replace(/[\\/]/g, '_')
        : `${field.name}.jpg`

    clean[field.name] = { name: safeName, mimeType, data }
  }

  return { errors, clean }
}
