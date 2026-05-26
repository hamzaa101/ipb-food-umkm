import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/Order.css';
import menuNasiGoreng from '../assets/nasi-goreng.jpg';

// Kita buat database sementara di sini agar sesuai dengan OrderHistory
const mockOrdersDatabase: Record<string, any> = {
  "NPS-101": {
    id: "NPS-101", storeId: 1, store: "Nasi Goreng Pak Salman", status: "diproses", 
    items: [{ name: "Nasi Goreng Spesial", qty: 2, price: 20000 }, { name: "Es Teh Manis", qty: 2, price: 5000 }],
    total: 50000, timeDiterima: "13.50 WIB", timeDiproses: "13.56 WIB", timeSiap: "", timeSelesai: ""
  },
  "NPS-102": {
    id: "NPS-102", storeId: 1, store: "Nasi Goreng Pak Salman", status: "siap", 
    items: [{ name: "Nasi Goreng Gila", qty: 2, price: 20000 }, { name: "Es Teh Manis", qty: 2, price: 5000 }],
    total: 50000, timeDiterima: "14.10 WIB", timeDiproses: "14.15 WIB", timeSiap: "14.20 WIB", timeSelesai: ""
  },
  "NPS-103": {
    id: "NPS-103", storeId: 1, store: "Nasi Goreng Pak Salman", status: "selesai", 
    items: [{ name: "Nasi Goreng Spesial", qty: 2, price: 20000 }, { name: "Es Teh Manis", qty: 2, price: 5000 }],
    total: 50000, timeDiterima: "13.30 WIB", timeDiproses: "13.35 WIB", timeSiap: "13.50 WIB", timeSelesai: "13.56 WIB",
    isRated: false
  },
  "NPS-104": {
    id: "NPS-104", storeId: 1, store: "Nasi Goreng Pak Salman", status: "selesai", 
    items: [{ name: "Nasi Goreng Spesial", qty: 2, price: 20000 }, { name: "Es Teh Manis", qty: 2, price: 5000 }],
    total: 50000, timeDiterima: "08.30 WIB", timeDiproses: "08.36 WIB", timeSiap: "08.50 WIB", timeSelesai: "08.55 WIB",
    isRated: true,
    rating: 4 // Ditambahkan nilai rating untuk ditampilkan
  }
};

const OrderDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); 
  
  // Mencari data pesanan berdasarkan ID. Jika tidak ada, pakai default.
  const order = id && mockOrdersDatabase[id] ? mockOrdersDatabase[id] : mockOrdersDatabase["NPS-101"];

  // Logika menentukan step timeline mana yang aktif
  const stepDiproses = ['diproses', 'siap', 'selesai'].includes(order.status);
  const stepSiap = ['siap', 'selesai'].includes(order.status);
  const stepSelesai = order.status === 'selesai';

  // Logika warna garis vertikal
  const getLineClass = (isActive: boolean) => isActive ? "timeline-item active" : "timeline-item";

  return (
    <div className="order-page-container">
      <div className="order-mobile-wrapper" style={{ paddingBottom: '140px' }}>
        
        <header className="order-header-bar">
          <h2>Detail Pesanan</h2>
        </header>

        <div className="order-list-content">
          
          {/* TRACKING TIMELINE */}
          <div className="detail-section">
            <div className="detail-id-row">
              <div className="detail-id-text">
                <span style={{ color: '#9CA3AF', fontWeight: 500, fontSize: '12px' }}>ID Pesanan</span><br/>
                {order.id}
              </div>
              <button className="btn-salin">salin</button>
            </div>

            <div className="timeline-container">
              {/* Step 1: Diterima */}
              <div className={getLineClass(stepDiproses)}>
                <div className="timeline-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#FF9746" strokeWidth="2"/><path d="M8 12L11 15L16 9" stroke="#FF9746" strokeWidth="2"/></svg>
                </div>
                <div className="timeline-text">
                  <h4>Pesanan Diterima</h4>
                  <p>{order.timeDiterima}</p>
                </div>
              </div>
              
              {/* Step 2: Diproses */}
              <div className={getLineClass(stepSiap)}>
                <div className="timeline-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke={stepDiproses ? "#FF9746" : "#9CA3AF"} strokeWidth="2"/>
                    <path d="M16.5 12H12.25C12.1119 12 12 11.8881 12 11.75V8.5" stroke={stepDiproses ? "#FF9746" : "#9CA3AF"} strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="timeline-text">
                  <h4 style={{ color: stepDiproses ? '#FF9746' : '#9CA3AF' }}>Pesanan Diproses</h4>
                  {stepDiproses && <p>{order.timeDiproses}</p>}
                </div>
              </div>

              {/* Step 3: Siap Diambil */}
              <div className={getLineClass(stepSelesai)}>
                <div className="timeline-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 21V13M20 8L13.06 3.6625C12.5445 3.34033 12.2868 3.17925 12 3.17925C11.7132 3.17925 11.4555 3.34033 10.94 3.6625L4 8V14.8915C4 15.4334 4 15.7043 4.12536 15.9305C4.25072 16.1567 4.48048 16.3003 4.94 16.5875L12 21L16 18.5L19.06 16.5875C19.5195 16.3003 19.7493 16.1567 19.8746 15.9305C20 15.7043 20 15.4334 20 14.8915V8ZM12 13L4 8M12 13L20 8" stroke={stepSiap ? "#FF9746" : "#9CA3AF"} strokeWidth="2" strokeLinejoin="round"/>
                  </svg>
                </div>
                <div className="timeline-text">
                  <h4 style={{ color: stepSiap ? '#FF9746' : '#9CA3AF' }}>Pesanan Siap Diambil</h4>
                  {stepSiap && <p>{order.timeSiap}</p>}
                </div>
              </div>

              {/* Step 4: Selesai */}
              <div className="timeline-item done">
                <div className="timeline-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke={stepSelesai ? "#22C55E" : "#9CA3AF"} strokeWidth="2"/>
                    <path d="M8 12L11 15L16 9" stroke={stepSelesai ? "#22C55E" : "#9CA3AF"} strokeWidth="2"/>
                  </svg>
                </div>
                <div className="timeline-text">
                  <h4 style={{ color: stepSelesai ? '#22C55E' : '#9CA3AF' }}>Pesanan Selesai</h4>
                  {stepSelesai && <p>{order.timeSelesai}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* ITEM TOKO */}
          <div className="detail-section" style={{ padding: 0 }}>
             <div className="order-store-info" style={{ padding: '16px', borderBottom: '1px solid #E6E8EC' }}>
               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#243D67" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
               <h3 className="order-store-name">{order.store}</h3>
             </div>
             <div style={{ padding: '16px' }}>
                {order.items.map((item: any, index: number) => (
                  <div key={index} className="order-card-body" style={{ borderBottom: index === order.items.length - 1 ? 'none' : '1px solid #E6E8EC', marginBottom: '8px', paddingBottom: '8px' }}>
                    <img src={menuNasiGoreng} alt="Menu" className="order-item-img" />
                    <div className="order-item-details">
                      <div className="order-item-text">
                        <span>{item.name}</span>
                      </div>
                      <div className="order-item-price">{item.qty} x Rp {item.price.toLocaleString('id-ID')}</div>
                      <div style={{ alignSelf: 'flex-end', color: '#FF9746', fontWeight: 700 }}>Rp {(item.qty * item.price).toLocaleString('id-ID')}</div>
                    </div>
                  </div>
                ))}
                
                <hr style={{ borderTop: '1px solid #E6E8EC', borderBottom: 'none', margin: '8px 0 16px 0' }}/>
                <div className="order-total-row" style={{ margin: 0 }}>
                  <span className="order-total-label">Total Pembayaran</span>
                  <span className="order-total-value">Rp {order.total.toLocaleString('id-ID')}</span>
                </div>
             </div>
          </div>

          {/* SECTION RATING: Tampil HANYA jika status selesai dan sudah dinilai */}
          {order.status === 'selesai' && order.isRated && (
            <div className="detail-section">
              <h3 style={{ color: '#243D67', fontSize: '14px', fontWeight: 700, margin: '0 0 12px 0' }}>Kamu Beri Nilai</h3>
              <div style={{ display: 'flex', justifyContent: 'center', padding: '16px', border: '1px solid #E6E8EC', borderRadius: '8px', gap: '8px' }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                    <path 
                      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
                      fill={star <= (order.rating || 0) ? "#FFB800" : "#E6E8EC"} 
                    />
                  </svg>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* STICKY BOTTOM BAR */}
        <div className="detail-bottom-bar">
          {order.status !== 'selesai' && (
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              width: '100%',
              maxWidth: '480px',
              margin: '0 auto', 
              marginBottom: '4px' }}>

              <span style={{ 
                color: '#243D67', 
                fontSize: '16px', 
                fontWeight: 700 }}>
                  Bayar di tempat</span>

              <span style={{ 
                color: '#FF9746', 
                fontSize: '16px', 
                fontWeight: 700 }}>
                  Rp {order.total.toLocaleString('id-ID')}</span>
            </div>
          )}

          {order.status === 'selesai' ? (
             order.isRated ? (
                <button className="btn-order-fill" 
                style={{ 
                  width: '100%', 
                  maxWidth: '480px', 
                  margin: '0 auto',
                  background: '#22C55E' }} 
                  onClick={() => navigate(`/store/${order.storeId}`)}>Beli Lagi</button>
             ) : (
                <button className="btn-order-fill" 
                style={{ 
                  width: '100%', 
                  maxWidth: '480px', 
                  margin: '0 auto',
                  background: '#FFB800' }} 
                onClick={() => navigate(`/rating/${order.id}`)}>Beri Nilai</button>
             )
          ) : (
             <button className="btn-order-fill"
             style={{ 
               width: '100%', 
               maxWidth: '480px', 
               margin: '0 auto' }}
             >
               Hubungi Penjual
             </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default OrderDetail;