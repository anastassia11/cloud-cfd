import MeshScene from '@/components/scenes/MeshScene'
import GeometryScene from '@/components/scenes/GeometryScene'
import { setLoader } from '@/store/slices/loaderSlice'
import { setProject } from '@/store/slices/projectSlice'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Workbench from '@/components/scenes/Workbench'
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
        <>
            <Head>
                <title>
                    CLoudCFD | Workbench
                </title>
            </Head>
            <Workbench />
        </>
    )
}
WorkbenchPage.requiresAuth = true