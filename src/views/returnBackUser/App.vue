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
    <cash-out />
    <template v-if="info.state===1">
      <sign-in />
      <task-list />
    </template>
    <template v-else>
      <div class="end">
        <img src="./img/end.png" alt="">
      </div>
    </template>
  </main>
</template>

<script>
/* eslint-disable no-undef */
import cashOut from './components/cashOut/index'
import signIn from './components/signIn/index'
import taskList from './components/taskList/index'
import { } from './services/api'
import _get from 'lodash.get'
export default {
  name: 'returnBackUser',
  components: {
    cashOut,
    signIn,
    taskList
  },
  data () {
    return {
      info: {
        state: 2
      },
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
  padding-top: 0.01rem;
  box-sizing: border-box;
  font-size: 0.2rem;
  font-family: Alibaba PuHuiTi;
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
    font-size: 0;
    margin-top: 0.25rem;
    margin-left: 0.16rem;
  }
  .problem {
    width: 0.66rem;
    height: 0.66rem;
    font-size: 0;
    margin-top: 0.15rem;
    margin-left: 0.16rem;
  }
  .end {
    width: 2.48rem;
    margin: 1.32rem auto 0;
  }
}
</style>
