import { useState } from 'react';
import { Plus, ChevronDown } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';
import RegisterStoreSuccessModal from '../components/popups/RegisterStoreSuccessModal';

const LOCATIONS = [
  'Kantin Sapta FATETA',
  'Kantin Blue Corner FPIK',
  'Kantin Plasma FEMA',
  'Kantin Golden Corner FMIPA',
  'Kantin Pascasarjana',
];

export default function RegisterStore() {
  const [storeName, setStoreName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [location, setLocation] = useState(LOCATIONS[0]);
  
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeName || !whatsapp || !location) {
      alert('Mohon lengkapi semua data');
      return;
    }
    
    // Here we would typically send data to API
    console.log('Submitting store registration:', { storeName, whatsapp, location });
    
    // Show success modal
    setIsSuccessModalOpen(true);
  };

  return (
    <MainLayout>
      <div className="flex flex-col min-h-screen bg-white">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white px-4 py-6 flex items-center justify-center">
          <h1 className="text-xl font-bold text-secondary">Daftarkan Toko Anda</h1>
        </header>

        <main className="flex-1 px-4 py-6 pb-24 max-w-2xl w-full mx-auto flex flex-col">
          <form onSubmit={handleSubmit} className="flex flex-col h-full flex-1">
            <div className="space-y-6 mb-8">
              
              {/* Banner Upload Placeholder */}
              <div className="w-full h-32 border-2 border-dashed border-border-light rounded-xl flex flex-col items-center justify-center text-text-muted-light cursor-pointer hover:bg-surface-100 transition-colors">
                <Plus size={24} className="mb-2" />
                <span className="text-sm font-medium">Tambahkan foto banner toko anda</span>
              </div>
              
              {/* Nama Toko */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-secondary">Nama Toko</label>
                <input 
                  type="text" 
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  placeholder="Contoh: Nasi Goreng Pak Salman"
                  className="w-full border border-text-secondary-light/40 rounded-xl px-4 py-3 text-secondary focus:outline-none focus:border-primary transition-colors font-medium placeholder:font-normal placeholder:text-text-muted-light"
                />
              </div>
              
              {/* Nomor Whatsapp */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-secondary">Nomor Whatsapp aktif</label>
                <input 
                  type="tel" 
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="Contoh: 081234567890"
                  className="w-full border border-text-secondary-light/40 rounded-xl px-4 py-3 text-secondary focus:outline-none focus:border-primary transition-colors font-medium placeholder:font-normal placeholder:text-text-muted-light"
                />
              </div>
              
              {/* Lokasi Toko */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-secondary">Lokasi Toko</label>
                <div className="relative">
                  <select 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full border border-text-secondary-light/40 rounded-xl px-4 py-3 text-secondary focus:outline-none focus:border-primary transition-colors font-medium appearance-none bg-white cursor-pointer"
                  >
                    {LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary-light">
                    <ChevronDown size={20} />
                  </div>
                </div>
              </div>

            </div>

            {/* Submit Button */}
            <div className="mt-auto pb-8 pt-4">
              <button 
                type="submit"
                disabled={!storeName || !whatsapp || !location}
                className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Ajukan Pendaftaran
              </button>
            </div>
          </form>
        </main>

        <RegisterStoreSuccessModal 
          isOpen={isSuccessModalOpen} 
          onClose={() => setIsSuccessModalOpen(false)} 
        />
      </div>
    </MainLayout>
  );
}
