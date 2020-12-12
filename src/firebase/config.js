import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyDZASMXdO_usZfDp0Ogvz0mv_CfiiQ_N90",
  authDomain: "mae-scinuggets.firebaseapp.com",
  databaseURL: "https://mae-scinuggets.firebaseio.com",
  projectId: "mae-scinuggets",
  storageBucket: "mae-scinuggets.appspot.com",
  messagingSenderId: "821075835777",
  appId: "1:821075835777:web:fd5ce2121d286a7dc50680",
  measurementId: "G-Z8WTN06KPX",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();
const store = firebase.storage();
const timestamp = firebase.firestore.FieldValue.serverTimestamp();

// Auth Providers
const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const twitterProvider = new firebase.auth.TwitterAuthProvider();
const githubProvider = new firebase.auth.GithubAuthProvider();

export { auth, db, store, timestamp };

// Export Auth Providers
export { googleProvider, facebookProvider, twitterProvider, githubProvider };
