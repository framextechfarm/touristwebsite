import type { Metadata } from "next";
import { staticPackages } from "@/data/packages";

type Props = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const pkg = staticPackages.find(p => p.id.toString() === resolvedParams.id);

    if (!pkg) return { title: "Package Details" };

    return {
      title: `${pkg.title} | Hill Trek Packages`,
      description: pkg.description.substring(0, 160),
      openGraph: {
        title: pkg.title,
        description: pkg.description.substring(0, 160),
        images: pkg.images?.[0] ? [{ url: pkg.images[0].url }] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: pkg.title,
        description: pkg.description.substring(0, 160),
      }
    };
  } catch {
    return { title: "Package Details" };
  }
}

export async function generateStaticParams() {
  return staticPackages.map((pkg) => ({
    id: pkg.id.toString(),
  }));
}

export default function PackageLayout({ children }: Props) {
  return <>{children}</>;
}
