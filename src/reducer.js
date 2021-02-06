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

      // const isPeopleFound = state.people.filter(
      //   (pep) => pep.email === action.people.email
      // );
      // let allPeople = [];
      // if (!isPeopleFound) {
      //   allPeople = [...state.people, action.people];
      // } else {
      //   allPeople = [...state.people];
      // }
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

    default:
      return state;
  }
};

export default reducer;
