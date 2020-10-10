import * as firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyDNQqJa7oSecfALBzaInCw2x0z7AUH1hOA",
    authDomain: "foodzo-49e26.firebaseapp.com",
    databaseURL: "https://foodzo-49e26.firebaseio.com",
    projectId: "foodzo-49e26",
    storageBucket: "foodzo-49e26.appspot.com",
    messagingSenderId: "1098668614569",
    appId: "1:1098668614569:web:ecb5b96839026640f3dab8"
};
const Firebase = firebase.initializeApp(firebaseConfig);
export default Firebase;