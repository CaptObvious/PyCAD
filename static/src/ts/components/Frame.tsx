import * as React from "react";
import * as PropTypes from "prop-types";
import * as classNames from "classnames";
import { withStyles, withTheme, Theme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import { StyledComponentProps } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import WarningIcon from "@material-ui/icons/Warning";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import ListIcon from "@material-ui/icons/List";
import WifiIcon from "@material-ui/icons/Wifi";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { Link, Route } from "react-router-dom";

import { store } from "../";
import { Dispatch, Login } from "./";

function mapStateToProps(state = {}): {[id: string]: any} {
    return {
        settings: state["settings"]
    };
}

const drawerWidth = 270;

const styles = (theme: Theme) => ({
  root: {
    flexGrow: 1,
    height: 430,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

// Typing hack here as the typing information for @connect is... weird.
@(connect(mapStateToProps) as any)
class _Frame<RouteComponentProps, StyledComponentProps, Object> extends React.Component<any, {}> {
  state = {
    open: false,
  };

  public componentDidUpdate() {
    if (!this.props["settings"].currentUser && window.location.pathname !== "/login") {
      store.dispatch(push("/login"));
    }
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const classes = this.props["classes"];
    const theme = this.props["theme"];

    return (
      <div className={classes.root} style={{height: "100%"}}>
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, this.state.open && classes.hide)}
            >
              <ChevronRightIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap style={{flex: 1}}>
              PyCAD
            </Typography>
            {this.props["settings"].currentUser ? (
                <React.Fragment>
                    <Typography variant="body2" color="secondary" noWrap>
                      {"ONLINE "}
                    </Typography>
                    <Typography variant="body2" color="inherit" noWrap>
                      {"for: County, Dispatch, Metro "}
                    </Typography>
                    <Typography variant="subheading" color="inherit" noWrap>
                        {this.props["settings"].currentUser.nickname}
                    </Typography>
                    <img className="avatar-image" src={this.props["settings"].currentUser.avatar_url} />
                </React.Fragment>
            ) : ""}
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
                <Link to="/">
                    <ListItem button>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                    </ListItem>
                </Link>
                    <Link to="/warning/new">
                    <ListItem button>
                    <ListItemIcon>
                        <WarningIcon />
                    </ListItemIcon>
                    <ListItemText primary="Create Warning" />
                    </ListItem>
                </Link>
                <Link to="/citation/new">
                    <ListItem button>
                    <ListItemIcon>
                        <AttachMoneyIcon />
                    </ListItemIcon>
                    <ListItemText primary="Create Citation" />
                    </ListItem>
                </Link>
                <Link to="/arrest/new">
                    <ListItem button>
                    <ListItemIcon>
                        <AccountBalanceIcon />
                    </ListItemIcon>
                    <ListItemText primary="Create Arrest Record" />
                    </ListItem>
                </Link>
          </List>
          <Divider />
          <List>
                <Link to="/reports">
                    <ListItem button>
                    <ListItemIcon>
                        <ListIcon />
                    </ListItemIcon>
                    <ListItemText primary="Report Mangement" />
                    </ListItem>
                </Link>
                <Link to="/dispatch">
                    <ListItem button>
                    <ListItemIcon>
                        <WifiIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dispatch" />
                    </ListItem>
                </Link>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div className="content">
            <Route path="/login" exact component={Login} />
            <Route path="/dispatch" exact component={Dispatch} />
          </div>
        </main>
      </div>
    );
  }
}

(_Frame as any).propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export const Frame = withStyles(styles as any, { withTheme: true })(_Frame);