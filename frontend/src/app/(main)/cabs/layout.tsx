import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cab Bookings',
  description: 'Reliable cab services connecting Kodaikanal with major cities like Bangalore, Chennai, and Coimbatore.',
};

export default function CabsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
