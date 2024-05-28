import PayslipIndividual from "@/components/PayslipIndividual";
import { Payslip } from "@/types";
import React from "react";

const page = ({ params }: { params: { slug: string } }) => {
  const samplePayslip: Payslip = {
    employeeCPF: 200,
    employerCPF: 400,
    totalCPF: 600,
    ordinaryWage: 1200,
    allowance: 400,
    additionalWage: 0,
    otPay: 0,
    otHours: 0,
    other: "",
    otherDeduction: 200,
    id: "1",
    name: "Jawad",
    dob: new Date("2000-11-15"),
    NRIC: "T0077826A",
    designation: "Intern",
    joinDate: new Date("2020-11-20"),
    dateOfPayment: new Date("2024-05-27"),
    modeOfPayment: "BankDeposit",
    monthYear: new Date("2024-05-27"),
    companyName: "Company A",
  };

  return (
    <div className="flex flex-col items-center p-8 w-screen gap-6 bg-slate-400 h-screen">
      <div>
        <PayslipIndividual payslip={samplePayslip} />
      </div>
    </div>
  );
};

export default page;
