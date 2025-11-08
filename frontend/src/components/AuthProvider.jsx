import React from 'react';
import { PublicClientApplication, EventType } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from '../authConfig';

const pca = new PublicClientApplication(msalConfig);

// Default to using the first account if no account is active on page load
if (!pca.getActiveAccount() && pca.getAllAccounts().length > 0) {
  pca.setActiveAccount(pca.getAllAccounts()[0]);
}

pca.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
    pca.setActiveAccount(event.payload.account);
  }
});

export const AuthProvider = ({ children }) => {
  return <MsalProvider instance={pca}>{children}</MsalProvider>;
};