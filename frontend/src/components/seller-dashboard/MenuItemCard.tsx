import { Pencil } from 'lucide-react';
import type { MenuItem } from '../../utils/dummyMenu';

interface MenuItemCardProps {
  item: MenuItem;
  onToggleAvailability: (id: string, isAvailable: boolean) => void;
  onEdit?: (id: string) => void;
}

export default function MenuItemCard({ item, onToggleAvailability, onEdit }: MenuItemCardProps) {
  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount).replace('Rp', 'Rp ');
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-4 flex gap-4 relative">
      {/* Edit Button */}
      <button 
        onClick={() => onEdit?.(item.id)}
        className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
      >
        <Pencil size={20} />
      </button>

      {/* Image */}
      <img 
        src={item.imageUrl} 
        alt={item.name} 
        className="w-24 h-24 rounded-xl object-cover"
      />

      {/* Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-slate-800 text-lg leading-tight pr-8">{item.name}</h3>
          <div className="font-bold text-orange-400 text-base mt-1">
            {formatRupiah(item.price)}
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-slate-500 font-medium">
            {item.soldCount} terjual
          </span>
          
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold ${item.isAvailable ? 'text-orange-400' : 'text-slate-400'}`}>
              {item.isAvailable ? 'Tersedia' : 'Habis'}
            </span>
            <button 
              onClick={() => onToggleAvailability(item.id, !item.isAvailable)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                item.isAvailable ? 'bg-orange-400' : 'bg-slate-300'
              }`}
            >
              <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform ${
                item.isAvailable ? 'translate-x-6' : 'translate-x-0'
              }`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
