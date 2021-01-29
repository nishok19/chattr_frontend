import React, { useState, useEffect } from "react";
import "./Sidebar.css";

import { Avatar, IconButton } from "@material-ui/core";
// import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { SearchOutlined } from "@material-ui/icons";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SidebarChat from "../SidebarChat/SidebarChat";
import firebase from "firebase";

import axios from "../../axios";
import { actionTypes } from "../../reducer";
import { useStateValue } from "../../StateProvider";
import { useHistory } from "react-router-dom";

const Sidebar = () => {
  // const [rooms, setRooms] = useState([]);
  const [{ user, room, jwt }, dispatch] = useStateValue();
  const [err, setErr] = useState("");
  const [seed, setSeed] = useState("");

  const history = useHistory();

  // Fetching the ROOMS and the initial messages from the server
  useEffect(() => {
    if (user) {
      const getRooms = async () => {
        await axios
          .get("/rooms", {
            headers: {
              "Content-Type": "application/json",
              // user: user.email,
              Authorization: jwt,
            },
          })
          .then((res) => {
            // dispatch({
            //   type: actionTypes.SET_ROOM,
            //   room: res.data.map((room) => room),
            // });
            console.log("fetched the rooms", res);
          })
          .catch((err) => {
            console.log("error fetching rooms", err);
            signoutInvalid();
            // setErr(JSON.stringify(err));
          });
      };
      getRooms();
    } else {
      // history.push("/login");
    }
    if (user.photoURL == null) {
      setSeed(Math.floor(Math.random() * 5000));
    }
  }, []);

  const signoutInvalid = async () => {
    await firebase
      .auth()
      .signOut()
      .then(() => {
        history.push("/login");
        dispatch({
          type: actionTypes.SIGNOUT_USER,
        });
      })
      .catch((err) => {
        console.log("err signing out", err);
      });
  };

  // Testing__End

  const checkUser = () => {
    var user = firebase.auth().currentUser;
    if (user) {
      console.log(user);
    } else {
      console.log("not yet signed in");
    }
  };

  const signout = async () => {
    await firebase
      .auth()
      .signOut()
      .then(() => {
        history.push("/login");
        dispatch({
          type: actionTypes.SIGNOUT_USER,
        });
      })
      .catch((err) => {
        console.log("err signing out", err);
      });

    localStorage.removeItem("chattrJWT");
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar
          src={
            user.photoURL
              ? user.photoURL
              : `https://avatars.dicebear.com/api/human/${seed}.svg`
          }
        />
        <div className="sidebar__headerRight">
          <IconButton onClick={signout}>
            <ExitToAppIcon />
          </IconButton>
          <IconButton
            onClick={() => console.log(localStorage.getItem("chattrJWT"))}
          >
            <ChatIcon />
          </IconButton>
          <IconButton onClick={checkUser}>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>

      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {room.map((r) => (
          <SidebarChat key={r._id} id={r._id} name={r.name} />
        ))}
        {err}
      </div>
    </div>
  );
};

export default Sidebar;
