const express = require("express");
const router = express.Router();
const db = require("../database/db");

// Ambil semua data transaksi
router.get("/", (req, res) => {
  const sql = `
    SELECT transactions.id, members.name AS member_name, books.title AS book_title, 
           transactions.borrow_date, transactions.return_date, transactions.status
    FROM transactions
    JOIN members ON transactions.member_id = members.id
    JOIN books ON transactions.book_id = books.id`;
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error saat mengambil data transaksi:", err.message);
      res.status(500).json({ message: "Gagal mengambil data transaksi." });
      return;
    }
    res.json(results);
  });
});

// Tambahkan transaksi baru
router.post("/", (req, res) => {
  const { member_id, book_id, borrow_date, return_date, status } = req.body;
  const sql = `
    INSERT INTO transactions (member_id, book_id, borrow_date, return_date, status)
    VALUES (?, ?, ?, ?, ?)`;
  const values = [member_id, book_id, borrow_date, return_date, status];

  db.query(sql, values, (err) => {
    if (err) {
      console.error("Error saat menambahkan transaksi:", err.message);
      res.status(500).json({ message: "Gagal menambahkan transaksi." });
      return;
    }
    res.json({ message: "Transaksi berhasil ditambahkan!" });
  });
});

// Perbarui data transaksi
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { member_id, book_id, borrow_date, return_date, status } = req.body;
  const sql = `
    UPDATE transactions
    SET member_id = ?, book_id = ?, borrow_date = ?, return_date = ?, status = ?
    WHERE id = ?`;
  const values = [member_id, book_id, borrow_date, return_date, status, id];

  db.query(sql, values, (err) => {
    if (err) {
      console.error("Error saat memperbarui transaksi:", err.message);
      res.status(500).json({ message: "Gagal memperbarui transaksi." });
      return;
    }
    res.json({ message: "Data transaksi berhasil diperbarui!" });
  });
});

// Hapus transaksi
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM transactions WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) {
      console.error("Error saat menghapus transaksi:", err.message);
      res.status(500).json({ message: "Gagal menghapus transaksi." });
      return;
    }
    res.json({ message: "Transaksi berhasil dihapus!" });
  });
});

module.exports = router;
