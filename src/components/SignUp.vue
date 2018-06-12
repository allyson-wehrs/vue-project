<template>
  <div class="sign-up__container layout--centered">
    <div class="sign-up__form">
      <h2 class="heading heading--center">Let's create a new account!</h2>
      <input type="text" v-model="email" placeholder="Email"><br>
      <input type="password" v-model="password" placeholder="Password"><br>
      <button v-on:click="signUp">Sign Up</button>
      <p>or go back to <router-link to="/login">login</router-link>.</p>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'signUp',
  data: function () {
    return {
      email: '',
      password: '',
      username: ''
    }
  },
  methods: {
    signUp: function () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(
          (user) => {
            if (user) {
              firebase.database().ref('users/' + user.user.uid).set({
                email: this.email,
                username: this.defaultUsername(this.email)
              }).then(
                this.$router.replace('hello')
              )
            }
          })
        .catch(function (error) {
          // Handle Errors here.
          alert(error.message)
        })
    },
    defaultUsername: function (email) {
      var username = email.substr(0, email.indexOf('@'))
      return username
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/settings.scss";

  .sign-up {
    &__container {
      background-color: $seagreen;
    }
    &__form {
      width: 400px;
      max-width: 100%;
    }
  }
</style>
