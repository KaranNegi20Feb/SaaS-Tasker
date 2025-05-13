export const typedefs=`
    type Task {
    title: String!
    description: String!
    user: User 
    adminId:String!
    admin:User
    status: String!
    organization: Organization! 
    }
`