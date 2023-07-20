import { APP_ROUTES } from '@/constants/app-routes'

export function checkIsPublicRoute(path: string) {
  const publicRoutes = Object.values(APP_ROUTES.public)

  return publicRoutes.includes(path)
}
