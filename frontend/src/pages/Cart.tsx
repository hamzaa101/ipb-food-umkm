import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Cart.css';
import { useCart } from '../context/CartContext';

// --- MOCK ASSETS ---
import menuNasiGoreng from '../assets/nasi-goreng.jpg'; // Pastikan aset ini tersedia

// --- INTERFACES ---
interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  image: string;
}

const Cart: React.FC = () => {
  const navigate = useNavigate();

// --- STATES ---
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

 // --- MOCK DATA PESANAN ---
  // Sekarang default-nya benar-benar kosong sesuai aslinya!
  const { cartItems, addToCart, removeFromCart, clearCart } = useCart();

  // LOGIKA OTOMATIS: Keranjang kosong jika jumlah item di cartItems adalah 0
  const isCartEmpty = cartItems.length === 0;

  // Menghitung total per item dan total keseluruhan
  const totalPembayaran = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);

const handlePesan = () => {
    setIsModalOpen(false);
    clearCart(); // Mengosongkan keranjang dari context
    alert("Pesanan berhasil dibuat!");
    navigate('/history'); // <-- Ubah baris ini agar mengarah ke Riwayat
  };

  return (
    <div className="cart-page-container">
      <div className="cart-mobile-wrapper">
        
        {/* HEADER */}
        <header className="cart-header">
          <h2>Keranjang</h2>
        </header>

        {/* --- KONDISI KERANJANG KOSONG --- */}
        {isCartEmpty ? (
          <div className="cart-empty-state">
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none">
              <circle cx="30" cy="30" r="22.5" stroke="#9CA3AF" strokeWidth="5"/>
              <path d="M22.5002 37.5L37.5002 22.5" stroke="#9CA3AF" strokeWidth="5"/>
              <path d="M37.5 37.5L22.5 22.5" stroke="#9CA3AF" strokeWidth="5"/>
            </svg>
            <div className="cart-empty-text">
              Keranjang kosong.<br/>Silahkan melakukan pemesanan.
            </div>
          </div>
        ) : (
          /* --- KONDISI KERANJANG TERISI --- */
          <>
            <div className="cart-content">
              
              {/* CARD TOKO & PESANAN */}
              <div className="cart-card">
                <div className="cart-store-header">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#243D67" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  <h3 className="cart-store-name">Nasi Goreng Pak Salman</h3>
                </div>

                {cartItems.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <div className="cart-item">
                      <img src={item.image} alt={item.name} className="cart-item-img" />
                      <div className="cart-item-info">
                        <h4 className="cart-item-name">{item.name}</h4>
                        <p className="cart-item-price">Rp {item.price.toLocaleString('id-ID')}</p>
                      </div>
                      
                      <div className="cart-item-actions">
                        <button className="sd-action-btn" onClick={() => removeFromCart(item.id)}>
                          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                            <path d="M4 9.33333C4 6.38782 6.38781 4 9.33333 4H22.6667C25.6122 4 28 6.38781 28 9.33333V22.6667C28 25.6122 25.6122 28 22.6667 28H9.33333C6.38782 28 4 25.6122 4 22.6667V9.33333Z" stroke="#FF9746" strokeWidth="3"/>
                            <path d="M21.3333 16L10.6667 16" stroke="#FF9746" strokeWidth="3" strokeLinecap="square" strokeLinejoin="round"/>
                          </svg>
                        </button>
                        <div className="cart-qty">{item.qty}</div>
                        <button className="sd-action-btn" onClick={() => addToCart(item)}>
                          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                            <path d="M4 9.33333C4 6.38782 6.38781 4 9.33333 4H22.6667C25.6122 4 28 6.38781 28 9.33333V22.6667C28 25.6122 25.6122 28 22.6667 28H9.33333C6.38782 28 4 25.6122 4 22.6667V9.33333Z" stroke="#FF9746" strokeWidth="3"/>
                            <path d="M16 10.667L16 21.3337" stroke="#FF9746" strokeWidth="3" strokeLinecap="square" strokeLinejoin="round"/>
                            <path d="M21.3333 16L10.6667 16" stroke="#FF9746" strokeWidth="3" strokeLinecap="square" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    <div className="cart-total-row">
                      <span className="cart-total-label">Total</span>
                      <span className="cart-total-value">Rp {(item.price * item.qty).toLocaleString('id-ID')}</span>
                    </div>

                    {/* Garis pemisah kecuali untuk item terakhir */}
                    {index < cartItems.length - 1 && <hr style={{ borderTop: '1px solid #E6E8EC', borderBottom: 'none', margin: '16px 0' }} />}
                  </React.Fragment>
                ))}

                {/* GRAND TOTAL ROW */}
                <div className="cart-total-row cart-grand-total">
                  <span className="cart-total-label">Total Pembayaran</span>
                  <span className="cart-total-value">Rp {totalPembayaran.toLocaleString('id-ID')}</span>
                </div>
              </div>

              {/* CARD PROMO */}
              <div className="cart-card">
                <h3 className="cart-section-title">Promo aktif</h3>
                <div className="cart-promo-box">
                  <input type="text" placeholder="Tidak ada promo yang digunakan" readOnly />
                  <button className="cart-promo-btn">Cari</button>
                </div>
              </div>

              {/* CARD RINCIAN */}
              <div className="cart-card">
                <h3 className="cart-section-title">Rincian Pengambilan</h3>
                <ul className="cart-rincian-list">
                  <li>Pesanan siap dalam ~15-20 menit</li>
                  <li>Harap <b>segera</b> mengambil pesanan dan melakukan pembayaran setelah pesanan sudah siap</li>
                </ul>
              </div>
              
            </div>

            {/* STICKY BOTTOM BAR */}
            <div className="cart-bottom-bar">
              <div className="cart-bottom-info">
                <span className="cart-bottom-label">Bayar di tempat</span>
                <span className="cart-bottom-price">Rp {totalPembayaran.toLocaleString('id-ID')}</span>
              </div>
              <button className="btn-pesan" onClick={() => setIsModalOpen(true)}>
                Lakukan Pemesanan
              </button>
            </div>
          </>
        )}

        {/* MODAL KONFIRMASI PESANAN */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-box">
              <div className="modal-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#FF9746" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
              </div>
              <h3 className="modal-title">Lakukan Pemesanan?</h3>
              <p className="modal-subtitle">Pastikan pesanan sudah benar.<br/>Pesanan tidak dapat dibatalkan.</p>
              <div className="modal-actions">
                <button className="btn-kembali" onClick={() => setIsModalOpen(false)}>Kembali</button>
                <button className="btn-confirm-pesan" onClick={handlePesan}>Pesan</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Cart;