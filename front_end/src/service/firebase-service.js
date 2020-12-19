
import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyDjjkjIL5s4bRPysfb6OeEJFYfJ69RD9-I",
    authDomain: "proyecto2-a4d0a.firebaseapp.com",
    projectId: "proyecto2-a4d0a",
    storageBucket: "proyecto2-a4d0a.appspot.com",
    messagingSenderId: "341066855205",
    appId: "1:341066855205:web:0982bbcceb25e8fcdae0cc"

}

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(user => {
   if (user) {
     return user;
   }
});


export const auth = firebase.auth
export const getToken = async ()=>{
   return await firebase.auth().currentUser.getIdToken();
};

export const getNombre = async ()=>{
   return await firebase.auth().currentUser.displayName;
};
export default firebase;
