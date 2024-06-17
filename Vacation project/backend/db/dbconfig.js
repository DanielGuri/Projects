const mysql = require('mysql2');

let con;

if (process.env.JAWSDB_URL) {
    con = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    con = mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || '3306',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'vacations'
    });
}

con.connect(err => {
    if (err) {
        console.error('Error connecting to database:', err.message);
        return;
    }
    console.log("Connected to MySQL database");
});

const SQL = (q) => {
    return new Promise((resolve, reject) => {
        con.query(q, (err, results) => {
            if (err) {
                console.error('Error executing query:', err.message);
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

module.exports = { SQL };
