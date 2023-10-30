import { useDispatch } from 'react-redux';
import SvgSelector from '../SvgSelector';
import { resetSetting } from '@/store/slices/settingSlice';
import { useEffect, useState } from 'react';
import meshFormDefault from '@/components/tree-panel/assets/meshFormData.json'

export default function MeshForm() {
    const dispatch = useDispatch()
    const [formData, setFormData] = useState(meshFormDefault)
    const [advancedSettingsVisible, setAdvancedSettingsVisible] = useState(true)

    const handleFormSubmit = (e) => {
        e.preventDefault()
        dispatch(resetSetting())
    }

    const inputDataChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: Number(value) }))
    }

    const toogleDataChange = (e) => {
        const { name, checked } = e.target
        setFormData((prev) => ({ ...prev, [name]: checked }))
    }

    const selectDataChange = (e) => {
        const { name, value } = e.target
        console.log(e.target)
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const Input = ({ label, name, unit }) => {
        return (
            <div className='flex flex-row items-end mb-2 justify-between h-8'>
                <label htmlFor={name} className='w-full text-left'>{label}</label>
                <div className="flex flex-row items-center w-[250px]">
                    <input type="number" id={name} name={name} value={formData[name]} onChange={inputDataChange}
                        className={`h-8 ${unit ? 'w-3/4' : 'w-full'} p-2 focus:outline-[0] text-day-350 border rounded-md 
                            outline-none bg-day-00 shadow-sm border-day-200 focus:border-[#c9c9c9]`}>
                    </input>
                    {unit && <span className={`px-2 w-1/4 text-center cursor-default ml-1 border-b py-[4px]`}>{unit}</span>}
                </div>
            </div>
        )
    }

    const Toogle = ({ label, name }) => {
        return (
            <div className='flex flex-row items-end mb-2 h-8'>
                <label htmlFor={name} className='w-full text-left'>{label}</label>
                <div className="flex flex-row items-center">
                    <label htmlFor={name} className="relative h-[24px] w-9 cursor-pointer 
                [-webkit-tap-highlight-color:_transparent]">
                        <input type="checkbox" name={name} id={name} className="peer sr-only" checked={formData[name]}
                            onChange={toogleDataChange} />
                        <span className="absolute inset-0 m-auto h-[6px] rounded-full bg-gray-300"></span>
                        <span className="absolute inset-y-0 start-0 m-auto h-[18px] w-[18px] rounded-full bg-gray-400 
                transition-all peer-checked:bg-orange-200 peer-checked:start-[18px]">
                        </span>
                    </label>
                </div>
            </div>
        )
    }

    const Select = ({ label, name, options, unit }) => {
        return (
            <div className='flex flex-row items-end justify-between mb-2 h-8'>
                <label htmlFor={name} className='w-full text-left'>{label}</label>
                <div className="flex flex-row items-center w-[250px]">
                    <select value={formData[name]} onChange={selectDataChange} name={name}
                        className="p-0 h-8 w-full focus:outline-[0] text-day-350 border rounded-md outline-none 
                        bg-day-00 shadow-sm border-day-200 focus:border-day-250">
                        {Object.keys(options).map((key) => <option value={key} key={key}
                            className=''>{options[key]}</option>)}
                    </select >
                    {unit && <span className={`px-2 w-1/4 text-center cursor-default ml-1 border-b py-[4px]`}>{unit}</span>}
                </div>
            </div>
        )
    }

    const thickness = {
        "FirstLayerThickness": "First layer thickness",
        "FinalLayerThickness": "Final layer thickness",
        "Thickness": "Thickness",
    }

    return (
        <form onSubmit={handleFormSubmit} className='max-h-[calc(100vh-73px)] flex flex-col bg-day-00 rounded-md 
        shadow h-fit text-day-350'>
            <div className='flex flex-row justify-between items-center border-b pb-2 p-3'>
                <p className='self-end'>Mesh</p>
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
            <div className='overflow-y-auto p-3'>
                <p className='h-8 flex items-center font-semibold'>Block mesh settings</p>
                <Input label={'Delta'} name={'Delta'} />

                <p className='h-8 flex items-center font-semibold'>Castellated mesh controls</p>
                <Input label={'Cells between levels'} name={'NCellsBetweenLevels'} />
                <Input label={'Inside point'} name={'ResolveFeatureAngle'} />

                <p className='h-8 flex items-center font-semibold'>Add layers controls</p>
                <Toogle label={'Add layers'} name={'AddLayers'} />
                {formData.AddLayers && <>
                    <Toogle label={'Relative sizes'} name={'RelativeSizes'} />
                    <Input label={'Expansion ratio'} name={'ExpansionRatio'} />
                    <Select label={'Layers thickness type'} name={'LayersThicknessType'}
                        options={thickness} />
                    {formData.LayersThicknessType === "FirstLayerThickness" &&
                        <Input label={'First layer thickness'} name={'FirstLayerThickness'} />}
                    {formData.LayersThicknessType === "FinalLayerThickness" &&
                        <Input label={'Final layer thickness'} name={'FinalLayerThickness'} />}
                    {formData.LayersThicknessType === "Thickness" &&
                        <Input label={'Thickness'} name={'Thickness'} />}
                </>}
                <div className='mt-3'>
                    <div className='flex flex-row cursor-pointer'
                        onClick={() => setAdvancedSettingsVisible(prev => !prev)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                            className={`min-w-[20px] h-5 duration-300 ${advancedSettingsVisible ? 'rotate-180' : ''}`}>
                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 
                        1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                        </svg>
                        <p className='font-semibold ml-[7px] text-day-350'>Advanced settings</p>
                    </div>
                    {advancedSettingsVisible ? <div className='flex flex-col ml-[27px]'>
                        <Input label={'Merge tolerance'} name={'MergeTolerance'} />

                        <p className='h-8 flex items-center font-semibold'>Castellated mesh controls</p>
                        <Input label={'Max global cells'} name={'MaxGlobalCells'} />
                        <Input label={'Resolve feature angle'} name={'ResolveFeatureAngle'} />
                        <Toogle label={'Allow free standing zone faces'} name={'AllowFreeStandingZoneFaces'} />

                        <p className='h-8 flex items-center font-semibold'>Snap controls</p>
                        <Toogle label={'Snap'} name={'Snap'} />
                        {formData.Snap && <>
                            <Input label={'Smooth patch'} name={'NSmoothPatch'} />
                            <Input label={'Tolerance'} name={'Tolerance'} />
                            <Input label={'Solve iterations'} name={'NSolveIter'} />
                            <Input label={'Relax iterations'} name={'NRelaxIter'} />
                            <Input label={'Feature snap iter'} name={'NFeatureSnapIter'} />

                            {formData.AddLayers && <>
                                <p className='h-8 flex items-center font-semibold'>Add layers controls</p>
                                <Input label={'Min thickness'} name={'MinThickness'} />
                                <Input label={'Grow'} name={'NGrow'} />
                                <Input label={'Feature angle'} name={'FeatureAngle'} />
                                <Input label={'Relax iterations layer'} name={'NRelaxIterLayer'} />
                                <Input label={'Smooth surface normals'} name={'NSmoothSurfaceNormals'} />
                                <Input label={'Smooth thickness'} name={'NSmoothThickness'} />
                                <Input label={'Max face thickness ratio'} name={'MaxFaceThicknessRatio'} />
                                <Input label={'Max thickness to medial ratio'} name={'MaxThicknessToMedialRatio'} />
                                <Input label={'Min median axis angle'} name={'MinMedianAxisAngle'} />
                                <Input label={'Buffer cells no extrude'} name={'NBufferCellsNoExtrude'} />
                                <Input label={'Layer iterations'} name={'NLayerIter'} />
                                <Input label={'Relaxed iterations'} name={'NRelaxedIter'} />
                            </>}
                        </>}
                    </div> : ''}
                </div>
            </div>
            <div className='w-full border-t flex flex-row justify-end items-center p-3 space-x-[6px]'>
                <button type="submit" className="rounded-md text-day-300 w-[170px] h-8 border bg-day-50 hover:bg-day-100 
                        active:bg-day-150 flex items-center justify-center">
                    <SvgSelector id='play' /><p className='ml-1'>Generate Mesh</p>
                </button>
            </div>
        </form>
    )
}