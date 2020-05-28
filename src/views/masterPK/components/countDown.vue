<template>
  <div class="count-down" v-if="showCountDown">
    <div class="title">距离活动结束剩余</div>
    <div class="item" v-for="(item, index) in countdownTime" :key="index">
      <div class="num">{{item}}</div>
      <div class="separate">
        <span v-if="index == 0">天</span>
        <span v-if="index == 1">时</span>
        <span v-if="index == 2">分</span>
        <span v-if="index == 3">秒</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'countDown',
  props: ['time'],
  data: () => ({
    countdownTime: ['0','00','00','00']
  }),
  computed: {
    showCountDown () {
      return this.countdownTime.length
    }
  },
  methods: {
    initTime (info) {
      if (!info) return false
      if (info <= 0) {
        info = 0
      }
      let date = info / 1000
      let day = Math.floor(parseInt(date / 60 / 60 / 24 )) + ''
      let hour = Math.floor(parseInt(date / 60 / 60 % 24))  + ''
      let minute = Math.floor(parseInt(date / 60 % 60))  + ''
      let second = Math.floor(date % 60 ) + ''
      let countHour = hour >= 10 ? hour : '0' + hour
      let countMinute = minute >= 10 ? minute : '0' + minute
      let countSecond = second >= 10 ? second : '0' + second
      this.countdownTime = [day, countHour, countMinute, countSecond]
    },
    countDown (info) {
      if (!info || info <= 0) return false
      let date = info / 1000
      this.timer = setInterval(() => {
        date = date - 1
        if (date <= 0) {
          date = 0
          clearInterval(this.timer)
          this.$emit('countDownCallback')
        }
        let day = Math.floor(parseInt(date / 60 / 60 / 24)) + ''
        let hour = Math.floor(parseInt(date / 60 / 60 % 24)) + ''
        let minute = Math.floor(parseInt(date / 60 % 60)) + ''
        let second = Math.floor(date % 60) + ''
        let countHour = hour >= 10 ? hour : '0' + hour
        let countMinute = minute >= 10 ? minute : '0' + minute
        let countSecond = second >= 10 ? second : '0' + second
        this.countdownTime = [day, countHour, countMinute, countSecond]
      }, 1000)
    }
  },
  mounted () {
    if (this.time > 0) {
      this.timer && clearInterval(this.timer)
      this.initTime(this.time)
      this.countDown(this.time)
    }
  },
  watch: {
    time (value) {
      this.timer && clearInterval(this.timer)
      this.initTime(this.timer)
      this.countDown(this.time)
    }
  }
}
</script>
<style scoped lang="less">
.count-down {
  margin: 0 auto .13rem;
  width: 6.57rem;
  height: .54rem;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: .56rem;
  color: #fff;
  background: url(../img/countdown-bg.png) no-repeat center top;
  background-size: 100% 100%;
  .title {
    font-weight: bold;
  }
  .item {
    display: flex;
    justify-content: flex-start;
    .num {
      width: .38rem;
      height: .38rem;
      text-align: center;
      line-height: .38rem;
      color: #3419FF;
      font-size: .22rem;
      border-radius: .06rem;
      background: #fff;
    }
    .separate {
      padding: 0 0.05rem;
      height: 0.38rem;
      text-align: center;
      line-height: 0.4rem;
      font-size: 0.24rem;
      font-weight: bold;
      color: #fff;
    }
  }
}
</style>