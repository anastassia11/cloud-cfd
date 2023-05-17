import { useState } from 'react'
import clsx from 'clsx'
import SvgSelector from '../SvgSelector'
import FormGenerator from './FormGenerator'
import GeometryForm from './GeometryForm'

export default function Setting({ simulationId, name, formName, groupItem, groupName, children, inputs = {}, openSetting, onSettingClick }) {
    const [showChildren, setShowChildren] = useState(true)

    return (
        children
            ? <>
                <div className='pl-8 py-1 space-x-2 flex flex-row items-center '>
                    <button onClick={() => setShowChildren(!showChildren)}
                        className='flex justify-center items-center w-4 h-4 border-solid border-[1.5px] border-gray-400 hover:border-gray-600'>
                        {showChildren ? <SvgSelector id='minus' /> : <SvgSelector id='plus' />}
                    </button>
                    <span>{groupName}</span>
                </div>
                {showChildren && <div>{children}</div>}
            </>
            : <>
                <div className={clsx('hover:bg-gray-100 active:shadow-inner py-1 cursor-pointer',
                    {
                        'pl-[75px]': groupItem, 'pl-14': !groupItem, 'bg-slate-200': openSetting === simulationId + formName
                    })}
                    onClick={() => {
                        console.log(openSetting)
                        onSettingClick(formName)
                    }}>
                    {name}
                </div>
                <div className={clsx('absolute top-[60px] left-[410px]', {
                    'invisible': openSetting !== simulationId + formName
                })}>
                    {formName == 'geomerty' ? <GeometryForm formTitle={name} formName={formName} /> : <FormGenerator value={inputs} formName={formName} formTitle={name} />}
                </div>
            </>
    )
}