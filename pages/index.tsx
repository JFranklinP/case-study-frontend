
import { Inter } from 'next/font/google'
import Head from 'next/head'
import ContextForm from  "../components/forms/ContextForm"
import Link from 'next/link'
import { MainLayout } from '../components/layouts/MainLayout'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <MainLayout>

<h1>Sistema para el diseño de estudios de caso</h1>

<Link href={"/context/ContextF"}> Formulario</Link>

<ContextForm/>

<h1 className={'title'}>
 {/*Ir a <a href='/about'>About</a>*/}
 Ir a<Link  href='/context/ContextList'>About </Link>
</h1>

<p className={'description'}>
 Get started by editing
 <code className={'code'}>pages/index.js</code>
</p > 


    </MainLayout>
  )
}
