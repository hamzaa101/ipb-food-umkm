import { useState } from 'react';
import { Lock, Globe, XCircle, Pencil } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import LanguageModal from '../components/popups/LanguageModal';
import DeleteAccountModal from '../components/popups/DeleteAccountModal';

export default function Profile() {
  const navigate = useNavigate();
  
  // Initial data (would come from an API/context in reality)
  const initialData = {
    name: 'Arif Satria',
    phone: '081234567890',
    language: 'Bahasa Indonesia'
  };

  const [name, setName] = useState(initialData.name);
  const [phone, setPhone] = useState(initialData.phone);
  const [language, setLanguage] = useState(initialData.language);
  
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Check if data is changed
  const isChanged = name !== initialData.name || phone !== initialData.phone;

  const handleSaveProfile = () => {
    // In reality, this would make an API call
    console.log('Saving profile...', { name, phone });
    // Simulate save by updating state logic or showing success message
    alert('Profil berhasil disimpan');
  };

  const handleDeleteAccount = () => {
    // API call to delete account
    console.log('Account deleted');
    navigate('/login');
  };

  return (
    <MainLayout>
      <div className="flex flex-col min-h-screen bg-white">
        {/* Header */}
      <header className="sticky top-0 z-40 bg-white px-4 py-4 flex items-center justify-center shadow-sm">
        <button 
          onClick={() => navigate(-1)}
          className="absolute left-4 p-2 hover:bg-surface-200 rounded-full transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <h1 className="text-xl font-bold text-secondary">Profil</h1>
      </header>

      <main className="flex-1 px-6 py-6 flex flex-col items-center max-w-2xl w-full mx-auto">
        {/* Avatar */}
        <div className="relative mb-8">
          <img 
            src="https://randomuser.me/api/portraits/men/32.jpg" 
            alt="Profile Avatar" 
            className="w-32 h-32 rounded-full object-cover border-[3px] border-secondary"
          />
          <button className="absolute bottom-0 right-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white border-4 border-white shadow-sm hover:bg-primary-hover transition-colors">
            <Pencil size={18} fill="currentColor" />
          </button>
        </div>

        {/* Form Inputs */}
        <div className="w-full space-y-4 mb-8">
          <div className="flex flex-col gap-1.5 relative">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-secondary">Nama</label>
              {isChanged && (
                <button 
                  onClick={handleSaveProfile}
                  className="text-primary font-bold text-sm hover:text-primary-hover transition-colors"
                >
                  Simpan
                </button>
              )}
            </div>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-text-secondary-light/40 rounded-xl px-4 py-3 text-secondary focus:outline-none focus:border-primary transition-colors font-medium"
            />
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-secondary">Nomor Telepon</label>
            <input 
              type="tel" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-text-secondary-light/40 rounded-xl px-4 py-3 text-secondary focus:outline-none focus:border-primary transition-colors font-medium"
            />
          </div>
        </div>

        <div className="w-full h-px bg-border-light mb-6" />

        {/* Menu Options */}
        <div className="w-full flex flex-col">
          <Link 
            to="/change-password" 
            className="flex items-center gap-4 py-4 hover:bg-surface-200 px-2 -mx-2 rounded-xl transition-colors border-b border-border-light"
          >
            <Lock size={24} className="text-secondary" />
            <span className="font-bold text-secondary">Ubah Kata Sandi</span>
          </Link>
          
          <button 
            onClick={() => setIsLangModalOpen(true)}
            className="flex items-center gap-4 py-4 hover:bg-surface-200 px-2 -mx-2 rounded-xl transition-colors border-b border-border-light text-left"
          >
            <Globe size={24} className="text-secondary" />
            <span className="font-bold text-secondary">Ubah Bahasa</span>
          </button>
          
          <button 
            onClick={() => setIsDeleteModalOpen(true)}
            className="flex items-center gap-4 py-4 hover:bg-surface-200 px-2 -mx-2 rounded-xl transition-colors text-left"
          >
            <XCircle size={24} className="text-danger" />
            <span className="font-bold text-danger">Hapus Akun</span>
          </button>
        </div>
      </main>

      {/* Modals */}
      <LanguageModal 
        isOpen={isLangModalOpen} 
        onClose={() => setIsLangModalOpen(false)} 
        currentLanguage={language}
        onSave={(lang) => setLanguage(lang)}
      />
      
        <DeleteAccountModal 
          isOpen={isDeleteModalOpen} 
          onClose={() => setIsDeleteModalOpen(false)} 
          onConfirm={handleDeleteAccount}
        />
      </div>
    </MainLayout>
  );
}
