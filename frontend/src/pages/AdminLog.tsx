// src/pages/AdminLog.tsx
import React, { useState } from "react";
import { Store, User, Settings, CheckCircle, AlertTriangle, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import AdminLayout from "../layouts/AdminLayout";
import "../styles/AdminLog.css";

export default function AdminLog() {
  const [isLoading, setIsLoading] = useState(false);
  
  // Data State
  const [activities, setActivities] = useState([
    {
      id: 1,
      user: "Admin Utama",
      role: "Superadmin",
      action: "Menyetujui pendaftaran toko baru",
      target: "Warteg Barokah",
      time: "10 menit yang lalu",
      icon: Store,
      colorClass: "icon-success", // Disesuaikan dengan CSS Variables
    },
    {
      id: 2,
      user: "Sistem",
      role: "System",
      action: "Backup database harian selesai",
      target: "Database Server",
      time: "1 jam yang lalu",
      icon: CheckCircle,
      colorClass: "icon-info",
    },
    {
      id: 3,
      user: "Admin Support",
      role: "Admin",
      action: "Menonaktifkan akun pengguna",
      target: "Dina Melati (Pelanggaran TOA)",
      time: "3 jam yang lalu",
      icon: User,
      colorClass: "icon-danger",
    },
    {
      id: 4,
      user: "Admin Utama",
      role: "Superadmin",
      action: "Mengubah pengaturan komisi platform",
      target: "Setting > Komisi (10% -> 12%)",
      time: "Kemarin, 14:30",
      icon: Settings,
      colorClass: "icon-purple",
    },
    {
      id: 5,
      user: "Sistem",
      role: "System",
      action: "Terdeteksi anomali transaksi",
      target: "Toko Ayam Geprek Kampus (Lonjakan 500%)",
      time: "Kemarin, 09:15",
      icon: AlertTriangle,
      colorClass: "icon-warning",
    },
  ]);

  const handleExport = () => {
    toast.success("Mengekspor Log", {
      description: "Log aktivitas sedang diunduh ke perangkat Anda..."
    });
  };

  const handleLoadMore = () => {
    setIsLoading(true);
    // Simulasi loading API
    setTimeout(() => {
      setActivities(prev => [
        ...prev,
        {
          id: prev.length + 1,
          user: "Admin Support",
          role: "Admin",
          action: "Menjawab tiket bantuan",
          target: "Tiket #1092 - Lupa Password",
          time: "2 Hari yang lalu",
          icon: User,
          colorClass: "icon-info",
        }
      ]);
      setIsLoading(false);
    }, 800);
  };

  return (
    <AdminLayout>
      <div className="log-wrapper">
        <div className="log-card">
          
          <div className="log-header">
            <h3 className="log-title">Aktivitas Terbaru</h3>
            <button onClick={handleExport} className="btn-text-export">
              Export Log
            </button>
          </div>
          
          <div className="log-body">
            <div className="timeline-container">
              {activities.map((activity) => (
                <div key={activity.id} className="timeline-item">
                  
                  {/* Lingkaran Ikon */}
                  <span className={`timeline-icon-wrapper ${activity.colorClass}`}>
                    <activity.icon size={20} />
                  </span>
                  
                  {/* Kotak Konten */}
                  <div className="timeline-content-box">
                    <div className="timeline-content-header">
                      <div className="user-info">
                        <span className="user-name">{activity.user}</span>
                        <span className="user-role-badge">{activity.role}</span>
                      </div>
                      <span className="time-text">{activity.time}</span>
                    </div>
                    
                    <p className="action-text">{activity.action}</p>
                    
                    <div className="target-badge">
                      <ArrowRight size={14} color="var(--text-muted)" />
                      <span>{activity.target}</span>
                    </div>
                  </div>

                </div>
              ))}
            </div>
            
            {/* Tombol Load More */}
            <div className="load-more-container">
              <button 
                onClick={handleLoadMore} 
                disabled={isLoading}
                className="btn-load-more"
              >
                {isLoading ? "Memuat..." : "Muat Lebih Banyak"}
              </button>
            </div>

          </div>
        </div>
      </div>
    </AdminLayout>
  );
}