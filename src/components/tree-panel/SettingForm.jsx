import React from 'react'
import GeometryForm from './GeometryForm'
import FormGenerator from './FormGenerator'
import { useSelector } from 'react-redux'

export default function SettingForm({ }) {
    const formTitle = useSelector(state => state.setting.formTitle)
    const formName = useSelector(state => state.setting.formName)
    const inputs = useSelector(state => state.setting.inputs)

    return (
        <div className='h-fit max-h-[calc(100vh-73px)]'>
            {formName === 'geomerty' ? <GeometryForm /> :
                <FormGenerator value={inputs} formName={formName} formTitle={formTitle} />}
        </div>
    )
}
