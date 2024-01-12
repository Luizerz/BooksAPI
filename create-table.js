import { sql } from './db.js';

sql`
    CREATE TABLE bookshelf (
        id TEXT PRIMARY KEY,
        title TEXT,
        description TEXT,
        genres TEXT,
        release_year TEXT
    )
`.then(() => {
    console.log('OK')
})