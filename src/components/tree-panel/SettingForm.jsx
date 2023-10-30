import React from 'react'
import GeometryForm from './GeometryForm'
import FormGenerator from './FormGenerator'
import { useSelector } from 'react-redux'
import MeshForm from './MeshForm'

export default function SettingForm({ }) {
    const formTitle = useSelector(state => state.setting.formTitle)
    const formName = useSelector(state => state.setting.formName)
    const inputs = useSelector(state => state.setting.inputs)

    const Form = () => {
        if (formName === 'geomerty') {
            return <GeometryForm />
        } else if (formName === 'mesh') {
            return <MeshForm />
        } else return <FormGenerator value={inputs} formName={formName} formTitle={formTitle} />

    }
    return (
        <div className='h-fit max-h-[calc(100vh-73px)]'>
            <Form />
        </div>
    )
}
