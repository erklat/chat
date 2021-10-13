import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

import { useAuthState } from "react-firebase-hooks/auth";

/*
* konfiguracija za firebase, ovaj objekt se dobije u firebase dashboardu
*/
firebase.initializeApp({
  apiKey: "AIzaSyAJaW4dKOvSjdh6EEbWJwhME0Popf5lfQM",
  authDomain: "mario-algebra-seminar-chat.firebaseapp.com",
  projectId: "mario-algebra-seminar-chat",
  storageBucket: "mario-algebra-seminar-chat.appspot.com",
  messagingSenderId: "1629207317",
  appId: "1:1629207317:web:e859b12719ca7d4326c71c",
  measurementId: "G-8MC1JL24L1",
});

/*
* inicijalizacija firebasea, ove metode proučiti iz
* dokumentacije firebasea
*/
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
};

export const GoogleUser = () => {
  /*
  * destrukturiranje arraya, [user] znači jednako useAuthState(auth)[0];
  */
  const [user] = useAuthState(auth);
  return user;
};

export default firebase;
