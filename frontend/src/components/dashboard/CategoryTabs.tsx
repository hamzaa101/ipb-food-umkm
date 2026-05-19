import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface CategoryTabsProps {
  onOpenJenis: () => void;
  onOpenArea: () => void;
}

const INITIAL_TABS = [
  { id: 'rekomendasi', label: 'rekomendasi untuk anda', active: true },
  { id: 'terdekat', label: 'terdekat', active: false },
  { id: 'promo', label: 'promo', active: false },
  { id: 'jenis', label: 'jenis', hasDropdown: true, active: false },
  { id: 'area', label: 'area', hasDropdown: true, active: false },
];

export default function CategoryTabs({ onOpenJenis, onOpenArea }: CategoryTabsProps) {
  const [tabs, setTabs] = useState(INITIAL_TABS);

  const toggleTab = (id: string) => {
    setTabs(prev => prev.map(tab => 
      tab.id === id ? { ...tab, active: !tab.active } : tab
    ));
  };
  return (
    <div className="flex flex-col bg-white">
      <div 
        className="flex overflow-x-auto hide-scrollbar px-4 py-3 gap-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              toggleTab(tab.id);
              if (tab.id === 'jenis') onOpenJenis();
              if (tab.id === 'area') onOpenArea();
            }}
            className={`
              flex items-center gap-1 shrink-0 px-4 py-2 rounded-full border text-sm font-semibold transition-colors
              ${tab.active 
                ? 'bg-primary border-primary text-white' 
                : 'bg-white border-border-light text-secondary hover:bg-surface-200'
              }
            `}
          >
            {tab.label}
            {tab.hasDropdown && <ChevronDown size={16} className={tab.active ? 'text-white' : 'text-text-muted-light'} />}
          </button>
        ))}
      </div>
      
      {/* Small drag indicator / separator at the bottom */}
      <div className="flex justify-center py-2 border-b border-border-light">
        <div className="w-16 h-1 bg-border-light rounded-full"></div>
      </div>
    </div>
  );
}
