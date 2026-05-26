import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
} from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css';
import { useCart } from '../context/CartContext';

import banner1 from '../assets/banner1.png';
import banner2 from '../assets/banner2.png';
import banner3 from '../assets/banner3.png';

interface UserData {
  name: string;
  location: string;
  profilePic: string;
}

interface BannerData {
  id: number;
  imgUrl: string;
}

interface RestaurantData {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  priceRange: string;
  imgUrl: string;
}

interface NotificationData {
  id: number;
  text: string;
  time: string;
  isRead: boolean;
}

// --- MOCK DATA (Simulasi Data dari Database API) ---
const userData: UserData = {
  name: 'Arif Satria',
  location: 'Jl. Agatis, Dramaga',
  profilePic:
    'https://ui-avatars.com/api/?name=Arif+Satria&background=10B981&color=fff&size=128',
};

const bannerData: BannerData[] = [
  { id: 1, imgUrl: banner1 },
  { id: 2, imgUrl: banner2 },
  { id: 3, imgUrl: banner3 },
];

const restoData: RestaurantData[] = [
  {
    id: 1,
    name: 'Nasi Goreng Pak Salman',
    rating: 4.5,
    reviews: 56,
    priceRange: '10rb - 25rb',
    imgUrl:
      'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=200&h=200&fit=crop',
  },
  {
    id: 2,
    name: 'Nasi Goreng Pak Salman',
    rating: 4.5,
    reviews: 56,
    priceRange: '10rb - 25rb',
    imgUrl:
      'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=200&h=200&fit=crop',
  },
  {
    id: 3,
    name: 'Nasi Goreng Pak Salman',
    rating: 4.5,
    reviews: 56,
    priceRange: '10rb - 25rb',
    imgUrl:
      'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=200&h=200&fit=crop',
  },
  {
    id: 4,
    name: 'Nasi Goreng Pak Salman',
    rating: 4.5,
    reviews: 56,
    priceRange: '10rb - 25rb',
    imgUrl:
      'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=200&h=200&fit=crop',
  },
];

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  // --- 1. STATE & REF ---
  // --- STATE PESANAN BERLANGSUNG ---
  // Ubah jadi true jika ada pesanan aktif, ubah jadi false jika tidak ada
  const [hasOngoingOrders, setHasOngoingOrders] = useState<boolean>(true);
  const [isNotifOpen, setIsNotifOpen] = useState<boolean>(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] =
    useState<boolean>(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] =
    useState<boolean>(false);

  const [searchQuery, setSearchQuery] = useState<string>('');

  const [primaryFilter, setPrimaryFilter] = useState<string>(
    'rekomendasi untuk anda'
  );

  const [selectedJenis, setSelectedJenis] =
    useState<string>('jenis');

  const [selectedArea, setSelectedArea] =
    useState<string>('area');

  const [openDropdown, setOpenDropdown] = useState<
    string | null
  >(null);

  const { totalItemsInCart } = useCart();

  const jenisOptions: string[] = [
    'Semua',
    'Nasi',
    'Mie',
    'Minuman',
    'Snack',
    'Dessert',
  ];

  const areaOptions: string[] = [
    'Semua',
    'Sapta FATETA',
    'Plasma FEMA',
    'Kantin Pascasarjana',
    'Blue Corner FPIK',
    'Golden Corner FMIPA',
  ];

  const [showFab, setShowFab] = useState<boolean>(false);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [currentBanner, setCurrentBanner] =
    useState<number>(0);

  const bannerScrollRef =
    useRef<HTMLDivElement | null>(null);

  const [catScrollProgress, setCatScrollProgress] =
    useState<number>(0);

  const catScrollRef =
    useRef<HTMLDivElement | null>(null);

  const [isCatScrollable, setIsCatScrollable] =
    useState<boolean>(false);

// --- STATE POSISI DROPDOWN ---
  const jenisBtnRef = useRef<HTMLButtonElement | null>(null);
  const [jenisDropdownLeft, setJenisDropdownLeft] = useState<number>(0);
  
  const areaBtnRef = useRef<HTMLButtonElement | null>(null);
  const [areaDropdownLeft, setAreaDropdownLeft] = useState<number>(0);

