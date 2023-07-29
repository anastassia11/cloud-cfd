import React, { useEffect, useState } from 'react'
import SvgSelector from '../SvgSelector'

export default function ModelPart({ handleClick, name, onVisible }) {
    const [visible, setVisible] = useState(onVisible)

    useEffect(() => {
        setVisible(onVisible)
    }, [onVisible])

    const handleButtonClick = () => {
        handleClick()
        setVisible(!visible)
    }
    return (
        <div className="w-full flex items-center justify-between rounded-md px-2 cursor-pointer text-day-350 h-9 hover:bg-day-150 active:bg-day-200 duration-300">
            {name}
            <button onClick={handleButtonClick}>
                {visible ? <SvgSelector id='visible' /> : <SvgSelector id='unvisible' />}
            </button>
        </div>
    )
}
