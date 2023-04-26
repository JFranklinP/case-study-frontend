import React from "react";
import {MainLayout} from "../../components/layouts/MainLayout";
import {ContextForm} from "../../components/forms/ContextForm";

export default function ContextFPage() {
  return (
    <MainLayout>
      <div className="grid place-items-center h-5/6">
        <ContextForm />
      </div>
    </MainLayout>
  );
}
