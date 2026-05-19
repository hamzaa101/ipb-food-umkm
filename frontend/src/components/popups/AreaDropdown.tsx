interface AreaDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const areas = [
  'Kantin Sapta FATETA',
  'Kantin Blue Corner FPIK',
  'Kantin Plasma FEMA',
  'Kantin Golden Corner FMIPA',
  'Kantin Pascasarjana'
];

export default function AreaDropdown({ isOpen, onClose }: AreaDropdownProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-30" onClick={onClose} />
      
      {/* Positioned relative to its parent container */}
      <div className="absolute top-14 right-4 sm:right-auto sm:left-105 z-40 w-64 bg-white rounded-2xl shadow-xl border border-border-light overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 p-2">
        <div className="flex flex-col gap-1">
          {areas.map(area => (
            <button 
              key={area}
              onClick={onClose}
              className="px-4 py-3 text-sm font-semibold text-secondary hover:bg-primary hover:text-white rounded-xl transition-colors text-left"
            >
              {area}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
