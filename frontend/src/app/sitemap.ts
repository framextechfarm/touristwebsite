import type { MetadataRoute } from 'next';
import { API_URL } from '@/lib/config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = [
    '',
    '/packages',
    '/stays',
    '/cabs',
  ].map((route) => ({
    url: `https://hilltrek.vercel.app${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Fetch dynamic packages
  let packageRoutes: MetadataRoute.Sitemap = [];
  try {
    const pkgRes = await fetch(`${API_URL}/packages`);
    const packages = await pkgRes.json();
    packageRoutes = packages.map((pkg: { id: number }) => ({
      url: `https://hilltrek.vercel.app/packages/${pkg.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));
  } catch {
    console.error("Failed to fetch packages for sitemap");
  }

  // Fetch dynamic stays
  let stayRoutes: MetadataRoute.Sitemap = [];
  try {
    const stayRes = await fetch(`${API_URL}/stays`);
    const stays = await stayRes.json();
    stayRoutes = stays.map((stay: { id: number }) => ({
      url: `https://hilltrek.vercel.app/stays/${stay.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }));
  } catch {
    console.error("Failed to fetch stays for sitemap");
  }

  return [...routes, ...packageRoutes, ...stayRoutes];
}
