import Home from './components/pages/Home';

// ApolloClient Link functionality 
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';

// if client runs into error run script
const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      return alert(`graphQL errpr ${message}`);
    })
  }
});

// establish token grab
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// establish link to backend
const link = from ([
  errorLink,
  new HttpLink({ uri: "http://localhost:3001/graphql"}),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(link)
})
function App() {
  return (
  <ApolloProvider client = {client}>
    <div className="App">
      <Home/>
    </div>
  </ApolloProvider>
  );
}

export default App;
