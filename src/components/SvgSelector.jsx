export default function SvgSelector({ id = '', ...props }) {
    switch (id) {
        case 'simulation':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[22px] h-[22px]" {...props}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
            )

        case 'delete':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} {...props}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            )

        case 'plus':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-[17px] h-[17px]" {...props}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            )

        case 'run':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                </svg>

            )

        case 'check':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-[16px] h-[16px] ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
            )
        case 'simulations':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
                </svg>
            )
        case 'cloud-drag':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                </svg>

            )
        case 'cloud-drop':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                </svg>
            )
        case 'search':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="absolute top-0 bottom-0 w-5 h-5 my-auto text-gray-400 left-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg >
            )
        case 'close':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="w-[16px] h-[16px]" viewBox="0 0 20 20" fill="currentColor" {...props}>
                    <path fillRule="evenodd" strokeWidth={1} d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            )
        case 'visible':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            )
        case 'unvisible':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
            )
        case 'computer':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                </svg>
            )
        case 'edit':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
            )
        case 'edit2':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" {...props}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
            )
        case 'geometry':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6" {...props}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                </svg>
            )
        case 'more':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60" fill="#000000" strokeWidth={1.3} stroke="currentColor" {...props} >
                    <g>
                        <path d="M8,22c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S12.411,22,8,22z M8,36c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S11.309,36,8,36z" />
                        <path d="M52,22c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S56.411,22,52,22z M52,36c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S55.309,36,52,36z" />
                        <path d="M30,22c-4.411,0-8,3.589-8,8s3.589,8,8,8s8-3.589,8-8S34.411,22,30,22z M30,36c-3.309,0-6-2.691-6-6s2.691-6,6-6s6,2.691,6,6S33.309,36,30,36z" />
                    </g>
                </svg>
            )

        case 'open':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
            )

        case 'select-volume':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31 32" {...props}>
                    <polygon className="fill-[#f5b395]" points="6.473 10.456 15.492 5.332 24.524 10.455 15.485 15.865 6.473 10.456"></polygon>
                    <polygon className="fill-[#dc5415]" points="6.473 10.456 15.489 15.866 15.492 26.635 6.472 21.259 6.473 10.456"></polygon>
                    <polygon className="fill-[#ee824f]" points="24.524 10.455 24.528 21.305 15.492 26.635 15.492 15.866 24.524 10.455"></polygon>
                    <path d="M25,19.2774V12.7226a1.99519,1.99519,0,0,0-1.7934-3.55738L17.48846,5.91528a1.99309,1.99309,0,0,0-3.98327.0036L7.7934,9.16522A1.995,1.995,0,0,0,6,12.7226v6.5548a1.99147,1.99147,0,1,0,1.974,3.45936l5.52917,3.29467a1.99669,1.99669,0,0,0,3.99286.00794l5.55774-3.28754A1.978,1.978,0,0,0,24,23a1.994,1.994,0,0,0,1-3.7226ZM24,19a1.99034,1.99034,0,0,0-1.70233,3.03741l-5.0586,2.99286A1.99143,1.99143,0,0,0,16,24.07074V17.92926a1.95841,1.95841,0,0,0,1.41339-2.48053l5.15869-3.05121A1.99165,1.99165,0,0,0,24,13ZM8.626,9.84247,13.73969,6.936a1.9833,1.9833,0,0,0,3.51605-.00257l5.11828,2.909a1.92006,1.92006,0,0,0-.295,1.68426l-5.167,3.05725a1.99805,1.99805,0,0,0-2.819-.00415L8.92865,11.502A1.92423,1.92423,0,0,0,8.626,9.84247ZM7,13a1.98967,1.98967,0,0,0,1.44446-.6225l5.144,3.06513A1.9584,1.9584,0,0,0,15,17.92926v6.14148a1.99126,1.99126,0,0,0-1.23547.95294L8.7149,22.01422A1.98831,1.98831,0,0,0,7,19Z"></path>
                </svg>
            )

        case 'select-face':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31 32" strokeWidth="1.5" {...props}>
                    <polygon className="fill-[#dc5415]" points="6.473 10.456 15.489 15.866 15.492 26.635 6.472 21.259 6.473 10.456"></polygon>
                    <path d="M25,19.2774V12.7226a1.99519,1.99519,0,0,0-1.7934-3.55738L17.48846,5.91528a1.99309,1.99309,0,0,0-3.98327.0036L7.7934,9.16522A1.995,1.995,0,0,0,6,12.7226v6.5548a1.99147,1.99147,0,1,0,1.974,3.45936l5.52917,3.29467a1.99669,1.99669,0,0,0,3.99286.00794l5.55774-3.28754A1.978,1.978,0,0,0,24,23a1.994,1.994,0,0,0,1-3.7226ZM24,19a1.99034,1.99034,0,0,0-1.70233,3.03741l-5.0586,2.99286A1.99143,1.99143,0,0,0,16,24.07074V17.92926a1.95841,1.95841,0,0,0,1.41339-2.48053l5.15869-3.05121A1.99165,1.99165,0,0,0,24,13ZM8.626,9.84247,13.73969,6.936a1.9833,1.9833,0,0,0,3.51605-.00257l5.11828,2.909a1.92006,1.92006,0,0,0-.295,1.68426l-5.167,3.05725a1.99805,1.99805,0,0,0-2.819-.00415L8.92865,11.502A1.92423,1.92423,0,0,0,8.626,9.84247ZM7,13a1.98967,1.98967,0,0,0,1.44446-.6225l5.144,3.06513A1.9584,1.9584,0,0,0,15,17.92926v6.14148a1.99126,1.99126,0,0,0-1.23547.95294L8.7149,22.01422A1.98831,1.98831,0,0,0,7,19Z"></path>
                </svg>
            )
        case 'cylinder':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" viewBox="0 0 58 58" {...props} >
                    <path d="M29 8C13.536 8 1 6.209 1 4v50c0 2.209 12.536 4 28 4s28-1.791 28-4V4c0 2.209-12.536 4-28 4z"
                        style={{
                            fill: "#556080",
                        }}
                    />
                    <ellipse
                        cx={29}
                        cy={4}
                        rx={28}
                        ry={4}
                        style={{
                            fill: "#7383bf",
                        }}
                    />
                    <ellipse
                        cx={29}
                        cy={54}
                        rx={28}
                        ry={4}
                        style={{
                            fill: "#434c6d",
                        }}
                    />
                </svg>
            )
        case 'cube':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlSpace="preserve"
                    viewBox="0 0 58 58"
                    {...props}
                >
                    <path
                        d="M14 14h30v30H14z"
                        style={{
                            fill: "#556080",
                        }}
                    />
                    <path
                        d="M14 14H0v44l14-14z"
                        style={{
                            fill: "#434c6d",
                        }}
                    />
                    <path
                        d="M44 14 58 0H14v14z"
                        style={{
                            fill: "#7383bf",
                        }}
                    />
                    <path
                        d="M14 0 0 14h14z"
                        style={{
                            fill: "#59699b",
                        }}
                    />
                    <path
                        d="M14 44 0 58h44V44z"
                        style={{
                            fill: "#333c56",
                        }}
                    />
                    <path
                        d="M44 14v30h14V0z"
                        style={{
                            fill: "#434c6d",
                        }}
                    />
                    <path
                        d="m44 58 14-14H44z"
                        style={{
                            fill: "#47526d",
                        }}
                    />
                </svg>
            )
    }
}