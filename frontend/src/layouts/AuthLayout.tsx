import type { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-bg-dark md:bg-white overflow-hidden">
      
      {/* Left Pane - Image Banner (Desktop Only) */}
      <div className="hidden md:flex md:w-1/2 lg:w-3/5 relative overflow-hidden bg-primary items-center">
        <img 
          src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80" 
          alt="Food Banner" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-black/80 via-black/40 to-transparent"></div>
        
        {/* Branding on Banner */}
        <div className="relative z-10 flex flex-col items-start p-12 lg:p-20 text-white w-full">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 leading-tight">
            Selamat Datang di <br />
            <span className="text-primary">IPB Food Hub</span>
          </h1>
          <p className="text-lg lg:text-xl font-medium text-white/90 max-w-lg leading-relaxed">
            Pesan makanan dari kantin kampus favoritmu tanpa antre, di mana saja dan kapan saja.
          </p>
        </div>
      </div>

      {/* Right Pane - Form Area */}
      <div className="flex flex-col items-center justify-center w-full min-h-screen p-4 md:w-1/2 lg:w-2/5 md:bg-surface-light">
        {/* The Card wrapper (looks like a card on mobile, blends into background on desktop) */}
        <div className="w-full max-w-sm md:max-w-md bg-bg-light md:bg-transparent rounded-4xl md:rounded-none p-8 md:p-10 shadow-xl md:shadow-none">
          {children}
        </div>
        
        {/* Footer Branding (Mobile Only) */}
        <div className="mt-8 text-center md:hidden">
          <h2 className="text-2xl font-bold text-text-primary-dark">IPB Food Hub</h2>
        </div>
      </div>
      
    </div>
  );
}
