import React from "react";
import {MainLayout} from "../../components/layouts/MainLayout";
import {AnalisysUnitForm} from "../../components/forms/AnalisysUnitForm";

export default function AnalisysUnitFPage() {
  return (
    <MainLayout>
      <div className="grid place-items-center h-5/6">
        <AnalisysUnitForm/>
      </div>
    </MainLayout>
  );
}
