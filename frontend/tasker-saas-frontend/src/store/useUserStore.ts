import { create } from 'zustand'
import { ApolloClient } from '@apollo/client'
import { jwtDecode } from 'jwt-decode'
import { GET_USER_DETAILS, UPDATE_USER_DETAILS } from '../graphql/queries'

interface DecodedToken {
  email: string
}

interface UserDetails {
  id: string
  firstName: string
  lastName: string
  email: string
  bio: string
  skills: string[]
  githubUsername: string
  avatar: string
  githubUrl: string
  twitterUrl: string
  linkedinUrl: string
}

interface UserState {
  user: UserDetails | null
  loading: boolean
  error: string | null
  successUpdated: boolean
  resetUser: () => void
  resetDetails: () => void // Add this function
  fetchUserDetails: (client: ApolloClient<any>) => Promise<void>
  updateUserDetails: (
    client: ApolloClient<any>,
    updatedFields: Partial<Omit<UserDetails, 'id' | 'firstName' | 'lastName' | 'email'>>
  ) => Promise<void>
  resetSuccess: () => void
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  loading: false,
  error: null,
  successUpdated: false,

  resetUser: () => set({ user: null, loading: false, error: null }),
  resetDetails: () => set({ user: null, successUpdated: false }), // Reset user details

  resetSuccess: () => set({ successUpdated: false }),

  fetchUserDetails: async (client) => {
    set({ loading: true, error: null })
    try {
      const token = localStorage.getItem("token")
      if (!token) throw new Error("No token found")
      const decoded = jwtDecode<DecodedToken>(token)
      const email = decoded.email

      const { data } = await client.query({
        query: GET_USER_DETAILS,
        variables: { email },
        fetchPolicy: 'no-cache',
      })

      set({ user: data.getUserDetailsWithEmail })
    } catch (err) {
      console.error("Failed to fetch user details:", err)
      set({ error: 'Failed to fetch user details' })
    } finally {
      set({ loading: false })
    }
  },

  updateUserDetails: async (client, updatedFields) => {
    const token = localStorage.getItem("token")
    if (!token) throw new Error("No token found")

    const decoded = jwtDecode<DecodedToken>(token)
    const email = decoded.email

    try {
      await client.mutate({
        mutation: UPDATE_USER_DETAILS,
        variables: { email, ...updatedFields },
      })
      await get().fetchUserDetails(client)
      set({ successUpdated: true }) // ✅ set success flag
    } catch (err) {
      console.error("Failed to update user details:", err)
      set({ error: 'Failed to update user details' })
    }
  },
}))
