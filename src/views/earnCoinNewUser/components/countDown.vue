<template>
  <div class="count-down" v-if="showCountDown">
    倒计时{{countdownTime}}
  </div>
</template>
<script>
export default {
  name: 'countDown',
  props: ['time'],
  data: () => ({
    countdownTime: '00:00:00'
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
      this.countdownTime = `${countHour}:${countMinute}:${countSecond}`
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
        this.countdownTime = `${countHour}:${countMinute}:${countSecond}`
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
  margin-left: auto;
  line-height: 1.1;
  border-radius: .28rem;
  color: #FF4A21;
  font-weight: 500;
  font-size: .26rem;
}
</style>