import React from 'react';
import { useNavigate } from 'react-router-dom';

interface RoleSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RoleSelectionModal: React.FC<RoleSelectionModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="role-modal-overlay">
      <div className="role-modal-box">
        <h2 className="role-modal-title">Pilih Mode</h2>
        
        <button 
          className="role-btn buyer-btn" 
          onClick={() => { onClose(); navigate('/dashboard'); }}
        >
          {/* Ikon Tas Pembeli */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          Pembeli
        </button>

        <button 
          className="role-btn seller-btn" 
          onClick={() => { onClose(); navigate('/merchant'); }}
        >
          {/* Ikon Toko Penjual sesuai spesifikasi */}
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36" fill="none">
            <path d="M12 12L12 10.5C12 7.18629 14.6863 4.5 18 4.5C21.3137 4.5 24 7.18629 24 10.5L24 12" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            <path d="M22.5 21V18" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            <path d="M13.5 21V18" stroke="white" strokeWidth="3" strokeLinecap="round"/>
            <path d="M6 18C6 15.1716 6 13.7574 6.87868 12.8787C7.75736 12 9.17157 12 12 12H24C26.8284 12 28.2426 12 29.1213 12.8787C30 13.7574 30 15.1716 30 18V19.5C30 25.1569 30 27.9853 28.2426 29.7426C26.4853 31.5 23.6569 31.5 18 31.5C12.3431 31.5 9.51472 31.5 7.75736 29.7426C6 27.9853 6 25.1569 6 19.5V18Z" stroke="white" strokeWidth="3"/>
          </svg>
          Penjual
        </button>
      </div>
      <div className="role-modal-brand">IPB Food Hub</div>
    </div>
  );
};

export default RoleSelectionModal;