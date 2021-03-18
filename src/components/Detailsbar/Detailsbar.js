import React, { useState, useEffect } from "react";
import "./Detailsbar.css";
import UserModal from "../Detailsbar/Modal/UserModal";
import { Avatar, IconButton } from "@material-ui/core";
// import ChatIcon from "@material-ui/icons/Chat";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
// import AddIcon from "@material-ui/icons/Add";
// import PersonAddRoundedIcon from "@material-ui/icons/PersonAddRounded";
// import { Button } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";

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
  const [thisRoomId, setThisRoomId] = useState("");
  const [seed, setSeed] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  useEffect(() => {
    const room_data = room.filter((room) => {
      return room._id === roomId;
    })[0];
    setRoomUsers(room_data?.users);
    setRoomName(room_data?.name);
    setThisRoomId(room_data?._id);
  }, [roomId, room, people, roomUsers]);

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
          room: thisRoomId.trim(),
        })
        .then((res) => {
          if (!res.data.userExists) {
            // const handleClick = () => {
            setSnackBarOpen(true);
            console.log("Detailsbar add user: ", res);
            // };
          }
        })
        .catch((err) => console.log(err));
    }

    // setInputValue("");
  };

  const snackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackBarOpen(false);
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
        {people?.map((pep) =>
          roomUsers?.map((user) =>
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

      {/* Snackbar */}

      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={snackBarOpen}
          autoHideDuration={6000}
          onClose={snackBarClose}
          message={`User "${inputValue}" was not found ...!! Enter a valid user`}
          // action={
          //   <React.Fragment>
          //     {/* <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
          //     <CloseIcon fontSize="small" />
          //   </IconButton> */}
          //   </React.Fragment>
          // }
        />
      </div>

      {/* Snackbar End */}
    </div>
  );
};

export default Detailsbar;
