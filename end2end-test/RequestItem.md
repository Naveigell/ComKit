## Skenario 1: Request item dengan kondisi valid (sukses)

**Skenario**:
- User2 sudah login.
- User2 membuka detail item milik User1 yang statusnya Available/Tersedia.
- User2 mengisi informasi request (mis. tanggal pinjam, durasi, catatan) lalu klik Request/Borrow.

**Harapan**:
- Request berhasil dibuat dengan status Pending.
- Muncul notifikasi sukses.
- Request muncul di halaman My Page/ Request saya.

**Hasil**:
- Request tercatat sukses, status menjadi mengupdate, notifikasi sukses tampil, dan request muncul pada daftar request User2.

## Skenario 2: Request item dengan field wajib kosong (validasi gagal)

**Skenario**:
- User2 sudah login.
- User2 membuka detail item yang tersedia.
- User2 tidak mengisi salah satu field wajib (mis. tanggal pinjam/durasi) lalu klik send request.

**Harapan**:
- Sistem menampilkan pesan error validasi pada field yang kosong.
- Request tidak dibuat.
- User tetap di halaman detail/form request.

**Hasil**:
- Pesan error validasi muncul, request tidak tersimpan, dan user tetap berada di halaman detail sampai field wajib dilengkapi.