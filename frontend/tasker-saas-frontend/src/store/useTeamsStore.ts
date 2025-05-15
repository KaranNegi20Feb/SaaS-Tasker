import { create } from 'zustand';
import { jwtDecode } from "jwt-decode";
import {
  GET_USERS_ORGANIZATIONS,
  GET_ALL_USERS_FROM_ORGANIZATION,
  GET_TASKS_BY_IDS,
  CREATE_TASK
} from '../graphql/queries';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface Task {
  title: string;
  description: string;
  status: string;
}

interface Team {
  id: string;
  name: string;
}

interface TeamsState {
  teams: Team[];
  activeTeam: Team | null;
  teamMembersActiveTeam: User[];
  activeTasks: Task[];
  newTask:Task;

  setTeams: (teams: Team[]) => void;
  setActiveTeam: (team: Team) => void;
  setTeamMembersActiveTeam: (users: User[]) => void;
  setActiveTasks: (tasks: Task[]) => void;

  fetchTeams: (client: any) => Promise<void>;
  fetchTeamMembers: (client: any, teamName: string) => Promise<void>;
  fetchTasks: (client: any) => Promise<void>;
  createTask: (
      client: any,
      title: string,
      description: string,
      organizationId: string
    ) => Promise<void>;
}

export const useTeamsStore = create<TeamsState>((set, get) => ({
  teams: [],
  activeTeam: null,
  teamMembersActiveTeam: [],
  activeTasks: [],
  newTask: {
    title: '',
    description: '',
    status: 'PENDING',
  },

  setTeams: (teams) => set({ teams }),
  setActiveTeam: (team) => set({ activeTeam: team }),
  setTeamMembersActiveTeam: (users) => set({ teamMembersActiveTeam: users }),
  setActiveTasks: (tasks) => set({ activeTasks: tasks }),

  fetchTeams: async (client) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const { data } = await client.query({
        query: GET_USERS_ORGANIZATIONS,
        variables: { credential: token },
      });

      const teams: Team[] = data.getUsersOrganizations;

      if (teams.length > 0) {
        const defaultTeam = teams[0];

        set({
          teams,
          activeTeam: defaultTeam,
        });

        const { data: membersData } = await client.query({
          query: GET_ALL_USERS_FROM_ORGANIZATION,
          variables: { name: defaultTeam.name },
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

  fetchTasks: async (client) => {
    const token = localStorage.getItem("token");
    const state = get();
    const organizationId = state.activeTeam?.id;

    if (!token || !organizationId) {
      console.warn("Missing token or organization ID");
      return;
    }

    try {
      const decoded = jwtDecode<{ id: string; email: string }>(token);
      const userId = decoded.id;

      const { data } = await client.query({
        query: GET_TASKS_BY_IDS,
        variables: { userId, organizationId },
      });

      set({ activeTasks: data.getTaskByCreds });
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  },

 createTask: async (client, title, description) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('No token');

  const { id: userId } = jwtDecode<{ id: string }>(token);
  const organizationId = get().activeTeam?.id;
  if (!organizationId) return;

  try {
    const { data } = await client.mutate({
      mutation: CREATE_TASK,
      variables: {
        title,
        description,
        organizationId,
        status: 'PENDING',
        userId,
      },
    });

    const newTask = data.createTask;

    // Append new task to the current activeTasks list
    set((state) => ({
      activeTasks: [...state.activeTasks, newTask],
    }));
  } catch (err) {
    console.error("Error creating task:", err);
  }
}





}));
