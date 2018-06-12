<template>
  <div class="dashboard layout--flex">
    <Menu/>
    <div class="page-content">
      <div class="page-header">
        <div class="page-heading">
          <a href="#">Public Profile</a>
          <h2>Your Drawings</h2>
        </div>
        <div>
          <img class="profile-pic" v-bind:src="'./static/assets/profile-pic-' + userObj.avatar + '.jpg'" alt="">
          <p>Hello, {{ userObj.username }}</p>
        </div>
      </div>
      <div class="dashboard__drawings">
        <p>drawing 1</p>
        <p>drawing 2</p>
        <p>drawing 3</p>
      </div>
    </div>
  </div>
</template>

<script>
// import * as firebase from 'firebase'
import firebase from 'firebase'
import Menu from '@/components/Menu.vue'

// This line is causing issues on page refresh
var userId = firebase.auth().currentUser.uid
const db = firebase.database()

export default {
  name: 'Dashboard',
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

.dashboard {
  background-color: $turquoise;
}
</style>
