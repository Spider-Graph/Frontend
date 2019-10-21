import gql from 'graphql-tag';

const REGISTER = gql`
  mutation Register($username: String!, $password: String!, $email: String!) {
    register(details: { username: $username, password: $password, email: $email }) {
      token
    }
  }
`;

export { REGISTER };
