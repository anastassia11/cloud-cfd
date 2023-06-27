import { Provider } from 'react-redux'
import { Inter } from 'next/font/google'
import store from '../store'
import '@/styles/globals.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const [isChecked, setIsChecked] = useState(false)
  const requiresAuth = Component.requiresAuth

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (requiresAuth) {
      if (!token) {
        router.push('/login').then(() => {
          setIsChecked(true)
        })
      } else {
        setIsChecked(true)
      }
    }
    else {
      if (token) {
        router.push('/').then(() => {
          setIsChecked(true)
        })
      } else {
        setIsChecked(true)
      }
    }
  }, [requiresAuth, router])

  return (
    <Provider store={store}>
      <main className={`${inter.className}`}>
        {isChecked && <Component {...pageProps} />}
      </main>
    </Provider>
  )
}
