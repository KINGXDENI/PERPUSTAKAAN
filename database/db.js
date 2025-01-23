const mysql = require("mysql");

const db = mysql.createConnection({
  host: "9vwr6.h.filess.io",
  user: "dbperpustakaan_luckyhithe",
  password: "7040582d1bae7a18817736da75433ebefafcf877",
  database: "dbperpustakaan_luckyhithe",
  port: 3307
});

db.connect((err) => {
  if (err) {
    console.error("Gagal terhubung ke database:", err.message);
    return;
  }
  console.log("Berhasil terhubung ke database!");
});

module.exports = db;
