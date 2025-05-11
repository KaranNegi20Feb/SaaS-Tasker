import { create } from 'zustand';
import { GET_USERS_ORGANIZATIONS, GET_ALL_USERS_FROM_ORGANIZATION } from '../graphql/queries';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface TeamsState {
  teams: { name: string }[];
  activeTeam: string | null;
  teamMembersActiveTeam: User[];

  setTeams: (teams: { name: string }[]) => void;
  setActiveTeam: (teamName: string) => void;
  setTeamMembersActiveTeam: (users: User[]) => void;
  fetchTeams: (client: any) => Promise<void>;
  fetchTeamMembers: (client: any, teamName: string) => Promise<void>;

}

export const useTeamsStore = create<TeamsState>((set) => ({
  teams: [],
  activeTeam: null,
  teamMembersActiveTeam: [],
  setTeams: (teams) => set({ teams }),
  setActiveTeam: (teamName) => set({ activeTeam: teamName }),
  setTeamMembersActiveTeam: (users) => set({ teamMembersActiveTeam: users }),

  fetchTeams: async (client) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const { data } = await client.query({
        query: GET_USERS_ORGANIZATIONS,
        variables: { credential: token },
      });

      const teams = data.getUsersOrganizations;
      set({
        teams,
        activeTeam: teams.length > 0 ? teams[0].name : null,
      });

      // Fetch members for default active team
      if (teams.length > 0) {
        const { data: membersData } = await client.query({
          query: GET_ALL_USERS_FROM_ORGANIZATION,
          variables: { name: teams[0].name },
        });
        set({ teamMembersActiveTeam: membersData.getAllUsersfromOrganization });
      }

    } catch (err) {
      console.error("Error fetching organizations:", err);
    }
  },

  fetchTeamMembers: async (client, teamName) => {
    try {
      const { data } = await client.query({
        query: GET_ALL_USERS_FROM_ORGANIZATION,
        variables: { name: teamName },
      });
      set({ teamMembersActiveTeam: data.getAllUsersfromOrganization });
    } catch (err) {
      console.error("Error fetching team members:", err);
    }
  },
}));
