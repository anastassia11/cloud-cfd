import { Provider } from 'react-redux'
import { Inter } from 'next/font/google'
import store from '../store'
import '../firebase'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {

  return (
    <Provider store={store}>
      <main className={`${inter.className}`}>
        <Component {...pageProps} />
      </main>
    </Provider>
  )

}
