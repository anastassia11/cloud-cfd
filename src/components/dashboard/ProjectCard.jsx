import Image from 'next/image';
import geom_preview from '@/../public/geom_preview.jpg'

export default function ProjectCard({ item = {} }) {
    return (
        <div className="bg-day-00 border rounded-lg duration-300 hover:shadow-md hover:bg-day-150 cursor-pointer">
            <Image src={geom_preview} width={500} height={500} alt={geom_preview}
                className='w-full h-48 rounded-t-md' />
            <div className="flex items-center mt-2 pt-3 ml-4 mr-2">
                <span className="block text-day-300 text-sm">{item.updateTime}</span>
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
