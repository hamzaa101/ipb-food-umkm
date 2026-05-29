// src/pages/AdminPengguna.tsx
import React, { useState, useRef, useEffect } from "react";
import { Search, UserPlus, Trash2, ShieldAlert, X, UserX, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import AdminLayout from "../layouts/AdminLayout";
import "../styles/AdminPengguna.css";

// =========================================
// CUSTOM DROPDOWN COMPONENT
// =========================================
function CustomSelect({ value, options, onChange }: { value: string, options: string[], onChange: (val: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Tutup dropdown jika user klik di luar area komponen
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Pindahkan item yang terpilih ke posisi paling atas
  const sortedOptions = [value, ...options.filter(opt => opt !== value)];

  return (
    <div className="custom-dropdown-container" ref={dropdownRef}>
      <div 
        className={`custom-dropdown-header ${isOpen ? 'is-open' : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="custom-dropdown-value">{value}</span>
        <ChevronDown size={24} className={`custom-dropdown-icon ${isOpen ? 'is-open' : ''}`} />
      </div>
      
      {isOpen && (
        <div className={`custom-dropdown-list ${isOpen ? 'is-open' : ''}`}>
          {sortedOptions.map((opt) => (
            <div 
              key={opt}
              className={`custom-dropdown-item ${opt === value ? 'is-selected' : ''}`}
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// =========================================
// MAIN COMPONENT
// =========================================
export default function AdminPengguna() {
  const [activeTab, setActiveTab] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "manage">("add");
  const [editingUser, setEditingUser] = useState<any>(null);

  // State Manajemen Value untuk Dropdown Custom
  const [addRole, setAddRole] = useState("Pelanggan");
  const [editAkses, setEditAkses] = useState("Aktif");
  const [editToko, setEditToko] = useState("Aktif");

  const [usersData, setUsersData] = useState([
    { id: 1, name: "Andi Saputra", email: "andi@civitas.univ.edu", role: "Pelanggan", statusAkses: "Aktif", statusToko: null, joinDate: "10 Jan 2026", initials: "AS", color: "avatar-blue" },
    { id: 2, name: "Budi Santoso", email: "budi.s@gmail.com", role: "Penjual", statusAkses: "Aktif", statusToko: "Aktif", joinDate: "15 Feb 2026", initials: "BS", color: "avatar-orange" },
    { id: 3, name: "Siti Rahma", email: "siti.rahma@yahoo.com", role: "Penjual", statusAkses: "Aktif", statusToko: "Suspend", joinDate: "20 Mar 2026", initials: "SR", color: "avatar-emerald" },
    { id: 4, name: "Admin Utama", email: "admin@foodhub.edu", role: "Superadmin", statusAkses: "Aktif", statusToko: null, joinDate: "01 Jan 2025", initials: "AU", color: "avatar-purple" },
    { id: 5, name: "Dina Melati", email: "dina.m@civitas.univ.edu", role: "Pelanggan", statusAkses: "Suspend", statusToko: null, joinDate: "05 Apr 2026", initials: "DM", color: "avatar-rose" },
  ]);

  const handleDelete = (id: number, name: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus pengguna ${name} secara permanen?`)) {
      setUsersData(prev => prev.filter(user => user.id !== id));
      toast.success("Pengguna Dihapus", { description: `Akun ${name} telah berhasil dihapus dari sistem.` });
    }
  };

  const handleManageStatus = (user: any) => {
    setModalMode("manage");
    setEditingUser(user);
    // Sinkronisasikan state dropdown dengan data user yang sedang di-edit
    setEditAkses(user.statusAkses || "Aktif");
    setEditToko(user.statusToko || "Aktif");
    setIsModalOpen(true);
  };

  const handleAddUser = () => {
    setModalMode("add");
    setEditingUser(null);
    // Reset state dropdown ke default saat menambah user baru
    setAddRole("Pelanggan");
    setIsModalOpen(true);
  };

  const handleSaveStatus = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    
    if (modalMode === "add") {
      toast.success("Pengguna Ditambahkan", { description: `Pengguna baru berhasil ditambahkan sebagai ${addRole}.` });
    } else {
      toast.success("Status Diperbarui", { description: `Status pengguna ${editingUser?.name} berhasil diperbarui.` });
    }
  };

  const filteredData = usersData.filter(user => {
    const matchesTab = activeTab === "Semua" ? true : user.role === activeTab;
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          user.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <AdminLayout>
      <div className="user-management-wrapper">
        
        {/* === MODAL FORM PENGGUNA === */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              
              <div className="modal-header">
                <h3 className="modal-title">
                  {modalMode === "add" ? "Undang Pengguna Baru" : "Kelola Status Pengguna"}
                </h3>
                <button type="button" onClick={() => setIsModalOpen(false)} className="modal-close-btn">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSaveStatus}>
                <div className="modal-body">
                  {modalMode === "add" ? (
                    <>
                      <div className="form-group">
                        <label className="form-label">Email Pengguna</label>
                        <input type="email" required className="form-input" placeholder="contoh@email.com" />
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label">Peran Awal</label>
                        {/* MENGGUNAKAN CUSTOM SELECT */}
                        <CustomSelect 
                          options={["Pelanggan", "Penjual", "Admin"]}
                          value={addRole}
                          onChange={setAddRole}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="user-info-card">
                        <p className="user-info-label">Nama Pengguna</p>
                        <p className="user-info-value">{editingUser?.name}</p>
                        <p className="user-info-label">Peran</p>
                        <p className="user-info-value">{editingUser?.role}</p>
                      </div>
                      
                      <div className="form-group">
                        <label className="form-label">Status Akses (Pelanggan)</label>
                        <p className="form-help-text">Mengatur hak akses pengguna untuk login dan memesan.</p>
                        {/* MENGGUNAKAN CUSTOM SELECT */}
                        <CustomSelect 
                          options={["Aktif", "Suspend"]}
                          value={editAkses}
                          onChange={setEditAkses}
                        />
                      </div>

                      {editingUser?.role === "Penjual" && (
                        <div className="form-group" style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                          <label className="form-label">Status Toko</label>
                          <p className="form-help-text">Suspend toko tidak akan mensuspend fasilitas sebagai pengguna umum.</p>
                          {/* MENGGUNAKAN CUSTOM SELECT */}
                          <CustomSelect 
                            options={["Aktif", "Suspend (Toko Ditutup)"]}
                            value={editToko}
                            onChange={setEditToko}
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>
                
                <div className="modal-footer">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-secondary">Batal</button>
                  <button type="submit" className="btn btn-primary">
                    {modalMode === "add" ? "Kirim Undangan" : "Simpan Status"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* === KONTROL TAB & PENCARIAN === */}
        <div className="controls-container">
          <div className="tabs-list">
            {["Semua", "Pelanggan", "Penjual"].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`tab-item ${activeTab === tab ? "active" : ""}`}
              >
                {tab === "Semua" ? "Semua Pengguna" : tab}
              </button>
            ))}
          </div>
          
          <div className="actions-group">
            <div className="search-box">
              <Search className="search-icon" />
              <input 
                type="text" 
                placeholder="Cari pengguna..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            <button onClick={handleAddUser} className="btn btn-dark">
              <UserPlus size={16} />
              <span>Undang</span>
            </button>
          </div>
        </div>

        {/* === TABEL PENGGUNA === */}
        <div className="table-card">
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Pengguna</th>
                  <th>Peran</th>
                  <th>Status Akses</th>
                  <th>Status Toko</th>
                  <th style={{ textAlign: 'right' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? filteredData.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="user-cell">
                        <div className={`user-avatar ${user.color}`}>
                          {user.initials}
                        </div>
                        <div>
                          <p className="user-name">{user.name}</p>
                          <p className="user-email">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="role-cell">
                        {user.role === 'Superadmin' && <ShieldAlert size={14} color="#7e22ce" />}
                        <span className="role-text">{user.role}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${
                        user.statusAkses === 'Aktif' ? 'status-active' : 'status-suspend'
                      }`}>
                        {user.statusAkses}
                      </span>
                    </td>
                    <td>
                      {user.statusToko ? (
                        <span className={`status-badge ${
                          user.statusToko === 'Aktif' ? 'status-active' : 'status-suspend'
                        }`}>
                          {user.statusToko}
                        </span>
                      ) : (
                        <span className="status-none">-</span>
                      )}
                    </td>
                    <td>
                      <div className="actions-cell">
                        <button onClick={() => handleManageStatus(user)} className="action-icon-btn" title="Kelola Status">
                          <UserX size={18} />
                        </button>
                        <button onClick={() => handleDelete(user.id, user.name)} className="action-icon-btn danger" title="Hapus Permanen">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr className="empty-row">
                    <td colSpan={5}>
                      Tidak ada pengguna yang cocok dengan pencarian Anda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="table-footer">
            <p className="footer-text">Menampilkan {filteredData.length} pengguna</p>
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