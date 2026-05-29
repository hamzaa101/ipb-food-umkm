import React, { useState, useEffect, useRef } from 'react';
import '../styles/StoreStatistics.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

// Registrasi komponen Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

type TimeFilter = '1 minggu terakhir' | '1 bulan terakhir' | '1 tahun terakhir';

const StoreStatistics: React.FC = () => {
  // --- STATES FILTER & DROPDOWN ---
  const [ratingsFilter, setRatingsFilter] = useState<TimeFilter>('1 tahun terakhir');
  const [pesananFilter, setPesananFilter] = useState<TimeFilter>('1 tahun terakhir');
  const [pendapatanFilter, setPendapatanFilter] = useState<TimeFilter>('1 tahun terakhir');

  const [openDropdown, setOpenDropdown] = useState<'ratings' | 'pesanan' | 'pendapatan' | null>(null);
  
  const filterOptions: TimeFilter[] = ['1 minggu terakhir', '1 bulan terakhir', '1 tahun terakhir'];
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Tutup dropdown jika klik di luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  // --- FUNGSI GENERATE DATA DINAMIS BERDASARKAN FILTER ---

  // 1. Data Ratings
  const getRatingsData = (filter: TimeFilter) => {
    let labels = [];
    let data = [];
    if (filter === '1 minggu terakhir') {
      labels = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
      data = [4.0, 4.2, 3.8, 4.5, 4.8, 5.0, 4.9];
    } else if (filter === '1 bulan terakhir') {
      labels = ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'];
      data = [4.1, 4.3, 4.5, 4.7];
    } else {
      labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      data = [1, 2, 3.2, 4.2, 3, 1.5, 2.5, 2.1, 4.8, 2.5, 2.1, 3];
    }

    return {
      labels,
      datasets: [
        {
          label: 'Rating Rata-rata',
          data,
          borderColor: '#FF9746',
          backgroundColor: '#FF9746',
          tension: 0.4,
          borderWidth: 2,
          pointBackgroundColor: labels.map((_, i) => i === data.indexOf(Math.max(...data)) ? '#243D67' : 'transparent'),
          pointBorderColor: labels.map((_, i) => i === data.indexOf(Math.max(...data)) ? '#FFF' : 'transparent'),
          pointRadius: labels.map((_, i) => i === data.indexOf(Math.max(...data)) ? 6 : 0),
          pointHoverRadius: 6,
        },
      ],
    };
  };

  // 2. Data Pesanan
  const getPesananData = (filter: TimeFilter) => {
    let labels = [];
    let data = [];
    if (filter === '1 minggu terakhir') {
      labels = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
      data = [12, 15, 10, 22, 45, 60, 55];
    } else if (filter === '1 bulan terakhir') {
      labels = ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4'];
      data = [120, 150, 180, 210];
    } else {
      labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      data = [35, 45, 25, 55, 62, 18, 12, 78, 48, 65, 18, 35];
    }

    return {
      labels,
      datasets: [
        {
          label: 'Total Pesanan',
          data,
          backgroundColor: labels.map((_, i) => i === data.indexOf(Math.max(...data)) ? '#FF9746' : 'rgba(255, 151, 70, 0.3)'),
          borderRadius: 4,
        },
      ],
    };
  };

  // 3. Data Pendapatan
  const getPendapatanData = (filter: TimeFilter) => {
    let labels = [];
    let data = [];
    if (filter === '1 minggu terakhir') {
      labels = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
      data = [150, 200, 180, 300, 500, 800, 750]; 
    } else if (filter === '1 bulan terakhir') {
      labels = ['Mg 1', 'Mg 2', 'Mg 3', 'Mg 4'];
      data = [1500, 2200, 2800, 3500];
    } else {
      labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      data = [15000, 20000, 50000, 70000, 15000, 30000, 75000, 100000, 45000, 60000, 35000, 80000];
    }

    return {
      labels,
      datasets: [
        {
          label: 'Pendapatan',
          data,
          fill: true,
          backgroundColor: 'rgba(255, 151, 70, 0.2)',
          borderColor: 'rgba(255, 151, 70, 0.5)',
          borderDash: [5, 5],
          borderWidth: 2,
          tension: 0.1,
          pointRadius: 0,
          pointHoverRadius: 4,
        },
      ],
    };
  };

  // --- OPSI KONFIGURASI CHART & TOOLTIP KUSTOM ---
  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const, // Memudahkan hover pada grafik garis/area
      intersect: false,
    },
    plugins: { 
      legend: { display: false }, 
    },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 9 }, color: '#9CA3AF' } },
    },
  };

  const ratingsOptions = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      tooltip: {
        enabled: true,
        backgroundColor: '#243D67',
        callbacks: {
          label: (context: any) => `Rating: ${context.parsed.y}`
        }
      }
    },
    scales: {
      ...commonOptions.scales,
      y: { min: 0, max: 5, grid: { color: '#E5E7EB', borderDash: [5, 5] }, ticks: { font: { size: 9 }, color: '#9CA3AF', stepSize: 1 } },
    },
  };

  const pesananOptions = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      tooltip: {
        enabled: true,
        backgroundColor: '#FF9746',
        callbacks: {
          label: (context: any) => `${context.parsed.y} Pesanan`
        }
      }
    },
    scales: {
      ...commonOptions.scales,
      y: { beginAtZero: true, grid: { color: '#E5E7EB', borderDash: [5, 5] }, ticks: { font: { size: 9 }, color: '#9CA3AF' } },
    },
  };

  const pendapatanOptions = {
    ...commonOptions,
    plugins: {
      ...commonOptions.plugins,
      tooltip: {
        enabled: true,
        backgroundColor: '#243D67',
        callbacks: {
          label: (context: any) => `Rp ${context.parsed.y.toLocaleString('id-ID')}`
        }
      }
    },
    scales: {
      ...commonOptions.scales,
      y: { 
        beginAtZero: true, grid: { color: '#E5E7EB', borderDash: [5, 5] }, 
        ticks: { font: { size: 9 }, color: '#9CA3AF', callback: (value: any) => value === 0 ? '0' : (value >= 1000 ? (value / 1000) + 'k' : value) } 
      },
    },
  };


  return (
    <div className="ss-layout" ref={dropdownRef}>
      <div className="ss-mobile-wrapper">
        
        {/* HEADER */}
        <header className="ss-header">
          <h2 className="ss-title">Info Statistik</h2>
        </header>

        <div className="ss-content">
          
          {/* CARD 1: RATINGS */}
          <div className="ss-card">
            <div className="ss-card-header">
              <div className="ss-card-title-group">
                <div className="ss-icon-box">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13" viewBox="0 0 14 13" fill="none"><path d="M6.17275 0.41468C6.35236 -0.138107 7.13441 -0.138109 7.31402 0.414678L8.49459 4.04811C8.57492 4.29533 8.80529 4.4627 9.06523 4.4627H12.8856C13.4669 4.4627 13.7085 5.20647 13.2383 5.54811L10.1475 7.7937C9.93724 7.94649 9.84925 8.21731 9.92957 8.46452L11.1101 12.098C11.2898 12.6507 10.6571 13.1104 10.1868 12.7688L7.09606 10.5232C6.88576 10.3704 6.601 10.3704 6.39071 10.5232L3.29993 12.7688C2.8297 13.1104 2.19701 12.6507 2.37662 12.098L3.5572 8.46452C3.63752 8.21731 3.54953 7.94649 3.33923 7.7937L0.248449 5.54812C-0.221779 5.20647 0.0198851 4.4627 0.601119 4.4627H4.42154C4.68148 4.4627 4.91185 4.29533 4.99217 4.04811L6.17275 0.41468Z" fill="#FFB800"/></svg>
                </div>
                <h3>Ratings</h3>
              </div>
              <div className="ss-dropdown-container">
                <div className="ss-dropdown-mini" onClick={() => setOpenDropdown(openDropdown === 'ratings' ? null : 'ratings')}>
                  <span>{ratingsFilter}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none" style={{ transform: openDropdown === 'ratings' ? 'rotate(180deg)' : 'none', transition: '0.2s' }}><path d="M5.44504 2.64893L3.67906 4.4149L1.91309 2.64893" stroke="#243D67" strokeOpacity="0.5" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                {openDropdown === 'ratings' && (
                  <div className="ss-dropdown-menu">
                    {filterOptions.map(opt => (
                      <div key={opt} className={`ss-dropdown-item ${ratingsFilter === opt ? 'active' : ''}`} onClick={() => { setRatingsFilter(opt); setOpenDropdown(null); }}>{opt}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="ss-chart-container" style={{ height: '160px' }}>
              <Line data={getRatingsData(ratingsFilter)} options={ratingsOptions as any} />
            </div>
          </div>

          {/* CARD 2: PESANAN */}
          <div className="ss-card">
            <div className="ss-card-header">
              <div className="ss-card-title-group">
                <div className="ss-icon-box">
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none"><rect x="3.5" y="2.80005" width="9.8" height="11.9" rx="1.4" stroke="white" strokeWidth="1.2"/><path d="M6.30005 6.30005H10.5" stroke="white" strokeWidth="0.933333" strokeLinecap="round"/><path d="M6.30005 9.1001H10.5" stroke="white" strokeWidth="0.933333" strokeLinecap="round"/><path d="M6.30005 11.8999H9.10005" stroke="white" strokeWidth="0.933333" strokeLinecap="round"/></svg>
                </div>
                <h3>Pesanan</h3>
              </div>
              <div className="ss-dropdown-container">
                <div className="ss-dropdown-mini" onClick={() => setOpenDropdown(openDropdown === 'pesanan' ? null : 'pesanan')}>
                  <span>{pesananFilter}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none" style={{ transform: openDropdown === 'pesanan' ? 'rotate(180deg)' : 'none', transition: '0.2s' }}><path d="M5.44504 2.64893L3.67906 4.4149L1.91309 2.64893" stroke="#243D67" strokeOpacity="0.5" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                {openDropdown === 'pesanan' && (
                  <div className="ss-dropdown-menu">
                    {filterOptions.map(opt => (
                      <div key={opt} className={`ss-dropdown-item ${pesananFilter === opt ? 'active' : ''}`} onClick={() => { setPesananFilter(opt); setOpenDropdown(null); }}>{opt}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="ss-chart-container" style={{ height: '180px' }}>
              <Bar data={getPesananData(pesananFilter)} options={pesananOptions as any} />
            </div>
          </div>

          {/* BARIS 3 KARTU KECIL */}
          <div className="ss-small-cards-grid-3">
            <div className="ss-small-card">
              <span className="ss-sc-label">Bulan Terbaik</span>
              <span className="ss-sc-value">November</span>
              <span className="ss-sc-sub">2019</span>
            </div>
            <div className="ss-small-card">
              <span className="ss-sc-label">Tahun Terbaik</span>
              <span className="ss-sc-value">2023</span>
              <span className="ss-sc-sub">1034 Pesanan</span>
            </div>
            <div className="ss-small-card">
              <span className="ss-sc-label">Menu Terlaris</span>
              <div className="ss-sc-menu-group">
                <img src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=50&h=50&fit=crop" alt="Menu" />
                <div className="ss-sc-menu-text">
                  <span className="ss-sc-menu-title">Nasi Goreng</span>
                  <span className="ss-sc-sub">256x Dibeli</span>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 3: PENDAPATAN */}
          <div className="ss-card">
            <div className="ss-card-header">
              <div className="ss-card-title-group">
                <div className="ss-icon-box">
                  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17 17" fill="none"><rect x="2.09998" y="4.2002" width="12.6" height="8.4" rx="1.4" stroke="white" strokeWidth="1.2"/><path d="M4.19995 6.2998H5.59995" stroke="white" strokeWidth="1.2" strokeLinecap="round"/><path d="M11.2 10.5H12.6" stroke="white" strokeWidth="1.2" strokeLinecap="round"/><circle cx="8.40005" cy="8.39981" r="1.5" stroke="white" strokeWidth="1.2"/></svg>
                </div>
                <h3>Pendapatan</h3>
              </div>
              <div className="ss-dropdown-container">
                <div className="ss-dropdown-mini" onClick={() => setOpenDropdown(openDropdown === 'pendapatan' ? null : 'pendapatan')}>
                  <span>{pendapatanFilter}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8" fill="none" style={{ transform: openDropdown === 'pendapatan' ? 'rotate(180deg)' : 'none', transition: '0.2s' }}><path d="M5.44504 2.64893L3.67906 4.4149L1.91309 2.64893" stroke="#243D67" strokeOpacity="0.5" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                {openDropdown === 'pendapatan' && (
                  <div className="ss-dropdown-menu">
                    {filterOptions.map(opt => (
                      <div key={opt} className={`ss-dropdown-item ${pendapatanFilter === opt ? 'active' : ''}`} onClick={() => { setPendapatanFilter(opt); setOpenDropdown(null); }}>{opt}</div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="ss-chart-container" style={{ height: '160px' }}>
              <Line data={getPendapatanData(pendapatanFilter)} options={pendapatanOptions as any} />
            </div>
          </div>

          {/* BARIS 2 KARTU KECIL */}
          <div className="ss-small-cards-grid-2">
            <div className="ss-small-card">
              <span className="ss-sc-label">Top month</span>
              <span className="ss-sc-value">November</span>
              <span className="ss-sc-sub">2019</span>
            </div>
            <div className="ss-small-card">
              <span className="ss-sc-label">Top year</span>
              <span className="ss-sc-value">2023</span>
              <span className="ss-sc-sub">Rp 5.536.098</span>
            </div>
          </div>

          <button className="ss-btn-download">Download Data</button>

        </div>
      </div>
    </div>
  );
};

export default StoreStatistics;