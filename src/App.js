import React, { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import Login from "./components/Login/Login";
import Sidebar from "./components/Sidebar/Sidebar";
import Detailsbar from "./components/Detailsbar/Detailsbar";
import Chat from "./components/Chat/Chat";
import Home from "./components/Home/Home";
import Signup from "./components/Singup/Signup";
import Pusher from "pusher-js";
import axios from "./axios";

import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";
// import { auth, provider } from "./firebase";

const App = () => {
  const [{ user, room, jwt }, dispatch] = useStateValue();
  const [err, setErr] = useState("");
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("chattrJWT");
    if (token) {
      const accessToken = `Bearer ${token}`;
      dispatch({
        type: actionTypes.SET_JWT,
        accessToken,
      });
      getUserWithJWT(accessToken);
      // history.push("/rooms");
      // console.log(jwt);
    }
  }, []);

  const getUserWithJWT = async (accessToken) => {
    try {
      await axios
        .get("/auth/login", {
          headers: {
            "Content-Type": "application/json",
            Authorization: accessToken,
          },
        })
        .then((res) => {
          console.log(res);
          const userData = res.data;
          if (userData.userExists) {
            // Executing only if the server sends that the {userExists:true}
            // setError("");
            console.log("user exists");
            dispatch({
              type: actionTypes.SET_USER,
              user: res.data.user,
            });
          } else if (!userData.userExists) {
            // setError("user does not exists... First sign up");
            history.push("/login");
          } else {
            // setError("Something went wrong");
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

  // pusher
  useEffect(() => {
    const pusher = new Pusher("ef3c3aa07c44c7f445e9", {
      cluster: "ap2",
    });

    const channelRoom = pusher.subscribe("rooms");
    channelRoom.bind("inserted", (room) => {
      // alert(JSON.stringify(data));
      console.log("pusher room", room);
      if (room.users[0] === user?.email) {
        dispatch({
          type: actionTypes.INSERT_NEW_ROOM,
          room: room,
        });
      }
    });

    channelRoom.bind("deleted", (room) => {
      console.log("pusher room deletion", room);

      dispatch({
        type: actionTypes.DELETE_ROOM,
        roomId: room.roomId._id,
      });

      // User pusher

      // const channelUsers = pusher.subscribe("users");
      // channelUsers.bind("updated", (res) => {
      //   console.log("pusher user", res);
      //   if (res.data !== user?.email) {
      //     dispatch({
      //       type: actionTypes.USER_LEFT,
      //       roomId: res.roomId,
      //       user: res.data,
      //     });
      //   } else {
      //     console.log("user has left and has to be removed");
      //   }
      // });
    });

    return () => {
      channelRoom.unbind_all();
      channelRoom.unsubscribe();
    };
  }, [room]);

  return (
    <div className="app">
      {!user ? (
        <Router>
          <Switch>
            <Route exact path="/home" component={Home} />

            <Route exact path="/login" component={Login} />

            <Route exact path="/signup" component={Signup} />
          </Switch>
        </Router>
      ) : (
        <div className="app__body">
          <Router>
            <Switch>
              <Route path="/">
                <Sidebar />
                <Route exact path="/rooms/:roomId">
                  <Chat />
                  <Detailsbar />
                </Route>
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
};

export default App;
