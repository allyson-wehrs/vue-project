import firebase from 'firebase'

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyCy7ifhRgVmK--2C81QJoLezWCqdhA_AhE',
  authDomain: 'vue-firebase-tutorial-ally-w.firebaseapp.com',
  databaseURL: 'https://vue-firebase-tutorial-ally-w.firebaseio.com',
  projectId: 'vue-firebase-tutorial-ally-w',
  storageBucket: '',
  messagingSenderId: '213327077906'
}

firebase.initializeApp(config)

export const db = firebase.database()
export const auth = firebase.auth()
