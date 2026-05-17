import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    <div 
      className="min-h-screen relative flex flex-col justify-end p-6"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-bg-dark/70 bg-linear-to-t from-bg-dark/95 via-bg-dark/80 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md mx-auto text-center flex flex-col gap-6 pb-12">
        <div className="flex flex-col gap-3">
          <h1 className="text-4xl font-bold text-white leading-tight">
            Mencari jajanan<br />menjadi lebih mudah
          </h1>
          <p className="text-text-primary-dark text-lg px-4">
            Jelajahi seluruh kantin & UMKM yang berada di lingkungan Kampus IPB
          </p>
        </div>

        <div className="flex flex-col gap-4 mt-8">
          <Link 
            to="/login"
            className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white font-semibold rounded-full text-lg transition-colors"
          >
            Masuk
          </Link>
          
          <div className="flex items-center gap-4 text-text-primary-dark/80 text-sm">
            <div className="flex-1 h-px bg-divider-dark"></div>
            <span>atau</span>
            <div className="flex-1 h-px bg-divider-dark"></div>
          </div>

          <Link 
            to="/register/role"
            className="w-full py-3.5 bg-transparent border-2 border-white text-white font-semibold rounded-full text-lg hover:bg-white/10 transition-colors"
          >
            Daftar
          </Link>
        </div>
      </div>
      
      {/* Top Logo text just in case */}
      <div className="absolute top-12 left-0 right-0 text-center z-10">
        <h2 className="text-2xl font-bold text-white">IPB Food Hub</h2>
      </div>
    </div>
  );
}