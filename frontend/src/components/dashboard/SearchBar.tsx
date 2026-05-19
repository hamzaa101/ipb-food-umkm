import { Search } from 'lucide-react';

export default function SearchBar() {
  return (
    <div className="px-4 py-2">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary-light" size={20} />
        <input
          type="text"
          placeholder="Mau makan apa hari ini?"
          className="w-full pl-12 pr-4 py-3 bg-white border border-border-light rounded-full text-text-primary-light placeholder:text-text-muted-light focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all shadow-sm"
        />
      </div>
    </div>
  );
}
