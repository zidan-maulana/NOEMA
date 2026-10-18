# Noema

Noema adalah aplikasi web pendamping membaca berbasis kecerdasan buatan yang dirancang untuk menganalisis, menguraikan struktur gagasan, dan menyajikan penjelasan terstruktur dari teks atau literatur konseptual yang padat.

---

## Ringkasan Proyek

Aplikasi ini menggunakan model Google Gemini melalui arsitektur serverless untuk membedah teks kompleks menjadi penjelasan yang mudah dipahami. Hasil analisis disajikan melalui pendekatan bertahap (*progressive disclosure*) yang mencakup inti pemikiran, penjelasan dalam bahasa sederhana, konteks relevansi, pertanyaan reflektif, glosarium istilah kunci, serta catatan pembacaan hermeneutis.

---

## Fitur Utama

- **Analisis Berlapis (Progressive Disclosure):** Menyajikan hasil pembacaan dalam empat tahapan bertingkat untuk mempermudah pemahaman kognitif pengguna.
- **Ekstraksi Istilah Kunci:** Mengidentifikasi konsep atau kosakata penting dalam teks beserta definisi kontekstualnya.
- **Deteksi Domain dan Nada Analisis:** Mengkategorikan teks ke dalam domain pembacaan (filosofis, psikologis, sastra, sosial, analitis) dan menyesuaikan gaya penyampaian secara dinamis.
- **Jurnal Pembacaan (Reading Journal):** Menyimpan riwayat analisis lokal di peramban dan menyinkronkannya ke Firestore saat pengguna masuk dengan akun Google.
- **Ekspor Dokumen Markdown:** Memungkinkan pengguna mengunduh catatan analisis ke dalam berkas Markdown (.md) yang terformat rapi dan aman.
- **Keamanan dan Penanganan Eror:** Dilengkapi pembatas frekuensi permintaan (rate limiting), pencegahan injeksi prompt (prompt injection guard), pelindung kesalahan aplikasi global (React Error Boundary), serta penanganan status luring (offline).

---

## Tumpukan Teknologi (Tech Stack)

### Antarmuka (Frontend)
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Lucide React

### Backend & Layanan Cloud
- Vercel Serverless Functions (`api/analyze.ts`)
- Express (adapter lingkungan pengembangan lokal)
- Google Gen AI SDK (`@google/genai` dengan model Gemini 3.8 Flash)
- Firebase Authentication (Google OAuth Provider)
- Cloud Firestore (penyimpanan dokumen jurnal pembacaan)

---

## Prasyarat Sistem

Sebelum menjalankan proyek, pastikan lingkungan pengembangan Anda telah terpasang:
- Node.js versi 18 atau yang lebih baru
- npm versi 9 atau yang lebih baru
- Kunci API Google Gemini (dapat diperoleh melalui Google AI Studio)

---

## Instalasi dan Konfigurasi

1. Kloning repositori:
   ```bash
   git clone <URL_REPOSITORI_ANDA>
   cd noema
   ```

2. Pasang dependensi proyek:
   ```bash
   npm install
   ```

3. Siapkan variabel lingkungan:
   Salin berkas contoh `.env.example` menjadi `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

4. Konfigurasikan variabel pada `.env.local`:
   ```env
   GEMINI_API_KEY="masukkan_kunci_api_gemini_anda"
   APP_URL="http://localhost:3000"
   ```

---

## Menjalankan Proyek Secara Lokal

Jalankan perintah berikut untuk memulai server pengembangan:

```bash
npm run dev
```

Aplikasi akan berjalan dan dapat diakses melalui peramban di alamat:
```
http://localhost:3000
```

---

## Pengujian dan Pemeriksaan Kode

- **Pemeriksaan Tipe TypeScript:**
  ```bash
  npm run lint
  ```

- **Pembangunan Berkas Produksi (Production Build):**
  ```bash
  npm run build
  ```

- **Uji Keamanan dan Ketahanan Sistem (Chaos & Security Test):**
  ```bash
  npx tsx scripts/chaos-security-test.ts
  ```

---

## Penerapan ke Vercel (Deployment)

Proyek ini telah dikonfigurasi menggunakan berkas `vercel.json` untuk mendukung penerapan langsung di Vercel:

1. Buat proyek baru di [Vercel Dashboard](https://vercel.com/) dan tautkan dengan repositori GitHub proyek ini.
2. Tambahkan variabel lingkungan pada pengaturan proyek Vercel (*Project Settings > Environment Variables*):
   - `GEMINI_API_KEY`: Kunci API Google AI Studio Anda.
3. Jalankan proses deployment. Vercel akan secara otomatis membangun antarmuka statis ke direktori `dist/` dan mengonversi berkas `api/analyze.ts` menjadi fungsi serverless.

---

## Lisensi

Proyek ini didistribusikan di bawah lisensi Apache-2.0.
