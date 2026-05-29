import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

// Import Pages
import Onboarding from './pages/Onboarding';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
import RegisterStore from './pages/RegisterStore';
import StoreDetail from './pages/StoreDetail';
import Cart from './pages/Cart';
import OrderHistory from './pages/OrderHistory';
import OrderDetail from './pages/OrderDetail';
import Rating from './pages/Rating';

// IMPORT HALAMAN BARU PENJUAL
import MerchantDashboard from './pages/MerchantDashboard';
import MenuForm from './pages/MenuForm';
import StoreProfile from './pages/StoreProfile';
import EditStoreInfo from './pages/EditStoreInfo'; // Import BARU
import EditSchedule from './pages/EditSchedule';   // Import BARU
import StoreStatistics from './pages/StoreStatistics'; // Import BARU

// IMPORT HALAMAN ADMIN
import AdminDashboard from './pages/AdminDashboard'; // Import HALAMAN ADMIN
import AdminVerifikasi from './pages/AdminVerifikasi';
import AdminPengguna from './pages/AdminPengguna';
import AdminTransaksi from './pages/AdminTransaksi';
import AdminLog from './pages/AdminLog';
import AdminPengaturan from './pages/AdminPengaturan';

const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* RUTE PEMBELI */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/register-store" element={<RegisterStore />} />
          <Route path="/store/:id" element={<StoreDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/history" element={<OrderHistory />} />
          <Route path="/order/:id" element={<OrderDetail />} /> 
          <Route path="/rating/:id" element={<Rating />} /> 

          {/* RUTE PENJUAL */}
          <Route path="/merchant" element={<MerchantDashboard />} />
          <Route path="/merchant/menu/add" element={<MenuForm />} />
          <Route path="/merchant/menu/edit/:id" element={<MenuForm />} />
          <Route path="/merchant/store-profile" element={<StoreProfile />} />
          <Route path="/merchant/profile/edit-info" element={<EditStoreInfo />} />
          <Route path="/merchant/profile/edit-schedule" element={<EditSchedule />} />
          <Route path="/merchant/profile/statistics" element={<StoreStatistics />} />

          {/* RUTE ADMIN */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/verifikasi" element={<AdminVerifikasi />} />
          <Route path="/admin/pengguna" element={<AdminPengguna />} />
          <Route path="/admin/transaksi" element={<AdminTransaksi />} />
          <Route path="/admin/log" element={<AdminLog />} />
          <Route path="/admin/pengaturan" element={<AdminPengaturan />} />

          {/* Fallback ke home jika rute tidak ditemukan */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;