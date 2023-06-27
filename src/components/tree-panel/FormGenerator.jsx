import { useState } from "react"
import SvgSelector from "../svg/SvgSelector"

export default function FormGenerator({ formTitle, value, setUserValue, onItemClick }) {
    const [formValues, setFormValues] = useState(value)
    const [selectedOption, setSelectedOption] = useState({});

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
        setUserValue(formValues)
        onItemClick()
    }

    const inputs = Object.keys(formValues).map((key) => {
        const isSelect = formValues[key].select
        const input = isSelect
            ? <select value={selectedOption[key] || formValues[key].value} onChange={(e) => handleSelectChange(e, key)}
                className="p-0 h-8 w-full rounded-md border border-gray-100 focus:outline-[0] focus:border-[#f9a86267] duration-150">
                {formValues[key].options.map((item) => <option value={item} key={item}>{item}</option>)}
            </select >
            : <div className="flex flex-row items-center">
                <input type="number" name={key} value={formValues[key].value} onChange={handleInputChange}
                    className='h-8 w-3/4 rounded-md border border-gray-100 p-2 focus:outline-[0] focus:border-[#f9a86267] duration-150' >
                </input>
                <span className="px-2 w-1/4 text-center cursor-default">{formValues[key].unit}</span>
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
        <form onSubmit={handleFormSubmit} className='flex flex-col bg-white w-96 p-3 shadow rounded-lg'>
            <div className='flex flex-row justify-between items-center border-b pb-2'>
                <p className='self-end font-medium'>{formTitle}</p>
                <button type="submit" className='p-2 rounded-md text-gray-500 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 duration-150'>
                    <SvgSelector id='check' />
                </button>
            </div>
            {inputs}
        </form>
    )
}
