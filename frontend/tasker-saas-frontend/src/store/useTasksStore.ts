import { create } from 'zustand';
import { GET_ALL_TASKS_IDS } from '../graphql/queries';
import { jwtDecode } from 'jwt-decode';

interface TaskDetails {
  status: string;
  title: string;
  description: string;
}

interface TaskState {
  tasks: TaskDetails[];
  pending: number;
  inprogress: number;
  fetchTasks: (client: any) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  pending: 0,
  inprogress: 0,

  fetchTasks: async (client) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const { id: userId } = jwtDecode<{ id: string }>(token);

      const { data } = await client.query({
        query: GET_ALL_TASKS_IDS,
        variables: { userId },
        fetchPolicy: 'no-cache',
      });

      const tasks: TaskDetails[] = data.getAllTasksById;
      const pending = tasks.filter((t) => t.status === 'PENDING').length;
      const inprogress = tasks.filter((t) => t.status === 'IN_PROGRESS').length;

      set({ tasks, pending, inprogress });
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }
}));
