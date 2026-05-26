import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/StoreDetail.css';
import { useCart } from '../context/CartContext'; // <-- IMPORT CONTEXT GLOBAL

// --- MOCK ASSETS ---
import bannerToko from '../assets/banner-toko.jpg';
import menuNasiGoreng from '../assets/nasi-goreng.jpg'; // Pastikan fotonya ada

// --- INTERFACES ---
interface MenuItem {
  id: number;
  name: string;
  price: number;
  sold: number;
  image: string;
}

interface MenuCategory {
  title: string;
  items: MenuItem[];
}

const StoreDetail: React.FC = () => {
  const navigate = useNavigate();

  // --- AMBIL DATA DARI GLOBAL STATE (CONTEXT) ---
  const { cartItems, addToCart, removeFromCart, totalItemsInCart } = useCart();

  // --- STATES TOKO & FILTER ---
  // Ubah isStoreOpen jadi false jika ingin ngetes tampilan tutup
  const [isStoreOpen, setIsStoreOpen] = useState<boolean>(true); 
  const [activeSort, setActiveSort] = useState<'terlaris' | 'promo' | null>(null); 
  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [showFab, setShowFab] = useState<boolean>(false);

  // --- MOCK DATA ---
  const categoriesList = ["Semua", "Rekomendasi Utama", "Nasi Goreng", "Mie Goreng", "Minuman", "Lainnya"];

  const storeData: MenuCategory[] = [
    {
      title: "Rekomendasi Utama",
      items: [
        { id: 101, name: "Nasi Goreng Biasa", price: 12000, sold: 16, image: menuNasiGoreng },
        { id: 102, name: "Es Teh Manis", price: 5000, sold: 13, image: menuNasiGoreng },
      ]
    },
    {
      title: "Nasi Goreng",
      items: [
        { id: 201, name: "Nasi Goreng Biasa", price: 12000, sold: 16, image: menuNasiGoreng },
        { id: 202, name: "Nasi Goreng Spesial", price: 20000, sold: 13, image: menuNasiGoreng },
        { id: 203, name: "Nasi Goreng Pedas", price: 15000, sold: 10, image: menuNasiGoreng },
        { id: 204, name: "Nasi Goreng Seafood", price: 25000, sold: 8, image: menuNasiGoreng },
      ]
    }
  ];

  // --- LOGIKA SCROLL ---
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowFab(true);
      } else {
        setShowFab(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`store-detail-container ${!isStoreOpen ? 'is-closed' : ''}`}>
      <div className="sd-mobile-wrapper">
        
        {/* BANNER */}
        <div className="sd-banner-wrapper">
          <img src={bannerToko} alt="Banner Toko" className="sd-banner-img" />
        </div>

        {/* KERANJANG MELAYANG */}
        <div className="sd-cart-fixed-container">
          <button className="sd-cart-btn" onClick={() => navigate('/cart')}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="20" fill="#9CA3AF"/>
              <svg x="4" y="4" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M5.33331 5.33301H7.77176C8.52171 5.33301 8.89669 5.33301 9.16795 5.5448C9.43921 5.7566 9.53016 6.12038 9.71205 6.84794L10.0199 8.07929C10.2758 9.10315 10.4038 9.61508 10.7169 9.97625C10.8866 10.1721 11.0928 10.3331 11.324 10.4503C11.7503 10.6663 12.2779 10.6663 13.3333 10.6663" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M24 22.667H10.0679C9.45671 22.667 9.15112 22.667 8.93982 22.5612C8.64666 22.4145 8.44405 22.1334 8.39754 21.8089C8.36402 21.5749 8.46065 21.285 8.65392 20.7052C8.86804 20.0629 8.97511 19.7417 9.15649 19.4919C9.40793 19.1456 9.76379 18.8891 10.1718 18.7601C10.4661 18.667 10.8047 18.667 11.4818 18.667H18.6667" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21.4306 18.667H12.3609C11.3832 18.667 10.5488 17.9602 10.3881 16.9958L9.62441 12.4136C9.47203 11.4993 10.1771 10.667 11.104 10.667H25.0486C25.792 10.667 26.2755 11.4493 25.943 12.1142L23.2194 17.5614C22.8806 18.239 22.1881 18.667 21.4306 18.667Z" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="22.6666" cy="26.6663" r="1.33333" fill="white"/>
                <circle cx="12" cy="26.6663" r="1.33333" fill="white"/>
              </svg>
            </svg>
            {totalItemsInCart > 0 && <div className="sd-cart-dot"></div>}
          </button>
        </div>

        {/* --- STICKY HEADER AREA --- */}
        <div className="sd-sticky-header">
          <div className="sd-info-section">
            <h1 className="sd-store-name">Nasi Goreng Pak Salman</h1>
            <div className="sd-stats-row">
              <div className={`sd-status-pill ${isStoreOpen ? 'open' : 'closed'}`}>
                {isStoreOpen ? 'buka' : 'tutup'}
              </div>
              <div className="sd-rating">
                <svg width="18" height="18" viewBox="0 0 13 13" fill="none">
                  <path d="M5.53269 0.691212C5.83204 -0.230098 7.13545 -0.230099 7.4348 0.691212L8.27985 3.29202C8.41373 3.70405 8.79768 3.98301 9.23091 3.98301H11.9656C12.9343 3.98301 13.3371 5.22262 12.5534 5.79202L10.341 7.39941C9.99048 7.65406 9.84382 8.10543 9.9777 8.51745L10.8228 11.1183C11.1221 12.0396 10.0676 12.8057 9.28391 12.2363L7.07153 10.6289C6.72104 10.3743 6.24644 10.3743 5.89596 10.6289L3.68357 12.2363C2.89986 12.8057 1.84538 12.0396 2.14473 11.1183L2.98979 8.51745C3.12366 8.10543 2.977 7.65406 2.62651 7.39942L0.414133 5.79203C-0.369581 5.22262 0.0331941 3.98301 1.00192 3.98301H3.73657C4.1698 3.98301 4.55376 3.70405 4.68763 3.29202L5.53269 0.691212Z" fill="#FFB800"/>
                </svg>
                <span className="sd-rating-score">4.5</span>
                <span>(56 ratings)</span>
              </div>
              <div className="sd-distance">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 3V3.5C11.6234 3.5 13.75 5.62665 13.75 8.25H14.25H14.75C14.75 5.07436 12.1756 2.5 9 2.5V3ZM14.25 8.25H13.75C13.75 9.94971 12.8842 11.3368 11.8366 12.3935C10.7895 13.4497 9.60254 14.1317 9.06859 14.4087L9.29883 14.8525L9.52907 15.2964C10.1079 14.9961 11.3965 14.2578 12.5468 13.0975C13.6966 11.9377 14.75 10.3121 14.75 8.25H14.25ZM9.29883 14.8525L9.06861 14.4087C9.02331 14.4322 8.97669 14.4322 8.93139 14.4087L8.70117 14.8525L8.47095 15.2964C8.80495 15.4696 9.19505 15.4696 9.52904 15.2964L9.29883 14.8525ZM8.70117 14.8525L8.93141 14.4087C8.39746 14.1317 7.21052 13.4497 6.16339 12.3935C5.1158 11.3368 4.25 9.94971 4.25 8.25H3.75H3.25C3.25 10.3121 4.30342 11.9377 5.45323 13.0975C6.6035 14.2578 7.89214 14.9961 8.47093 15.2964L8.70117 14.8525ZM3.75 8.25H4.25C4.25 5.62665 6.37665 3.5 9 3.5V3V2.5C5.82436 2.5 3.25 5.07436 3.25 8.25H3.75ZM9 6V5.5C7.48122 5.5 6.25 6.73122 6.25 8.25H6.75H7.25C7.25 7.2835 8.0335 6.5 9 6.5V6ZM6.75 8.25H6.25C6.25 9.76878 7.48122 11 9 11V10.5V10C8.0335 10 7.25 9.2165 7.25 8.25H6.75ZM9 10.5V11C10.5188 11 11.75 9.76878 11.75 8.25H11.25H10.75C10.75 9.2165 9.9665 10 9 10V10.5ZM11.25 8.25H11.75C11.75 6.73122 10.5188 5.5 9 5.5V6V6.5C9.9665 6.5 10.75 7.2835 10.75 8.25H11.25Z" fill="#6B7280"/>
                </svg>
                <span>200m</span>
              </div>
            </div>
          </div>

          <div className="sd-filter-section">
            {/* LAYER SAKTI UNTUK FILTER */}
            {!isStoreOpen && <div className="sd-closed-layer"></div>}

            <button className={`sd-chip ${activeSort === 'terlaris' ? 'active' : ''}`} onClick={() => setActiveSort(prev => prev === 'terlaris' ? null : 'terlaris')}>terlaris</button>
            <button className={`sd-chip ${activeSort === 'promo' ? 'active' : ''}`} onClick={() => setActiveSort(prev => prev === 'promo' ? null : 'promo')}>promo</button>
            <button className={`sd-chip ${(selectedCategory !== 'Semua' || isCategoryOpen) ? 'active' : ''}`} onClick={() => setIsCategoryOpen(!isCategoryOpen)}>
              {selectedCategory === 'Semua' ? 'kategori' : selectedCategory}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: isCategoryOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            {isCategoryOpen && (
              <div className="sd-dropdown-wrapper">
                {categoriesList.map(cat => (
                  <div key={cat} className={`sd-dropdown-item ${selectedCategory === cat ? 'active' : ''}`} onClick={() => { setSelectedCategory(cat); setIsCategoryOpen(false); }}>
                    {cat}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div> 

        {/* LIST MENU */}
        <div className="sd-menu-container">
          {/* LAYER SAKTI UNTUK MENU */}
          {!isStoreOpen && <div className="sd-closed-layer"></div>}

          {storeData.map((category) => (
            <div key={category.title}>
              <h3 className="sd-category-title">{category.title}</h3>
              <div className="sd-menu-list">
                {category.items.map((item) => {
                  
                  // MENGAMBIL QTY DARI GLOBAL STATE
                  const qty = cartItems.find(i => i.id === item.id)?.qty || 0;

                  return (
                    <div key={item.id} className="sd-menu-card">
                      <img src={item.image} alt={item.name} className="sd-menu-img" />
                      <div className="sd-menu-info">
                        <h4 className="sd-menu-name">{item.name}</h4>
                        <p className="sd-menu-price">Rp {item.price.toLocaleString('id-ID')}</p>
                        <p className="sd-menu-sold">{item.sold} terjual</p>
                      </div>

                      <div className="sd-menu-actions">
                        {qty > 0 && (
                          <>
                            {/* TOMBOL MINUS (GLOBAL STATE) */}
                            <button className="sd-action-btn" onClick={() => removeFromCart(item.id)}>
                              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                                <path d="M4 9.33333C4 6.38782 6.38781 4 9.33333 4H22.6667C25.6122 4 28 6.38781 28 9.33333V22.6667C28 25.6122 25.6122 28 22.6667 28H9.33333C6.38782 28 4 25.6122 4 22.6667V9.33333Z" stroke="#FF9746" strokeWidth="4"/>
                                <path d="M21.3333 16L10.6667 16" stroke="#FF9746" strokeWidth="4" strokeLinecap="square" strokeLinejoin="round"/>
                              </svg>
                            </button>
                            <div className="sd-action-qty">{qty}</div>
                          </>
                        )}

                        {/* TOMBOL PLUS (GLOBAL STATE) */}
                        <button className="sd-action-btn" onClick={() => {
                            if (isStoreOpen) addToCart({ id: item.id, name: item.name, price: item.price, image: item.image });
                        }}>
                          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <path d="M4 9.33333C4 6.38782 6.38781 4 9.33333 4H22.6667C25.6122 4 28 6.38781 28 9.33333V22.6667C28 25.6122 25.6122 28 22.6667 28H9.33333C6.38782 28 4 25.6122 4 22.6667V9.33333Z" stroke="#FF9746" strokeWidth="4"/>
                            <path d="M16 10.667L16 21.3337" stroke="#FF9746" strokeWidth="4" strokeLinecap="square" strokeLinejoin="round"/>
                            <path d="M21.3333 16L10.6667 16" stroke="#FF9746" strokeWidth="4" strokeLinecap="square" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* FLOATING SCROLL TOP BUTTON */}
        {showFab && (
          <div className="fab-top" onClick={scrollToTop}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M16 10.6667L15.2929 9.95964L16 9.25253L16.7071 9.95964L16 10.6667ZM17 26.6667C17 27.219 16.5523 27.6667 16 27.6667C15.4477 27.6667 15 27.219 15 26.6667L16 26.6667L17 26.6667ZM8 18.6667L7.29289 17.9596L15.2929 9.95964L16 10.6667L16.7071 11.3739L8.70711 19.3739L8 18.6667ZM16 10.6667L16.7071 9.95964L24.7071 17.9596L24 18.6667L23.2929 19.3739L15.2929 11.3739L16 10.6667ZM16 10.6667L17 10.6667L17 26.6667L16 26.6667L15 26.6667L15 10.6667L16 10.6667Z" fill="#9CA3AF"/>
              <path d="M6.66663 4L25.3333 4" stroke="#9CA3AF" strokeWidth="2"/>
            </svg>
          </div>
        )}

      </div>
    </div>
  );
};

export default StoreDetail;