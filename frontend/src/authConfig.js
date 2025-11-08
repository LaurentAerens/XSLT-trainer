import { Configuration } from '@azure/msal-browser';

export const msalConfig = {
  auth: {
    clientId: process.env.VITE_CLIENT_ID || 'your-client-id', // Use env var or placeholder
    authority: `https://login.microsoftonline.com/${process.env.VITE_TENANT_ID || 'your-tenant-id'}`,
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: ['User.Read'],
};

export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me',
};