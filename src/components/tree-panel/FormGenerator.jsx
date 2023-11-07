import { useState } from "react"
import SvgSelector from "../SvgSelector"
import { useDispatch, useSelector } from 'react-redux';
import { setUserValue } from '@/store/slices/paramsSlice';
import { resetSetting, setFormValues } from '@/store/slices/settingSlice';

export default function FormGenerator({ formName, formTitle }) {
    // const [formValues, setFormValues] = useState(value || {})
    const [selectedOption, setSelectedOption] = useState({})
    const formValues = useSelector(state => state.setting.inputs)

    const dispatch = useDispatch()

    const handleInputChange = (e) => {
        const { name, value } = e.target
        dispatch(setFormValues({ name, value }))
    }

    const handleSelectChange = (e, name) => {
        const { value } = e.target
        setSelectedOption(prev => ({ ...prev, [name]: value }))
        setFormValues(prev => ({ ...prev, [name]: { ...prev[name], value: value } }))
    }
    const handleFormSubmit = (e) => {
        e.preventDefault()
        dispatch(setUserValue({ formName, updatedValue: formValues }))
        dispatch(resetSetting())
    }

    // useEffect(() => {
    //     if (value) {
    //         setFormValues(value);
    //     }
    // }, [value])

    const inputs = Object.keys(formValues ? formValues : []).map((key) => {
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
                <span className={`px-2 w-1/4 text-center cursor-default ml-1 ${formValues[key].unit && 'border-b py-[4px]'}`}>{formValues[key].unit}</span>
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
        <form onSubmit={handleFormSubmit} className='flex flex-col bg-day-00 rounded-md shadow p-3 h-fit'>
            <div className='flex flex-row justify-between items-center border-b pb-2'>
                <p className='self-end'>{formTitle}</p>
                <div className='flex flex-row space-x-[6px]'>
                    <button type="submit" className="disabled:bg-orange-disabled text-base font-medium text-white 
                        bg-orange-200 hover:bg-orange-100 active:bg-orange-150 duration-300 
                        rounded-md  w-8 h-8 border flex items-center justify-center">
                        <SvgSelector id='check' />
                    </button>
                    <button className="rounded-md text-day-300 w-8 h-8 border bg-day-50 hover:bg-day-100 
                        active:bg-day-150 flex items-center justify-center">
                        <SvgSelector id='close' />
                    </button>
                </div>
            </div>
            {inputs}
        </form>
    )
}
