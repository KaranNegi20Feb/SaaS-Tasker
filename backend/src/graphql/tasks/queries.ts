export const queries=`
    getAllTasks:[Task!]!
    getTaskByCreds(organizationId: String!): [Task!]!
    getAllTasksById(userId:String!):[Task!]!
    deleteTask(taskId:String!):String
`