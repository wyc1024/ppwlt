import { Client } from 'typesense'

export function toTypesenseValue(key, value) {
  const json = JSON.parse(value)
  json.tickid = json.id
  json.id = key
  if (typeof json.traits === 'string') {
    json.traits = [json.traits]
  }
  return json
}

export const typesense = new Client({
  nodes: [
    {
      host: 'localhost',
      port: 8108,
      protocol: 'http',
    },
  ],
  apiKey: 'Hu52dwsas2AdxdE',
  numRetries: 3,
  connectionTimeoutSeconds: 120,
  logLevel: 'debug',
})