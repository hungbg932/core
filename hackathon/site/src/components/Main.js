import React, { useState } from "react";
import AppBar from "./appbar/AppBar";
import NavDrawer from "./navdrawer/NavDrawer";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Loading from "./Loading";
import {  UiProvider, UserProvider, useUserStore, useUiStore } from "../store";
import { ThemeProvider, CssBaseline, Typography, Paper, Grid, useMediaQuery, Breadcrumbs , Link } from "@material-ui/core";
import { dark, light } from "../theme";
import APPCONFIG from '../constant/appConfig';
import useAxios from "axios-hooks";
import { Router } from "@reach/router";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import UserList from "./User/UserList";
import DanhSachBaoCao from "./DanhSachBaoCao";
import Report from "./Report";
import Team from "./Team";

export default function ({ navigate }) {
    const [{ data: result = {}, loading }, userInfo] = useAxios({
        url:  `${APPCONFIG.apiUri}auth/me`,
        method: "POST",
        data: {}
    }, { manual: true });
    const [requested, setRequested] = useState(false);
    if(!requested) {
        userInfo();
        setRequested(true);
    }
    
    if (loading) {
        return (
            <Loading />
        );
    } else if (Object.keys(result).length == 0 && requested) {
        navigate("/login");
        return (<React.Fragment></React.Fragment>);
    } else {
        sessionStorage.setItem('userInfor', JSON.stringify(result));
        return (<MainComponent todos={[]} labels={[]} user={[]} />);
    }
}

function MainComponent({ todos, labels, user }) {
    return (
        <React.Fragment>
            <UserProvider user={user}>
                <UiProvider>
                    <ThemeControlledComponent />
                </UiProvider>
            </UserProvider>
        </React.Fragment>
    );
}


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  content: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: theme.mixins.drawer.minWidth - theme.spacing(2.5),
    marginRight: -1 * theme.spacing(3)
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  mainContainer: {
    display: "flex",
    padding: theme.spacing(2, 0),
    margin: theme.spacing(0, 1)
  },
  mainWrapper: {
    flex: 1,
    maxWidth: theme.spacing(175),
    margin: "0 auto"
  },
}));

function ThemeControlledComponent() {
    const classes = useStyles();
    const [{ isDarkMode }] = useUserStore();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
    const [{ isNavBarOpen }] = useUiStore();

  return (
    <ThemeProvider theme={isDarkMode ? dark : light}>
      <CssBaseline />
      <AppBar />
      <NavDrawer />
      <Container maxWidth={false}>
        <Box mt={8}>
          <main>
            <div
              className={
                isMobile || !isNavBarOpen ? classes.contentShift : classes.content
              }
            >
              <div className={classes.mainContainer}>
                <div className={classes.mainWrapper}>
                  <Router>
                    <UserList path="users" />
                  </Router>
                  <Router>
                    <DanhSachBaoCao path="list_report" />
                  </Router>
                  <Router>
                    <Report path="report" />
                  </Router>
                   <Router>
                    <Team path="team" />
                  </Router>
                </div>
              </div>
            </div>
          </main>
        </Box>
      </Container>
    </ThemeProvider>
  );
}