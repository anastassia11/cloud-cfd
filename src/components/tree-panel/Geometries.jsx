import { useState } from 'react'
import SvgSelector from '../SvgSelector'

export default function Geometries() {
    const [show, setShow] = useState(false)

    const handleShowClick = () => {
        setShow(!show)
    }

    return (
        <div className='flex flex-row justify-between items-center p-2 border-b-[1px]'>
            <div className='flex flex-row cursor-pointer items-center space-x-2' onClick={handleShowClick}>
                {show ? <SvgSelector id='collapse' /> : <SvgSelector id='expand' />}
                <p className='flex items-center font-semibold'>GEOMETRIES</p>
            </div>
            <button>
                <SvgSelector id='add' />
            </button>
        </div>
    )
}