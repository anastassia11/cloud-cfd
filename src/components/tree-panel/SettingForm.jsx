import React from 'react'
import GeometryForm from './GeometryForm'
import FormGenerator from './FormGenerator'
import { useDispatch, useSelector } from 'react-redux'
import { selectSetting, setSetting } from '@/store/slices/settingSlice'
import { setUserValue } from '@/store/slices/paramsSlice'

export default function SettingForm({ }) {
    const dispatch = useDispatch()
    const formTitle = useSelector(state => state.setting.formTitle)
    const formName = useSelector(state => state.setting.formName)
    const inputs = useSelector(state => state.setting.inputs)

    const form = formName === 'geomerty' ? <GeometryForm onItemClick={() => dispatch(setSetting(formName))} /> :
        <FormGenerator value={inputs} formName={formName} formTitle={formTitle}
            onItemClick={() => dispatch(selectSetting(formName))} />

    return (
        <div className=''>
            {form}
        </div>
    )
}
