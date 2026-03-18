import type { Metadata } from "next";
import { API_URL } from "@/lib/config";

type Props = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const resolvedParams = await params;
    const res = await fetch(`${API_URL}/stays/${resolvedParams.id}`);
    const stay = await res.json();

    return {
      title: `${stay.name} - ${stay.property_type} in ${stay.location} | Hill Trek`,
      description: `Book your stay at ${stay.name}, a premium ${stay.property_type} in ${stay.location}.`,
      openGraph: {
        title: stay.name,
        description: `Book your stay at ${stay.name}, a premium ${stay.property_type} in ${stay.location}.`,
        images: stay.images?.[0] ? [{ url: stay.images[0].url }] : [],
      },
    };
  } catch {
    return { title: "Stay Details" };
  }
}

export default function StayLayout({ children }: Props) {
  return <>{children}</>;
}
