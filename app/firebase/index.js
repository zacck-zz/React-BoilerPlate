
import firebase from 'firebase';
//use try since async
try {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC87ODgKYf8LzVuAs5N_bA1eE-7KyGHun0",
    authDomain: "gentest-7b8cd.firebaseapp.com",
    databaseURL: "https://gentest-7b8cd.firebaseio.com",
    storageBucket: "gentest-7b8cd.appspot.com",
  };
  firebase.initializeApp(config);
} catch(e) {

}

//get database root reference
export var firebaseRef = firebase.database().ref();
export default firebase;
