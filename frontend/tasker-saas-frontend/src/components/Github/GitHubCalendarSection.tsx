import GitHubCalendar from "react-github-calendar"

const GitHubCalendarSection = ({ username }: { username: string }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">GitHub Activity</h3>
      <div className="bg-white rounded-md shadow p-4 overflow-x-auto">
        <GitHubCalendar username={username} />
      </div>
    </div>
  )
}

export default GitHubCalendarSection
