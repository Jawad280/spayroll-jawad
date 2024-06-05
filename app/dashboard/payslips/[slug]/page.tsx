"use client";
import PayslipIndividual from "@/components/PayslipIndividual";
import { GetIndividualPayslip } from "@/lib/serverFunctions";
import React from "react";

const page = ({ params }: { params: { slug: string } }) => {
  const { payslip, error, isLoading } = GetIndividualPayslip(params.slug);

  return (
    <div className="flex flex-col items-center p-8 w-screen gap-6 bg-slate-400 h-screen">
      {payslip && (
        <div>
          <PayslipIndividual payslip={payslip} />
        </div>
      )}
    </div>
  );
};

export default page;
