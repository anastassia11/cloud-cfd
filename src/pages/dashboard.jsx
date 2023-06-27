import Header from '@/components/header/Header'
import geom_preview from '@/../public/geom_preview.jpg'
import Image from 'next/image'
import SvgSelector from '@/components/svg/SvgSelector'

export default function DashboardPage() {
    const projects = [
        {
            title: "Project name",
            desc: "Project description",
            img: <Image src={geom_preview} width={500} height={500} alt={geom_preview}
                className='w-full h-48 rounded-t-md' />,
            date: "Jan 4 2022"
        },
        {
            title: "Project name",
            desc: "Project description",
            img: <Image src={geom_preview} width={500} height={500} alt={geom_preview}
                className='w-full h-48 rounded-t-md' />,
            date: "Jan 4 2022"
        },
        {
            title: "Project name",
            desc: "Project description",
            img: <Image src={geom_preview} width={500} height={500} alt={geom_preview}
                className='w-full h-48 rounded-t-md' />,
            date: "Jan 4 2022"
        },
        {
            title: "Project name",
            desc: "Project description",
            img: <Image src={geom_preview} width={500} height={500} alt={geom_preview}
                className='w-full h-48 rounded-t-md' />,
            date: "Jan 4 2022"
        }
    ]

    return (
        <div className='w-screen min-h-screen bg-gray-100'>
            <Header />
            <div className="px-10 py-5">
                <div className='flex flex-row justify-between space-x-2'>
                    <h1 className="text-xl py-2 text-gray-600 font-medium">
                        Projects
                    </h1>
                    <div className='flex flex-row justify-end space-x-2'>
                        <div className="relative">
                            <SvgSelector id='search' />
                            <input type="text" placeholder="Search" className="w-80 h-10 pl-12 pr-4 text-base text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-[#f9a86267]" />
                        </div>
                        <button className="w-40 px-4 h-10 text-base text-white font-medium bg-[#f98929] hover:bg-[#ff9639] active:bg-[#ff8d29] rounded-lg duration-150">
                            New Project
                        </button>
                    </div>
                </div>

                <section className="">

                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                        {
                            projects.map((items, key) => (
                                <article className="max-w-md mx-auto mt-4 bg-white shadow-md border rounded-lg duration-300 hover:shadow-sm cursor-pointer" key={key}>
                                    <a href={items.href}>
                                        {items.img}
                                        <div className="flex items-center mt-2 pt-3 ml-4 mr-2">
                                            <span className="block text-gray-400 text-sm">{items.date}</span>
                                        </div>
                                        <div className="pt-3 ml-4 mr-2 mb-3">
                                            <h3 className="text-base text-gray-600 font-medium">
                                                {items.title}
                                            </h3>
                                            <p className="text-gray-400 text-sm mt-1">{items.desc}</p>
                                        </div>
                                    </a>
                                </article>
                            ))
                        }
                    </div>
                </section>
            </div>
        </div>
    )
}

DashboardPage.requiresAuth = true
