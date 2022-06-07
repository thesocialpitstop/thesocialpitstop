import { createGlobalStyle, ThemeProvider } from 'styled-components'
import Layout from '../components/layout'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { UserProvider } from '@auth0/nextjs-auth0';
import '../styles/globals.css';

const httpLink = createHttpLink({
  uri: "https://x2zpvsawy5hatarddisdsrpwva.appsync-api.ap-southeast-1.amazonaws.com/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "x-api-key": "da2-g7sc7tagszc3dpk5xpfjqnbsku",
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
      <UserProvider loginUrl="/api/auth/login" profileUrl="/api/auth/me">
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
