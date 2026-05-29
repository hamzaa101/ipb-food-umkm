import { useState, useEffect } from 'react';

// Menambahkan penegasan bahwa fungsi ini akan mengembalikan nilai boolean (true/false)
export function useIsMobile(): boolean {
  // Menambahkan <boolean> untuk memastikan state ini hanya bisa diisi true atau false
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Menambahkan penegasan bahwa fungsi checkIsMobile mengembalikan boolean
    const checkIsMobile = (): boolean => {
      const userAgent = typeof window.navigator === "undefined" ? "" : navigator.userAgent;
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      const isMobileUA = mobileRegex.test(userAgent);
      const isIPadOS = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
      
      // KUNCI PERBAIKAN: Jika lebar layar <= 1024px (seukuran tablet portrait/HP), paksa jadi Mobile
      const isSmallScreen = window.innerWidth <= 1024;

      return isMobileUA || isIPadOS || isSmallScreen;
    };

    setIsMobile(checkIsMobile());

    const handleResize = () => setIsMobile(checkIsMobile());
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
}