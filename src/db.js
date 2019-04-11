import Dexie from 'dexie';

const db = new Dexie('Rankscore');
db.version(1).stores({ Score: '++id' });

export default db;