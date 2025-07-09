import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import Sidebar from '../components/Sidebar'

export const Route = createRootRoute({
  component: () => (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </div>
  ),
})
