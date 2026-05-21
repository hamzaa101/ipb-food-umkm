import { useState } from 'react';
import { XCircle, Store, Minus, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { useCart } from '../contexts/CartContext';
import OrderConfirmModal from '../components/popups/OrderConfirmModal';

export default function Cart() {
  const navigate = useNavigate();
  const { items, updateQuantity, totalPrice, clearCart } = useCart();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleOrder = () => {
    // Navigate to orders and clear cart after confirmation
    clearCart();
    navigate('/orders');
  };

  // Dummy store name for now, in reality this would be grouped by store or fetched based on items
  const storeName = "Nasi Goreng Pak Salman";

  if (items.length === 0) {
    return (
      <MainLayout>
        <div className="flex flex-col min-h-screen bg-white relative">
          <header className="sticky top-0 z-40 bg-white px-4 py-4 flex items-center justify-center border-b border-border-light">
            <button 
              onClick={() => navigate(-1)}
              className="absolute left-4 p-2 hover:bg-surface-200 rounded-full transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <h1 className="text-lg font-bold text-secondary">Keranjang</h1>
          </header>
          
          <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <XCircle size={64} className="text-text-muted-light mb-4" strokeWidth={1.5} />
            <h2 className="text-lg font-bold text-text-muted-light mb-1">Keranjang kosong.</h2>
            <p className="text-text-muted-light font-medium">Silahkan melakukan pemesanan.</p>
          </main>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex flex-col min-h-screen bg-surface-light relative">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white px-4 py-4 flex items-center justify-center border-b border-border-light shadow-sm">
          <button 
            onClick={() => navigate(-1)}
            className="absolute left-4 p-2 hover:bg-surface-200 rounded-full transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <h1 className="text-lg font-bold text-secondary">Keranjang</h1>
        </header>

        <main className="flex-1 px-4 py-4 md:py-8 pb-32 md:pb-8 flex flex-col md:flex-row gap-6 max-w-5xl mx-auto w-full">
          
          {/* Left Column (Items) */}
          <div className="flex-1 flex flex-col gap-4">
            {/* Cart Items Card */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-border-light">
            <div className="flex items-center gap-2 mb-4">
              <Store size={18} className="text-secondary" />
              <span className="font-bold text-secondary">{storeName}</span>
            </div>
            
            <div className="h-px bg-border-light mb-4" />

            <div className="space-y-6">
              {items.map(item => (
                <div key={item.id} className="flex flex-col">
                  <div className="flex gap-3 items-center mb-3">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      className="w-16 h-16 rounded-xl object-cover border border-border-light shrink-0"
                    />
                    <div className="flex flex-col flex-1">
                      <h4 className="font-bold text-secondary text-sm mb-1">{item.name}</h4>
                      <div className="flex justify-between items-center w-full">
                        <span className="text-sm font-bold text-text-secondary-light">Rp {item.price.toLocaleString('id-ID')}</span>
                        {/* Quantity Control */}
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 rounded-md border-2 border-primary flex items-center justify-center text-primary hover:bg-primary/10 transition-colors"
                          >
                            <Minus size={16} strokeWidth={3} />
                          </button>
                          <span className="font-bold text-secondary text-sm w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 rounded-md border-2 border-primary flex items-center justify-center text-primary hover:bg-primary/10 transition-colors"
                          >
                            <Plus size={16} strokeWidth={3} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-text-secondary-light text-sm">Total</span>
                    <span className="font-bold text-primary">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
                  </div>
                  <div className="h-px bg-border-light mt-4" />
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-4">
              <span className="font-bold text-secondary">Total Pembayaran</span>
              <span className="font-bold text-primary">Rp {totalPrice.toLocaleString('id-ID')}</span>
            </div>
          </div>

            {/* Rincian Pengambilan */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-border-light">
              <h3 className="font-bold text-secondary mb-3">Rincian Pengambilan</h3>
              <div className="border border-border-light rounded-xl p-3 bg-white">
                <ul className="list-disc pl-4 text-xs font-medium text-secondary space-y-1">
                  <li>Pesanan siap dalam ~15-20 menit</li>
                  <li>Harap <span className="font-bold">segera</span> mengambil pesanan dan melakukan pembayaran setelah pesanan sudah siap</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column (Desktop Checkout) */}
          <div className="hidden md:block w-80 lg:w-96 shrink-0">
            <div className="sticky top-24 bg-white rounded-2xl p-6 shadow-sm border border-border-light">
              <h3 className="font-bold text-secondary text-lg mb-4">Ringkasan Belanja</h3>
              <div className="flex justify-between items-center mb-6">
                <span className="text-text-secondary-light">Total Pembayaran</span>
                <span className="font-bold text-primary text-xl">Rp {totalPrice.toLocaleString('id-ID')}</span>
              </div>
              <button 
                onClick={() => setIsConfirmOpen(true)}
                className="w-full py-3.5 rounded-xl font-bold bg-primary text-white hover:bg-primary-hover transition-colors"
              >
                Lakukan Pemesanan
              </button>
            </div>
          </div>

        </main>

        {/* Sticky Footer (Mobile Only) */}
        <div className="md:hidden fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-border-light z-40">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4 px-1">
              <span className="font-bold text-secondary text-sm">Bayar di tempat</span>
              <span className="font-bold text-primary">Rp {totalPrice.toLocaleString('id-ID')}</span>
            </div>
            <button 
              onClick={() => setIsConfirmOpen(true)}
              className="w-full py-3.5 rounded-xl font-bold bg-primary text-white hover:bg-primary-hover transition-colors"
            >
              Lakukan Pemesanan
            </button>
          </div>
        </div>

        <OrderConfirmModal 
          isOpen={isConfirmOpen} 
          onClose={() => setIsConfirmOpen(false)} 
          onConfirm={handleOrder}
        />
      </div>
    </MainLayout>
  );
}
