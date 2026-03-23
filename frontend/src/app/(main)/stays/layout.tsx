import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Premium Stays & Cottages',
  description: 'Book the best cottages, villas, and homestays in Kodaikanal. Experience luxury amidst nature.',
};

export default function StaysLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
