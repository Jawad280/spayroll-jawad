"use client";

import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/types";
import { Button } from "../ui/button";
import { ArrowUpDown, TrashIcon } from "lucide-react";
import { DeleteAlert } from "./DeleteAlert";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "companyName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Company Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    sortingFn: (a, b) => {
      const nameA: any = a.original.companyName?.toLowerCase();
      const nameB: any = b.original.companyName?.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    },
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    id: "delete",
    cell: ({ row }) => {
      const user = row.original;

      return <DeleteAlert user={user} />;
    },
  },
];
