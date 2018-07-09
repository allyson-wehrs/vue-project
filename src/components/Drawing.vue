<template>
  <div v-if="userObj && drawingObj" class="dashboard layout--flex">
    <Menu :color="userObj.color"/>
    <div class="page-content"  v-bind:class="userObj.color">
      <Header :title="drawingObj.title" :link="false" :userObj="userObj"/>
      <div class="dashboard__drawings">
        <p>a cool drawing {{ id }}</p>
      </div>
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
  name: 'Drawing',
  data () {
    return {
      userObj: null,
      drawingObj: null,
      id: 0,
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
      // Get the user data
      db.ref('users').on('value', (snapshot) => {
        this.userObj = snapshot.val()[auth.currentUser.uid]
      })
      // Get the drawing data
      if (this.$route.query.id) {
        // get the id of the drawing from the query params
        this.id = this.$route.query.id
        // retrieve the drawing from the database
        db.ref('drawings').on('value', (snapshot) => {
          this.drawingObj = snapshot.val()[this.id]
          // make sure current user is authorized to view the drawing
          if (auth.currentUser.uid !== this.drawingObj.author) {
            this.drawingObj = null
          }
        })
      }
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

</style>
