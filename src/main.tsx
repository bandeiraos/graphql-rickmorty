import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './App';

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql",
  cache: new InMemoryCache({
    /**
     * Todo esse objeto abaixo serve pra evitar refetch no onChange do select (App_old.tsx), 
     * já que os dados ja foram carregados e estão no cache
     */
    // typePolicies: {
    //   Query: {
    //     fields: {
    //       character(_, { args, toReference }) {
    //         return toReference({
    //           __typename: 'Character',
    //           id: args?.id,
    //         });
    //       },
    //     },
    //   },
    // },
  })
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
);
