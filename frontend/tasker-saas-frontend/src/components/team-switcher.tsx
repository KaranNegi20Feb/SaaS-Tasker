import { ChevronsUpDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../components/ui/sidebar';
import { Command } from 'lucide-react';
import { useApolloClient } from '@apollo/client';
import { useTeamsStore } from '../store/useTeamsStore'; // Import the Zustand store
import { useEffect } from "react"
import { useOrgStore } from "../store/useOrgStore"


export function TeamSwitcher() {
  const client = useApolloClient();
  const { teams, activeTeam, setActiveTeam, fetchTeams } = useTeamsStore();
  const { organization } = useOrgStore();

  useEffect(() => {
    fetchTeams(client);
  }, [client]);

  useEffect(()=>{
    if(organization){
      fetchTeams(client);
    }
  },[organization])

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
                  {activeTeam ? activeTeam.name : 'No Active Team'}
                </span>
                <span className='truncate text-xs'>
                  {activeTeam ? activeTeam.id : 'No Team ID'}
                </span>
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
                key={team.id} // Use team.id as the key now
                onClick={() => setActiveTeam(team)} // Set the entire team object
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
