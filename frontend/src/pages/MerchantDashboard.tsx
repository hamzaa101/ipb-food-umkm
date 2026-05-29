import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Tambahan Import Navigate
import '../styles/MerchantDashboard.css';

// Tipe Data
type StoreStatus = 'Buka' | 'Tutup';
type MainTab = 'Pesanan' | 'Kelola Menu' | 'Promo';
type OrderStatus = 'Antrean' | 'Proses' | 'Selesai';
type MenuFilter = 'Semua' | 'Tersedia' | 'Habis'; 

interface OrderItem {
  name: string;
  qty: number;
  price: number;
  imgUrl: string;
}

interface OrderData {
  id: string;
  customerName: string;
  time: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  isRated?: boolean;
}

interface MenuData {
  id: number;
  name: string;
  price: number;
  sold: number;
  isAvailable: boolean;
  imgUrl: string;
}

// Data Notifikasi
interface NotificationData {
  id: number;
  text: string;
  time: string;
  isRead: boolean;
}

const notifData: NotificationData[] = [
  { id: 1, text: 'Pesanan anda telah masuk!', time: '13 Februari 2026 (15.54)', isRead: false },
  { id: 2, text: 'Pesanan anda telah masuk!', time: '13 Februari 2026 (15.54)', isRead: false },
  { id: 3, text: 'Pesanan anda telah masuk!', time: '13 Februari 2026 (15.54)', isRead: true },
  { id: 4, text: 'Pesanan anda telah masuk!', time: '13 Februari 2026 (15.54)', isRead: true },
  { id: 5, text: 'Pesanan anda telah masuk!', time: '13 Februari 2026 (15.54)', isRead: true },
  { id: 6, text: 'Pesanan anda telah masuk!', time: '13 Februari 2026 (15.54)', isRead: true },
];

