// src/pages/AdminPengaturan.tsx
import React, { useState } from "react";
import { User, Shield, Save } from "lucide-react";
import { toast } from "sonner";
import AdminLayout from "../layouts/AdminLayout";
import "../styles/AdminPengaturan.css";

export default function AdminPengaturan() {
  const [adminName, setAdminName] = useState("Admin Utama");
  const [adminEmail, setAdminEmail] = useState("admin@foodhub.edu");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePhoto = () => {
    toast.info("Ubah Foto Profil", {
      description: "Membuka dialog unggah file..."
    });
  };

  const handleSaveProfile = () => {
    toast.success("Profil Diperbarui", {
      description: `Data profil ${adminName} berhasil disimpan.`
    });
  };

  const handleUpdatePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Gagal Memperbarui", {
        description: "Semua kolom password wajib diisi."
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Gagal Memperbarui", {
        description: "Konfirmasi password tidak cocok."
      });
      return;
    }
    
    toast.success("Password Diperbarui", {
      description: "Password akun Anda berhasil diganti."
    });
    
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <AdminLayout>
      <div className="pengaturan-container">

        {/* === CARD PROFIL ADMIN === */}
        <div className="settings-card">
          <div className="settings-header">
            <div className="settings-header-icon">
              <User size={20} />
            </div>
            <div>
              <h3 className="settings-title">Profil Admin</h3>
              <p className="settings-desc">Perbarui informasi profil akun Anda.</p>
            </div>
          </div>
          
          <div className="settings-body">
            
            <div className="avatar-section">
              <img 
                src="https://ui-avatars.com/api/?name=Admin+Utama&background=FF9746&color=fff" 
                alt="Admin Avatar" 
                className="avatar-image"
              />
              <div className="avatar-actions">
                <button onClick={handleChangePhoto} className="btn-change-photo">
                  Ubah Foto
                </button>
                <p className="avatar-hint">Format JPG, PNG maksimal 2MB.</p>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Nama Lengkap</label>
                <input 
                  type="text" 
                  value={adminName}
                  onChange={(e) => setAdminName(e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input 
                  type="email" 
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>
            
            <div className="settings-footer">
               <button onClick={handleSaveProfile} className="btn-action btn-light">
                <Save size={16} />
                <span>Simpan Profil</span>
              </button>
            </div>

          </div>
        </div>

        {/* === CARD KEAMANAN === */}
        <div className="settings-card">
          <div className="settings-header">
            <div className="settings-header-icon">
              <Shield size={20} />
            </div>
            <div>
              <h3 className="settings-title">Keamanan</h3>
              <p className="settings-desc">Kelola password dan pengaturan keamanan.</p>
            </div>
          </div>
          
          <div className="settings-body">
            
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Password Saat Ini</label>
                <input 
                  type="password" 
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className="form-input"
                />
              </div>
              {/* Spacer untuk grid */}
              <div className="hidden md:block"></div>
              
              <div className="form-group">
                <label className="form-label">Password Baru</label>
                <input 
                  type="password" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimal 8 karakter"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Konfirmasi Password Baru</label>
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ulangi password baru"
                  className="form-input"
                />
              </div>
            </div>

            <div className="settings-footer">
              <button onClick={handleUpdatePassword} className="btn-action btn-dark">
                <Shield size={16} />
                <span>Perbarui Password</span>
              </button>
            </div>

          </div>
        </div>
        
      </div>
    </AdminLayout>
  );
}