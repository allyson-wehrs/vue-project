<template>
  <div id="main-nav">
    <div>
      <h1 class="heading heading--brand"><router-link to="/dashboard">Doodlebug</router-link></h1>
      <ul>
        <li><router-link to="/dashboard">Drawings</router-link></li>
        <li><router-link to="/profile">Profile</router-link></li>
        <li><router-link to="/friends">Friends</router-link></li>
      </ul>
    </div>
    <button v-on:click="logout">Logout</button>
  </div>
</template>

<script>
import * as firebase from 'firebase'

export default {
  name: 'Menu',
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

#main-nav {
  width: 260px;
  background-color: $turquoise;
  height: 100%;
  padding: 0 20px 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  box-shadow: 5px 0 10px $blk-50;
  position: relative;
  z-index: 10;
}
h1 a {
  color: $blk;
  text-decoration: none;
}
ul {
  padding: 0;
}
li {
  list-style-type: none;
  padding-bottom: 1em;
  a {
    color: $blk;
    text-decoration: none;
    font-weight: 600;
    @include font-size($nav-font-sizes);

    &:hover,
    &:active,
    &:focus {
      text-decoration: underline;
    }
  }
}
button {
  align-self: flex-end;

}
</style>
