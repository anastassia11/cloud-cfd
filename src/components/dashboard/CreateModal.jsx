import { useState } from 'react'
import SvgSelector from '../SvgSelector'
import create_project from '@/pages/api/project'
import { Oval } from 'react-loader-spinner'

export default function CreateModal({ onCloseClick }) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false)

    const handleCreateClick = async (projectName) => {
        setLoading(true)
        const result = await create_project(projectName)
        if (result.success) {
            console.log(`Project created: ${projectName}`)
        } else {
            alert(result.message)
        }
        onCloseClick()
    }

    return (
        <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="fixed inset-0 w-full h-full bg-black opacity-40" onClick={() => onCloseClick()}></div>
            <div className="flex items-center min-h-screen px-4 py-8">
                <div className="relative w-full max-w-lg mx-auto bg-white rounded-md shadow-lg">
                    <div className="flex items-center justify-between py-2 px-4 border-b">
                        <h4 className="text-base font-medium text-day-350">
                            Create new project
                        </h4>
                        <button className="p-2 rounded-md text-day-350 hover:bg-day-150 active:bg-day-200 duration-300"
                            onClick={() => onCloseClick()}>
                            <SvgSelector id='close' />
                        </button>
                    </div>
                    <div className="px-4 mt-3 text-base leading-relaxed text-gray-500">
                        <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
                            <div className='flex items-end justify-between'>
                                <label className="font-medium text-day-350">
                                    Project title
                                </label>
                                <input type="text" placeholder="Enter a title..." value={title} onChange={(e) => setTitle(e.target.value)}
                                    className="w-60 mt-2 px-4 h-9 focus:outline-[0] text-day-350 border-b outline-none bg-day-00 border-day-100 focus:border-day-250 " />
                            </div>
                            <div className='flex items-end justify-between'>
                                <label className="font-medium text-day-350">
                                    Project description
                                </label>
                                <input type="text" placeholder="Describe your project..." value={description} onChange={(e) => setDescription(e.target.value)}
                                    className="w-60 mt-2 px-4 h-9 focus:outline-[0] text-day-350 border-b outline-none bg-day-00 border-day-100 focus:border-day-250 " />
                            </div>
                        </form>
                    </div>
                    <div className="flex items-center p-4 justify-end mt-3">
                        <button className="w-36 disabled:bg-orange-disabled px-4 h-9 text-base font-medium text-white bg-orange-100 hover:bg-orange-150 active:bg-orange-200 rounded-lg duration-300 flex items-center justify-center"
                            onClick={() => handleCreateClick(`title:${title} description:${description}`)}>
                            {loading ?
                                <Oval
                                    height={20}
                                    width={20}
                                    color="#FFFFFF"
                                    visible={true}
                                    ariaLabel='oval-loading'
                                    secondaryColor="#FFFFFF"
                                    strokeWidth={4}
                                    strokeWidthSecondary={4} /> : 'Create Project'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
