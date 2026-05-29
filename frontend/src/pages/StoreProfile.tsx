import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/StoreProfile.css';

interface Schedule {
  day: string;
  start: string;
  end: string;
  isOpen: boolean;
}

interface StoreData {
  name: string;
  wa: string;
  location: string;
  image: string;
}

const mockSchedule: Schedule[] = [
  { day: 'Senin', start: '09.00', end: '15.00', isOpen: true },
  { day: 'Selasa', start: '09.00', end: '15.00', isOpen: true },
  { day: 'Rabu', start: '09.00', end: '15.00', isOpen: true },
  { day: 'Kamis', start: '09.00', end: '15.00', isOpen: true },
  { day: 'Jumat', start: '10.00', end: '15.00', isOpen: true },
  { day: 'Sabtu', start: '09.00', end: '12.00', isOpen: true },
  { day: 'Minggu', start: '00.00', end: '00.00', isOpen: false },
];

const StoreProfile: React.FC = () => {
  const navigate = useNavigate();

  const [storeData] = useState<StoreData>({
    name: 'Nasi Goreng Pak Salman',
    wa: '+62801234567890',
    location: 'Kantin Sapta FATETA',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=200&h=200&fit=crop'
  });
  
  const [schedule] = useState<Schedule[]>(mockSchedule);
  const [currentStatus, setCurrentStatus] = useState<'Buka' | 'Tutup'>('Tutup');

  // Logika Real-time Jadwal
  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const dayIndex = now.getDay() === 0 ? 6 : now.getDay() - 1; 
      const todaySchedule = schedule[dayIndex];

      if (!todaySchedule || !todaySchedule.isOpen) {
        setCurrentStatus('Tutup');
        return;
      }

      const currentTime = now.getHours() * 60 + now.getMinutes();
      const [startHour, startMin] = todaySchedule.start.split('.').map(Number);
      const startTime = startHour * 60 + startMin;
      const [endHour, endMin] = todaySchedule.end.split('.').map(Number);
      const endTime = endHour * 60 + endMin;

      setCurrentStatus(currentTime >= startTime && currentTime <= endTime ? 'Buka' : 'Tutup');
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000); 
    return () => clearInterval(interval);
  }, [schedule]);

  return (
    <div className="sp-layout">
      <div className="sp-mobile-wrapper">
        
        {/* HEADER TANPA TOMBOL KEMBALI */}
        <header className="sp-header">
          <h2 className="sp-title">Detail Toko</h2>
          <div className="sp-header-avatar">
            <img src={storeData.image} alt="Store" />
          </div>
        </header>

        <div className="sp-content">
          
          {/* CARD: PROFIL TOKO */}
          <div className="sp-card">
            <div className="sp-card-header">
              <h3>Profil Toko</h3>
              {/* TOMBOL EDIT -> PINDAH HALAMAN */}
              <button className="sp-edit-badge" onClick={() => navigate('/merchant/profile/edit-info')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 4.00006L2 8.00006V10.0001H10M2 10.0001L4 10L7.99999 6.00005M6 4.00006L7.43431 2.56573L7.43518 2.56488C7.63262 2.36744 7.73151 2.26854 7.84552 2.2315C7.94594 2.19887 8.05412 2.19887 8.15454 2.2315C8.26846 2.26852 8.36724 2.3673 8.5644 2.56446L9.4343 3.43436C9.63231 3.63237 9.73136 3.73142 9.76846 3.84558C9.80108 3.946 9.80107 4.05418 9.76844 4.1546C9.73138 4.26868 9.63248 4.36758 9.43475 4.56531L9.43431 4.56573L7.99999 6.00005M6 4.00006L7.99999 6.00005M6 4.00006L7.99999 6.00005" stroke="white" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Edit
              </button>
            </div>
            <div className="sp-info-list">
              <div className="sp-info-item">
                <div className="sp-icon-box">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M16.9167 24.5V18.6667C16.9167 18.0223 16.3943 17.5 15.75 17.5H12.25C11.6057 17.5 11.0833 18.0223 11.0833 18.6667V24.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M5.83334 12.8333V19.8333C5.83334 22.0331 5.83334 23.1331 6.51676 23.8165C7.20018 24.4999 8.30012 24.4999 10.5 24.4999H17.5C19.6999 24.4999 20.7998 24.4999 21.4833 23.8165C22.1667 23.1331 22.1667 22.0331 22.1667 19.8332V12.8333" stroke="white" stroke-width="2"/>
                    <path d="M5.39148 5.26742C5.60368 4.4186 5.70979 3.99419 6.02626 3.74709C6.34273 3.5 6.7802 3.5 7.65515 3.5H20.3449C21.2198 3.5 21.6573 3.5 21.9737 3.74709C22.2902 3.99419 22.3963 4.4186 22.6085 5.26742L24.0127 10.8843C24.1257 11.3362 24.1822 11.5622 24.1697 11.7457C24.1374 12.2216 23.8186 12.6299 23.3648 12.7767C23.1897 12.8333 22.9514 12.8333 22.4748 12.8333C21.8528 12.8333 21.5418 12.8333 21.2806 12.7725C20.5488 12.602 19.9439 12.0896 19.6554 11.3958C19.5525 11.1481 19.5025 10.8483 19.4026 10.2487C19.3746 10.0809 19.3606 9.997 19.3448 9.97493C19.2982 9.91012 19.2018 9.91012 19.1552 9.97493C19.1394 9.997 19.1254 10.0809 19.0974 10.2487L19.0023 10.8194C18.9922 10.88 18.9872 10.9102 18.9821 10.9367C18.7763 12.0173 17.8437 12.8073 16.744 12.8327C16.717 12.8333 16.6863 12.8333 16.625 12.8333C16.5637 12.8333 16.533 12.8333 16.506 12.8327C15.4063 12.8073 14.4737 12.0173 14.2679 10.9367C14.2628 10.9102 14.2578 10.88 14.2477 10.8194L14.1526 10.2487C14.1246 10.0809 14.1106 9.997 14.0948 9.97493C14.0482 9.91012 13.9518 9.91012 13.9052 9.97493C13.8894 9.997 13.8754 10.0809 13.8474 10.2487L13.7523 10.8194C13.7422 10.88 13.7372 10.9102 13.7321 10.9367C13.5263 12.0173 12.5937 12.8073 11.494 12.8327C11.467 12.8333 11.4363 12.8333 11.375 12.8333C11.3137 12.8333 11.283 12.8333 11.256 12.8327C10.1563 12.8073 9.22374 12.0173 9.01786 10.9367C9.01281 10.9102 9.00777 10.88 8.99769 10.8194L8.90256 10.2487C8.87459 10.0809 8.86061 9.997 8.84476 9.97493C8.79821 9.91012 8.70179 9.91012 8.65524 9.97493C8.63939 9.997 8.62541 10.0809 8.59745 10.2487C8.4975 10.8483 8.44753 11.1481 8.34457 11.3958C8.05611 12.0896 7.45121 12.602 6.71943 12.7725C6.45823 12.8333 6.14723 12.8333 5.52523 12.8333C5.04859 12.8333 4.81028 12.8333 4.63524 12.7767C4.18137 12.6299 3.86258 12.2216 3.83025 11.7457C3.81779 11.5622 3.87428 11.3362 3.98726 10.8843L5.39148 5.26742Z" stroke="white" stroke-width="2"/>
                    </svg></div>
                <span>{storeData.name}</span>
              </div>
              <div className="sp-info-item">
                <div className="sp-icon-box">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M20.6583 15.9916L23.7478 19.0811C24.1632 19.4965 24.1632 20.1701 23.7478 20.5856C21.5017 22.8317 17.9458 23.0844 15.4046 21.1785L13.5667 19.8C11.5325 18.2744 9.72559 16.4674 8.2 14.4333L6.82151 12.5953C4.91564 10.0542 5.16835 6.49832 7.41444 4.25223C7.82988 3.83678 8.50345 3.83678 8.9189 4.25223L12.0084 7.34171C12.464 7.79732 12.464 8.53601 12.0084 8.99162L10.817 10.183C10.6277 10.3723 10.5808 10.6615 10.7005 10.901C12.0849 13.6699 14.3301 15.9151 17.099 17.2995C17.3385 17.4192 17.6277 17.3723 17.817 17.183L19.0084 15.9916C19.464 15.536 20.2027 15.536 20.6583 15.9916Z" stroke="white" stroke-width="2.33333"/>
                    </svg>
                    </div><span>{storeData.wa}</span>
              </div>
              <div className="sp-info-item">
                <div className="sp-icon-box"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="10" r="3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                <span>{storeData.location}</span>
              </div>
            </div>
          </div>

          {/* CARD: INFO STATISTIK */}
          <div className="sp-card">
            <div className="sp-card-header">
              <h3>Info Statistik</h3>
              {/* TOMBOL DETAIL -> PINDAH HALAMAN KE STATISTIK */}
              <button className="sp-detail-badge" onClick={() => navigate('/merchant/profile/statistics')}>Detail</button>
            </div>
            <div className="sp-info-list">
              <div className="sp-info-item">
                <div className="sp-icon-box"><svg xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22" fill="none"><path d="M10.288 0.691209C10.5873 -0.230101 11.8907 -0.2301 12.1901 0.691211L14.1577 6.74694C14.2916 7.15896 14.6755 7.43792 15.1088 7.43792H21.4761C22.4448 7.43792 22.8476 8.67754 22.0639 9.24694L16.9126 12.9896C16.5621 13.2442 16.4155 13.6956 16.5493 14.1076L18.517 20.1633C18.8163 21.0847 17.7618 21.8508 16.9781 21.2814L11.8268 17.5387C11.4763 17.2841 11.0017 17.2841 10.6512 17.5387L5.49992 21.2814C4.7162 21.8508 3.66172 21.0847 3.96108 20.1633L5.9287 14.1076C6.06258 13.6956 5.91592 13.2442 5.56543 12.9896L0.414119 9.24694C-0.369595 8.67754 0.0331819 7.43792 1.00191 7.43792H7.36928C7.8025 7.43792 8.18646 7.15896 8.32033 6.74694L10.288 0.691209Z" fill="#FFB800"/></svg></div>
                <span><strong>4.5</strong> (56 Ratings)</span>
              </div>
              <div className="sp-info-item">
                <div className="sp-icon-box"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="5.83334" y="4.6665" width="16.3333" height="19.8333" rx="2.33333" stroke="white" strokeWidth="2"/><path d="M10.5 10.5H17.5" stroke="white" strokeWidth="1.55556" strokeLinecap="round"/><path d="M10.5 15.1665H17.5" stroke="white" strokeWidth="1.55556" strokeLinecap="round"/><path d="M10.5 19.8335H15.1667" stroke="white" strokeWidth="1.55556" strokeLinecap="round"/></svg></div>
                <span><strong>145 Pesanan</strong> (1 Feb - 1 Mar 2026)</span>
              </div>
              <div className="sp-info-item">
                <div className="sp-icon-box"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none"><rect x="3.5" y="7" width="21" height="14" rx="2.33333" stroke="white" strokeWidth="2"/><path d="M7 10.5H9.33333" stroke="white" strokeWidth="2" strokeLinecap="round"/><path d="M18.6667 17.5H21" stroke="white" strokeWidth="2" strokeLinecap="round"/><circle cx="14" cy="14" r="2.5" stroke="white" strokeWidth="2"/></svg></div>
                <span><strong>Rp 1.234.567</strong> (1 Feb - 1 Mar 2026)</span>
              </div>
            </div>
          </div>

          {/* CARD: JADWAL BUKA */}
          <div className="sp-card">
            <div className="sp-card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3>Jadwal Buka</h3>
                <span className={`sp-status-badge ${currentStatus === 'Buka' ? 'status-buka' : 'status-tutup'}`}>
                  {currentStatus}
                </span>
              </div>
              {/* TOMBOL EDIT -> PINDAH HALAMAN */}
              <button className="sp-edit-badge" onClick={() => navigate('/merchant/profile/edit-schedule')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 4.00006L2 8.00006V10.0001H10M2 10.0001L4 10L7.99999 6.00005M6 4.00006L7.43431 2.56573L7.43518 2.56488C7.63262 2.36744 7.73151 2.26854 7.84552 2.2315C7.94594 2.19887 8.05412 2.19887 8.15454 2.2315C8.26846 2.26852 8.36724 2.3673 8.5644 2.56446L9.4343 3.43436C9.63231 3.63237 9.73136 3.73142 9.76846 3.84558C9.80108 3.946 9.80107 4.05418 9.76844 4.1546C9.73138 4.26868 9.63248 4.36758 9.43475 4.56531L9.43431 4.56573L7.99999 6.00005M6 4.00006L7.99999 6.00005M6 4.00006L7.99999 6.00005" stroke="white" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Edit
              </button>
            </div>
            <div className="sp-schedule-list">
              {schedule.map((item, index) => (
                <div key={index} className="sp-schedule-row">
                  <span className="sp-day">{item.day}</span>
                  <span className="sp-time">
                    {item.isOpen ? `${item.start} - ${item.end}` : 'Libur'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button className="sp-btn-danger-outline">Hapus Toko</button>
        </div>

      </div>
    </div>
  );
};

export default StoreProfile;