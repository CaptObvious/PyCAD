import { Paper, Typography } from "@material-ui/core";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps, Redirect } from "react-router-dom";

function mapStateToProps(state = {}): {[id: string]: any} {
    return {
        settings: state["settings"]
    };
}


// Typing hack here as the typing information for @connect is... weird.
@(connect(mapStateToProps) as any)
export class Login<RouteComponentProps, Object> extends React.Component<any, {}> {
    public render(): JSX.Element {
        if (this.props["settings"].currentUser) {
            return (
                <Redirect to="/" />
            )
        }

        return (
            <Paper className="login-prompt">
                <Typography variant="title" color="inherit">
                    Welcome to PyCAD!
                </Typography>
                <br />
                <Typography variant="body1" color="inherit">
                    You are required to log in through Steam to view this site.  Click the button below to continue!
                </Typography>
                <br />
                <a href="/login_redirect"><img src="/images/steam_login.png" /></a>
            </Paper>
        );
    }
}