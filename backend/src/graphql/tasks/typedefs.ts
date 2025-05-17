export const typedefs=`
    type Task {
    id:String
    title: String!
    description: String!
    user: User 
    adminId:String
    admin:User
    status: String!
    organization: Organization! 
    }
`