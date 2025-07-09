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
                'p-2 font-bold hover:bg-foreground hover:text-white rounded-md',
                isActive && 'bg-foreground text-white',
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
                'p-2 font-bold hover:bg-foreground hover:text-white rounded-md',
                isActive && 'bg-foreground text-white',
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
                'p-2 font-bold hover:bg-foreground hover:text-white rounded-md',
                isActive && 'bg-foreground text-white',
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
