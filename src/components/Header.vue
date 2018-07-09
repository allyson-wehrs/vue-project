<template>
  <div class="page-header">
    <div class="page-heading">
      <a href="#" v-if="link">Public Profile</a>
      <h2>{{ title }}</h2>
    </div>
    <div>
      <img class="profile-pic" v-bind:src="'./static/assets/profile-pic-' + userObj.avatar + '.jpg'" alt="">
      <p>Hello, {{ userObj.username }}</p>
    </div>
  </div>
</template>

<script>
import * as firebase from 'firebase'

export default {
  name: 'Header',
  props: {
    title: String,
    link: Boolean,
    userObj: Object
  },
  methods: {
    logout: function () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/styles/settings.scss";

.page-header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid $blk;
  margin-bottom: 40px;

  .page-heading {
    display: flex;
    flex-wrap: wrap;

    h2 {
      width: 100%;
      align-self: flex-end;
      margin-bottom: 18px;
    }
  }

  .profile-pic {
    border: 8px solid $wht-40;
    margin: 0 auto;
  }

  p {
    font-style: italic;
  }
}

</style>
