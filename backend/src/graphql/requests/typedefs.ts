export const typedefs = `
    type Request {
        id: String!
        name: String!
        status: String!
        userId: String!
        organizationId: String!
        user: User!
        organization: Organization!
    }
`;
