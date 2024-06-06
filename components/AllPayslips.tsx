import { Payslip } from "@/types";
import React from "react";
import ViewPayslip from "./ViewPayslip";

const AllPayslips = ({ payslips }: { payslips: Payslip[] }) => {
  return (
    <div>
      {payslips.map((payslip: Payslip) => (
        <div key={payslip.id} id="print-content">
          <ViewPayslip payslip={payslip} />
        </div>
      ))}
    </div>
  );
};

export default AllPayslips;
