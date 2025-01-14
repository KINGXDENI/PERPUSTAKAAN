const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Untuk mengizinkan permintaan lintas asal (frontend-backend)
app.use(bodyParser.json()); // Untuk parsing request body dalam format JSON

// Konfigurasi koneksi ke database MySQL
const db = mysql.createConnection({
  host: "9vwr6.h.filess.io",       // Host MySQL (biasanya "localhost")
  user: "dbperpustakaan_luckyhithe",            // Nama pengguna MySQL
  password: "7040582d1bae7a18817736da75433ebefafcf877",            // Password MySQL
  database: "dbperpustakaan_luckyhithe", // Nama database
  port: 3307 // Port MySQL (default adalah 3306)
});

// Koneksi ke database
db.connect((err) => {
  if (err) {
    console.error("Gagal terhubung ke database:", err.message);
    return;
  }
  console.log("Berhasil terhubung ke database!");
});
app.use(express.static(path.join(__dirname, 'public')));

// Menyediakan endpoint atau mengatur routing
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'perpustakaan.html'));
});
// Endpoint untuk mendapatkan semua member
app.get("/api/members", (req, res) => {
  const sql = "SELECT * FROM member";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error saat mengambil data:", err.message);
      res.status(500).json({ message: "Gagal mendapatkan data." });
      return;
    }
    res.json(results);
  });
});

// Endpoint untuk menambahkan member baru
app.post("/api/members", (req, res) => {
  const { id, name, birthdate, address, gender, email, phone, validity } = req.body;

  const sql = `
    INSERT INTO members (id, name, birthdate, address, gender, email, phone, validity) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [id, name, birthdate, address, gender, email, phone, validity];

  db.query(sql, values, (err) => {
    if (err) {
      console.error("Error saat menambahkan member:", err.message);
      res.status(500).json({ message: "Gagal menambahkan data." });
      return;
    }
    res.json({ message: "Member berhasil ditambahkan!" });
  });
});

// Endpoint untuk memperbarui data member
app.put("/api/members/:id", (req, res) => {
  const { id } = req.params;
  const { name, birthdate, address, gender, email, phone, validity } = req.body;

  const sql = `
    UPDATE members 
    SET name = ?, birthdate = ?, address = ?, gender = ?, email = ?, phone = ?, validity = ? 
    WHERE id = ?`;
  const values = [name, birthdate, address, gender, email, phone, validity, id];

  db.query(sql, values, (err) => {
    if (err) {
      console.error("Error saat memperbarui member:", err.message);
      res.status(500).json({ message: "Gagal memperbarui data." });
      return;
    }
    res.json({ message: "Data member berhasil diperbarui!" });
  });
});

// Endpoint untuk menghapus data member
app.delete("/api/members/:id", (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM members WHERE id = ?`;
  db.query(sql, [id], (err) => {
    if (err) {
      console.error("Error saat menghapus member:", err.message);
      res.status(500).json({ message: "Gagal menghapus data." });
      return;
    }
    res.json({ message: "Data member berhasil dihapus!" });
  });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
