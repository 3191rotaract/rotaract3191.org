import { createSheetsFormHandler } from './_lib/sheetsFormHandler.mjs'
import { AVENUE_DIRECTORS_SCRIPT_URL } from './_lib/sheetsConfig.mjs'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// One tab per avenue in a dedicated spreadsheet — the tab name is the
// avenue itself, so this must stay in sync with the AVENUES list in
// src/pages/AvenueDirectorsData.jsx.
const AVENUES = [
  'Club Service',
  'Community Service',
  'International Service',
  'Professional Development',
  'Public Image',
  'SAA',
  'Next Gen',
  'Social Media',
  'Web & Tech',
  'Club Learning Facilitator',
  'Club Foundation Chairman',
  'Events',
  'Design and Visual Communications',
  'Treasurer',
  'Editorial',
  'CSR',
]

export default createSheetsFormHandler({
  scriptUrl: AVENUE_DIRECTORS_SCRIPT_URL,
  sheetName: (fields) => fields.avenue,
  fields: [
    { name: 'avenue', required: true, maxLength: 60, oneOf: AVENUES },
    { name: 'name', required: true, maxLength: 120 },
    { name: 'clubName', required: true, maxLength: 120 },
    { name: 'phone', required: true, maxLength: 20 },
    { name: 'riId', required: false, maxLength: 30 },
    { name: 'email', required: true, maxLength: 160, pattern: EMAIL_PATTERN },
  ],
  uniqueFields: [
    { name: 'riId', message: 'This RI ID has already been submitted for this avenue.' },
  ],
})
