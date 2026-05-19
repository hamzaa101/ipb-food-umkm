import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Header from '../components/dashboard/Header';
import PromoCarousel from '../components/dashboard/PromoCarousel';
import SearchBar from '../components/dashboard/SearchBar';
import CategoryTabs from '../components/dashboard/CategoryTabs';
import UMKMCard from '../components/dashboard/UMKMCard';

import ProfileMenu from '../components/popups/ProfileMenu';
import NotificationMenu from '../components/popups/NotificationMenu';
import LogoutConfirmModal from '../components/popups/LogoutConfirmModal';
import CategoryDropdown from '../components/popups/CategoryDropdown';
import AreaDropdown from '../components/popups/AreaDropdown';
import { dummyUMKM } from '../utils/dummyData';
import { useDisclosure } from '../hooks/useDisclosure';

export default function Dashboard() {
  const navigate = useNavigate();
  
  // Popup States
  const profileMenu = useDisclosure();
  const notifMenu = useDisclosure();
  const logoutModal = useDisclosure();
  const categoryDropdown = useDisclosure();
  const areaDropdown = useDisclosure();

  const handleLogoutConfirm = () => {
    logoutModal.close();
    // Add real logout logic here later (clear tokens, etc)
    navigate('/login');
  };

  return (
    <MainLayout>
      <Header 
        onOpenProfile={profileMenu.open}
        onOpenNotification={notifMenu.open}
      />

      <div className="flex-1 overflow-y-auto bg-surface-light relative">
        <PromoCarousel />
        
        <SearchBar />
        
        <div className="sticky top-0 z-30 bg-surface-light">
          <div className="relative">
            <CategoryTabs 
              onOpenJenis={categoryDropdown.open} 
              onOpenArea={areaDropdown.open}
            />
            <CategoryDropdown 
              isOpen={categoryDropdown.isOpen} 
              onClose={categoryDropdown.close} 
            />
            <AreaDropdown 
              isOpen={areaDropdown.isOpen} 
              onClose={areaDropdown.close} 
            />
          </div>
        </div>

        {/* UMKM List */}
        <div className="pb-8">
          <h2 className="px-4 font-bold text-secondary text-lg mb-3">Rekomendasi Kantin</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
            {dummyUMKM.map((umkm) => (
              <div key={umkm.id} className="rounded-2xl overflow-hidden shadow-sm border border-border-light">
                <UMKMCard data={umkm} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Absolute/Fixed Popups */}
      <ProfileMenu 
        isOpen={profileMenu.isOpen} 
        onClose={profileMenu.close} 
        onLogoutClick={logoutModal.open}
      />
      
      <NotificationMenu 
        isOpen={notifMenu.isOpen} 
        onClose={notifMenu.close} 
      />

      <LogoutConfirmModal 
        isOpen={logoutModal.isOpen}
        onClose={logoutModal.close}
        onConfirm={handleLogoutConfirm}
      />
    </MainLayout>
  );
}