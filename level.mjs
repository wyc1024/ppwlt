import { Level } from 'level';

const db = new Level('pipe', { valueEncoding: 'json'  });

for await (const [key, value] of db.iterator({ gte: 'c_b', lt: 'c_bz' })) {
  console.log(key, JSON.parse(value))
}
