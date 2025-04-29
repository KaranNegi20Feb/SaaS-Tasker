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
