
import { Inter } from 'next/font/google'
import Head from 'next/head'

import Link from 'next/link'
import { MainLayout } from '../components/layouts/MainLayout'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <MainLayout>
      <div className='mt-5'>
      <h1 className='font-bold text-center'>Sistema para el diseño de estudios de caso</h1>
      </div>
      <Link href={"/Index2"}>Inde</Link>
      <Link href={"/About2"}>About</Link>



    </MainLayout>
  )
}
