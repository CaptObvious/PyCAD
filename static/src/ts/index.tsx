import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { TypographyProps } from "@material-ui/core/Typography"
import CssBaseline from "@material-ui/core/CssBaseline";
import createHistory from "history/createBrowserHistory";
import * as React from "react";
import { render } from "react-dom";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import { ConnectedRouter, routerMiddleware, push } from "react-router-redux";
import { withRouter, Redirect } from "react-router-dom";

import { fetchFromAPI } from "./api";
import { Frame } from "./components";
import { allReducers } from "./reducers";

export const history = createHistory();

const middleware = routerMiddleware(history);

export const store = createStore(allReducers, applyMiddleware(middleware));

const theme = createMuiTheme();

interface Props {
    styles: any;
};

async function init() {
    const RoutedFrame = withRouter(Frame as any);

    const currentUser = await fetchFromAPI("user");

    if (!currentUser) {
        store.dispatch(push("/login"));
    }
    
    store.dispatch({
        payload: {currentUser},
        type: "SET_SETTING"
    });

    render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <CssBaseline>
                    <MuiThemeProvider theme={theme}>
                        <RoutedFrame />
                    </MuiThemeProvider>
                </CssBaseline>
            </ConnectedRouter>
        </Provider>,
        document.getElementById("react-root")
    );
}

init();
