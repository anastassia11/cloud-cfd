import Header from '@/components/header/Header'
import TreePanel from "@/components/tree-panel/TreePanel"
import { useAuth } from '@/hooks/use-auth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function HomePage() {
  const router = useRouter()
  const { isAuth } = useAuth()

  useEffect(() => {
    if (!isAuth) {
      router.push('/login');
    }
  }, [isAuth, router])

  return (
    <div className='w-screen h-screen bg-gray-100'>
      <Header />
      <div className="p-3">
        <TreePanel />
      </div>
    </div>
  )
}