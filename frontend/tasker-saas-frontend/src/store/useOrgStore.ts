import { create } from "zustand";
import { CREATE_ORGANIZATION } from "../graphql/queries";
import { ApolloClient } from "@apollo/client";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  id: string;
}

interface Organization {
  id: string;
  name: string;
  adminId: string;
  userIds: string[];
  // Add other fields as needed
}

interface OrgState {
  loading: boolean;
  organization: Organization | null;
  createOrganization: (client: ApolloClient<any>, name: string) => Promise<void>;
}

export const useOrgStore = create<OrgState>((set) => ({
  loading: false,
  organization: null,

  createOrganization: async (client, name) => {
    set({ loading: true });

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found");

      const decoded = jwtDecode<TokenPayload>(token);
      const userId = decoded?.id;

      if (!userId) throw new Error("User ID not found in token");

      const { data } = await client.mutate({
        mutation: CREATE_ORGANIZATION,
        variables: {
          name,
          adminId: userId,
          userIds: [userId],
        },
      });

      set({ organization: data.createOrganization });
    } catch (error) {
      console.error("Failed to create organization:", error);
    } finally {
      set({ loading: false });
    }
  },
}));
