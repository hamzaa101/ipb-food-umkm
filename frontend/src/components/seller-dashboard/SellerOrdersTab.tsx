import { useState, useEffect } from 'react';
import { XCircle } from 'lucide-react';
import SellerOrderItem from './SellerOrderItem';
import { getOrders, type Order, updateOrderStatus } from '../../utils/dummyOrders';

type SubTab = 'antrean' | 'diproses' | 'selesai';

export default function SellerOrdersTab() {
  const [isStoreOpen, setIsStoreOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<SubTab>('antrean');
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Load orders initially
    setOrders(getOrders());
  }, []);

  const handleAccept = (id: string) => {
    updateOrderStatus(id, 'diproses');
    setOrders(getOrders());
  };

  const handleReject = (id: string) => {
    // For now, let's just remove it or mark it differently.
    // In a real app, we'd have a 'ditolak' status. We'll just ignore for now or keep it in antrean.
    console.log('Rejected order:', id);
  };

  const handleComplete = (id: string) => {
    updateOrderStatus(id, 'selesai');
    setOrders(getOrders());
  };

  const filteredOrders = orders.filter(o => o.status === activeTab);
  
  const antreanCount = orders.filter(o => o.status === 'antrean').length;
  const diprosesCount = orders.filter(o => o.status === 'diproses').length;
  const selesaiCount = orders.filter(o => o.status === 'selesai').length;

  const getActiveTabColor = (tab: SubTab) => {
    switch (tab) {
      case 'antrean': return 'bg-orange-400 text-white border-orange-400';
      case 'diproses': return 'bg-yellow-400 text-white border-yellow-400';
      case 'selesai': return 'bg-green-500 text-white border-green-500';
      default: return 'bg-white text-slate-500 border-gray-200';
    }
  };

  return (
    <div className="flex-1 flex flex-col p-4 bg-slate-50">
      {/* Top Controls Container */}
      <div className="bg-white rounded-2xl shadow-sm p-4 mb-4 border border-gray-100">
        
        {/* Store Toggle */}
        <div className={`flex items-center justify-between p-2 mb-4 rounded-full border-2 transition-colors ${
          isStoreOpen ? 'border-green-500' : 'border-red-500'
        }`}>
          <span className={`font-bold pl-4 ${isStoreOpen ? 'text-green-500' : 'text-red-500'}`}>
            Menerima pesanan:
          </span>
          <button 
            onClick={() => setIsStoreOpen(!isStoreOpen)}
            className={`relative w-24 h-9 rounded-full transition-colors flex items-center px-1 shadow-inner ${
              isStoreOpen ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            <span className={`absolute font-bold text-white text-sm transition-all ${
              isStoreOpen ? 'right-9' : 'left-9'
            }`}>
              {isStoreOpen ? 'Buka' : 'Tutup'}
            </span>
            <div className={`w-7 h-7 bg-white rounded-full shadow-md transform transition-transform ${
              isStoreOpen ? 'translate-x-15' : 'translate-x-0'
            }`} />
          </button>
        </div>

        {/* Sub Tabs */}
        <div className="flex border border-gray-200 rounded-xl overflow-hidden divide-x divide-gray-200">
          <button 
            onClick={() => setActiveTab('antrean')}
            className={`flex-1 py-2 flex flex-col items-center justify-center transition-colors ${
              activeTab === 'antrean' ? getActiveTabColor('antrean') : 'bg-white text-slate-500 hover:bg-slate-50'
            }`}
          >
            <span className="font-bold text-xl leading-none">{antreanCount}</span>
            <span className="text-[10px] font-semibold mt-1">Antrean masuk</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('diproses')}
            className={`flex-1 py-2 flex flex-col items-center justify-center transition-colors ${
              activeTab === 'diproses' ? getActiveTabColor('diproses') : 'bg-white text-slate-500 hover:bg-slate-50'
            }`}
          >
            <span className="font-bold text-xl leading-none">{diprosesCount}</span>
            <span className="text-[10px] font-semibold mt-1">Dalam Proses</span>
          </button>

          <button 
            onClick={() => setActiveTab('selesai')}
            className={`flex-1 py-2 flex flex-col items-center justify-center transition-colors ${
              activeTab === 'selesai' ? getActiveTabColor('selesai') : 'bg-white text-slate-500 hover:bg-slate-50'
            }`}
          >
            <span className="font-bold text-xl leading-none">{selesaiCount}</span>
            <span className="text-[10px] font-semibold mt-1">Selesai</span>
          </button>
        </div>
      </div>

      {/* Orders List or Empty State */}
      <div className="flex-1 flex flex-col">
        {!isStoreOpen ? (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 mt-10">
            <XCircle size={64} className="mb-4 text-slate-300" strokeWidth={1.5} />
            <h3 className="text-xl font-bold">Tidak ada pesanan masuk.</h3>
          </div>
        ) : (
          <div className="flex flex-col pb-8">
            {filteredOrders.length > 0 ? (
              filteredOrders.map(order => (
                <SellerOrderItem 
                  key={order.id} 
                  order={order} 
                  onAccept={handleAccept}
                  onReject={handleReject}
                  onComplete={handleComplete}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                <p>Belum ada pesanan di kategori ini.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
