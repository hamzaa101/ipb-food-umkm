import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import SellerNavbar from '../components/seller-dashboard/SellerNavbar';
import SellerTabs from '../components/seller-dashboard/SellerTabs';
import SellerOrdersTab from '../components/seller-dashboard/SellerOrdersTab';
import SellerMenuTab from '../components/seller-dashboard/SellerMenuTab';

import ProfileMenu from '../components/popups/ProfileMenu';
import NotificationMenu from '../components/popups/NotificationMenu';
import LogoutConfirmModal from '../components/popups/LogoutConfirmModal';
import { useDisclosure } from '../hooks/useDisclosure';

export default function SellerDashboard() {
  const navigate = useNavigate();
  
  // Tab State
  const [activeTab, setActiveTab] = useState<'pesanan' | 'menu' | 'promo'>('pesanan');

  // Popup States
  const profileMenu = useDisclosure();
  const notifMenu = useDisclosure();
  const logoutModal = useDisclosure();

  const handleLogoutConfirm = () => {
    logoutModal.close();
    navigate('/login');
  };

  return (
    <MainLayout>
      <div className="flex flex-col h-full bg-slate-50 min-h-screen">
        <SellerNavbar 
          onOpenProfile={profileMenu.open}
          onOpenNotification={notifMenu.open}
        />
        
        <SellerTabs 
          activeTab={activeTab} 
          onChangeTab={setActiveTab} 
        />

        {/* Content Area */}
        {activeTab === 'pesanan' && <SellerOrdersTab />}
        {activeTab === 'menu' && <SellerMenuTab />}
        {activeTab === 'promo' && (
          <div className="flex-1 flex items-center justify-center text-slate-400">
            <p>Fitur Promo akan segera hadir.</p>
          </div>
        )}
      </div>

      {/* Popups */}
      <ProfileMenu 
        isOpen={profileMenu.isOpen} 
        onClose={profileMenu.close} 
        onLogoutClick={logoutModal.open}
        isSeller={true}
      />
      
      <NotificationMenu 
        isOpen={notifMenu.isOpen} 
        onClose={notifMenu.close} 
        isSeller={true}
        onNotificationClick={() => setActiveTab('pesanan')}
      />

      <LogoutConfirmModal 
        isOpen={logoutModal.isOpen}
        onClose={logoutModal.close}
        onConfirm={handleLogoutConfirm}
      />
    </MainLayout>
  );
}
