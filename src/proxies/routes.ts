/**
 * Routes that always require a session. Users without one are redirected to /auth.
 * All other routes not listed here default to public.
 */
export const PROTECTED_ROUTES: (string | RegExp)[] = [
  '/collection',
  '/settings',
]
