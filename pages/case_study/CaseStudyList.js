import axios from "axios";
import React from "react";
import Link from "next/link";
import { MainLayout } from "../../components/layouts/MainLayout";
import CaseStudyCard from "../../components/cards/CaseStudyCard";


function CaseStudyList({ case_studys }) {
  
  const renderCaseStudys = () => {
    if (case_studys.length === 0)
      return (
        <h1 text-center text-bold>
          {" "}
          No hay estudios de caso
        </h1>
      );

    return case_studys.map((case_study) => (
      <CaseStudyCard key={case_study.id} case_study={case_study} />
    ));
  };
  return (
    <MainLayout>
       <div className="mg-3 mt-4 mb-3 p-4">
    <Link className="bg-blue-500 hover:bg-blue-700 mg-2 px-2 py-2 font-bold rounded text-white " href="/case_study/CaseStudyF">Nuevo</Link>
  </div>
      <div className="grid gap-4  md: grid-cols-2">
        {renderCaseStudys()}
      </div>
    </MainLayout>
  );
}

export const getServerSideProps = async (case_study) => {
  const res = await axios.get("http://localhost:3000/api/case-study");
  return {
    props: {
      case_studys: res.data,
    },
  };
};
export default CaseStudyList;
