import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/about')({
  component: AboutComponent,
})

function AboutComponent() {
  return <div>Hello about!</div>
}
