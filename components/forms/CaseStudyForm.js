import React from 'react'
import axios from 'axios';

const handleSubmit = e =>{
    e.preventDefault();
    console.log("caso creado");
}

export default function CaseStudyForm() {
    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log("caso creado");
        const res = await  axios.post('/api/case-study')
    }
  return (
    <div className='bg-blue-800'>
        <form onSubmit={handleSubmit} action="/api/form" method="post">
        <label htmlFor="name">Nombre</label>
        <input type="text" id="name" name="name" required />
  
        <label htmlFor="description">Descripción</label>
       <textarea name='descriotion' rows={2}></textarea>

        <label htmlFor="commitDate">Fecha de inicio</label>
        <input type='date' id="commitDate" name="commitDate" required />

        <label htmlFor="finishDate">Fecha Fin</label>
        <input type="date" id="finishDate" name="finishDate" required />

  
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
