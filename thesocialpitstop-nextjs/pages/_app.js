import { createGlobalStyle, ThemeProvider } from 'styled-components'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import '../styles/globals.css';
import 'react-quill/dist/quill.snow.css';
import { UserProvider } from '@auth0/nextjs-auth0';
import { GRAPHQL_API_KEY, GRAPHQL_URL } from '../constants/constants';
import Layout from '../components/global_layout/layout';


const httpLink = createHttpLink({
  uri: GRAPHQL_URL,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "x-api-key": GRAPHQL_API_KEY,
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`

const theme = {
  colors: {
    primary: '#00539CFF',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <Layout>
          <GlobalStyle />
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </Layout>
      </UserProvider>
    </ApolloProvider>

  )
}
