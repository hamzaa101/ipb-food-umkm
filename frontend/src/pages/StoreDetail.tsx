import { useState } from 'react';
import { Star, MapPin, ChevronDown, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { useCart } from '../contexts/CartContext';

// Dummy products data
const STORE_PRODUCTS = [
  {
    id: 'p1',
    category: 'Rekomendasi Utama',
    name: 'Nasi Goreng Biasa',
    price: 12000,
    sold: 16,
    imageUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 'p2',
    category: 'Rekomendasi Utama',
    name: 'Es teh Manis',
    price: 5000,
    sold: 13,
    imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 'p3',
    category: 'Nasi Goreng',
    name: 'Nasi Goreng Biasa',
    price: 12000,
    sold: 16,
    imageUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 'p4',
    category: 'Nasi Goreng',
    name: 'Nasi Goreng Spesial',
    price: 20000,
    sold: 13,
    imageUrl: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 'p5',
    category: 'Minuman',
    name: 'Es Teh Manis',
    price: 5000,
    sold: 17,
    imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 'p6',
    category: 'Minuman',
    name: 'Es Teh Tawar',
    price: 4000,
    sold: 13,
    imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&q=80&w=200&h=200'
  }
];

export default function StoreDetail() {
  const navigate = useNavigate();
  const { items, addItem, updateQuantity, totalItems } = useCart();
  
  // For testing purposes, toggle this to see "Tutup" state
  const [isOpen, setIsOpen] = useState(true);
  
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories = ['Semua', ...Array.from(new Set(STORE_PRODUCTS.map(p => p.category)))];

  const getProductQuantity = (id: string) => {
    return items.find(item => item.id === id)?.quantity || 0;
  };

  const groupedProducts = STORE_PRODUCTS.reduce((acc, product) => {
    if (activeCategory !== 'Semua' && product.category !== activeCategory) return acc;
    
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  }, {} as Record<string, typeof STORE_PRODUCTS>);

  return (
    <MainLayout>
      <div className="flex flex-col min-h-screen bg-surface-light relative pb-10">
        
        {/* Banner with Back Button & Cart Icon */}
        <div className="relative h-48 sm:h-56">
          <img 
            src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=600&h=400" 
            alt="Store Banner" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/40 to-transparent" />
          
          <button 
            onClick={() => navigate('/dashboard')}
            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>

          <button 
            onClick={() => navigate('/cart')}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/50 transition-colors"
          >
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <div className="absolute top-0 right-0 w-3 h-3 bg-yellow-400 border-2 border-white rounded-full"></div>
            )}
          </button>

          {/* Toggle Open/Close Status for Testing */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="absolute bottom-4 right-4 text-xs px-2 py-1 bg-black/50 text-white rounded-lg backdrop-blur-sm"
          >
            Test: {isOpen ? 'Tutup' : 'Buka'} Toko
          </button>
        </div>

        {/* Store Info */}
        <div className="bg-white px-4 py-4 border-b border-border-light relative z-10 -mt-4 rounded-t-2xl shadow-sm">
          <h1 className="text-xl font-bold text-secondary mb-2">Nasi Goreng Pak Salman</h1>
          <div className="flex items-center gap-3 text-sm">
            <span className={`px-3 py-0.5 rounded-full font-bold text-xs ${isOpen ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'}`}>
              {isOpen ? 'buka' : 'tutup'}
            </span>
            <div className="flex items-center gap-1">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              <span className="font-bold text-secondary">4.5</span>
              <span className="text-text-muted-light">(56 ratings)</span>
            </div>
            <div className="flex items-center gap-1 text-text-muted-light">
              <MapPin size={14} />
              <span>200m</span>
            </div>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mt-4 relative">
            <button className="px-5 py-1.5 rounded-full border border-border-light text-secondary font-bold text-sm hover:bg-surface-100 transition-colors">
              terlaris
            </button>
            <button className="px-5 py-1.5 rounded-full border border-border-light text-secondary font-bold text-sm hover:bg-surface-100 transition-colors">
              promo
            </button>
            
            <div className="relative flex-1">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`w-full px-4 py-1.5 rounded-full border border-border-light font-bold text-sm flex items-center justify-between transition-colors ${activeCategory !== 'Semua' || isDropdownOpen ? 'bg-primary text-white border-primary' : 'text-secondary hover:bg-surface-100'}`}
              >
                <span>{activeCategory === 'Semua' ? 'kategori' : activeCategory}</span>
                <ChevronDown size={16} className={isDropdownOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute top-full mt-2 right-0 w-48 bg-white border border-border-light rounded-xl shadow-lg z-50 py-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${activeCategory === cat ? 'bg-surface-200 font-bold text-secondary' : 'text-secondary hover:bg-surface-100'}`}
                    >
                      {cat}
                    </button>
                  ))}
                  <button className="w-full text-left px-4 py-2.5 text-sm text-secondary hover:bg-surface-100 transition-colors">
                    Lainnya
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Product List */}
        <div className={`px-4 py-4 ${!isOpen ? 'opacity-50 grayscale-20' : ''}`}>
          {Object.entries(groupedProducts).map(([category, products]) => (
            <div key={category} className="mb-8">
              <h2 className="font-bold text-secondary text-lg md:text-xl mb-4 border-b border-border-light pb-2">{category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => {
                  const qty = getProductQuantity(product.id);
                  
                  return (
                    <div key={product.id} className="bg-white rounded-2xl p-3 shadow-sm border border-border-light flex items-center gap-3">
                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="w-20 h-20 rounded-xl object-cover border border-border-light shrink-0"
                      />
                      <div className="flex flex-col flex-1 py-1">
                        <h3 className="font-bold text-secondary text-sm mb-1">{product.name}</h3>
                        <p className="font-bold text-primary text-sm mb-1">Rp {product.price.toLocaleString('id-ID')}</p>
                        <p className="text-xs text-text-muted-light">{product.sold} terjual</p>
                      </div>
                      
                      {/* Controls */}
                      <div className="flex items-center self-end mb-1 mr-1">
                        {qty > 0 && isOpen ? (
                          <div className="flex items-center gap-2">
                            <button 
                              onClick={() => updateQuantity(product.id, qty - 1)}
                              className="w-7 h-7 rounded-md border-2 border-primary flex items-center justify-center text-primary hover:bg-primary/10 transition-colors"
                            >
                              <Minus size={16} strokeWidth={3} />
                            </button>
                            <span className="font-bold text-secondary text-sm w-4 text-center">{qty}</span>
                            <button 
                              onClick={() => updateQuantity(product.id, qty + 1)}
                              className="w-7 h-7 rounded-md border-2 border-primary flex items-center justify-center text-primary hover:bg-primary/10 transition-colors"
                            >
                              <Plus size={16} strokeWidth={3} />
                            </button>
                          </div>
                        ) : (
                          <button 
                            disabled={!isOpen}
                            onClick={() => addItem({ ...product, quantity: 1 })}
                            className={`w-7 h-7 rounded-md border-2 flex items-center justify-center transition-colors ${!isOpen ? 'border-border-light text-border-light' : 'border-primary text-primary hover:bg-primary/10'}`}
                          >
                            <Plus size={16} strokeWidth={3} />
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

      </div>
    </MainLayout>
  );
}
