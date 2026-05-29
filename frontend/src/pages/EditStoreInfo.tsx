/* --- src/pages/EditStoreInfo.tsx --- */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/StoreEditForms.css';

const EditStoreInfo: React.FC = () => {
  const navigate = useNavigate();

  // --- States (Data Mock) ---
  const [storeName, setStoreName] = useState('Nasi Goreng Pak Salman');
  const [waNumber, setWaNumber] = useState('+62801234567890');
  const [location, setLocation] = useState('Kantin Sapta FATETA');

  return (
    <div className="sef-layout">
      <div className="sef-mobile-wrapper">
        
        {/* HEADER */}
        <header className="sef-header">
          <h2>Profil Toko</h2>
        </header>

        <div className="sef-content">
          
          <div className="sef-form-group">
            <label>Nama Toko</label>
            <input 
              type="text" 
              className="sef-input" 
              value={storeName} 
              onChange={(e) => setStoreName(e.target.value)} 
            />
          </div>

          <div className="sef-form-group">
            <label>Nomor Whatsapp aktif</label>
            <input 
              type="text" 
              className="sef-input" 
              value={waNumber} 
              onChange={(e) => setWaNumber(e.target.value)} 
            />
          </div>

          <div className="sef-form-group">
            <label>Lokasi Toko</label>
            <div className="sef-select-box">
              <span>{location}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M6 9L12 15L18 9" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

        </div>

        {/* BOTTOM ACTION BAR - Tombol Tunggal Simpan */}
        <div className="sef-bottom-bar">
          <div className="sef-bottom-content">
            <button className="sef-btn-primary-large" onClick={() => navigate('/merchant/store-profile', { replace: true })}>
              Simpan Perubahan
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EditStoreInfo;