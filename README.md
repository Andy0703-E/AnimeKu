# AnimeKita

Website streaming anime gratis dengan subtitle Indonesia. Platform modern untuk menonton anime terbaru dan rekomendasi pilihan.

## Tentang Project

AnimeKita adalah web application yang menyediakan layanan streaming anime gratis dengan subtitle Indonesia. Website ini dibangun dengan teknologi modern dan dirancang khusus untuk memberikan pengalaman menonton yang optimal bagi pecinta anime di Indonesia.

## Fitur Utama

- **Anime Terbaru** - Menampilkan daftar anime yang baru rilis atau update episode terbaru
- **Rekomendasi Anime** - Anime pilihan yang direkomendasikan untuk pengguna
- **Pencarian Anime** - Fitur pencarian berdasarkan judul anime
- **Detail Anime** - Informasi lengkap tentang anime termasuk sinopsis, genre, status, dan daftar episode
- **Streaming Video** - Pemutar video untuk menonton episode anime
- **Daftar Movie** - Koleksi anime movie
- **Responsive Design** - Tampilan optimal di desktop, tablet, dan mobile

## Teknologi yang Digunakan

- **Frontend Framework**: React 18 dengan Vite
- **Routing**: React Router DOM
- **Styling**: Vanilla CSS dengan CSS Variables
- **Icons**: Lucide React
- **API**: Sansekai Anime API (https://api.sansekai.my.id)

## Instalasi

### Prasyarat

Pastikan Anda sudah menginstall:
- Node.js versi 16 atau lebih baru
- npm atau yarn

### Langkah Instalasi

1. Clone repository ini
```bash
git clone https://github.com/Andy0703-E/AnimeKu.git
cd AnimeKu
```

2. Install dependencies
```bash
npm install
```

3. Jalankan development server
```bash
npm run dev
```

4. Buka browser dan akses `http://localhost:5173`

## Perintah yang Tersedia

- `npm run dev` - Menjalankan development server
- `npm run build` - Build project untuk production
- `npm run preview` - Preview build production secara lokal
- `npm run lint` - Menjalankan ESLint untuk code quality check

## Struktur Project

```
src/
├── components/          # Komponen React reusable
│   ├── Navbar.jsx      # Navigasi header
│   ├── AnimeCard.jsx   # Card untuk menampilkan anime
│   ├── Footer.jsx      # Footer website
│   └── LoadingSpinner.jsx
├── pages/              # Halaman-halaman utama
│   ├── Home.jsx        # Halaman beranda
│   ├── Detail.jsx      # Halaman detail anime
│   ├── Watch.jsx       # Halaman nonton anime
│   ├── Search.jsx      # Halaman pencarian
│   └── Movie.jsx       # Halaman daftar movie
├── services/           # Service layer untuk API
│   └── api.js          # API service handler
├── App.jsx             # Root component dengan routing
├── main.jsx            # Entry point aplikasi
└── index.css           # Global styles
```

## API Endpoints

Project ini menggunakan Sansekai Anime API dengan endpoint berikut:

- `GET /api/anime/latest` - Mendapatkan daftar anime terbaru
- `GET /api/anime/recommended` - Mendapatkan anime rekomendasi
- `GET /api/anime/search?query={judul}` - Mencari anime berdasarkan judul
- `GET /api/anime/detail?urlId={slug}` - Mendapatkan detail anime
- `GET /api/anime/movie` - Mendapatkan daftar anime movie
- `GET /api/anime/getvideo?chapterUrlId={id}` - Mendapatkan link video episode

## Fitur Desain

- **Modern UI/UX** - Desain clean dan professional untuk audience muda
- **Dark Theme** - Tema gelap yang nyaman untuk mata
- **Smooth Animations** - Animasi halus pada hover dan transisi
- **Responsive Layout** - Grid layout yang adaptif di semua ukuran layar
- **Typography** - Menggunakan Inter font untuk keterbacaan optimal

## Browser Support

- Chrome (versi terbaru)
- Firefox (versi terbaru)
- Safari (versi terbaru)
- Edge (versi terbaru)

## Kontribusi

Kontribusi selalu diterima. Untuk perubahan besar, silakan buka issue terlebih dahulu untuk mendiskusikan perubahan yang ingin Anda lakukan.

## Lisensi

Project ini dibuat untuk tujuan edukasi dan hiburan.

## Kredit

- **Developer**: Andi Agung
- **API Provider**: Sansekai API (https://api.sansekai.my.id)
- **Year**: 2026

## Catatan

Website ini menggunakan API pihak ketiga untuk mendapatkan data anime. Pastikan koneksi internet Anda stabil untuk pengalaman streaming yang optimal.
