"use client"

import { useEffect } from "react"
import { useApolloClient } from "@apollo/client"
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

import { useTeamsStore } from "../../store/useTeamsStore"

interface Task {
  title: string
  description: string
  status: string
}

const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="!p-0 hover:bg-transparent hover:text-current"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Title <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="font-semibold">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <div className="text-sm">{row.getValue("description")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span className="capitalize">{row.getValue("status")}</span>
    ),
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
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

export default function TasksPage() {
  const { activeTeam, activeTasks,createTask, fetchTasks, fetchTeams, fetchTeamMembers,newTask } = useTeamsStore()
  const client = useApolloClient()

  useEffect(() => {
    if (activeTeam) {
      fetchTeams(client)
      fetchTasks(client)
    }
  }, [activeTeam, fetchTasks, createTask,fetchTeamMembers, client])

  useEffect(() => {
    if (newTask?.title) { 
      fetchTasks(client)
    }
  }, [newTask, fetchTasks, client ,activeTasks])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <DataTable columns={columns} data={activeTasks} />
    </div>
  )
}
