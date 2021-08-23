import logo from './logo.svg';
import './App.css';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import { Router } from "@reach/router";
import Main from "./components/Main";
import Login from "./components/Login";
import Register from "./components/Register";
import { light } from "./theme";
import { ThemeProvider, CssBaseline } from "@material-ui/core";

function App() {
  return (
    <ThemeProvider theme={light}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Router>
          <Main path="/*" />
          <Login path="/login" />
          <Register path="/register" />
        </Router>
      </ThemeProvider>
  );
}

export default App;
