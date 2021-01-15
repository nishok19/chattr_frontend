import React, { useState, useEffect } from "react";
import "./Sidebar.css";

import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { SearchOutlined } from "@material-ui/icons";
import SidebarChat from "./SidebarChat";
import db from "./firebase";
import { useStateValue } from "./StateProvider";

const Sidebar = () => {
  // const [rooms, setRooms] = useState([]);
  const [{ user, room }, dispactch] = useStateValue();

  // useEffect(() => {
  //     });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  // Testing
  const getSingleUser = () => {
    console.log(room);
  };

  // db.collection("rooms")
  //   .doc(roomId)
  //   .collection("messages")
  //   .where("receiver", "==", "nishok1905@gmail.com")
  //   .orderBy("timestamp", "asc")
  //   .get()
  //   .then((snapshot) => {
  //     setMessages(snapshot.docs.map((doc) => doc.data()));
  //   });

  // Testing__End

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar__headerRight">
          <IconButton onClick={getSingleUser}>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
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
      </div>
    </div>
  );
};

export default Sidebar;
