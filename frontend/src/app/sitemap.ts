import type { MetadataRoute } from 'next';
import { API_URL } from '@/lib/config';
import { staticPackages } from '@/data/packages';

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

  // Map static packages
  const packageRoutes: MetadataRoute.Sitemap = staticPackages.map((pkg) => ({
    url: `https://hilltrek.vercel.app/packages/${pkg.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

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
