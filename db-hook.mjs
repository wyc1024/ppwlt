import { toTypesenseValue, typesense } from './util.mjs'

export async function put(key, value) {
  console.log('===========put==========')
  console.log(key)
  console.log(value)
  if (!key) return
  if (key.startsWith('utxo_')) {
    const obj = toTypesenseValue(key, value)
    await typesense
      .collections('utxo')
      .documents()
      .upsert(obj)
  } else if (key.startsWith('spent_utxo_')) {
    const obj = toTypesenseValue(key, value)
    await typesense
      .collections('spent_utxo')
      .documents()
      .upsert(obj)
  } else if (key.startsWith('a_')) {
    const obj = { id: key, key, value: Number(value) }
    await typesense
      .collections('amount')
      .documents()
      .upsert(obj)
  } else if (key.startsWith('d_')) {
    const obj = toTypesenseValue(key, value)
    await typesense
      .collections('deployment')
      .documents()
      .upsert(obj)
  } else if (key.startsWith('c_max_')) {
    const obj = { id: key, key, value: Number(value) }
    await typesense
      .collections('cmax')
      .documents()
      .upsert(obj)
  } else if (key.startsWith('c_')) {
    const obj = toTypesenseValue(key, value)
    await typesense
      .collections('collection')
      .documents()
      .upsert(obj)
  } else if (key.startsWith('da_')) {
    const obj = { id: key, key, value: '' + value }
    await typesense
      .collections('da')
      .documents()
      .upsert(obj)
  } else {
    const obj = { id: key, key, value: '' + value }
    await typesense
      .collections('kv')
      .documents()
      .upsert(obj)
  }
}

export async function del(key) {
  console.log('===========del==========')
  console.log(key)
  if (!key) return
  if (key.startsWith('utxo_')) {
    await typesense
      .collections('utxo')
      .documents()
      .delete(key)
  } else if (key.startsWith('spent_utxo_')) {
    await typesense
      .collections('spent_utxo')
      .documents()
      .delete(key)
  } else if (key.startsWith('a_')) {
    await typesense
      .collections('amount')
      .documents()
      .delete(key)
  } else if (key.startsWith('d_')) {
    await typesense
      .collections('deployment')
      .documents()
      .delete(key)
  } else if (key.startsWith('c_max_')) {
    await typesense
      .collections('cmax')
      .documents()
      .delete(key)
  } else if (key.startsWith('c_')) {
    await typesense
      .collections('collection')
      .documents()
      .delete(key)
  } else if (key.startsWith('da_')) {
    await typesense
      .collections('da')
      .documents()
      .delete(key)
  } else {
    await typesense
      .collections('kv')
      .documents()
      .delete(key)
  }
}
