import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';

const ChangePassword: React.FC = () => {
  const navigate = useNavigate();

  const [showPassword1, setShowPassword1] = useState<boolean>(false);
  const [showPassword2, setShowPassword2] = useState<boolean>(false);

  return (
    <div className="profile-page-container">
      <div className="profile-mobile-wrapper">

        <header className="profile-page-header">
          <h2>Ubah Kata Sandi</h2>
        </header>

        <div className="profile-form-section">

          <div className="profile-input-group">
            <label>Kata Sandi Baru</label>

            <div className="password-input-wrapper">
              <input
                type={showPassword1 ? 'text' : 'password'}
                className="profile-input"
              />

              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowPassword1(!showPassword1)}
              >
                {showPassword1 ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                ) : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="profile-input-group">
            <label>Masukan Kembali Kata Sandi Baru</label>

            <div className="password-input-wrapper">
              <input
                type={showPassword2 ? 'text' : 'password'}
                className="profile-input"
              />

              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowPassword2(!showPassword2)}
              >
                {showPassword2 ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                ) : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            className="btn-simpan-orange"
            onClick={() => {
              alert('Kata sandi berhasil diubah!');
              navigate(-1);
            }}
          >
            Simpan
          </button>

        </div>
      </div>
    </div>
  );
};

export default ChangePassword;