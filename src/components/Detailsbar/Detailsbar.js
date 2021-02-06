import React, { useState, useEffect } from "react";
import "./Detailsbar.css";
import UserModal from "../Detailsbar/Modal/UserModal";
import { Avatar, IconButton } from "@material-ui/core";
// import ChatIcon from "@material-ui/icons/Chat";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
// import AddIcon from "@material-ui/icons/Add";
// import PersonAddRoundedIcon from "@material-ui/icons/PersonAddRounded";
import { Button } from "@material-ui/core";

import axios from "../../axios";
import { actionTypes } from "../../reducer";
import { useStateValue } from "../../StateProvider";
import { useParams, useHistory } from "react-router-dom";

const Detailsbar = () => {
  const [{ user, room, people }, dispatch] = useStateValue();
  const [roomUsers, setRoomUsers] = useState([]);
  const { roomId } = useParams();
  const [inputValue, setInputValue] = useState("");
  const [roomName, setRoomName] = useState("");
  const [seed, setSeed] = useState("");
  // const [roomUserName, setRoomUserName] = useState([]);

  useEffect(() => {
    const room_data = room.filter((room) => {
      return room._id === roomId;
    })[0];
    setRoomUsers(room_data?.users);
    setRoomName(room_data?.name);
    // setRoomUserName(r)
  }, [roomId, room, people]);

  useEffect(() => {
    if (user.photoURL == null) {
      setSeed(Math.floor(Math.random() * 5000));
    }
  }, []);

  const onSubmit = async () => {
    if (inputValue) {
      await axios
        .post(`/rooms/${roomId}`, {
          user: inputValue,
          room: roomName,
        })
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }

    setInputValue("");
    console.log(inputValue);
  };

  return (
    <div className="details">
      <div className="details__header">
        <h2>People</h2>

        <UserModal
          inputValue={inputValue}
          setInputValue={setInputValue}
          onSubmit={onSubmit}
        />
      </div>
      <div className="details__body">
        {people.map((pep) =>
          roomUsers.map((user) =>
            user === pep.email ? (
              <div className="details__people" key={user}>
                <Avatar
                  src={
                    pep.photoURL
                      ? pep.photoURL
                      : `https://avatars.dicebear.com/api/human/${seed}.svg`
                  }
                />
                <span>{pep.name}</span>
              </div>
            ) : null
          )
        )}
      </div>

      {/* <Avatar
        src={
          user.photoURL
            ? user.photoURL
            : `https://avatars.dicebear.com/api/human/${seed}.svg`
        }
        /> */}
      {/* <div className="sidebar__headerRight">
          <IconButton>
            <ExitToAppIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>*/}
      {/* 
      <div className="sidebar__search">
        <IconButton>
          <AddIcon />
        </IconButton>
        <div className="sidebar__searchContainer">
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div> */}

      {/* <div className="sidebar__chats"> */}
      {/* <SidebarChat addNewChat /> */}
      {/* {room.map((r) => (
            <SidebarChat key={r._id} id={r._id} name={r.name} />
          ))} */}
      {/* </div> */}
    </div>
  );
};

export default Detailsbar;
