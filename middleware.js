import { rewrite, next } from '@vercel/edge';

// whopaysfirst.com serves the Strategist at its bare root. This has to be
// middleware rather than a vercel.json rewrite: rewrites are evaluated after
// the filesystem, and the portfolio's own index.html owns "/", so it would win
// every time. Middleware runs before that check.
//
// The matcher includes "/", which is the fonz.sh homepage, so every path here
// falls through to next() rather than throwing. A routing tweak must never be
// able to take the portfolio down.
export const config = { matcher: ['/', '/admin'] };

const APP_HOSTS = new Set(['whopaysfirst.com', 'www.whopaysfirst.com']);

export default function middleware(request) {
  try {
    const host = (request.headers.get('host') || '').toLowerCase().split(':')[0];
    if (!APP_HOSTS.has(host)) return next();

    const url = new URL(request.url);
    if (url.pathname === '/') return rewrite(new URL('/whopaysfirst/index.html', url));
    if (url.pathname === '/admin') return rewrite(new URL('/whopaysfirst/admin.html', url));
    return next();
  } catch (_) {
    return next();
  }
}
