import { MiniatureCatalog } from '@/components/miniature-catalog';
import { getMiniatures } from '@/lib/data-store';

export default async function Home() {
  const miniatures = await getMiniatures();
  return (
    <div className="container mx-auto px-4 py-8">
      <MiniatureCatalog miniatures={miniatures} />
    </div>
  );
}
