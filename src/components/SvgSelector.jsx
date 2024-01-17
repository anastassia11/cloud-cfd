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
        case 'update':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[20px] h-[20px]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
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
        case 'play':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[22px] h-[22px]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                </svg>
            )
        case 'stop':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[22px] h-[22px]">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
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
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlSpace="preserve"
                    viewBox="0 0 20 20"
                    {...props}
                >
                    <path fill="#C6C7C8" d="M1 4v12c0 1.66 4.03 3 9 3s9-1.34 9-3V4H1z" />
                    <ellipse cx={10} cy={4} fill="#90908F" rx={9} ry={3} />
                </svg>
            )
        case 'cube':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlSpace="preserve"
                    viewBox="0 0 20 20"
                    {...props}
                >
                    <path fill="#90908F" d="M1 7h15v10H1z" />
                    <path fill="#C6C7C8" d="M16 7v10l3-5V3z" />
                    <path fill="#EBEBEB" d="M4 3 1 7h15l3-4z" />
                </svg>
            )
        case 'add-folder':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlSpace="preserve"
                    viewBox="0 0 256 256"
                    width={150}
                    height={150}
                    {...props}
                >
                    <g
                        style={{
                            stroke: "none",
                            strokeWidth: 0,
                            strokeDasharray: "none",
                            strokeLinecap: "butt",
                            strokeLinejoin: "miter",
                            strokeMiterlimit: 10,
                            fill: "none",
                            fillRule: "nonzero",
                            opacity: 1,
                        }}
                    >
                        <path
                            d="M58.58 80.854H4.756A4.76 4.76 0 0 1 0 76.099V30.953a1 1 0 0 1 1-1h88a1 1 0 0 1 1 1v19.324a1 1 0 1 1-2 0V31.953H2v44.146a2.759 2.759 0 0 0 2.756 2.756H58.58a1 1 0 1 1 0 1.999z"
                            style={{
                                stroke: "none",
                                strokeWidth: 1,
                                strokeDasharray: "none",
                                strokeLinecap: "butt",
                                strokeLinejoin: "miter",
                                strokeMiterlimit: 10,
                                fill: "#959595",
                                fillRule: "nonzero",
                                opacity: 1,
                            }}
                            transform="matrix(2.81 0 0 2.81 1.407 1.407)"
                        />
                        <path
                            d="M89 31.953a1 1 0 0 1-1-1v-7.839a2.759 2.759 0 0 0-2.756-2.756h-38.63a15.03 15.03 0 0 1-8.772-2.806l-5.573-3.973a13.036 13.036 0 0 0-7.61-2.435H5.541A3.546 3.546 0 0 0 2 14.686v16.268a1 1 0 0 1-2 0V14.686a5.547 5.547 0 0 1 5.541-5.541h19.118c3.163 0 6.196.97 8.771 2.806l5.573 3.973a13.037 13.037 0 0 0 7.611 2.435h38.63A4.761 4.761 0 0 1 90 23.115v7.839a1 1 0 0 1-1 .999zM75.616 80.854c-7.932 0-14.384-6.452-14.384-14.384s6.452-14.384 14.384-14.384S90 58.539 90 66.471s-6.452 14.383-14.384 14.383zm0-26.767c-6.828 0-12.384 5.556-12.384 12.384s5.556 12.384 12.384 12.384S88 73.299 88 66.471s-5.556-12.384-12.384-12.384z"
                            style={{
                                stroke: "none",
                                strokeWidth: 1,
                                strokeDasharray: "none",
                                strokeLinecap: "butt",
                                strokeLinejoin: "miter",
                                strokeMiterlimit: 10,
                                fill: "#959595",
                                fillRule: "nonzero",
                                opacity: 1,
                            }}
                            transform="matrix(2.81 0 0 2.81 1.407 1.407)"
                        />
                        <path
                            d="M81.145 67.471H70.087a1 1 0 1 1 0-2h11.058a1 1 0 1 1 0 2z"
                            style={{
                                stroke: "none",
                                strokeWidth: 1,
                                strokeDasharray: "none",
                                strokeLinecap: "butt",
                                strokeLinejoin: "miter",
                                strokeMiterlimit: 10,
                                fill: "#e66e0d",
                                fillRule: "nonzero",
                                opacity: 1,
                            }}
                            transform="matrix(2.81 0 0 2.81 1.407 1.407)"
                        />
                        <path
                            d="M75.616 73a1 1 0 0 1-1-1V60.942a1 1 0 1 1 2 0V72a1 1 0 0 1-1 1z"
                            style={{
                                stroke: "none",
                                strokeWidth: 1,
                                strokeDasharray: "none",
                                strokeLinecap: "butt",
                                strokeLinejoin: "miter",
                                strokeMiterlimit: 10,
                                fill: "#e66e0d",
                                fillRule: "nonzero",
                                opacity: 1,
                            }}
                            transform="matrix(2.81 0 0 2.81 1.407 1.407)"
                        />
                    </g>
                </svg>
            )
        case 'mesh':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlSpace="preserve"
                    width={20}
                    height={20}
                    viewBox="0 0 512 512"
                    {...props}
                >
                    <path
                        d="M480.707 256.004c0-10.099-6.711-18.528-15.889-21.353v-74.08c9.178-2.825 15.889-11.239 15.889-21.362 0-12.386-10.044-22.422-22.43-22.422-5.916 0-11.262 2.334-15.25 6.079l-64.06-36.993c.367-1.631.608-3.302.608-5.049 0-12.394-10.044-22.431-22.438-22.431-5.916 0-11.254 2.326-15.25 6.072l-64.059-36.977c.375-1.639.616-3.31.616-5.058C278.444 10.044 268.4 0 256.006 0c-12.386 0-22.43 10.044-22.43 22.43 0 1.748.242 3.419.601 5.058l-64.052 36.977c-4.011-3.746-9.35-6.072-15.25-6.072-12.386 0-22.446 10.037-22.446 22.431 0 1.748.234 3.418.617 5.049l-64.052 36.993c-4.011-3.746-9.358-6.079-15.273-6.079-12.386 0-22.43 10.036-22.43 22.422 0 10.123 6.719 18.536 15.889 21.362v74.08c-9.17 2.825-15.889 11.254-15.889 21.353 0 10.099 6.719 18.528 15.889 21.353v74.065c-9.17 2.809-15.889 11.246-15.889 21.361 0 12.386 10.044 22.43 22.43 22.43 5.916 0 11.262-2.318 15.273-6.063l64.052 36.969c-.383 1.647-.617 3.302-.617 5.065 0 12.379 10.037 22.415 22.431 22.415 5.916 0 11.254-2.326 15.265-6.064l64.052 36.97c-.375 1.654-.609 3.31-.609 5.073 0 12.378 10.029 22.422 22.423 22.422 12.409 0 22.453-10.044 22.453-22.422 0-1.764-.241-3.419-.624-5.073l64.052-36.97c4.011 3.738 9.35 6.064 15.265 6.064 12.394 0 22.438-10.036 22.438-22.415 0-1.764-.242-3.418-.624-5.065l64.052-36.969c4.011 3.746 9.358 6.063 15.273 6.063 12.386 0 22.43-10.044 22.43-22.43 0-10.115-6.711-18.552-15.889-21.361v-74.065c9.179-2.825 15.89-11.254 15.89-21.353zM176.683 75.79l64.067-36.993c4.003 3.746 9.342 6.079 15.258 6.079 5.916 0 11.254-2.334 15.25-6.079l64.067 36.993c-.374 1.615-.616 3.294-.616 5.034 0 1.748.242 3.418.616 5.049l-64.067 36.993c-4.003-3.746-9.342-6.079-15.25-6.079-5.916 0-11.254 2.334-15.265 6.079l-64.06-36.993c.374-1.631.616-3.302.616-5.049 0-1.741-.242-3.419-.616-5.034zm-28.362 334.026c-3.286 1.022-6.251 2.7-8.71 4.995l-64.067-36.978c.382-1.631.624-3.309.624-5.049 0-10.115-6.72-18.552-15.89-21.361v-74.065c3.293-1.015 6.259-2.716 8.717-5.011l64.052 37.01c-.383 1.623-.617 3.293-.617 5.041 0 10.099 6.704 18.528 15.89 21.353v74.065zm0-116.78c-3.286 1.022-6.251 2.693-8.71 4.987l-64.067-36.986c.382-1.616.624-3.301.624-5.034 0-10.099-6.72-18.528-15.89-21.353v-74.08c3.293-1.022 6.259-2.692 8.717-4.995l64.052 36.993c-.383 1.623-.617 3.302-.617 5.042 0 10.114 6.704 18.528 15.89 21.353v74.073zm-8.71-111.784-64.067-36.994c.382-1.631.624-3.293.624-5.05 0-1.724-.242-3.418-.624-5.033l64.067-36.993c4.004 3.746 9.342 6.071 15.265 6.071 5.9 0 11.239-2.326 15.25-6.071l64.052 36.993c-.375 1.615-.609 3.309-.609 5.033 0 1.749.234 3.419.609 5.05l-64.059 36.994c-4.004-3.746-9.342-6.072-15.258-6.072-5.908 0-11.246 2.326-15.25 6.072zm109.841 286.973a22.188 22.188 0 0 0-8.709 4.964l-64.06-36.985c.374-1.6.616-3.302.616-5.019 0-10.114-6.72-18.551-15.882-21.368V335.75c3.286-1.014 6.251-2.708 8.71-5.003l64.052 37.002c-.375 1.608-.609 3.286-.609 5.034 0 10.099 6.696 18.535 15.882 21.361v74.081zm0-116.803c-3.285 1.014-6.251 2.708-8.709 5.01l-64.06-36.993c.374-1.623.616-3.31.616-5.042 0-10.114-6.72-18.544-15.882-21.361v-74.073c3.286-1.014 6.251-2.7 8.71-5.002l64.052 36.994c-.375 1.631-.609 3.293-.609 5.049 0 10.099 6.696 18.528 15.882 21.353v74.065zm6.541-117.848c-5.9 0-11.239 2.326-15.25 6.072l-64.06-36.994c.374-1.623.616-3.285.616-5.041 0-1.74-.242-3.419-.616-5.042l64.06-36.993c4.011 3.754 9.35 6.072 15.265 6.072 5.908 0 11.247-2.318 15.25-6.072l64.067 36.993c-.382 1.623-.624 3.302-.624 5.042 0 1.733.242 3.418.624 5.041l-64.067 36.978c-4.003-3.731-9.342-6.056-15.25-6.056h-.015zm94.606 176.242c-9.179 2.817-15.898 11.254-15.898 21.368 0 1.718.242 3.419.624 5.019l-64.067 36.985c-2.458-2.279-5.432-3.973-8.71-4.964v-74.08c9.162-2.826 15.897-11.262 15.897-21.361 0-1.748-.241-3.426-.624-5.034l64.052-37.002c2.458 2.294 5.424 3.989 8.726 5.003v74.066zm0-116.78c-9.179 2.817-15.898 11.246-15.898 21.361 0 1.732.242 3.419.624 5.042l-64.067 36.993c-2.458-2.302-5.416-3.996-8.71-5.01v-74.065c9.162-2.818 15.897-11.254 15.897-21.353 0-1.756-.241-3.418-.624-5.057l64.052-36.986c2.458 2.302 5.424 3.988 8.726 5.002v74.073zm-8.726-111.784-64.052-36.994c.383-1.631.624-3.293.624-5.05 0-1.724-.241-3.418-.624-5.033l64.067-36.993c3.996 3.746 9.334 6.071 15.25 6.071s11.262-2.326 15.266-6.071l64.052 36.993c-.367 1.615-.624 3.309-.624 5.033 0 1.757.257 3.419.624 5.05l-64.052 36.994c-4.019-3.746-9.358-6.072-15.266-6.072-5.915 0-11.253 2.326-15.265 6.072zm109.864 170.17c-9.186 2.809-15.905 11.246-15.905 21.361 0 1.74.257 3.418.624 5.049l-64.052 36.978c-2.458-2.294-5.432-3.973-8.726-4.995V335.75c9.186-2.825 15.898-11.254 15.898-21.353 0-1.748-.242-3.418-.624-5.041l64.052-37.01c2.458 2.294 5.447 3.996 8.732 5.011v74.065zm0-116.771c-9.186 2.825-15.905 11.254-15.905 21.353 0 1.733.257 3.418.624 5.034l-64.052 36.986c-2.458-2.294-5.432-3.965-8.726-4.987v-74.073c9.186-2.825 15.898-11.238 15.898-21.353 0-1.74-.242-3.419-.624-5.042l64.076-36.993c2.435 2.302 5.424 3.972 8.709 4.995v74.08z"
                        style={{
                            fill: "#3f3f3f",
                        }}
                    />
                </svg>
            )
        case 'surfaces-render-mode':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 31 32"
                    {...props}
                >
                    <path
                        d="m6.001 10 9.491-5.392L25 10l-9.511 5.86L6.001 10z"
                        style={{
                            fill: "#ebebeb",
                        }}
                    />
                    <path
                        d="m6.001 10 9.488 5.86.003 11.333L6 22l.001-12z"
                        style={{
                            fill: "#90908f",
                        }}
                    />
                    <path
                        d="M25 10v12l-9.511 5.193V15.86L25 10z"
                        style={{
                            fill: "#c6c7c8",
                        }}
                    />
                </svg>
            )
        case 'translucent-render-mode':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlSpace="preserve"
                    x={0}
                    y={0}
                    style={{
                        enableBackground: "new 0 0 31 32",
                    }}
                    viewBox="0 0 31 32"
                    {...props}
                >
                    <switch>
                        <g>
                            <path
                                d="m6.465 10.526 9.02-5.124 9.03 5.123-9.038 5.41z"
                                style={{
                                    fill: "#ebebeb",
                                }}
                            />
                            <path
                                d="m6.465 10.526 9.016 5.41.003 10.77-9.02-5.377z"
                                style={{
                                    fill: "#90908f",
                                }}
                            />
                            <path
                                d="m24.516 10.525.004 10.85-9.036 5.33V15.937z"
                                style={{
                                    fill: "#c6c7c8",
                                }}
                            />
                            <path
                                d="m24.486 9.967-8.5-4.83a1 1 0 0 0-.988 0l-8.5 4.83a1 1 0 0 0-.506.87v10.226a1 1 0 0 0 .488.859l8.501 5.065a1 1 0 0 0 1.021.002l8.5-5.028a1 1 0 0 0 .49-.86V10.837a1 1 0 0 0-.506-.87zM15.258 6.14v1.914a.25.25 0 0 0 .5 0V6.157l7.91 4.495-7.91 4.68v-1.279a.25.25 0 0 0-.5 0v1.296l-7.91-4.714 7.91-4.496zm-7.94 15.118 1.362-.806a.25.25 0 0 0 .088-.342.247.247 0 0 0-.342-.088l-1.434.848v-9.282l7.818 4.659-1.22.721a.25.25 0 0 0 .127.465.24.24 0 0 0 .127-.035l1.148-.68v9.113l-7.674-4.573zm8.674 4.577v-9.108l1.132.67a.247.247 0 0 0 .342-.088.25.25 0 0 0-.088-.342l-1.21-.716 7.824-4.627v9.254l-1.45-.857a.248.248 0 0 0-.342.088.25.25 0 0 0 .088.341l1.403.83-7.699 4.555z"
                            />
                            <path
                                d="m11.87 17.985-1.722 1.018a.25.25 0 0 0 .127.465.24.24 0 0 0 .127-.035l1.721-1.019a.25.25 0 0 0 .088-.341.247.247 0 0 0-.341-.088zM19.1 17.984a.248.248 0 0 0-.342.088.25.25 0 0 0 .088.341l1.722 1.019a.247.247 0 0 0 .341-.088.25.25 0 0 0-.087-.342L19.1 17.984zM15.508 12.303a.25.25 0 0 0 .25-.25v-2a.25.25 0 0 0-.5 0v2c0 .138.112.25.25.25z"
                            />
                        </g>
                    </switch>
                </svg>
            )
        case 'error':
            return (
                < svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg >
            )
        case 'success':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            )
        case 'clip':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31 32" {...props} >
                    <path
                        d="m9.935 8.226 9.112 5.738-.019 11.013-9.093-5.714V8.226z"
                        style={{
                            fill: "#c6c7c8",
                        }}
                    />
                    <path
                        d="M24.277 19.674v-6.709a1.996 1.996 0 1 0-1.87-3.2l-5.525-3.14a1.977 1.977 0 0 0 .096-.581 2 2 0 1 0-3.965.35l-1.734.941a1.994 1.994 0 1 0-1.793 3.28v7.058a1.996 1.996 0 1 0 1.9 3.149l5.69 3.39a2.001 2.001 0 1 0 3.894-.027l1.727-1.013a1.994 1.994 0 1 0 1.58-3.497Zm-13.112-1.467a1.995 1.995 0 0 0-.679-.428V14.59l3.374 2.012Zm.21-8.37 2.563 1.527-3.452 2.056v-2.912a1.995 1.995 0 0 0 .889-.671Zm-.889 4.165 3.707-2.208v4.425l-3.707-2.211Zm8.06 1.577v3.236l-3.71-2.213 2.717-1.618a1.989 1.989 0 0 0 .994.595Zm-1.28-1.006-2.573 1.532v-4.29l2.378 1.416a2.004 2.004 0 0 0-.043.413 1.977 1.977 0 0 0 .238.929Zm1.021 4.67-3.594 2.14v-4.284Zm1.26-3.676a1.995 1.995 0 0 0 1.48-1.923c0-.042-.01-.08-.012-.122l1.689-.992a1.983 1.983 0 0 0 .573.335v3.406l-3.73 2.222Zm2.565-3.848-1.413.83a1.986 1.986 0 0 0-3.174-.212l-2.378-1.417 3.548-2.114 3.308 1.881a1.805 1.805 0 0 0 .11 1.032Zm-8.677-4.417a1.981 1.981 0 0 0 2.929.18l1.83 1.04-3.536 2.107-2.906-1.732a1.973 1.973 0 0 0 .026-.253 2.002 2.002 0 0 0-.046-.418Zm-1.957 11.3 2.715-1.617v4.345l-2.439-1.453a1.753 1.753 0 0 0-.276-1.275Zm3.498 3.194 3.57-2.126v3.038a1.988 1.988 0 0 0-1.01.614Zm4.57.924v-3.645l3.731-2.222v2.922a1.977 1.977 0 0 0-1.168 2.583l-1.608.943a1.989 1.989 0 0 0-.954-.58Z"
                        style={{
                            fill: "#535353",
                        }}
                    />
                </svg>
            )
    }
}