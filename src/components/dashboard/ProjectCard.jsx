import Image from 'next/image';
import { useRouter } from 'next/router';
import SvgSelector from '../SvgSelector';
import Link from 'next/link';
import { useEffect, useState } from 'react'
import UpdateProject from './UpdateProject'
import DeleteProject from './DeleteProject'
import { BASE_SERVER_URL } from '@/utils/constants';

export default function ProjectCard({ item, onDeleteClick, onEditClick }) {
    const router = useRouter()
    const [project, setProject] = useState(item || {})
    const [modal, setModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const date = new Date(item?.updateTime)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    const formettedData = `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}.${year}`

    useEffect(() => {
        item && setProject(item)
        return () => setProject({})
    }, [item])

    const handleExternalClick = () => {
        router.push(`/workbench/${project.id}`)
    }

    const handleEditClick = () => {
        setModal(true)
    }

    const handleDeleteClick = (e) => {
        e.stopPropagation()
        setDeleteModal(true)
    }

    const deleteProject = async () => {
        onDeleteClick()
        setDeleteModal(false)
    }

    const handleProjectUpdate = (project) => {
        onEditClick(project)
    }

    return (
        <div className="overflow-hidden rounded-lg shadow transition hover:shadow-lg bg-white flex flex-col"
            onDoubleClick={handleExternalClick}>
            <div className='h-56 overflow-hidden'>
                <Image src={`${BASE_SERVER_URL}${project.pathPreviewImg}`} priority unoptimized={true}
                    width={400} height={400} alt='geom preview' className='h-full w-full object-cover object-center' />
            </div>

            <div className="bg-white py-4 pl-4 flex flex-col justify-between flex-grow ">
                <div>
                    <div className='flex flex-row justify-between items-start'>
                        <time dateTime={formettedData} className="block text-xs text-gray-500">
                            {`Last modified: ${formettedData}`}
                        </time>
                    </div>
                    <div className='flex flex-row justify-between items-center'>
                        <p className="mt-0.5 text-lg text-gray-900">
                            {project.name}
                        </p>
                        <div className='group relative cursor-pointer flex flex-row justify-center items-center w-10 h-10'
                            id={project.id}>
                            <SvgSelector id='more' className='w-[16px] h-[16px] rotate-90' />
                            <div className="invisible opacity-0 group-hover:opacity-100 group-hover:visible translate-y-3 group-hover:translate-y-0
                                absolute max-w-[200px] w-[200px] rounded-md bg-white shadow border text-day-350 duration-100 "
                                style={{ bottom: 30, right: 10 }}>
                                <div className='px-2 py-1.5'>
                                    <button className="flex w-full items-center gap-2 rounded-md px-2 h-9 text-base text-day-350 hover:bg-day-150"
                                        onClick={handleExternalClick}>
                                        <SvgSelector id='open' />
                                        Open
                                    </button>
                                    <button className="flex w-full items-center gap-2 rounded-md px-2 h-9 text-base text-day-350 hover:bg-day-150"
                                        onClick={handleEditClick}>
                                        <SvgSelector id='edit' className='w-5 h-5' />
                                        Edit
                                    </button>
                                </div>
                                <div className='px-2 py-1.5 border-t'>
                                    <button className="flex w-full items-center gap-2 rounded-md px-2 h-9 text-base text-red-700 hover:bg-red-50 "
                                        onClick={handleDeleteClick}>
                                        <SvgSelector id='delete' className="h-5 w-5" />
                                        Delete
                                    </button>
                                </div>
                            </div>


                        </div>
                    </div>
                    <p className="line-clamp-3 text-sm/relaxed text-gray-500 mr-4">
                        {project.description}
                    </p>
                </div>
                <Link href={`/workbench/${project.id}`} className="group mt-2 inline-flex items-center gap-1 text-sm font-medium text-orange-100">
                    View in Workbench
                    <span aria-hidden="true" className="block transition-all group-hover:ms-0.5 rtl:rotate-180">&rarr;</span>
                </Link>
            </div>
            {modal ? <UpdateProject projectId={project.id} projectName={project.name} projectDescription={project.description}
                onCloseClick={() => setModal(false)}
                onUpdate={(proejct) => handleProjectUpdate(proejct)} /> : ''}
            {deleteModal ? <DeleteProject projectName={project.name}
                onCloseClick={() => setDeleteModal(false)}
                onDeleteClick={() => deleteProject()} /> : ''}
        </div>
    )
}
