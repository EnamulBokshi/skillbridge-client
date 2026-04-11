import type { MetadataRoute } from 'next'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

const routes = [
  '/',
  '/about-us',
  '/sessions',
  '/tutors',
  '/contact',
  '/login',
  '/signup',
  '/help-center',
  '/faq',
  '/privacy-policy',
  '/terms-of-service',
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return routes.map((route) => ({
    url: `${APP_URL}${route}`,
    lastModified: now,
    changeFrequency: route === '/' ? 'daily' : 'weekly',
    priority: route === '/' ? 1 : route === '/sessions' || route === '/tutors' ? 0.9 : 0.7,
  }))
}
