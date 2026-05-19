import { useNavigate } from 'react-router-dom';

interface NotificationMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isSeller?: boolean;
  onNotificationClick?: () => void;
}

const dummyBuyerNotifications = [
  { id: 1, text: 'Pesanan anda telah masuk!', time: '13 Februari 2026 (15.54)' },
  { id: 2, text: 'Pesanan anda telah siap!', time: '13 Februari 2026 (15.54)' },
  { id: 3, text: 'Pesanan anda telah selesai!', time: '13 Februari 2026 (15.54)' },
];

const dummySellerNotifications = [
  { id: 1, text: 'Ada pesanan baru dari Arif Satria!', time: '13 Februari 2026 (08.36)' },
  { id: 2, text: 'Ada pesanan baru dari Budi Santoso!', time: '13 Februari 2026 (09.15)' },
  { id: 3, text: 'Pelanggan telah memberikan penilaian!', time: '13 Februari 2026 (10.00)' },
];

export default function NotificationMenu({ isOpen, onClose, isSeller, onNotificationClick }: NotificationMenuProps) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      
      <div className="fixed top-16 right-4 z-50 w-80 max-h-100 bg-white rounded-2xl shadow-xl border border-border-light overflow-hidden flex flex-col animate-in fade-in slide-in-from-top-2 duration-200">
        <div className="px-4 py-4 border-b border-border-light">
          <h3 className="font-bold text-secondary text-lg">Notifikasi</h3>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
          {(isSeller ? dummySellerNotifications : dummyBuyerNotifications).map((notif) => (
            <div 
              key={notif.id} 
              onClick={() => {
                onClose();
                if (onNotificationClick) {
                  onNotificationClick();
                } else if (!isSeller) {
                  navigate('/orders');
                }
              }}
              className="px-3 py-3 hover:bg-surface-200 rounded-xl transition-colors cursor-pointer border-b border-border-light last:border-0 relative pl-6"
            >
              <div className="absolute left-2 top-4 w-2 h-2 rounded-full bg-primary" />
              <p className="font-bold text-secondary text-sm mb-1">{notif.text}</p>
              <p className="text-xs text-text-muted-light">{notif.time}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
