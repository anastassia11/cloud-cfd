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
        <meta name="description" content="CloudCFD - облачная платформа для решения газодинамических задач. Больше не нужно инвестировать в дорогостоящее оборудование и программное обеспечение."></meta>
        <meta name="robots" content="index,follow,noyaca" />
        <meta name="keywords" content="cloudcfd, облачная платформа, газодинамика, задачи газодинамики, вычислительная физика, вычислительная динамика, облачные вычисления, решение газодинамических задач, облачные технологии"></meta>
      </Head>
      <div className='h-[calc(100vh-56px)] bg-day-50 '>
        <DemoHome />
      </div>
    </>

  )
}
HomePage.requiresAuth = false