import Image from 'next/image';
import geom_preview from '@/../public/geom_preview.jpg'
import geom_preview2 from '@/../public/geom_preview2.jpg'
import geom_preview3 from '@/../public/geom_preview3.jpg'
import { useRouter } from 'next/router';
import SvgSelector from '../SvgSelector';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function ProjectCard({ item = {}, onDeleteClick, onEditClick }) {
    const router = useRouter()
    const [isActive, setIsActive] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const contextmenuRef = useRef()
    const contextmenuHandler = useRef()

    const date = new Date(item.updateTime)
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    const formettedData = `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}.${year}`

    useEffect(() => {
        document.addEventListener("click", () => resetToDefault())
        document.addEventListener("contextmenu", (e) => {
            if (contextmenuHandler.current && !contextmenuHandler.current.contains(e.target)) resetToDefault()
        })
    }, [])

    const handlecontextMenu = (e) => {
        e.preventDefault()
        const { pageX, pageY } = e
        setIsActive(true)
        setTimeout(() => {
            const rect = contextmenuRef.current.getBoundingClientRect();
            const x = (pageX + rect.width) > window.innerWidth ? (window.innerWidth - rect.width) : pageX + 2;
            const y = (pageY + rect.height) > window.innerHeight ? (window.innerHeight - rect.height) : pageY + 2;
            setPosition({ x, y })
            contextmenuRef.current.classList.remove("opacity-0")
        }, 100)
    }

    const resetToDefault = () => {
        setIsActive(false)
        document.documentElement.classList.remove("overflow-hidden")
    }

    const handleExternalClick = () => {
        router.push(`/workbench/${item.id}`)
    }
    const handleDeleteClick = (e) => {
        e.stopPropagation()
        onDeleteClick()
    }
    return (
        // <div className="project-card relative bg-day-00 border rounded-lg duration-300 hover:shadow-md cursor-pointer"
        //     onClick={onExternalClick}>
        //     {/* <button className="p-2 rounded-md text-day-300 hover:text-black duration-300 w-8 h-8"
        //         onClick={() => onEditClick()}>
        //         <SvgSelector id='edit' />
        //     </button>
        //     <button className="top-[2px] pb-10 rounded-md text-day-300 hover:text-black duration-300 w-8 h-8"
        //         onClick={handleDeleteClick}>
        //         <SvgSelector id='close' />
        //     </button> */}

        //     <Image src={geom_preview} width={500} height={500} alt={geom_preview}
        //         className='w-full h-48 rounded-t-md' />
        //     <div className="py-2 px-4 pr-2">
        //         <div className='flex flex-row justify-between items-center'>
        //             <h3 className="text-base text-day-350 font-medium">
        //                 {item.name}
        //             </h3>
        //             <button className="invisible more-button flex flex-col items-center justify-center rounded-md text-day-300 hover:text-black hover:bg-day-150 duration-300 w-8 h-8">
        //                 <SvgSelector id='more' />
        //             </button>
        //         </div>
        //         <p className="block text-day-300 text-sm pt-1">{`Last modified: ${formettedData}`}</p>
        //         {/* <p className="text-day-300 text-sm mt-1">{item.description}</p> */}
        //     </div>
        // </div>
        <div className="overflow-hidden rounded-lg shadow transition hover:shadow-lg bg-white relative flex flex-col"
            ref={contextmenuHandler} onContextMenu={handlecontextMenu}>
            <Image src={geom_preview2} width={500} height={500} alt={geom_preview}
                className='h-56 w-full object-cover' />
            <div className="bg-white p-4 flex flex-col justify-between flex-grow h-full">
                <div>
                    <time datetime={formettedData} className="block text-xs text-gray-500">
                        {`Last modified: ${formettedData}`}
                    </time>
                    <div className='flex flex-row justify-between items-center'>
                        <p className="mt-0.5 text-lg text-gray-900">
                            {item.name}
                        </p>
                        {/* <button className='w-8 h-8 border flex flex-row items-center justify-center'>
                            <SvgSelector id='more-horizontal' />
                        </button> */}

                    </div>

                    <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                        {item.description}
                    </p>
                </div>
                <Link href={`/workbench/${item.id}`} className="group mt-2 inline-flex items-center gap-1 text-sm font-medium text-orange-100">
                    View in Workbench
                    <span aria-hidden="true" className="block transition-all group-hover:ms-0.5 rtl:rotate-180">&rarr;</span>
                </Link>
            </div>
            {
                isActive ? (
                    <div ref={contextmenuRef} className="fixed z-10 opacity-0 max-w-[200px] w-full rounded-md bg-white shadow border text-day-350"
                        style={{ top: `${position.y}px`, left: `${position.x}px` }}>
                        <div className='px-2 py-1.5'>
                            <button className="flex w-full items-center gap-2 rounded-md px-2 h-9 text-base text-day-350 hover:bg-day-150"
                                onClick={handleExternalClick}>
                                <SvgSelector id='open' />
                                Open
                            </button>
                            <button className="flex w-full items-center gap-2 rounded-md px-2 h-9 text-base text-day-350 hover:bg-day-150"
                                onClick={() => onEditClick()}>
                                <SvgSelector id='edit' />
                                Edit
                            </button>
                        </div>
                        <div className='px-2 py-1.5 border-t'>
                            <button className="flex w-full items-center gap-2 rounded-md px-2 h-9 text-base text-red-700 hover:bg-red-50 "
                                onClick={handleDeleteClick}>
                                <SvgSelector id='delete' />
                                Delete
                            </button>
                        </div>
                    </div>
                ) : ""
            }
        </div>
    )
}
