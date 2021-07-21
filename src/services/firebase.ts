import firebase from 'firebase/app' 

import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyB4stcMoqPzhefVVdBRXBxq_kTEhhU_bGs",
  authDomain: "letmeask-web-2e04c.firebaseapp.com",
  databaseURL: "https://letmeask-web-2e04c-default-rtdb.firebaseio.com",
  projectId: "letmeask-web-2e04c",
  storageBucket: "letmeask-web-2e04c.appspot.com",
  messagingSenderId: "669514863748",
  appId: "1:669514863748:web:301d05deaae584a6bd9ed1"
};
firebase.initializeApp(firebaseConfig)

const auth = firebase.auth()

const database = firebase.database()


 export { firebase, auth, database }