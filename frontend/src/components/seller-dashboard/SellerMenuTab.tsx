import { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import MenuItemCard from './MenuItemCard';
import AddMenuModal from '../popups/AddMenuModal';
import { getMenuItems, toggleMenuAvailability, addMenuItem, type MenuItem } from '../../utils/dummyMenu';

type MenuSubTab = 'semua' | 'tersedia' | 'habis';

export default function SellerMenuTab() {
  const [activeTab, setActiveTab] = useState<MenuSubTab>('semua');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    setMenuItems(getMenuItems());
  }, []);

  const handleToggle = (id: string, isAvailable: boolean) => {
    toggleMenuAvailability(id, isAvailable);
    setMenuItems(getMenuItems()); // Refresh list
  };

  const handleSaveNewMenu = (newItem: Omit<MenuItem, 'id' | 'soldCount'>) => {
    addMenuItem(newItem);
    setMenuItems(getMenuItems()); // Refresh list
  };

  const semuaCount = menuItems.length;
  const tersediaCount = menuItems.filter(item => item.isAvailable).length;
  const habisCount = menuItems.filter(item => !item.isAvailable).length;

  const filteredItems = menuItems.filter(item => {
    if (activeTab === 'semua') return true;
    if (activeTab === 'tersedia') return item.isAvailable;
    if (activeTab === 'habis') return !item.isAvailable;
    return true;
  });

  const getActiveTabStyle = (tab: MenuSubTab) => {
    if (activeTab !== tab) return 'bg-white text-slate-500 hover:bg-slate-50';
    switch (tab) {
      case 'semua': return 'bg-orange-400 text-white';
      case 'tersedia': return 'bg-green-500 text-white';
      case 'habis': return 'bg-red-500 text-white';
      default: return 'bg-white text-slate-500';
    }
  };

  return (
    <div className="flex-1 flex flex-col p-4 bg-slate-50 relative">
      {/* Top Controls Container */}
      <div className="bg-white rounded-2xl shadow-sm p-4 mb-4 border border-gray-100">
        
        {/* Sub Tabs */}
        <div className="flex border border-gray-200 rounded-xl overflow-hidden divide-x divide-gray-200 mb-4">
          <button 
            onClick={() => setActiveTab('semua')}
            className={`flex-1 py-2 flex flex-col items-center justify-center transition-colors ${getActiveTabStyle('semua')}`}
          >
            <span className="font-bold text-xl leading-none">{semuaCount}</span>
            <span className="text-[10px] font-semibold mt-1">Semua</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('tersedia')}
            className={`flex-1 py-2 flex flex-col items-center justify-center transition-colors ${getActiveTabStyle('tersedia')}`}
          >
            <span className="font-bold text-xl leading-none">{tersediaCount}</span>
            <span className="text-[10px] font-semibold mt-1">Tersedia</span>
          </button>

          <button 
            onClick={() => setActiveTab('habis')}
            className={`flex-1 py-2 flex flex-col items-center justify-center transition-colors ${getActiveTabStyle('habis')}`}
          >
            <span className="font-bold text-xl leading-none">{habisCount}</span>
            <span className="text-[10px] font-semibold mt-1">Habis</span>
          </button>
        </div>

        {/* Add New Menu Button */}
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="w-full flex items-center justify-end gap-2 text-orange-400 font-bold hover:text-orange-500 transition-colors py-1"
        >
          <span className="text-sm">Tambahkan Menu Baru</span>
          <PlusCircle size={20} />
        </button>
      </div>

      {/* Menu List */}
      <div className="flex-1 flex flex-col pb-8">
        {filteredItems.length > 0 ? (
          filteredItems.map(item => (
            <MenuItemCard 
              key={item.id} 
              item={item} 
              onToggleAvailability={handleToggle}
              onEdit={(id) => console.log('Edit menu', id)}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-slate-400">
            <p>Tidak ada menu di kategori ini.</p>
          </div>
        )}
      </div>

      {/* Add Menu Modal */}
      <AddMenuModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onSave={handleSaveNewMenu}
      />
    </div>
  );
}
