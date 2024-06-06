import { Payslip } from "@/types";
import React from "react";
import ViewPayslip from "./ViewPayslip";

const AllPayslips = ({ payslips }: { payslips: Payslip[] }) => {
  return (
    <div className="flex flex-col items-center">
      {payslips.map((payslip: Payslip) => (
        <div
          key={payslip.id}
          className="flex flex-col items-center w-[21cm] h-[14.84cm] bg-white"
          id="print-content"
        >
          <ViewPayslip payslip={payslip} />
        </div>
      ))}
    </div>
  );
};

export default AllPayslips;
