import type { ReactNode } from 'react';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-200 flex justify-center">
      <div className="w-full max-w 7xl bg-surface-light min-h-screen relative shadow-md">
        <div className="h-full bg-surface-light relative">
            {children}
        </div>
      </div>
    </div>
  )
}