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
  mounted(){
    localStorage.setItem('APP_CHANNEL','100039')
      localStorage.setItem('ACCESS_TOKEN','c9ec24e3b28449fbbc7d41302c223634')
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
    html,body {
        height: 100%;
        margin: 0;
        overflow: hidden;
        background-color: #2BAA77

    }
</style>
