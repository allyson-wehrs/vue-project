<template>
  <div class="login__container layout--centered">
    <div class="login__form">
      <h1 class="heading heading--center heading--brand">Doodlebug</h1>
      <input type="text" v-model="email" placeholder="Email"><br>
      <input type="password" v-model="password" placeholder="Password"><br>
      <button v-on:click="signIn">Sign In</button>
      <p>You don't have an account? You can <router-link to="/sign-up">create one</router-link></p>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'login',
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signIn: function () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          this.$router.replace('dashboard')
        },
        (err) => {
          alert('Oops. ' + err.message)
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/settings.scss";

  .login {
    &__container {
      background-color: $turquoise;
    }
    &__form {
      width: 400px;
      max-width: 100%;
    }
  }
</style>
