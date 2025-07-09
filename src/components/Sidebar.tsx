import { cn } from '@/lib/utils'
import { Link } from '@tanstack/react-router'

export default function Sidebar() {
  return (
    <header className="p-2 flex gap-2 bg-white w-40 h-full border-r overflow-hidden text-black">
      <nav className="flex flex-col gap-2.5">
        <Link to="/">
          {({ isActive }) => (
            <div
              className={cn(
                'px-2 font-bold hover:bg-gray-500 hover:text-white rounded-md',
                isActive && 'bg-gray-500 text-white',
              )}
            >
              Home
            </div>
          )}
        </Link>
        <Link to="/table-example">
          {({ isActive }) => (
            <div
              className={cn(
                'px-2 font-bold hover:bg-gray-500 hover:text-white rounded-md',
                isActive && 'bg-gray-500 text-white',
              )}
            >
              Table Example
            </div>
          )}
        </Link>
        <Link to="/form-example">
          {({ isActive }) => (
            <div
              className={cn(
                'px-2 font-bold hover:bg-gray-500 hover:text-white rounded-md',
                isActive && 'bg-gray-500 text-white',
              )}
            >
              Form Example
            </div>
          )}
        </Link>
      </nav>
    </header>
  )
}
