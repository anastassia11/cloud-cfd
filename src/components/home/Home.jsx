import Link from 'next/link';
import demo_img from '@/../public/demo_img.png'
import Image from 'next/image';

export default function Home() {
    const token = localStorage.getItem('token')

    return (
        <section className="pt-24 mx-auto max-w-screen-xl pb-12 px-4 items-center lg:flex md:px-8 bg-day-50">
            <div className="space-y-4 flex-1 sm:text-center lg:text-left">
                <h1 className="text-day-350 font-bold text-4xl xl:text-5xl">
                    Make engineering design <br />
                    <span className="text-orange-100"> easy and fast</span>
                </h1>
                <p className="text-day-300 max-w-xl leading-relaxed sm:mx-auto lg:ml-0">
                    New cloud platform for modeling gas-dynamic, hydrodynamic and thermal problems.
                    Run hard simulations right on your laptop.
                </p>
                <div className="pt-10 items-center justify-center space-y-3 sm:space-x-6 sm:space-y-0 sm:flex lg:justify-start">
                    <Link href={token ? '/dashboard' : '/login'}
                        className="cursor-pointer px-7 py-3 w-full text-center shadow-md block sm:w-auto
                    text-white bg-orange-100 hover:bg-orange-150 hover:shadow-lg active:bg-orange-200 rounded-lg duration-300">
                        Start Simulation Now
                    </Link>
                    <Link href='/documentation' className="group mt-2 inline-flex items-center gap-1 text-orange-100">
                        Learn More
                        <span aria-hidden="true" className="block transition-all group-hover:ms-0.5 rtl:rotate-180">&rarr;</span>
                    </Link>

                </div>
            </div>
            <div className="flex-1 text-center mt-7 lg:mt-0 lg:ml-3">
                <Image src={demo_img} width={500} height={500} alt='geom preview'
                    className="w-full mx-auto sm:w-10/12  lg:w-full" />
            </div>
        </section>
    )
}
