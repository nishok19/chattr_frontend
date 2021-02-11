import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SidebarChat from "../SidebarChat/SidebarChat";
import firebase from "firebase";
import GroupModal from "./GroupModal/GroupModal";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ProfileModal from "./ProfileModal/ProfileModal.js";

import axios from "../../axios";
import { actionTypes } from "../../reducer";
import { useStateValue } from "../../StateProvider";
import { useHistory, useParams } from "react-router-dom";

const Sidebar = () => {
  // const [rooms, setRooms] = useState([]);
  const [{ user, room, jwt, people, currentRoom }, dispatch] = useStateValue();
  const [err, setErr] = useState("");
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  const history = useHistory();

  useEffect(() => {}, [roomId]);

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
            dispatch({
              type: actionTypes.SET_ROOM,
              room: res.data.data.map((room) => room),
              // room: res.data.room,
            });
            dispatch({
              type: actionTypes.SET_PEOPLE,
              people: res.data.peoples.map((p) => p),
              // room: res.data.room,
            });

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

    history.push("/login");
    dispatch({
      type: actionTypes.SIGNOUT_USER,
    });

    localStorage.removeItem("chattrJWT");
  };

  const createGroup = async () => {
    if (roomName) {
      await axios
        .post(`/rooms`, {
          name: roomName,
          data: [],
          users: [user.email],
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }

    console.log(roomName);
    setRoomName("");
  };

  const optionsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const optionsClose = () => {
    setAnchorEl(null);
  };

  const userNameUpdate = async (userName) => {
    if (userName != user.name) {
      await axios
        .put(
          "/auth/login",
          {
            change: "userNameUpdate",
            newUserName: userName,
          },
          {
            headers: {
              // "Content-Type": "application/json",
              Authorization: jwt,
            },
          }
        )
        .then((res) => {
          dispatch({
            type: actionTypes.SET_USER,
            user: res.data,
          });
          console.log("username update", res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  const onDelAcc = async () => {
    await axios
      .delete("/auth/login", {
        headers: {
          Authorization: jwt,
        },
      })
      .then((res) => {
        signout();
      })
      .catch((err) => console.log(err));
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
          <IconButton onClick={() => console.log(people, room)}>
            <MoreVertIcon />
          </IconButton>
          <IconButton onClick={optionsClick}>
            <MoreVertIcon />
          </IconButton>
          {/* <IconButton onClick={}>
            <ExitToAppIcon />
          </IconButton> */}
          {/* Menu */}
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={optionsClose}
          >
            <MenuItem>
              <ProfileModal onSubmit={userNameUpdate} onDelAcc={onDelAcc} />
            </MenuItem>
            <MenuItem onClick={signout}>Logout</MenuItem>
          </Menu>
          {/*  */}
        </div>
      </div>

      <div className="sidebar__search">
        <GroupModal
          roomName={roomName}
          setRoomName={setRoomName}
          onSubmit={createGroup}
        />
      </div>

      <div className="sidebar__chats">
        {/* <SidebarChat addNewChat /> */}
        {room.map((r) => (
          <SidebarChat
            key={r._id}
            id={r._id}
            name={r.name}
            // selected={r._id === roomId}
          />
        ))}
        {err}
      </div>
    </div>
  );
};

export default Sidebar;
