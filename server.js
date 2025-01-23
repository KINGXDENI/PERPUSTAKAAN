const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const booksRoutes = require("./routes/books");
const transactionsRoutes = require("./routes/transactions");
const membersRoutes = require("./routes/members");

const app = express();
const PORT = 6666;

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

  // Buat tabel members jika belum ada
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS members (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      birthdate DATE,
      address TEXT,
      gender ENUM('Laki-Laki', 'Perempuan') NOT NULL,
      email VARCHAR(100) UNIQUE,
      phone VARCHAR(20),
      validity DATE
    )`;

  db.query(createTableQuery, (err) => {
    if (err) {
      console.error("Error saat membuat tabel members:", err.message);
    } else {
      console.log("Tabel members siap digunakan atau sudah ada.");
    }
  });
});
  
  const createBooksTable = `
    CREATE TABLE IF NOT EXISTS books (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(200) NOT NULL,
      author VARCHAR(100) NOT NULL,
      genre VARCHAR(50),
      published_date DATE,
      stock INT DEFAULT 0
    )`;

  db.query(createBooksTable, (err) => {
    if (err) {
      console.error("Error saat membuat tabel books:", err.message);
    } else {
      console.log("Tabel books siap digunakan atau sudah ada.");
    }
  });

  // Buat tabel transactions jika belum ada
  const createTransactionsTable = `
    CREATE TABLE IF NOT EXISTS transactions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      member_id INT NOT NULL,
      book_id INT NOT NULL,
      borrow_date DATE NOT NULL,
      return_date DATE,
      status ENUM('Dipinjam', 'Dikembalikan') DEFAULT 'Dipinjam',
      FOREIGN KEY (member_id) REFERENCES members(id) ON DELETE CASCADE,
      FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
    )`;

  db.query(createTransactionsTable, (err) => {
    if (err) {
      console.error("Error saat membuat tabel transactions:", err.message);
    } else {
      console.log("Tabel transactions siap digunakan atau sudah ada.");
    }
  });

app.use(express.static(path.join(__dirname, 'Public')));
app.use("/api/books", booksRoutes);
app.use("/api/transactions", transactionsRoutes);
app.use("/api/members", membersRoutes);

// Menyediakan endpoint atau mengatur routing
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Public', 'perpustakaan.html'));
});


// Jalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
