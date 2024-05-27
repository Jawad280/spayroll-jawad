"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Payslip } from "@/types";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";

function grossPay(payslip: Payslip) {
  return (payslip.ordinaryWage || 0) + (payslip.allowance || 0);
}

function totalDeduction(payslip: Payslip) {
  return (payslip.employeeCPF || 0) + (payslip.otherDeduction || 0);
}

function netPay(payslip: Payslip) {
  const c = grossPay(payslip);
  return (
    c -
    totalDeduction(payslip) +
    (payslip.otPay || 0) +
    (payslip.additionalWage || 0)
  );
}

export const columns: ColumnDef<Payslip>[] = [
  {
    header: "S/N",
    cell: ({ row }) => {
      return row.index + 1;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Employee Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "NRIC",
    header: "NRIC",
  },
  {
    accessorKey: "designation",
    header: "Designation",
  },
  {
    accessorKey: "totalCPF",
    header: "Total CPF",
  },
  {
    accessorKey: "employerCPF",
    header: "Employer CPF",
  },
  {
    accessorKey: "employeeCPF",
    header: "Employee CPF",
  },
  {
    header: "Gross Pay",
    cell: ({ row }) => {
      const payslip = row.original;

      return <div>{grossPay(payslip)}</div>;
    },
  },
  {
    header: "Net Pay",
    cell: ({ row }) => {
      const payslip = row.original;

      return <div>{netPay(payslip)}</div>;
    },
  },
  {
    id: "view",
    cell: ({ row }) => {
      const payslip = row.original;

      return <Link href={`/dashboard/payslips/${payslip.id}`}>View</Link>;
    },
  },
];
