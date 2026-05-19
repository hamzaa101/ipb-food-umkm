import { useState, useRef } from 'react';

const promos = [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1500&auto=format&fit=crop',
    title: 'Jelajahi Kuliner Di IPB!!!',
    subtitle: 'Temukan makanan favoritmu.',
    bgColor: 'bg-primary'
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1500&auto=format&fit=crop',
    title: 'Promo 25%',
    subtitle: 'Nikmati food Platter dengan harga lebih murah!',
    bgColor: 'bg-success'
  },
  {
    id: 3,
    imageUrl: 'https://images.unsplash.com/photo-1623653387945-2fd25f70bb07?q=80&w=1500&auto=format&fit=crop',
    title: 'Beli 2 gratis 1 !!!',
    subtitle: 'Nikmati jajanan favorit anda dengan harga lebih murah!',
    bgColor: 'bg-[#FF6B6B]'
  }
];

export default function PromoCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const width = scrollRef.current.offsetWidth;
      const newIndex = Math.round(scrollLeft / width);
      setActiveIndex(newIndex);
    }
  };

  return (
    <div className="flex flex-col gap-3 py-4 bg-white">
      {/* Carousel Container */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar px-4 pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {promos.map((promo) => (
          <div 
            key={promo.id} 
            className="w-full shrink-0 snap-center pr-4 last:pr-0"
          >
            <div className={`relative w-full h-40 ${promo.bgColor} rounded-3xl overflow-hidden shadow-sm`}>
              {/* This is a simple mockup of the banner style */}
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 100% 100%, transparent 20%, #000 20%, #000 80%, transparent 80%, transparent)', backgroundSize: '50px 50px' }}></div>
              
              <div className="absolute top-1/2 -translate-y-1/2 left-4 w-3/5 bg-white p-3 rounded-2xl shadow-sm z-10 transform -rotate-2">
                <h3 className="font-extrabold text-secondary text-[16px] leading-tight mb-1">{promo.title}</h3>
                <p className="text-xs text-text-secondary-light font-medium">{promo.subtitle}</p>
              </div>

              <img 
                src={promo.imageUrl} 
                alt={promo.title} 
                className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-48 h-48 object-cover rounded-full border-4 border-white shadow-lg"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2">
        {promos.map((_, idx) => (
          <div 
            key={idx}
            className={`h-2.5 rounded-full transition-all ${
              idx === activeIndex ? 'w-6 bg-text-muted-light' : 'w-2.5 bg-border-light'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
