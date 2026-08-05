import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin — Daniel Caicedo',
  description: 'Panel de administración privado',
  robots: 'noindex, nofollow',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
