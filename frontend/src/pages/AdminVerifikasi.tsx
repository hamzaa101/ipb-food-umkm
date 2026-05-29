// src/pages/AdminVerifikasi.tsx
import React, { useState } from "react";
import { Search, Filter, Eye, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";
import AdminLayout from "../layouts/AdminLayout";
import "../styles/AdminVerifikasi.css";

export default function AdminVerifikasi() {
  const [activeTab, setActiveTab] = useState("pending");
  const [searchQuery, setSearchQuery] = useState("");
  
  const [verificationData, setVerificationData] = useState([
    { id: "TK-001", date: "24 Mei 2026", name: "Ayam Geprek Kampus", owner: "Budi Santoso", category: "Makanan Berat", status: "Pending" },
    { id: "TK-002", date: "23 Mei 2026", name: "Kopi Senja Mahasiswa", owner: "Siti Rahma", category: "Minuman", status: "Pending" },
    { id: "TK-003", date: "22 Mei 2026", name: "Warteg Barokah", owner: "Pak Yanto", category: "Makanan Berat", status: "Pending" },
    { id: "TK-004", date: "20 Mei 2026", name: "Seblak Mercon", owner: "Neng Lilis", category: "Cemilan", status: "Disetujui" },
    { id: "TK-005", date: "19 Mei 2026", name: "Jus Buah Segar", owner: "Andi", category: "Minuman", status: "Ditolak" },
  ]);

  const handleApprove = (id: string) => {
    setVerificationData(prev => prev.map(item => 
      item.id === id ? { ...item, status: "Disetujui" } : item
    ));
    toast.success("Toko disetujui", { description: `Pengajuan ${id} berhasil disetujui.` });
  };

  const handleReject = (id: string) => {
    setVerificationData(prev => prev.map(item => 
      item.id === id ? { ...item, status: "Ditolak" } : item
    ));
    toast.error("Toko ditolak", { description: `Pengajuan ${id} telah ditolak.` });
  };

  const handleViewDetail = (name: string) => {
    toast.info(`Melihat Detail: ${name}`, { description: "Fitur modal detail toko sedang dalam pengembangan." });
  };

  const filteredData = verificationData.filter(item => {
    const matchesTab = activeTab === "pending" ? item.status === "Pending" : item.status !== "Pending";
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <AdminLayout>
      <div className="verifikasi-container">
        
        {/* === HEADER CARD (Tabs & Search) === */}
        <div className="verifikasi-header-card">
          <div className="verifikasi-tabs">
            <button 
              onClick={() => setActiveTab("pending")}
              className={`tab-btn ${activeTab === "pending" ? "active" : "inactive"}`}
            >
              Menunggu Verifikasi ({verificationData.filter(i => i.status === "Pending").length})
            </button>
            <button 
              onClick={() => setActiveTab("history")}
              className={`tab-btn ${activeTab === "history" ? "active" : "inactive"}`}
            >
              Riwayat Verifikasi ({verificationData.filter(i => i.status !== "Pending").length})
            </button>
          </div>
          
          <div className="verifikasi-actions">
            <div className="search-wrapper">
              <Search className="search-icon" size={16} />
              <input 
                type="text" 
                placeholder="Cari toko, pemilik, atau ID..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            <button onClick={() => toast.info("Fitur filter akan segera tersedia")} className="filter-btn">
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* === TABLE CARD === */}
        <div className="table-card">
          <div className="table-responsive">
            <table className="verifikasi-table">
              <thead>
                <tr>
                  <th>ID Pengajuan</th>
                  <th>Tanggal</th>
                  <th>Nama Toko</th>
                  <th>Kategori</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? filteredData.map((row) => (
                  <tr key={row.id}>
                    <td style={{ fontWeight: 500 }}>{row.id}</td>
                    <td style={{ color: 'var(--text-secondary)' }}>{row.date}</td>
                    <td>
                      <p className="cell-name">{row.name}</p>
                      <p className="cell-owner">{row.owner}</p>
                    </td>
                    <td>{row.category}</td>
                    <td>
                      <span className={`status-badge ${
                        row.status === 'Pending' ? 'status-pending' : 
                        row.status === 'Disetujui' ? 'status-approved' : 'status-rejected'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-group">
                        <button onClick={() => handleViewDetail(row.name)} className="action-btn btn-eye" title="Detail">
                          <Eye size={18} />
                        </button>
                        {row.status === 'Pending' && (
                          <>
                            <button onClick={() => handleApprove(row.id)} className="action-btn btn-check" title="Setujui">
                              <CheckCircle size={18} />
                            </button>
                            <button onClick={() => handleReject(row.id)} className="action-btn btn-close" title="Tolak">
                              <XCircle size={18} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '48px', color: 'var(--text-secondary)' }}>
                      Tidak ada data yang ditemukan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* PAGINATION FOOTER */}
          <div className="pagination-footer">
            <p style={{ margin: 0 }}>Menampilkan {filteredData.length} pengajuan</p>
            <div className="pagination-controls">
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