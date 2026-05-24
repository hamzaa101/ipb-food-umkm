import type { Order } from '../../utils/dummyOrders';
import { Star } from 'lucide-react';

interface SellerOrderItemProps {
  order: Order;
  onAccept?: (id: string) => void;
  onReject?: (id: string) => void;
  onComplete?: (id: string) => void;
}

export default function SellerOrderItem({ order, onAccept, onReject, onComplete }: SellerOrderItemProps) {
  const getBorderColor = () => {
    switch (order.status) {
      case 'antrean': return 'border-orange-400';
      case 'diproses': return 'border-yellow-400';
      case 'selesai': return 'border-green-500';
      default: return 'border-gray-300';
    }
  };

  const getPillColor = () => {
    switch (order.status) {
      case 'antrean': return 'bg-orange-100 text-orange-500';
      case 'diproses': return 'bg-orange-100 text-orange-500';
      case 'selesai': return 'bg-green-200 text-green-700';
      default: return 'bg-gray-100 text-gray-500';
    }
  };

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount).replace('Rp', 'Rp ');
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border-l-8 ${getBorderColor()} p-4 mb-4 flex flex-col`}>
      {/* Header */}
      <div className="flex justify-between items-start border-b border-gray-100 pb-3 mb-3">
        <div>
          <div className={`text-xs font-bold ${order.status === 'selesai' ? 'text-green-500' : 'text-orange-400'}`}>
            {order.id}
          </div>
          <h3 className="font-bold text-slate-800 text-lg leading-tight mt-0.5">{order.customerName || 'Pelanggan'}</h3>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-bold ${getPillColor()}`}>
          {order.time.replace(' WIB', '')}
        </div>
      </div>

      {/* Items */}
      <div className="flex flex-col gap-3 mb-4">
        {order.items.map((item) => (
          <div key={item.id} className="flex gap-3">
            <img 
              src={item.imageUrl} 
              alt={item.name} 
              className="w-16 h-16 rounded-xl object-cover"
            />
            <div className="flex-1 flex flex-col justify-center">
              <h4 className="font-bold text-slate-800 leading-tight">{item.name}</h4>
              <div className="text-slate-500 text-sm mt-1 font-medium">
                {item.quantity} x {formatRupiah(item.price)}
              </div>
            </div>
            <div className="flex items-end">
              <span className="font-bold text-orange-400">
                {formatRupiah(item.price * item.quantity)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="flex justify-between items-center mb-4 border-t border-gray-100 pt-3">
        <span className="font-bold text-slate-500">Total Tagihan</span>
        <span className="font-bold text-orange-400 text-lg">{formatRupiah(order.totalPayment)}</span>
      </div>

      {/* Actions */}
      <div className="mt-auto">
        {order.status === 'antrean' && (
          <div className="flex gap-3">
            <button 
              onClick={() => onReject?.(order.id)}
              className="flex-1 py-2.5 rounded-xl border border-orange-400 text-orange-400 font-bold hover:bg-orange-50 transition-colors"
            >
              Tolak
            </button>
            <button 
              onClick={() => onAccept?.(order.id)}
              className="flex-1 py-2.5 rounded-xl bg-orange-400 text-white font-bold hover:bg-orange-500 transition-colors"
            >
              Terima
            </button>
          </div>
        )}

        {order.status === 'diproses' && (
          <button 
            onClick={() => onComplete?.(order.id)}
            className="w-full py-2.5 rounded-xl bg-yellow-400 text-white font-bold hover:bg-yellow-500 transition-colors shadow-sm"
          >
            Selesai disiapkan
          </button>
        )}

        {order.status === 'selesai' && (
          <div className="w-full py-2.5 rounded-xl border border-gray-200 flex items-center justify-center gap-2">
            {order.rating ? (
              <>
                <span className="text-slate-600 font-medium">Nilai dari pelanggan</span>
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className={i < order.rating! ? "fill-yellow-400" : "fill-gray-200 text-gray-200"} />
                  ))}
                </div>
              </>
            ) : (
              <span className="text-slate-400 font-medium">Belum dinilai</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
