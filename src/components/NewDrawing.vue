<template>
  <div v-if="dataReady" class="dashboard layout--flex">
    <Menu :color="userObj.color"/>
    <div class="page-content"  v-bind:class="userObj.color">
      <Header title="A New Drawing" :link="false" :userObj="userObj"/>
      <div class="dashboard__drawings">
        <label for="titleInput">Title:</label><br>
        <input id="titleInput" type="text" v-model="title"><br>
        <p>a cool drawing</p>
        <button id="save-btn" v-on:click="saveDrawing">Save</button>
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
  name: 'NewDrawing',
  data () {
    return {
      userObj: null,
      title: '',
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
    },
    saveDrawing: function () {
      var saveBtn = document.getElementById('save-btn')
      var newKey = db.ref().push().key

      db.ref().child('users/' + auth.currentUser.uid + '/drawings/').update({
        [newKey]: true
      })
      db.ref().child('drawings/' + newKey).set({
        title: this.title,
        author: auth.currentUser.uid
      }).then(
        this.$router.replace('dashboard')
      )
      saveBtn.innerHTML = 'Saved!'
      setTimeout(function () { saveBtn.innerHTML = 'Save' }, 1200)
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
