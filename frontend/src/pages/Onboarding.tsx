import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '../utils/useIsMobile';
import '../styles/Onboarding.css';

// Import assets
import bgMakanan from '../assets/background.png';
import bgMakananDesktop from '../assets/banner-toko.jpg';
import mockupBeranda from '../assets/home-preview.png';
import mockupToko from '../assets/store-preview.png';

const Onboarding: React.FC = () => {
  const isMobile: boolean = useIsMobile();
  const navigate = useNavigate();

  // --- TAMPILAN DESKTOP (Dengan Tombol Login/Register) ---
  if (!isMobile) {
    return (
      <div 
        className="onboarding-page is-desktop" 
        style={{ backgroundImage: `url(${bgMakananDesktop})` }}
      >
        <div className="desktop-dark-overlay"></div>
        <div className="desktop-app-logo">IPB Food Hub</div>

        <div className="desktop-view">
          <div className="desktop-mockups">
            <img src={mockupBeranda} alt="Beranda Utama" />
            <img src={mockupToko} alt="Tampilan Toko" />
          </div>
          
          {/* Hapus inline style flex agar rapi diatur oleh CSS */}
          <div className="desktop-text">
            <h1>Mencari jajanan menjadi lebih mudah</h1>
            <p>Jelajahi seluruh kantin & UMKM yang berada di lingkungan Kampus IPB</p>
            
            {/* TOMBOL SUSUNAN MOBILE DI TENGAH */}
            <div className="desktop-action-wrapper">
              <div className="action-section">
                <button className="btn-primary" onClick={() => navigate('/login')}>
                  Masuk
                </button>
                
                <div className="divider">atau</div>
                
                <button className="btn-outline" onClick={() => navigate('/register')}>
                  Daftar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- TAMPILAN MOBILE ---
  return (
    <div className="onboarding-page is-mobile">
      <div className="mobile-view">
        <img src={bgMakanan} alt="Background Makanan" className="mobile-bg-image" />
        <div className="mobile-gradient-overlay"></div>

        <div className="mobile-content">
          <div className="app-logo-text">IPB Food Hub</div>
          
          <div className="bottom-section">
            <div className="text-section">
              <h2>Mencari jajanan menjadi lebih mudah</h2>
              <p>Jelajahi seluruh kantin & UMKM yang berada di lingkungan Kampus IPB</p>
            </div>

            <div className="action-section">
              <button className="btn-primary" onClick={() => navigate('/login')}>
                Masuk
              </button>
              
              <div className="divider">atau</div>
              
              <button className="btn-outline" onClick={() => navigate('/register')}>
                Daftar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;