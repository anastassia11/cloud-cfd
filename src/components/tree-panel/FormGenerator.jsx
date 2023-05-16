import { useState } from "react"
import { useDispatch } from 'react-redux'
import { formValuesChange, settingClick } from '../../store/simulationSlice'
import SvgSelector from "../SvgSelector"

export default function FormGenerator({ formTitle, value, formName }) {
    const [formValues, setFormValues] = useState(value)
    const [selectedOption, setSelectedOption] = useState({})

    const dispatch = useDispatch()

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormValues(prev => ({ ...prev, [name]: { ...prev[name], value: value } }))
    }
    const handleSelectChange = (e, name) => {
        const { value } = e.target
        setSelectedOption(prev => ({ ...prev, [name]: value }))
        setFormValues(prev => ({ ...prev, [name]: { ...prev[name], value: value } }))
    }
    const handleFormSubmit = (e) => {
        e.preventDefault()
        dispatch(formValuesChange({ formName, updatedValue: formValues }))
        dispatch(settingClick({ formName }))
    }

    const inputs = Object.keys(formValues).map((key) => {
        const isSelect = formValues[key].select
        const input = isSelect
            ? <select value={selectedOption[key] || formValues[key].value} onChange={(e) => handleSelectChange(e, key)}
                className="p-0 h-8 w-full rounded-sm border-2 border-gray-100 focus:outline-[0]">
                {formValues[key].options.map((item) => <option value={item} key={item}>{item}</option>)}
            </select >
            : <div className="flex flex-row items-center">
                <input type="number" name={key} value={formValues[key].value} onChange={handleInputChange}
                    className='h-8 w-3/4 rounded-sm border-2 border-gray-100 p-2 focus:outline-[0]' >
                </input>
                <span className=" px-2 w-1/4 text-center">{formValues[key].unit}</span>
            </div>
        return (
            <div key={key} className='flex flex-row items-end mt-2'>
                <label htmlFor={key}
                    className='w-1/2'>{formValues[key].name}</label>
                <div className='w-1/2'>
                    {input}
                </div>
            </div >
        )
    })

    return (
        <form onSubmit={handleFormSubmit} className='flex flex-col bg-white w-96 p-3 shadow'>
            <div className='flex flex-row justify-between items-center border-b-2 pb-2'>
                <p className='self-end font-semibold'>{formTitle}</p>
                <button type="submit"
                    className='flex items-center self-end justify-center w-8 h-8 bg-gray-200 rounded hover:shadow hover:bg-gray-300 active:shadow-inner'>
                    <SvgSelector id='check' />
                </button>
            </div>
            {inputs}
        </form>
    )
}
