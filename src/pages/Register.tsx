import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false); // State untuk Pop-up

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Logika API register nanti ditaruh di sini
    
    // Tampilkan pop up sukses
    setIsSuccess(true);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#0F172A] p-6 flex flex-col justify-center relative">
      
      {/* Pop up Berhasil Daftar */}
      {isSuccess && (
        <div className="absolute inset-0 bg-black/60 z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl p-6 text-center w-full max-w-sm animate-fade-in">
            <div className="w-16 h-16 bg-green-100 text-[#22C55E] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h2 className="text-xl font-bold text-[#243D67] mb-2">Pendaftaran Berhasil!</h2>
            <p className="text-sm text-gray-500 mb-6">Silahkan masuk untuk menggunakan IPB Food Hub</p>
            <button 
              onClick={() => navigate('/login')}
              className="w-full py-3 bg-[#FF9746] hover:bg-[#FF7F2A] text-white font-semibold rounded-xl"
            >
              Masuk
            </button>
          </div>
        </div>
      )}

      {/* Card Form */}
      <div className="bg-white rounded-4xl p-8 shadow-xl">
        <h1 className="text-2xl font-bold text-[#243D67] mb-6">Daftar</h1>
        
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input 
            type="text" 
            placeholder="Nama" 
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF9746] text-sm"
            required
          />
          <input 
            type="tel" 
            placeholder="Nomor Telepon" 
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF9746] text-sm"
            required
          />
          
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Kata Sandi" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF9746] text-sm pr-10"
              required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-gray-400">
              {showPassword ? "👁️" : "🙈"}
            </button>
          </div>

          <div className="relative">
            <input 
              type={showConfirmPassword ? "text" : "password"} 
              placeholder="Konfirmasi Kata Sandi" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#FF9746] text-sm pr-10"
              required
            />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-3.5 text-gray-400">
              {showConfirmPassword ? "👁️" : "🙈"}
            </button>
          </div>

          <button 
            type="submit"
            className="w-full py-3.5 mt-2 bg-[#FF9746] hover:bg-[#FF7F2A] text-white font-semibold rounded-xl transition-colors"
          >
            Daftar
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-500">
          Sudah punya akun? <Link to="/login" className="text-[#243D67] font-bold">Masuk</Link>
        </p>
      </div>
      
      <div className="text-center mt-6 text-white/50 font-semibold text-sm">IPB Food Hub</div>
    </div>
  );
}