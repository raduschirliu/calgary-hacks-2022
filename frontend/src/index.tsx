import React from 'react';
import ReactDOM from 'react-dom';
import 'tw-elements';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import WorkspaceProvider from './contexts/WorkspaceContext';
import UiProvider from './contexts/UiContext';

const AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN || '';
const AUTH0_CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID || '';
const AUTH0_AUDIENCE = process.env.REACT_APP_AUTH0_AUDIENCE || '';

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={AUTH0_DOMAIN}
      clientId={AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}
      audience={AUTH0_AUDIENCE}
      scope="all"
    >
      <WorkspaceProvider>
        <UiProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </UiProvider>
      </WorkspaceProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
