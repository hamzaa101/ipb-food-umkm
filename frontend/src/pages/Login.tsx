import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';
import RoleSelectionModal from '../components/RoleSelectionModal'; // Import Modal

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  
  // State baru untuk mengontrol Modal Pilih Peran
  const [showRoleModal, setShowRoleModal] = useState<boolean>(false);

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulasi Login Berhasil: Alih-alih langsung navigasi, kita munculkan modal
    setShowRoleModal(true); 
  };

  return (
    <div className="auth-layout">
      <div className="auth-card">
        <h1 className="auth-title">Masuk</h1>
        
        <form className="auth-form" onSubmit={handleLogin}>
          <div className="input-wrapper">
            <input 
              type="text" 
              placeholder="Nomor Telepon" 
              className={`auth-input ${isError ? 'is-error' : ''}`} 
            />
          </div>

          <div className="input-wrapper">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Kata Sandi" 
              className={`auth-input ${isError ? 'is-error' : ''}`} 
            />
            <button 
              type="button" 
              className="password-toggle" 
              onClick={() => setShowPassword(!showPassword)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {showPassword ? (
                  <>
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </>
                ) : (
                  <>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </>
                )}
              </svg>
            </button>
          </div>

          <label className="remember-me">
            <input type="checkbox" />
            <span>ingat saya</span>
          </label>

          <button type="submit" className="btn-submit">Masuk</button>
          
          {isError && (
            <p className="error-text">Nomor telepon atau kata sandi anda salah, silahkan coba lagi</p>
          )}
        </form>

        <p className="auth-link-text">
          Belum punya akun? <span className="auth-link" onClick={() => navigate('/register')}>Daftar</span>
        </p>
      </div>

      <div className="auth-footer-logo">IPB Food Hub</div>

      {/* Panggil Modal di sini */}
      <RoleSelectionModal 
        isOpen={showRoleModal} 
        onClose={() => setShowRoleModal(false)} 
      />
    </div>
  );
};

export default Login;