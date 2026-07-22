import { createSheetsFormHandler } from './_lib/sheetsFormHandler.mjs'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default createSheetsFormHandler({
  sheetName: 'Web & Tech Directors Data',
  fields: [
    { name: 'name', required: true, maxLength: 120 },
    { name: 'clubName', required: true, maxLength: 120 },
    { name: 'phone', required: true, maxLength: 20 },
    { name: 'email', required: true, maxLength: 160, pattern: EMAIL_PATTERN },
  ],
  uniqueFields: [
    { name: 'email', message: 'This email address has already been submitted for Web & Tech Directors Data.' },
  ],
})
