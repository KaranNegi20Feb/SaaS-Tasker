import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../components/ui/avatar"
import { Input } from "../components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"

export function TopNavbar() {
  return (
    <div className="flex items-center justify-between bg-white">
      <div className="flex-1 w-50 lg:w-120">
        <Input
          type="search"
          placeholder="Search..."
          className="h-9 w-full rounded-md border px-3 text-sm"
        />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-8 w-8 cursor-pointer ml-4">
            <AvatarImage src="https://github.com/karannegi20feb.png" alt="User" />
            <AvatarFallback>KN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
