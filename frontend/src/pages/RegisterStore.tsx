import React, { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterStore.css';

const RegisterStore: React.FC = () => {
  const navigate = useNavigate();

  // State Form
  const [storeName, setStoreName] = useState<string>('');
  const [whatsapp, setWhatsapp] = useState<string>('');
  const [location, setLocation] = useState<string>('');

  // State Interaksi
  const [isLocationOpen, setIsLocationOpen] = useState<boolean>(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);

  // Daftar Lokasi Kantin
  const locations: string[] = [
    'Kantin Sapta FATETA',
    'Kantin Blue Corner FPIK',
    'Kantin Plasma FEMA',
    'Kantin Golden Corner FMIPA',
    'Kantin Pascasarjana',
  ];

  const handleSubmit = (): void => {
    // Di sini logika API diletakkan nantinya
    setIsSuccessModalOpen(true);
  };

  return (
    <div className="register-store-container">
      <div className="rs-mobile-wrapper">

        {/* HEADER */}
        <header className="rs-header">
          <h2>Daftarkan Toko Anda</h2>
        </header>

        {/* UPLOAD BOX */}
        <div className="rs-upload-box">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>

          <span className="rs-upload-text">
            Tambahkan foto banner toko anda
          </span>
        </div>

        {/* FORM */}
        <div className="rs-form">

          <div className="rs-input-group">
            <label>Nama Toko</label>

            <input
              type="text"
              className="rs-input"
              placeholder="Contoh: Nasi Goreng Pak Salman"
              value={storeName}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setStoreName(e.target.value)
              }
            />
          </div>

          <div className="rs-input-group">
            <label>Nomor Whatsapp aktif</label>

            <input
              type="text"
              className="rs-input"
              placeholder="Contoh: 081234567890"
              value={whatsapp}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setWhatsapp(e.target.value)
              }
            />
          </div>

          <div className="rs-input-group">
            <label>Lokasi Toko</label>

            <div
              className={`rs-select-btn ${isLocationOpen ? 'open' : ''}`}
              onClick={() => setIsLocationOpen(!isLocationOpen)}
            >
              {location || 'Pilih Lokasi'}

              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#243D67"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  transform: isLocationOpen
                    ? 'rotate(180deg)'
                    : 'none',
                  transition: 'transform 0.2s',
                }}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>

            {/* DROPDOWN KANTIN */}
            {isLocationOpen && (
              <div className="rs-dropdown-menu">
                {locations.map((loc: string, index: number) => (
                  <div
                    key={index}
                    className="rs-dropdown-item"
                    onClick={() => {
                      setLocation(loc);
                      setIsLocationOpen(false);
                    }}
                  >
                    {loc}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM STICKY BAR */}
        <div className="rs-bottom-bar">
          <button
            className="btn-ajukan"
            onClick={handleSubmit}
          >
            Ajukan Pendaftaran
          </button>
        </div>

        {/* SUCCESS MODAL */}
        {isSuccessModalOpen && (
          <div className="success-modal-overlay">
            <div className="success-modal-box">

              {/* Ikon sukses */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
              >
                <path
                  d="M24 6C33.9411 6 42 14.0589 42 24C42 33.9411 33.9411 42 24 42C14.0589 42 6 33.9411 6 24C6 14.0589 14.0589 6 24 6ZM32.6406 17.2314C32.2164 16.8779 31.585 16.9352 31.2314 17.3594L22.6338 27.6777C22.2873 28.0935 22.0921 28.3233 21.9365 28.4648C21.9347 28.4665 21.9325 28.4681 21.9307 28.4697C21.9287 28.4683 21.9258 28.4673 21.9238 28.4658C21.7561 28.3389 21.541 28.1269 21.1582 27.7441L16.707 23.293C16.3165 22.9024 15.6835 22.9024 15.293 23.293C14.9024 23.6835 14.9024 24.3165 15.293 24.707L19.7441 29.1582C20.0853 29.4993 20.4134 29.8313 20.7178 30.0615C21.0043 30.2781 21.3686 30.4835 21.8232 30.5146L22.0234 30.5166L22.2227 30.4961C22.6726 30.4238 23.0165 30.186 23.2822 29.9443C23.5644 29.6876 23.8612 29.3284 24.1699 28.958L32.7686 18.6406C33.1221 18.2164 33.0648 17.585 32.6406 17.2314Z"
                  fill="#22C55E"
                />
              </svg>

              <h3 className="success-title">
                Pendaftaran telah masuk!
              </h3>

              <p className="success-subtitle">
                Silahkan menunggu notifikasi terkait pendaftaran toko.
              </p>

              <button
                className="btn-ajukan"
                onClick={() => navigate('/dashboard')}
              >
                Kembali ke beranda
              </button>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default RegisterStore;