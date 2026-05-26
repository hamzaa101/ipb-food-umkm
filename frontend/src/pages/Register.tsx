import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  
  // State untuk mengontrol tampilan
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Tambahkan tipe FormEvent<HTMLFormElement> pada event parameter (e)
  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // DEMO LOGIC: 
    // Klik pertama memunculkan error, klik kedua memunculkan sukses
    if (!isError && !isSuccess) {
      setIsError(true);
    } else if (isError) {
      setIsError(false);
      setIsSuccess(true);
    }
  };

  // Tampilan Jika Sukses Register
  if (isSuccess) {
    return (
      <div className="auth-layout">
        <div className="auth-card">
          <div className="success-container">
            <div className="success-icon">
              {/* Check SVG */}
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h2 className="success-title">Pendaftaran Berhasil!</h2>
            <p className="success-subtitle">Silahkan masuk untuk menggunakan IPB Food HUB</p>
            <button className="btn-submit" style={{ width: '100%' }} onClick={() => navigate('/login')}>
              Masuk
            </button>
          </div>
        </div>
        <div className="auth-footer-logo">IPB Food Hub</div>
      </div>
    );
  }

  // Tampilan Form Biasa / Error
  return (
    <div className="auth-layout">
      <div className="auth-card">
        <h1 className="auth-title">Daftar</h1>
        
        <form className="auth-form" onSubmit={handleRegister}>
          <div className="input-wrapper">
            <input type="text" placeholder="Nama" className="auth-input" />
          </div>

          <div className="input-wrapper">
            <input type="text" placeholder="Nomor Telepon" className="auth-input" />
          </div>

          <div className="input-wrapper">
            <input 
              type={showPassword ? "text" : "password"} 
              placeholder="Kata Sandi" 
              className={`auth-input ${isError ? 'is-error' : ''}`} 
              defaultValue={isError ? "12345" : ""} /* Dummy input untuk trigger state error di gambar */
            />
            <button type="button" className="password-toggle" onClick={() => setShowPassword(!showPassword)}>
              {/* Simple Eye Icon SVG */}
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
            {isError && <p className="error-text-left">Kata Sandi minimal 8 karakter</p>}
          </div>

          <div className="input-wrapper">
            <input 
              type={showConfirm ? "text" : "password"} 
              placeholder="Konfirmasi Kata Sandi" 
              className={`auth-input ${isError ? 'is-error' : ''}`} 
              defaultValue={isError ? "12345" : ""}
            />
            <button type="button" className="password-toggle" onClick={() => setShowConfirm(!showConfirm)}>
              {/* Simple Eye Icon SVG */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {showConfirm ? (
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

          {isError && <p className="error-text">Penuhi seluruh data!</p>}

          <button type="submit" className="btn-submit">Daftar</button>
        </form>

        <p className="auth-link-text">
          Sudah punya akun? <span className="auth-link" onClick={() => navigate('/login')}>Masuk</span>
        </p>
      </div>

      <div className="auth-footer-logo">IPB Food Hub</div>
    </div>
  );
};

export default Register;