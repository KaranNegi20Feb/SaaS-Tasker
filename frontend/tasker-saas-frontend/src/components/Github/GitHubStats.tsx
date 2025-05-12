import { Card } from "../../components/ui/card"
import { GoRepo, GoStar, GoRepoForked } from "react-icons/go"
interface GitHubStatsProps {
  repos: number
  stars: number
  forks: number
}

export const GitHubStats = ({ repos, stars, forks }: GitHubStatsProps) => {
  return (
   <div>
  <h3 className="text-lg font-semibold mb-2">GitHub Stats</h3>
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
    <Card className="p-4 grid grid-cols-[auto_1fr] items-center gap-6">
      <GoRepo className=" w-10 h-10 text-blue-600" />
      <div>
        <p className="text-2xl font-bold">{repos}</p>
        <p className=" text-sm text-gray-500">Repositories</p>
      </div>
    </Card>

    <Card className="p-4 grid grid-cols-[auto_1fr] items-center gap-6">
      <GoStar className="w-10 h-10 text-yellow-500" />
      <div>
        <p className="text-2xl font-bold">{stars}</p>
        <p className="text-sm text-gray-500">Stars</p>
      </div>
    </Card>

    <Card className="p-4 grid grid-cols-[auto_1fr] items-center gap-6">
      <GoRepoForked className="w-10 h-10 text-purple-600" />
      <div>
        <p className="text-2xl font-bold">{forks}</p>
        <p className="text-sm text-gray-500">Forks</p>
      </div>
    </Card>
  </div>
</div>
  )
}