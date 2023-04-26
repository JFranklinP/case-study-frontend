import axios from "axios";
import React from "react";
import Link from "next/link";
import { MainLayout } from "../../components/layouts/MainLayout";
import ContextCard from "../../components/cards/ContextCard";
import 

function ContextList({ contexts }) {
 
  
  const renderContexts = () => {
    if (contexts.length === 0)
      return (
        <h1 text-center text-bold>
          {" "}
          No hay contextos
        </h1>
      );

    return contexts.map((context) => (
      <ContextCard key={context.id} context={context} />
    ));
  };
  return (
    <MainLayout>
       <div className="mg-3 mt-4 mb-3 p-4">
    <Link className="bg-blue-500 hover:bg-blue-700 mg-2 px-2 py-2 font-bold rounded text-white " href="/context/ContextF">Nuevo</Link>
  </div>
      <div className="grid gap-4 grid-cols-1 md: grid-cols-2">
        {renderContexts()}
      </div>
    </MainLayout>
  );
}

export const getServerSideProps = async (context) => {
  const res = await axios.get("http://localhost:3000/api/context");
  return {
    props: {
      contexts: res.data,
    },
  };
};
export default ContextList;
