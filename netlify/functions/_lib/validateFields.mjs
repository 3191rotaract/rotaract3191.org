/**
 * Shared string-field validator used by both the MongoDB-backed form handler
 * and the Google-Sheets-backed one. Rejects anything that isn't a plain
 * string outright (blocks injection payloads like { "email": { "$ne": null } }).
 */
export function validateFields(fields, body) {
  const errors = []
  const clean = {}

  for (const field of fields) {
    const raw = body[field.name]

    if (typeof raw !== 'string') {
      if (field.required) errors.push(`${field.name} is required`)
      continue
    }

    const value = raw.trim()

    if (field.required && value.length === 0) {
      errors.push(`${field.name} is required`)
      continue
    }

    if (field.maxLength && value.length > field.maxLength) {
      errors.push(`${field.name} must be ${field.maxLength} characters or fewer`)
      continue
    }

    if (field.pattern && value.length > 0 && !field.pattern.test(value)) {
      errors.push(`${field.name} is not valid`)
      continue
    }

    clean[field.name] = value
  }

  return { errors, clean }
}
