## Skenario 1: Alur Pengguna Lengkap (Registrasi, Item Management, dan Item Request)

**Skenario**:

**Fase 1: User1 Registrasi dan Setup**
- User1 membuka aplikasi ComKit dan menuju halaman Register (`/register`).
- User1 berinteraksi dengan komponen Register form:
  - Input field "Full Name" (untuk nama lengkap)
  - Input field "Username" (untuk username unik)
  - Textarea "Address" (untuk alamat)
  - Input field "Password" (untuk kata sandi)
  - Input field "Confirm Password" (verifikasi password)
  - Checkbox "Agree to Terms"
- User1 klik button "Create Account" (submit form).
- User1 berhasil diarahkan ke halaman Dashboard dan logout melalui tombol logout di TopHeader.

**Fase 2: User1 Login Kembali dan Verifikasi Item**
- User1 membuka halaman Login (`/login`).
- User1 berinteraksi dengan komponen Login form:
  - Input field "Username"
  - Input field "Password"
  - Checkbox "Remember me"
- User1 klik button "Sign in to account" (submit form).
- User1 berhasil login dan diarahkan ke Dashboard.
- User1 navigasi ke halaman "Item Saya" di MyPage (`/mypage`).
- User1 dapat melihat section "Item Saya" kosong (tidak ada item).

**Fase 3: User1 Membuat 30 Items**
- Di halaman MyPage, User1 klik button "Tambah Item Baru" sebanyak 30 kali.
- Untuk setiap item, User1 mengisi Modal/Form yang muncul dengan:
  - Nama Item
  - Deskripsi
  - Quantity
  - Unit
  - Type (Borrow/Share)
  - Status (Available/Unavailable)
- Setiap item berhasil ditambahkan dan tampil di daftar "Item Saya" dengan thumbnail, name, quantity, type, dan status.
- Total item di section "Item Saya" menunjukkan 30 items.
- Section "Item Saya" menampilkan button "Edit" dan "Hapus" untuk setiap item.
- User1 logout melalui button di TopHeader.

**Fase 4: User2 Registrasi dan Explorasi Items**
- User2 membuka aplikasi ComKit dan menuju halaman Register (`/register`).
- User2 mengisi form registrasi với data berbeda dari User1 dan klik "Create Account".
- User2 berhasil login dan diarahkan ke halaman Dashboard.
- User2 dapat melihat komponen Dashboard:
  - TopHeader (dengan user info dan tombol logout)
  - Section search bar dengan placeholder "Cari item..."
  - Section filter dengan radio buttons: "All", "Borrow", "Share"
- User2 tidak menerapkan filter (tetap pada "All").
- User2 melihat daftar items di section "Items List" dengan format collapsed:
  - Item thumbnail
  - Item name
  - Owner name
  - Available quantity
  - Type badge (Pinjam/Bagikan)
  - Button "Details"
- User2 dapat melihat pagination menunjukkan lebih dari 1 halaman.
- User2 memverifikasi ada 30 items dari User1 terdistribusi di halaman-halaman awal.

**Fase 5: User2 Membuka Pagination Halaman 2**
- User2 navigasi ke halaman 2 pagination.
- User2 memverifikasi masih ada items yang ditampilkan di halaman 2.

**Fase 6: User2 Request Item dari User1**
- User2 melihat item pertama dari User1 di list items (dalam format collapsed).
- User2 klik button "Details" pada item tersebut.
- Item card berubah menjadi expanded state dengan:
  - Full image
  - Full description
  - Available quantity
  - Owner name dan address
  - Item type
  - Item status
- User2 klik button "Request Item" (hijau, muncul ketika item available dan qty > 0).
- Modal/Form popup muncul dengan fields untuk permintaan:
  - Quantity yang diminta
  - Date start (tanggal mulai peminjaman)
  - Date end (tanggal akhir peminjaman)
  - Optional notes/reason
- User2 mengisi form dan klik button "Submit" atau "Kirim Request".
- Request berhasil terkirim dan User2 menerima notifikasi/alert konfirmasi.

**Fase 7: User1 Login Kembali dan Check Request**
- User1 membuka halaman Login dan login dengan kredensial yang benar.
- User1 diarahkan ke Dashboard.
- User1 navigasi ke halaman MyPage (`/mypage`).
- User1 dapat melihat section "Request Masuk" (Incoming Requests).
- Di section ini, User1 dapat melihat request dari User2 dengan detail:
  - Item thumbnail
  - Item name
  - Requester name dan username
  - Quantity yang diminta
  - Tanggal peminjaman (date start - date end)
  - Status badge
  - Button "Approve" dan "Reject" (muncul jika status = pending)

**Fase 8: User1 Approve Request**
- User1 melihat request dari User2 di section "Request Masuk".
- User1 klik button "Approve" (hijau).
- Modal/confirmation dialog muncul meminta konfirmasi.
- User1 klik button "Confirm" untuk approve.
- Request status berubah menjadi "Approved" (ditampilkan di badge status).
- Button "Approve" dan "Reject" hilang, diganti dengan button "Sudah Dikembalikan" (untuk mark return).
- Item status di "Item Saya" User1 mungkin berubah menjadi "Dipinjam" atau jumlah remaining quantity berkurang.

**Harapan**:
- User1 berhasil register melalui Register form, login kembali via Login form, dan membuat 30 items melalui "Tambah Item Baru" modal tanpa error.
- Item list User1 muncul di Dashboard homepage/items dengan search dan filter radio buttons, browseable oleh User2 dalam format collapsed yang dapat di-expand.
- Pagination di Dashboard bekerja dengan baik dan menampilkan lebih dari 1 halaman untuk 30 items.
- User2 dapat membuka halaman 2 pagination dan masih melihat items.
- User2 berhasil mengirim request untuk item dari User1 melalui button "Request Item" dan modal form.
- User1 dapat login kembali dan melihat incoming request di section "Request Masuk" di MyPage.
- User1 berhasil approve request via button "Approve", dan status request berubah menjadi "Approved" dengan badge status terupdate.

**Hasil**:
- Seluruh alur pengguna berjalan lancar tanpa error.
- Komponen Register, Login, Dashboard (search/filter), Item List (collapsed/expanded), dan MyPage sections berfungsi dengan baik.
- Request modal form dan approval workflow berfungsi end-to-end.
- Data persisten di database dan dapat diverifikasi di setiap fase transisi.
- UI responsif dan mobile-friendly (tested dalam mobile-container layout).