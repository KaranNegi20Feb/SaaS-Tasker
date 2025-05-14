// graphql/queries.ts
import { gql } from "@apollo/client";

export const GET_USER_TOKEN = gql`
  query GetUserToken($email: String!, $password: String!) {
    getUserToken(email: $email, password: $password)
  }
`;

export const GET_USER_TOKEN_WITH_GOOGLE = gql`
  query GetUserTokenWithGoogle($credential: String!) {
    getUserTokenWithGoogle(credential: $credential)
  }
`;

export const GOOGLE_SIGNUP = gql`
  mutation GoogleSignup($credential: String!) {
    googleSignup(credential: $credential)
  }
`;

export const CREATE_USER= gql`
  mutation CreateUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    createUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password)
  }
`

export const GET_USERS_ORGANIZATIONS= gql`
query GetUsersOrganizations($credential: String!) {
  getUsersOrganizations(credential: $credential) {
    name
    id
  }
}
`

export const GET_ALL_USERS_FROM_ORGANIZATION =gql`
query GetAllUsersfromOrganization($name: String!) {
  getAllUsersfromOrganization(name: $name) {
    id
    firstName
    lastName
    email
  }
}
`

export const GET_TASKS_BY_IDS=gql`
query GetTaskByCreds($userId: String!, $organizationId: String!) {
  getTaskByCreds(userId: $userId, organizationId: $organizationId) {
    description
    status
    title
  }
}
`

export const GET_ALL_TASKS_IDS=gql`
query GetAllTasksById($userId: String!) {
  getAllTasksById(userId: $userId) {
    status
    title
    description
  }
}
`

export const CREATE_TASK=gql`
mutation Mutation($title: String!, $description: String!, $organizationId: ID!, $status: String!, $userId: ID) {
  createTask(title: $title, description: $description, organizationId: $organizationId, status: $status, userId: $userId) {
    status
    title
    description
  }
}
`

export const CREATE_ORGANIZATION=gql`
mutation CreateOrganization($name: String!, $userIds: [ID!], $adminId: String) {
  createOrganization(name: $name, userIds: $userIds, adminId: $adminId) {
    id
    name
  }
}
`

export const SEND_REQUEST_TO_JOIN_ORGANIZATION=gql`
mutation Mutation($name: String!, $userId: String!, $organizationId: String!) {
  createRequest(name: $name, userId: $userId, organizationId: $organizationId) {
    name
    organizationId
    userId
  }
}
`

export const SHOW_ALL_REQUESTS=gql`
query GetAllRequests($adminId: String!) {
  getAllRequests(adminId: $adminId) {
    name
    organizationId
    status
    id
  }
}
`

export const REJECT_REQUEST_TO_JOIN_ORGANIZATION=gql`
mutation Mutation($requestId: String!) {
  acceptRequest(requestId: $requestId)
}
`

export const ACCEPT_REQUEST_TO_JOIN_ORGANIZATION=gql`
mutation Mutation($requestId: String!) {
  acceptRequest(requestId: $requestId)
}
`