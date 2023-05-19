import Header from '@/components/header/Header'
import TreePanel from "@/components/tree-panel/TreePanel"
import { useRouter } from 'next/router'
import { onAuthStateChanged } from "firebase/auth"
import { auth } from '@/firebase'

export default function HomePage() {
  const router = useRouter()

  onAuthStateChanged(auth, (currentUser) => {
    currentUser ? router.push('/') : router.push('/login')
  })

  return (
    <div className='w-screen h-screen bg-gray-100'>
      <Header />
      <div className="p-3">
        <TreePanel />
      </div>
    </div>
  )
}