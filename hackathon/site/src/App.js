import logo from './logo.svg';
import './App.css';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { Router } from "@reach/router";
import { Provider } from "react-redux";
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import Main from "./components/Main";
import Login from "./components/Login";
import Register from "./components/Register";
import { light } from "./theme";
import { ThemeProvider, CssBaseline } from "@material-ui/core";

function App() {
  let store = createStore(reducers, undefined, applyMiddleware(thunk));
  return (
    <ThemeProvider theme={light}>
      <Provider store={store}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Router>
          <Main path="/*" />
          <Login path="/login" />
          <Register path="/register" />
        </Router>
      </Provider>
    </ThemeProvider>
    
  );
}

export default App;
