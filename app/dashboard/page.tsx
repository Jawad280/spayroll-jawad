import { GeneratePayslips } from "@/components/GeneratePayslips";
import { Employee, User } from "@/types";
import React from "react";

const Dashboard = () => {
  const sampleAdminUser: User = {
    id: "12",
    username: "admin",
    companyName: "Admin",
    isAdmin: true,
  };

  const sampleUser: User = {
    id: "123",
    username: "user1",
    companyName: "Company A",
    isAdmin: true,
    createdAt: new Date("2024-04-20"),
    license: new Date("2030-05-20"),
  };

  const sampleEmployee: Employee = {
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
  };

  console.log(GeneratePayslips(sampleEmployee));

  const user: User = sampleAdminUser;

  if (user.isAdmin) {
    return (
      <div>
        <div>ALL COMMAPNIES</div>
        <div>Create new company accounts</div>
      </div>
    );
  }

  return (
    <div>
      <div>Dashboard of {user.companyName}</div>
      <div>Month Year - Generate the payslips</div>
    </div>
  );
};

export default Dashboard;
