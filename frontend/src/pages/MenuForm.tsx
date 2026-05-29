import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/MenuForm.css';

interface Category {
  id: string;
  name: string;
}

const MenuForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const isEditPage = location.pathname.includes('edit');

  // --- STATE UTAMA ---
  // Jika ini halaman edit, kita mulai dengan Mode Read-Only (Hanya Baca)
  const [isReadOnly, setIsReadOnly] = useState<boolean>(isEditPage);
  const [image, setImage] = useState<string | null>(isEditPage ? 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=200&h=200&fit=crop' : null);
  const [menuName, setMenuName] = useState<string>(isEditPage ? 'Nasi Goreng' : '');
  const [price, setPrice] = useState<string>(isEditPage ? '20.000' : '');
  
  // --- STATE KATEGORI ---
  const [availableCategories, setAvailableCategories] = useState<Category[]>([
    { id: '1', name: 'Nasi Goreng' },
    { id: '2', name: 'Rekomendasi Utama' },
    { id: '3', name: 'Mie Goreng/Rebus' },
    { id: '4', name: 'Cemilan' },
    { id: '5', name: 'Minuman' },
  ]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(isEditPage ? ['1', '2'] : []);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isAddingCategory, setIsAddingCategory] = useState<boolean>(false);
  const [newCategoryName, setNewCategoryName] = useState<string>('');

  // --- STATE MODAL ---
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
        setIsAddingCategory(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isReadOnly) return;
    const value = e.target.value.replace(/\D/g, '');
    if (value) {
      const formatted = new Intl.NumberFormat('id-ID').format(parseInt(value));
      setPrice(formatted);
    } else {
      setPrice('');
    }
  };

  const toggleCategory = (id: string) => {
    if (isReadOnly) return;
    if (selectedCategories.includes(id)) {
      setSelectedCategories(selectedCategories.filter(catId => catId !== id));
    } else {
      setSelectedCategories([...selectedCategories, id]);
    }
  };

  const saveNewCategory = () => {
    if (newCategoryName.trim() === '') return;
    const newCat = { id: Date.now().toString(), name: newCategoryName.trim() };
    setAvailableCategories([...availableCategories, newCat]);
    setSelectedCategories([...selectedCategories, newCat.id]);
    setNewCategoryName('');
    setIsAddingCategory(false);
  };

  return (
    <div className="mf-layout">
      <div className="mf-mobile-wrapper">
        
        <header className="mf-header">
          <h2>{isEditPage ? 'Detail Menu' : 'Menambahkan Menu'}</h2>
        </header>

        <div className="mf-content">
          {/* UPLOAD FOTO */}
          <div className="mf-image-section">
            <div className={`mf-image-box ${isReadOnly ? 'readonly' : ''}`} onClick={() => !isReadOnly && setImage('https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=200&h=200&fit=crop')}>
              {image ? (
                <img src={image} alt="Menu" className="mf-uploaded-image" />
              ) : (
                <div className="mf-upload-placeholder">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 6L12 18" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/><path d="M18 12L6 12" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span>Tambahkan<br/>foto menu</span>
                </div>
              )}
            </div>
          </div>

          <div className="mf-form-group">
            <label>Nama Menu</label>
            <input 
              type="text" 
              className={`mf-input ${isReadOnly ? 'readonly' : ''}`} 
              value={menuName} 
              readOnly={isReadOnly}
              onChange={(e) => setMenuName(e.target.value)} 
            />
          </div>

          <div className="mf-form-group">
            <label>Harga</label>
            <input 
              type="text" 
              className={`mf-input ${isReadOnly ? 'readonly' : ''}`} 
              value={price} 
              readOnly={isReadOnly}
              onChange={handlePriceChange} 
            />
          </div>

          <div className="mf-form-group" ref={dropdownRef}>
            <label>Kategori</label>
            <div 
              className={`mf-category-select ${isDropdownOpen ? 'is-open' : ''} ${isReadOnly ? 'readonly' : ''}`}
              onClick={() => !isReadOnly && setIsDropdownOpen(!isDropdownOpen)}
            >
              <div className="mf-selected-badges">
                {selectedCategories.map(catId => {
                  const cat = availableCategories.find(c => c.id === catId);
                  if (!cat) return null;
                  return (
                    <span key={cat.id} className="mf-badge">
                      {cat.name}
                      {!isReadOnly && (
                        <svg onClick={(e) => { e.stopPropagation(); toggleCategory(cat.id); }} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M10.5 3.5L3.5 10.5" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M3.5 3.5L10.5 10.5" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </span>
                  );
                })}
              </div>
              <svg className="mf-chevron" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M24 12L16 20L8 12" stroke="#6B7280" strokeWidth="2.66667" strokeLinecap="round"/>
              </svg>
            </div>

            {isDropdownOpen && !isReadOnly && (
              <div className="mf-dropdown-menu">
                {availableCategories.map(cat => (
                  <div key={cat.id} className="mf-dropdown-item" onClick={() => toggleCategory(cat.id)}>
                    <span>{cat.name}</span>
                    {selectedCategories.includes(cat.id) ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                        <path d="M6.66667 18.6667L10.9775 21.8998C11.549 22.3284 12.357 22.2304 12.8094 21.6774L24 8" stroke="#243D67" strokeWidth="2.67" strokeLinecap="round"/>
                      </svg>
                    ) : (
                      <svg onClick={(e) => { e.stopPropagation(); setAvailableCategories(availableCategories.filter(c => c.id !== cat.id)); }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M18 12L6 12" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    )}
                  </div>
                ))}
                <div className="mf-dropdown-item mf-add-custom" onClick={() => setIsAddingCategory(true)}>
                  {!isAddingCategory ? (
                    <><span>Tambahkan Kategori</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 6L12 18" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/><path d="M18 12L6 12" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round"/></svg></>
                  ) : (
                    <div className="mf-custom-input-box" onClick={(e) => e.stopPropagation()}>
                      <input type="text" autoFocus placeholder="Kategori baru..." value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && saveNewCategory()} />
                      <svg onClick={saveNewCategory} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M6.66667 18.6667L10.9775 21.8998C11.549 22.3284 12.357 22.2304 12.8094 21.6774L24 8" stroke="#243D67" strokeWidth="2.67" strokeLinecap="round"/></svg>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* BOTTOM ACTION BAR */}
        <div className="mf-bottom-bar">
          <div className="mf-bottom-content">
            {!isEditPage ? (
              // Mode Tambah Menu Baru
              <button className="mf-btn-primary-large" onClick={() => setShowConfirmModal(true)}>Tambahkan Menu</button>
            ) : (
              <div className="mf-btn-group">
                {isReadOnly ? (
                  // Mode Detail (Read-Only)
                  <>
                    <button className="mf-btn-danger" onClick={() => setShowDeleteModal(true)}>Hapus</button>
                    <button className="mf-btn-primary-outline" onClick={() => setIsReadOnly(false)}>Edit</button>
                  </>
                ) : (
                  // Mode Sedang Mengedit (Active Edit)
                  <>
                    <button className="mf-btn-cancel-outline" onClick={() => setIsReadOnly(true)}>Batal</button>
                    <button className="mf-btn-primary-filled" onClick={() => setShowConfirmModal(true)}>Simpan</button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* MODAL KONFIRMASI (TAMBAH / SIMPAN) */}
        {showConfirmModal && (
          <div className="mf-modal-overlay">
            <div className="mf-modal-box">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path d="M28 12C29.8407 12 31.6566 12.4234 33.3075 13.2375C34.9583 14.0516 36.3997 15.2346 37.5202 16.6949C38.6408 18.1552 39.4103 19.8536 39.7694 21.6589C40.1285 23.4642 40.0675 25.3279 39.5911 27.1058C39.1147 28.8838 38.2357 30.5283 37.0221 31.9122C35.8085 33.296 34.2927 34.3822 32.5922 35.0866C30.8917 35.7909 29.0519 36.0947 27.2152 35.9743C25.3784 35.8539 23.594 35.3126 22 34.3923" stroke="#FF9746" strokeWidth="4" strokeLinecap="round"/>
                <path d="M14 38V10" stroke="#FF9746" strokeWidth="4"/><path d="M20 10V19C20 20.6569 18.6569 22 17 22C15.3431 22 14 20.6569 14 19V10" stroke="#FF9746" strokeWidth="4"/><path d="M8 10V19C8 20.6569 9.34315 22 11 22C12.6569 22 14 20.6569 14 19V10" stroke="#FF9746" strokeWidth="4"/>
              </svg>
              <h3>{isEditPage ? 'Simpan Perubahan?' : 'Tambahkan menu?'}</h3>
              <p>Pastikan informasi sudah benar.<br/>Informasi dapat diubah kembali.</p>
              <div className="mf-modal-actions">
                <button className="mf-btn-secondary-modal" onClick={() => setShowConfirmModal(false)}>Kembali</button>
                <button className="mf-btn-primary-modal" onClick={() => navigate('/merchant')}>
                  {isEditPage ? 'Simpan' : 'Tambah'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MODAL HAPUS */}
        {showDeleteModal && (
          <div className="mf-modal-overlay">
            <div className="mf-modal-box">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path d="M24 42C21.6362 42 19.2956 41.5344 17.1117 40.6298C14.9278 39.7252 12.9435 38.3994 11.2721 36.7279C9.60062 35.0565 8.27475 33.0722 7.37017 30.8883C6.46558 28.7044 6 26.3638 6 24C6 21.6362 6.46558 19.2956 7.37017 17.1117C8.27475 14.9278 9.60063 12.9435 11.2721 11.2721C12.9435 9.60062 14.9278 8.27475 17.1117 7.37017C19.2956 6.46558 21.6362 6 24 6C26.3638 6 28.7044 6.46558 30.8883 7.37017C33.0722 8.27476 35.0565 9.60063 36.7279 11.2721C38.3994 12.9435 39.7252 14.9278 40.6298 17.1117C41.5344 19.2956 42 21.6362 42 24C42 26.3638 41.5344 28.7044 40.6298 30.8883C39.7252 33.0722 38.3994 35.0565 36.7279 36.7279C35.0565 38.3994 33.0722 39.7252 30.8883 40.6298C28.7044 41.5344 26.3638 42 24 42L24 42Z" stroke="#EF4444" strokeWidth="4" strokeLinecap="round"/>
                <path d="M18 18L30 30" stroke="#EF4444" strokeWidth="4" strokeLinecap="round"/><path d="M30 18L18 30" stroke="#EF4444" strokeWidth="4" strokeLinecap="round"/>
              </svg>
              <h3>Hapus Menu?</h3>
              <p>Aksi tidak dapat dipulihkan</p>
              <div className="mf-modal-actions">
                <button className="mf-btn-secondary-modal" onClick={() => setShowDeleteModal(false)}>Kembali</button>
                <button className="mf-btn-danger-modal" onClick={() => navigate('/merchant')}>Hapus</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default MenuForm;