import { useEffect } from "react";
import { useApolloClient } from "@apollo/client";
import { useTaskStore } from "../../store/useTasksStore";
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import {
  Clock,
  Loader2,
  CheckCircle,
} from "lucide-react";

export default function DashboardHome() {
  const client = useApolloClient();
  const { fetchTasks, pending, inprogress, tasks } = useTaskStore();

  useEffect(() => {
    fetchTasks(client);
  }, [client]);

  return (
    <div className="p-6 space-y-6">
      {/* Welcome */}
      <h1 className="text-2xl font-semibold text-gray-900">Welcome to MicroTasks 👋</h1>

      {/* Overview + Activity */}
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

      {/* Organization Management Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Organization Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-3 sm:space-y-0">
            <Button>Create Organization</Button>
            <Button variant="secondary">Join Organization</Button>
          </div>

          {/* Invitations */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Invitations to Join</p>
            <Card className="border-dashed">
              <CardContent className="p-4 text-sm text-muted-foreground">
                No invitations at the moment.
              </CardContent>
            </Card>
          </div>

          {/* Requests */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Requests to Join Your Organization</p>
            <Card className="border-dashed">
              <CardContent className="p-4 text-sm text-muted-foreground">
                No requests yet.
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
