import { createRouter, createWebHistory } from 'vue-router/auto'
import { handleHotUpdate, routes } from 'vue-router/auto-routes'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import type { EnhancedRouteLocation } from './types'
import { useRouteCacheStore } from '@/stores'

import setPageTitle from '@/utils/set-page-title'
import { Local, REFRESH_TOKEN } from '@/utils/storage'

NProgress.configure({ showSpinner: true, parent: '#app' })

for (const route of routes) {
  if (route.path === '/') {
    route.redirect = '/workbench'
    break
  }
}

console.log(routes)

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_PUBLIC_PATH),
  routes,
})

// This will update routes at runtime without reloading the page
if (import.meta.hot)
  handleHotUpdate(router)

router.beforeEach(async (to: EnhancedRouteLocation, _from, next) => {
  NProgress.start()

  const routeCacheStore = useRouteCacheStore()

  const refreshToken = Local.get(REFRESH_TOKEN)

  if (to.path !== '/login' && refreshToken == null) {
    next('/login')
    return
  }

  // Route cache
  routeCacheStore.addRoute(to)

  console.log(to)

  // Set page title
  setPageTitle(to.name)

  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
