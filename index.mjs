import { indexNextBlock } from './pipe.mjs'
import schedule from 'node-schedule'
import importData from './import-data.mjs'


await importData()


// TODO: */3 * * * *
let isRunning = false
// for (;;) {

const job = schedule.scheduleJob('*/1 * * * * *', async function () {
  if (isRunning) return
  isRunning = true
  console.log('start indexNextBlock()')
  await indexNextBlock()
  console.log('end indexNextBlock()')
  isRunning = false
})

// }