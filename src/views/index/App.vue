<template>
  <div id="app">
    <div id="router-content">
        <!-- <router-view ></router-view> -->
    </div>
  </div>
</template>

<script>
import API from '../../api';
export default {
  name: 'app'
};
</script>

<style lang="less">
@import '../../common/base.css';

#app {
  width: 100%;
  margin: 0 auto;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 0.24rem;
}
#router-content {
    position: fixed;
    width: 100%;
    height: 100%;
    background-size: 100% 100%;
  /*padding-bottom: 1.35rem;*/
}
</style>
