import Header from '@/components/header/Header'
import Dashboard from '@/components/dashboard/Dashboard'

export default function DashboardPage() {
    return (
        <main className='w-screen min-h-screen bg-day-100'>
            <Header />
            <Dashboard />
        </main>
    )
}

DashboardPage.requiresAuth = true
