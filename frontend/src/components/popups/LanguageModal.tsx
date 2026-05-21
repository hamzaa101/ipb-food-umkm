import { useState } from 'react';

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: string;
  onSave: (lang: string) => void;
}

const languages = [
  'Bahasa Indonesia',
  'English (United States)',
];

export default function LanguageModal({ isOpen, onClose, currentLanguage, onSave }: LanguageModalProps) {
  const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div 
          className="bg-white rounded-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col">
            {languages.map((lang, index) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`text-left px-6 py-4 font-medium transition-colors ${
                  index !== languages.length - 1 ? 'border-b border-border-light' : ''
                } ${
                  selectedLanguage === lang 
                    ? 'text-secondary bg-surface-200' 
                    : 'text-secondary hover:bg-surface-200'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
          
          <div className="px-6 py-4">
            <button 
              onClick={() => {
                onSave(selectedLanguage);
                onClose();
              }}
              className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-hover transition-colors"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
