import RequestService from "../../services/request";

const mutation = {
  createRequest: async (
    _: any,
    { name, userId, organizationId }: { name: string; userId: string; organizationId: string }
  ) => {
    const request = await RequestService.createRequest(name, userId, organizationId);
    return request;
  },
  acceptRequest: async (_: any, { requestId }: { requestId: string }) => {
  return await RequestService.acceptRequest(requestId);
},
rejectRequest: async (_: any, { requestId }: { requestId: string }) => {
  return await RequestService.rejectRequest(requestId);
},

};

const queries = {
  getAllRequests: async (_:any,{adminId}:{adminId:string}) => {
    const requests = await RequestService.getAllRequests(adminId);
    return requests;
  },
};
export const resolvers = { mutation, queries };
