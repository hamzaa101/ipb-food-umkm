// import { useState, useEffect } from 'react';
import { Store, Star, CheckCircle2, Clock, Check } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { getOrderById } from '../utils/dummyOrders';
// import { type Order } from '../utils/dummyOrders';

export default function OrderDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  // const [order, setOrder] = useState<Order | null>(null);

  const order = id ? getOrderById(id) : null;
//   useEffect(() => {
//     if (id) {
//       const found = getOrderById(id);
//       if (found) setOrder(found);
//     }
//   }, [id]);

  if (!order) return <MainLayout><div className="p-4 text-center">Pesanan tidak ditemukan.</div></MainLayout>;

  // Timeline logic
  const isSelesai = order.status === 'selesai';
  const isDiproses = order.status === 'diproses' || isSelesai;
  // Diterima is always true if order exists

  return (
    <MainLayout>
      <div className="flex flex-col min-h-screen bg-surface-light relative">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white px-4 py-4 flex items-center justify-center border-b border-border-light shadow-sm">
          <button 
            onClick={() => navigate('/orders')}
            className="absolute left-4 p-2 hover:bg-surface-200 rounded-full transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <h1 className="text-lg font-bold text-secondary">Detail Pesanan</h1>
        </header>

        <main className="flex-1 px-4 py-4 md:py-8 pb-32 md:pb-8 flex flex-col md:flex-row gap-6 max-w-5xl mx-auto w-full">
          
          <div className="flex-1 flex flex-col gap-4">
            {/* Status Card */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-border-light">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-xs font-semibold text-text-muted-light mb-0.5">ID Pesanan</p>
                <p className="font-bold text-secondary">{order.id}</p>
              </div>
              <button className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold hover:bg-primary/20 transition-colors">
                salin
              </button>
            </div>

            {/* Timeline */}
            <div className="relative pl-3 mt-6 mb-2">
              <div className="absolute left-6 top-2 bottom-6 w-0.5 bg-border-light" />
              
              <div className="relative z-10 flex gap-4 mb-6">
                <div className="w-6 h-6 rounded-full flex items-center justify-center border-2 bg-white border-primary text-primary">
                  <Check size={14} strokeWidth={3} />
                </div>
                <div>
                  <p className="font-bold text-secondary text-sm">Pesanan Diterima</p>
                  <p className="text-xs text-text-muted-light">{order.time}</p>
                </div>
              </div>
              
              <div className="relative z-10 flex gap-4 mb-6">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 bg-white ${isDiproses ? 'border-primary text-primary' : 'border-border-light text-border-light'}`}>
                  {isDiproses ? <Check size={14} strokeWidth={3} /> : <Clock size={14} />}
                </div>
                <div>
                  <p className={`font-bold text-sm ${isDiproses ? 'text-secondary' : 'text-text-muted-light'}`}>Pesanan Diproses</p>
                  {isDiproses && <p className="text-xs text-text-muted-light">{order.time}</p>}
                </div>
              </div>
              
              <div className="relative z-10 flex gap-4">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 bg-white ${isSelesai ? 'border-green-500 text-green-500' : 'border-border-light text-border-light'}`}>
                  {isSelesai ? <Check size={14} strokeWidth={3} /> : <CheckCircle2 size={14} />}
                </div>
                <div>
                  <p className={`font-bold text-sm ${isSelesai ? 'text-green-500' : 'text-text-muted-light'}`}>Pesanan Selesai</p>
                  {isSelesai && <p className="text-xs text-text-muted-light">08.55 WIB</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Rincian Pengambilan */}
          {!isSelesai && (
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-border-light">
              <h3 className="font-bold text-secondary mb-3">Rincian Pengambilan</h3>
              <div className="border border-border-light rounded-xl p-3 bg-surface-100">
                <ul className="list-disc pl-4 text-xs font-medium text-secondary space-y-1">
                  <li>Pesanan siap dalam ~15-20 menit</li>
                  <li>Harap <span className="font-bold">segera</span> mengambil pesanan dan melakukan pembayaran setelah pesanan sudah siap</li>
                </ul>
              </div>
            </div>
          )}

          {/* Item Details */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-border-light">
            <div className="flex items-center gap-2 mb-4">
              <Store size={18} className="text-secondary" />
              <span className="font-bold text-secondary">{order.storeName}</span>
            </div>
            
            <div className="h-px bg-border-light mb-4" />

            <div className="space-y-4 mb-4">
              {order.items.map(item => (
                <div key={item.id} className="flex gap-3 items-center">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="w-16 h-16 rounded-xl object-cover border border-border-light shrink-0"
                  />
                  <div className="flex flex-col flex-1">
                    <h4 className="font-bold text-secondary text-sm">{item.name}</h4>
                    <p className="text-sm font-bold text-text-secondary-light">{item.quantity} x Rp {item.price.toLocaleString('id-ID')}</p>
                  </div>
                  <div className="font-bold text-primary">
                    Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                  </div>
                </div>
              ))}
            </div>

            <div className="h-px bg-border-light mb-4" />

            <div className="flex justify-between items-center">
              <span className="font-bold text-secondary">Total Pembayaran</span>
              <span className="font-bold text-primary">Rp {order.totalPayment.toLocaleString('id-ID')}</span>
            </div>
          </div>

            {/* Rating Section if rated */}
            {isSelesai && order.rating && (
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-border-light">
                <h3 className="font-bold text-secondary mb-3">Kamu Beri Nilai</h3>
                <div className="border border-border-light rounded-xl p-4 flex justify-center">
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        size={32} 
                        className={star <= order.rating! ? "fill-yellow-400 text-yellow-400" : "fill-border-light text-border-light"} 
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column (Desktop Action Panel) */}
          <div className="hidden md:block w-80 lg:w-96 shrink-0">
            <div className="sticky top-24 bg-white rounded-2xl p-6 shadow-sm border border-border-light">
              <h3 className="font-bold text-secondary text-lg mb-4">Tindakan</h3>
              {!isSelesai ? (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-text-secondary-light">Bayar di tempat</span>
                    <span className="font-bold text-primary text-xl">Rp {order.totalPayment.toLocaleString('id-ID')}</span>
                  </div>
                  <button className="w-full py-3.5 rounded-xl font-bold bg-primary text-white hover:bg-primary-hover transition-colors">
                    Hubungi Penjual
                  </button>
                </div>
              ) : (
                <div>
                  {order.rating ? (
                    <button className="w-full py-3.5 rounded-xl font-bold bg-green-500 text-white hover:bg-green-600 transition-colors">
                      Beli Lagi
                    </button>
                  ) : (
                    <button 
                      onClick={() => navigate(`/orders/${order.id}/rate`)}
                      className="w-full py-3.5 rounded-xl font-bold bg-yellow-400 text-white hover:bg-yellow-500 transition-colors"
                    >
                      Beri Nilai
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

        </main>

        {/* Sticky Footer (Mobile Only) */}
        <div className="md:hidden fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-border-light z-50">
          {!isSelesai ? (
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-secondary">Bayar di tempat</span>
                <span className="font-bold text-primary">Rp {order.totalPayment.toLocaleString('id-ID')}</span>
              </div>
              <button className="w-full py-3.5 rounded-xl font-bold bg-primary text-white hover:bg-primary-hover transition-colors">
                Hubungi Penjual
              </button>
            </div>
          ) : (
            <div className="p-4">
               {order.rating ? (
                 <button className="w-full py-3.5 rounded-xl font-bold bg-green-500 text-white hover:bg-green-600 transition-colors">
                   Beli Lagi
                 </button>
               ) : (
                 <button 
                  onClick={() => navigate(`/orders/${order.id}/rate`)}
                  className="w-full py-3.5 rounded-xl font-bold bg-yellow-400 text-white hover:bg-yellow-500 transition-colors">
                   Beri Nilai
                 </button>
               )}
            </div>
          )}
        </div>

      </div>
    </MainLayout>
  );
}
