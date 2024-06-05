"use client";
import { PayslipTable } from "@/components/PayslipTable/PayslipTable";
import { columns } from "@/components/PayslipTable/columns";
import { GetAllPayslips } from "@/lib/serverFunctions";
import React from "react";

const page = ({ params }: { params: { slug: string } }) => {
  const { payslips, error, isLoading } = GetAllPayslips(params.slug);

  return (
    <div className="flex flex-col items-center p-8 w-screen gap-6">
      <div className="flex justify-between w-full">
        <div className="font-bold text-[28px]">
          Payslips Table : {params.slug}
        </div>
      </div>

      <div className="py-10 w-full">
        <PayslipTable columns={columns} data={payslips} />
      </div>
    </div>
  );
};

export default page;
