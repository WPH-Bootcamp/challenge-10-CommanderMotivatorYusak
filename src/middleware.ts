import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PROTECTED_ROUTES = ['/restaurant', '/cart', '/checkout', '/orders', '/profile'];
const AUTH_ROUTES = ['/login', '/register'];

export default function middleware(request: NextRequest) {
  const token = request.cookies.get('foody-token')?.value;
  const { pathname } = request.nextUrl;

  // 🛡️ 1. SAFEGUARD: Let all internal Next.js assets, static files, and backend APIs pass without interference!
  if (
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api') || 
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }

  const isProtected = PROTECTED_ROUTES.some((r) => pathname.startsWith(r));
  const isAuthRoute = AUTH_ROUTES.some((r) => pathname.startsWith(r));

  // 2. Redirect unauthenticated users trying to hit protected routes
  if (isProtected && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 3. Redirect authenticated users trying to hit login/register routes back home
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// 🎯 The matcher ensures the middleware only runs on actual page routes
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};