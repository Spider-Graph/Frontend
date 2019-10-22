import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_LINK,
  request: operation => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        token: token || '',
      },
    });
  },
});

export { client };
