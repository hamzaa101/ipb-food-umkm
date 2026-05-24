import { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, Clock, Store } from 'lucide-react';
import { getVerifications, updateVerificationStatus, type VerificationRequest } from '../../utils/dummyAdmin';

type FilterTab = 'pending' | 'approved' | 'rejected';

export default function VerificationTab() {
  const [requests, setRequests] = useState<VerificationRequest[]>([]);
  const [activeFilter, setActiveFilter] = useState<FilterTab>('pending');

  useEffect(() => {
    setRequests(getVerifications());
  }, []);

  const handleAction = (id: string, status: 'approved' | 'rejected') => {
    updateVerificationStatus(id, status);
    setRequests(getVerifications());
  };

  const pendingCount = requests.filter(r => r.status === 'pending').length;
  const approvedCount = requests.filter(r => r.status === 'approved').length;
  const rejectedCount = requests.filter(r => r.status === 'rejected').length;

  const filtered = requests.filter(r => r.status === activeFilter);

  const getFilterStyle = (tab: FilterTab) => {
    if (activeFilter !== tab) return 'bg-white text-slate-500 hover:bg-slate-50';
    switch (tab) {
      case 'pending': return 'bg-primary text-white';
      case 'approved': return 'bg-green-500 text-white';
      case 'rejected': return 'bg-danger text-white';
    }
  };

  return (
    <div className="flex-1 p-4 md:p-6 bg-slate-50">
      {/* Filter Tabs */}
      <div className="bg-white rounded-2xl shadow-sm p-4 mb-4 border border-gray-100">
        <div className="flex border border-gray-200 rounded-xl overflow-hidden divide-x divide-gray-200">
          <button
            onClick={() => setActiveFilter('pending')}
            className={`flex-1 py-2.5 flex flex-col items-center justify-center transition-colors ${getFilterStyle('pending')}`}
          >
            <span className="font-bold text-xl leading-none">{pendingCount}</span>
            <span className="text-[10px] font-semibold mt-1">Menunggu</span>
          </button>
          <button
            onClick={() => setActiveFilter('approved')}
            className={`flex-1 py-2.5 flex flex-col items-center justify-center transition-colors ${getFilterStyle('approved')}`}
          >
            <span className="font-bold text-xl leading-none">{approvedCount}</span>
            <span className="text-[10px] font-semibold mt-1">Disetujui</span>
          </button>
          <button
            onClick={() => setActiveFilter('rejected')}
            className={`flex-1 py-2.5 flex flex-col items-center justify-center transition-colors ${getFilterStyle('rejected')}`}
          >
            <span className="font-bold text-xl leading-none">{rejectedCount}</span>
            <span className="text-[10px] font-semibold mt-1">Ditolak</span>
          </button>
        </div>
      </div>

      {/* Request List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 text-center">
            <p className="text-text-muted-light font-medium">Tidak ada permintaan di kategori ini.</p>
          </div>
        ) : (
          filtered.map(req => (
            <div key={req.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              {/* Store Info */}
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Store size={22} className="text-secondary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-secondary text-base">{req.storeName}</h3>
                  <p className="text-sm text-text-secondary-light">Pemilik: <span className="font-semibold">{req.ownerName}</span></p>
                  <p className="text-xs text-text-muted-light mt-0.5">Fakultas: {req.faculty}</p>
                </div>
                {/* Status Badge */}
                <div className={`px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1 ${
                  req.status === 'pending' ? 'bg-orange-50 text-primary' :
                  req.status === 'approved' ? 'bg-green-50 text-green-600' :
                  'bg-red-50 text-danger'
                }`}>
                  {req.status === 'pending' && <Clock size={12} />}
                  {req.status === 'approved' && <CheckCircle2 size={12} />}
                  {req.status === 'rejected' && <XCircle size={12} />}
                  {req.status === 'pending' ? 'Menunggu' : req.status === 'approved' ? 'Disetujui' : 'Ditolak'}
                </div>
              </div>

              {/* Submitted Date */}
              <div className="flex items-center gap-1 text-xs text-text-muted-light mb-4">
                <Clock size={12} />
                <span>Diajukan: {req.submittedAt}</span>
              </div>

              {/* Actions (only for pending) */}
              {req.status === 'pending' && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAction(req.id, 'rejected')}
                    className="flex-1 py-2.5 rounded-xl border border-danger text-danger font-bold text-sm hover:bg-red-50 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <XCircle size={16} />
                    Tolak
                  </button>
                  <button
                    onClick={() => handleAction(req.id, 'approved')}
                    className="flex-1 py-2.5 rounded-xl bg-green-500 text-white font-bold text-sm hover:bg-green-600 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 size={16} />
                    Setujui
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
