import React from "react";
import { MainLayout } from "../../components/layouts/MainLayout";
import axios from "axios";
import { useRouter } from "next/router";
function ContextView({ context }) {
  const router = useRouter();
  const handleDelete = async (id) => {
    const res = await axios.delete("http://localhost:3000/api/context/" + id);
    router.push("/context/ContextList");
  };
  return (
    <MainLayout>
      <h1>Contexto</h1>
      <div className="border border-gray-200 shadow-md p-6">
        <h1>{context.name}</h1>
        <p>{context.description}</p>
      </div>
      <button
        className="bg-gray-500 rounded hover:bg-gray-700 px-3 py-2 mr-3"
        onClick={() => router.push("/context/edit/" + context.id)}
      >
        Editar
      </button>
      <button
        className="bg-red-500 rounded hover:bg-red-700 px-3 py-2"
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
