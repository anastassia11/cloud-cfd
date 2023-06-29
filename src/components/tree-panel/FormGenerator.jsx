import { useState } from "react"
import SvgSelector from "../SvgSelector"

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
            ? <select value={selectedOption[key] || formValues[key].value}
                onChange={(e) => handleSelectChange(e, key)}
                className="p-0 h-8 w-full focus:outline-[0] text-day-350 border rounded-md outline-none bg-day-00 shadow-sm border-day-200 focus:border-day-250">
                {formValues[key].options.map((item) => <option value={item} key={item}
                    className=''>{item}</option>)}
            </select >
            : <div className="flex flex-row items-center">
                <input type="number" name={key} value={formValues[key].value}
                    onChange={handleInputChange}
                    className='h-8 w-3/4 p-2 focus:outline-[0] text-day-350 border rounded-md outline-none bg-day-00 shadow-sm border-day-200 focus:border-[#c9c9c9]' >
                </input>
                <span className="px-2 w-1/4 text-center cursor-default">{formValues[key].unit}</span>
            </div>
        return (
            <div key={key} className='flex flex-row items-end mt-2'>
                <label htmlFor={key}
                    className='w-1/2 text-left'>{formValues[key].name}</label>
                <div className='w-1/2'>
                    {input}
                </div>
            </div >
        )
    })

    return (
        <form onSubmit={handleFormSubmit} className='flex flex-col bg-day-00 rounded-md shadow w-[335px] p-3'>
            <div className='flex flex-row justify-between items-center border-b pb-2'>
                <p className='self-end'>{formTitle}</p>
                <button type="submit" className="p-2 rounded-md text-day-350 bg-day-100 hover:bg-day-150 active:bg-day-200 duration-300">
                    <SvgSelector id='check' />
                </button>
            </div>
            {inputs}
        </form>
    )
}
