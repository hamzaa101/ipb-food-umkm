interface CategoryDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const foodTypes = ['Minuman', 'Mie', 'Dessert', 'Camilan', 'Ayam', 'Nasi'];

export default function CategoryDropdown({ isOpen, onClose }: CategoryDropdownProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-30" onClick={onClose} />
      
      {/* Positioned relative to its parent container (CategoryTabs) */}
      <div className="absolute top-14 right-4 sm:right-auto sm:left-80 z-40 w-64 bg-white rounded-2xl shadow-xl border border-border-light overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 p-2">
        <div className="grid grid-cols-2 gap-2">
          {foodTypes.map(type => (
            <button 
              key={type}
              onClick={onClose}
              className="px-3 py-2 text-sm font-semibold text-secondary hover:bg-primary hover:text-white rounded-xl transition-colors text-center"
            >
              {type}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
