import React, { useEffect } from 'react'
import GeometryForm from './forms/GeometryForm'
import { useSelector } from 'react-redux'
import LayerForm from './forms/LayerForm'

export default function SettingForm({ }) {
    const formTitle = useSelector(state => state.setting.formTitle)
    const formName = useSelector(state => state.setting.formName)
    const inputs = useSelector(state => state.setting.inputs)

    const Form = () => {
        if (formName === 'geomerty') {
            return <GeometryForm />
        } else if (typeof formName === 'string' && formName.startsWith('layer')) {
            return <LayerForm />
        }
        // else return <FormGenerator value={inputs} formName={formName} formTitle={formTitle} />

    }
    return (
        <div className='h-fit max-h-[calc(100vh-73px)]'>
            <Form />
        </div>
    )
}
