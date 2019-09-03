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
    localStorage.setItem('ACCESS_TOKEN','30eb34c56ed64931b2db6b59a1e9efb8')
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
        background-color: #26202d;
    }
</style>
