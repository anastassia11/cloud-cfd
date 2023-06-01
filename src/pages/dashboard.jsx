import { useEffect, useRef, useState } from "react"

export default function DashboardPage() {
    const contextmenuRef = useRef()
    const contextmenuHandler = useRef()
    const [isActive, setIsActive] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const handlecontextMenu = (e) => {
        e.preventDefault()
        const { pageX, pageY } = e
        setIsActive(true)
        setTimeout(() => {
            const rect = contextmenuRef.current.getBoundingClientRect();
            const x = (pageX + rect.width) > window.innerWidth ? (window.innerWidth - rect.width) : pageX + 2;
            const y = (pageY + rect.height) > window.innerHeight ? (window.innerHeight - rect.height) : pageY + 2;
            setPosition({ x, y })
            contextmenuRef.current.classList.remove("opacity-0")
            // document.documentElement.classList.add("overflow-hidden")
        }, 100)
    }

    const resetToDefault = () => {
        setIsActive(false)
        document.documentElement.classList.remove("overflow-hidden")
    }

    useEffect(() => {
        document.addEventListener("click", () => resetToDefault())
        document.addEventListener("contextmenu", (e) => {
            if (contextmenuHandler.current && !contextmenuHandler.current.contains(e.target)) resetToDefault()
        })
    }, [])


    return (
        <main className="px-4">
            <div ref={contextmenuHandler} onContextMenu={handlecontextMenu} className="max-w-sm h-32 mx-auto mt-12 rounded-lg border border-dashed bg-gray-50 text-sm flex items-center justify-center select-none text-gray-600">
                <p>Right click here.</p>
            </div>
            {
                isActive ? (
                    <div ref={contextmenuRef} className="fixed z-10 opacity-0 max-w-[17rem] w-full rounded-lg bg-white shadow-md border text-sm text-gray-800" style={{ top: `${position.y}px`, left: `${position.x}px` }}>
                        <div className="px-2 py-1.5 border-t" >
                            <button className="w-full flex items-center justify-between gap-x-2 px-2 py-1.5 hover:text-white hover:bg-blue-600 active:bg-blue-500 rounded-lg duration-150 group cursor-default" role="menuitem">
                                delete
                            </button>
                        </div>
                    </div>

                ) : ""
            }
        </main>
    )
}
