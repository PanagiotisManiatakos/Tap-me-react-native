// // Import the functions you need from the SDKs you need
// import * as firebase from "firebase";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAZWX6WwOIjyA8I8vs-TiATLxm0Sr1TLTY",
//   authDomain: "tap-me-cf3f4.firebaseapp.com",
//   projectId: "tap-me-cf3f4",
//   storageBucket: "tap-me-cf3f4.appspot.com",
//   messagingSenderId: "611972076865",
//   appId: "1:611972076865:web:c6a9390a6fa453d7533dc0"
// };

// // Initialize Firebase
// let app;
// if (firebase.apps.length===0){
//     app = firebase.initializeApp(firebaseConfig);
// }else{
//     app = firebase.app()
// }


// const auth = firebase.auth();

// export {auth};


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZWX6WwOIjyA8I8vs-TiATLxm0Sr1TLTY",
  authDomain: "tap-me-cf3f4.firebaseapp.com",
  databaseURL: "https://tap-me-cf3f4-default-rtdb.firebaseio.com",
  projectId: "tap-me-cf3f4",
  storageBucket: "tap-me-cf3f4.appspot.com",
  messagingSenderId: "611972076865",
  appId: "1:611972076865:web:c6a9390a6fa453d7533dc0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const database = getDatabase(app);
export default app;
