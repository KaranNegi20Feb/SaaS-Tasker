export const queries=`#graphql
    getUserToken(email:String!,password:String!):String
    getAllUsers: [User!]!
    getUserTokenWithGoogle(credential: String!): String
`