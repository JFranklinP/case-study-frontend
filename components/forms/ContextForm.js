import React, { useState } from "react";
import axios from "axios";

export default function CaseStudyForm() {

  const [context, setContext] = useState({
    name: "",
    description: "",
  })
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("contexto creado");
    const res = await axios.post("http://localhost:3000/api/context", context);

  };

  const handleChange = e => {
    console.log(e.target.name, e.target.description);
    setContext({ ...context })
  }

  return (
    <div className="w-full max-w-xs">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <label htmlFor="name">Nombre</label>
        <input type="text" id="name" name="name" required onChange={handleChange} className="shadow border rounded py-2 px-3 text-gray-700" />

        <label htmlFor="description">Descripción</label>
        <textarea
         name="description" rows={2} onChange={handleChange} className="shadow border rounded py-2 px-3 text-gray-700">
         </textarea>
        <br></br>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 py-2 px4 rounded focus:outline-none focus:shadow-outline font-bold text-white">Aceptar</button>
      </form>
    </div>
  );
}
