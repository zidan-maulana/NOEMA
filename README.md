# Noema (νοήμα) — Penyelisik Makna & Teman Membaca

> *“Teman berpikir untuk buku yang selama ini kamu tutup di halaman sepuluh.”*

**Noema** adalah asisten membaca mendalam (*guided deep reading companion*) berbasis AI yang dirancang untuk membantu pembaca menelusuri, membedah, dan merenungkan paragraf-paragraf sulit dari literatur filsafat, teori sosial, sastra, dan psikologi.

---

## 🏛️ Arsitektur & Teknologi

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS (Vanilla design system dengan palet warna hangat Lora & Space Grotesk).
- **Backend / Serverless:** Vercel Serverless Functions (`api/analyze.ts`) dengan Express adapter untuk development lokal.
- **AI Engine:** Google Gemini 3.8 Flash dengan skema JSON terstruktur, sandboxing anti-injeksi, dan evaluasi densitas semantik hermeneutis.
- **Autentikasi & Penyimpanan:** Firebase Auth (Google Sign-In) & Firestore Cloud Sync dengan dukungan offline/guest mode tanpa kehilangan riwayat.
- **Ketahanan Sistem:** Global React Error Boundary, AbortController timeout 28 detik, Safe LocalStorage wrapper, dan rate limiting cooldown 8 detik.

---

## 📚 Fitur Utama

1. **4 Lapisan Pembacaan (*Progressive Layered Reading*):**
   - **Lapisan I (Inti Pemikiran):** Meringkas jantung pemikiran dalam 1–2 kalimat yang jernih.
   - **Lapisan II (Terjemahan Gagasan):** Membumikan konsep rumit ke bahasa manusiawi yang dekat dan hangat.
   - **Lapisan III (Mengapa Ini Penting):** Mengungkap signifikansi eksistensial dan dampaknya bagi sudut pandang kehidupan.
   - **Lapisan IV (Refleksi Lanjutan):** Pertanyaan filosofis tajam pemantik hening.
2. **Modul Hermeneutis Mendalam:**
   - **Untaian Gagasan:** Pemaparan kosakata kunci dan definisi intuitifnya.
   - **Pembacaan Kedua:** 3 pertanyaan reflektif untuk membongkar asumsi lama.
   - **Jejak Pemikiran:** Resonansi gagasan dengan pemikir-pemikir besar dunia.
3. **Catatan Membaca (*Reading Journal Drawer*):**
   - Penamaan kustom catatan (*inline rename*).
   - Penyematan catatan prioritas (*pin*).
   - Ekspor catatan bersih dalam format **Markdown (.md)** siap baca.
   - Sinkronisasi otomatis dari tamu lokal ke akun Google pengguna saat login.

---

## 🚀 Menjalankan Secara Lokal

### Prasyarat
- **Node.js** (v18 atau lebih baru)
- Kunci API dari [Google AI Studio](https://aistudio.google.com/)

### Langkah Instalasi

1. **Kloning repositori:**
   ```bash
   git clone <url-repository-anda>
   cd noema
   ```

2. **Pasang dependensi:**
   ```bash
   npm install
   ```

3. **Konfigurasi Variabel Lingkungan:**
   Salin `.env.example` menjadi `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   Buka file `.env.local` dan masukkan API Key Anda:
   ```env
   GEMINI_API_KEY="AIzaSy..."
   APP_URL="http://localhost:3000"
   ```

4. **Jalankan server pengembangan:**
   ```bash
   npm run dev
   ```
   Aplikasi dapat diakses di browser melalui **`http://localhost:3000`**.

---

## ☁️ Deployment ke Vercel

Proyek ini telah dikonfigurasi secara *native* untuk Vercel Serverless Architecture:
1. Hubungkan repositori GitHub Anda ke **Vercel Dashboard**.
2. Masukkan **Environment Variables** di Vercel:
   - `GEMINI_API_KEY`: Kunci API Google AI Studio Anda.
3. Klik **Deploy**. Vercel akan otomatis membangun frontend ke `dist/` dan mengeksekusi `api/analyze.ts` sebagai serverless edge endpoint.

---

## 📄 Lisensi
Apache-2.0 License. Dibuat dengan cinta untuk literatur dan keheningan berpikir.
