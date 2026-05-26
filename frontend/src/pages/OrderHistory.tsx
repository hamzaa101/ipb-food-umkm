import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Order.css';
import menuNasiGoreng from '../assets/nasi-goreng.jpg'; // Pastikan asset ada

interface OrderItem {
  id: string;
  storeId?: number;
  store: string;
  status: string;
  items: string;
  total: number;
  time: string;
  isRated?: boolean; // Tanda tanya (?) berarti opsional
  rating?: number;   // Tanda tanya (?) berarti opsional
}

const OrderHistory: React.FC = () => {
  const navigate = useNavigate();
  // Tab State: 'ongoing' atau 'completed'
  const [activeTab, setActiveTab] = useState<'ongoing' | 'completed'>('ongoing');

// MOCK DATA
  // Kita beri tahu TypeScript bahwa ini adalah kumpulan data dari OrderItem
  const ongoingOrders: OrderItem[] = [
    {
      id: "NPS-101",
      storeId: 1,
      store: "Nasi Goreng Pak Salman",
      status: "diproses",
      items: "2 x Nasi Goreng Spesial, 2 x Es Teh Manis",
      total: 50000,
      time: "13 Februari 2026 (13.56)"
    },
    {
      id: "NPS-102",
      storeId: 1,
      store: "Nasi Goreng Pak Salman",
      status: "siap",
      items: "2 x Nasi Goreng Gila, 2 x Es Teh Manis",
      total: 50000,
      time: "13 Februari 2026 (14.20)"
    }
  ];

  // Di sini juga kita tambahkan : OrderItem[]
  const completedOrders: OrderItem[] = [
    {
      id: "NPS-103",
      storeId: 1,
      store: "Nasi Goreng Pak Salman",
      status: "selesai",
      items: "2 x Nasi Goreng Spesial, 2 x Es Teh Manis",
      total: 50000,
      time: "13 Februari 2026 (13.56)",
      isRated: false
    },
    {
      id: "NPS-104",
      storeId: 1,
      store: "Nasi Goreng Pak Salman",
      status: "selesai",
      items: "2 x Nasi Goreng Spesial, 2 x Es Teh Manis",
      total: 50000,
      time: "12 Februari 2026 (08.55)",
      isRated: true,
      rating: 4
    }
  ];

  const currentList = activeTab === 'ongoing' ? ongoingOrders : completedOrders;

  return (
    <div className="order-page-container">
      <div className="order-mobile-wrapper">
        
        <header className="order-header-bar">
          <h2>Riwayat Pesanan</h2>
        </header>

        {/* TABS */}
        <div className="order-tabs-container">
          <div className="order-tabs-bg">
            <button 
              className={`order-tab-btn ${activeTab === 'ongoing' ? 'active-orange' : ''}`}
              onClick={() => setActiveTab('ongoing')}
            >
              Sedang berlangsung
            </button>
            <button 
              className={`order-tab-btn ${activeTab === 'completed' ? 'active-green' : ''}`}
              onClick={() => setActiveTab('completed')}
            >
              Selesai
            </button>
          </div>
        </div>

        {/* LIST KONTEN */}
        <div className="order-list-content">
          {currentList.length === 0 ? (
            <div className="order-empty-state">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <circle cx="30" cy="30" r="22.5" stroke="#9CA3AF" strokeWidth="5"/>
                <path d="M22.5 37.5L37.5 22.5" stroke="#9CA3AF" strokeWidth="5"/>
                <path d="M37.5 37.5L22.5 22.5" stroke="#9CA3AF" strokeWidth="5"/>
              </svg>
              <p style={{ marginTop: '16px', fontWeight: 600 }}>Tidak ada pesanan yang {activeTab === 'ongoing' ? 'berlangsung' : 'selesai'}.</p>
            </div>
          ) : (
            currentList.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-card-header">
                  <div className="order-store-info">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#243D67" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                    <h3 className="order-store-name">{order.store}</h3>
                  </div>
                  <div className={`status-badge status-${order.status}`}>
                    {order.status}
                  </div>
                </div>

                <div className="order-card-body">
                  <img src={menuNasiGoreng} alt="Menu" className="order-item-img" />
                  <div className="order-item-details">
                    {order.items.split(', ').map((item, i) => {
                      const [qtyName, price] = item.split(' (Harga tidak ada di mock, jadi kita pisah per item saja)');
                      return (
                        <div key={i} className="order-item-text">
                          <span>{item}</span>
                        </div>
                      );
                    })}
                    <div className="order-time">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      {order.time}
                    </div>
                  </div>
                </div>

                <div className="order-total-row">
                  <span className="order-total-label">Total Pembayaran</span>
                  <span className={`order-total-value ${order.status === 'selesai' ? 'green' : ''}`}>
                    Rp {order.total.toLocaleString('id-ID')}
                  </span>
                </div>

                {/* AREA RATING READ-ONLY JIKA SUDAH SELESAI & DINILAI */}
                {activeTab === 'completed' && order.isRated && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', padding: '12px', border: '1px solid #E6E8EC', borderRadius: '12px' }}>
                    <span style={{ color: '#243D67', fontWeight: 600, fontSize: '14px' }}>Kamu beri nilai</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="119" height="24" viewBox="0 0 119 24" fill="none">
                      <path d="M11.0489 2.92705C11.3483 2.00574 12.6517 2.00574 12.9511 2.92705L14.4697 7.60081C14.6035 8.01284 14.9875 8.2918 15.4207 8.2918H20.335C21.3037 8.2918 21.7065 9.53141 20.9228 10.1008L16.947 12.9894C16.5966 13.244 16.4499 13.6954 16.5838 14.1074L18.1024 18.7812C18.4017 19.7025 17.3472 20.4686 16.5635 19.8992L12.5878 17.0106C12.2373 16.756 11.7627 16.756 11.4122 17.0106L7.43648 19.8992C6.65276 20.4686 5.59828 19.7025 5.89763 18.7812L7.41623 14.1074C7.55011 13.6954 7.40345 13.244 7.05296 12.9894L3.07722 10.1008C2.29351 9.53141 2.69628 8.2918 3.66501 8.2918H8.57929C9.01252 8.2918 9.39647 8.01284 9.53035 7.60081L11.0489 2.92705Z" fill="#FFB800"/>
                      <path d="M35.0489 2.92705C35.3483 2.00574 36.6517 2.00574 36.9511 2.92705L38.4697 7.60081C38.6035 8.01284 38.9875 8.2918 39.4207 8.2918H44.335C45.3037 8.2918 45.7065 9.53141 44.9228 10.1008L40.947 12.9894C40.5966 13.244 40.4499 13.6954 40.5838 14.1074L42.1024 18.7812C42.4017 19.7025 41.3472 20.4686 40.5635 19.8992L36.5878 17.0106C36.2373 16.756 35.7627 16.756 35.4122 17.0106L31.4365 19.8992C30.6528 20.4686 29.5983 19.7025 29.8976 18.7812L31.4162 14.1074C31.5501 13.6954 31.4034 13.244 31.053 12.9894L27.0772 10.1008C26.2935 9.53141 26.6963 8.2918 27.665 8.2918H32.5793C33.0125 8.2918 33.3965 8.01284 33.5303 7.60081L35.0489 2.92705Z" fill="#FFB800"/>
                      <path d="M59.0489 2.92705C59.3483 2.00574 60.6517 2.00574 60.9511 2.92705L62.4697 7.60081C62.6035 8.01284 62.9875 8.2918 63.4207 8.2918H68.335C69.3037 8.2918 69.7065 9.53141 68.9228 10.1008L64.947 12.9894C64.5966 13.244 64.4499 13.6954 64.5838 14.1074L66.1024 18.7812C66.4017 19.7025 65.3472 20.4686 64.5635 19.8992L60.5878 17.0106C60.2373 16.756 59.7627 16.756 59.4122 17.0106L55.4365 19.8992C54.6528 20.4686 53.5983 19.7025 53.8976 18.7812L55.4162 14.1074C55.5501 13.6954 55.4034 13.244 55.053 12.9894L51.0772 10.1008C50.2935 9.53141 50.6963 8.2918 51.665 8.2918H56.5793C57.0125 8.2918 57.3965 8.01284 57.5303 7.60081L59.0489 2.92705Z" fill="#FFB800"/>
                      <path d="M83.0489 2.92705C83.3483 2.00574 84.6517 2.00574 84.9511 2.92705L86.4697 7.60081C86.6035 8.01284 86.9875 8.2918 87.4207 8.2918H92.335C93.3037 8.2918 93.7065 9.53141 92.9228 10.1008L88.947 12.9894C88.5966 13.244 88.4499 13.6954 88.5838 14.1074L90.1024 18.7812C90.4017 19.7025 89.3472 20.4686 88.5635 19.8992L84.5878 17.0106C84.2373 16.756 83.7627 16.756 83.4122 17.0106L79.4365 19.8992C78.6528 20.4686 77.5983 19.7025 77.8976 18.7812L79.4162 14.1074C79.5501 13.6954 79.4034 13.244 79.053 12.9894L75.0772 10.1008C74.2935 9.53141 74.6963 8.2918 75.665 8.2918H80.5793C81.0125 8.2918 81.3965 8.01284 81.5303 7.60081L83.0489 2.92705Z" fill="#FFB800"/>
                      <path d="M106.049 2.92705C106.348 2.00574 107.652 2.00574 107.951 2.92705L109.47 7.60081C109.604 8.01284 109.987 8.2918 110.421 8.2918H115.335C116.304 8.2918 116.706 9.53141 115.923 10.1008L111.947 12.9894C111.597 13.244 111.45 13.6954 111.584 14.1074L113.102 18.7812C113.402 19.7025 112.347 20.4686 111.564 19.8992L107.588 17.0106C107.237 16.756 106.763 16.756 106.412 17.0106L102.436 19.8992C101.653 20.4686 100.598 19.7025 100.898 18.7812L102.416 14.1074C102.55 13.6954 102.403 13.244 102.053 12.9894L98.0772 10.1008C97.2935 9.53141 97.6963 8.2918 98.665 8.2918H103.579C104.013 8.2918 104.396 8.01284 104.53 7.60081L106.049 2.92705Z" fill="#D9D9D9"/>
                    </svg>
                  </div>
                )}

                {/* LOGIKA TOMBOL */}
                <div className="order-actions-row">
                  <button className="btn-order-outline" onClick={() => navigate(`/order/${order.id}`)}>
                    Detail Pesanan
                  </button>
                  
                  {activeTab === 'ongoing' ? (
                    <button className="btn-order-fill">Hubungi Penjual</button>
                  ) : (
                    !order.isRated ? (
                      <button className="btn-order-fill" style={{ background: '#FFB800' }} onClick={() => navigate(`/rating/${order.id}`)}>Beri Nilai</button>
                    ) : (
                      <button className="btn-order-fill" style={{ background: '#22C55E' }} onClick={() => navigate(`/store/${order.storeId}`)}>Beli Lagi</button>
                    )
                  )}
                </div>
                
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;