import { useState, useEffect } from 'react';
import { Store, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { getOrders, type Order } from '../utils/dummyOrders';

export default function OrderHistory() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'berlangsung' | 'selesai'>('berlangsung');
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Refresh orders on mount or tab change (if we want to simulate fresh data)
    setOrders(getOrders());
  }, [activeTab]);

  const ongoingOrders = orders.filter(o => o.status === 'antrean' || o.status === 'diproses');
  const completedOrders = orders.filter(o => o.status === 'selesai');

  const displayOrders = activeTab === 'berlangsung' ? ongoingOrders : completedOrders;

  return (
    <MainLayout>
      <div className="flex flex-col min-h-screen bg-surface-light">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white px-4 py-4 flex items-center justify-center border-b border-border-light">
          <button 
            onClick={() => navigate('/dashboard')}
            className="absolute left-4 p-2 hover:bg-surface-200 rounded-full transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <h1 className="text-lg font-bold text-secondary">Riwayat Pesanan</h1>
        </header>

        {/* Tabs */}
        <div className="bg-white px-4 py-3">
          <div className="flex bg-surface-200 rounded-xl p-1">
            <button 
              onClick={() => setActiveTab('berlangsung')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${activeTab === 'berlangsung' ? 'bg-primary text-white shadow-sm' : 'text-text-secondary-light hover:bg-white/50'}`}
            >
              Sedang berlangsung
            </button>
            <button 
              onClick={() => setActiveTab('selesai')}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-colors ${activeTab === 'selesai' ? 'bg-primary text-white shadow-sm' : 'text-text-secondary-light hover:bg-white/50'}`}
            >
              Selesai
            </button>
          </div>
        </div>

        {/* Order List */}
        <main className="flex-1 px-4 py-4 grid grid-cols-1 lg:grid-cols-2 gap-4 auto-rows-max items-start">
          {displayOrders.length === 0 ? (
            <div className="text-center text-text-muted-light mt-10">
              Tidak ada pesanan.
            </div>
          ) : (
            displayOrders.map(order => (
              <div key={order.id} className="bg-white rounded-2xl p-4 shadow-sm border border-border-light">
                {/* Store & Status */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Store size={18} className="text-secondary" />
                    <span className="font-bold text-secondary">{order.storeName}</span>
                  </div>
                  <div className={`px-2.5 py-0.5 rounded-md text-xs font-bold ${
                    order.status === 'antrean' || order.status === 'diproses' ? 'bg-orange-100 text-orange-500' : 
                    'bg-green-100 text-green-500'
                  }`}>
                    {order.status === 'antrean' ? 'masuk antrean' : order.status}
                  </div>
                </div>

                {/* Items preview (first image) */}
                <div className="flex gap-3 mb-4">
                  {order.items.length > 0 && (
                    <img 
                      src={order.items[0].imageUrl} 
                      alt={order.items[0].name} 
                      className="w-16 h-16 rounded-xl object-cover shrink-0 border border-border-light"
                    />
                  )}
                  <div className="flex flex-col justify-center flex-1">
                    {order.items.map(item => (
                      <div key={item.id} className="flex justify-between text-sm mb-0.5">
                        <span className="font-bold text-text-secondary-light">{item.quantity} x {item.name}</span>
                        <span className="font-bold text-text-secondary-light">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
                      </div>
                    ))}
                    {order.status === 'selesai' && (
                      <div className="flex items-center gap-1 mt-1 text-xs text-text-muted-light">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        {order.date} ({order.time})
                      </div>
                    )}
                  </div>
                </div>

                <div className="h-px bg-border-light mb-3" />

                {/* Total */}
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-secondary">Total Pembayaran</span>
                  <span className="font-bold text-primary">Rp {order.totalPayment.toLocaleString('id-ID')}</span>
                </div>

                {/* Rating Display if rated */}
                {order.status === 'selesai' && order.rating && (
                  <div className="flex justify-between items-center border border-border-light rounded-xl p-3 mb-4">
                    <span className="font-bold text-secondary text-sm">Kamu beri nilai</span>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          size={18} 
                          className={star <= order.rating! ? "fill-yellow-400 text-yellow-400" : "fill-border-light text-border-light"} 
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <button 
                    onClick={() => navigate(`/orders/${order.id}`)}
                    className="flex-1 py-2.5 rounded-xl font-bold text-sm border border-border-light text-primary hover:bg-surface-100 transition-colors"
                  >
                    Detail Pesanan
                  </button>
                  {order.status === 'antrean' || order.status === 'diproses' ? (
                    <button className="flex-1 py-2.5 rounded-xl font-bold text-sm bg-primary text-white hover:bg-primary-hover transition-colors">
                      Hubungi Penjual
                    </button>
                  ) : order.rating ? (
                    <button className="flex-1 py-2.5 rounded-xl font-bold text-sm bg-green-500 text-white hover:bg-green-600 transition-colors">
                      Beli Lagi
                    </button>
                  ) : (
                    <button 
                      onClick={() => navigate(`/orders/${order.id}/rate`)}
                      className="flex-1 py-2.5 rounded-xl font-bold text-sm bg-yellow-400 text-white hover:bg-yellow-500 transition-colors"
                    >
                      Beri Nilai
                    </button>
                  )}
                </div>

              </div>
            ))
          )}
        </main>
      </div>
    </MainLayout>
  );
}
