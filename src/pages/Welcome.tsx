import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    <div className="max-w-md mx-auto min-h-screen relative bg-gray-900 flex flex-col justify-end">
      {/* Background Image dengan overlay gelap */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800')" }}
      ></div>
      <div className="absolute inset-0 bg-gradien-to-t from-[#0F172A] via-[#0F172A]/80 to-transparent"></div>

      {/* Konten (Z-index agar di atas background) */}
      <div className="relative z-10 px-6 pb-12 text-center text-white">
        <h1 className="text-3xl font-bold mb-3 leading-tight">
          Mencari jajanan<br/>menjadi lebih mudah
        </h1>
        <p className="text-sm text-gray-300 mb-10 px-4">
          Jelajahi seluruh kantin & UMKM yang berada di lingkungan Kampus IPB
        </p>

        <div className="flex flex-col gap-4">
          <Link 
            to="/login"
            className="w-full py-3.5 bg-[#FF9746] hover:bg-[#FF7F2A] text-white font-semibold rounded-xl transition-colors"
          >
            Masuk
          </Link>
          
          <div className="flex items-center gap-4 my-1">
            <div className="h-px bg-gray-500 flex-1"></div>
            <span className="text-xs text-gray-400">atau</span>
            <div className="h-px bg-gray-500 flex-1"></div>
          </div>

          <Link 
            to="/register"
            className="w-full py-3.5 border border-gray-400 hover:bg-gray-800 text-white font-semibold rounded-xl transition-colors"
          >
            Daftar
          </Link>
        </div>
      </div>
    </div>
  );
}