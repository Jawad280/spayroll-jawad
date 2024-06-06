import GetPayslipForm from "@/components/GetPayslipForm";
import React from "react";

const AllPayslips = () => {
  return (
    <div className="flex flex-col items-center p-8 w-screen gap-6">
      <div className="flex justify-between w-full">
        <div className="font-bold text-[28px]">Payslips</div>
      </div>
      <GetPayslipForm />
    </div>
  );
};

export default AllPayslips;
