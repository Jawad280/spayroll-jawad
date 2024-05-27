import PayslipForm from "@/components/PayslipForm";
import { Employee } from "@/types";
import React from "react";

const Dashboard = () => {
  const sampleEmployees: Employee[] = [
    {
      id: "1",
      name: "Jawad",
      dob: new Date("2000-11-15"),
      NRIC: "T0077826A",
      designation: "Intern",
      nationality: "SC",
      citizenshipStatus: "SCPR3",
      ordinaryWage: 2000,
      additionalWage: 200,
      typeOfContributionRate: "GG",
    },
    {
      id: "2",
      name: "Michael",
      dob: new Date("1989-06-28"),
      NRIC: "S562178452",
      designation: "Manager",
      nationality: "SC",
      citizenshipStatus: "SCPR3",
      ordinaryWage: 4000,
      additionalWage: 0,
      typeOfContributionRate: "GG",
    },
  ];

  return (
    <div className="flex flex-col items-center p-8 w-screen gap-6">
      <div className="flex justify-between w-full">
        <div className="font-bold text-[28px]">Hello</div>
      </div>
      <PayslipForm employees={sampleEmployees} />
    </div>
  );
};

export default Dashboard;
