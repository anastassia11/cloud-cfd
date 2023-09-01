import React from 'react'
import { useDispatch } from 'react-redux'
import { setSetting } from '@/store/slices/settingSlice'

export default function Setting({ formName, formTitle, inputs = {} }) {
    const dispatch = useDispatch()

    return (
        <>
            <div className='flex items-center rounded-md px-2 cursor-pointer text-day-350 h-9
                hover:bg-day-150 active:bg-day-200 duration-300'
                onClick={() => dispatch(setSetting({ formName, formTitle, inputs }))}>
                <p className='text-ellipsis whitespace-nowrap overflow-hidden'>{formTitle}</p>
            </div>
            {/* <SettingForm formName={formName} inputs={inputs} formTitle={formTitle}
                setUserValue={(formName, updatedValue) => onFormChange(formName, updatedValue)} /> */}
        </>
    )
}
