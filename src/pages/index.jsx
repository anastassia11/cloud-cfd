import Header from '@/components/header/Header'
import Scena from '@/components/scena/Scena'
import { useEffect } from 'react'

export default function HomePage() {
  useEffect(() => {
    console.log("asass")
  })

  return (
    <div className=''>
      {/* <Scena /> */}
    </div>
  )
}
HomePage.requiresAuth = true