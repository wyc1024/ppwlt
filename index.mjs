import { indexNextBlock } from './pipe.mjs'
import schedule from 'node-schedule'
import importData from './import-data.mjs'


// TODO: */3 * * * *
let isRunning = false
const job = schedule.scheduleJob('*/1 * * * * *', async function () {
  if (isRunning) return
  isRunning = true
  console.log('start indexNextBlock()')
  await indexNextBlock()
  console.log('end indexNextBlock()')
  // console.log('start importData()')
  // await importData()
  // console.log('end importData()')
  isRunning = false
})
