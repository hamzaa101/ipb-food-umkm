import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulasi login sukses, arahkan ke halaman utama
    navigate('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#0F172A] p-6 flex flex-col justify-center">
      
      {/* Card Form */}
      <div className="bg-white rounded-4xl p-8 shadow-xl">
        <h1 className="text-2xl font-bold text-[#243D67] mb-6">Masuk</h1>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
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

          <div className="flex items-center gap-2 mt-1">
            <input type="checkbox" id="ingat-saya" className="w-4 h-4 accent-[#FF9746] rounded border-gray-300" />
            <label htmlFor="ingat-saya" className="text-sm text-gray-500">Ingat saya</label>
          </div>

          <button 
            type="submit"
            className="w-full py-3.5 mt-2 bg-[#FF9746] hover:bg-[#FF7F2A] text-white font-semibold rounded-xl transition-colors"
          >
            Masuk
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-500">
          Belum punya akun? <Link to="/register" className="text-[#243D67] font-bold">Daftar</Link>
        </p>
      </div>

      <div className="text-center mt-6 text-white/50 font-semibold text-sm">IPB Food Hub</div>
    </div>
  );
}