import DemoHome from '@/components/home/DemoHome'
import Home from '@/components/home/Home'
import Head from 'next/head'

export default function HomePage() {
  return (
    <>
      <Head>
        <title>
          Облачная платформа для моделирования | CloudCFD
        </title>
        <meta name="description" content="CloudCFD – программный продукт для автоматизированного проектирования (CAE), основанный на облачных вычислениях."></meta>
        <meta name="robots" content="index,follow,noyaca" />
        <meta name="keywords" content="cloudcfd, cloud, cfd, облачная платформа, OpenFOAM, газодинамика, облачные вычисления,"></meta>
      </Head>
      <div className='h-[calc(100vh-56px)] bg-day-50 '>
        <DemoHome />
      </div>
    </>

  )
}
HomePage.requiresAuth = false