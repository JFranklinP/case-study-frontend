import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import {toast} from "react-toastify"

export  function ContextForm() {
  const router = useRouter();

  const [context, setContext] = useState({
    name: "",
    description: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      if (router.query.id) {
        const res = await axios.put(
          "http://localhost:3000/api/context/" + router.query.id,
          context
        );
       
        router.push("../ContextList");
        toast.success("Contexto Actualizado");
      } else {
        const res = await axios.post(
          "http://localhost:3000/api/context/",
          context
        );
        
        router.push("/context/ContextList");
        toast.success("Contexto Creado");
      }
    }catch(error){
      toast.error(error.response.data.message);
    }

  };

  const handleChange = (e) => {
    console.log(e.target.name);
    const { name, value } = e.target;
    setContext({ ...context, [name]: value });
  };
  useEffect(() => {
    const getContext = async () => {
      const { data } = await axios.get(
        "http://localhost:3000/api/context/ " + router.query.id
      );
      setContext({ name: data.name, description: data.description });
    };
    if (router.query.id) {
      getContext();
    }
  }, [router.query.id]);

  return (
    <div className="w-full max-w-xs">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Nombre
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={context.name}
            required
            onChange={handleChange}
            className="shadow appearance-none w-full  border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Descripción
          </label>
          <textarea
            name="description"
            value={context.description}
            rows={2}
            onChange={handleChange}
            className="shadow border rounded py-2 px-3 text-gray-700"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 py-2 px-4 rounded focus:outline-none focus:shadow-outline font-bold text-white"
        >
          {router.query.id ? "Actualizar" : "Añadir"}
        </button>
      </form>
    </div>
  );
}
