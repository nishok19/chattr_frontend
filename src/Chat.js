import React, { useState, useEffect } from "react";
import "./Chat.css";

import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
// import db from "./firebase";
import firebase from "firebase";
import axios from "./axios";
import Pusher from "pusher-js";

import { useParams } from "react-router-dom";
import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";

const Chat = () => {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user, room }, dispatch] = useStateValue();

  // new thing
  useEffect(() => {
    const pusher = new Pusher("ef3c3aa07c44c7f445e9", {
      cluster: "ap2",
    });

    const channelRoom = pusher.subscribe("rooms");

    channelRoom.bind("updated", (data) => {
      const msg = data.data;
      const msgRoomId = data.roomId._id;
      // updatedRoom = room.filter((r) => r._id == roomId);

      dispatch({
        type: actionTypes.SET_MESSAGE,
        roomId: roomId,
        msg: msg,
      });

      console.log("i am chat", data);
      setMessages(() =>
        roomId === msgRoomId ? [...messages, msg] : [...messages]
      );
    });

    return () => {
      channelRoom.unbind_all();
      channelRoom.unsubscribe();
    };
  }, [roomId, messages]);

  // new thing__end

  useEffect(() => {
    if (roomId) {
      //   db.collection("rooms")
      //     .doc(roomId)
      //     .onSnapshot((snapshot) => setRoomName(snapshot.data().name));
      //   db.collection("rooms")
      //     .doc(roomId)
      //     .collection("messages")
      //     .orderBy("timestamp", "asc")
      //     .onSnapshot((snapshot) =>
      //       setMessages(snapshot.docs.map((doc) => doc.data()))
      //     );

      const room_data = room.filter((room) => {
        return room._id == roomId;
      })[0];
      setRoomName(room_data.name);
      // const msg = msgs.filter((msg) => msg.roomId === roomId);
      setMessages(room_data.data);
      // setMessages(msgs);
    }
  }, [roomId, room, messages]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = async (e) => {
    e.preventDefault();

    await axios.put(`/rooms/${roomId}`, {
      message: input,
      name: "nishok",
      timestamp: "timestamp",
    });

    // setMessages([...messages]);

    setInput("");
  };

  return (
    <div className="chat">
      {/* Header */}
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>
            Last Seen yet to be Updated
            {/* {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()} */}
          </p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      {/* Chat Body */}
      <div className="chat__body">
        {messages.map((message) => (
          <p
            key={message._id}
            className={`chat__message ${
              message.name === "nishok" && "chat__reciever"
              // user.displayName && "chat__reciever"
            }`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">
              TimeStamp yet to be updated
              {/* {new Date(message.timestamp?.toDate()).toUTCString()} */}
            </span>
          </p>
        ))}
      </div>

      {/* Chat Input Footer */}
      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a Message..."
          />
          <button onClick={sendMessage} type="submit">
            Send a Message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
};

export default Chat;
