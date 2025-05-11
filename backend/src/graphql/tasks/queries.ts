export const queries=`
    getAllTasks:[Task!]!
    getTaskByCreds(userId: String!, organizationId: String!): [Task!]!
`