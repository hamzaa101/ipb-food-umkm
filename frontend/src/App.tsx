import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import SelectRole from './pages/SelectRole';
import RegisterSuccess from './pages/RegisterSuccess';
import Dashboard from './pages/Dashboard';
import Placeholder from './pages/Placeholder';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
import RegisterStore from './pages/RegisterStore';
import OrderHistory from './pages/OrderHistory';
import OrderDetail from './pages/OrderDetail';
import RateOrder from './pages/RateOrder';
import StoreDetail from './pages/StoreDetail';
import Cart from './pages/Cart';
import SellerDashboard from './pages/SellerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import { CartProvider } from './contexts/CartContext';

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route path="/" element={<Welcome />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/role" element={<SelectRole />} />
          <Route path="/register/success" element={<RegisterSuccess />} />
          
          {/* Buyer Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Seller Dashboard */}
          <Route path="/seller/dashboard" element={<SellerDashboard />} />

          {/* Admin Dashboard */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* Profile */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/register-store" element={<RegisterStore />} />

          {/* Orders */}
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
          <Route path="/orders/:id/rate" element={<RateOrder />} />

          {/* Store & Cart */}
          <Route path="/store/:id" element={<StoreDetail />} />
          <Route path="/cart" element={<Cart />} />

          {/* Placeholders */}
          <Route path="/placeholder" element={<Placeholder />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}
