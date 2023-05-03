import Link from 'next/link'
import { MainLayout } from '../components/layouts/MainLayout'



export default function ContactPage() {
  return (
  <MainLayout>

<h1 className='font-bold'>Contacto</h1>


<p className={'description'}>
Puede contactar al equipo de desarrollo a través de los correos:
</p > 

<h1 className={'title'}>
 {/*Ir a <a href='/'>Home</a>*/}
 Ir a<Link  href='/'>Home </Link>
</h1>

  </MainLayout>

  )
}
