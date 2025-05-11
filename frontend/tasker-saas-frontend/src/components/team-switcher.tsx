import * as React from 'react'
import { ChevronsUpDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../components/ui/sidebar'
import {Command} from 'lucide-react'
import { useApolloClient } from "@apollo/client";
import {GET_USERS_ORGANIZATIONS} from "../graphql/queries"
import { useEffect } from "react";
import { useTeamsStore } from '../store/useTeamsStore'; // Import the Zustand store

export function TeamSwitcher() {
  const client = useApolloClient();
  const { teams, setTeams } = useTeamsStore(); // Zustand store

  const [activeTeam, setActiveTeam] = React.useState<string | null>(null);

  useEffect(() => {
    const fetchOrganizations = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const { data } = await client.query({
          query: GET_USERS_ORGANIZATIONS,
          variables: { credential: token },
        });
        setTeams(data.getUsersOrganizations);
        if (data.getUsersOrganizations.length > 0) {
          setActiveTeam(data.getUsersOrganizations[0].name);
        }
      } catch (err) {
        console.error("Error fetching organizations:", err);
      }
    };

    fetchOrganizations();
  }, [client, setTeams]);

  if (teams.length === 0 || !activeTeam) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton disabled size='lg' className='opacity-50'>
            Loading teams...
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
                <Command />
              </div>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>
                  {activeTeam}
                </span>
                <span className='truncate text-xs'>Startup</span>
              </div>
              <ChevronsUpDown className='ml-auto' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
            align='start'
            side={'bottom'}
            sideOffset={4}
          >
            <DropdownMenuLabel className='text-muted-foreground text-xs'>
              Teams
            </DropdownMenuLabel>
            {teams.map((team) => (
              <DropdownMenuItem
                key={team.name}
                onClick={() => setActiveTeam(team.name)}
                className='gap-2 p-2'
              >
                {team.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
