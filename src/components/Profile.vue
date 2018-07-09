<template>
  <div v-if="dataReady" class="dashboard layout--flex">
    <Menu :color="userObj.color"/>
    <div class="page-content" v-bind:class="userObj.color">
      <Header title="My Profile" :link="false" :userObj="userObj"/>
      <div>
        <label for="usernameInput">Username:</label><br>
        <input id="usernameInput" type="text" v-model="userObj.username"><br>
        <label for="emailInput">Email:</label><br>
        <input id="emailInput" type="text" v-model="userObj.email"><br>
        <p>Avatar:</p>
        <div class="avatar-choices">
          <label v-for="n in 8" :key="n" :for="'profile-pic-' + n">
            <input type="radio" :value="n" name="avatar" :id="'profile-pic-' + n" v-model="userObj.avatar">
            <img class="profile-pic" :class="{selected: userObj.avatar == n}" v-bind:src="'./static/assets/profile-pic-' + n + '.jpg'">
          </label>
        </div>
        <p>Background Color:</p>
        <div class="color-choices">
          <label v-for="n in colorOptions" :key="n" :class="n">
            <input type="radio" :value="n" name="color" v-model="userObj.color">
            <div class="color-option" :class="{selected: userObj.color == n}"></div>
          </label>
        </div>
        <button id="update-btn" v-on:click="updateProfile">Save</button>
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
  name: 'Profile',
  data () {
    return {
      userObj: null,
      colorOptions: ['coral', 'orange', 'gold', 'seagreen', 'turquoise'],
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
    updateProfile: function () {
      var saveBtn = document.getElementById('update-btn')

      db.ref().child('/users/' + auth.currentUser.uid)
        .update({ username: this.userObj.username, email: this.userObj.email, avatar: this.userObj.avatar, color: this.userObj.color })
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

button {
  width: 400px;
}

input {
  margin-bottom: 40px;
}

.avatar-choices {
  display: flex;
  padding-bottom: 40px;

  label {
    margin-right: 20px;
  }

  input {
    display: none;
  }

  .profile-pic {
    opacity: 0.6;
    cursor: pointer;

    &:hover,
    &:active,
    &:focus,
    &.selected {
      opacity: 1;
    }
  }
}

.color-choices {
  display: flex;
  padding-bottom: 40px;

  label {
    margin-right: 20px;
  }

  input {
    display: none;
  }

  .color-option {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 8px solid $wht-40;
    cursor: pointer;
  }

  .coral .color-option {
    background-color: $coral;
  }

  .orange .color-option {
    background-color: $orange;
  }

  .gold .color-option {
    background-color: $gold;
  }

  .seagreen .color-option {
    background-color: $seagreen;
  }

  .turquoise .color-option {
    background-color: $turquoise;
  }
}

</style>
