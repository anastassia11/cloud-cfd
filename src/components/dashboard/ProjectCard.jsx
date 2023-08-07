import Image from 'next/image';
import geom_preview from '@/../public/geom_preview.jpg'
import geom_preview2 from '@/../public/geom_preview2.jpg'
import { useRouter } from 'next/router';
import SvgSelector from '../SvgSelector';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ProjectCard({ item = {}, onDeleteClick, onEditClick }) {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)

    const date = new Date(item.updateTime)
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    const formettedData = `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}.${year}`

    useEffect(() => {
        document.addEventListener("click", handleMenuClose);
        return () => {
            document.removeEventListener("click", handleMenuClose);
        }
    }, [])

    const handleMenuOpen = () => {
        console.log('handleMenuOpen')
        setIsOpen(true)
    }

    const handleMenuClose = (e) => {
        if (e.target.tagName !== "BUTTON") {
            setIsOpen(false)
        }
    }

    const handleExternalClick = () => {
        router.push(`/workbench/${item.id}`)
    }

    const handleDeleteClick = (e) => {
        e.stopPropagation()
        onDeleteClick()
    }

    return (
        <div className="group overflow-hidden rounded-lg shadow transition hover:shadow-lg bg-white flex flex-col">
            <Image src={geom_preview2} width={500} height={500} alt={geom_preview}
                className='h-56 w-full object-cover' />
            <div className="bg-white p-4 flex flex-col justify-between flex-grow h-full">
                <div>
                    <div className='flex flex-row justify-between items-start'>
                        <time datetime={formettedData} className="block text-xs text-gray-500">
                            {`Last modified: ${formettedData}`}
                        </time>
                        <div className='relative'>
                            <button className='flex items-end flex-row justify-end group-hover:visible'
                                onClick={handleMenuOpen}>
                                <SvgSelector id='more' className='w-[16px] h-[16px] rotate-90' />
                            </button>

                            <div className="group-hover:visible absolute right-0 z-10 max-w-[200px] w-[200px] rounded-md bg-white shadow border text-day-350">
                                <div className='px-2 py-1.5'>
                                    <button className="flex w-full items-center gap-2 rounded-md px-2 h-9 text-base text-day-350 hover:bg-day-150"
                                    >
                                        <SvgSelector id='open' />
                                        Open
                                    </button>
                                    <button className="flex w-full items-center gap-2 rounded-md px-2 h-9 text-base text-day-350 hover:bg-day-150"
                                    >
                                        <SvgSelector id='edit' className='w-5 h-5' />
                                        Edit
                                    </button>
                                </div>
                                <div className='px-2 py-1.5 border-t'>
                                    <button className="flex w-full items-center gap-2 rounded-md px-2 h-9 text-base text-red-700 hover:bg-red-50 "
                                    >
                                        <SvgSelector id='delete' className="h-5 w-5" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                    <p className="mt-0.5 text-lg text-gray-900">
                        {item.name}
                    </p>
                    <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                        {item.description}
                    </p>
                </div>
                <Link href={`/workbench/${item.id}`} className="group mt-2 inline-flex items-center gap-1 text-sm font-medium text-orange-100">
                    View in Workbench
                    <span aria-hidden="true" className="block transition-all group-hover:ms-0.5 rtl:rotate-180">&rarr;</span>
                </Link>
            </div>


        </div >
    )
}
