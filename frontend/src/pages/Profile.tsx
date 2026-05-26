import React, { useState, ChangeEvent, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Profile.css';

const Profile: React.FC = () => {
  const navigate = useNavigate();

  // Mode Edit Toggle
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // State Data Profil
  const [name, setName] = useState<string>('Arif Satria');
  const [phone, setPhone] = useState<string>('081234567890');

  // State Modals
  const [isLangModalOpen, setIsLangModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedLang, setSelectedLang] = useState<string>('Bahasa Indonesia');

  const handleSave = (): void => {
    setIsEditing(false);
    alert('Profil berhasil diperbarui!');
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setPhone(e.target.value);
  };

  const handleModalClick = (e: MouseEvent<HTMLDivElement>): void => {
    e.stopPropagation();
  };

  return (
    <div className="profile-page-container">
      <div className="profile-mobile-wrapper">

        <header className="profile-page-header">
          <h2>Profil</h2>
        </header>

        {/* FOTO PROFIL */}
        <div className="profile-pic-wrapper">
          <img
            src="https://ui-avatars.com/api/?name=Arif+Satria&background=10B981&color=fff&size=256"
            alt="Profile"
            className="profile-img"
          />

          {/* Pensil hanya muncul jika TIDAK sedang diedit */}
          {!isEditing && (
            <button
              className="edit-pic-btn-new"
              onClick={() => setIsEditing(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="20" fill="#FF9746" />
                <svg x="6" y="6" width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path
                    d="M14 9.33314L4.66666 18.6665V23.3331H23.3333M4.66666 23.3331L9.33332 23.3331L18.6666 13.9998M14 9.33314L17.3467 5.98638L17.3487 5.9844C17.8094 5.5237 18.0402 5.29294 18.3062 5.20651C18.5405 5.13038 18.7929 5.13038 19.0273 5.20651C19.2931 5.29288 19.5236 5.52338 19.9836 5.98342L22.0134 8.01318C22.4754 8.4752 22.7065 8.70632 22.7931 8.9727C22.8692 9.20702 22.8692 9.45942 22.793 9.69374C22.7065 9.95993 22.4758 10.1907 22.0144 10.6521L22.0134 10.653L18.6666 13.9998M14 9.33314L18.6666 13.9998"
                    stroke="white"
                    strokeWidth="2.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </svg>
            </button>
          )}
        </div>

        {/* TOMBOL SIMPAN */}
        <div className="form-header-row">
          {isEditing && (
            <button className="btn-simpan-text" onClick={handleSave}>
              Simpan
            </button>
          )}
        </div>

        {/* FORM INPUT */}
        <div className="profile-form-section">
          <div className="profile-input-group">
            <label>Nama</label>
            <input
              type="text"
              className={`profile-input ${!isEditing ? 'disabled' : ''}`}
              value={name}
              readOnly={!isEditing}
              onChange={handleNameChange}
            />
          </div>

          <div className="profile-input-group">
            <label>Nomor Telepon</label>
            <input
              type="text"
              className={`profile-input ${!isEditing ? 'disabled' : ''}`}
              value={phone}
              readOnly={!isEditing}
              onChange={handlePhoneChange}
            />
          </div>
        </div>

        {/* MENU LIST */}
        <div className="profile-menu-section">

          <button
            className="profile-menu-item"
            onClick={() => navigate('/change-password')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path
                d="M4.66667 15.1667C4.66667 12.9668 4.66667 11.8668 5.35009 11.1834C6.0335 10.5 7.13345 10.5 9.33334 10.5H18.6667C20.8666 10.5 21.9665 10.5 22.6499 11.1834C23.3333 11.8668 23.3333 12.9668 23.3333 15.1667V17.5C23.3333 20.7998 23.3333 22.4497 22.3082 23.4749C21.2831 24.5 19.6332 24.5 16.3333 24.5H11.6667C8.36684 24.5 6.71692 24.5 5.69179 23.4749C4.66667 22.4497 4.66667 20.7998 4.66667 17.5V15.1667Z"
                stroke="#243D67"
                strokeWidth="2.33333"
              />
              <path
                d="M18.6667 9.33333V8.16667C18.6667 5.58934 16.5773 3.5 14 3.5C11.4227 3.5 9.33334 5.58934 9.33334 8.16667V9.33333"
                stroke="#243D67"
                strokeWidth="2.33333"
                strokeLinecap="round"
              />
              <circle cx="14" cy="17.4998" r="2.33333" fill="#243D67" />
            </svg>

            Ubah Kata Sandi
          </button>

          <button
            className="profile-menu-item"
            onClick={() => setIsLangModalOpen(true)}
          >
            Ubah Bahasa
          </button>

          <button
            className="profile-menu-item danger"
            onClick={() => setIsDeleteModalOpen(true)}
          >
            Hapus Akun
          </button>

        </div>
      </div>

      {/* MODAL UBAH BAHASA */}
      {isLangModalOpen && (
        <div
          className="logout-modal-overlay"
          onClick={() => setIsLangModalOpen(false)}
        >
          <div
            className="lang-modal-box"
            onClick={handleModalClick}
          >
            <div
              className={`lang-option ${
                selectedLang === 'Bahasa Indonesia' ? 'active' : ''
              }`}
              onClick={() => setSelectedLang('Bahasa Indonesia')}
            >
              Bahasa Indonesia
            </div>

            <div
              className={`lang-option ${
                selectedLang === 'English (United States)' ? 'active' : ''
              }`}
              onClick={() => setSelectedLang('English (United States)')}
            >
              English (United States)
            </div>

            <button
              className="btn-confirm-full"
              onClick={() => setIsLangModalOpen(false)}
            >
              Simpan
            </button>
          </div>
        </div>
      )}

      {/* MODAL HAPUS AKUN */}
      {isDeleteModalOpen && (
        <div className="logout-modal-overlay">
          <div className="logout-modal-box">

            <h3 className="modal-title">Hapus Akun?</h3>

            <p className="modal-subtitle">
              Kamu harus mendaftar kembali untuk menggunakan Food HUB
            </p>

            <div className="modal-actions">
              <button
                className="btn-cancel"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Kembali
              </button>

              <button
                className="btn-confirm"
                onClick={() => navigate('/Onboarding')}
              >
                Hapus
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;