import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import { useAuthState } from 'react-firebase-hooks/auth';

firebase.initializeApp({
    apiKey: "AIzaSyAJaW4dKOvSjdh6EEbWJwhME0Popf5lfQM",
    authDomain: "mario-algebra-seminar-chat.firebaseapp.com",
    projectId: "mario-algebra-seminar-chat",
    storageBucket: "mario-algebra-seminar-chat.appspot.com",
    messagingSenderId: "1629207317",
    appId: "1:1629207317:web:e859b12719ca7d4326c71c",
    measurementId: "G-8MC1JL24L1"
})


export default firebase;
