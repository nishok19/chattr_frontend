export const initialState = {
  user: null,
  room: [],
  jwt: "",
  people: [],
  currentRoom: "",
};

export const actionTypes = {
  SET_USER: "SET_USER",
  SET_ROOM: "SET_ROOM",
  SET_MESSAGE: "SET_MESSAGE",
  INSERT_NEW_ROOM: "INSERT_NEW_ROOM",
  SIGNOUT_USER: "SIGNOUT_USER",
  SET_JWT: "SET_JWT",
  SET_PEOPLE: "SET_PEOPLE",
  UPDATE_PEOPLE: "UPDATE_PEOPLE",
  SET_CURRENT_ROOM: "SET_CURRENT_ROOM",
  DELETE_ROOM: "DELETE_ROOM",
  LEAVE_ROOM: "LEAVE_ROOM",
  USER_LEFT: "USER_LEFT",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return { ...state, user: action.user };

    case actionTypes.SET_ROOM:
      return {
        ...state,
        room: action.room,
      };

    case actionTypes.INSERT_NEW_ROOM:
      const userRoomAdd = state.user;
      userRoomAdd.rooms = state.user.rooms.concat(action.room._id);
      return {
        ...state,
        room: [...state.room, action.room],
        user: userRoomAdd,
      };

    case actionTypes.SET_MESSAGE: {
      const stateRoom = [...state.room];
      const roomIndex = stateRoom.filter((r) => r._id === action.roomId)[0];
      const index = stateRoom.findIndex((room) => room._id === action.roomId);
      const addedMsg = roomIndex.data.concat(action.msg);
      // const actualRooms = [...state.room];
      const uniqueMsgs = addedMsg
        .map((e) => e["_id"])
        .map((e, i, final) => final.indexOf(e) === i && i)
        .filter((obj) => addedMsg[obj])
        .map((e) => addedMsg[e]);

      roomIndex.data = uniqueMsgs;
      stateRoom.splice(index, 1, roomIndex);
      console.log("reducer msg", addedMsg, roomIndex, stateRoom);

      return {
        ...state,
        room: stateRoom,
      };
    }

    case actionTypes.SIGNOUT_USER: {
      return {
        user: null,
        room: [],
      };
    }

    case actionTypes.SET_JWT:
      return {
        ...state,
        jwt: action.accessToken,
      };

    case actionTypes.SET_PEOPLE:
      return {
        ...state,
        people: action.people,
      };

    case actionTypes.SET_CURRENT_ROOM:
      return {
        ...state,
        currentRoom: action.room,
      };

    case actionTypes.UPDATE_PEOPLE:
      const actualRooms = state.room;
      const userRoom = state.room.filter((r) => r._id === action.roomId)[0];
      const changedUsers = userRoom.users.concat(action.people.email);
      userRoom.users = changedUsers;
      const index = state.room.findIndex((room) => room._id === action.roomId);
      actualRooms.splice(index, 1, userRoom);
      console.log("actualRoomsUsers", actualRooms);

      const allPeople = [...state.people, action.people];
      const uniquePeople = allPeople
        .map((e) => e["_id"])
        .map((e, i, final) => final.indexOf(e) === i && i)
        .filter((obj) => allPeople[obj])
        .map((e) => allPeople[e]);

      return {
        ...state,
        people: uniquePeople,
        room: actualRooms,
      };

    case actionTypes.DELETE_ROOM:
      const rooms = state.room.filter((room) => room._id !== action.roomId);
      return {
        ...state,
        room: rooms,
      };

    case actionTypes.LEAVE_ROOM:
      const userNotLeavingRooms = state.room.filter(
        (room) => room._id != action.roomId
      );
      return {
        ...state,
        user: action.user,
        room: userNotLeavingRooms,
      };

    case actionTypes.USER_LEFT:
      const stateRooms = [...state.room];
      const roomToAlter = stateRooms.filter((r) => r._id === action.roomId)[0];
      const indexOfAlterRoom = stateRooms.findIndex(
        (room) => room._id === action.roomId
      );
      roomToAlter.users = action.users;
      stateRooms.splice(indexOfAlterRoom, 1, roomToAlter);

      return {
        ...state,
        room: stateRooms,
      };

    default:
      return state;
  }
};

export default reducer;
