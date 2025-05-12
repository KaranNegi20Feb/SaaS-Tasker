export const mutations=`#graphql
createUser(firstName:String!,lastName:String!,email:String!,password:String!):String
googleSignup(credential: String!): String
updateUserDetails(
    email: String!              
    bio: String,
    skills: [String],
    githubUsername: String,
    avatar: String,
    githubUrl: String,
    twitterUrl: String,
    linkedinUrl: String
  ): String
`;