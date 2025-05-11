"use client"
import { useTeamsStore } from '../../store/useTeamsStore'; // Import the Zustand store
import { ColumnDef } from "@tanstack/react-table"
import { useEffect } from "react";
import { useApolloClient } from "@apollo/client";

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
  const {activeTeam,teamMembersActiveTeam,fetchTeams,fetchTeamMembers} = useTeamsStore();
  const client = useApolloClient();
  useEffect(() => {
    fetchTeams(client)
  }, [client, fetchTeams])

  // Fetch members when activeTeam changes
  useEffect(() => {
    if (activeTeam) {
      fetchTeamMembers(client, activeTeam.name)
    }
  }, [activeTeam, fetchTeamMembers, client])
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{activeTeam?.name}</h1>
      <div className="text-md font-medium mb-3">Team Members</div>
      <DataTable columns={columns} data={teamMembersActiveTeam} />
    </div>
  )
}
