import { useEffect, useState } from 'react';
import { Users, Store, TrendingUp, ShoppingBag, AlertCircle } from 'lucide-react';
import { getMetrics, getVerifications, type SystemMetrics } from '../../utils/dummyAdmin';

export default function OverviewTab() {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    setMetrics(getMetrics());
    const verifs = getVerifications();
    setPendingCount(verifs.filter(v => v.status === 'pending').length);
  }, []);

  if (!metrics) return null;

  const formatRupiah = (amount: number) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);

  const cards = [
    { label: 'Total Pengguna', value: metrics.totalUsers.toLocaleString('id-ID'), icon: Users, color: 'bg-blue-500', bgLight: 'bg-blue-50' },
    { label: 'UMKM Aktif', value: metrics.totalUMKM.toString(), icon: Store, color: 'bg-green-500', bgLight: 'bg-green-50' },
    { label: 'Total Pendapatan', value: formatRupiah(metrics.totalRevenue), icon: TrendingUp, color: 'bg-primary', bgLight: 'bg-orange-50' },
    { label: 'Pesanan Aktif', value: metrics.activeOrders.toString(), icon: ShoppingBag, color: 'bg-purple-500', bgLight: 'bg-purple-50' },
  ];

  return (
    <div className="flex-1 p-4 md:p-6 bg-slate-50">
      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
        {cards.map(card => {
          const Icon = card.icon;
          return (
            <div key={card.label} className={`${card.bgLight} rounded-2xl p-4 border border-white shadow-sm`}>
              <div className={`w-10 h-10 ${card.color} rounded-xl flex items-center justify-center mb-3`}>
                <Icon size={20} className="text-white" />
              </div>
              <p className="text-xs font-semibold text-text-secondary-light mb-1">{card.label}</p>
              <p className="text-xl font-bold text-secondary">{card.value}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Alerts */}
      {pendingCount > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shrink-0">
            <AlertCircle size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-secondary text-sm mb-1">Perlu Perhatian</h3>
            <p className="text-text-secondary-light text-sm">
              Ada <span className="font-bold text-primary">{pendingCount} UMKM</span> yang menunggu verifikasi pendaftaran. Silakan periksa tab Verifikasi.
            </p>
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6">
        <h2 className="font-bold text-secondary text-lg mb-4">Aktivitas Terbaru</h2>
        <div className="space-y-4">
          {[
            { text: 'Arif Satria melakukan pesanan di Warung Makan Pak Dadang', time: '10 menit lalu', color: 'bg-blue-400' },
            { text: 'Budi Santoso mendaftarkan toko "Ayam Geprek FMIPA"', time: '25 menit lalu', color: 'bg-green-400' },
            { text: 'Pesanan #ORD005 telah selesai dan diberi rating 5 bintang', time: '1 jam lalu', color: 'bg-yellow-400' },
            { text: 'Siti Aminah mendaftarkan toko "Es Teh Kampus"', time: '2 jam lalu', color: 'bg-green-400' },
            { text: 'Megawati bergabung sebagai pengguna baru', time: '3 jam lalu', color: 'bg-purple-400' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className={`w-2.5 h-2.5 ${item.color} rounded-full mt-1.5 shrink-0`} />
              <div className="flex-1">
                <p className="text-sm text-secondary font-medium">{item.text}</p>
                <p className="text-xs text-text-muted-light mt-0.5">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
