import { createFileRoute } from '@tanstack/react-router'
import logo from '../logo.svg'
import tanstackLogo from '/tanstack-logo.png'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="text-center">
      <header className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-gray-800 to-gray-500 text-white text-[calc(10px+2vmin)]">
        <div className="flex">
          <img
            src={logo}
            className="h-[40vmin] pointer-events-none animate-[spin_20s_linear_infinite]"
            alt="logo"
          />
          <img
            src={tanstackLogo}
            className="h-[40vmin] pointer-events-none animate-bounce"
            alt="logo"
          />
        </div>

        <a
          className="text-[#61dafb] hover:underline"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <a
          className="text-[#61dafb] hover:underline"
          href="https://tanstack.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn TanStack
        </a>
        <p className="font-extrabold">All examples written with React!!!</p>
        <p className="font-extrabold">所有示例均使用 React 编写！！！</p>
      </header>
    </div>
  )
}
