
import Dashboard from '@/components/dashboard/Dashboard'
import Head from 'next/head'

export default function DashboardPage() {
    return (
        <>
            <Head>
                <title>
                    CloudCFD | Dashboard
                </title>
            </Head>
            <Dashboard />
        </>
    )
}

DashboardPage.requiresAuth = true
