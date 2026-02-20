const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.resolve(__dirname, "../../database.sqlite");

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados:", err.message);
    } else {
        console.log("Conectado ao banco de dados SQLite em:", dbPath);
    }
});

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            external_id TEXT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            gender TEXT CHECK(gender IN ('male', 'female', 'other')) NOT NULL,
            birth_date TEXT,
            age INTEGER CHECK(age >= 0),
            street_number INTEGER,
            street_name TEXT,
            city TEXT,
            state TEXT,
            country TEXT,
            postcode TEXT,
            latitude TEXT,
            longitude TEXT,
            timezone_offset TEXT,
            timezone_description TEXT,
            phone TEXT,
            cell TEXT,
            picture_large TEXT,
            picture_medium TEXT,
            picture_thumbnail TEXT
        )
    `);

    db.run(`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`);
    db.run(`CREATE INDEX IF NOT EXISTS idx_users_city ON users(city)`);
});

module.exports = db;