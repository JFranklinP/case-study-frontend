import axios from 'axios'
import React from 'react'
import Link from "next/link";
import {MainLayout} from '../../components/layouts/MainLayout'

  function ContextList({contexts}) {
  return (
    <MainLayout>
    
        {contexts.map(context =>(
            <Link href={'/context/${context.id}'} key={context.id}> 
            
            <div className='border border-gray-200 shadow-md p-6' >
                <h1>{context.name}</h1>
                <p>{context.description}</p>

            </div>
            </Link>
        ))}
    
    </MainLayout>
  );
}
 export const getServerSideProps = async context =>{
    const res = await axios.get('http://localhost:3000/api/context')
    return{
        props: {
            contexts: res.data
        }
    }
    
 }
 export default ContextList