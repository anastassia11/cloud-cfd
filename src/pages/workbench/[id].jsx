import MeshScene from '@/components/workbench/MeshScene'
import GeometryScene from '@/components/workbench/GeometryScene'
import { setLoader } from '@/store/slices/loaderSlice'
import { setProject } from '@/store/slices/projectSlice'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Workbench from '@/components/workbench/Workbench'
import Head from 'next/head'

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
        <div className='select-none'>
            <Head>
                <title>
                    CloudCFD | Workbench
                </title>
            </Head>
            <Workbench />
        </div>
    )
}
WorkbenchPage.requiresAuth = true