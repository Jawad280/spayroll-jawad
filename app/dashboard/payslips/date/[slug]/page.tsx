import { PayslipTable } from "@/components/PayslipTable/PayslipTable";
import { columns } from "@/components/PayslipTable/columns";
import { Payslip } from "@/types";
import React from "react";

const page = ({ params }: { params: { slug: string } }) => {
  const samplePayslips: Payslip[] = [
    {
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
    },
    {
      employeeCPF: 200,
      employerCPF: 400,
      totalCPF: 600,
      ordinaryWage: 2500,
      allowance: 900,
      additionalWage: 0,
      otPay: 0,
      otHours: 0,
      other: "",
      otherDeduction: 200,
      id: "1",
      name: "Michael",
      dob: new Date("1989-11-15"),
      NRIC: "S1234567T",
      designation: "Manager",
      joinDate: new Date("2020-11-20"),
      dateOfPayment: new Date("2024-05-27"),
      modeOfPayment: "BankDeposit",
      monthYear: new Date("2024-05-27"),
      companyName: "Company A",
    },
  ];

  return (
    <div className="flex flex-col items-center p-8 w-screen gap-6">
      <div className="flex justify-between w-full">
        <div className="font-bold text-[28px]">
          Payslips Table : {params.slug}
        </div>
      </div>

      <div className="py-10 w-full">
        <PayslipTable columns={columns} data={samplePayslips} />
      </div>
    </div>
  );
};

export default page;
