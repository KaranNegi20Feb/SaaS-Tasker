export const typeDefs = `#graphql
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    bio: String
    skills: [String]
    githubUsername: String
    avatar: String
    githubUrl: String
    twitterUrl: String
    linkedinUrl: String
  }
`;
