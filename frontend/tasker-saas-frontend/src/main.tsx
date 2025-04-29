import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { GoogleOAuthProvider } from "@react-oauth/google"; // Import this

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

const GOOGLE_CLIENT_ID = "632616492389-sj3bfs0mh6mh176q3nblt5ch6mglui0f.apps.googleusercontent.com"


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
    </GoogleOAuthProvider>,
  </StrictMode>,
)
