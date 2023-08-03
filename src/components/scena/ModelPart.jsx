import React, { useEffect, useRef, useState } from 'react'
import SvgSelector from '../SvgSelector'

export default function ModelPart({ handleClick, name, onVisible }) {
    const [visible, setVisible] = useState(onVisible)

    useEffect(() => {
        setVisible(onVisible)
    }, [onVisible])

    const handleVisibleClick = () => {
        handleClick()
        setVisible(!visible)
    }

    const handleRenameClick = (event) => {
        event.stopPropagation()
        ///onRenameClick
        setIsActive(false)
    }

    return (
        <div className={`model-part w-full flex items-center justify-between rounded-md px-2
            ${visible ? 'text-day-350' : 'text-day-250'} h-9 ${visible && 'hover:bg-day-150'} ${visible && 'active:bg-day-200'} duration-300`}>
            <p>{`${name.slice(0, 20)}${name.length < 20 ? '' : '...'}`}</p>
            <div>
                <button className="invisible more-button pr-2">
                    <SvgSelector id='more' />
                </button>
                <button onClick={handleVisibleClick}>
                    {visible ? <SvgSelector id='visible' /> : <SvgSelector id='unvisible' />}
                </button>
            </div>

            {/* {
                isActive ? (
                    <div ref={contextmenuRef} className="fixed z-10 opacity-0 w-32 rounded-md bg-white shadow border text-day-350 p-2" style={{ top: `${position.y}px`, left: `${position.x}px` }}>
                        <button className="flex w-full items-center gap-2 rounded-md px-2 h-9 text-base text-day-350 hover:bg-day-150"
                            onClick={handleRenameClick}>
                            Rename
                        </button>
                        <button className="flex w-full items-center gap-2 rounded-md px-2 h-9 text-base text-day-350 hover:bg-day-150"
                            onClick={() => handleVisibleClick()}>
                            {visible ? 'Hide' : 'Show'}
                        </button>
                    </div>
                ) : ""
            } */}
        </div>
    )
}
