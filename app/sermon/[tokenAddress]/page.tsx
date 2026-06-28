import { SermonPageClient } from "@/components/SermonPageClient";

interface SermonPageProps {
  params: Promise<{ tokenAddress: string }>;
}

export default async function SermonPage({ params }: SermonPageProps) {
  const { tokenAddress } = await params;
  return <SermonPageClient tokenAddress={tokenAddress} />;
}
