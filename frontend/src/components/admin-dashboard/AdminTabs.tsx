import { BarChart3, ShieldCheck, Users } from 'lucide-react';

interface AdminTabsProps {
  activeTab: 'ringkasan' | 'verifikasi' | 'pengguna';
  onChangeTab: (tab: 'ringkasan' | 'verifikasi' | 'pengguna') => void;
  pendingCount?: number;
}

export default function AdminTabs({ activeTab, onChangeTab, pendingCount = 0 }: AdminTabsProps) {
  const tabs = [
    { key: 'ringkasan' as const, label: 'Ringkasan', icon: BarChart3 },
    { key: 'verifikasi' as const, label: 'Verifikasi', icon: ShieldCheck, badge: pendingCount },
    { key: 'pengguna' as const, label: 'Pengguna', icon: Users },
  ];

  return (
    <div className="bg-white border-b border-border-light shadow-sm sticky top-16 z-30">
      <div className="flex">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => onChangeTab(tab.key)}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-sm font-bold transition-all relative ${
                isActive
                  ? 'text-secondary'
                  : 'text-text-muted-light hover:text-text-secondary-light hover:bg-surface-200'
              }`}
            >
              <Icon size={18} />
              <span className="hidden sm:inline">{tab.label}</span>
              
              {/* Badge for pending verifications */}
              {tab.badge && tab.badge > 0 && (
                <span className="absolute top-2 right-1/4 sm:static bg-danger text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {tab.badge}
                </span>
              )}

              {/* Active indicator */}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-0.75 bg-secondary rounded-t-full" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
