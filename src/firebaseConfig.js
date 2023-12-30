import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/firestore' 

const firebaseConfig = {
  apiKey: "AIzaSyAznwnNr47judGnPBOQZBdO5jMSdmXONy0",
  authDomain: "type-test-41e5d.firebaseapp.com",
  projectId: "type-test-41e5d",
  storageBucket: "type-test-41e5d.appspot.com",
  messagingSenderId: "413021802208",
  appId: "1:413021802208:web:995f5d09056378e5d28a85",
  measurementId: "G-266W2WPQ3F"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export {auth,db}