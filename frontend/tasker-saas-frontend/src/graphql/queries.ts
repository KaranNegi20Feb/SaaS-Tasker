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

