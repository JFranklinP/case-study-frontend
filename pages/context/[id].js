import React from "react";
import { MainLayout } from "../../components/layouts/MainLayout";
import axios from "axios";
import { useRouter } from "next/router";
import {toast} from "react-toastify"


function ContextView({ context }) {
  const router = useRouter();
  const handleDelete = async (id) => {
    try{
      const res = await axios.delete("http://localhost:3000/api/context/" + id)
      
    router.push("/context/ContextList");
    toast.success("Contexto Borrado");
    }catch(error){
      toast.error(error.response.data.message);
    }
    
  };
  return (
    <MainLayout>
      
      <div className="border border-gray-200 shadow-md p-6 mt-6 mb-3" >
        <h1>{context.name}</h1>
        <p>{context.description}</p>
      </div>
      <button
        className="bg-gray-500 rounded hover:bg-gray-700 px-3 py-2 mr-3 mt-3"
        onClick={() => router.push("/context/edit/" + context.id)}
      >
        Editar
      </button>
      <button
        className="bg-blue-500 rounded hover:bg-blue-700 px-3 py-2 ml-3 mt-3"
        onClick={() => handleDelete(context.id)}
      >
        Eliminar
      </button>
    </MainLayout>
  );
}
export const getServerSideProps = async (contexts) => {
  const { data: context } = await axios.get(
    "http://localhost:3000/api/context/" + contexts.query.id
  );

  return {
    props: {
      context,
    },
  };
};

export default ContextView;
