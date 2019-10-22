import gql from 'graphql-tag';
import { LoginResponseDTO } from '@models/api';

export interface Register {
  register: LoginResponseDTO;
}

export const REGISTER = gql`
  mutation Register($username: String!, $password: String!, $email: String!) {
    register(details: { username: $username, password: $password, email: $email }) {
      token
    }
  }
`;
