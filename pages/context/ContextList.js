import axios from 'axios'
import React from 'react'

 function ContextList({contexts}) {
  return (
    <div>
        {contexts.map(contexts =>(
            <div key={contexts.id}>
                <h1>{contexts.name}</h1>
                <p>{contexts.description}</p>

            </div>
        ))}
    </div>
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