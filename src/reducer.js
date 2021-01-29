export const initialState = {
  user: null,
  room: [],
  jwt: "",
};

export const actionTypes = {
  SET_USER: "SET_USER",
  SET_ROOM: "SET_ROOM",
  SET_MESSAGE: "SET_MESSAGE",
  INSERT_NEW_ROOM: "INSERT_NEW_ROOM",
  SIGNOUT_USER: "SIGNOUT_USER",
  SET_JWT: "SET_JWT",
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
      return {
        ...state,
        room: [...state.room, action.room],
      };

    case actionTypes.SET_MESSAGE: {
      const roomIndex = state.room.filter((r) => r._id === action.roomId)[0];
      const index = state.room.findIndex((room) => room._id === action.roomId);
      const addedMsg = roomIndex.data.concat(action.msg);
      const actualRooms = state.room;
      roomIndex.data = addedMsg;
      actualRooms.splice(index, 1, roomIndex);
      console.log(actualRooms);
      return {
        ...state,
        room: actualRooms,
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

    default:
      return state;
  }
};

export default reducer;
