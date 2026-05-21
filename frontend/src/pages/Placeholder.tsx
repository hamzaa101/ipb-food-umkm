import { Link, useLocation } from 'react-router-dom';

export default function Placeholder() {
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-surface-200">
      <div className="bg-white p-8 rounded-3xl shadow-sm text-center max-w-sm w-full border border-border-light">
        <h1 className="text-2xl font-bold text-secondary mb-4">Halaman Belum Tersedia</h1>
        <p className="text-text-secondary-light mb-6">
          Anda sedang mengunjungi rute <code className="bg-surface-200 px-2 py-1 rounded text-primary">{location.pathname}</code> yang saat ini masih dalam tahap pengembangan.
        </p>
        <Link 
          to="/dashboard"
          className="inline-block w-full py-3 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl transition-colors"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
