import { createSheetsFormHandler } from './_lib/sheetsFormHandler.mjs'
import { TARANG_COMMITTEE_SCRIPT_URL } from './_lib/sheetsConfig.mjs'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default createSheetsFormHandler({
  scriptUrl: TARANG_COMMITTEE_SCRIPT_URL,
  sheetName: 'Tarang Committee Signup',
  fields: [
    { name: 'name', required: true, maxLength: 120 },
    { name: 'email', required: true, maxLength: 160, pattern: EMAIL_PATTERN },
    { name: 'phone', required: true, maxLength: 20 },
    { name: 'zoneName', required: true, maxLength: 80 },
    { name: 'clubName', required: true, maxLength: 160 },
    { name: 'designation', required: true, maxLength: 100 },
    { name: 'interestedCommittee', required: true, maxLength: 1000 },
    { name: 'motivation', required: true, maxLength: 2000 },
  ],
  uniqueFields: [
    { name: 'email', message: 'This email address has already been used for a Tarang Committee Signup.' },
    { name: 'phone', message: 'This contact number has already been used for a Tarang Committee Signup.' },
  ],
})
