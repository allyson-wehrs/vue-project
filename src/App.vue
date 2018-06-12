<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import "@/styles/settings.scss";

html {
  height: 100%;
}

body {
  margin: 0;
  height: 100%;
}

* {
  box-sizing : border-box;
}

#app {
  font-family: $body-font;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $blk;
  height: 100%;
  overflow: auto;
  @include font-size($p-font-sizes);
}
</style>
