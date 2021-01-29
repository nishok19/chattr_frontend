import firebase from "firebase";

// const firebaseConfig = {
//   apiKey: "AIzaSyCnb41gFh5C3P0QIwTfDTZpH1mO5nxPDQU",
//   authDomain: "whatschat-450b0.firebaseapp.com",
//   projectId: "whatschat-450b0",
//   storageBucket: "whatschat-450b0.appspot.com",
//   messagingSenderId: "466855440070",
//   appId: "1:466855440070:web:5364ad61b3a1e112a0f1c7",
// };

const firebaseConfig = {
  apiKey: "AIzaSyDvjMWph7o2cu82Ajw2bRnFRm8aB8jPzHI",
  authDomain: "chattr19.firebaseapp.com",
  projectId: "chattr19",
  storageBucket: "chattr19.appspot.com",
  messagingSenderId: "531606704424",
  appId: "1:531606704424:web:f9b1ce58d2c74106e1c01d",
  measurementId: "G-ZPYVCT48XP",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// auth
//   .setPersistence(firebase.auth.Auth.Persistence.NONE)
//   .then(() => {
//     // In memory persistence will be applied to the signed in Google user
//     // even though the persistence was set to 'none' and a page redirect
//     // occurred.
//     return firebase.auth().signInWithRedirect(provider);
//   })
//   .catch((err) => {
//     // Handle Errors here.
//     console.log(err);
//   });

// auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

export { auth, provider };
export default db;
