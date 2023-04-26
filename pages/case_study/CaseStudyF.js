import React from "react";
import {MainLayout} from "../../components/layouts/MainLayout";
import {CaseStudyForm} from "../../components/forms/CaseStudyForm";

export default function CaseStudyFPage() {
  return (
    <MainLayout>
      <div className="grid place-items-center h-5/6">
        <CaseStudyForm />
      </div>
    </MainLayout>
  );
}
