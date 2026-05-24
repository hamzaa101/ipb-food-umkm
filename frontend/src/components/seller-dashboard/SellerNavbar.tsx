import { Bell, MapPin } from 'lucide-react';

interface SellerNavbarProps {
  onOpenProfile?: () => void;
  onOpenNotification?: () => void;
}

export default function SellerNavbar({ onOpenProfile, onOpenNotification }: SellerNavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-slate-700 px-4 py-3 flex items-center justify-between text-white">
      {/* Profile Section */}
      <div 
        className="flex items-center gap-3 cursor-pointer hover:bg-slate-600 p-1.5 rounded-xl transition-colors"
        onClick={onOpenProfile}
      >
        <img 
          src="https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=100&auto=format&fit=crop" 
          alt="Nasi Goreng Pak Salman" 
          className="w-12 h-12 rounded-full object-cover border-2 border-white"
        />
        <div className="flex flex-col">
          <h2 className="font-bold text-lg leading-tight">Nasi Goreng Pak Salman</h2>
          <div className="flex items-center gap-1 text-slate-300 text-xs mt-0.5">
            <MapPin size={12} />
            <span className="underline">Jl. Agatis, Dramaga</span>
          </div>
        </div>
      </div>

      {/* Action Icons */}
      <div className="flex items-center">
        <button 
          onClick={onOpenNotification}
          className="w-10 h-10 rounded-full bg-slate-500/50 flex items-center justify-center text-white hover:bg-slate-500/80 transition-colors relative"
        >
          <Bell size={20} />
          <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 border border-slate-700 rounded-full"></div>
        </button>
      </div>
    </header>
  );
}
