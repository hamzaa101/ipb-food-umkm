import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AdminNavbar from '../components/admin-dashboard/AdminNavbar';
import AdminTabs from '../components/admin-dashboard/AdminTabs';
import OverviewTab from '../components/admin-dashboard/OverviewTab';
import VerificationTab from '../components/admin-dashboard/VerificationTab';
import UsersTab from '../components/admin-dashboard/UsersTab';
import LogoutConfirmModal from '../components/popups/LogoutConfirmModal';
import { getVerifications } from '../utils/dummyAdmin';
import { useDisclosure } from '../hooks/useDisclosure';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'ringkasan' | 'verifikasi' | 'pengguna'>('ringkasan');
  const logoutModal = useDisclosure();
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const verifs = getVerifications();
    setPendingCount(verifs.filter(v => v.status === 'pending').length);
  }, [activeTab]);

  const handleLogoutConfirm = () => {
    logoutModal.close();
    navigate('/login');
  };

  return (
    <MainLayout>
      <div className="flex flex-col h-full bg-slate-50 min-h-screen">
        <AdminNavbar onLogoutClick={logoutModal.open} />
        
        <AdminTabs
          activeTab={activeTab}
          onChangeTab={setActiveTab}
          pendingCount={pendingCount}
        />

        {/* Content Area */}
        {activeTab === 'ringkasan' && <OverviewTab />}
        {activeTab === 'verifikasi' && <VerificationTab />}
        {activeTab === 'pengguna' && <UsersTab />}
      </div>

      <LogoutConfirmModal
        isOpen={logoutModal.isOpen}
        onClose={logoutModal.close}
        onConfirm={handleLogoutConfirm}
      />
    </MainLayout>
  );
}
