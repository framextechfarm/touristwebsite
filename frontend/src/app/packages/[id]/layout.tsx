import type { Metadata } from "next";
import { API_URL } from "@/lib/config";

type Props = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const res = await fetch(`${API_URL}/packages/${resolvedParams.id}`);
    const pkg = await res.json();

    return {
      title: `${pkg.title} | Hill Trek Packages`,
      description: pkg.description.substring(0, 160),
      openGraph: {
        title: pkg.title,
        description: pkg.description.substring(0, 160),
        images: pkg.images?.[0] ? [{ url: pkg.images[0].url }] : [],
      },
    };
  } catch {
    return { title: "Package Details" };
  }
}

export default function PackageLayout({ children }: Props) {
  return <>{children}</>;
}
