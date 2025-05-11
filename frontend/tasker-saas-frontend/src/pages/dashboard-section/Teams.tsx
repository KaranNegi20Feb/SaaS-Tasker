"use client"

import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "../../components/data-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "../../components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../../components/ui/dropdown-menu"

type User = {
  id: string
  firstName: string
  lastName: string
  email: string
}

const team: User[] = [
  {
    id: "U001",
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice@example.com",
  },
  {
    id: "U002",
    firstName: "Bob",
    lastName: "Smith",
    email: "bob@example.com",
  },
  {
    id: "U003",
    firstName: "Carol",
    lastName: "Lee",
    email: "carol@example.com",
  },
  {
    id: "U004",
    firstName: "David",
    lastName: "Kim",
    email: "david@example.com",
  },
]

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="!p-0 hover:bg-transparent hover:text-current"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        First Name <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="!p-0 hover:bg-transparent hover:text-current"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Last Name <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>View</DropdownMenuItem>
          <DropdownMenuItem>Remove</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

export default function TeamPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Team</h1>
      <DataTable columns={columns} data={team} />
    </div>
  )
}
