import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { GoogleOAuthProvider } from "@react-oauth/google";

const client = new ApolloClient({
  uri: import.meta.env.VITE_API_URL || 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
);
