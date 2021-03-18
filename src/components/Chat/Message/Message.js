import React, { useState, useEffect } from "react";
import "./Message.css";
// import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import { useStateValue } from "../../../StateProvider";

const Message = ({ message }) => {
  const [{ user, people }, dispatch] = useStateValue();
  const [msgDate, setMsgDate] = useState(null);
  const [msgTime, setMsgTime] = useState(null);
  const [msgUser, setMsgUser] = useState(null);

  useEffect(() => {
    setMsgDate(new Date(message?.createdAt).toDateString());
    console.log("message.js", message);
    setMsgTime(
      new Date(message?.createdAt)
        .toLocaleTimeString([], {
          hour12: true,
          hour: "2-digit",
          minute: "2-digit",
        })
        .toString()
    );
    // const msgUser =
    setMsgUser(
      people.find((p) => {
        if (message?.user === p.email) {
          return p;
        }
      })
    );
  }, []);

  return (
    <div className="message__body">
      {
        // messages?.map((message) => (
        <p
          // key={message?._id}
          className={`message__msg ${
            message?.user === user?.email && "message__reciever"
          }`}
        >
          <span className="message__name">{msgUser?.name}</span>
          <span className="message__info">{message?.message}</span>
          <span className="message__timestamp">
            <Tooltip title={msgDate ? msgDate : ""}>
              <span>{msgTime}</span>
            </Tooltip>
          </span>
        </p>
      }
    </div>
  );
};

export default Message;
