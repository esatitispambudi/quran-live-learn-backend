# Panduan Troubleshooting Error AI

## Masalah: "Maaf, saat ini AI tidak tersedia. Harap verifikasi API key Gemini"

Error ini muncul ketika sistem tidak dapat terhubung ke Google Gemini AI. Berikut adalah langkah-langkah untuk memperbaikinya:

---

## ✅ Solusi Langkah Demi Langkah

### 1. **Verifikasi API Key di .env**

Buka file `backend/.env` dan pastikan:
- API key ada dan tidak kosong
- Format: `GEMINI_API_KEY=AIza...` (dimulai dengan `AIza`)

**File yang perlu dicek:**
```
c:\xampp\htdocs\ai\quran-live-learn\backend\.env
```

### 2. **Dapatkan API Key Baru (Jika Invalid)**

Jika API key lama tidak bekerja:

1. Buka https://makersuite.google.com/app/apikeys
2. Login dengan akun Google Anda
3. Klik "Create API Key" atau "Get API Key"
4. Copy API key yang dihasilkan (dimulai dengan `AIza`)
5. Paste ke file `.env`:
   ```
   GEMINI_API_KEY=AIza_PASTE_KEY_HERE
   ```

### 3. **Verifikasi API di Google Cloud Console**

Pastikan Gemini API sudah diaktifkan:

1. Buka https://console.cloud.google.com
2. Pilih project Anda
3. Cari "Generative AI API" atau "Gemini API"
4. Klik "Enable" jika belum aktif

### 4. **Restart Server Backend**

Setelah mengubah `.env`:

```bash
# Terminal backend
cd backend
npm start
```

**Atau jika sudah running:**
1. Tekan `Ctrl+C` untuk stop
2. Tunggu ~5 detik
3. Jalankan `npm start` lagi

### 5. **Periksa Log di Terminal**

Setelah server restart, lihat pesan di terminal backend:

**✅ Jika berhasil, Anda akan melihat:**
```
🔑 GEMINI_API_KEY loaded: true
📝 API Key first 10 chars: AIzaSyA1JV...
🚀 Server running on port 5000
```

**❌ Jika gagal:**
```
🔑 GEMINI_API_KEY loaded: false
📝 API Key first 10 chars: NOT FOUND
⚠️  WARNING: GEMINI_API_KEY not found in environment!
```

---

## 🔧 Troubleshooting Lanjutan

### API Key Valid tapi Chat Masih Error

**Kemungkinan penyebab:**
- Rate limit API terlampaui
- Koneksi internet bermasalah
- Account Google belum verified

**Solusi:**
1. Tunggu beberapa menit
2. Cek koneksi internet
3. Pastikan akun Google sudah verified di Google Cloud
4. Coba dengan prompt sederhana terlebih dahulu

### CORS Error / Connection Refused

**Kemungkinan penyebab:**
- Backend tidak running
- Port 5000 sudah terpakai

**Solusi:**
```bash
# Periksa apakah port sudah terpakai
netstat -ano | findstr :5000

# Jika ada, kill process tersebut (ganti PID dengan nomor dari hasil di atas)
taskkill /PID [PID] /F

# Restart backend
npm start
```

### Error 503 atau Timeout

**Kemungkinan penyebab:**
- Server Gemini down
- Timeout terlalu pendek

**Solusi:**
- Tunggu beberapa jam
- Coba lagi nanti
- Report ke Google Cloud Support jika masih error

---

## 📋 Checklist

- [ ] API Key ada di `.env`
- [ ] API Key dimulai dengan `AIza`
- [ ] Gemini API sudah enabled di Google Cloud
- [ ] Server backend sudah di-restart
- [ ] Terminal menampilkan "GEMINI_API_KEY loaded: true"
- [ ] Frontend connect ke backend (buka http://localhost:3000)
- [ ] Coba test chat dengan prompt sederhana

---

## 🆘 Masih Error?

Jika semua langkah di atas sudah dicoba:

1. **Buat API Key baru** (langkah 2 di atas)
2. **Clear browser cache** (Ctrl+Shift+Delete)
3. **Restart komputer**
4. **Check log detail:**
   ```bash
   # Lihat pesan error lengkap di terminal backend
   # Cari "❌" atau "Error:"
   ```

---

## 📞 Kontact Support

Jika masih ada masalah, siapkan informasi:
- Screenshot error message
- Output log dari terminal backend
- Versi Node.js: `node -v`
- Versi npm: `npm -v`
