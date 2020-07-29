<template>
  <main class="return-back-user">
    <div class="bg">
      <img src="./img/bg.png" alt="">
    </div>
    <div class="back">
      <img src="./img/back-icon.png" alt="">
    </div>
    <div class="problem">
      <img src="./img/problem-icon.png" alt="">
    </div>
  </main>
</template>

<script>
/* eslint-disable no-undef */
import { } from './services/api'
import _get from 'lodash.get'
export default {
  name: 'returnBackUser',
  components: {
  },
  data () {
    return {
      info: {},
      isShowPop: false,
      isShowGame: false,
      popType: 'award',
      awardsInfo: {}
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.return-back-user {
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(#b52a2e 9.2rem, #b7292e);
  .bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    img {
      display: block;
      margin: auto;
      width: 7.2rem;
    }
  }
  .back {
    width: 0.66rem;
    height: 0.66rem;
  }
  .problem {
    width: 0.66rem;
    height: 0.66rem;
  }
}
</style>
