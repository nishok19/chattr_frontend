import React, { useEffect } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import Pusher from "pusher-js";
import axios from "./axios";

import { actionTypes } from "./reducer";
import { useStateValue } from "./StateProvider";

const App = () => {
  const [{ user, room }, dispatch] = useStateValue();

  useEffect(() => {
    axios.get("/rooms").then((res) => {
      // console.log(res.data);
      dispatch({
        type: actionTypes.SET_ROOM,
        room: res.data.map((room) => room),
      });
      // console.log(room);
    });
  }, []);

  // pusher

  useEffect(() => {
    const pusher = new Pusher("ef3c3aa07c44c7f445e9", {
      cluster: "ap2",
    });

    const channelRoom = pusher.subscribe("rooms");
    channelRoom.bind("inserted", (data) => {
      alert(JSON.stringify(data));
      console.log("pusher room", data);
      // dispatch({
      //   type: actionTypes.SET_ROOM,
      //   room: {...room,},
      // });
    });

    // const channelMessage = pusher.subscribe("messages");
    // channelRoom.bind("updated", (data) => {
    //   const msg = data.data;
    //   const roomId = data.roomId._id;
    //   console.log("pusher msg 1 ", msg);
    //   console.log("pusher msg 2 ", roomId);
    // updatedRoom = room.filter((r) => r._id == roomId);

    // dispatch({
    //   type: actionTypes.SET_MESSAGE,
    //   roomId: roomId,
    //   msg: msg,
    // });
    // });

    return () => {
      channelRoom.unbind_all();
      channelRoom.unsubscribe();
    };
  }, [room]);

  return (
    <div className="app">
      {/* after completion change the 'user' to '!user */}
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
              <Route path="/">{/* <Chat /> */}</Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
};

export default App;
