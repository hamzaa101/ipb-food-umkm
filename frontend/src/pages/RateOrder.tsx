import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { getOrderById, updateOrderRating, type Order } from '../utils/dummyOrders';

export default function RateOrder() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (id) {
      const found = getOrderById(id);
      if (found) {
        setOrder(found);
        if (found.rating) {
          setRating(found.rating);
        }
      }
    }
  }, [id]);

  if (!order) return <MainLayout><div className="p-4 text-center">Pesanan tidak ditemukan.</div></MainLayout>;

  const handleKirim = () => {
    if (rating > 0 && id) {
      updateOrderRating(id, rating);
      // Navigate back to history or detail
      navigate('/orders');
    } else {
      alert('Pilih setidaknya 1 bintang');
    }
  };

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
          <h1 className="text-lg font-bold text-secondary">Beri Nilai</h1>
        </header>

        <main className="flex-1 px-4 py-8 flex flex-col items-center max-w-2xl w-full mx-auto">
          
          {/* Avatar and Name */}
          <div className="flex flex-col items-center mb-8">
            <img 
              src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=200&h=200" 
              alt={order.storeName}
              className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md mb-4"
            />
            <h2 className="text-xl font-bold text-secondary mb-1">{order.storeName}</h2>
            <p className="text-sm text-text-muted-light">ID Pesanan: {order.id}</p>
          </div>

          {/* Rating Box */}
          <div className="w-full bg-white rounded-3xl p-6 shadow-sm border border-border-light flex flex-col items-center">
            <h3 className="font-bold text-secondary text-lg mb-6">Bagaimana rasa makanannya?</h3>
            
            <div className="flex gap-2 mb-10">
              {[1, 2, 3, 4, 5].map((star) => (
                <button 
                  key={star}
                  onClick={() => setRating(star)}
                  className="focus:outline-none hover:scale-110 transition-transform"
                >
                  <Star 
                    size={42} 
                    className={star <= rating ? "fill-yellow-400 text-yellow-400" : "fill-border-light text-border-light"} 
                  />
                </button>
              ))}
            </div>

            <button 
              onClick={handleKirim}
              disabled={rating === 0}
              className="w-full bg-yellow-400 text-white font-bold py-3.5 rounded-xl hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Kirim
            </button>
          </div>

        </main>
      </div>
    </MainLayout>
  );
}
