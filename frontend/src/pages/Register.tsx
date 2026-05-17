import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import AuthLayout from '../layouts/AuthLayout';

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
  };

  const inputClasses = "w-full px-4 py-3.5 rounded-[12px] border border-border-light bg-surface-light text-text-primary-light placeholder:text-text-muted-light focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all";

  return (
    <>
      <AuthLayout>
        <div className="flex flex-col gap-6 relative">
          <h1 className="text-[32px] font-bold text-secondary">Daftar</h1>
          
          <form onSubmit={handleRegister} className="flex flex-col gap-5">
            {/* Nama */}
            <div>
              <input 
                type="text" 
                placeholder="Nama" 
                className={inputClasses}
                required
              />
            </div>

            {/* Nomor Telepon */}
            <div>
              <input 
                type="tel" 
                placeholder="Nomor Telepon" 
                className={inputClasses}
                required
              />
            </div>
            
            {/* Kata Sandi */}
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Kata Sandi" 
                className={`${inputClasses} pr-12`}
                required
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted-light hover:text-text-secondary-light transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {/* Konfirmasi Kata Sandi */}
            <div className="relative">
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                placeholder="Konfirmasi Kata Sandi" 
                className={`${inputClasses} pr-12`}
                required
              />
              <button 
                type="button" 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted-light hover:text-text-secondary-light transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button 
              type="submit"
              className="w-full mt-2 py-3.5 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl text-lg transition-colors"
            >
              Daftar
            </button>
          </form>

          <p className="text-center text-text-secondary-light text-sm mt-2">
            Sudah punya akun?{' '}
            <Link to="/login" className="font-semibold text-secondary hover:underline">
              Masuk
            </Link>
          </p>
        </div>
      </AuthLayout>

      {/* Pop up Berhasil Daftar */}
      {isSuccess && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl p-8 text-center w-full max-w-sm animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} strokeWidth={3} />
            </div>
            <h2 className="text-xl font-bold text-secondary mb-2">Pendaftaran Berhasil!</h2>
            <p className="text-sm text-text-secondary-light mb-8 px-4">Silahkan masuk untuk menggunakan IPB Food Hub</p>
            <button 
              onClick={() => navigate('/login')}
              className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white font-bold rounded-xl transition-colors"
            >
              Masuk
            </button>
          </div>
        </div>
      )}
    </>
  );
}