import { useState } from 'react';
import { Search, MapPin, Bell } from 'lucide-react';

export default function Dashboard() {
  // Data simulasi (dummy) sebelum integrasi ke backend
  const [products] = useState([
    { id: '1', name: 'Nasi Goreng Spesial', price: 15000, sellerName: 'Kantin Stevia' },
    { id: '2', name: 'Ayam Geprek', price: 12000, sellerName: 'Kantin Nona' },
    { id: '3', name: 'Es Teh Manis', price: 4000, sellerName: 'Kantin Stevia' },
  ]);

  return (
    <div className="pb-20 max-w-md mx-auto bg-gray-50 min-h-screen">
      {/* Header Info */}
      <div className="bg-white p-4 shadow-sm sticky top-0 z-10 flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-500">Lokasi Anda</p>
          <div className="flex items-center text-blue-600 font-medium text-sm">
            <MapPin className="w-4 h-4 mr-1" />
            <span>FEMA, IPB Dramaga</span>
          </div>
        </div>
        <button className="p-2 relative bg-gray-100 rounded-full text-gray-600">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Cari makanan atau kantin..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
          />
        </div>
      </div>

      {/* Produk List */}
      <div className="p-4 pt-0">
        <h2 className="font-bold text-gray-800 mb-3 text-lg">Rekomendasi Menu</h2>
        <div className="grid grid-cols-2 gap-4">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
              <div className="h-24 bg-gray-200 w-full animate-pulse"></div>
              <div className="p-3">
                <h3 className="font-semibold text-gray-800 text-sm truncate">{product.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{product.sellerName}</p>
                <div className="mt-2 text-blue-600 font-bold text-sm">
                  Rp{product.price.toLocaleString('id-ID')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}