import React, { useState, useEffect } from "react";
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";
import { Link } from "react-router-dom";
import axios from "../../axios";

const SidebarChat = ({ id, name, addNewChat }) => {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState("");

  useEffect(() => {
    if (id) {
      // db.collection("rooms")
      //   .doc(id)
      //   .collection("messages")
      //   .orderBy("timestamp", "desc")
      //   .onSnapshot((snapshot) =>
      //     setMessages(snapshot.docs.map((doc) => doc.data()))
      //   );
    }
  }, [id]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = async () => {
    const roomName = prompt("Please enter a name for the chat");

    if (roomName) {
      await axios.post(`/rooms`, {
        name: roomName,
        data: [],
        users: ["nishok", "mahi"],
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebar__info">
          <h2>{name}</h2>
          {/* <p>{messages[0]?.message}</p> */}
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add New Chat</h2>
    </div>
  );
};

export default SidebarChat;
