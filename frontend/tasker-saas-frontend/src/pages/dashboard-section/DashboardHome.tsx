import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"

export default function DashboardHome() {
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
            You have 5 tasks pending and 3 in progress.
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">All Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Completed “Design Login UI”</li>
              <li>Started “API integration for dashboard”</li>
              <li>Added new task: “Deploy on Vercel”</li>
            </ul>
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
