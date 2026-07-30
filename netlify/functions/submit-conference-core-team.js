import { createSheetsFormHandler } from './_lib/sheetsFormHandler.mjs'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const YES_NO_PATTERN = /^(yes|no)$/
const IMAGE_PATTERN = /^image\/(jpeg|jpg|png|webp)$/

// Keep in sync with the POSITIONS list in
// src/pages/ConferenceCoreTeam.jsx.
const POSITIONS = ['Conference Co-Chair', 'Joint Secretary']

export default createSheetsFormHandler({
  sheetName: 'Conference Core Team',
  fields: [
    { name: 'position', required: true, maxLength: 40, oneOf: POSITIONS },
    { name: 'name', required: true, maxLength: 120 },
    { name: 'email', required: true, maxLength: 160, pattern: EMAIL_PATTERN },
    { name: 'phone', required: true, maxLength: 20 },
    { name: 'riId', required: true, maxLength: 30 },
    { name: 'clubName', required: true, maxLength: 120 },
    { name: 'currentRole', required: true, maxLength: 80 },
    { name: 'districtPositions', required: true, maxLength: 300 },
    { name: 'handledEvents', required: true, maxLength: 3, pattern: YES_NO_PATTERN },
    { name: 'handledEventsDetails', required: false, maxLength: 2000 },
    { name: 'vaayuVision', required: true, maxLength: 2000 },
  ],
  files: [
    { name: 'formalPhoto', required: true, maxBytes: 6 * 1024 * 1024, mimePattern: IMAGE_PATTERN },
    { name: 'casualPhoto', required: true, maxBytes: 6 * 1024 * 1024, mimePattern: IMAGE_PATTERN },
  ],
  uniqueFields: [
    { name: 'riId', message: 'This RI ID has already been submitted for the Conference Core Team.' },
  ],
})
