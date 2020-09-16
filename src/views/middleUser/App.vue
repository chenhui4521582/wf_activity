<template>
  <main class="middle-user">
    <div class="bg">
      <img src="./img/bg.png" alt="">
    </div>
    <div class="back" @click="back()"></div>
    <rule />
    <article class="main-content">
      <game-list ref="gameList" :info="info" @toggleGame="toggleGame" />
      <red-packet ref="redPacket" :info="info" />
      <task ref="task" :info="info" />
    </article>
  </main>
</template>

<script>
/* eslint-disable no-undef */
import rule from './components/rule/index'
import task from './components/task/index'
import redPacket from './components/redPacket/index'
import gameList from './components/gameList/index'
export default {
  name: 'middleUser',
  components: {
    rule,
    task,
    redPacket,
    gameList
  },
  data () {
    return {
      info: {},
      currentGame: 0
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
    },
    back () {
      location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL') || '')
    },
    toggleGame (type) {
      this.currentGame = type
    }
  }
}
</script>

<style lang="less" scoped>
.backImg(@url) {
  background: url(@url) no-repeat center center;
  background-size: 100% 100%;
}
.middle-user {
  position: relative;
  font-size: 0.24rem;
  overflow-x: hidden;
  overflow-y: scroll;
  height: 100vh;
  width: 100vw;
  background: #4a13b9;
  .bg {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100vw;
    min-height: 100vh;
    img {
      display: block;
      margin: auto;
    }
  }
  .back {
    position: absolute;
    left: -0.2rem;
    top: -0.2rem;
    width: 1.4rem;
    height: 1.4rem;
    .backImg('./img/back-icon.png');
  }
  .main-content {
    position: absolute;
    width: 100vw;
    top: 5rem;
    .time {
      color: #fff;
      font-weight: bold;
      text-align: center;
      font-style: italic;
    }
    .end-time {
      background: #849be9;
      width: 4.1rem;
      padding: 0 0.24rem;
      height: 0.48rem;
      margin: -0.04rem auto;
      text-align: center;
      line-height: 0.46rem;
      border-radius: 0.24rem;
      color: #1f2961;
    }
  }
}
</style>
