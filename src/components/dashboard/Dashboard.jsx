import SvgSelector from '../SvgSelector'
import { useEffect, useState } from 'react'
import getProjects from '@/pages/api/get_projects'
import ProjectCard from './ProjectCard'
import deleteProject from '@/pages/api/delete_project'
import CreateProject from './CreateProject'
import { useDispatch, useSelector } from 'react-redux'
import { setLoader } from '@/store/slices/loaderSlice'
import ContentLoader from 'react-content-loader'

export default function Dashboard() {
    const [modal, setModal] = useState(false)
    const [projects, setProjects] = useState([])
    const [filterName, setFilterName] = useState('')
    const loader = useSelector(state => state.loader.loader)

    const dispatch = useDispatch()

    useEffect(() => {
        fetchProjects()
    }, [])

    const fetchProjects = async () => {
        dispatch(setLoader(true))
        const result = await getProjects()
        if (result.success) {
            setProjects(result.data)
            dispatch(setLoader(false))
        } else {
            alert(result.message)
            dispatch(setLoader(false))
        }
    }

    const deleteUserProject = async (projectId) => {
        const result = await deleteProject(projectId)
        if (result.success) {
            setProjects(prevProjects => prevProjects.filter((project) => project.id !== projectId))
        } else {
            alert(result.message)
        }
    }

    const handleDeleteClick = (projectId) => {
        deleteUserProject(projectId)
    }

    const handleEditClick = (project) => {
        setProjects(prevProjects => prevProjects.map((prevProject) => {
            if (prevProject.id === project.id) {
                return project
            } else return prevProject
        }))
    }

    const handleProjectCreate = (project) => {
        setProjects(prevProjects => [...prevProjects, project])
    }

    const filteredProjects = projects.filter((project) =>
        project.name.toLowerCase().includes(filterName.toLowerCase())
    )


    const DashboardLoader = () => (
        <div className={`${loader ? 'block' : 'hidden'} rounded-lg overflow-hidden shadow transition hover:shadow-lg bg-white flex flex-col`}>
            <ContentLoader
                speed={2}
                backgroundColor="#d7d7d7"
                foregroundColor="#e5e5e5"
                height="410">
                <rect x="0" y="0" width="100%" height="224" />
                <rect x="16" y="240" rx="4" ry="4" width="60%" height="12" />
                <rect x="16" y="270" rx="4" ry="4" width="40%" height="16" />
                <rect x="16" y="300" rx="4" ry="4" width="85%" height="14" />
                <rect x="16" y="322" rx="4" ry="4" width="75%" height="14" />
                <rect x="16" y="344" rx="4" ry="4" width="80%" height="14" />
                <rect x="16" y="376" rx="4" ry="4" width="60%" height="12" />
            </ContentLoader>
        </div>
    )

    return (
        <div className="px-6 pt-2 bg-day-100 min-h-[calc(100vh-56px)]">
            <div className='flex flex-row justify-between space-x-2'>
                <h1 className="text-xl py-2 text-day-350 font-medium">
                    Projects
                </h1>
                <div className='flex flex-row items-center justify-end space-x-2'>
                    <div className="relative flex items-center">
                        <SvgSelector id='search' />
                        <input type="text" placeholder="Search" value={filterName}
                            onChange={(e) => setFilterName(e.target.value)
                            }
                            className="w-72 h-9 pl-12 pr-4 text-base text-day-350 border rounded-md outline-none bg-day-50 focus:bg-day-00 focus:border-day-200" />
                    </div>
                    <button className="w-32 px-4 h-9 text-base flex items-center font-medium text-white bg-orange-100 hover:bg-orange-150 active:bg-orange-200 rounded-lg duration-300"
                        onClick={() => setModal(true)}>
                        New Project
                    </button>
                </div>
            </div>
            <div className='mt-4 h-[calc(100vh-126px)] overflow-y-scroll rounded pr-2'>
                <div className='project-grid pb-4'>
                    <DashboardLoader />
                    <DashboardLoader />
                    <DashboardLoader />
                    {filteredProjects.map((project) => (
                        <ProjectCard item={project} key={project.id}
                            onDeleteClick={() => handleDeleteClick(project.id)}
                            onEditClick={(newProject) => handleEditClick(newProject)} />
                    ))}
                </div>
            </div>

            {modal ? <CreateProject onCloseClick={() => setModal(false)}
                onCreate={(proejct) => handleProjectCreate(proejct)} /> : ''}
        </div>
    )
}
