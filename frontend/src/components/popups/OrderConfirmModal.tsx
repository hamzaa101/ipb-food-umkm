import { ShoppingCart } from 'lucide-react';

interface OrderConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function OrderConfirmModal({ isOpen, onClose, onConfirm }: OrderConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div 
          className="bg-white rounded-3xl w-full max-w-[320px] p-6 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <ShoppingCart size={64} className="text-primary" strokeWidth={2} />
          </div>
          
          <h2 className="text-xl font-bold text-secondary mb-2">Lakukan Pemesanan?</h2>
          
          <p className="text-sm text-text-secondary-light mb-6 px-2">
            Pastikan pesanan sudah benar. Pesanan tidak dapat dibatalkan.
          </p>
          
          <div className="flex gap-3 w-full">
            <button 
              onClick={onClose}
              className="flex-1 bg-surface-200 text-secondary font-bold py-3 rounded-xl hover:bg-border-light transition-colors"
            >
              Kembali
            </button>
            <button 
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="flex-1 bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-hover transition-colors"
            >
              Pesan
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
