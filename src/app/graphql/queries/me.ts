import gql from 'graphql-tag';

import { UserDTO } from '@models/api';

export interface Me {
  me: UserDTO;
}

export const ME = gql`
  {
    me {
      username
      email
    }
  }
`;
