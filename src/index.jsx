import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Root from './Root';
import { store } from './app/store';
import { Auth } from 'aws-amplify';

console.log(process.env.NODE_ENV);

Auth.configure({
  region: `${process.env.REACT_APP_REGION}`,
  userPoolId: `${process.env.REACT_APP_USER_POOL_ID}`,
  userPoolWebClientId: `${process.env.REACT_APP_CLIENT_ID}`,
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root store={store}>
      <App />
    </Root>
  </React.StrictMode>,
);
