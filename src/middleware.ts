import { type NextRequest, NextResponse } from 'next/server';
import { verifySession } from './components/auth/session';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/dashboard') && pathname !== '/dashboard/login') {
    const cookie = req.cookies.get('session')?.value;
    const session = await verifySession(cookie).catch(() => null);

    if (!session?.isAdmin) {
      return NextResponse.redirect(new URL('/dashboard/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
