import React, { useState, useEffect } from "react";
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
// import axios from "../../axios";

const SidebarChat = ({ id, name, data }) => {
  const [seed, setSeed] = useState("");
  const [{ currentRoom }] = useStateValue();
  const { roomId } = useParams();
  const [isSelected, setIsSelected] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages(data);
  }, [data]);

  useEffect(() => {
    setIsSelected(id === currentRoom);
  }, [currentRoom]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  return (
    <Link to={`/rooms/${id}`}>
      <div className={`sidebarChat ${isSelected && "sidebarChat__selected"}`}>
        {/* <div className={isSelected ? "sidebarChat__selected" : "sidebarChat"}> */}
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat__info">
          <span>{name}</span>
          <p
            className={`sidebarChat__msg ${
              isSelected && "sidebarChat__msg__selected"
            }`}
          >
            {messages[messages.length - 1]?.message}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default SidebarChat;
