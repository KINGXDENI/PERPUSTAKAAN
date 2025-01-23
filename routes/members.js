const express = require("express");
const router = express.Router();

// Ambil semua data member
router.get("/", (req, res) => {
  const sql = "SELECT * FROM members";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error saat mengambil data members:", err.message);
      res.status(500).json({ message: "Gagal mengambil data members." });
      return;
    }
    res.json(results);
  });
});

// Tambahkan member baru
router.post("/", (req, res) => {
  const { name, birthdate, address, gender, email, phone, validity } = req.body;
  const sql = `
    INSERT INTO members (name, birthdate, address, gender, email, phone, validity) 
    VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const values = [name, birthdate, address, gender, email, phone, validity];

  db.query(sql, values, (err) => {
    if (err) {
      console.error("Error saat menambahkan member:", err.message);
      res.status(500).json({ message: "Gagal menambahkan member." });
      return;
    }
    res.json({ message: "Member berhasil ditambahkan!" });
  });
});

// Perbarui data member
router.put("/:id", (req, res) => {
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
      res.status(500).json({ message: "Gagal memperbarui member." });
      return;
    }
    res.json({ message: "Data member berhasil diperbarui!" });
  });
});

// Hapus member
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM members WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) {
      console.error("Error saat menghapus member:", err.message);
      res.status(500).json({ message: "Gagal menghapus member." });
      return;
    }
    res.json({ message: "Member berhasil dihapus!" });
  });
});

module.exports = router;
