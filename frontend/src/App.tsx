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

const App: React.FC = () => {
  // Guard Desktop dihapus! Aplikasi sekarang otomatis membiarkan pengguna lewat.
  // Responsivitas ditangani oleh masing-masing halaman CSS (seperti Grid auto-fit).

  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/register-store" element={<RegisterStore />} />

          <Route path="/store/:id" element={<StoreDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/history" element={<OrderHistory />} />
          <Route path="/order/:id" element={<OrderDetail />} /> 
          <Route path="/rating/:id" element={<Rating />} /> 

          {/* Fallback ke home jika rute tidak ditemukan */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;