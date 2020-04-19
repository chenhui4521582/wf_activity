<template>
  <article class="activity-info">
    <p class="count-down">本期开奖倒计时：{{countdownTime}}</p>
    <section class="open-number-wrapper">
      <div class="normal" v-for="(item,index) in openNumberArr" :key="index">
        <img src="../img/lock-icon.png" alt="" v-if="!item&&item!==0">
        <span v-else>{{item}}</span>
      </div>
    </section>
    <p>与开奖号码一致越多，奖励越多</p>
  </article>
</template>

<script>
export default {
  name: '',
  components: {

  },
  data () {
    return {
      countdownTime: '',
      timer: null,
      openNumberArr: [null, null, null, null]
    }
  },
  mounted () {
    this.countDown(40000000)
  },
  methods: {
    countDown (data) {
      if (!data) return false
      let date = data / 1000
      this.timer = setInterval(() => {
        date = date - 1
        if (date <= 0) {
          date = 0
          clearInterval(this.timer)
          this.$emit('masterTaskStatus', false)
          this.showFlag = false
        }
        let day = Math.floor(date / 86400)
        let hour = Math.floor(parseInt(date / 60 / 60) % 24)
        let minute = Math.floor(parseInt(date / 60) % 60)
        let second = Math.floor(date % 60)
        let countDay = day >= 10 ? day : '0' + day
        let countHour = hour >= 10 ? hour : '0' + hour
        let countMinute = minute >= 10 ? minute : '0' + minute
        let countSecond = second >= 10 ? second : '0' + second
        if (day > 0) {
          this.countdownTime = `${countDay}天${countHour}:${countMinute}:${countSecond}`
        } else {
          this.countdownTime = `${countHour}:${countMinute}:${countSecond}`
        }
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.activity-info {
  text-align: center;
  color: #c04102;
  font-size: 0.18rem;
  font-weight: 400;
  margin-top: 0.64rem;
  .count-down {
    color: #dc5a00;
    font-size: 0.24rem;
    font-weight: bold;
  }
  .open-number-wrapper {
    display: flex;
    width: 3.6rem;
    justify-content: space-around;
    align-items: center;
    margin: 0.04rem auto 0.1rem;
    img {
      width: 0.24rem;
      height: 0.3rem;
    }
    div {
      min-width: 0.56rem;
      max-width: 0.56rem;
      height: 0.56rem;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #dc5a00;
      color: #f7dd9f;
      border-radius: 50%;
      font-size: 0;
      img {
        margin-bottom: 0.06rem;
      }
      span {
        font-size: 0.24rem;
      }
    }
  }
}
</style>
