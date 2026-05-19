import { ShoppingCart, ReceiptText, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';

interface HeaderProps {
  onOpenProfile: () => void;
  onOpenNotification: () => void;
}

export default function Header({ onOpenProfile, onOpenNotification }: HeaderProps) {
  const navigate = useNavigate();
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-border-light px-4 py-3 flex items-center justify-between">
      {/* Profile Section */}
      <div 
        className="flex items-center gap-3 cursor-pointer hover:bg-surface-200 p-1.5 rounded-xl transition-colors"
        onClick={onOpenProfile}
      >
        <img 
          src="https://randomuser.me/api/portraits/men/32.jpg" 
          alt="Arif Satria" 
          className="w-12 h-12 rounded-full object-cover border-2 border-primary"
        />
        <div className="flex flex-col">
          <h2 className="font-bold text-secondary text-lg leading-tight">Arif Satria</h2>
          <div className="flex items-center gap-1 text-text-secondary-light text-xs">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            <span className="underline">Jl. Agatis, Dramaga</span>
          </div>
        </div>
      </div>

      {/* Action Icons */}
      <div className="flex items-center gap-2">
        <button 
          onClick={() => navigate('/cart')}
          className="relative w-10 h-10 rounded-full bg-text-muted-light/30 flex items-center justify-center text-white hover:bg-text-muted-light/50 transition-colors"
        >
          <ShoppingCart size={20} className="text-secondary" />
          {totalItems > 0 && (
            <div className="absolute top-0 right-0 w-3 h-3 bg-yellow-400 border-2 border-white rounded-full"></div>
          )}
        </button>
        <button 
          onClick={() => navigate('/orders')}
          className="w-10 h-10 rounded-full bg-text-muted-light/30 flex items-center justify-center text-white hover:bg-text-muted-light/50 transition-colors"
        >
          <ReceiptText size={20} className="text-secondary" />
        </button>
        <button 
          onClick={onOpenNotification}
          className="w-10 h-10 rounded-full bg-text-muted-light/30 flex items-center justify-center text-white hover:bg-text-muted-light/50 transition-colors"
        >
          <Bell size={20} className="text-secondary" />
        </button>
      </div>
    </header>
  );
}
