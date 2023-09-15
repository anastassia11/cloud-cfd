import Scena from '@/components/scena/Scena'
import { setLoader } from '@/store/slices/loaderSlice'
import { setProject } from '@/store/slices/projectSlice'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

export default function WorkbenchPage() {
    const router = useRouter()
    const { id } = router.query
    const [isLoaded, setIsLoaded] = useState(true)
    // const isLoaded = useSelector(state => state.loader.loader)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setLoader(isLoaded))
        if (id) {
            dispatch(setProject({ projectId: id }))
            setIsLoaded(false)
            dispatch(setLoader(isLoaded))
        }
    }, [id])

    if (isLoaded) {
        return <></>
    }

    return (
        <div className=''>
            <Scena />
        </div>
    )
}
WorkbenchPage.requiresAuth = true