// --- FUNGSI UNIVERSAL UNTUK SEMUA DROPDOWN ---
  const handleDropdown = (
    dropdownType: string, 
    btnRef: React.RefObject<HTMLButtonElement | null>, 
    setLeftState: React.Dispatch<React.SetStateAction<number>>, 
    dropdownWidth: number
  ) => {
    if (openDropdown === dropdownType) {
      setOpenDropdown(null); // Tutup jika yang diklik adalah dropdown yang sedang terbuka
    } else {
      setOpenDropdown(dropdownType); // Buka dropdown baru
      
      if (btnRef.current && catScrollRef.current) {
        // 1. Hitung posisi dasar (Kiri Tombol - Jarak Scroll)
        let leftPos = btnRef.current.offsetLeft - catScrollRef.current.scrollLeft;

        // 2. PENGAMAN UNIVERSAL: Jangan sampai tumpah ke kanan layar!
        const maxSafeLeft = catScrollRef.current.clientWidth - dropdownWidth;
        if (leftPos > maxSafeLeft) {
          leftPos = maxSafeLeft; 
        }

        // 3. Simpan posisinya ke state yang diminta
        setLeftState(leftPos);
      }
    }
  };

  // --- 2. EFFECTS & FUNCTIONS ---
  useEffect(() => {
    const checkScroll = (): void => {
      if (catScrollRef.current) {
        const { scrollWidth, clientWidth } =
          catScrollRef.current;

        setIsCatScrollable(scrollWidth > clientWidth);
      }
    };

    checkScroll();

    window.addEventListener('resize', checkScroll);

    return () =>
      window.removeEventListener('resize', checkScroll);
  }, []);

  const handleBannerScroll = (): void => {
    if (bannerScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth, children } = bannerScrollRef.current;

      // 1. Jika layar sangat lebar dan semua banner sudah terlihat (tidak ada scroll)
      if (scrollWidth <= clientWidth) {
        if (currentBanner !== 0) setCurrentBanner(0);
        return;
      }

      // 2. Hitung rasio scroll dari 0.0 (mentok kiri) hingga 1.0 (mentok kanan)
      // (scrollWidth - clientWidth) adalah total jarak maksimal yang BISA di-scroll
      const scrollRatio = scrollLeft / (scrollWidth - clientWidth);

      // 3. Ambil jumlah banner secara otomatis dari elemen HTML
      const totalBanners = children.length;
      const maxIndex = Math.max(0, totalBanners - 1);

      // 4. Tentukan index saat ini berdasarkan rasio tersebut
      const index = Math.round(scrollRatio * maxIndex);

      // 5. Update state hanya jika index-nya berubah (mencegah re-render berlebihan)
      if (index !== currentBanner) {
        setCurrentBanner(index);
      }
    }
  };

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
      scrollRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  const handleCatScroll = (): void => {
    if (catScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = catScrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        setCatScrollProgress(scrollLeft / maxScroll);
      }
    }
    
    //Tutup dropdown otomatis jika kategori di-scroll
    if (openDropdown) setOpenDropdown(null); 
  };

  const notifData: NotificationData[] = [
    {
      id: 1,
      text: 'Pesanan anda telah masuk!',
      time: '13 Februari 2026 (15.54)',
      isRead: false,
    },
    {
      id: 2,
      text: 'Pesanan anda telah masuk!',
      time: '13 Februari 2026 (15.54)',
      isRead: false,
    },
    {
      id: 3,
      text: 'Pesanan anda telah masuk!',
      time: '13 Februari 2026 (15.54)',
      isRead: true,
    },
    {
      id: 4,
      text: 'Pesanan anda telah masuk!',
      time: '13 Februari 2026 (15.54)',
      isRead: true,
    },
    {
      id: 5,
      text: 'Pesanan anda telah masuk!',
      time: '13 Februari 2026 (15.54)',
      isRead: true,
    },
    {
      id: 6,
      text: 'Pesanan anda telah masuk!',
      time: '13 Februari 2026 (15.54)',
      isRead: true,
    },
  ];

  return (
    <div className="dashboard-layout">
      <div
        className="dashboard-mobile-wrapper"
        ref={scrollRef}
        onScroll={handleScroll}
      >
        
      <header className="dashboard-header">
        <div className="profile-wrapper">
          <div className="profile-section"> 
            <img 
              src={userData.profilePic} 
              alt="Profile" 
              className="profile-pic" 
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              style={{ cursor: 'pointer' }} 
            />
            
            <div className="profile-info">
              <h3>{userData.name}</h3>
              <p>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                {userData.location}
              </p>
            </div>
          </div>

          {isProfileMenuOpen && (
            <div className="profile-popup-menu">
                <div className="popup-item" onClick={() => navigate('/profile')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M19.7274 20.4471C19.2716 19.1713 18.2672 18.0439 16.8701 17.2399C15.4729 16.4358 13.7611 16 12 16C10.2389 16 8.52706 16.4358 7.12991 17.2399C5.73276 18.0439 4.72839 19.1713 4.27259 20.4471" stroke="#243D67" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="12" cy="8" r="4" stroke="#243D67" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span>Profil</span>
                </div>
                
                <div className="popup-item" onClick={() => navigate('/register-store')}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M14.5 21V16C14.5 15.4477 14.0523 15 13.5 15H10.5C9.94772 15 9.5 15.4477 9.5 16V21" stroke="#243D67" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5 11V17C5 18.8856 5 19.8284 5.58579 20.4142C6.17157 21 7.11438 21 9 21H15C16.8856 21 17.8284 21 18.4142 20.4142C19 19.8284 19 18.8856 19 17V11" stroke="#243D67" strokeWidth="2"/>
                    <path d="M4.62127 4.51493C4.80316 3.78737 4.8941 3.42359 5.16536 3.21179C5.43663 3 5.8116 3 6.56155 3H17.4384C18.1884 3 18.5634 3 18.8346 3.21179C19.1059 3.42359 19.1968 3.78737 19.3787 4.51493L20.5823 9.32938C20.6792 9.71675 20.7276 9.91044 20.7169 10.0678C20.6892 10.4757 20.416 10.8257 20.0269 10.9515C19.8769 11 19.6726 11 19.2641 11C18.7309 11 18.4644 11 18.2405 10.9478C17.6133 10.8017 17.0948 10.3625 16.8475 9.76781C16.7593 9.55555 16.7164 9.29856 16.6308 8.78457C16.6068 8.64076 16.5948 8.56886 16.5812 8.54994C16.5413 8.49439 16.4587 8.49439 16.4188 8.54994C16.4052 8.56886 16.3932 8.64076 16.3692 8.78457L16.2877 9.27381C16.2791 9.32568 16.2747 9.35161 16.2704 9.37433C16.0939 10.3005 15.2946 10.9777 14.352 10.9995C14.3289 11 14.3026 11 14.25 11C14.1974 11 14.1711 11 14.148 10.9995C13.2054 10.9777 12.4061 10.3005 12.2296 9.37433C12.2253 9.35161 12.2209 9.32568 12.2123 9.27381L12.1308 8.78457C12.1068 8.64076 12.0948 8.56886 12.0812 8.54994C12.0413 8.49439 11.9587 8.49439 11.9188 8.54994C11.9052 8.56886 11.8932 8.64076 11.8692 8.78457L11.7877 9.27381C11.7791 9.32568 11.7747 9.35161 11.7704 9.37433C11.5939 10.3005 10.7946 10.9777 9.85199 10.9995C9.82887 11 9.80258 11 9.75 11C9.69742 11 9.67113 11 9.64801 10.9995C8.70541 10.9777 7.90606 10.3005 7.7296 9.37433C7.72527 9.35161 7.72095 9.32568 7.7123 9.27381L7.63076 8.78457C7.60679 8.64076 7.59481 8.56886 7.58122 8.54994C7.54132 8.49439 7.45868 8.49439 7.41878 8.54994C7.40519 8.56886 7.39321 8.64076 7.36924 8.78457C7.28357 9.29856 7.24074 9.55555 7.15249 9.76781C6.90524 10.3625 6.38675 10.8017 5.75951 10.9478C5.53563 11 5.26905 11 4.73591 11C4.32737 11 4.12309 11 3.97306 10.9515C3.58403 10.8257 3.31078 10.4757 3.28307 10.0678C3.27239 9.91044 3.32081 9.71675 3.41765 9.32938L4.62127 4.51493Z" stroke="#243D67" strokeWidth="2"/>
                  </svg>
                  <span>Mulai Berjualan</span>
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

          <div className="header-icons">
  
            {/* 1. IKON KERANJANG DENGAN DOT */}
            <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => navigate('/cart')}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="20" fill="#9CA3AF"/>
                <svg x="4" y="4" width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M5.33333 5.33325H7.77178C8.52173 5.33325 8.8967 5.33325 9.16796 5.54505C9.43923 5.75684 9.53017 6.12062 9.71206 6.84818L10.0199 8.07954C10.2759 9.1034 10.4038 9.61533 10.7169 9.97649C10.8866 10.1723 11.0928 10.3333 11.324 10.4505C11.7503 10.6666 12.278 10.6666 13.3333 10.6666" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M24 22.6667H10.0679C9.45671 22.6667 9.15112 22.6667 8.93982 22.561C8.64666 22.4142 8.44405 22.1331 8.39754 21.8086C8.36402 21.5747 8.46065 21.2848 8.65392 20.705C8.86804 20.0626 8.97511 19.7414 9.15649 19.4916C9.40793 19.1454 9.76379 18.6667 10.1718 18.7598C10.4661 18.6667 10.8047 18.6667 11.4818 18.6667H18.6667" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21.4306 18.6667H12.3609C11.3832 18.6667 10.5489 17.9599 10.3881 16.9955L9.62443 12.4133C9.47205 11.499 10.1771 10.6667 11.104 10.6667H25.0486C25.792 10.6667 26.2755 11.4491 25.9431 12.114L23.2194 17.5612C22.8807 18.2387 22.1881 18.6667 21.4306 18.6667Z" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="22.6667" cy="26.6666" r="1.33333" fill="white"/>
                  <circle cx="12" cy="26.6666" r="1.33333" fill="white"/>
                </svg>
              </svg>
              {totalItemsInCart > 0 && (
                <div style={{
                  position: 'absolute', top: 0, right: 0,
                  width: '12px', height: '12px',
                  backgroundColor: '#FFB800',
                  borderRadius: '50%',
                  border: '2px solid #FFFFFF'
                }}></div>
              )}
            </div>
            
            {/* 2. IKON RIWAYAT PESANAN DENGAN INDIKATOR PESANAN AKTIF */}
            <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => navigate('/history')}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="20" fill="#9CA3AF"/>
                  <svg x="8" y="8" width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <path d="M9 7L13 7" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M9 15L12 15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M9 11L15 11" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M19 11V9C19 6.17157 19 4.75736 18.1213 3.87868C17.2426 3 15.8284 3 13 3H11C8.17157 3 6.75736 3 5.87868 3.87868C5 4.75736 5 6.17157 5 9V15C5 17.8284 5 19.2426 5.87868 20.1213C6.75736 21 8.17157 21 11 21H12" stroke="white" strokeWidth="2"/>
                      <circle cx="17.5" cy="17.5" r="2.5" stroke="white" strokeWidth="2"/>
                      <path d="M21 21L19.5 19.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
              </svg>
              
              {/* Dot Kuning otomatis muncul jika ada pesanan berlangsung */}
              {hasOngoingOrders && (
                <div style={{
                  position: 'absolute', top: 0, right: 0,
                  width: '12px', height: '12px',
                  backgroundColor: '#FFB800',
                  borderRadius: '50%',
                  border: '2px solid #FFFFFF'
                }}></div>
              )}
            </div>
            
            {/* 3. IKON NOTIFIKASI */}
            <div className="notif-wrapper">
              <svg 
                onClick={() => {
                  setIsNotifOpen(!isNotifOpen);
                  setIsProfileMenuOpen(false); 
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
          </div>
        </header>

        {/* 2. BANNER */}
        <section className="banner-section">
          <div 
            className="banner-scroll" 
            ref={bannerScrollRef} 
            onScroll={handleBannerScroll}
          >
            {bannerData.map(banner => (
              <div key={banner.id} className="banner-card">
                <img src={banner.imgUrl} alt="Promo Banner" />
              </div>
            ))}
          </div>

          <div className="banner-indicators">
            {bannerData.map((_, index) => (
              <span 
                key={index} 
                className={`dot ${currentBanner === index ? 'active' : ''}`}
              ></span>
            ))}
          </div>
        </section>

        {/* 3. SEARCH & KATEGORI (Sticky di bawah Header) */}
        <div className="sticky-filters">
          
          <div className="search-bar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input 
                type="text" 
                placeholder="Mau makan apa hari ini?" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="category-scroll" ref={catScrollRef} onScroll={handleCatScroll}>
            {['rekomendasi untuk anda', 'terdekat', 'promo'].map((cat) => (
              <button 
                key={cat} 
                className={`chip ${primaryFilter === cat ? 'active' : ''}`}
                onClick={() => setPrimaryFilter(cat)}
              >
                {cat}
              </button>
            ))}

            <button 
              ref={jenisBtnRef}
              className={`chip ${(selectedJenis !== 'jenis' || openDropdown === 'jenis') ? 'active' : ''}`}
              onClick={() => handleDropdown('jenis', jenisBtnRef, setJenisDropdownLeft, 160)}
            >
              {selectedJenis}
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>

            <button 
              ref={areaBtnRef}
              className={`chip ${(selectedArea !== 'area' || openDropdown === 'area') ? 'active' : ''}`}
              onClick={() => handleDropdown('area', areaBtnRef, setAreaDropdownLeft, 180)}
            >
              {selectedArea}
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>

          {isCatScrollable && (
            <div className="category-scroll-indicator">
              <div 
                className="indicator-thumb" 
                style={{ transform: `translateX(${catScrollProgress * 24}px)` }} 
              />
            </div>
          )}

            {openDropdown === 'jenis' && (
            <div 
              className="filter-dropdown jenis-dropdown"
              style={{ left: `${jenisDropdownLeft}px` }} /* Terapkan hasil perhitungan */
            >
              {jenisOptions.map(item => (
                <div 
                  key={item} 
                  className={`dropdown-item ${selectedJenis === item || (selectedJenis === 'jenis' && item === 'Semua') ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedJenis(item === 'Semua' ? 'jenis' : item);
                    setOpenDropdown(null); 
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          )}

          {openDropdown === 'area' && (
            <div className="filter-dropdown area-dropdown"
              style={{ left: `${areaDropdownLeft}px` }} /* Terapkan hasil perhitungan */>
              {areaOptions.map(item => (
                <div 
                  key={item} 
                  className={`dropdown-item ${selectedArea === item || (selectedArea === 'area' && item === 'Semua') ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedArea(item === 'Semua' ? 'area' : item);
                    setOpenDropdown(null); 
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          )}

        </div> 

        {/* 4. LIST RESTORAN */}
        <div className="restaurant-list">
          {restoData.map((resto) => (
            <div key={resto.id} className="resto-card">
              <img src={resto.imgUrl} alt={resto.name} className="resto-img" />
              <div className="resto-info">
                <h4>{resto.name}</h4>
                <div className="resto-stats">
                  <svg className="rating-star" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  <span className="rating-score">{resto.rating}</span>
                  <span className="rating-count">({resto.reviews} ratings)</span>
                </div>
                <p className="resto-price">{resto.priceRange}</p>
              </div>
              <button 
                className="btn-kunjungi" 
                onClick={() => navigate(`/store/${resto.id}`)}
              >
                Kunjungi toko
              </button>
            </div>
          ))}
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

        {/* --- MODAL KONFIRMASI LOGOUT --- */}
        {isLogoutModalOpen && (
          <div className="logout-modal-overlay">
            <div className="logout-modal-box">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M29.3334 15.9999L30.8951 14.7505L31.8946 15.9999L30.8951 17.2493L29.3334 15.9999ZM17.3334 17.9999C16.2288 17.9999 15.3334 17.1045 15.3334 15.9999C15.3334 14.8953 16.2288 13.9999 17.3334 13.9999V15.9999V17.9999ZM24 9.33325L25.5618 8.08386L30.8951 14.7505L29.3334 15.9999L27.7716 17.2493L22.4383 10.5826L24 9.33325ZM29.3334 15.9999L30.8951 17.2493L25.5618 23.916L24 22.6666L22.4383 21.4172L27.7716 14.7505L29.3334 15.9999ZM29.3334 15.9999V17.9999H17.3334V15.9999V13.9999H29.3334V15.9999Z" fill="#EF4444"/>
                <path d="M18.6666 10.8427V8.72192C18.6666 7.10358 18.6666 6.29441 18.1927 5.73492C17.7187 5.17543 16.9205 5.0424 15.3242 4.77635L9.65302 3.83115C6.40992 3.29063 4.78838 3.02037 3.7275 3.91907C2.66663 4.81777 2.66663 6.46168 2.66663 9.74951V22.2507C2.66663 25.5385 2.66663 27.1824 3.7275 28.0811C4.78838 28.9798 6.40992 28.7095 9.65302 28.169L15.3242 27.2238C16.9205 26.9578 17.7187 26.8247 18.1927 26.2652C18.6666 25.7058 18.6666 24.8966 18.6666 23.2782V21.4214" stroke="#EF4444" strokeWidth="4"/>
              </svg>
              <h3 className="modal-title">Keluar dari akun?</h3>
              <p className="modal-subtitle">Kamu harus login kembali untuk mengakses akun</p>
              <div className="modal-actions">
                <button className="btn-cancel" onClick={() => setIsLogoutModalOpen(false)}>Kembali</button>
                <button className="btn-confirm" onClick={() => navigate('/login')}>Keluar</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;