import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";


export class Header<RouteComponentProps, Object> extends React.Component<any, {}> {
    private _styles = {
        root: {
            flexGrow: 1
        }
    }

    public render(): JSX.Element {
        return (
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="title" color="inherit">
                        PyCAD
                    </Typography>
                    {this.props.settings.currentUser.nickname}
                </Toolbar>
            </AppBar>
        );
    }
}