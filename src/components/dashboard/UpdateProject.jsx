import { useState } from 'react'
import SvgSelector from '../SvgSelector'
import { Oval } from 'react-loader-spinner'
import updateProject from '@/api/update_project'

export default function UpdateProject({ projectId, projectName, projectDescription, onCloseClick, onUpdate }) {
    const [name, setName] = useState(projectName)
    const [description, setDescription] = useState(projectDescription)
    const [loading, setLoading] = useState(false)

    const handleSubmitClick = async (projectId, name, description) => {
        setLoading(true)
        const result = await updateProject(projectId, name, description)
        if (result.success) {
            onUpdate(result.data)
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
                    <div className="flex items-center justify-between py-2 pl-4 pr-2 border-b">
                        <h4 className="text-base font-medium text-day-350">
                            Edit project details
                        </h4>
                        <button className="rounded-md text-day-300 w-8 h-8 hover:border hover:bg-day-50 active:bg-day-100 flex items-center justify-center"
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
                                <input type="text" placeholder="Enter a title..." value={name} onChange={(e) => setName(e.target.value)}
                                    className="w-60 mt-2 px-4 h-9 focus:outline-[0] text-day-350 border-b outline-none bg-day-00 border-day-100 focus:border-day-250 " />
                            </div>
                            <div className='flex items-end justify-between'>
                                <label className="font-medium text-day-350">
                                    Project description
                                </label>
                                <input type="text" placeholder="Describe your project..." value={description} onChange={(e) => setDescription(e.target.value)}
                                    className="w-60 mt-2 px-4 h-9 focus:outline-[0] text-day-350 border-b outline-none bg-day-00 border-day-100 focus:border-day-250 " />
                            </div>
                            <div className="flex items-center py-4 justify-end mt-3">
                                <button className="w-36 disabled:bg-orange-disabled px-4 h-9 text-base font-medium text-white bg-orange-100 hover:bg-orange-150 active:bg-orange-200 rounded-lg duration-300 flex items-center justify-center"
                                    onClick={() => handleSubmitClick(projectId, name, description)}
                                    disabled={loading}>
                                    {loading ?
                                        <Oval
                                            height={20}
                                            width={20}
                                            color="#FFFFFF"
                                            visible={true}
                                            ariaLabel='oval-loading'
                                            secondaryColor="#FFFFFF"
                                            strokeWidth={4}
                                            strokeWidthSecondary={4} /> : 'Update'}
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}
