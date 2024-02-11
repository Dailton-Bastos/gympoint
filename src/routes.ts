/**
 * An array of routes that are used for authentication
 * * These routes will redirect logged in users to /admin/members
 * @type {string[]}
 */
export const authRoutes: string[] = ['/auth/login', '/auth/forgot']

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix: string = '/api/auth'

/**
 * The default redirect path after loggin in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT: string = '/admin/members'
