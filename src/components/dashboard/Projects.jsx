import Image from 'next/image'
import ProjectCard from './ProjectCard'
import geom_preview from '@/../public/geom_preview.jpg'
import { useEffect } from 'react'
import getProjects from '@/pages/api/get_projects'

export default function Projects({ items, onUpdate }) {

    useEffect(() => {
        const fetchProjects = async () => {
            const result = await getProjects()
            if (result.success) {
                onUpdate(result.data)
            } else {
                console.error(result.message)
            }
        }
        fetchProjects()
    }, [onUpdate])

    const rojects = [
        {
            title: "Project name",
            desc: "Sed mollis interdum nisi eu porttitor. Sed lacus magna, venenatis at congue in, dictum ut arcu.",
            img: <Image src={geom_preview} width={500} height={500} alt={geom_preview}
                className='w-full h-48 rounded-t-md' />,
            date: "Jan 4 2022"
        },
        {
            title: "Project name",
            desc: "Sed mollis interdum nisi eu porttitor. Sed lacus magna, venenatis at congue in, dictum ut arcu.",
            img: <Image src={geom_preview} width={500} height={500} alt={geom_preview}
                className='w-full h-48 rounded-t-md' />,
            date: "Jan 4 2022"
        },
        {
            title: "Project name",
            desc: "Sed mollis interdum nisi eu porttitor. Sed lacus magna, venenatis at congue in, dictum ut arcu.",
            img: <Image src={geom_preview} width={500} height={500} alt={geom_preview}
                className='w-full h-48 rounded-t-md' />,
            date: "Jan 4 2022"
        },
        {
            title: "Project name",
            desc: "Sed mollis interdum nisi eu porttitor. Sed lacus magna, venenatis at congue in, dictum ut arcu.",
            img: <Image src={geom_preview} width={500} height={500} alt={geom_preview}
                className='w-full h-48 rounded-t-md' />,
            date: "Jan 4 2022"
        },
        {
            title: "Project name",
            desc: "Sed mollis interdum nisi eu porttitor. Sed lacus magna, venenatis at congue in, dictum ut arcu.",
            img: <Image src={geom_preview} width={500} height={500} alt={geom_preview}
                className='w-full h-48 rounded-t-md' />,
            date: "Jan 4 2022"
        }
    ]

    const handleGet = async () => {
        console.log(items)
    }

    return (
        <div className="flex flex-row flex-wrap justify-start gap-[20px] mt-3">
            {
                rojects.map((item, key) => ( //потом мапить items
                    <ProjectCard item={item} key={key} />
                ))
            }
            <button className='bg-orange-800' onClick={() => handleGet()}>Get</button>
        </div>
    )
}
