// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

// Initialize Firebase
let app
let config = {
  apiKey: 'AIzaSyCy7ifhRgVmK--2C81QJoLezWCqdhA_AhE',
  authDomain: 'vue-firebase-tutorial-ally-w.firebaseapp.com',
  databaseURL: 'https://vue-firebase-tutorial-ally-w.firebaseio.com',
  projectId: 'vue-firebase-tutorial-ally-w',
  storageBucket: '',
  messagingSenderId: '213327077906'
}

firebase.initializeApp(config)

firebase.auth().onAuthStateChanged(function (user) {
  if (!app) {
    app = new Vue({
      el: '#app',
      template: '<App/>',
      components: { App },
      router
    })
  }
})
