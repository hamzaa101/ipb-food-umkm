// src/pages/AdminTransaksi.tsx
import React, { useState } from "react";
import { Search, Filter, Download, ArrowUpRight, ArrowDownRight, DollarSign, Activity } from "lucide-react";
import { toast } from "sonner";
import AdminLayout from "../layouts/AdminLayout";
import "../styles/AdminTransaksi.css";

export default function AdminTransaksi() {
  const [searchQuery, setSearchQuery] = useState("");

  const transactionsData = [
    { id: "TRX-2026-0528-01", date: "28 Mei 2026, 14:30", customer: "Andi Saputra", store: "Ayam Geprek Kampus", amount: 45000, status: "Berhasil" },
    { id: "TRX-2026-0528-02", date: "28 Mei 2026, 14:15", customer: "Budi Santoso", store: "Kopi Senja Mahasiswa", amount: 25000, status: "Berhasil" },
    { id: "TRX-2026-0528-03", date: "28 Mei 2026, 13:50", customer: "Siti Rahma", store: "Warteg Barokah", amount: 32000, status: "Dibatalkan" },
    { id: "TRX-2026-0528-04", date: "28 Mei 2026, 12:10", customer: "Dina Melati", store: "Seblak Mercon", amount: 18000, status: "Berhasil" },
    { id: "TRX-2026-0528-05", date: "28 Mei 2026, 11:45", customer: "Andi Saputra", store: "Jus Buah Segar", amount: 20000, status: "Diproses" },
  ];

  const handleExport = () => {
    toast.success("Mengekspor Data", {
      description: "File CSV sedang diunduh ke perangkat Anda."
    });
  };

  const filteredData = transactionsData.filter(trx => 
    trx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trx.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    trx.store.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="transaksi-container">
        
        {/* === SUMMARY CARDS === */}
        <div className="transaksi-summary-grid">
          
          <div className="transaksi-summary-card">
            <div className="summary-icon-wrapper icon-emerald">
              <DollarSign size={24} />
            </div>
            <div className="summary-info">
              <p className="summary-label">Total Nilai Transaksi Hari Ini</p>
              <h4 className="summary-value">Rp 4.250.000</h4>
              <div className="summary-trend trend-up">
                <ArrowUpRight size={16} />
                <span>+12.5%</span>
              </div>
            </div>
          </div>
          
          <div className="transaksi-summary-card">
            <div className="summary-icon-wrapper icon-orange">
              <Activity size={24} />
            </div>
            <div className="summary-info">
              <p className="summary-label">Jumlah Transaksi Sukses</p>
              <h4 className="summary-value">142</h4>
              <div className="summary-trend trend-up">
                <ArrowUpRight size={16} />
                <span>+5.5%</span>
              </div>
            </div>
          </div>

          <div className="transaksi-summary-card">
            <div className="summary-icon-wrapper icon-rose">
              <ArrowDownRight size={24} />
            </div>
            <div className="summary-info">
              <p className="summary-label">Transaksi Dibatalkan</p>
              <h4 className="summary-value">12</h4>
              <div className="summary-trend trend-down">
                <ArrowUpRight size={16} />
                <span>+2.1%</span>
              </div>
            </div>
          </div>

        </div>

        {/* === CONTROLS === */}
        <div className="transaksi-controls">
          <div className="transaksi-actions-left">
            <div className="search-box">
              <Search className="search-icon" size={16} />
              <input 
                type="text" 
                placeholder="Cari ID/Toko/Pelanggan..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            <button onClick={() => toast.info("Fitur filter akan segera tersedia")} className="btn-icon-only">
              <Filter size={18} />
            </button>
          </div>
          
          <button onClick={handleExport} className="btn-export">
            <Download size={16} />
            <span>Export CSV</span>
          </button>
        </div>

        {/* === TABLE === */}
        <div className="table-card">
          <div className="table-responsive">
            <table className="transaksi-table">
              <thead>
                <tr>
                  <th>ID Transaksi & Waktu</th>
                  <th>Pelanggan</th>
                  <th>Toko</th>
                  <th style={{ textAlign: 'right' }}>Total Transaksi</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? filteredData.map((trx) => (
                  <tr key={trx.id}>
                    <td>
                      <p className="trx-id">{trx.id}</p>
                      <p className="trx-date">{trx.date}</p>
                    </td>
                    <td className="trx-customer">{trx.customer}</td>
                    <td className="trx-store">{trx.store}</td>
                    <td className="trx-amount">
                      Rp {trx.amount.toLocaleString('id-ID')}
                    </td>
                    <td>
                      <span className={`status-badge ${
                        trx.status === 'Diproses' ? 'status-process' : 
                        trx.status === 'Berhasil' ? 'status-success' : 'status-failed'
                      }`}>
                        {trx.status}
                      </span>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: '48px', color: 'var(--text-secondary)' }}>
                      Tidak ada transaksi yang cocok dengan pencarian Anda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* PAGINATION FOOTER */}
          <div className="table-footer">
            <p className="footer-text">Menampilkan {filteredData.length} transaksi</p>
            <div className="pagination-group">
              <button className="page-btn" disabled>Seb</button>
              <button className="page-btn active">1</button>
              <button className="page-btn" disabled>Sel</button>
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}