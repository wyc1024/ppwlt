import { toTypesenseValue, typesense } from './util.mjs'
import db from './db.mjs';

export default async function () {

  // delete all collections
  const kvCol = await typesense.collections('kv')
  if (await kvCol.exists()) await kvCol.delete()
  const utxoCol = await typesense.collections('utxo')
  if (await utxoCol.exists()) await utxoCol.delete()
  const spentUtxoCol = await typesense.collections('spent_utxo')
  if (await spentUtxoCol.exists()) await spentUtxoCol.delete()
  const amountCol = await typesense.collections('amount')
  if (await amountCol.exists()) await amountCol.delete()
  const deploymentCol = await typesense.collections('deployment')
  if (await deploymentCol.exists()) await deploymentCol.delete()
  const collectionCol = await typesense.collections('collection')
  if (await collectionCol.exists()) await collectionCol.delete()
  const cmaxCol = await typesense.collections('cmax')
  if (await cmaxCol.exists()) await cmaxCol.delete()
  const daCol = await typesense.collections('da')
  if (await daCol.exists()) await daCol.delete()

  const kvSchema = {
    name: 'kv',
    fields: [
      {
        name: 'id',
        type: 'string',
        index: true,
        sort: true
      },
      {
        name: 'key',
        type: 'string',
        index: true,
        sort: true
      },
      {
        name: 'value',
        type: 'string',
        index: true,
      }
    ]
  }
  const utxoSchema = {
    name: 'utxo',
    fields: [
      {
        name: 'id',
        type: 'string',
        index: true,
        sort: true
      },
      {
        name: 'addr',
        type: 'string',
        index: true,
        sort: true,
        facet: true,
      },
      {
        name: 'txid',
        type: 'string',
        index: true,
        sort: true,
      },
      {
        name: 'vout',
        type: 'int64',
        index: true,
        sort: true
      },
      {
        name: 'tick',
        type: 'string',
        index: true,
        sort: true,
        facet: true,
      },
      {
        name: 'tickid',
        type: 'int64',
        index: true,
        sort: true,
        facet: true,
      },
      {
        name: 'amt',
        type: 'string',
        index: true,
        sort: true,
      }
    ]
  }
  const spentUtxoSchema = {
    name: 'spent_utxo',
    fields: [
      {
        name: 'id',
        type: 'string',
        index: true,
        sort: true,
      },
      {
        name: 'addr',
        type: 'string',
        index: true,
        sort: true,
        facet: true,
      },
      {
        name: 'txid',
        type: 'string',
        index: true,
        sort: true,
      },
      {
        name: 'vout',
        type: 'int64',
        index: true,
        sort: true,
      },
      {
        name: 'tick',
        type: 'string',
        index: true,
        sort: true,
        facet: true,
      },
      {
        name: 'tickid',
        type: 'int64',
        index: true,
        sort: true,
        facet: true,
      },
      {
        name: 'amt',
        type: 'string',
        index: true,
        sort: true,
      }
    ]
  }
  const amountSchema = {
    name: 'amount',
    fields: [
      {
        name: 'id',
        type: 'string',
        index: true,
        sort: true
      },
      {
        name: 'key',
        type: 'string',
        index: true,
        sort: true,
        infix: true,
      },
      {
        name: 'tick',
        type: 'string',
        index: true,
        sort: true,
        facet: true,
      },
      {
        name: 'tickid',
        type: 'int64',
        index: true,
        sort: true,
        facet: true,
      },
      {
        name: 'value',
        type: 'int64',
        index: true,
        sort: true,
      }
    ]
  }
  const deploymentSchema = {
    name: 'deployment',
    fields: [
      {
        name: 'id',
        type: 'string',
        index: true,
        sort: true,
      },
      {
        name: 'tick',
        type: 'string',
        index: true,
        sort: true,
        facet: true,
      },
      {
        name: 'tickid',
        type: 'int64',
        index: true,
        sort: true,
        facet: true,
      },
      {
        name: 'dec',
        type: 'int64',
        index: true,
        sort: true,
      },
      {
        name: 'max',
        type: 'string',
        index: true,
        sort: true,
      },
      {
        name: 'lim',
        type: 'string',
        index: true,
        sort: true,
      },
      {
        name: 'rem',
        type: 'string',
        index: true,
        sort: true,
      },
      {
        name: 'tx',
        type: 'string',
        index: true,
        sort: true,
      },
      {
        name: 'vo',
        type: 'int64',
        index: true,
        sort: true,
      },
      {
        name: 'bvo',
        type: 'int64',
        index: true,
        sort: true,
        facet: true,
      },
      {
        name: 'baddr',
        type: 'string',
        index: true,
        sort: true,
        facet: true,
      },
      {
        name: 'col',
        type: 'string',
        optional: true,
        index: true,
        sort: true,
        facet: true,
      },
      {
        name: 'iscol',
        type: 'bool',
        index: true,
        sort: true,
        facet: true,
      },
      {
        name: 'colnum',
        type: 'int64',
        optional: true,
        index: true,
        sort: true,
      },
      {
        name: 'blck',
        type: 'int64',
        index: true,
        sort: true,
      },
      {
        name: 'blckh',
        type: 'string',
        index: true,
        sort: true,
      }
    ]
  }
  const collectionSchema = {
    name: 'collection',
    fields: [
      {
        name: 'id',
        type: 'string',
        index: true,
        sort: true,
      },
      {
        name: 'tick',
        type: 'string',
        index: true,
        sort: true,
        facet: true,
      },
      {
        name: 'tickid',
        type: 'int64',
        index: true,
        sort: true,
        facet: true,
      },
      {
        name: 'col',
        type: 'string',
        index: true,
        sort: true,
        facet: true,
      },
      {
        name: 'num',
        type: 'int64',
        index: true,
        sort: true,
      },
      {
        name: 'traits',
        type: 'string*',
        optional: true,
        index: true,
      },
      {
        name: 'mime',
        type: 'string',
        optional: true,
        index: true,
        sort: true,
        facet: true,
      },
      {
        name: 'ref',
        type: 'string',
        optional: true,
        index: true,
        sort: true,
      }
    ]
  }
  const cmaxSchema = {
    name: 'cmax',
    fields: [
      {
        name: 'id',
        type: 'string',
        index: true,
        sort: true,
      },
      {
        name: 'key',
        type: 'string',
        index: true,
        sort: true,
      },
      {
        name: 'value',
        type: 'int64',
        index: true,
        sort: true,
      },
    ]
  }
  const daSchema = {
    name: 'da',
    fields: [
      {
        name: 'id',
        type: 'string',
        index: true,
        sort: true,
      },
      {
        name: 'key',
        type: 'string',
        index: true,
        sort: true,
      },
      {
        name: 'value',
        type: 'string',
        index: true,
        sort: true,
      },
    ]
  }

  // create all collections
  await typesense.collections().create(kvSchema)
  await typesense.collections().create(utxoSchema)
  await typesense.collections().create(spentUtxoSchema)
  await typesense.collections().create(amountSchema)
  await typesense.collections().create(deploymentSchema)
  await typesense.collections().create(collectionSchema)
  await typesense.collections().create(cmaxSchema)
  await typesense.collections().create(daSchema)


  // const db = new Level('pipe', { valueEncoding: 'json' });

  let count = 0
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

    // 暂存批量导入
    if (key.startsWith('utxo_')) {
      utxo.push(toTypesenseValue(key, value))
    } else if (key.startsWith('spent_utxo_')) {
      spentUtxo.push(toTypesenseValue(key, value))
    } else if (key.startsWith('a_')) {
      const keySplited = key.split('_')
      amount.push({
        id: key,
        key,
        value: Number(value),
        tick: keySplited[2],
        tickid: Number(keySplited[3]),
      })
    } else if (key.startsWith('d_')) {
      deployment.push(toTypesenseValue(key, value))
    } else if (key.startsWith('c_max_')) {
      cmax.push({ id: key, key, value: Number(value) })
    } else if (key.startsWith('c_')) {
      collection.push(toTypesenseValue(key, value))
    } else if (key.startsWith('da_')) {
      da.push({ id: key, key, value: '' + value })
    } else {
      kv.push({ id: key, key, value: '' + value })
    }

    // import one by one
    // console.log(key, value)
    // if (key.startsWith('utxo_')) {
    //   await typesense
    //     .collections('utxo')
    //     .documents()
    //     .create(toTypesenseValue(key, value))
    // } else if (key.startsWith('spent_utxo_')) {
    //   await typesense
    //     .collections('spent_utxo')
    //     .documents()
    //     .create(toTypesenseValue(key, value))
    // } else if (key.startsWith('a_')) {
    //   const keySplited = key.split('_')
    //   amount.push({
    //     id: key,
    //     key,
    //     value: Number(value),
    //     tick: keySplited[2],
    //     tickid: Number(keySplited[3]),
    //   })
    // } else if (key.startsWith('d_')) {
    //   await typesense
    //     .collections('deployment')
    //     .documents()
    //     .create(toTypesenseValue(key, value))
    // } else if (key.startsWith('c_max_')) {
    //   await typesense
    //     .collections('cmax')
    //     .documents()
    //     .create({ id: key, key, value: Number(value) })
    // } else if (key.startsWith('c_')) {
    //   await typesense
    //     .collections('collection')
    //     .documents()
    //     .create(toTypesenseValue(key, value))
    // } else if (key.startsWith('da_')) {
    //   await typesense
    //     .collections('da')
    //     .documents()
    //     .create({ id: key, key, value: '' + value })
    // } else {
    //   await typesense
    //     .collections('kv')
    //     .documents()
    //     .create({ id: key, key, value: '' + value })
    // }


    count++
  }
  console.log(count)

  try {
    utxo.length !== 0 && await typesense
      .collections('utxo')
      .documents()
      .import(utxo)
    spentUtxo.length !== 0 && await typesense
      .collections('spent_utxo')
      .documents()
      .import(spentUtxo)
    amount.length !== 0 && await typesense
      .collections('amount')
      .documents()
      .import(amount)
    deployment.length !== 0 && await typesense
      .collections('deployment')
      .documents()
      .import(deployment)
    collection.length !== 0 && await typesense
      .collections('collection')
      .documents()
      .import(collection)
    cmax.length !== 0 && await typesense
      .collections('cmax')
      .documents()
      .import(cmax)
    da.length !== 0 && await typesense
      .collections('da')
      .documents()
      .import(da)
    kv.length !== 0 && await typesense
      .collections('kv')
      .documents()
      .import(kv)
  } catch (e) {
    process.exit(1)
  }

}
