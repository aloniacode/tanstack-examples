import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import Sidebar from '../components/Sidebar'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()

export const Route = createRootRoute({
  component: () => (
    <QueryClientProvider client={queryClient}>
      {' '}
      <div className="h-full flex flex-col">
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <div className="flex-1">
            <Outlet />
          </div>
        </div>
        <footer className="bg-gray-900 text-white text-center py-2">
          <p className="font-extrabold">Made with ❤️ | Alonia</p>
        </footer>
        <TanStackRouterDevtools />
      </div>
    </QueryClientProvider>
  ),
})
