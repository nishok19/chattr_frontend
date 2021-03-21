import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import bgPic from "../../pics/undraw_begin_chat_c6pj.svg";
import DFlogo from "../../pics/DF_logo_192_108.png";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
// import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <div className="home">
      <div className="classes.root">
        <AppBar position="static" style={{ background: "#2E3B55" }}>
          <Toolbar>
            {/* <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            > */}
            {/* <MenuIcon /> */}
            <img src={DFlogo} alt="" className="home__logo" />
            {/* </IconButton> */}
            <Typography variant="h6" className={classes.title}>
              Deep-Fly
            </Typography>
            <Link to="/login">
              <Button className={classes.menuButton} style={{ color: "white" }}>
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className={classes.menuButton} style={{ color: "white" }}>
                SignUp
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
      </div>
      <img src={bgPic} alt="" className="home__bgPic" />
      <div className="home__body">
        <p className="home__body__heading">Connect... Communicate...</p>
        <p className="home__body__para">
          Make your own way of connecting to your close ones.
          <br />
          Share the emotions with the one who cares.
        </p>
        <div className="home__body__login">
          <Link to="/login">
            <Button
              className={classes.menuButton}
              style={{ color: "white", backgroundColor: "#6a65ce" }}
            >
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
