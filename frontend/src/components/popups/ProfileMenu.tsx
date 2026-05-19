import { User, Store, Info, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProfileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onLogoutClick: () => void;
  isSeller?: boolean;
}

export default function ProfileMenu({ isOpen, onClose, onLogoutClick, isSeller }: ProfileMenuProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Invisible backdrop to detect clicks outside */}
      <div className="fixed inset-0 z-40" onClick={onClose} />
      
      {/* Menu Card */}
      <div className="fixed top-16 left-4 z-50 w-64 bg-white rounded-2xl shadow-xl border border-border-light overflow-hidden flex flex-col py-2 animate-in fade-in slide-in-from-top-2 duration-200">
        <Link to="/profile" onClick={onClose} className="flex items-center gap-3 px-4 py-3 hover:bg-surface-200 text-secondary transition-colors">
          <User size={20} />
          <span className="font-semibold text-sm">Profil</span>
        </Link>
        
        {!isSeller && (
          <Link to="/register-store" onClick={onClose} className="flex items-center gap-3 px-4 py-3 hover:bg-surface-200 text-secondary transition-colors">
            <Store size={20} />
            <span className="font-semibold text-sm">Mulai Berjualan</span>
          </Link>
        )}
        
        <Link to="/placeholder" onClick={onClose} className="flex items-center gap-3 px-4 py-3 hover:bg-surface-200 text-secondary transition-colors">
          <Info size={20} />
          <span className="font-semibold text-sm">Hubungi Kami</span>
        </Link>
        
        <div className="h-px bg-border-light my-1 mx-4" />
        
        <button 
          onClick={() => {
            onClose();
            onLogoutClick();
          }} 
          className="flex items-center gap-3 px-4 py-3 hover:bg-surface-200 text-danger transition-colors text-left"
        >
          <LogOut size={20} />
          <span className="font-semibold text-sm">Keluar</span>
        </button>
      </div>
    </>
  );
}
