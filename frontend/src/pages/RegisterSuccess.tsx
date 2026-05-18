import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import AuthLayout from '../layouts/AuthLayout';

export default function RegisterSuccess() {
  return (
    <AuthLayout>
      <div className="flex flex-col items-center text-center gap-4 py-4">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mb-2">
          <Check size={32} className="text-white" strokeWidth={3} />
        </div>

        {/* Text Content */}
        <h1 className="text-[28px] font-bold text-secondary leading-tight">
          Pendaftaran Berhasil!
        </h1>
        <p className="text-text-secondary-light px-2 mb-4">
          Silahkan masuk untuk menggunakan<br />IPB Food HUB
        </p>

        {/* Action Button */}
        <Link
          to="/login"
          className="w-full py-3.5 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl text-lg transition-colors mt-2"
        >
          Masuk
        </Link>
      </div>
    </AuthLayout>
  );
}
