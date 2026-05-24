import { useState } from 'react';
import { X, ImagePlus, Loader2 } from 'lucide-react';
import type { MenuItem } from '../../utils/dummyMenu';

interface AddMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (menu: Omit<MenuItem, 'id' | 'soldCount'>) => void;
}

export default function AddMenuModal({ isOpen, onClose, onSave }: AddMenuModalProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price) return;

    setIsLoading(true);
    
    // Simulate network request
    setTimeout(() => {
      onSave({
        name,
        price: parseInt(price.replace(/\D/g, ''), 10) || 0,
        imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=200&h=200', // Default placeholder image
        isAvailable: true,
      });
      
      // Reset form
      setName('');
      setPrice('');
      setIsLoading(false);
      onClose();
    }, 600);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Basic formatting for numeric input
    const val = e.target.value.replace(/\D/g, '');
    setPrice(val);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-7xl relative flex justify-center items-end md:items-center">
        
        {/* Modal Content */}
        <div 
          className="bg-white w-full max-w-md md:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden animate-slideUp md:animate-scaleIn flex flex-col max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
            <h2 className="text-xl font-bold text-secondary">Tambah Menu Baru</h2>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-surface-200 transition-colors"
            >
              <X size={20} className="text-text-secondary" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-5 overflow-y-auto">
            
            {/* Image Upload Area */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-slate-700 mb-2">Foto Menu</label>
              <div className="border-2 border-dashed border-gray-300 rounded-2xl h-40 flex flex-col items-center justify-center bg-slate-50 cursor-pointer hover:bg-slate-100 hover:border-orange-400 transition-colors group">
                <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <ImagePlus className="text-orange-400" size={24} />
                </div>
                <span className="text-sm font-medium text-slate-500">Upload foto (Max 2MB)</span>
              </div>
            </div>

            {/* Inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Nama Menu</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Cth: Nasi Goreng Gila"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-slate-800 bg-white focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5">Harga</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-slate-500 font-bold">Rp</span>
                  </div>
                  <input 
                    type="text" 
                    value={price}
                    onChange={handlePriceChange}
                    placeholder="0"
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 text-slate-800 bg-white focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-colors"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="mt-8 flex gap-3">
              <button 
                type="button"
                onClick={onClose}
                className="flex-1 py-3.5 rounded-xl border border-gray-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors"
              >
                Batal
              </button>
              <button 
                type="submit"
                disabled={isLoading || !name || !price}
                className="flex-1 py-3.5 rounded-xl bg-orange-400 text-white font-bold hover:bg-orange-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? <Loader2 size={20} className="animate-spin" /> : 'Simpan Menu'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
