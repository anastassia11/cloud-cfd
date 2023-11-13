import { Provider } from 'react-redux'
import { Inter } from 'next/font/google'
import store from '../store'
import '@/styles/globals.css'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import Header from '@/components/header/Header'
import DemoHeader from '@/components/header/DemoHeader'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [isChecked, setIsChecked] = useState(false)
  const requiresAuth = Component.requiresAuth
  const token = useRef(null)

  useEffect(() => {
    token.current = localStorage.getItem('token')
    if (requiresAuth) {
      if (!token.current) {
        router.push('/login').then(() => {
          setIsChecked(true)
        })
      } else {
        setIsChecked(true)
      }
    }
    else {
      if (router.pathname === '/login' || router.pathname === '/register') {
        setIsChecked(true)
      } else {
        setIsChecked(true)
      }
    }
    console.log(token.current === null)
  }, [requiresAuth, router])

  return (
    <Provider store={store}>
      <main className={`${inter.className}`}>
        {isChecked && <Header />}
        {isChecked && <Component {...pageProps} />}
      </main>
    </Provider>
  )
}
