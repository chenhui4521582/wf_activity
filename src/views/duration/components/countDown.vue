<template>
  <div class="count-down" v-if="showCountDown">
    <div class="item" v-for="(item, index) in countdownTime" :key="index">
        <div class="num">{{item.time}}</div>
        <div class="separate">
          <span v-if="item.id == 1">天</span>
          <span v-if="item.id == 2">时</span>
          <span v-if="item.id == 3">分</span>
          <span v-if="item.id == 4">秒</span>
        </div>
    </div>
    <div class="title">后结束</div>
  </div>
</template>
<script>
export default {
  name: 'countDown',
  props: ['time'],
  data: () => ({
    countdownTime: [          
      {id: 1,time: '0'},
      {id: 2,time: '00'},
      {id: 3,time: '00'}]
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
      if(day == '0') {
        this.countdownTime = [
          {id: 2,time: countHour},
          {id: 3,time: countMinute}
        ]
        return
      }
      this.countdownTime = [
        {id: 1,time: day},
        {id: 2,time: countHour},
        {id: 3,time: countMinute}
      ]
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
        if(day == '0') {
          this.countdownTime = [
            {id: 2,time: countHour},
            {id: 3,time: countMinute}
          ]
          return
        }
        this.countdownTime = [
          {id: 1,time: day},
          {id: 2,time: countHour},
          {id: 3,time: countMinute}
        ]

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
  margin: 2.6rem auto .1rem;
  width: 5.2rem;
  // height: .56rem;
  border-radius: .28rem;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: .35rem;
  color: #FFF6AA;
  font-weight: bold;
  .item {
    display: flex;
    justify-content: flex-start;
    .num {
      // width: .38rem;
      // height: .38rem;
      text-align: center;
      // line-height: .38rem;
      // color: #fff;
      font-size: .22rem;
      // border-radius: .06rem;
      // background: #B4244B;
    }
    .separate {
      // padding: 0 0.05rem;
      // height: 0.38rem;
      // text-align: center;
      // line-height: 0.4rem;
      font-size: 0.24rem;
      // font-weight: bold;
      // color: #fff;
    }
  }
}
</style>