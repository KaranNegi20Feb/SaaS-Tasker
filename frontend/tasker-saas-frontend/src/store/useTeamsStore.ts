// store/useTeamsStore.ts
import { create } from 'zustand';

interface TeamsState {
  teams: { name: string }[];
  setTeams: (teams: { name: string }[]) => void;
}

export const useTeamsStore = create<TeamsState>((set) => ({
  teams: [],
  setTeams: (teams) => set({ teams }),
}));
