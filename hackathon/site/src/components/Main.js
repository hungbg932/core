import React, { useState } from "react";
import AppBar from "./appbar/AppBar";
import NavDrawer from "./navdrawer/NavDrawer";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Loading from "./Loading";
import {  UiProvider, UserProvider, useUserStore } from "../store";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { dark, light } from "../theme";
import APPCONFIG from '../constant/appConfig';
import useAxios from "axios-hooks";

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
        )
    } else if (Object.keys(result).length == 0 && requested) {
        navigate("/login")
        return (<React.Fragment></React.Fragment>)
    } else {
        return (<MainComponent todos={[]} labels={[]} user={[]} />)
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
    )
}

function ThemeControlledComponent() {
    const [{ isDarkMode }] = useUserStore();
    return (
        <ThemeProvider theme={isDarkMode ? dark : light}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <AppBar />
            <NavDrawer />
            <Container maxWidth={false}>
                <Box mt={8}>
                </Box>
            </Container>
        </ThemeProvider>
    );
}