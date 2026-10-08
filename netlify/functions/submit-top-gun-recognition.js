import { createSheetsFormHandler } from './_lib/sheetsFormHandler.mjs'
import { TOP_GUN_RECOGNITION_SCRIPT_URL } from './_lib/sheetsConfig.mjs'

const IMAGE_PATTERN = /^image\/(jpeg|jpg|png|webp)$/

export default createSheetsFormHandler({
  scriptUrl: TOP_GUN_RECOGNITION_SCRIPT_URL,
  sheetName: 'Top Gun Rotaractors Recognition - Q1',
  fields: [
    { name: 'name', required: true, maxLength: 120 },
    { name: 'clubName', required: true, maxLength: 120 },
    { name: 'riId', required: true, maxLength: 30 },
    { name: 'clubRole', required: true, maxLength: 120 },
    { name: 'reason', required: true, maxWords: 250 },
  ],
  files: [
    { name: 'casualPhoto', required: true, maxBytes: 6 * 1024 * 1024, mimePattern: IMAGE_PATTERN },
  ],
  uniqueFields: [
    { name: 'riId', message: 'This RI ID has already been nominated for Top Gun Recognition.' },
  ],
})
