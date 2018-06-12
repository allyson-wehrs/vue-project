<template>
  <div class="dashboard layout--flex">
    <Menu/>
    <div class="page-content">
      <div class="page-header">
        <div class="page-heading">
          <h2>Your Profile</h2>
        </div>
        <div>
          <img class="profile-pic" v-bind:src="'./static/assets/profile-pic-' + userObj.avatar + '.jpg'" alt="">
          <p>Hello, {{ userObj.username }}</p>
        </div>
      </div>
      <div>
        <label for="usernameInput">Username:</label><br>
        <input id="usernameInput" type="text" v-model="userObj.username"><br>
        <label for="emailInput">Email:</label><br>
        <input id="emailInput" type="text" v-model="userObj.email"><br>
        <button id="update-btn" v-on:click="updateProfile">Save<span class="check-wrap"></span></button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
import Menu from '@/components/Menu.vue'

var userId = firebase.auth().currentUser.uid
const db = firebase.database()

export default {
  name: 'Profile',
  data () {
    return {
      userObj: null
    }
  },
  created: function () {
    this.init()
  },
  methods: {
    init: function () {
      this.loadData()
    },
    loadData: function () {
      db.ref('users').on('value', (snapshot) => {
        this.userObj = snapshot.val()[userId]
      })
    },
    updateProfile: function () {
      firebase.database().ref().child('/users/' + userId)
        .update({ username: this.userObj.username, email: this.userObj.email })
      document.getElementById('update-btn').innerHTML = 'Saved!'
    }
  },
  components: {
    Menu
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/styles/settings.scss";

.page-content {
  background-color: $turquoise;
}
button {
  width: 400px;
}
input {
  margin-bottom: 40px;
}
</style>
