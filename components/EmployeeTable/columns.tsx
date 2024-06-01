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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { mutate } from "swr";

async function handleDelete(emp: Employee) {
  try {
    const res = await fetch(`/api/employees/${emp.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    res.status === 200;
    mutate(`/api/employees`);
    alert("DELETION COMPLETE");
  } catch (e) {
    console.error(e);
  }
}

export const columns: ColumnDef<Employee>[] = [
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
    sortingFn: (a, b) => {
      const nameA: any = a.original.name?.toLowerCase();
      const nameB: any = b.original.name?.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
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
      const formatted = new Date(date).toLocaleDateString();

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
      const formatted = new Date(date).toLocaleDateString();

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
        const formatted = new Date(date).toLocaleDateString();

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
