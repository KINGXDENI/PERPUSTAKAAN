const express = require("express");
const router = express.Router();

// Ambil semua data buku
router.get("/", (req, res) => {
  const sql = "SELECT * FROM books";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error saat mengambil data buku:", err.message);
      res.status(500).json({ message: "Gagal mengambil data buku." });
      return;
    }
    res.json(results);
  });
});

// Tambahkan buku baru
router.post("/", (req, res) => {
  const { title, author, genre, published_date, stock } = req.body;
  const sql = `
    INSERT INTO books (title, author, genre, published_date, stock)
    VALUES (?, ?, ?, ?, ?)`;
  const values = [title, author, genre, published_date, stock];

  db.query(sql, values, (err) => {
    if (err) {
      console.error("Error saat menambahkan buku:", err.message);
      res.status(500).json({ message: "Gagal menambahkan buku." });
      return;
    }
    res.json({ message: "Buku berhasil ditambahkan!" });
  });
});

// Perbarui data buku
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, author, genre, published_date, stock } = req.body;
  const sql = `
    UPDATE books
    SET title = ?, author = ?, genre = ?, published_date = ?, stock = ?
    WHERE id = ?`;
  const values = [title, author, genre, published_date, stock, id];

  db.query(sql, values, (err) => {
    if (err) {
      console.error("Error saat memperbarui buku:", err.message);
      res.status(500).json({ message: "Gagal memperbarui buku." });
      return;
    }
    res.json({ message: "Data buku berhasil diperbarui!" });
  });
});

// Hapus buku
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM books WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) {
      console.error("Error saat menghapus buku:", err.message);
      res.status(500).json({ message: "Gagal menghapus buku." });
      return;
    }
    res.json({ message: "Buku berhasil dihapus!" });
  });
});

module.exports = router;
