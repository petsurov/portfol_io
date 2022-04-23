import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { AppBar, Button, Typography, Toolbar } from "@material-ui/core";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import useStyles from "./navigation.styles";
import portfolios from "../../assets/portfolios.png";
import { LOGOUT } from "../../types/action.types";

const Navigation = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const logout = () => {
    history.push("/auth");
    dispatch({ type: LOGOUT });
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar
      className={classes.appBar}
      position="static"
      elevation={8}
      color="inherit"
    >
      <div className={classes.brandContainer}>
        <Link to="/">
          <img
            className={classes.image}
            src={portfolios}
            alt="portfolios"
            height="50"
          />
        </Link>
      </div>
      <Typography className={classes.userName} variant="h6">
        {user && `Welcome, ${user.result.name}!`}
      </Typography>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Button variant="outlined" onClick={logout}>
              Sign Out
            </Button>
          </div>
        ) : (
          <Button component={Link} to="/auth" variant="outlined">
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
