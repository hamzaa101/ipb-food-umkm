import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Register from './pages/Register';
import SelectRole from './pages/SelectRole';
import RegisterSuccess from './pages/RegisterSuccess';
import Dashboard from './pages/Dashboard';
import { CartProvider } from './contexts/CartContext';

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          {/* Halaman pertama kali aplikasi dibuka */}
          <Route path="/" element={<Welcome />} />

          {/* Rute Autentikasi */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/role" element={<SelectRole />} />
          <Route path="/register/success" element={<RegisterSuccess />} />

          {/* Halaman Utama setelah Login */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}