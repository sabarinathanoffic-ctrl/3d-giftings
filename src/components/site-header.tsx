import Link from 'next/link';
import { Swords } from 'lucide-react';
import { CartButton } from './cart-button';

export async function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Swords className="h-6 w-6 text-primary" />
            <span className="font-bold sm:inline-block">
              Miniature Market
            </span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end">
          <CartButton />
        </div>
      </div>
    </header>
  );
}
