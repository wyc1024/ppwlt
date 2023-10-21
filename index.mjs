import { indexNextBlock } from './pipe.mjs'
import schedule from 'node-schedule'
import meiliImport from './meili-import.mjs'
import config from 'config'


if (config.import_when_start) {
  console.log('start import_when_start')
  await meiliImport()
  console.log('end import_when_start')
}


// TODO: */3 * * * *
let isRunning = false
// for (;;) {

const job = schedule.scheduleJob('*/1 * * * * *', async function () {
  if (isRunning) return
  isRunning = true
  await indexNextBlock()
  isRunning = false
})

// }