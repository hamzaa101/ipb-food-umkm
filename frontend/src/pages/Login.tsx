import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import AuthLayout from '../layouts/AuthLayout';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false); // To simulate error state
  // const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login error for demonstration
    setError(true);
    // navigate('/dashboard');
  };

  return (
    <AuthLayout>
      <div className="flex flex-col gap-6">
        <h1 className="text-[32px] font-bold text-secondary">Masuk</h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          {/* Phone Input */}
          <div>
            <input
              type="tel"
              placeholder="Nomor Telepon"
              className="w-full px-4 py-3.5 rounded-xl border border-border-light bg-surface-light text-text-primary-light placeholder:text-text-muted-light focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Kata Sandi"
              className="w-full pl-4 pr-12 py-3.5 rounded-xl border border-border-light bg-surface-light text-text-primary-light placeholder:text-text-muted-light focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted-light hover:text-text-secondary-light transition-colors"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="remember" 
              className="w-5 h-5 rounded-sm border-border-light text-primary focus:ring-primary accent-primary"
            />
            <label htmlFor="remember" className="text-text-secondary-light text-sm">
              ingat saya
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-2 py-3.5 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl text-lg transition-colors"
          >
            Masuk
          </button>

          {/* Error Message (Conditional) */}
          {error && (
            <p className="text-danger text-sm text-center leading-snug">
              Nomor telepon atau kata sandi anda salah,<br />silahkan coba lagi
            </p>
          )}

          {/* Register Link */}
          <p className="text-center text-text-secondary-light text-sm mt-2">
            Belum punya akun?{' '}
            <Link to="/register/role" className="font-semibold text-secondary hover:underline">
              Daftar
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}