const mockOrders: OrderData[] = [
  {
    id: 'NPS-130226004', customerName: 'Arif Satria', time: '08.36', status: 'Antrean',
    total: 50000,
    items: [
      { name: 'Nasi Goreng Spesial', qty: 2, price: 20000, imgUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=100&h=100&fit=crop' },
      { name: 'Es Teh Manis', qty: 1, price: 5000, imgUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=100&h=100&fit=crop' }
    ]
  },
  {
    id: 'NPS-130226004', customerName: 'Arif Satria', time: '08.37', status: 'Proses',
    total: 50000,
    items: [
      { name: 'Nasi Goreng Spesial', qty: 2, price: 20000, imgUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=100&h=100&fit=crop' },
      { name: 'Es Teh Manis', qty: 1, price: 5000, imgUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=100&h=100&fit=crop' }
    ]
  },
  {
    id: 'NPS-130226005', customerName: 'Arif Satria', time: '09.09', status: 'Selesai',
    total: 50000, isRated: false,
    items: [
      { name: 'Nasi Goreng Spesial', qty: 2, price: 20000, imgUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=100&h=100&fit=crop' },
      { name: 'Es Teh Manis', qty: 1, price: 5000, imgUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=100&h=100&fit=crop' }
    ]
  },
  {
    id: 'NPS-130226004', customerName: 'Arif Satria', time: '09.01', status: 'Selesai',
    total: 50000, isRated: true,
    items: [
      { name: 'Nasi Goreng Spesial', qty: 2, price: 20000, imgUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=100&h=100&fit=crop' },
      { name: 'Es Teh Manis', qty: 1, price: 5000, imgUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=100&h=100&fit=crop' }
    ]
  }
];

const mockMenus: MenuData[] = [
  { id: 1, name: 'Nasi Goreng Biasa', price: 12000, sold: 16, isAvailable: true, imgUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=100&h=100&fit=crop' },
  { id: 2, name: 'Es teh Manis', price: 5000, sold: 13, isAvailable: true, imgUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=100&h=100&fit=crop' },
  { id: 3, name: 'Nasi Goreng Sosis', price: 15000, sold: 9, isAvailable: false, imgUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=100&h=100&fit=crop' },
];

const MerchantDashboard: React.FC = () => {
  const navigate = useNavigate(); // 2. Tambahan Navigate

  const [storeStatus, setStoreStatus] = useState<StoreStatus>('Buka');
  const [mainTab, setMainTab] = useState<MainTab>('Kelola Menu'); 
  const [orderFilter, setOrderFilter] = useState<OrderStatus>('Antrean');
  
  const [menuFilter, setMenuFilter] = useState<MenuFilter>('Semua'); 
  const [menus, setMenus] = useState<MenuData[]>(mockMenus);

  const [showFab, setShowFab] = useState<boolean>(false);
  const [isNotifOpen, setIsNotifOpen] = useState<boolean>(false);
  
  // 3. Tambahan State Pop Up Profil
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState<boolean>(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false); 

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (): void => {
    if (scrollRef.current) {
      if (scrollRef.current.scrollTop > 300) {
        setShowFab(true);
      } else {
        setShowFab(false);
      }
    }
  };

  const scrollToTop = (): void => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const filteredOrders = mockOrders.filter(o => o.status === orderFilter);
  const antreanCount = mockOrders.filter(o => o.status === 'Antrean').length;
  const prosesCount = mockOrders.filter(o => o.status === 'Proses').length;
  const selesaiCount = mockOrders.filter(o => o.status === 'Selesai').length;

  const filteredMenus = menus.filter(m => {
    if (menuFilter === 'Semua') return true;
    if (menuFilter === 'Tersedia') return m.isAvailable;
    if (menuFilter === 'Habis') return !m.isAvailable;
    return true;
  });
  
  const menuTersediaCount = menus.filter(m => m.isAvailable).length;
  const menuHabisCount = menus.filter(m => !m.isAvailable).length;
  const menuSemuaCount = menus.length;

  const toggleMenuStatus = (id: number) => {
    setMenus(prevMenus =>
      prevMenus.map(menu =>
        menu.id === id ? { ...menu, isAvailable: !menu.isAvailable } : menu
      )
    );
  };

  const toggleStatus = () => setStoreStatus(prev => prev === 'Buka' ? 'Tutup' : 'Buka');
  const getCardColorClass = () => orderFilter === 'Antrean' ? 'card-orange' : orderFilter === 'Proses' ? 'card-yellow' : 'card-green';
  const formatRupiah = (angka: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);

  return (
    <div className="dashboard-layout">
      <div className="dashboard-mobile-wrapper seller-bg" ref={scrollRef} onScroll={handleScroll}>
        
        {/* === 1. BAGIAN ATAS (STICKY) === */}
        <div className="seller-sticky-top">
          {/* HEADER TOKO */}
          <header className="seller-header">
            
            {/* --- 4. PEMBUNGKUS PROFIL DENGAN POP UP --- */}
            <div className="seller-profile" style={{ position: 'relative' }}>
              <img 
                src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=100&h=100&fit=crop" 
                alt="Store" 
                className="seller-avatar" 
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  setIsProfileMenuOpen(!isProfileMenuOpen);
                  setIsNotifOpen(false); // Tutup notif jika buka profil
                }}
              />
              <div className="seller-info">
                <h2>Nasi Goreng Pak Salman</h2>
                <p>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  Jl. Agatis, Dramaga
                </p>
              </div>

              {/* POP UP MENU PROFIL */}
              {isProfileMenuOpen && (
                <div className="profile-popup-menu">
                  <div className="popup-item" onClick={() => navigate('/profile')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M19.7274 20.4471C19.2716 19.1713 18.2672 18.0439 16.8701 17.2399C15.4729 16.4358 13.7611 16 12 16C10.2389 16 8.52706 16.4358 7.12991 17.2399C5.73276 18.0439 4.72839 19.1713 4.27259 20.4471" stroke="#243D67" strokeWidth="2" strokeLinecap="round"/>
                      <circle cx="12" cy="8" r="4" stroke="#243D67" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <span>Profil</span>
                  </div>

                  <div 
                    className="popup-item"
                    onClick={() => {
                      setIsProfileMenuOpen(false); // Menutup popup setelah diklik
                      navigate('/merchant/store-profile'); // Berpindah ke halaman Detail Toko
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M14.5 21V16C14.5 15.4477 14.0523 15 13.5 15H10.5C9.94772 15 9.5 15.4477 9.5 16V21" stroke="#243D67" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M5 11V17C5 18.8856 5 19.8284 5.58579 20.4142C6.17157 21 7.11438 21 9 21H15C16.8856 21 17.8284 21 18.4142 20.4142C19 19.8284 19 18.8856 19 17V11" stroke="#243D67" strokeWidth="2"/>
                        <path d="M4.62127 4.51493C4.80316 3.78737 4.8941 3.42359 5.16536 3.21179C5.43663 3 5.8116 3 6.56155 3H17.4384C18.1884 3 18.5634 3 18.8346 3.21179C19.1059 3.42359 19.1968 3.78737 19.3787 4.51493L20.5823 9.32938C20.6792 9.71675 20.7276 9.91044 20.7169 10.0678C20.6892 10.4757 20.416 10.8257 20.0269 10.9515C19.8769 11 19.6726 11 19.2641 11C18.7309 11 18.4644 11 18.2405 10.9478C17.6133 10.8017 17.0948 10.3625 16.8475 9.76781C16.7593 9.55555 16.7164 9.29856 16.6308 8.78457C16.6068 8.64076 16.5948 8.56886 16.5812 8.54994C16.5413 8.49439 16.4587 8.49439 16.4188 8.54994C16.4052 8.56886 16.3932 8.64076 16.3692 8.78457L16.2877 9.27381C16.2791 9.32568 16.2747 9.35161 16.2704 9.37433C16.0939 10.3005 15.2946 10.9777 14.352 10.9995C14.3289 11 14.3026 11 14.25 11C14.1974 11 14.1711 11 14.148 10.9995C13.2054 10.9777 12.4061 10.3005 12.2296 9.37433C12.2253 9.35161 12.2209 9.32568 12.2123 9.27381L12.1308 8.78457C12.1068 8.64076 12.0948 8.56886 12.0812 8.54994C12.0413 8.49439 11.9587 8.49439 11.9188 8.54994C11.9052 8.56886 11.8932 8.64076 11.8692 8.78457L11.7877 9.27381C11.7791 9.32568 11.7747 9.35161 11.7704 9.37433C11.5939 10.3005 10.7946 10.9777 9.85199 10.9995C9.82887 11 9.80258 11 9.75 11C9.69742 11 9.67113 11 9.64801 10.9995C8.70541 10.9777 7.90606 10.3005 7.7296 9.37433C7.72527 9.35161 7.72095 9.32568 7.7123 9.27381L7.63076 8.78457C7.60679 8.64076 7.59481 8.56886 7.58122 8.54994C7.54132 8.49439 7.45868 8.49439 7.41878 8.54994C7.40519 8.56886 7.39321 8.64076 7.36924 8.78457C7.28357 9.29856 7.24074 9.55555 7.15249 9.76781C6.90524 10.3625 6.38675 10.8017 5.75951 10.9478C5.53563 11 5.26905 11 4.73591 11C4.32737 11 4.12309 11 3.97306 10.9515C3.58403 10.8257 3.31078 10.4757 3.28307 10.0678C3.27239 9.91044 3.32081 9.71675 3.41765 9.32938L4.62127 4.51493Z" stroke="#243D67" strokeWidth="2"/>
                    </svg>
                    <span>Profil Toko</span>
                  </div>
                  
                  <div 
                    className="popup-item" 
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      navigate('/dashboard'); // Balik ke Mode Pembeli
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M4 4H5.62563C6.193 4 6.47669 4 6.70214 4.12433C6.79511 4.17561 6.87933 4.24136 6.95162 4.31912C7.12692 4.50769 7.19573 4.7829 7.33333 5.33333L7.51493 6.05972C7.616 6.46402 7.66654 6.66617 7.74455 6.83576C8.01534 7.42449 8.5546 7.84553 9.19144 7.96546C9.37488 8 9.58326 8 10 8" stroke="#243D67" stroke-width="2" stroke-linecap="round"/>
                        <path d="M18 17H7.55091C7.40471 17 7.33162 17 7.27616 16.9938C6.68857 16.928 6.28605 16.3695 6.40945 15.7913C6.42109 15.7367 6.44421 15.6674 6.49044 15.5287C6.54177 15.3747 6.56743 15.2977 6.59579 15.2298C6.88607 14.5342 7.54277 14.0608 8.29448 14.0054C8.3679 14 8.44906 14 8.61137 14H14" stroke="#243D67" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M15.7639 14H9.69425C8.71658 14 7.8822 13.2932 7.72147 12.3288L7.2911 9.7466C7.13872 8.8323 7.84378 8 8.77069 8H18.382C19.1253 8 19.6088 8.78231 19.2764 9.44721L17.5528 12.8944C17.214 13.572 16.5215 14 15.7639 14Z" stroke="#243D67" stroke-width="2" stroke-linecap="round"/>
                        <circle cx="17" cy="20" r="1" fill="#243D67"/>
                        <circle cx="9" cy="20" r="1" fill="#243D67"/>
                    </svg>
                    <span>Pergi Jajan</span>
                  </div>

                  <div className="popup-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="9" stroke="#243D67" strokeWidth="2"/>
                      <path d="M12.5 7.5C12.5 7.77614 12.2761 8 12 8C11.7239 8 11.5 7.77614 11.5 7.5C11.5 7.22386 11.7239 7 12 7C12.2761 7 12.5 7.22386 12.5 7.5Z" fill="#243D67" stroke="#243D67"/>
                      <path d="M12 17V10" stroke="#243D67" strokeWidth="2"/>
                    </svg>
                    <span>Hubungi Kami</span>
                  </div>

                  <div className="popup-divider"></div>

                  <div className="popup-item logout" onClick={() => {
                    setIsLogoutModalOpen(true); 
                    setIsProfileMenuOpen(false); 
                  }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <path d="M20.1667 11.0001L20.9475 10.3754L21.4473 11.0001L20.9475 11.6248L20.1667 11.0001ZM11.9167 12.0001C11.3644 12.0001 10.9167 11.5524 10.9167 11.0001C10.9167 10.4478 11.3644 10.0001 11.9167 10.0001V11.0001V12.0001ZM16.5 6.41675L17.2809 5.79205L20.9475 10.3754L20.1667 11.0001L19.3858 11.6248L15.7191 7.04144L16.5 6.41675ZM20.1667 11.0001L20.9475 11.6248L17.2809 16.2081L16.5 15.5834L15.7191 14.9587L19.3858 10.3754L20.1667 11.0001ZM20.1667 11.0001V12.0001H11.9167V11.0001V10.0001H20.1667V11.0001Z" fill="#EF4444"/>
                      <path d="M12.8333 7.45419V7.05509C12.8333 5.43675 12.8333 4.62758 12.3594 4.06809C11.8854 3.5086 11.0873 3.37557 9.49093 3.10952L8.81973 2.99765C5.57663 2.45714 3.95508 2.18688 2.89421 3.08557C1.83333 3.98427 1.83333 5.62818 1.83333 8.91602V13.0838C1.83333 16.3717 1.83333 18.0156 2.89421 18.9143C3.95508 19.813 5.57663 19.5427 8.81973 19.0022L9.49093 18.8903C11.0873 18.6243 11.8854 18.4912 12.3594 17.9317C12.8333 17.3723 12.8333 16.5631 12.8333 14.9447V14.7271" stroke="#EF4444" strokeWidth="2"/>
                    </svg>
                    <span>Keluar</span>
                  </div>
                </div>
              )}
            </div>

            {/* MAIN TABS */}
            <div className="seller-main-tabs-wrapper">
              <div className="seller-main-tabs">
                <div 
                  className="sm-slider" 
                  style={{ transform: `translateX(${mainTab === 'Pesanan' ? 0 : mainTab === 'Kelola Menu' ? 100 : 200}%)` }}
                ></div>
                <button className={`sm-tab ${mainTab === 'Pesanan' ? 'active' : ''}`} onClick={() => setMainTab('Pesanan')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 36 36" fill="none"><rect x="7.5" y="6" width="21" height="25.5" rx="3" stroke={mainTab === 'Pesanan' ? "white" : "#6B7280"} strokeWidth="2"/><path d="M13.5 13.5H22.5M13.5 19.5H22.5M13.5 25.5H19.5" stroke={mainTab === 'Pesanan' ? "white" : "#6B7280"} strokeWidth="2" strokeLinecap="round"/></svg>
                  Pesanan
                </button>
                <button className={`sm-tab ${mainTab === 'Kelola Menu' ? 'active' : ''}`} onClick={() => setMainTab('Kelola Menu')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 36 36" fill="none"><path d="M21 9C22.3805 9 23.7425 9.31757 24.9806 9.92815C26.2187 10.5387 27.2998 11.4259 28.1402 12.5211C28.9806 13.6164 29.5577 14.8902 29.8271 16.2442C30.0964 17.5982 30.0506 18.9959 29.6933 20.3294C29.336 21.6628 28.6768 22.8962 27.7666 23.9341C26.8563 24.972 25.7196 25.7866 24.4441 26.3149C23.1687 26.8432 21.7889 27.071 20.4114 26.9807C19.0338 26.8904 17.6955 26.4845 16.5 25.7942M10.5 28.5V7.5M15 7.5V14.25C15 15.4926 13.9926 16.5 12.75 16.5C11.5074 16.5 10.5 15.4926 10.5 14.25V7.5M6 7.5V14.25C6 15.4926 7.00736 16.5 8.25 16.5C9.49264 16.5 10.5 15.4926 10.5 14.25V7.5" stroke={mainTab === 'Kelola Menu' ? "white" : "#6B7280"} strokeWidth="2" strokeLinecap="round"/></svg>
                  Kelola Menu
                </button>
                <button className={`sm-tab ${mainTab === 'Promo' ? 'active' : ''}`} onClick={() => setMainTab('Promo')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 36 36" fill="none"><path d="M17.6309 4.89062C17.8292 4.67315 18.1708 4.67315 18.3691 4.89062L19.7188 6.37109C20.3765 7.09299 21.3946 7.36646 22.3252 7.07031L24.2344 6.46191C24.515 6.37256 24.8121 6.54435 24.875 6.83203L25.3027 8.78906C25.5114 9.74319 26.2568 10.4886 27.2109 10.6973L29.168 11.125C29.4556 11.1879 29.6274 11.485 29.5381 11.7656L28.9297 13.6748C28.6335 14.6054 28.907 15.6235 29.6289 16.2812L31.1094 17.6309C31.3268 17.8292 31.3268 18.1708 31.1094 18.3691L29.6289 19.7188C28.907 20.3765 28.6335 21.3946 28.9297 22.3252L29.5381 24.2344C29.6274 24.515 29.4556 24.8121 29.168 24.875L27.2109 25.3027C26.2568 25.5114 25.5114 26.2568 25.3027 27.2109L24.875 29.168C24.8121 29.4556 24.515 29.6274 24.2344 29.5381L22.3252 28.9297C21.3946 28.6335 20.3765 28.907 19.7188 29.6289L18.3691 31.1094C18.1708 31.3269 17.8292 31.3269 17.6309 31.1094L16.2812 29.6289C15.6235 28.907 14.6054 28.6335 13.6748 28.9297L11.7656 29.5381C11.485 29.6274 11.1879 29.4556 11.125 29.168L10.6973 27.2109C10.4886 26.2568 9.74319 25.5114 8.78906 25.3027L6.83203 24.875C6.54436 24.8121 6.37256 24.515 6.46191 24.2344L7.07031 22.3252C7.36646 21.3946 7.09299 20.3765 6.37109 19.7188L4.89062 18.3691C4.67315 18.1708 4.67315 17.8292 4.89062 17.6309L6.37109 16.2812C7.09299 15.6235 7.36646 14.6054 7.07031 13.6748L6.46191 11.7656C6.37256 11.485 6.54435 11.1879 6.83203 11.125L8.78906 10.6973C9.74319 10.4886 10.4886 9.74319 10.6973 8.78906L11.125 6.83203C11.1879 6.54435 11.485 6.37256 11.7656 6.46191L13.6748 7.07031C14.6054 7.36646 15.6235 7.09299 16.2812 6.37109L17.6309 4.89062Z" stroke={mainTab === 'Promo' ? "white" : "#6B7280"} strokeWidth="2"/><path d="M12.8453 23.3741L23.4519 12.7675" stroke={mainTab === 'Promo' ? "white" : "#6B7280"} strokeWidth="2" strokeLinecap="round"/><circle cx="14" cy="14" r="2" fill={mainTab === 'Promo' ? "white" : "#6B7280"}/><circle cx="22" cy="22" r="2" fill={mainTab === 'Promo' ? "white" : "#6B7280"}/></svg>
                  Promo
                </button>
              </div>
            </div>

            {/* --- TOGGLE DESKTOP ONLY --- */}
            <div className={`store-toggle-wrapper desktop-only ${storeStatus === 'Buka' ? 'is-open' : 'is-closed'}`} onClick={toggleStatus}>
              <span className="toggle-label">Menerima pesanan:</span>
              <div className="toggle-pill-track">
                <div className="pill-knob"></div>
                <span className="pill-text-open">Buka</span>
                <span className="pill-text-close">Tutup</span>
              </div>
            </div>

            {/* --- IKON NOTIFIKASI BESERTA POPUP --- */}
            <div className="notif-wrapper" style={{ position: 'relative' }}>
              <svg 
                onClick={() => {
                  setIsNotifOpen(!isNotifOpen);
                  setIsProfileMenuOpen(false); // Tutup menu profil jika notif diklik
                }}
                style={{ cursor: 'pointer' }}
                width="40" height="40" viewBox="0 0 40 40" fill="none"
              >
                <circle cx="20" cy="20" r="20" fill="#9CA3AF"/>
                <svg x="7" y="7" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M15.625 17.7083V18.75C15.625 20.4759 14.2259 21.875 12.5 21.875C10.7741 21.875 9.37499 20.4759 9.37499 18.75V17.7083M15.625 17.7083H9.37499M15.625 17.7083H19.3651C19.7636 17.7083 19.9637 17.7083 20.1251 17.6539C20.4333 17.55 20.6744 17.308 20.7784 16.9998C20.833 16.8378 20.833 16.637 20.833 16.2354C20.833 16.0596 20.8328 15.9717 20.8191 15.888C20.7931 15.7296 20.7317 15.5795 20.6381 15.4492C20.5886 15.3803 20.5258 15.3175 20.4019 15.1936L19.9961 14.7878C19.8652 14.6569 19.7917 14.4793 19.7917 14.2942V10.4167C19.7917 6.38958 16.5271 3.12499 12.5 3.125C8.47292 3.12501 5.20832 6.3896 5.20832 10.4167V14.2942C5.20832 14.4793 5.13462 14.6569 5.0037 14.7878L4.59797 15.1935C4.4737 15.3178 4.41149 15.3803 4.36197 15.4492C4.26838 15.5796 4.20639 15.7296 4.18041 15.888C4.16666 15.9717 4.16666 16.0596 4.16666 16.2354C4.16666 16.637 4.16666 16.8378 4.22129 16.9997C4.32525 17.3079 4.56749 17.55 4.87568 17.6539C5.03703 17.7083 5.23646 17.7083 5.63494 17.7083H9.37499" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </svg>

              {isNotifOpen && (
                <div className="notif-popup">
                  <div className="notif-header">Notifikasi</div>
                  <div className="notif-list">
                    {notifData.map((notif) => (
                      <div key={notif.id} className="notif-item">
                        <div className="notif-content-row">
                          {!notif.isRead && <div className="notif-dot"></div>}
                          <div className="notif-text-wrapper">
                            <p className="notif-main-text">{notif.text}</p>
                            <p className="notif-time">{notif.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </header>

          {/* KONTROL PESANAN STICKY */}
          {mainTab === 'Pesanan' && (
            <div className="order-sticky-controls">
              <div className={`store-toggle-wrapper mobile-only ${storeStatus === 'Buka' ? 'is-open' : 'is-closed'}`} onClick={toggleStatus}>
                <span className="toggle-label">Menerima pesanan:</span>
                <div className="toggle-pill-track">
                  <div className="pill-knob"></div>
                  <span className="pill-text-open">Buka</span>
                  <span className="pill-text-close">Tutup</span>
                </div>
              </div>

              <div className="order-status-tabs">
                <div 
                  className="os-slider" 
                  style={{ 
                    transform: `translateX(${orderFilter === 'Antrean' ? 0 : orderFilter === 'Proses' ? 100 : 200}%)`,
                    backgroundColor: orderFilter === 'Antrean' ? '#FF9746' : orderFilter === 'Proses' ? '#FFB800' : '#22C55E'
                  }}
                ></div>
                <button className={`os-tab ${orderFilter === 'Antrean' ? 'active-antrean' : ''}`} onClick={() => setOrderFilter('Antrean')}>
                  <strong>{antreanCount}</strong><span>Antrean masuk</span>
                </button>
                <button className={`os-tab ${orderFilter === 'Proses' ? 'active-proses' : ''}`} onClick={() => setOrderFilter('Proses')}>
                  <strong>{prosesCount}</strong><span>Dalam Proses</span>
                </button>
                <button className={`os-tab ${orderFilter === 'Selesai' ? 'active-selesai' : ''}`} onClick={() => setOrderFilter('Selesai')}>
                  <strong>{selesaiCount}</strong><span>Selesai</span>
                </button>
              </div>
            </div>
          )}

          {/* KONTROL MENU STICKY BARU */}
          {mainTab === 'Kelola Menu' && (
            <div className="order-sticky-controls">
              <div className="order-status-tabs" style={{ marginBottom: '8px' }}>
                <div 
                  className="os-slider" 
                  style={{ 
                    transform: `translateX(${menuFilter === 'Semua' ? 0 : menuFilter === 'Tersedia' ? 100 : 200}%)`,
                    backgroundColor: menuFilter === 'Semua' ? '#FF9746' : menuFilter === 'Tersedia' ? '#22C55E' : '#EF4444'
                  }}
                ></div>
                <button className={`os-tab ${menuFilter === 'Semua' ? 'active-semua' : ''}`} onClick={() => setMenuFilter('Semua')}>
                  <strong>{menuSemuaCount}</strong><span>Semua</span>
                </button>
                <button className={`os-tab ${menuFilter === 'Tersedia' ? 'active-tersedia' : ''}`} onClick={() => setMenuFilter('Tersedia')}>
                  <strong>{menuTersediaCount}</strong><span>Tersedia</span>
                </button>
                <button className={`os-tab ${menuFilter === 'Habis' ? 'active-habis' : ''}`} onClick={() => setMenuFilter('Habis')}>
                  <strong>{menuHabisCount}</strong><span>Habis</span>
                </button>
              </div>
              <div className="add-menu-wrapper">
                <span 
                  className="add-menu-btn"
                  onClick={() => navigate('/merchant/menu/add')}
                >
                  Tambahkan Menu Baru
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3ZM11 11H7V13H11V17H13V13H17V11H13V7H11V11Z" fill="#FF9746"/>
                  </svg>
                </span>
              </div>
            </div>
          )}

        </div>

        {/* === 2. BAGIAN BAWAH (SCROLLABLE LIST) === */}
        <div className="seller-scrollable-content">
          
          {/* TAB PESANAN */}
          {mainTab === 'Pesanan' && (
            <div className="order-list-wrapper">
              <div className="order-list">
                {storeStatus === 'Tutup' ? (
                  <div className="empty-state">
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60" fill="none"><circle cx="30" cy="30" r="22.5" stroke="#9CA3AF" strokeWidth="5"/><path d="M22.5003 37.5L37.5003 22.5" stroke="#9CA3AF" strokeWidth="5"/><path d="M37.5 37.5L22.5 22.5" stroke="#9CA3AF" strokeWidth="5"/></svg>
                    <p>Tidak ada pesanan masuk.</p>
                  </div>
                ) : filteredOrders.length === 0 ? (
                  <div className="empty-state"><p>Kosong</p></div>
                ) : (
                  filteredOrders.map((order, index) => (
                    <div key={index} className={`order-card ${getCardColorClass()}`}>
                      <div className="oc-header">
                        <div>
                          <p className="oc-id">{order.id}</p>
                          <h3 className="oc-customer">{order.customerName}</h3>
                        </div>
                        <div className="oc-time">{order.time}</div>
                      </div>

                      <div className="oc-items">
                        {order.items.map((item, i) => (
                          <div key={i} className="oc-item">
                            <img src={item.imgUrl} alt={item.name} />
                            <div className="oci-info">
                              <h4>{item.name}</h4><p>{item.qty} x {formatRupiah(item.price)}</p>
                            </div>
                            <div className="oci-price">{formatRupiah(item.qty * item.price)}</div>
                          </div>
                        ))}
                      </div>

                      <div className="oc-total">
                        <span>Total Tagihan</span><span className="total-amount">{formatRupiah(order.total)}</span>
                      </div>

                      <div className="oc-actions">
                        {orderFilter === 'Antrean' && (
                          <><button className="btn-tolak">Tolak</button><button className="btn-terima">Terima</button></>
                        )}
                        {orderFilter === 'Proses' && (
                          <button className="btn-selesai-disiapkan">Selesai disiapkan</button>
                        )}
                        {orderFilter === 'Selesai' && (
                          order.isRated ? (
                            <div className="rating-display">
                              <span>Nilai dari pelanggan</span>
                              <svg xmlns="http://www.w3.org/2000/svg" width="119" height="24" viewBox="0 0 119 24" fill="none">
                                <path d="M11.0489 2.92705C11.3483 2.00574 12.6517 2.00574 12.9511 2.92705L14.4697 7.60081C14.6035 8.01284 14.9875 8.2918 15.4207 8.2918H20.335C21.3037 8.2918 21.7065 9.53141 20.9228 10.1008L16.947 12.9894C16.5966 13.244 16.4499 13.6954 16.5838 14.1074L18.1024 18.7812C18.4017 19.7025 17.3472 20.4686 16.5635 19.8992L12.5878 17.0106C12.2373 16.756 11.7627 16.756 11.4122 17.0106L7.43648 19.8992C6.65276 20.4686 5.59828 19.7025 5.89763 18.7812L7.41623 14.1074C7.55011 13.6954 7.40345 13.244 7.05296 12.9894L3.07722 10.1008C2.29351 9.53141 2.69628 8.2918 3.66501 8.2918H8.57929C9.01252 8.2918 9.39647 8.01284 9.53035 7.60081L11.0489 2.92705Z" fill="#FFB800"/>
                                <path d="M35.0489 2.92705C35.3483 2.00574 36.6517 2.00574 36.9511 2.92705L38.4697 7.60081C38.6035 8.01284 38.9875 8.2918 39.4207 8.2918H44.335C45.3037 8.2918 45.7065 9.53141 44.9228 10.1008L40.947 12.9894C40.5966 13.244 40.4499 13.6954 40.5838 14.1074L42.1024 18.7812C42.4017 19.7025 41.3472 20.4686 40.5635 19.8992L36.5878 17.0106C36.2373 16.756 35.7627 16.756 35.4122 17.0106L31.4365 19.8992C30.6528 20.4686 29.5983 19.7025 29.8976 18.7812L31.4162 14.1074C31.5501 13.6954 31.4034 13.244 31.053 12.9894L27.0772 10.1008C26.2935 9.53141 26.6963 8.2918 27.665 8.2918H32.5793C33.0125 8.2918 33.3965 8.01284 33.5303 7.60081L35.0489 2.92705Z" fill="#FFB800"/>
                                <path d="M59.0489 2.92705C59.3483 2.00574 60.6517 2.00574 60.9511 2.92705L62.4697 7.60081C62.6035 8.01284 62.9875 8.2918 63.4207 8.2918H68.335C69.3037 8.2918 69.7065 9.53141 68.9228 10.1008L64.947 12.9894C64.5966 13.244 64.4499 13.6954 64.5838 14.1074L66.1024 18.7812C66.4017 19.7025 65.3472 20.4686 64.5635 19.8992L60.5878 17.0106C60.2373 16.756 59.7627 16.756 59.4122 17.0106L55.4365 19.8992C54.6528 20.4686 53.5983 19.7025 53.8976 18.7812L55.4162 14.1074C55.5501 13.6954 55.4034 13.244 55.053 12.9894L51.0772 10.1008C50.2935 9.53141 50.6963 8.2918 51.665 8.2918H56.5793C57.0125 8.2918 57.3965 8.01284 57.5303 7.60081L59.0489 2.92705Z" fill="#FFB800"/>
                                <path d="M83.0489 2.92705C83.3483 2.00574 84.6517 2.00574 84.9511 2.92705L86.4697 7.60081C86.6035 8.01284 86.9875 8.2918 87.4207 8.2918H92.335C93.3037 8.2918 93.7065 9.53141 92.9228 10.1008L88.947 12.9894C88.5966 13.244 88.4499 13.6954 88.5838 14.1074L90.1024 18.7812C90.4017 19.7025 89.3472 20.4686 88.5635 19.8992L84.5878 17.0106C84.2373 16.756 83.7627 16.756 83.4122 17.0106L79.4365 19.8992C78.6528 20.4686 77.5983 19.7025 77.8976 18.7812L79.4162 14.1074C79.5501 13.6954 79.4034 13.244 79.053 12.9894L75.0772 10.1008C74.2935 9.53141 74.6963 8.2918 75.665 8.2918H80.5793C81.0125 8.2918 81.3965 8.01284 81.5303 7.60081L83.0489 2.92705Z" fill="#FFB800"/>
                                <path d="M106.049 2.92705C106.348 2.00574 107.652 2.00574 107.951 2.92705L109.47 7.60081C109.604 8.01284 109.987 8.2918 110.421 8.2918H115.335C116.304 8.2918 116.706 9.53141 115.923 10.1008L111.947 12.9894C111.597 13.244 111.45 13.6954 111.584 14.1074L113.102 18.7812C113.402 19.7025 112.347 20.4686 111.564 19.8992L107.588 17.0106C107.237 16.756 106.763 16.756 106.412 17.0106L102.436 19.8992C101.653 20.4686 100.598 19.7025 100.898 18.7812L102.416 14.1074C102.55 13.6954 102.403 13.244 102.053 12.9894L98.0772 10.1008C97.2935 9.53141 97.6963 8.2918 98.665 8.2918H103.579C104.013 8.2918 104.396 8.01284 104.53 7.60081L106.049 2.92705Z" fill="#D9D9D9"/>
                              </svg>
                            </div>
                          ) : (
                            <div className="belum-dinilai">Belum dinilai</div>
                          )
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB KELOLA MENU BARU */}
          {mainTab === 'Kelola Menu' && (
            <div className="order-list-wrapper">
              <div className="order-list">
                {filteredMenus.length === 0 ? (
                  <div className="empty-state"><p>Belum ada menu.</p></div>
                ) : (
                  filteredMenus.map((menu) => (
                    <div key={menu.id} className="menu-card">
                      <img src={menu.imgUrl} alt={menu.name} className="menu-img" />
                      <div className="menu-content">
                        <div className="menu-title-row">
                          <h3 className="menu-title">{menu.name}</h3>
                          <svg 
                            className="menu-edit-icon" 
                            onClick={() => navigate(`/merchant/menu/edit/${menu.id}`)}
                            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                          >
                            <path d="M12 8.00012L4 16.0001V20.0001H20M4 20.0001L8 20.0001L16 12.0001M12 8.00012L14.8686 5.13146L14.8704 5.12976C15.2652 4.73488 15.463 4.53709 15.691 4.46301C15.8919 4.39775 16.1082 4.39775 16.3091 4.46301C16.5369 4.53704 16.7345 4.7346 17.1288 5.12892L18.8686 6.86872C19.2646 7.26474 19.4627 7.46284 19.5369 7.69117C19.6022 7.89201 19.6021 8.10835 19.5369 8.3092C19.4628 8.53736 19.265 8.73516 18.8695 9.13061L18.8686 9.13146L16 12.0001M12 8.00012L16 12.0001" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div className="menu-price">{formatRupiah(menu.price)}</div>
                        <div className="menu-footer-row">
                          <span className="menu-sold">{menu.sold} terjual</span>
                          
                          {/* INI YANG BERUBAH: TOGGLE KNOB SLIDER UNTUK MENU */}
                          <div 
                            className={`menu-toggle-status ${menu.isAvailable ? 'status-tersedia' : 'status-habis'}`}
                            onClick={() => toggleMenuStatus(menu.id)}
                          >
                            {menu.isAvailable ? 'Tersedia' : 'Habis'}
                            <div className="menu-toggle-track">
                              <div className="menu-toggle-knob"></div>
                            </div>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB PROMO BARU */}
          {mainTab === 'Promo' && (
            <div className="promo-empty-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path d="M24 24L36.2508 32.3388C37.3451 33.0836 38 34.3217 38 35.6454V41C38 41.5523 37.5523 42 37 42H11C10.4477 42 10 41.5523 10 41V35.6454C10 34.3217 10.6549 33.0836 11.7492 32.3388L24 24ZM24 24L36.2508 15.6612C37.3451 14.9164 38 13.6783 38 12.3546V7C38 6.44772 37.5523 6 37 6H11C10.4477 6 10 6.44772 10 7V12.3546C10 13.6783 10.6549 14.9164 11.7492 15.6612L24 24Z" stroke="#6B7280" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M32 37.5542V41.7C32 41.8657 31.8657 42 31.7 42H16.3C16.1343 42 16 41.8657 16 41.7V37.5542C16 37.2095 16.1776 36.889 16.47 36.7062L23.152 32.53C23.6708 32.2057 24.3292 32.2057 24.848 32.53L31.53 36.7062C31.8224 36.889 32 37.2095 32 37.5542Z" fill="#6B7280"/>
              </svg>
              <p>Fitur Promo Masih<br/>Dalam Pengembangan</p>
            </div>
          )}

        </div>

        {/* 5. FLOATING SCROLL TOP BUTTON */}
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

export default MerchantDashboard;