<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  /* eslint-disable */
  import '../../common/js/window.js';

  export default {
    name: 'App',
    mounted() {
      localStorage.setItem('ACCESS_TOKEN','d255405936874702a35118b2a93453b6')
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100%;
  }

  html, body {
    height: 100%;
    margin: 0;
    overflow: hidden;
    background-color: transparent;
  }
</style>
