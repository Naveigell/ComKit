## Skenario 1: melihat detail item

**Skenario:**
- User sudah login / atau berada di halaman daftar item.
- User memilih salah satu item yang ada lalu klik Detail/Lihat Item.

**Harapan**:
- Sistem membuka halaman detail item yang dipilih.
- Informasi item tampil lengkap (nama, foto, deskripsi, status ketersediaan, pemilik).

**Hasil**:
- Halaman detail item terbuka dan seluruh informasi utama item tampil sesuai data item yang dipilih.

## Skenario 2: Collapse detail item (tutup tampilan detail)

**Skenario**:
- User berada di halaman daftar item.
- User sudah membuka detail item (state expanded) sehingga tombol Collapse terlihat.
- User menekan tombol Collapse.

**Harapan**:
- Detail item tertutup (kembali ke tampilan ringkas/list).
- Elemen detail (deskripsi lengkap, available, owner, address, tombol Request Item) tidak lagi tampil.
- Item card kembali ke state normal, dan tombol berubah kembali menjadi Detail/Expand (atau tombol detail muncul lagi sesuai UI).

**Hasil**:
- Detail item berhasil tertutup, tampilan kembali ringkas/list, komponen detail dan tombol Request Item tidak tampil, dan state UI kembali normal.

## Skenario 3: Collapse tidak mengubah data (state tetap konsisten)

**Skenario**:
- User membuka detail item, lalu menekan Collapse.
- User membuka detail item yang sama lagi.

**Harapan**:
- Data item tetap sama/akurat (tidak berubah karena collapse).
- Tidak terjadi duplikasi komponen detail atau glitch UI.

**Hasil**:
- Data tetap konsisten saat dibuka ulang, dan UI tidak mengalami duplikasi/bug tampilan.