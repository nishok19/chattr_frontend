import React, { useState, useEffect } from "react";
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";
import { Link, useParams } from "react-router-dom";
import { useStateValue } from "../../StateProvider";
// import axios from "../../axios";

const SidebarChat = ({ id, name }) => {
  const [seed, setSeed] = useState("");
  const [{ currentRoom }, dispatch] = useStateValue();
  const { roomId } = useParams();
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    //   if (id) {
    //     // db.collection("rooms")
    //     //   .doc(id)
    //     //   .collection("messages")
    //     //   .orderBy("timestamp", "desc")
    //     //   .onSnapshot((snapshot) =>
    //     //     setMessages(snapshot.docs.map((doc) => doc.data()))
    //     //   );

    //     // setMessages(room.map((room) => room.data));

    //     const thisRoom = room.filter((room) => room._id === id)[0].data;
    //     // thisRoom.sortBy((msg) => msg.message);
    //     // thisRoom.sort((a, b) => new Date(a.date) - new Date(b.date));
    //     console.log("this room sidebarchat", thisRoom);
    //     setMessages(thisRoom);
    //   }

    setIsSelected(id === currentRoom);
  }, [roomId, currentRoom]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  // return !addNewChat ? (
  return (
    <div>
      <Link to={`/rooms/${id}`}>
        <div
          // className="sidebarChat"
          className={`sidebarChat ${isSelected && "sidebarChat__selected"}`}
        >
          <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
          <div className="sidebar__info">
            <h2>{name}</h2>
            {/* <p>{messages[messages.length - 1]?.message}</p> */}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SidebarChat;
