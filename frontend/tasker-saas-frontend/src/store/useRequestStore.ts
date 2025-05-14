import { create } from 'zustand';
import { ApolloClient } from '@apollo/client';
import {
  SEND_REQUEST_TO_JOIN_ORGANIZATION,
  SHOW_ALL_REQUESTS,
  REJECT_REQUEST_TO_JOIN_ORGANIZATION,
  ACCEPT_REQUEST_TO_JOIN_ORGANIZATION
} from '../graphql/queries';
import { jwtDecode } from 'jwt-decode';

interface Request {
  id: string;
  name: string;
  userId: string;
  organizationId: string;
}

interface RequestState {
  loading: boolean;
  requests: Request[];
  sendJoinRequest: (client: ApolloClient<any>, organizationId: string) => Promise<void>;
  fetchRequests: (client: ApolloClient<any>) => Promise<void>;
  rejectRequest: (client: ApolloClient<any>, requestId: string) => Promise<void>;
  acceptRequest: (client: ApolloClient<any>, requestId: string) => Promise<void>; // ✅ new

}

export const useRequestStore = create<RequestState>((set) => ({
  loading: false,
  requests: [],

  sendJoinRequest: async (client, organizationId) => {
    set({ loading: true });
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const decoded: { id: string; email: string } = jwtDecode(token);
      const userId = decoded.id;
      const email = decoded.email;

      await client.mutate({
        mutation: SEND_REQUEST_TO_JOIN_ORGANIZATION,
        variables: {
          name: email, // using email as name
          userId,
          organizationId,
        },
      });
    } catch (err) {
      console.error('Join request failed:', err);
    } finally {
      set({ loading: false });
    }
  },

  fetchRequests: async (client) => {
  set({ loading: true });
  try {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token');

    const decoded: { id: string } = jwtDecode(token);
    console.log('Decoded admin ID:', decoded.id);

    const adminId = decoded.id;

    const { data } = await client.query({
      query: SHOW_ALL_REQUESTS,
      variables: { adminId },
      fetchPolicy: 'no-cache',
    });
    console.log('Fetched requests data:', data);

    
    set({ requests: data?.getAllRequests || [] });
  } catch (err) {
    console.error('Fetching requests failed:', err);
  } finally {
    set({ loading: false });
  }
},


  rejectRequest: async (client, requestId) => {
    set({ loading: true });
    try {
      await client.mutate({
        mutation: REJECT_REQUEST_TO_JOIN_ORGANIZATION,
        variables: { requestId },
      });

      set((state) => ({
        requests: state.requests.filter((req) => req.id !== requestId),
      }));
    } catch (err) {
      console.error('Rejecting request failed:', err);
    } finally {
      set({ loading: false });
    }
  },

  acceptRequest: async (client, requestId) => {
    set({ loading: true });
    try {
      await client.mutate({
        mutation: ACCEPT_REQUEST_TO_JOIN_ORGANIZATION,
        variables: { requestId },
      });

      set((state) => ({
        requests: state.requests.filter((req) => req.id !== requestId),
      }));
    } catch (err) {
      console.error('Accepting request failed:', err);
    } finally {
      set({ loading: false });
    }
  },
}));
