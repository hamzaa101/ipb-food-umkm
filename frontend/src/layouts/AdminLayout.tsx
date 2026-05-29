// src/layouts/AdminLayout.tsx
import { useState, ReactNode } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Store,
  Users,
  ActivitySquare,
  LogOut,
  Receipt,
  Settings,
  Menu,
} from "lucide-react";
import { Toaster, toast } from "sonner";
import "../styles/Admin.css"; // Menggunakan Admin.css gabungan kita

interface AdminLayoutProps {
  children: ReactNode;
}

// Tipe data notifikasi
interface NotificationData {
  id: number;
  text: string;
  time: string;
  isRead: boolean;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false); // State untuk Notifikasi

  // Data Notifikasi Dummy
  const notifData: NotificationData[] = [
    { id: 1, text: 'Toko Ayam Geprek Kampus mengajukan verifikasi', time: '13 Februari 2026 (15.54)', isRead: false },
    { id: 2, text: 'Pengguna baru mendaftar', time: '13 Februari 2026 (14.20)', isRead: false },
    { id: 3, text: 'Toko Kopi Senja berhasil diverifikasi', time: '12 Februari 2026 (10.00)', isRead: true },
    { id: 4, text: 'Transaksi mencurigakan terdeteksi', time: '11 Februari 2026 (09.15)', isRead: true },
    { id: 5, text: 'Laporan bulanan telah siap', time: '10 Februari 2026 (08.00)', isRead: true },
  ];

  const navItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Manajemen Transaksi", path: "/admin/transaksi", icon: Receipt },
    { name: "Verifikasi Toko", path: "/admin/verifikasi", icon: Store },
    { name: "Manajemen Pengguna", path: "/admin/pengguna", icon: Users },
    { name: "Log Aktivitas", path: "/admin/log", icon: ActivitySquare },
    { name: "Pengaturan", path: "/admin/pengaturan", icon: Settings },
  ];

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/admin/dashboard': return 'Dashboard';
      case '/admin/transaksi': return 'Manajemen Transaksi';
      case '/admin/verifikasi': return 'Verifikasi Toko';
      case '/admin/pengguna': return 'Manajemen Pengguna';
      case '/admin/log': return 'Log Aktivitas';
      case '/admin/pengaturan': return 'Pengaturan Sistem';
    }
  };

  const handleLogout = () => {
  setIsLogoutModalOpen(false);

  toast("Anda telah berhasil logout.", {
    description: "Sesi admin telah diakhiri."
  });

  navigate('/login');
  };

  const closeMobileMenu = () => { setIsMobileMenuOpen(false); };

  return (
    <div className="layout-container">
      <Toaster position="top-right" />
      
      {/* ================= SIDEBAR (DESKTOP) ================= */}
      <aside className="layout-sidebar">
        <div>
          <div className="sidebar-header">
            <h1 className="sidebar-title">Food HUB Admin</h1>
          </div>
          <nav className="sidebar-nav">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
              >
                <item.icon className="nav-icon" />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="sidebar-footer">
          <button
            onClick={() => setIsLogoutModalOpen(true)}
            className="logout-button"
          >
            <LogOut className="nav-icon" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="layout-main">
        {/* TOPBAR */}
        <header className="main-header">
          <div className="header-left">
            <div className="mobile-menu-container">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="hamburger-trigger">
                <Menu className="w-6 h-6 text-slate-700" />
              </button>
              
              {isMobileMenuOpen && (
                <>
                  <div className="popup-menu">
                    {navItems.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.path}
                        onClick={closeMobileMenu}
                        className={({ isActive }) => `popup-item ${isActive ? "active" : ""}`}
                      >
                        <item.icon className="nav-icon" />
                        <span>{item.name}</span>
                      </NavLink>
                    ))}
                    <div className="popup-divider" />
                    <button
                      onClick={() => {
                        setIsLogoutModalOpen(true);
                        closeMobileMenu();
                      }}
                      className="popup-logout"
                    >
                      <LogOut className="nav-icon" />
                      <span>Keluar</span>
                    </button>
                  </div>
                </>
              )}
            </div>
            <h2 className="page-title">{getPageTitle()}</h2>
          </div>
          
          <div className="header-right">
            {/* --- IKON NOTIFIKASI BESERTA POPUP --- */}
            <div className="notif-wrapper" style={{ position: 'relative' }}>
              {/* Ikon Lonceng SVG dari kodemu */}
              <svg 
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                style={{ cursor: 'pointer' }}
                width="40" height="40" viewBox="0 0 40 40" fill="none"
              >
                {/* Latar Belakang Abu-abu Lingkaran (meniru tombol profil) */}
                <circle cx="20" cy="20" r="20" fill="#F1F5F9"/> 
                {/* Ikon Lonceng (diubah ke abu-abu gelap agar kontras dengan latar terang) */}
                <svg x="7" y="7" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M15.625 17.7083V18.75C15.625 20.4759 14.2259 21.875 12.5 21.875C10.7741 21.875 9.37499 20.4759 9.37499 18.75V17.7083M15.625 17.7083H9.37499M15.625 17.7083H19.3651C19.7636 17.7083 19.9637 17.7083 20.1251 17.6539C20.4333 17.55 20.6744 17.308 20.7784 16.9998C20.833 16.8378 20.833 16.637 20.833 16.2354C20.833 16.0596 20.8328 15.9717 20.8191 15.888C20.7931 15.7296 20.7317 15.5795 20.6381 15.4492C20.5886 15.3803 20.5258 15.3175 20.4019 15.1936L19.9961 14.7878C19.8652 14.6569 19.7917 14.4793 19.7917 14.2942V10.4167C19.7917 6.38958 16.5271 3.12499 12.5 3.125C8.47292 3.12501 5.20832 6.3896 5.20832 10.4167V14.2942C5.20832 14.4793 5.13462 14.6569 5.0037 14.7878L4.59797 15.1935C4.4737 15.3178 4.41149 15.3803 4.36197 15.4492C4.26838 15.5796 4.20639 15.7296 4.18041 15.888C4.16666 15.9717 4.16666 16.0596 4.16666 16.2354C4.16666 16.637 4.16666 16.8378 4.22129 16.9997C4.32525 17.3079 4.56749 17.55 4.87568 17.6539C5.03703 17.7083 5.23646 17.7083 5.63494 17.7083H9.37499" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </svg>

              {/* Titik Notifikasi Merah (Hanya muncul jika ada notif yang belum dibaca) */}
              {notifData.some(n => !n.isRead) && (
                <div className="admin-notif-dot"></div>
              )}

              {/* Pop-up Notifikasi */}
              {isNotifOpen && (
                <div className="notif-popup admin-notif-popup">
                  <div className="notif-header">Notifikasi</div>
                  <div className="notif-list">
                    {notifData.map((notif) => (
                      <div key={notif.id} className="notif-item">
                        <div className="notif-content-row">
                          {!notif.isRead && <div className="notif-dot"></div>}
                          <div className="notif-text-wrapper">
                            <p className="notif-main-text" style={{ color: '#0F172A' }}>{notif.text}</p>
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

        {/* AREA KONTEN HALAMAN */}
        <div className="page-content">
          {children}
        </div>
        
        {isLogoutModalOpen && (
          <div className="logout-modal-overlay"
            onClick={() => setIsLogoutModalOpen(false)}>
            <div className="logout-modal-box" onClick={(e) => e.stopPropagation()}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M29.3334 15.9999L30.8951 14.7505L31.8946 15.9999L30.8951 17.2493L29.3334 15.9999ZM17.3334 17.9999C16.2288 17.9999 15.3334 17.1045 15.3334 15.9999C15.3334 14.8953 16.2288 13.9999 17.3334 13.9999V15.9999V17.9999ZM24 9.33325L25.5618 8.08386L30.8951 14.7505L29.3334 15.9999L27.7716 17.2493L22.4383 10.5826L24 9.33325ZM29.3334 15.9999L30.8951 17.2493L25.5618 23.916L24 22.6666L22.4383 21.4172L27.7716 14.7505L29.3334 15.9999ZM29.3334 15.9999V17.9999H17.3334V15.9999V13.9999H29.3334V15.9999Z" fill="#EF4444"/>
                <path d="M18.6666 10.8427V8.72192C18.6666 7.10358 18.6666 6.29441 18.1927 5.73492C17.7187 5.17543 16.9205 5.0424 15.3242 4.77635L9.65302 3.83115C6.40992 3.29063 4.78838 3.02037 3.7275 3.91907C2.66663 4.81777 2.66663 6.46168 2.66663 9.74951V22.2507C2.66663 25.5385 2.66663 27.1824 3.7275 28.0811C4.78838 28.9798 6.40992 28.7095 9.65302 28.169L15.3242 27.2238C16.9205 26.9578 17.7187 26.8247 18.1927 26.2652C18.6666 25.7058 18.6666 24.8966 18.6666 23.2782V21.4214" stroke="#EF4444" strokeWidth="4"/>
              </svg>

              <h3 className="modal-title">
                Keluar dari akun?
              </h3>

              <p className="modal-subtitle">
                Kamu harus login kembali untuk mengakses akun
              </p>

              <div className="modal-actions">
                <button
                  className="btn-cancel"
                  onClick={() => setIsLogoutModalOpen(false)}
                >
                  Kembali
                </button>

                <button
                  className="btn-confirm"
                  onClick={handleLogout}
                >
                  Keluar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}