import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tours & Packages',
  description: 'Explore our latest tour packages in Kodaikanal. From adventure treks to relaxing valley views.',
};

export default function PackagesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
