import { CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface RegisterStoreSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegisterStoreSuccessModal({ isOpen, onClose }: RegisterStoreSuccessModalProps) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div 
          className="bg-white rounded-4xl w-full max-w-[320px] p-8 flex flex-col items-center text-center animate-in fade-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="w-16 h-16 rounded-full bg-[#10B981] flex items-center justify-center mb-6 shadow-sm">
            <CheckCircle2 size={36} className="text-white" strokeWidth={2.5} />
          </div>
          
          <h2 className="text-xl font-bold text-secondary mb-3 leading-tight">
            Pendaftaran telah masuk!
          </h2>
          
          <p className="text-sm text-text-secondary-light mb-8">
            Silahkan menunggu notifikasi terkait pendaftaran toko.
          </p>
          
          <button 
            onClick={() => {
              onClose();
              navigate('/dashboard');
            }}
            className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary-hover transition-colors shadow-sm"
          >
            Kembali ke beranda
          </button>
        </div>
      </div>
    </>
  );
}
