<template>
  <div class="dashboard layout--flex">
    <Menu/>
    <div>
      <p>Friends</p>
    </div>
  </div>
</template>

<script>
import Menu from '@/components/Menu.vue'

export default {
  name: 'Friends',
  components: {
    Menu
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
