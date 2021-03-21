import React, { useState, useEffect } from "react";
import "./Signup.css";
import axios from "../../axios";

import { Button, TextField, StylesProvider } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";

import { auth, provider } from "../../firebase.js";
import { Link, useHistory } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const history = useHistory();

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#131a08",
      },
      secondary: {
        main: green[500],
      },
    },
  });

  const createUser = async () => {
    await axios
      .post("/auth/signup", {
        headers: {
          "Content-Type": "application/json",
        },
        email: email,
        name: name,
        password: password,
      })
      .then((res) => {
        const userData = res.data;
        console.log(userData);
        if (userData.userExists) {
          console.log("user already exists");
          setError("user already exists");
        } else if (!userData.userExists) {
          console.log("user created");
          setError("");
          history.push("/login");
        } else {
          setError("Something went wrong");
          console.log("issue with creating the user");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createUserWithGoogle = async (
    uid,
    { displayName, email, providerId, photoURL }
  ) => {
    await axios
      .post("/auth/signup", {
        headers: {
          "Content-Type": "application/json",
        },
        name: displayName,
        email: email,
        photoURL: photoURL,
        provider: {
          providerId,
          uid,
        },
      })
      .then((res) => {
        const userData = res.data;
        console.log(userData);
        if (userData.userExists) {
          console.log("user already exists");
          setError("user already exists");
        } else if (!userData.userExists) {
          console.log("user created");
          setError("");
          history.push("/login");
        } else {
          setError("Something went wrong");
          console.log("issue with creating the user");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submit = (e) => {
    e.preventDefault();
    if (name && email && password == confirmPass) {
      // console.log(name, email, password, confirmPass);
      createUser();
    }
  };

  const confirmPassword = (e) => {
    setConfirmPass(e.target.value);
    password == e.target.value
      ? setError("")
      : setError("Passwords does'nt matches");
  };

  const signupGoogle = async () => {
    await auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result);
        if (
          // result.additionalUserInfo.isNewUser &&
          result.user.emailVerified
          // error == ""
        ) {
          setName(result.user.displayName);
          setEmail(result.user.email);
          setError("");
          createUserWithGoogle(result.user.uid, result.user.providerData[0]);
          setUser(result.user);
        } else {
          setError("The google account is already registered");
        }
      })
      .catch((error) => alert(error.message));
    // setName(user?.displayName);
    // setEmail(user?.email);
  };

  const passCheck = () => {
    if (password.length < 4) {
      setError("Password must be atleast 4 characters");
    } else {
      setError("");
    }
  };

  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className="signup">
          <div className="container">
            <form onSubmit={submit} className="signup__form" autoComplete="off">
              <h1 className="signup__heading signup__el">SIGN UP</h1>
              <TextField
                required
                label="username"
                type="text"
                variant="outlined"
                className="signup__input signup__el"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                required
                className="signup__input signup__el"
                label="email"
                type="email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                required
                className="signup__input signup__el"
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={passCheck}
              />
              <TextField
                required
                className="signup__input signup__el"
                label="Confirm Password"
                type="password"
                variant="outlined"
                value={confirmPass}
                onChange={(e) => confirmPassword(e)}
              />
              <span className="signup__error">{error}</span>
              <Button type="submit" className="signup__button">
                Register
              </Button>
              <span className="signup__el signup__heading2">Or</span>
            </form>
            <Button
              onClick={signupGoogle}
              className="signup__google__button signup__el"
            >
              Google
            </Button>
            <hr />
            <span className="signup__heading3">
              Already have an account ?
              <Link to="/login" className="signup__heading3__link">
                Log In
              </Link>
            </span>
          </div>
        </div>
      </ThemeProvider>
    </StylesProvider>
  );
};

export default Signup;
