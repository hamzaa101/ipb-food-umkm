// src/pages/AdminDashboard.tsx
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { 
  Users, 
  Store, 
  TrendingUp, 
  ChefHat, 
  Coffee, 
  Pizza,
  Sandwich,
  Utensils
} from "lucide-react";
import AdminLayout from "../layouts/AdminLayout"; // Import AdminLayout
import "../styles/Admin.css"; // Sesuaikan path CSS

export default function AdminDashboard() {
  const navigate = useNavigate();

  const summaryData = [
    {
      title: "Total Pelanggan",
      value: "1,240",
      icon: Users,
      trend: "+12% dari bulan lalu",
      trendUp: true
    },
    {
      title: "Total Toko Aktif",
      value: "45",
      icon: Store,
      trend: "+3 toko baru",
      trendUp: true
    },
    {
      title: "Estimasi Transaksi",
      value: "Rp 12.500.000",
      icon: TrendingUp,
      trend: "+8.5% dari bulan lalu",
      trendUp: true
    }
  ];

  const verificationData = [
    { id: 1, date: "24 Mei 2026", name: "Ayam Geprek Kampus", owner: "Budi Santoso" },
    { id: 2, date: "23 Mei 2026", name: "Kopi Senja Civitas", owner: "Siti Rahma" },
    { id: 3, date: "22 Mei 2026", name: "Warteg Barokah", owner: "Pak Yanto" },
  ];

  const topShops = [
    { id: 1, name: "Nasi Goreng Gila", sales: "Rp 3.200.000", icon: ChefHat, bg: "bg-orange-100", color: "text-orange-600" },
    { id: 2, name: "Ayam Geprek Bensu", sales: "Rp 2.850.000", icon: Utensils, bg: "bg-red-100", color: "text-red-600" },
    { id: 3, name: "Es Teh Poci Kantin", sales: "Rp 1.900.000", icon: Coffee, bg: "bg-amber-100", color: "text-amber-600" },
    { id: 4, name: "Pizza Mini Kampus", sales: "Rp 1.450.000", icon: Pizza, bg: "bg-yellow-100", color: "text-yellow-600" },
    { id: 5, name: "Toast & Sandwich", sales: "Rp 1.100.000", icon: Sandwich, bg: "bg-stone-100", color: "text-stone-600" },
  ];

  const handleReviewClick = (name: string) => {
    toast(`Mengarahkan ke halaman verifikasi untuk ${name}`, {
      description: "Anda dapat melihat detail lengkapnya di sana."
    });
    // Arahkan ke rute admin verifikasi
    navigate("/admin/verifikasi");
  };

  return (
    <AdminLayout>
      <div className="dashboard-container">
        {/* Summary Cards */}
        <div className="summary-cards">
          {summaryData.map((item, index) => (
            <div key={index} className="summary-card">
              <div className="summary-card-header">
                <h3 className="summary-card-title">{item.title}</h3>
                <div className="summary-card-icon-wrapper">
                  <item.icon className="summary-card-icon" />
                </div>
              </div>
              <div className="summary-card-content">
                <p className="summary-card-value">{item.value}</p>
                <p className={`summary-card-trend ${item.trendUp ? 'trend-up' : 'trend-down'}`}>
                  {item.trend}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Data Section */}
        <div className="dashboard-data-section">
          
          {/* Left Column - Verifikasi Table */}
          <div className="verification-table-card">
            <div className="card-header">
              <h3 className="card-title">Toko Menunggu Verifikasi</h3>
            </div>
            <div className="table-container">
              <table className="verification-table">
                <thead>
                  <tr className="table-head-row">
                    <th className="table-header-cell">Tanggal</th>
                    <th className="table-header-cell">Nama Toko</th>
                    <th className="table-header-cell">Pemilik</th>
                    <th className="table-header-cell text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {verificationData.map((row) => (
                    <tr key={row.id} className="table-row">
                      <td className="table-cell cell-date">{row.date}</td>
                      <td className="table-cell cell-name">{row.name}</td>
                      <td className="table-cell cell-owner">{row.owner}</td>
                      <td className="table-cell text-right">
                        <button onClick={() => handleReviewClick(row.name)} className="review-btn">
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="card-footer">
              <button onClick={() => navigate("/admin/verifikasi")} className="view-all-btn">
                Lihat Semua Pengajuan
              </button>
            </div>
          </div>

          {/* Right Column - Top 5 Toko */}
          <div className="top-shops-card">
            <div className="card-header">
              <h3 className="card-title">Top 5 Toko Terlaris</h3>
            </div>
            <div className="top-shops-list">
              {topShops.map((shop, i) => (
               <div key={shop.id} className="top-shop-item">
                 <div className={`top-shop-icon-wrapper ${shop.bg} ${shop.color}`}>
                   <shop.icon className="top-shop-icon" />
                 </div>
                 <div className="top-shop-info">
                   <p className="top-shop-name">{shop.name}</p>
                   <p className="top-shop-rank">Penjualan Terbaik #{i + 1}</p>
                 </div>
                 <div className="top-shop-sales-wrapper">
                   <p className="top-shop-sales">{shop.sales}</p>
                 </div>
               </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}