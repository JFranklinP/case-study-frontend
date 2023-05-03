import React from "react";
import { MainLayout } from "../../components/layouts/MainLayout";
import axios from "axios";
import { useRouter } from "next/router";
import {toast} from "react-toastify"


function AnalisisUnitView({ analisys_unit }) {
  const router = useRouter();
  const handleDelete = async (id) => {
    try{
      const res = await axios.delete("http://localhost:3000/api/analysis-unit/" + id);
    router.push("/analisys_unit/AnalisysUnitList");
    }catch(error){
      toast.error(error.response.data.message);
    }
    
  };
  return (
    <MainLayout>
      
      <div className="border border-gray-200 shadow-md p-6 mt-6 mb-3" >
        <h1>{analisys_unit.name}</h1>
        <p>{analisys_unit.description}</p>
      </div>
      <button
        className="bg-gray-500 rounded hover:bg-gray-700 px-3 py-2 mr-3 mt-3"
        onClick={() => router.push("/analisys-unit/edit/" + router.query.id)}
      >
        Editar
      </button>
      <button
        className="bg-red-500 rounded hover:bg-red-700 px-3 py-2 ml-3 mt-3"
        onClick={() => handleDelete(router.query.id)}
      >
        Eliminar
      </button>
    </MainLayout>
  );
}
export const getServerSideProps = async (analisys_units) => {
  const { data: analisys_unit } = await axios.get(
    "http://localhost:3000/api/analysis-unit/" + analisys_units.query.id
  );

  return {
    props: {
      analisys_unit,
    },
  };
};

export default AnalisisUnitView;
