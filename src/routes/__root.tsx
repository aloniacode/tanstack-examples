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
      <footer className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white text-center py-2">
        <p className="font-extrabold">Made with ❤️ | Alonia</p>
      </footer>
      <TanStackRouterDevtools />
    </div>
  ),
})
