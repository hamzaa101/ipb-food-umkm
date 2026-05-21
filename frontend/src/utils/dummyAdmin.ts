export interface SystemMetrics {
  totalUsers: number;
  totalUMKM: number;
  totalRevenue: number;
  activeOrders: number;
}

export interface VerificationRequest {
  id: string;
  storeName: string;
  ownerName: string;
  faculty: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'seller' | 'admin';
  status: 'active' | 'suspended';
  joinDate: string;
}

const initialMetrics: SystemMetrics = {
  totalUsers: 1245,
  totalUMKM: 87,
  totalRevenue: 15450000,
  activeOrders: 32,
};

const initialVerifications: VerificationRequest[] = [
  { id: 'v1', storeName: 'Ayam Geprek FMIPA', ownerName: 'Budi Santoso', faculty: 'FMIPA', submittedAt: '16 Feb 2026 09:30', status: 'pending' },
  { id: 'v2', storeName: 'Es Teh Kampus', ownerName: 'Siti Aminah', faculty: 'FEMA', submittedAt: '15 Feb 2026 14:15', status: 'pending' },
  { id: 'v3', storeName: 'Nasi Kuning Pagi', ownerName: 'Agus Salim', faculty: 'FATETA', submittedAt: '15 Feb 2026 08:00', status: 'pending' },
];

const initialUsers: SystemUser[] = [
  { id: 'u1', name: 'Arif Satria', email: 'arif@apps.ipb.ac.id', role: 'buyer', status: 'active', joinDate: '01 Jan 2026' },
  { id: 'u2', name: 'Budi Santoso', email: 'budi@apps.ipb.ac.id', role: 'seller', status: 'active', joinDate: '05 Jan 2026' },
  { id: 'u3', name: 'Siti Aminah', email: 'siti@apps.ipb.ac.id', role: 'seller', status: 'active', joinDate: '10 Jan 2026' },
  { id: 'u4', name: 'Joko Widodo', email: 'joko@apps.ipb.ac.id', role: 'buyer', status: 'suspended', joinDate: '12 Jan 2026' },
  { id: 'u5', name: 'Megawati', email: 'mega@apps.ipb.ac.id', role: 'buyer', status: 'active', joinDate: '15 Jan 2026' },
  { id: 'u6', name: 'Prabowo', email: 'prabowo@apps.ipb.ac.id', role: 'seller', status: 'active', joinDate: '20 Jan 2026' },
];

export const getMetrics = (): SystemMetrics => {
  const data = localStorage.getItem('admin_metrics');
  if (data) return JSON.parse(data);
  localStorage.setItem('admin_metrics', JSON.stringify(initialMetrics));
  return initialMetrics;
};

export const getVerifications = (): VerificationRequest[] => {
  const data = localStorage.getItem('admin_verifications');
  if (data) return JSON.parse(data);
  localStorage.setItem('admin_verifications', JSON.stringify(initialVerifications));
  return initialVerifications;
};

export const updateVerificationStatus = (id: string, status: 'approved' | 'rejected') => {
  const requests = getVerifications();
  const index = requests.findIndex(r => r.id === id);
  if (index !== -1) {
    requests[index].status = status;
    localStorage.setItem('admin_verifications', JSON.stringify(requests));
    
    // If approved, update metrics
    if (status === 'approved') {
      const metrics = getMetrics();
      metrics.totalUMKM += 1;
      localStorage.setItem('admin_metrics', JSON.stringify(metrics));
    }
  }
};

export const getUsers = (): SystemUser[] => {
  const data = localStorage.getItem('admin_users');
  if (data) return JSON.parse(data);
  localStorage.setItem('admin_users', JSON.stringify(initialUsers));
  return initialUsers;
};

export const toggleUserStatus = (id: string) => {
  const users = getUsers();
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    users[index].status = users[index].status === 'active' ? 'suspended' : 'active';
    localStorage.setItem('admin_users', JSON.stringify(users));
  }
};
