import React, { useEffect, useRef, useState } from 'react'
import { Oval } from 'react-loader-spinner'
import SvgSelector from './SvgSelector'

export default function Modal({ title, btnTitle, message, onActionClick, onCloseClick }) {
    const [loading, setLoading] = useState(false)
    const modalRef = useRef(null)

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            onActionClick()
        }
    }

    const handleOkClick = () => {
        setLoading(true)
        onActionClick()
    }

    useEffect(() => {
        modalRef.current.focus()
    }, [])

    return (
        <div ref={modalRef}
            className="fixed inset-0 z-20 overflow-y-auto" onKeyDown={(e) => handleKeyDown(e)} tabIndex={0}>
            <div className="fixed inset-0 w-full h-full bg-black opacity-40" onClick={() => onCloseClick()}></div>
            <div className="flex items-center min-h-screen px-4 py-8 ">
                <div className="relative w-full max-w-lg mx-auto bg-white rounded-md shadow-lg">
                    <div className="flex items-center justify-between py-2 pl-4 pr-2 border-b">
                        <h4 className="text-base font-medium text-day-350">
                            {title}
                        </h4>
                        <button className="rounded-md text-day-300 w-8 h-8 hover:border hover:bg-day-50 active:bg-day-100 flex items-center justify-center"
                            onClick={() => onCloseClick()}>
                            <SvgSelector id='close' />
                        </button>
                    </div>
                    <div className="px-4 mt-3 text-base leading-relaxed text-gray-500">
                        {message}
                    </div>
                    <div className="flex items-center p-4 justify-end">
                        <button className="w-36 disabled:bg-orange-disabled px-4 h-9 text-base font-medium text-white
                         bg-orange-100 hover:bg-orange-150 active:bg-orange-200 rounded-lg duration-300 flex 
                         items-center justify-center"
                            onClick={handleOkClick}
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
                                    strokeWidthSecondary={4} /> : btnTitle}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
