import { FileText, Utensils, BadgePercent } from 'lucide-react';

interface SellerTabsProps {
  activeTab: 'pesanan' | 'menu' | 'promo';
  onChangeTab: (tab: 'pesanan' | 'menu' | 'promo') => void;
}

export default function SellerTabs({ activeTab, onChangeTab }: SellerTabsProps) {
  return (
    <div className="bg-slate-700 px-4 pb-4">
      <div className="bg-white rounded-2xl flex items-center p-1 shadow-sm">
        <button
          onClick={() => onChangeTab('pesanan')}
          className={`flex-1 flex flex-col items-center justify-center py-2 rounded-xl transition-all duration-200 ${
            activeTab === 'pesanan' 
              ? 'bg-orange-400 text-white shadow-sm' 
              : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          <FileText size={24} className="mb-1" />
          <span className="text-xs font-semibold">Pesanan</span>
        </button>
        
        <button
          onClick={() => onChangeTab('menu')}
          className={`flex-1 flex flex-col items-center justify-center py-2 rounded-xl transition-all duration-200 ${
            activeTab === 'menu' 
              ? 'bg-orange-400 text-white shadow-sm' 
              : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          <Utensils size={24} className="mb-1" />
          <span className="text-xs font-semibold">Kelola Menu</span>
        </button>
        
        <button
          onClick={() => onChangeTab('promo')}
          className={`flex-1 flex flex-col items-center justify-center py-2 rounded-xl transition-all duration-200 ${
            activeTab === 'promo' 
              ? 'bg-orange-400 text-white shadow-sm' 
              : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          <BadgePercent size={24} className="mb-1" />
          <span className="text-xs font-semibold">Promo</span>
        </button>
      </div>
    </div>
  );
}
