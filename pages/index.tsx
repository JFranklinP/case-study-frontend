
import { Inter } from 'next/font/google'
import Head from 'next/head'

import Link from 'next/link'
import CaseStudyForm from "../components/forms/CaseStudyForm"
import { MainLayout } from '../components/layouts/MainLayout'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <MainLayout>

<h1>Sistema para el diseño de estudios de caso</h1>

<CaseStudyForm/>

<h1 className={'title'}>
 {/*Ir a <a href='/about'>About</a>*/}
 Ir a<Link  href='/form'>About </Link>
</h1>

<p className={'description'}>
 Get started by editing
 <code className={'code'}>pages/index.js</code>
</p > 


    </MainLayout>
  )
}
