import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Link to="/login">{/* <Button>Login</Button> */}Login</Link>
      <Link to="/signup">{/* <Button>Signup</Button> */}Signup</Link>
    </div>
  );
};

export default Home;
