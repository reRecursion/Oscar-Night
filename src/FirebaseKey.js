// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBI1IABKjyOWAxQ5gCt7A1VFM7gUvb8wcc",
    authDomain: "oscar-night-1f19f.firebaseapp.com",
    projectId: "oscar-night-1f19f",
    storageBucket: "oscar-night-1f19f.appspot.com",
    messagingSenderId: "502106701985",
    appId: "1:502106701985:web:6909e223e021d4843b30e0",
    measurementId: "G-FMH9N5YB4C"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
  } else {
    firebase.app() // if already initialized, use that one
  }
  
export const auth = firebase.auth()
export const firestore = firebase.firestore()
