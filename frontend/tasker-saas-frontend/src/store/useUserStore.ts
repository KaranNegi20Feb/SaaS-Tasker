import { create } from 'zustand';
import { ApolloClient } from '@apollo/client';
import { GET_USER_DETAILS } from '../graphql/queries';
import {jwtDecode} from 'jwt-decode';

interface DecodedToken {
  email: string;
  // Add other fields if needed
}

interface UserDetails {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  bio: string;
  skills: string[];
  githubUsername: string;
  avatar: string;
  githubUrl: string;
  twitterUrl: string;
  linkedinUrl: string;
}

interface UserState {
  user: UserDetails | null;
  loading: boolean;
  error: string | null;
  resetUser: () => void;
  fetchUserDetails: (client: ApolloClient<any>) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  loading: false,
  error: null,
  resetUser: () => set({ user: null, loading: false, error: null }),

  fetchUserDetails: async (client) => {
    set({ loading: true, error: null });

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("No token found");
      }

      const decoded = jwtDecode<DecodedToken>(token);
      const email = decoded.email;

      const { data } = await client.query({
        query: GET_USER_DETAILS,
        variables: { email },
        fetchPolicy: 'no-cache',
      });

      set({ user: data.getUserDetailsWithEmail });
    } catch (err: any) {
      console.error("Failed to fetch user details:", err);
      set({ error: 'Failed to fetch user details' });
    } finally {
      set({ loading: false });
    }
  },
}));
