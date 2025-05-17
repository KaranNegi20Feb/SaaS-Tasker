export const mutation=`
    createTask(title:String!,description:String!,userId: ID, organizationId: ID!,status: String!):Task!
    editTask(taskId:String!,title:String,description:String,status:String):String
    deleteTask(taskId:String!):String

`