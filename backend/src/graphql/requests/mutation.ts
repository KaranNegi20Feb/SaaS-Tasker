export const mutation = `
  createRequest(name: String!, userId: String!, organizationId: String!): Request!
    acceptRequest(requestId: String!): String
    rejectRequest(requestId: String!): String

`;
