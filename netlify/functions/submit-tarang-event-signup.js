import { createSheetsFormHandler } from './_lib/sheetsFormHandler.mjs'
import { TARANG_COMMITTEE_SCRIPT_URL } from './_lib/sheetsConfig.mjs'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const YES_NO_PATTERN = /^(yes|no)$/

export default createSheetsFormHandler({
  scriptUrl: TARANG_COMMITTEE_SCRIPT_URL,
  sheetName: 'Tarang Event SignUp',
  fields: [
    { name: 'zoneName', required: true, maxLength: 80 },
    { name: 'clubName', required: true, maxLength: 160 },
    { name: 'clubId', required: true, maxLength: 40 },
    { name: 'presidentName', required: true, maxLength: 120 },
    { name: 'presidentContact', required: true, maxLength: 20 },
    { name: 'presidentEmail', required: true, maxLength: 160, pattern: EMAIL_PATTERN },
    { name: 'secretaryName', required: true, maxLength: 120 },
    { name: 'secretaryContact', required: true, maxLength: 20 },
    { name: 'secretaryEmail', required: true, maxLength: 160, pattern: EMAIL_PATTERN },
    { name: 'eventName', required: true, maxLength: 120 },
    { name: 'eventPocName', required: false, maxLength: 120 },
    { name: 'eventPocContact', required: false, maxLength: 20 },
    { name: 'biggestStrength', required: true, maxLength: 2000 },
    { name: 'crowdExperience', required: true, maxLength: 3, pattern: YES_NO_PATTERN },
    { name: 'crowdExperienceDetails', required: false, maxLength: 2000 },
  ],
  uniqueFields: [
    { name: 'clubId', message: 'This club ID has already submitted an activity registration.' },
  ],
})
