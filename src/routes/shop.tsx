import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/shop')({
  component: Shop,
})

function Shop() {
  return <main className="p-6">Shop</main>
}
