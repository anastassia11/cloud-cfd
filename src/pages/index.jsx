import Header from '@/components/header/Header'
import Layout from '@/components/layouts/Layout'
import TreePanel from "@/components/tree-panel/TreePanel"

export default function HomePage() {

  return (
    <div className='w-screen h-screen bg-day-150'>
      <Header />
      <TreePanel />
    </div>
  )
}
HomePage.requiresAuth = true