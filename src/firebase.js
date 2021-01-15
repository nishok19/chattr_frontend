import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCnb41gFh5C3P0QIwTfDTZpH1mO5nxPDQU",
  authDomain: "whatschat-450b0.firebaseapp.com",
  projectId: "whatschat-450b0",
  storageBucket: "whatschat-450b0.appspot.com",
  messagingSenderId: "466855440070",
  appId: "1:466855440070:web:5364ad61b3a1e112a0f1c7",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
