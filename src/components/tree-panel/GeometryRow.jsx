import React, { useState } from 'react'
import SvgSelector from '../SvgSelector'
import DeleteModal from '../scena/DeleteModal'
import { Oval } from 'react-loader-spinner'

export default function GeometryRow({ geometry, loading }) {
    const [modal, setModal] = useState(false)

    const handleDeleteClick = (e) => {
        e.stopPropagation()
        setModal(true)
    }

    return (
        <div className='w-full flex items-center justify-between rounded-md text-day-350 h-9 hover:bg-day-100 
        duration-300' >
            <p className='pl-2'>{geometry.name}</p>
            <div className='pr-2 flex flex-row items-center'>
                {loading ?
                    <Oval
                        height={18}
                        width={18}
                        color="#6a6a6a"
                        visible={true}
                        ariaLabel='oval-loading'
                        secondaryColor="#6a6a6a"
                        strokeWidth={4}
                        strokeWidthSecondary={4} /> : ''
                }
                <button className="pl-1" id='button' type='button'
                    onClick={(e) => handleDeleteClick(e)}>
                    <SvgSelector id='delete' className='w-5 h-5' stroke-width={1.3} />
                </button>
            </div>
            {modal ? <DeleteModal onCloseClick={() => setModal(false)} geometry={geometry} /> : ''}
        </div>
    )
}
