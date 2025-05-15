import { ChevronsUpDown, ClipboardCopy, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../components/ui/sidebar';
import { useApolloClient } from '@apollo/client';
import { useTeamsStore } from '../store/useTeamsStore';
import { useOrgStore } from '../store/useOrgStore';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export function TeamSwitcher() {
  const client = useApolloClient();
  const { teams, activeTeam, setActiveTeam, fetchTeams } = useTeamsStore();
  const { organization } = useOrgStore();

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (activeTeam?.id) {
        await navigator.clipboard.writeText(activeTeam.id);
        toast.success('Team ID copied to clipboard!');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error('Clipboard copy failed:', err);
      toast.error('Failed to copy Team ID.');
    }
  };

  useEffect(() => {
    fetchTeams(client);
  }, [client]);

  useEffect(() => {
    if (organization) {
      fetchTeams(client);
    }
  }, [organization]);

  if (teams.length === 0 || !activeTeam) {
    return (
      <SidebarMenu>
        <SidebarMenuItem className="flex flex-col items-center text-center gap-3 p-3 border-solid border-2 rounded-sm">
          No Teams Joined
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
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground relative"
            >
              {/* Copy Icon */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={handleCopy}
                      className="relative z-10 bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg hover:bg-gray-700"
                    >
                      {copied ? <Check className="size-4" /> : <ClipboardCopy className="size-4" />}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="text-xs">
                    Copy Team ID (Double Click)
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* Team Info */}
              <div className="grid flex-1 text-left text-sm leading-tight ml-3">
                <span className="truncate font-semibold">
                  {activeTeam?.name || 'No Active Team'}
                </span>
                <span className="truncate text-xs">
                  {activeTeam?.id || 'No Team ID'}
                </span>
              </div>

              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="min-w-56 rounded-lg"
            align="start"
            side="bottom"
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Teams
            </DropdownMenuLabel>
            {teams.map((team) => (
              <DropdownMenuItem
                key={team.id}
                onClick={() => setActiveTeam(team)}
                className="gap-2 p-2"
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
