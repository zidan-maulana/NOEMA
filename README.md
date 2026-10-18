# Noema

Aplikasi pendamping membaca berbasis kecerdasan buatan yang dirancang untuk menguraikan struktur gagasan dan menyajikan pemahaman bertingkat dari literatur konseptual yang padat.

---

## Fitur Utama

- **Analisis Berlapis (Progressive Disclosure):** Menyajikan hasil pembacaan bertahap mulai dari inti pemikiran, penjelasan bahasa manusiawi, konteks relevansi, hingga pertanyaan reflektif.
- **Untaian Gagasan:** Mengekstraksi istilah dan konsep kunci dalam teks beserta definisi kontekstualnya.
- **Deteksi Domain dan Nada:** Menyesuaikan analisis secara dinamis berdasarkan corak teks (filosofis, psikologis, sastra, sosial, analitis).
- **Catatan Pembacaan (Reading Journal):** Menyimpan riwayat analisis di peramban dan menyinkronkannya dengan akun Google melalui Firestore.
- **Ekspor Markdown:** Mengunduh hasil pembacaan ke dalam berkas Markdown (.md) yang rapi.
- **Keamanan dan Ketahanan:** Dilengkapi pembatas frekuensi (rate limiting), proteksi prompt injection, dan penanganan kesalahan global (React Error Boundary).

---

## Arsitektur Teknologi

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, Lucide React
- **Backend:** Node.js Serverless Function (`api/analyze.ts`), Express (lingkungan dev lokal)
- **AI Engine:** Google Gemini 3.8 Flash (`@google/genai`)
- **Database & Auth:** Firebase Authentication, Cloud Firestore

---

## Memulai

### Prasyarat
- Node.js versi 18 atau lebih baru
- Kunci API Google Gemini (dari Google AI Studio)

### Instalasi dan Konfigurasi

1. Kloning repositori dan pasang dependensi:
   ```bash
   git clone <URL_REPOSITORI>
   cd noema
   npm install
   ```

2. Konfigurasikan variabel lingkungan:
   ```bash
   cp .env.example .env.local
   ```
   Isi kunci API pada berkas `.env.local`:
   ```env
   GEMINI_API_KEY="masukkan_kunci_api_di_sini"
   APP_URL="http://localhost:3000"
   ```

3. Jalankan server pengembangan:
   ```bash
   npm run dev
   ```
   Buka peramban pada alamat `http://localhost:3000`.

---

## Perintah Kerja

- `npm run dev` : Menjalankan server pengembangan lokal
- `npm run build` : Membangun berkas produksi ke direktori `dist/`
- `npm run lint` : Menjalankan pemeriksaan tipe data TypeScript
