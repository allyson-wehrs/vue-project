<template>
  <div v-if="dataReady" class="dashboard layout--flex">
    <Menu :color="userObj.color"/>
    <div class="page-content"  v-bind:class="userObj.color">
      <Header title="My Drawings" :link="true" :userObj="userObj"/>
      <div class="dashboard__drawings" v-for="(title, drawingID) in userObj.drawings" :key="drawingID" >
        <router-link :to="{ name: 'Drawing', query: { id: drawingID }}">{{ title }}</router-link>
      </div>
      <router-link to="/new-drawing"><button>+ New</button></router-link>
    </div>
  </div>
  <div v-else class="dashboard layout--flex">
     <Menu/>
    <div class="page-content">
      <p>Sorry, the data could not be retrieved.</p>
    </div>
  </div>
</template>

<script>
import {db, auth} from '@/lib/fire'
import Menu from '@/components/Menu.vue'
import Header from '@/components/Header.vue'

export default {
  name: 'Dashboard',
  data () {
    return {
      userObj: null,
      dataReady: false
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
        this.userObj = snapshot.val()[auth.currentUser.uid]
        this.dataReady = true
      })
    }
  },
  components: {
    Menu,
    Header
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
