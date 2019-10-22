import gql from 'graphql-tag';
import { LoginResponseDTO } from '@models/api';

export interface Login {
  login: LoginResponseDTO;
}

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(credentials: { username: $username, password: $password }) {
      token
    }
  }
`;
