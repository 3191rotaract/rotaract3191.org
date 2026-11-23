import { createSheetsFormHandler } from './_lib/sheetsFormHandler.mjs'
import { TARANG_COMMITTEE_SCRIPT_URL } from './_lib/sheetsConfig.mjs'

const PARTICIPANT_PATTERN = /^[1-9]\d*$/
const IMAGE_PATTERN = /^image\/(jpeg|jpg|png|webp)$/

export default createSheetsFormHandler({
  scriptUrl: TARANG_COMMITTEE_SCRIPT_URL,
  sheetName: 'Tarang Organization Registrations',
  fields: [
    { name: 'zoneName', required: true, maxLength: 80 },
    { name: 'clubName', required: true, maxLength: 160 },
    { name: 'clubId', required: true, maxLength: 40 },
    { name: 'organizationName', required: true, maxLength: 200 },
    { name: 'organizationAddress', required: true, maxLength: 2000 },
    { name: 'expectedParticipants', required: true, maxLength: 10, pattern: PARTICIPANT_PATTERN },
    { name: 'pocName', required: true, maxLength: 120 },
    { name: 'pocContact', required: true, maxLength: 20 },
  ],
  files: [
    { name: 'paymentScreenshot', required: true, maxBytes: 6 * 1024 * 1024, mimePattern: IMAGE_PATTERN },
  ],
})
