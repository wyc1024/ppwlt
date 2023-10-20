import { Level } from 'level'

const db = new Level('pipe', { valueEncoding: 'json'  })

export default db
