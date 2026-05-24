import { useState, useEffect } from 'react';
import { Search, UserCircle, Ban, RotateCcw } from 'lucide-react';
import { getUsers, toggleUserStatus, type SystemUser } from '../../utils/dummyAdmin';

type RoleFilter = 'semua' | 'buyer' | 'seller';

export default function UsersTab() {
  const [users, setUsers] = useState<SystemUser[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('semua');

  useEffect(() => {
    setUsers(getUsers());
  }, []);

  const handleToggleStatus = (id: string) => {
    toggleUserStatus(id);
    setUsers(getUsers());
  };

  const filtered = users
    .filter(u => {
      if (roleFilter === 'buyer') return u.role === 'buyer';
      if (roleFilter === 'seller') return u.role === 'seller';
      return true;
    })
    .filter(u =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const getRoleBadge = (role: SystemUser['role']) => {
    switch (role) {
      case 'buyer': return <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md text-[10px] font-bold">Pembeli</span>;
      case 'seller': return <span className="px-2 py-0.5 bg-green-50 text-green-600 rounded-md text-[10px] font-bold">Penjual</span>;
      case 'admin': return <span className="px-2 py-0.5 bg-purple-50 text-purple-600 rounded-md text-[10px] font-bold">Admin</span>;
    }
  };

  return (
    <div className="flex-1 p-4 md:p-6 bg-slate-50">
      {/* Search & Filter */}
      <div className="bg-white rounded-2xl shadow-sm p-4 mb-4 border border-gray-100">
        {/* Search Bar */}
        <div className="relative mb-3">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted-light" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari pengguna..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-secondary bg-white focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors text-sm"
          />
        </div>

        {/* Role Filter */}
        <div className="flex gap-2">
          {(['semua', 'buyer', 'seller'] as RoleFilter[]).map(role => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                roleFilter === role
                  ? 'bg-secondary text-white'
                  : 'bg-surface-200 text-text-secondary-light hover:bg-gray-200'
              }`}
            >
              {role === 'semua' ? 'Semua' : role === 'buyer' ? 'Pembeli' : 'Penjual'}
            </button>
          ))}
        </div>
      </div>

      {/* Users Count */}
      <p className="text-sm text-text-muted-light font-semibold mb-3 px-1">
        Menampilkan {filtered.length} pengguna
      </p>

      {/* User List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 text-center">
            <p className="text-text-muted-light font-medium">Tidak ada pengguna ditemukan.</p>
          </div>
        ) : (
          filtered.map(user => (
            <div key={user.id} className={`bg-white rounded-2xl p-4 shadow-sm border border-gray-100 ${user.status === 'suspended' ? 'opacity-60' : ''}`}>
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-11 h-11 bg-secondary/10 rounded-full flex items-center justify-center shrink-0">
                  <UserCircle size={24} className="text-secondary" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-bold text-secondary text-sm truncate">{user.name}</h3>
                    {getRoleBadge(user.role)}
                  </div>
                  <p className="text-xs text-text-muted-light truncate">{user.email}</p>
                  <p className="text-[10px] text-text-muted-light mt-0.5">Bergabung: {user.joinDate}</p>
                </div>

                {/* Status & Action */}
                <div className="flex flex-col items-end gap-1.5">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    user.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-danger'
                  }`}>
                    {user.status === 'active' ? 'Aktif' : 'Diblokir'}
                  </span>
                  
                  {user.role !== 'admin' && (
                    <button
                      onClick={() => handleToggleStatus(user.id)}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-colors ${
                        user.status === 'active'
                          ? 'bg-red-50 text-danger hover:bg-red-100'
                          : 'bg-green-50 text-green-600 hover:bg-green-100'
                      }`}
                    >
                      {user.status === 'active' ? (
                        <><Ban size={10} /> Blokir</>
                      ) : (
                        <><RotateCcw size={10} /> Aktifkan</>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
