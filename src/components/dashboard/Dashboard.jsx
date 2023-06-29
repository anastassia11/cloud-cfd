import Image from 'next/image'
import SvgSelector from '../SvgSelector'
import geom_preview from '@/../public/geom_preview.jpg'
import ProjectCard from './ProjectCard'

export default function Dashboard() {
    const projects = [
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

    return (
        <div className="px-10 py-5">
            <div className='flex flex-row justify-between space-x-2'>
                <h1 className="text-xl py-2 text-day-350 font-medium">
                    Projects
                </h1>
                <div className='flex flex-row items-center justify-end space-x-2'>
                    <div className="relative flex items-center">
                        <SvgSelector id='search' />
                        <input type="text" placeholder="Search" className="w-72 h-9 pl-12 pr-4 text-base text-day-300 border rounded-md outline-none bg-day-50 focus:bg-day-00 focus:border-day-200" />
                    </div>
                    <button className="w-32 px-4 h-9 text-base flex items-center font-medium text-white bg-orange-100 hover:bg-orange-150 active:bg-orange-200 rounded-lg duration-300">
                        New Project
                    </button>
                </div>
            </div>

            <div className="flex flex-row flex-wrap justify-start gap-[20px] mt-3">
                {
                    projects.map((item, key) => (
                        <ProjectCard item={item} key={key} />
                    ))
                }
            </div>
        </div>

    )
}
