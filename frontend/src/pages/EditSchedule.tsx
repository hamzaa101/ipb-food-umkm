import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/StoreEditForms.css';

// 1. Menggunakan Interface yang konsisten dengan StoreProfile
interface Schedule {
  day: string;
  start: string;
  end: string;
  isOpen: boolean;
}

// 2. Menggunakan Data Initial yang kamu berikan
const initialSchedule: Schedule[] = [
  { day: 'Senin', start: '09.00', end: '15.00', isOpen: true },
  { day: 'Selasa', start: '09.00', end: '15.00', isOpen: true },
  { day: 'Rabu', start: '09.00', end: '15.00', isOpen: true },
  { day: 'Kamis', start: '09.00', end: '15.00', isOpen: true },
  { day: 'Jumat', start: '10.00', end: '15.00', isOpen: true },
  { day: 'Sabtu', start: '09.00', end: '12.00', isOpen: true },
  { day: 'Minggu', start: '00.00', end: '00.00', isOpen: false },
];

const EditSchedule: React.FC = () => {
  const navigate = useNavigate();
  
  const [schedule, setSchedule] = useState<Schedule[]>(initialSchedule);

  // --- Handlers ---
  const handleScheduleToggle = (index: number) => {
    const newSchedule = [...schedule];
    newSchedule[index].isOpen = !newSchedule[index].isOpen;
    setSchedule(newSchedule);
  };

  const handleTimeChange = (index: number, field: 'start' | 'end', value: string) => {
    const newSchedule = [...schedule];
    newSchedule[index][field] = value;
    setSchedule(newSchedule);
  };

  return (
    <div className="sef-layout">
      {/* Background dibuat #FFF agar sesuai dengan desain putih bersih */}
      <div className="sef-mobile-wrapper" style={{ backgroundColor: '#FFF' }}>
        
        {/* HEADER Tanpa Tombol Kembali */}
        <header className="sef-header">
          <h2>Edit Jadwal</h2>
        </header>

        <div className="sef-content">
          
          {/* LIST JADWAL BUKA */}
          <div className="sef-schedule-list">
            {schedule.map((item, index) => (
              <div key={index} className="sef-schedule-row">
                <span className="sef-day-label">{item.day}</span>
                
                {/* Input Jam (Hanya tampil jika toggle menyala/buka) */}
                <div className="sef-time-inputs" style={{ visibility: item.isOpen ? 'visible' : 'hidden' }}>
                  <input 
                    type="text" 
                    value={item.start} 
                    onChange={(e) => handleTimeChange(index, 'start', e.target.value)} 
                  />
                  <span>-</span>
                  <input 
                    type="text" 
                    value={item.end} 
                    onChange={(e) => handleTimeChange(index, 'end', e.target.value)} 
                  />
                </div>

                {/* TOGGLE SWITCH */}
                <div 
                  className={`sef-toggle ${item.isOpen ? 'is-open' : 'is-closed'}`} 
                  onClick={() => handleScheduleToggle(index)}
                >
                  <div className="sef-toggle-knob"></div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* BOTTOM ACTION BAR - Tombol Tunggal Simpan Perubahan */}
        <div className="sef-bottom-bar">
          <div className="sef-bottom-content">
            <button className="sef-btn-primary-large" onClick={() => navigate('/merchant/store-profile', { replace: true })}>
              Simpan Perubahan
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default EditSchedule;