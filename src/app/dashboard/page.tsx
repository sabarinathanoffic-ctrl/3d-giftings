import { getMiniatures } from '@/lib/data-store';
import { AdminPageClient } from './page-client';
import { logout } from './login/actions';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Settings } from 'lucide-react';

export default async function AdminPage() {
  const miniatures = await getMiniatures();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Console</h1>
        <div className="flex items-center gap-4">
          <Link href="/dashboard/settings">
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </Link>
          <form action={logout}>
            <Button variant="outline" type="submit">
              Logout
            </Button>
          </form>
        </div>
      </div>
      <AdminPageClient initialMiniatures={miniatures} />
    </div>
  );
}
