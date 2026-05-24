import { ShieldCheck, LogOut } from 'lucide-react';

interface AdminNavbarProps {
  onLogoutClick: () => void;
}

export default function AdminNavbar({ onLogoutClick }: AdminNavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-secondary px-4 py-4 flex items-center justify-between shadow-md">
      {/* Brand */}
      <div className="flex items-center gap-2 text-white">
        <ShieldCheck size={24} className="text-accent" />
        <span className="font-bold text-lg tracking-tight">Admin Hub</span>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* We can add notification bell here later if needed */}
        <button 
          onClick={onLogoutClick}
          className="p-2 rounded-full hover:bg-white/10 transition-colors text-white flex items-center gap-2"
        >
          <LogOut size={20} />
          <span className="hidden md:inline font-semibold text-sm">Keluar</span>
        </button>
      </div>
    </header>
  );
}
