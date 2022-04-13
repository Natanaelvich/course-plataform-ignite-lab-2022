import { ApolloProvider } from "@apollo/client";
import { UserProvider } from "@auth0/nextjs-auth0";
import { apolloClient } from "../lib/apollo";
import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
        <ApolloProvider client={apolloClient}>

      <Component {...pageProps} />
        </ApolloProvider>
    </UserProvider>
  );
}

export default MyApp;
