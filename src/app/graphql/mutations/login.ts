import gql from 'graphql-tag';

const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(credentials: { username: $username, password: $password }) {
      token
    }
  }
`;

export { LOGIN };
