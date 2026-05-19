interface LogoutConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function LogoutConfirmModal({ isOpen, onClose, onConfirm }: LogoutConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-bg-dark/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl p-6 w-full max-w-xs shadow-xl transform scale-100 animate-in zoom-in-95 duration-200">
        <h3 className="text-xl font-bold text-secondary mb-2 text-center">Keluar dari akun?</h3>
        <p className="text-text-secondary-light text-center mb-6 text-sm">
          Apakah Anda yakin ingin keluar dari IPB Food Hub?
        </p>
        
        <div className="flex flex-col gap-3">
          <button 
            onClick={onConfirm}
            className="w-full py-3 bg-danger hover:bg-danger/90 text-white font-semibold rounded-xl transition-colors"
          >
            Ya, Keluar
          </button>
          <button 
            onClick={onClose}
            className="w-full py-3 bg-surface-200 hover:bg-border-light text-secondary font-semibold rounded-xl transition-colors"
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
}
