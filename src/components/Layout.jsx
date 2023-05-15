import Header from './header/Header'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Layout({ children }) {
    return (
        <div className={`${inter.className} bg-gray-100 w-screen h-screen`}>
            <Header />
            <div className="p-3">
                {children}
            </div>
        </div>
    )
}
