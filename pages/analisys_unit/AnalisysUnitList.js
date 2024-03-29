import axios from "axios";
import React from "react";
import Link from "next/link";
import { MainLayout } from "../../components/layouts/MainLayout";
import AnalisysUnitCard from "../../components/cards/AnalisysUnitCard";

function AnalisysUnitList({ analysis_units }) {
 
  
  const renderAnalisysUnits = () => {
    if (analysis_units.length === 0)
      return (
        <h1 text-center text-bold>
          {" "}
          No hay unidades de analisis
        </h1>
      );

    return analysis_units.map((analysis_unit) => (
      <AnalisysUnitCard key={analysis_unit.id} analysis_unit={analysis_unit} />
    ));
  };
  return (
    <MainLayout>
       <div className="mg-3 mt-4 mb-3 p-4">
    <Link className="bg-blue-500 hover:bg-blue-700 mg-2 px-2 py-2 font-bold rounded text-white " href="/analisys_unit/AnalisysUnitF">Nuevo</Link>
  </div>
      <div className="grid gap-4  md: grid-cols-2">
        {renderAnalisysUnits()}
      </div>
    </MainLayout>
  );
}
export const getServerSideProps = async (analysis_unit) => {
  const res = await axios.get("http://localhost:3000/api/analysis-unit");
  return {
    props: {
      analysis_units: res.data,
    },
  };
};
export default AnalisysUnitList;
