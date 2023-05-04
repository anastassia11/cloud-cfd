import { useState } from "react"
import SvgSelector from "../SvgSelector"

export default function FormGenerator({ formName, value }) {
    const [formValues, setFormValues] = useState(value)
    const [hidden, setHidden] = useState(false)

    const handleValueChange = (e) => {
        const { name, value } = e.target
        setFormValues(prev => ({ ...prev, [name]: { ...prev[name], defaultValue: value } }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setHidden(true)
        console.log(formValues)
    }

    const inputs = Object.keys(formValues).map((key) => (
        <div className='flex flex-row justify-between items-end mt-2'>
            <label htmlFor={key}
                className='mr-2'>{formValues[key].name}</label>
            <div>
                <input key={key} type="number" name={key} value={formValues[key].defaultValue}
                    onChange={handleValueChange}
                    className='w-24 h-8 mr-3 rounded-sm border-2 border-gray-100 p-2 focus:outline-[0]' ></input>
                <span className="pr-2">{formValues[key].unit}</span>
            </div>
        </div>
    ))

    return (
        <form onSubmit={handleFormSubmit} className={`${hidden && 'hidden'}  flex flex-col bg-white w-96 p-3 shadow`}>
            <div className='flex flex-row justify-between items-center border-b-2 pb-2'>
                <p className='self-end font-semibold'>{formName}</p>
                <button type="submit"
                    className='flex items-center self-end justify-center w-8 h-8 bg-gray-200 rounded hover:shadow hover:bg-gray-300 active:shadow-inner'>
                    <SvgSelector id='check' />
                </button>
            </div>
            {inputs}
        </form>
    );
};
