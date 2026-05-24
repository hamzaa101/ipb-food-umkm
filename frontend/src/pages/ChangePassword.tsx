import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

export default function ChangePassword() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSave = () => {
    // Validate and save
    if (newPassword && newPassword === confirmPassword) {
      console.log('Password changed successfully');
      alert('Kata sandi berhasil diubah');
      navigate('/profile');
    } else {
      alert('Kata sandi tidak cocok!');
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col min-h-screen bg-white">
        {/* Header */}
      <header className="sticky top-0 z-40 bg-white px-4 py-4 flex items-center justify-center">
        <button 
          onClick={() => navigate(-1)}
          className="absolute left-4 p-2 hover:bg-surface-200 rounded-full transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <h1 className="text-xl font-bold text-secondary">Ubah Kata Sandi</h1>
      </header>

      <main className="flex-1 px-6 py-8 flex flex-col items-center max-w-2xl w-full mx-auto">
        <div className="w-full space-y-6 mb-10">
          {/* New Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-secondary">Kata Sandi Baru</label>
            <div className="relative">
              <input 
                type={showNewPassword ? "text" : "password"} 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="***********"
                className="w-full border border-text-secondary-light/40 rounded-xl pl-4 pr-12 py-3 text-secondary focus:outline-none focus:border-primary transition-colors"
              />
              <button 
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted-light hover:text-secondary transition-colors"
              >
                {showNewPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>
          
          {/* Confirm Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-secondary">Masukan Kembali Kata Sandi Baru</label>
            <div className="relative">
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="***********"
                className="w-full border border-text-secondary-light/40 rounded-xl pl-4 pr-12 py-3 text-secondary focus:outline-none focus:border-primary transition-colors"
              />
              <button 
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted-light hover:text-secondary transition-colors"
              >
                {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>
        </div>

        <button 
          onClick={handleSave}
          disabled={!newPassword || !confirmPassword}
          className="w-full max-w-50 bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Simpan
        </button>
      </main>
      </div>
    </MainLayout>
  );
}
