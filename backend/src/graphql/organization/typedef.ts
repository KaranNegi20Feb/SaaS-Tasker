export const typeDefs=`
    type Organization{
        id:ID!
        name:String!
        users: [User!]!
    }
`