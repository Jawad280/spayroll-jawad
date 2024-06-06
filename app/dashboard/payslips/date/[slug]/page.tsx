"use client";
import AllPayslips from "@/components/AllPayslips";
import { PayslipTable } from "@/components/PayslipTable/PayslipTable";
import { columns } from "@/components/PayslipTable/columns";
import { Button } from "@/components/ui/button";
import { GetAllPayslips } from "@/lib/serverFunctions";
import React, { useState } from "react";

const page = ({ params }: { params: { slug: string } }) => {
  const { payslips, error, isLoading } = GetAllPayslips(params.slug);
  const [isAll, setIsAll] = useState<boolean>(false);

  if (isAll) {
    return (
      <div className="flex flex-col items-center p-8 w-screen gap-6 relative">
        <div className="flex justify-between w-full print:hidden">
          <div className="font-bold text-[28px]">
            Payslips Table : {params.slug}
          </div>
        </div>

        <AllPayslips payslips={payslips} />

        <Button
          onClick={() => setIsAll(false)}
          className="absolute top-6 right-8"
          variant={"destructive"}
        >
          Cancel
        </Button>
      </div>
    );
  }

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

      <Button variant={"ghost"} onClick={() => setIsAll(true)}>
        View All
      </Button>
    </div>
  );
};

export default page;
