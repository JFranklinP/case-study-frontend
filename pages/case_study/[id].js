import React from "react";
import { MainLayout } from "../../components/layouts/MainLayout";
import axios from "axios";
import { useRouter } from "next/router";
import {toast} from "react-toastify"


function CaseStudyView({ case_study }) {
  const router = useRouter();
  const handleDelete = async (id) => {
    try{
      const res = await axios.delete("http://localhost:3000/api/case-study/" + id);
    router.push("/case_study/CaseStudyList");
    }catch(error){
      toast.error(error.response.data.message);
    }
    
  };
  return (
    <MainLayout>
      
      <div className="border border-gray-200 shadow-md p-6 mt-6 mb-3" >
        <h1>{case_study.name}</h1>
        <p>{case_study.description}</p>
        <p>Fecha de inicio : {case_study.commit_date}</p>
        <p>Fecha de finalización : {case_study.end_date}</p>
      </div>
      <button
        className="bg-gray-500 rounded hover:bg-gray-700 px-3 py-2 mr-3 mt-3"
        onClick={() => router.push("/case_study/view/" + case_study.id)}
      >
        Visualizar
      </button>
      <button
        className="bg-gray-500 rounded hover:bg-gray-700 px-3 py-2 mr-3 mt-3"
        onClick={() => router.push("/case_study/edit/" + case_study.id)}
      >
        Editar
      </button>
      <button
        className="bg-blue-500 rounded hover:bg-red-700 px-3 py-2 ml-3 mt-3"
        onClick={() => handleDelete(case_study.id)}
      >
        Eliminar
      </button>
    </MainLayout>
  );
}
export const getServerSideProps = async (case_studys) => {
  const { data: case_study } = await axios.get(
    "http://localhost:3000/api/case-study/" + case_studys.query.id
  );

  return {
    props: {
      case_study,
    },
  };
};

export default CaseStudyView;
