import React, { useState, useEffect } from "react";
import "./Login.css";
import { auth, provider } from "../../firebase";
import { Link, useHistory } from "react-router-dom";
import axios from "../../axios";

import { Button, TextField, StylesProvider } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";

import { actionTypes } from "../../reducer";
import { useStateValue } from "../../StateProvider";

const Login = () => {
  const [{ jwt }, dispatch] = useStateValue();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  // const [isNewUser, setIsNewUser] = useState(false);
  const [error, setError] = useState("");
  // const [token, setToken] = useState("");

  // useEffect(() => {
  //   setToken(localStorage.getItem("chattrJWT"));
  //   if (token) {
  //     const token = localStorage.getItem("chattrJWT");
  //     const accessToken = `Bearer ${token}`;
  //     getUserWithJWT(accessToken);
  //   }
  // }, []);

  // const getUserWithJWT = async (accessToken) => {
  //   try {
  //     await axios
  //       .post("/auth/login", {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: accessToken,
  //         },
  //       })
  //       .then((res) => {
  //         console.log(res);
  //         // const userData = res.data;
  //         // if (userData.userExists) {
  //         //   // Executing only if the server sends that the {userExists:true}
  //         //   setError("");
  //         //   console.log("user exists");
  //         //   localStorage.setItem("chattrJWT", res.data.accessToken);
  //         //   dispatch({
  //         //     type: actionTypes.SET_USER,
  //         //     user: res.data.user,
  //         //   });
  //         // } else if (!userData.userExists) {
  //         //   setError("user does not exists... First sign up");
  //         //   // history.push("/signup");
  //         // } else {
  //         //   setError("Something went wrong");
  //         //   console.log("issue with logging in the user");
  //         // }
  //       })
  //       .catch((err) => {
  //         console.log("login", err);
  //       });
  //   } catch {
  //     console.log("problem with logging in");
  //   }
  // };

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

  const getUserWithGoogle = async ({ email, uid }) => {
    try {
      await axios
        .post("/auth/login", {
          headers: {
            "Content-Type": "application/json",
          },
          email,
          uid,
          loginType: "google",
        })
        .then((res) => {
          console.log(res);
          const userData = res.data;
          if (userData.userExists) {
            // Executing only if the server sends that the {userExists:true}
            setError("");
            console.log("user exists");
            localStorage.setItem("chattrJWT", res.data.accessToken);
            const token = res.data.accessToken;
            const accessToken = `Bearer ${token}`;
            dispatch({
              type: actionTypes.SET_JWT,
              accessToken,
            });
            dispatch({
              type: actionTypes.SET_USER,
              user: res.data.user,
            });
            history.push("/rooms");
          } else if (!userData.userExists) {
            setError("user does not exists... First sign up");
            // history.push("/signup");
          } else {
            setError("Something went wrong");
            console.log("issue with logging in the user");
          }
        })
        .catch((err) => {
          console.log("login", err);
        });
    } catch {
      console.log("problem with logging in");
    }
  };

  const getUserWithEmailPassword = async (email, password) => {
    try {
      await axios
        .post(
          "/auth/login",
          {
            email,
            password,
            loginType: "emailandpassword",
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          console.log(res);
          const userData = res.data;
          if (userData.userExists) {
            // Executing only if the server sends that the {userExists:true}
            setError("");
            console.log("user exists");
            localStorage.setItem("chattrJWT", res.data.accessToken);
            const token = res.data.accessToken;
            const accessToken = `Bearer ${token}`;
            dispatch({
              type: actionTypes.SET_JWT,
              accessToken,
            });
            dispatch({
              type: actionTypes.SET_USER,
              user: res.data.user,
            });
            //
            history.push("/rooms");
            //
          } else if (!userData.userExists) {
            setError("User does not exists... First sign up");
            // history.push("/signup");
          } else {
            setError("Something went wrong");
            console.log("issue with logging in the user");
          }
        })
        .catch((err) => {
          console.log("login", err);
        });
    } catch {
      console.log("problem with logging in");
    }
  };

  const signInWithGoogle = async () => {
    await auth
      .signInWithPopup(provider)
      .then((result) => {
        getUserWithGoogle(result.user);
      })
      .catch((error) => alert(error.message));
  };

  const submit = (e) => {
    e.preventDefault();
    getUserWithEmailPassword(email, password);
  };

  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div className="login">
          <div className="login__container">
            {/* <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="monkey"
        /> */}

            <form onSubmit={submit} className="login__form">
              <h1 className="login__text login__el">Log In</h1>
              <TextField
                required
                className="login__input login__el"
                label="email"
                type="email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                required
                className="login__input login__el"
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" className="login__button login__el">
                Sign In
              </Button>
            </form>
            <span className="login__error">{error}</span>
            <span className="login__text2">Or</span>
            <Button
              onClick={signInWithGoogle}
              className="login__google__button"
            >
              Sign In with Google
            </Button>

            <hr />
            <span className="login__signup__text">
              Does'nt have an account yet ?
              <Link to="/signup" className="login__signup__text__link">
                Sing Up
              </Link>
            </span>
          </div>
        </div>
      </ThemeProvider>
    </StylesProvider>
    // ) : (
    //   <>{history.push("/rooms")}</>
    // );
    // );
    // );
  );
};

export default Login;
