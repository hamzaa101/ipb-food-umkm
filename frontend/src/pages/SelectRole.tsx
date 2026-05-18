import { Link } from 'react-router-dom';
import { ShoppingBag, Store } from 'lucide-react';
import AuthLayout from '../layouts/AuthLayout';

export default function SelectRole() {
  return (
    <AuthLayout>
      <div className="flex flex-col gap-6">
        <h1 className="text-[32px] font-bold text-secondary">Pilih Mode</h1>

        <div className="flex flex-col gap-4 mt-2">
          {/* Pembeli Button */}
          <Link
            to="/register?role=pembeli"
            className="flex items-center justify-center gap-3 w-full py-4 bg-secondary hover:bg-secondary/90 text-white font-semibold rounded-xl text-lg transition-colors"
          >
            <ShoppingBag size={24} />
            <span>Pembeli</span>
          </Link>

          {/* Penjual Button */}
          <Link
            to="/register?role=penjual"
            className="flex items-center justify-center gap-3 w-full py-4 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl text-lg transition-colors"
          >
            <Store size={24} />
            <span>Penjual</span>
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
