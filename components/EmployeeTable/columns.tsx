"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Employee } from "@/types";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

async function handleDelete(emp: Employee) {
  console.log("Deleting Employee", emp.name);
}

export const columns: ColumnDef<Employee>[] = [
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
          Name
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
    accessorKey: "dob",
    header: "DOB",
    cell: ({ row }) => {
      const date: Date = row.getValue("dob");
      const formatted = date.toLocaleDateString();

      return formatted;
    },
  },
  {
    accessorKey: "designation",
    header: "Designation",
  },
  {
    accessorKey: "joinDate",
    header: "Join Date",
    cell: ({ row }) => {
      const date: Date = row.getValue("joinDate");
      const formatted = date.toLocaleDateString();

      return formatted;
    },
  },
  {
    accessorKey: "resignDate",
    header: "Resign Date",
    cell: ({ row }) => {
      const emp = row.original;

      if (emp.isResigned) {
        const date: Date = row.getValue("resignDate");
        const formatted = date.toLocaleDateString();

        return formatted;
      } else {
        return "-";
      }
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const emp = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open Menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="font-bold cursor-pointer">
              <Link href={`/dashboard/employees/${emp.id}`}>Edit</Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="font-bold cursor-pointer"
              onClick={() => handleDelete(emp)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
