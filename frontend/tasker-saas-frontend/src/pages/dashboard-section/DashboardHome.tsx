import { useEffect, useState } from "react";
import { useApolloClient } from "@apollo/client";
import { useTaskStore } from "../../store/useTasksStore";
import { useOrgStore } from "../../store/useOrgStore";
import { useRequestStore } from "../../store/useRequestStore";

import { Check, X } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";

import { Clock, Loader2, CheckCircle } from "lucide-react";

export default function DashboardHome() {
  const client = useApolloClient();
  const { createOrganization, loading } = useOrgStore();
  const { fetchTasks, pending, inprogress, tasks } = useTaskStore();
  const {requests, fetchRequests,sendJoinRequest,rejectRequest,acceptRequest, loading: joinLoading } = useRequestStore();

  const handleJoinOrganization = async () => {
    if (!joinOrgId.trim()) return;
    await sendJoinRequest(client, joinOrgId);
    setJoinOrgId("");
    setJoinDialogOpen(false);
  };


  const [orgName, setOrgName] = useState("");
  const [open, setOpen] = useState(false);

  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const [joinOrgId, setJoinOrgId] = useState("");


  const handleCreate = async () => {
    if (!orgName.trim()) return;
    await createOrganization(client, orgName);
    setOrgName("");
    setOpen(false);
  };

  useEffect(() => {
    fetchTasks(client);
    fetchRequests(client);
  }, [client]);
  console.log("Fetched Requests:", requests);


  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Welcome to MicroTasks 👋</h1>

      {/* Task Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Total Tasks Overview</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            You have {pending} tasks pending and {inprogress} in progress.
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">All Recent Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            {tasks.length === 0 ? (
              <p className="text-sm text-muted-foreground">No recent activity.</p>
            ) : (
              <ul className="space-y-2">
                {tasks.slice(0, 5).map((task, idx) => (
                  <li
                    key={idx}
                    className="flex items-center space-x-3 px-4 py-2 rounded-md shadow-sm"
                  >
                    {task.status === "PENDING" && (
                      <>
                        <Clock className="text-yellow-500 w-4 h-4" />
                        <span>
                          <strong>{task.title}</strong> —{" "}
                          <span className="text-yellow-600">Pending</span>
                        </span>
                      </>
                    )}
                    {task.status === "IN_PROGRESS" && (
                      <>
                        <Loader2 className="text-blue-500 w-4 h-4 animate-spin" />
                        <span>
                          <strong>{task.title}</strong> —{" "}
                          <span className="text-blue-600">In Progress</span>
                        </span>
                      </>
                    )}
                    {task.status === "COMPLETED" && (
                      <>
                        <CheckCircle className="text-green-500 w-4 h-4" />
                        <span>
                          <strong>{task.title}</strong> —{" "}
                          <span className="text-green-600">Completed</span>
                        </span>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Org Management */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Organization Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-3 sm:space-y-0">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button>Create Organization</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>New Organization</DialogTitle>
                </DialogHeader>
                <input
                  className="w-full border p-2 rounded mt-2"
                  placeholder="Enter name"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                />
                <Button onClick={handleCreate} disabled={loading}>
                  {loading ? "Creating..." : "Create"}
                </Button>
              </DialogContent>
            </Dialog>
            <Dialog open={joinDialogOpen} onOpenChange={setJoinDialogOpen}>
  <DialogTrigger asChild>
    <Button variant="secondary">Join Organization</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Join an Organization</DialogTitle>
    </DialogHeader>
    <input
      className="w-full border p-2 rounded mt-2"
      placeholder="Enter organization ID"
      value={joinOrgId}
      onChange={(e) => setJoinOrgId(e.target.value)}
    />
    <Button onClick={handleJoinOrganization} disabled={joinLoading}>
      {joinLoading ? "Joining..." : "Join"}
    </Button>
  </DialogContent>
</Dialog>

          </div>

<Card className="w-full">
  <CardHeader>
    <CardTitle className="text-base text-gray-800">
      Requests to Join Your Organization
    </CardTitle>
  </CardHeader>

  <CardContent className="space-y-1 text-sm">
    {joinLoading ? (
      <p className="text-muted-foreground">Loading requests...</p>
    ) : requests.length === 0 ? (
      <p className="text-muted-foreground">No join requests yet.</p>
    ) : (
      <ul className="space-y-3">
        {requests.map((req) => (
          <li
            key={req.id}
            className="flex items-center justify-between border border-gray-200 p-3 rounded-lg"
          >
            <div>
              <span className="font-semibold text-gray-800">{req.name}</span>{" "}
              wants to join.
            </div>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" onClick={() => acceptRequest(client, req.id)}>
                <Check className="text-green-600 w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon"   onClick={() => rejectRequest(client, req.id)}>
                <X className="text-red-600 w-5 h-5" />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    )}
  </CardContent>
</Card>
        </CardContent>
      </Card>
    </div>
  );
}
