import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { GoogleOAuthProvider } from "@react-oauth/google"; // Import this
import dotenv from 'dotenv';
dotenv.config(); // Load .env variables


const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});

const GOOGLE_CLIENT_ID = process.env.GOOGLES_CLIENT_ID || "your-google-client"


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
    </GoogleOAuthProvider>,
  </StrictMode>,
)
