# README

## Perpustakaan API

Proyek ini adalah sebuah backend sederhana menggunakan **Node.js**, **Express.js**, dan **MySQL** untuk mengelola data anggota perpustakaan. Aplikasi ini menyediakan endpoint RESTful untuk menambahkan, memperbarui, menghapus, dan mengambil data member.

### Fitur
- Tambah member baru
- Dapatkan semua member
- Perbarui data member
- Hapus data member
- Menyediakan antarmuka statis untuk aplikasi perpustakaan

### Prasyarat
Pastikan Anda memiliki:
- Node.js diinstal ([Unduh di sini](https://nodejs.org/))
- MySQL berjalan di mesin lokal atau server eksternal

### Instalasi
1. Klon repositori ini:
   ```bash
   git clone https://github.com/username/repo-name.git
   cd repo-name
   ```
2. Instal dependensi:
   ```bash
   npm install
   ```
3. Konfigurasi koneksi MySQL di file `server.js`:
   ```javascript
   const db = mysql.createConnection({
     host: "9vwr6.h.filess.io",
     user: "dbperpustakaan_luckyhithe",
     password: "7040582d1bae7a18817736da75433ebefafcf877",
     database: "dbperpustakaan_luckyhithe",
     port: 3307
   });
   ```
4. Jalankan server:
   ```bash
   node server.js
   ```
5. Buka browser dan akses:
   ```
   http://localhost:6666
   ```

### Endpoint API
| Method | Endpoint           | Deskripsi                               |
|--------|-------------------|-----------------------------------------|
| GET    | `/api/members`    | Mendapatkan semua data member           |
| POST   | `/api/members`    | Menambahkan member baru                 |
| PUT    | `/api/members/:id`| Memperbarui data member berdasarkan ID  |
| DELETE | `/api/members/:id`| Menghapus data member berdasarkan ID    |

### Struktur Data Member
| Field     | Tipe Data    | Deskripsi                      |
|-----------|--------------|--------------------------------|
| id        | INT          | ID member (auto-increment)     |
| name      | VARCHAR(100) | Nama member                    |
| birthdate | DATE         | Tanggal lahir                  |
| address   | TEXT         | Alamat                        |
| gender    | ENUM         | Jenis kelamin ('Laki-Laki', 'Perempuan') |
| email     | VARCHAR(100) | Email (unik)                   |
| phone     | VARCHAR(20)  | Nomor telepon                  |
| validity  | DATE         | Tanggal berlaku keanggotaan    |

### Lisensi
Proyek ini menggunakan lisensi [MIT](LICENSE).