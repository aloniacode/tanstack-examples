import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/form-example')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/form-example"!</div>
}
