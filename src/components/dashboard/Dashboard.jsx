import SvgSelector from '../SvgSelector'
import { useEffect, useState } from 'react'
import CreateProject from './CreateProject'
import getProjects from '@/pages/api/get_projects'
import ProjectCard from './ProjectCard'

export default function Dashboard() {
    const [modal, setModal] = useState(false)
    const [projects, setProjects] = useState([])
    const [filterName, setFilterName] = useState('')

    useEffect(() => {
        fetchProjects()
    }, [])

    const fetchProjects = async () => {
        const result = await getProjects()
        if (result.success) {
            setProjects(result.data)
        } else {
            alert(result.message)
        }
    }

    const deleteProject = async (idProject) => {
        const result = await deleteProject(idProject)
        if (result.success) {
            console.log('success')
        } else {
            alert(result.message)
        }
    }

    const handleDeleteClick = (idProject) => {
        deleteProject(idProject)
        projects.filter((project) =>
            project.uid !== idProject)
    }

    const handleEditClick = () => {

    }

    const handleProjectCreate = (project) => {
        setProjects(prevProjects => [...prevProjects, project])
    }

    const filteredProjects = projects.filter((project) =>
        project.name.toLowerCase().includes(filterName.toLowerCase())
    )

    return (
        <>
            <div className="px-10 py-5">
                <div className='flex flex-row justify-between space-x-2'>
                    <h1 className="text-xl py-2 text-day-350 font-medium">
                        Projects
                    </h1>
                    <div className='flex flex-row items-center justify-end space-x-2'>
                        <div className="relative flex items-center">
                            <SvgSelector id='search' />
                            <input type="text" placeholder="Search" value={filterName} onChange={(e) => setFilterName(e.target.value)}
                                className="w-72 h-9 pl-12 pr-4 text-base text-day-350 border rounded-md outline-none bg-day-50 focus:bg-day-00 focus:border-day-200" />
                        </div>
                        <button className="w-32 px-4 h-9 text-base flex items-center font-medium text-white bg-orange-100 hover:bg-orange-150 active:bg-orange-200 rounded-lg duration-300"
                            onClick={() => setModal(true)}>
                            New Project
                        </button>
                    </div>
                </div>

                <div className='mt-3 project-grid'>
                    {
                        filteredProjects.map((project) => (
                            <ProjectCard item={project} key={project.uid} onDeleteClick={() => handleDeleteClick(project.uid)}
                                onEditClick={() => handleEditClick()} />
                        ))
                    }
                </div>
            </div>
            {modal ? <CreateProject onCloseClick={() => setModal(false)}
                onCreate={(proejct) => handleProjectCreate(proejct)} /> : ''}
        </>
    )
}
