import { createSheetsFormHandler } from './_lib/sheetsFormHandler.mjs'

const YES_NO_PATTERN = /^(yes|no)$/

export default createSheetsFormHandler({
  sheetName: 'DLA Chair Nominations',
  fields: [
    { name: 'name', required: true, maxLength: 120 },
    { name: 'clubName', required: true, maxLength: 120 },
    { name: 'phone', required: true, maxLength: 20 },
    { name: 'designation', required: true, maxLength: 80 },
    { name: 'chairedEvent', required: true, maxLength: 3, pattern: YES_NO_PATTERN },
    { name: 'chairedEventDetails', required: false, maxLength: 2000 },
    { name: 'workedCommittee', required: true, maxLength: 3, pattern: YES_NO_PATTERN },
    { name: 'workedCommitteeDetails', required: false, maxLength: 2000 },
    { name: 'justification', required: true, maxLength: 2000 },
  ],
  uniqueFields: [
    { name: 'phone', message: 'This contact number has already been used for a DLA Chair nomination.' },
  ],
})
