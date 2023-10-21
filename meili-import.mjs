import db from './db.mjs';
import { MeiliSearch } from 'meilisearch'

const client = new MeiliSearch({
  host: 'http://127.0.0.1:7700',
  apiKey: 'xkMnhGfq2PbRtwsQlkCDedsbgEbowrZnhQUxwldLB4s',
})

export default async function () {

  const kvIndex = await client.index('kv')
  const utxoIndex = await client.index('utxo')
  const spentUtxoIndex = await client.index('spent_utxo')
  const amountIndex = await client.index('amount')
  const deploymentIndex = await client.index('deployment')
  const collectionIndex = await client.index('collection')
  const cmaxIndex = await client.index('cmax')
  const daIndex = await client.index('da')

  await kvIndex.delete()
  await utxoIndex.delete()
  await spentUtxoIndex.delete()
  await amountIndex.delete()
  await deploymentIndex.delete()
  await collectionIndex.delete()
  await cmaxIndex.delete()
  await daIndex.delete()

  await client.createIndex('kv', { primaryKey: 'id' })
  await client.createIndex('utxo', { primaryKey: 'id' })
  await client.createIndex('spent_utxo', { primaryKey: 'id' })
  await client.createIndex('amount', { primaryKey: 'id' })
  await client.createIndex('deployment', { primaryKey: 'id' })
  await client.createIndex('collection', { primaryKey: 'id' })
  await client.createIndex('cmax', { primaryKey: 'id' })
  await client.createIndex('da', { primaryKey: 'id' })

  const kvAttr = [
    'id',
    'value',
  ]
  kvIndex.updateFilterableAttributes(kvAttr)
  kvIndex.updateSortableAttributes(kvAttr)
  const utxoAttr = [
    'id',
    'addr',
    'txid',
    'vout',
    'tick',
    'tickid',
    'amt',
  ]
  utxoIndex.updateFilterableAttributes(utxoAttr)
  utxoIndex.updateSortableAttributes(utxoAttr)
  const spentUtxoAttr = [
    'id',
    'addr',
    'txid',
    'vout',
    'tick',
    'tickid',
    'amt',
  ]
  spentUtxoIndex.updateFilterableAttributes(spentUtxoAttr)
  spentUtxoIndex.updateSortableAttributes(spentUtxoAttr)
  const amountAttr = [
    'id',
    'addr',
    'tick',
    'tickid',
    'value',
  ]
  amountIndex.updateFilterableAttributes(amountAttr)
  amountIndex.updateSortableAttributes(amountAttr)
  const deploymentAttr = [
    'id',
    'tick',
    'tickid',
    'dec',
    'max',
    'lim',
    'rem',
    'tx',
    'vo',
    'bvo',
    'baddr',
    'col',
    'colnum',
    'blck',
    'blckh',
  ]
  deploymentIndex.updateFilterableAttributes(deploymentAttr)
  deploymentIndex.updateSortableAttributes(deploymentAttr)
  const collectionAttr = [
    'id',
    'tick',
    'tickid',
    'col',
    'num',
    'traits',
    'mime',
    'ref',
  ]
  collectionIndex.updateFilterableAttributes(collectionAttr)
  collectionIndex.updateSortableAttributes(collectionAttr)
  const cmaxAttr = [
    'id',
    'value',
  ]
  cmaxIndex.updateFilterableAttributes(cmaxAttr)
  cmaxIndex.updateSortableAttributes(cmaxAttr)
  const daAttr = [
    'id',
    'value',
  ]
  daIndex.updateFilterableAttributes(daAttr)
  daIndex.updateSortableAttributes(daAttr)


  function toMeiliValue(key, value) {
    const json = JSON.parse(value)
    json.tickid = json.id
    json.id = key
    return json
  }


  const utxo = []
  const spentUtxo = []
  const amount = []
  const deployment = []
  const collection = []
  const cmax = []
  const da = []
  const kv = []


  for await (const [key, value] of db.iterator()) {
    // console.log(key, value)

    // 暂存后批量导入
    if (key.startsWith('utxo_')) {
      utxo.push(toMeiliValue(key, value))
    } else if (key.startsWith('spent_utxo_')) {
      spentUtxo.push(toMeiliValue(key, value))
    } else if (key.startsWith('a_')) {
      const keySplited = key.split('_')
      amount.push({
        id: key,
        value: Number(value),
        addr: keySplited[1],
        tick: keySplited[2],
        tickid: Number(keySplited[3]),
      })
    } else if (key.startsWith('d_')) {
      deployment.push(toMeiliValue(key, value))
    } else if (key.startsWith('c_max_')) {
      cmax.push({ id: key, value: Number(value) })
    } else if (key.startsWith('c_')) {
      collection.push(toMeiliValue(key, value))
    } else if (key.startsWith('da_')) {
      da.push({ id: key, value: '' + value })
    } else {
      kv.push({ id: key, value: '' + value })
    }

  }

  try {
    kv.length !== 0 && await kvIndex.addDocuments(kv)
    utxo.length !== 0 && await utxoIndex.addDocuments(utxo)
    spentUtxo.length !== 0 && await spentUtxoIndex.addDocuments(spentUtxo)
    amount.length !== 0 && await amountIndex.addDocuments(amount)
    deployment.length !== 0 && await deploymentIndex.addDocuments(deployment)
    collection.length !== 0 && await collectionIndex.addDocuments(collection)
    cmax.length !== 0 && await cmaxIndex.addDocuments(cmax)
    da.length !== 0 && await daIndex.addDocuments(da)
  } catch (e) {
    process.exit(1)
  }

}