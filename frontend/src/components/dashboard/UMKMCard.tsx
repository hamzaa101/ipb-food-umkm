import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface UMKMData {
  id: string;
  name: string;
  rating: number;
  totalRatings: number;
  priceRange: string;
  imageUrl: string;
}

interface UMKMCardProps {
  data: UMKMData;
}

export default function UMKMCard({ data }: UMKMCardProps) {
  const navigate = useNavigate();

  return (
    <div className="flex gap-4 p-4 border-b border-border-light hover:bg-surface-200 transition-colors bg-white">
      {/* Image */}
      <img 
        src={data.imageUrl} 
        alt={data.name} 
        className="w-24 h-24 rounded-2xl object-cover shadow-sm shrink-0"
      />
      
      {/* Info */}
      <div className="flex flex-col grow py-1">
        <h3 className="font-semibold text-secondary text-lg leading-tight mb-1">
          {data.name}
        </h3>
        
        <div className="flex items-center gap-1 text-sm mb-1">
          <Star size={16} className="fill-accent text-accent" />
          <span className="font-bold text-text-secondary-light">{data.rating}</span>
          <span className="text-text-muted-light">({data.totalRatings} ratings)</span>
        </div>
        
        <p className="text-sm font-medium text-text-secondary-light mb-3">
          {data.priceRange}
        </p>
        
        <button 
          onClick={() => navigate(`/store/${data.id}`)}
          className="self-end mt-auto px-4 py-1.5 border border-primary text-primary hover:bg-primary hover:text-white rounded-full text-sm font-semibold transition-colors w-max"
        >
          Kunjungi toko
        </button>
      </div>
    </div>
  );
}
