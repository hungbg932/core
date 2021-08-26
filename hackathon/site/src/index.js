import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import setAuthToken from './utils/setAuthToken';
import { Slide, Button } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';

const user = JSON.parse(window.sessionStorage.getItem('user'));
if (typeof(user) !== 'undefined' && user !== null ){
  // Set auth token header
  setAuthToken(user.token);
}

const notistackRef = React.createRef();
const onClickDismiss = key => () => { 
    notistackRef.current.closeSnackbar(key);
}


ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider 
      ref={notistackRef}
      maxSnack={4}
      anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
      }}
      TransitionComponent={Slide}
      action={(key) => (
          <Button onClick={onClickDismiss(key)}>
              Dismiss
          </Button>
      )}
    >
      <App />
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
