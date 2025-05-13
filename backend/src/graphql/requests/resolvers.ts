import RequestService from "../../services/request";

const mutation = {
  createRequest: async (
    _: any,
    { name, userId, organizationId }: { name: string; userId: string; organizationId: string }
  ) => {
    const request = await RequestService.createRequest(name, userId, organizationId);
    return request;
  },
};

const queries = {
  getAllRequests: async () => {
    const requests = await RequestService.getAllRequests();
    return requests;
  },
};
export const resolvers = { mutation, queries };
