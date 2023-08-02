import Image from 'next/image';
import geom_preview from '@/../public/geom_preview.jpg'
import { useRouter } from 'next/router';
import SvgSelector from '../SvgSelector';

export default function ProjectCard({ item = {}, onDeleteClick, onEditClick }) {
    const router = useRouter()

    const date = new Date(item.updateTime)
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    const formettedData = `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}.${year}`

    return (
        <div className="relative bg-day-00 border rounded-lg duration-300 hover:shadow-md cursor-pointer"
            onClick={() => router.push(`/workbench/${item.uid}`)}>
            <button className="absolute right-6 p-2 rounded-md text-day-300 hover:text-black duration-300 w-8 h-8"
                onClick={() => onDeleteClick()}>
                <SvgSelector id='edit' />
            </button>
            <button className="absolute right-0 top-[2px] p-2 rounded-md text-day-300 hover:text-black duration-300 w-8 h-8"
                onClick={() => onEditClick()}>
                <SvgSelector id='close' />
            </button>
            <Image src={geom_preview} width={500} height={500} alt={geom_preview}
                className='w-full h-48 rounded-t-md' />
            <div className="flex items-center mt-2 pt-3 ml-4 mr-2">
                <span className="block text-day-300 text-sm">{formettedData}</span>
            </div>
            <div className="pt-3 ml-4 mr-2 mb-3">
                <h3 className="text-base text-day-3550 font-medium">
                    {item.name}
                </h3>
                <p className="text-day-300 text-sm mt-1">{item.description}</p>
            </div>

        </div>
    )
}
