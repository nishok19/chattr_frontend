import React, { useState, useEffect } from "react";
import "./Chat.css";

import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
// import db from "./firebase";
import firebase from "firebase";
import axios from "../../axios";
import Pusher from "pusher-js";

import { useParams } from "react-router-dom";
import { actionTypes } from "../../reducer";
import { useStateValue } from "../../StateProvider";

const Chat = () => {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user, room, jwt }, dispatch] = useStateValue();

  // new thing PUSHER
  useEffect(() => {
    const pusher = new Pusher("ef3c3aa07c44c7f445e9", {
      cluster: "ap2",
    });

    const channelRoom = pusher.subscribe("rooms");

    channelRoom.bind("updated", (data) => {
      console.log("i am testing", data);
      //
      if (data.type === "messageUpdate") {
        const msg = data?.data;

        const msgData = Object.values(msg)[1];
        console.log("i am chat", msgData);
        if (msgData) {
          const isRoomFound = room.find((r) => r._id === data.roomId._id);
          if (isRoomFound) {
            const msgRoomId = data.roomId._id;
            // updatedRoom = room.filter((r) => r._id == roomId);

            dispatch({
              type: actionTypes.SET_MESSAGE,
              roomId: msgRoomId,
              msg: msgData,
            });

            setMessages(() =>
              msgRoomId === msgRoomId ? [...messages, msgData] : [...messages]
            );
          }
        }
      } else if (data.type === "userUpdate") {
        console.log("i am second chat", data);
        const isRoomFound = room.find((r) => r._id === data.roomId._id);
        if (!isRoomFound) {
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
                console.log("from chat", res);
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
                // signoutInvalid();
                // setErr(JSON.stringify(err));
              });
          };
          getRooms();
        } else {
          dispatch({
            type: actionTypes.UPDATE_PEOPLE,
            people: data.userDetails[0],
            roomId: data.roomId._id,
          });
        }
      }
    });

    return () => {
      channelRoom.unbind_all();
      channelRoom.unsubscribe();
    };
  }, [roomId, messages]);

  // new thing__end PUSHER

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
      setRoomName(room_data?.name);
      setMessages(room_data?.data);
      dispatch({
        type: actionTypes.SET_CURRENT_ROOM,
        room: room_data?._id,
      });
    }
  }, [roomId, room, messages]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = async (e) => {
    e.preventDefault();

    await axios.put(`/rooms/${roomId}`, {
      message: input,
      name: user.name,
      timestamp: Date.now(),
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
          {/* <p> */}
          {/* Last Seen yet to be Updated */}
          {/* {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()} */}
          {/* </p> */}
        </div>
        <div className="chat__headerRight">
          {/* <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton> */}
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      {/* Chat Body */}
      <div className="chat__body">
        {messages?.map((message) => (
          <p
            key={message?._id}
            className={`chat__message ${
              message?.name === user?.name && "chat__reciever"
            }`}
          >
            <span className="chat__name">{message?.name}</span>
            {message?.message}
            <span className="chat__timestamp">
              {new Date(message?.createdAt)
                .toLocaleTimeString([], {
                  hour12: true,
                  hour: "2-digit",
                  minute: "2-digit",
                })
                .toString()}
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
