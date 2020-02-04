<template>
  <div class="count-down" v-if="showCountDown">
    <div class="item" v-for="(item, index) in countdownTime" :key="index">
      <div class="num" v-for="(innerItem, innerIndex) in item" :key="innerIndex">
        {{innerItem}}
      </div>
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
    countdownTime: []
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
  margin: 4.97rem auto;
  width: 4.5rem;
  display: flex;
  justify-content: flex-start;
  .item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .num {
      margin-right: .05rem;
      width: 0.44rem;
      height: 0.48rem;
      text-align: center;
      line-height: 0.48rem;
      color: #fff;
      font-size: 0.36rem;
      border-radius: 0.06rem;
      background: #F24D72;
    }
    .separate {
      padding: 0 0.05rem;
      height: 0.48rem;
      text-align: center;
      line-height: 0.56rem;
      font-size: 0.24rem;
      color: #F24D72;
    }
  }
}
</style>