<template>
  <div class="log">
    <Header title="夺宝明细"/>
    <div class="nav">
      <div class="item" :class="{'current': currentIndex == 1}" @click="handleClick(1)">
        夺宝记录
        <div class="line" v-if="currentIndex == 1"></div>
      </div>
      <div class="item" :class="{'current': currentIndex == 2}" @click="handleClick(2)">
        往期幸运儿
        <div class="line" v-if="currentIndex == 2"></div>
      </div>
    </div>
    <div class="container">
      <my-log v-if="currentIndex == 1"/>
      <history-log v-if="currentIndex == 2"/>
    </div>
  </div>
</template>
<script>
import MyLog from './components/myLog'
import HistoryLog from './components/historyLog'
export default {
  name: 'log',
  data: ()=> ({
    currentIndex: 1
  }),
  components: {
    MyLog,
    HistoryLog
  },
  methods: {
    handleClick(index) {
      console.log(index)
      this.currentIndex = index
    },
    init() {
      let from = this.$route.query.from
      if(from == 'historylog') {
        this.currentIndex = 2
      }else {
        this.currentIndex = 1
      }
    }
  },
  mounted() {
    this.init()
  }
}
</script>
<style lang="less" scoped>
.log{
  padding-top: .9rem;
  min-height: 100vh;
  background: #F7F7F7;
  box-sizing: border-box;
  .nav {
    height: .96rem;
    display: flex;
    justify-content: center;
    .item {
      position: relative;
      margin-right: .43rem;
      height: .96rem;
      line-height: .96rem;
      color: #888;
      font-size: .32rem;
      .line {
        position: absolute;
        left: 50%;
        top: .78rem;
        width: .32rem;
        height: .06rem;
        border-radius: .06rem;
        background: #FF4141;
        transform: translate(-50%, 0);
        &.active {
          font-weight: bold;
          color: #000;
        }
      }
    }
  }
}
</style>