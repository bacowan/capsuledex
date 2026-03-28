/**
 * Routes that may or may not require a session
 * Strings match the pathname exactly or as a prefix (e.g. "/series" covers "/series/123").
 * RegExp patterns are tested against the full pathname.
 */
export const PUBLIC_ROUTES: (string | RegExp)[] = [
  '/',
  '/auth',
  '/browse',
  /^\/series\/.+/,
]

/**
 * Routes that always require a session. Users without one are redirected to /auth.
 * All other routes not listed here default to public.
 */
export const PROTECTED_ROUTES: (string | RegExp)[] = [
  '/collection',
  '/settings',
]
