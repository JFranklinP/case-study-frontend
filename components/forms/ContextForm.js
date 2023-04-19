import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function CaseStudyForm() {

  const router = useRouter()

  const [context, setContext] = useState({
    name: "",
    description: "",
  })
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (router.query.id){
      const res = await axios.put("http://localhost:3000/api/context"+ router.query.id, context);
    }
    else{
      const res = await axios.post("http://localhost:3000/api/context", context);
    }
    router.push('context/ContextList')
  };

  const handleChange = e => {
    console.log(e.target.name, e.target.description);
    setContext({ ...context })
  }
  useEffect (() =>{

    const getContext = async () =>{
    const {data} = await axios.get('http://localhost:3000/api/context/' + router.query.id)
     setContext(data)   
  }
    if (router.query.id){
      getContext(router.query.id)
    }
  },[])

  return (
    <div className="w-full max-w-xs">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <label htmlFor="name">Nombre</label>
        <input type="text" id="name" name="name" required onChange={handleChange} className="shadow border rounded py-2 px-3 text-gray-700" value={context.name}/>

        <label htmlFor="description">Descripción</label>
        <textarea
         name="description" rows={2} onChange={handleChange} className="shadow border rounded py-2 px-3 text-gray-700" value={context.description}>
         </textarea>
        <br></br>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 py-2 px4 rounded focus:outline-none focus:shadow-outline font-bold text-white">
          {
            router.query.id ? 'Actualizar' : 'Añadir'
          }
        </button>
      </form>
    </div>
  );
}
