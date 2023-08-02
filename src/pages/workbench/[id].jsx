import Header from '@/components/header/Header'
import Scena from '@/components/scena/Scena'
import React from 'react'

export default function WorkbenchPage() {
    return (
        <div className=''>
            <Scena />
        </div>
    )
}
WorkbenchPage.requiresAuth = true