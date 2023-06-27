import Header from '@/components/header/Header'
import Layout from '@/components/layouts/Layout'
import TreePanel from "@/components/tree-panel/TreePanel"

export default function HomePage() {

  return (
    <div className='w-screen h-screen bg-gray-100'>
      <Header />
      <div className="p-2">
        <TreePanel />
      </div>
    </div>
  )
}
HomePage.requiresAuth = true