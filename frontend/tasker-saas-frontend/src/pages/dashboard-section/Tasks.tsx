"use client"

import { useEffect, useState } from "react"
import { useApolloClient } from "@apollo/client"
import { ColumnDef } from "@tanstack/react-table"
import { DataTable } from "../../components/data-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Select ,SelectItem,SelectTrigger,SelectValue,SelectContent} from "../../components/ui/select"
import { Textarea } from "../../components/ui/textarea"
import { Dialog ,DialogContent,DialogHeader,DialogTitle, DialogFooter} from "../../components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../../components/ui/dropdown-menu"

import { useTeamsStore } from "../../store/useTeamsStore"

interface Task {
  id:string
  title: string
  description: string
  status: string
}

export default function TasksPage() {
  const { activeTeam, editTask, activeTasks,taskVersion, deleteTask, createTask, fetchTasks, fetchTeams, fetchTeamMembers, newTask } = useTeamsStore()
  const [open,setOpen]=useState(false);
  const [editData, setEditData] = useState<Task | null>(null)

  const client = useApolloClient()

  useEffect(() => {
    if (activeTeam) {
      fetchTeams(client)
      fetchTasks(client)
    }
  }, [activeTeam, fetchTasks, createTask, fetchTeamMembers, client])

  useEffect(() => {
    console.log("deleted something")
    fetchTasks(client);
  }, [taskVersion]);

  useEffect(() => {
    if (newTask?.title) {
      fetchTasks(client)
    }
  }, [newTask, fetchTasks, client, activeTasks])


  const handleDelete = async(task: Task) => {
    console.log("Delete Task", task)
    try{
      await deleteTask(client,task.id)
    }
    catch(error){
      console.log("Error occured")
    }
    finally{
      fetchTasks(client)
    }
  }

  const handleEdit = async (task: Task) => {
  setEditData(task);
  setOpen(true);
};

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
      cell: ({ row }) => {
        const task = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleEdit(task)}>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDelete(task)}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Tasks</h1>
    <DataTable columns={columns} data={activeTasks} />
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>
        </DialogHeader>

        {editData && (
          <form
            onSubmit={async (e) => {
              console.log(editData)
              e.preventDefault();
              try {
                await editTask(
                  client,
                  editData.title,
                  editData.description,
                  editData.id,
                  editData.status
                );
                fetchTasks(client);
                setOpen(false);
              } catch (err) {
                console.error("Failed to edit task", err);
              }
            }}
            className="space-y-4"
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={editData.title}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editData.description}
                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={editData.status}
                onValueChange={(value) => setEditData({ ...editData, status: value })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">PENDING</SelectItem>
                  <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                  <SelectItem value="IN_PROGRESS">IN_PROGRESS</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  </div>
);
}
