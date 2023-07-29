import Header from '@/components/header/Header'
import Scena from '@/components/scena/Scena'

export default function HomePage() {

  return (
    <div className=''>
      <Header />
      <Scena />
    </div>
  )
}
HomePage.requiresAuth = true