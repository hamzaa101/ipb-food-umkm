import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/Order.css';
import menuNasiGoreng from '../assets/nasi-goreng.jpg';

const Rating: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Tangkap ID dari URL
  const [rating, setRating] = useState<number>(0);

  const handleKirim = () => {
    alert(`Terima kasih! Kamu memberikan rating ${rating} bintang.`);
    navigate('/history');
  };

  return (
    <div className="order-page-container">
      <div className="order-mobile-wrapper" style={{ padding: '24px', backgroundColor: '#FFF' }}>
        
        {/* HEADER TANPA TOMBOL KEMBALI */}
        <header style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '18px', color: '#243D67', margin: 0, fontWeight: 700 }}>Beri Nilai</h2>
        </header>

        <div className="rating-profile">
          <img src={menuNasiGoreng} alt="Store" className="rating-avatar" />
          <div style={{ textAlign: 'center' }}>
            <h3 style={{ margin: 0, color: '#243D67', fontSize: '20px' }}>Nasi Goreng Pak Salman</h3>
            <p style={{ margin: '4px 0 0 0', color: '#9CA3AF', fontSize: '12px' }}>ID Pesanan: {id}</p>
          </div>
        </div>

        <div className="detail-section" style={{ textAlign: 'center', padding: '32px 16px', border: '1px solid #E6E8EC', borderRadius: '12px', marginBottom: '24px' }}>
          <h4 style={{ color: '#243D67', fontSize: '16px', marginTop: 0, marginBottom: '24px' }}>Bagaimana rasa makanannya?</h4>
          
          {/* BINTANG YANG SUDAH DIPERBAIKI */}
          <div className="rating-stars" style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <svg 
                key={star} 
                onClick={() => setRating(star)}
                style={{ cursor: 'pointer' }}
                xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"
              >
                <path 
                  d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                  fill={star <= rating ? "#FFB800" : "#E6E8EC"} 
                />
              </svg>
            ))}
          </div>
        </div>

        <button 
          className="btn-kirim" 
          onClick={handleKirim} 
          disabled={rating === 0} 
          style={{ 
            opacity: rating === 0 ? 0.5 : 1,
            maxWidth: '347px', 
            height: '44px', 
            alignSelf: 'center',
            borderRadius: '12px', 
            background: '#FFB800', 
            color: '#FFF', 
            border: 'none', 
            fontWeight: 700, 
            fontSize: '16px', 
            cursor: 'pointer'
          }}
        >
          Kirim
        </button>

      </div>
    </div>
  );
};

export default Rating;