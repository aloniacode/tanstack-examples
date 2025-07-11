import { cn } from '@/lib/utils'
import { Link } from '@tanstack/react-router'
import { Languages } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

export default function Sidebar() {
  const { i18n } = useTranslation()
  return (
    <header className="p-2 flex flex-col gap-2 bg-secondary w-60 min-w-40 h-full border-r overflow-hidden">
      <nav className="flex-1 flex flex-col gap-2.5">
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
        <Link to="/virtual-list-example">
          {({ isActive }) => (
            <div
              className={cn(
                'p-2 font-bold hover:bg-foreground hover:text-white rounded-md',
                isActive && 'bg-foreground text-white',
              )}
            >
              Virtual List Example
            </div>
          )}
        </Link>
      </nav>
      <Select
        onValueChange={(v) => i18n.changeLanguage(v)}
        defaultValue={i18n.language}
      >
        <SelectTrigger className="w-full">
          <SelectValue>
            <Languages size={16} />{' '}
            {i18n.language === 'zh-CN' ? '中文' : 'English'}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="zh-CN">中文</SelectItem>
          <SelectItem value="en-US">English</SelectItem>
        </SelectContent>
      </Select>
    </header>
  )
}
