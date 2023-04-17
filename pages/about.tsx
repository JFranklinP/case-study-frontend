
import { Inter } from 'next/font/google'
import Head from 'next/head'

import { Navbar } from '../components/Navbar'
import Link from 'next/link'
import { MainLayout } from '../components/layouts/MainLayout'



export default function AboutPage() {
  return (
  <MainLayout>

<h1>About Page</h1>

<h1 className={'title'}>
 {/*Ir a <a href='/'>Home</a>*/}
 Ir a<Link  href='/'>Home </Link>
</h1>

<p className={'description'}>
 Get started by editing
 <code className={'code'}>pages/about.js</code>
</p > 

  </MainLayout>

  )
}
