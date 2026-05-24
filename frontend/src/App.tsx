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
import StoreDetail from './pages/StoreDetail';
import Cart from './pages/Cart';
import { CartProvider } from './contexts/CartContext';

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          {/* Halaman pertama kali aplikasi dibuka */}
          <Route path="/" element={<Welcome />} />

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/role" element={<SelectRole />} />
          <Route path="/register/success" element={<RegisterSuccess />} />

          {/* Buyer Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Profile */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/register-store" element={<RegisterStore />} />

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