
import Home from '@/components/home/Home'
import Scena from '@/components/scena/Scena'
import { useEffect } from 'react'

export default function HomePage() {

  return (
    <div className='h-[calc(100vh-56px)] bg-day-50 '>
      <Home />
    </div>
  )
}
HomePage.requiresAuth = false