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

type Task = {
  id: string
  title: string
  status: "Todo" | "In Progress" | "Done" | "Backlog" | "Canceled"
  priority: "Low" | "Medium" | "High"
  label: "Bug" | "Feature" | "Documentation"
}

const tasks: Task[] = [
  {
    id: "TASK-1075",
    title: "Backing up the driver won't do anything",
    status: "Done",
    priority: "Medium",
    label: "Feature",
  },
  {
    id: "TASK-5365",
    title: "Backing up the pixel won't do anything",
    status: "In Progress",
    priority: "Low",
    label: "Documentation",
  },
  {
    id: "TASK-5385",
    title: "Backing up the pixel won't do anything",
    status: "Canceled",
    priority: "High",
    label: "Documentation",
  },
  {
    id: "TASK-5765",
    title: "Backing up the pixel won't do anything",
    status: "In Progress",
    priority: "Medium",
    label: "Documentation",
  },
  {
    id: "TASK-6385",
    title: "Backing up",
    status: "Canceled",
    priority: "High",
    label: "Documentation",
  },
  {
    id: "TASK-7765",
    title: "the pixel won't do anything",
    status: "In Progress",
    priority: "Medium",
    label: "Documentation",
  },
  {
    id: "TASK-8385",
    title: "Just do anything",
    status: "Canceled",
    priority: "High",
    label: "Documentation",
  },
  {
    id: "TASK-9765",
    title: "Backup anything",
    status: "In Progress",
    priority: "Medium",
    label: "Documentation",
  },
  // Add more...
]

const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "id",
    header: "Task",
    cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "label",
    header: "Label",
    cell: ({ row }) => <div className="font-medium">{row.getValue("label")}</div>,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <Button className="!p-0 hover:bg-transparent hover:text-current" variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        Title <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => <div className="font-semibold">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status")
      return (
        <span className="capitalize">{status}</span>
      )
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority = row.getValue("priority")
      return (
        <span className="capitalize">{priority}</span>
      )
    },
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
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      <DataTable columns={columns} data={tasks} />
    </div>
  )
}
