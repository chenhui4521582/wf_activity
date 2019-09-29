<template>
  <section class="before">
    <div class="btn">
      倒计时:{{countTime}}
    </div>
  </section>
</template>

<script>
import { activityInfo } from '../utils/api'
export default {
  name: '',
  async beforeRouteEnter (to, from, next) {
    const { code, data } = await activityInfo()
    if (code === 200) {
      if (data.open) {
        next({ path: '/' })
      } else if (data.countdown) {
        next(vm => {
          vm.countDown(data.countdown)
        })
      } else {
        next({ path: '/after' })
      }
    } else {
      next()
    }
  },
  data () {
    return {
      countTime: 0
    }
  },
  methods: {
    countDown (item) {
      if (!item) return false
      let date = item / 1000
      this.timer = setInterval(() => {
        date = date - 1
        if (date <= 0) {
          date = 0
          clearInterval(this.timer)
          this.$router.replace('/')
        }
        let day = Math.floor(date / 86400)
        let hour = Math.floor(parseInt(date / 60 / 60) % 24)
        let minute = Math.floor(parseInt(date / 60) % 60)
        let second = Math.floor(date % 60)
        // let countDay = day >= 10 ? day : '0' + day
        let countHour = hour >= 10 ? hour : '0' + hour
        let countMinute = minute >= 10 ? minute : '0' + minute
        let countSecond = second >= 10 ? second : '0' + second
        if (day > 0) {
          this.countTime = `${day}天${countHour}:${countMinute}:${countSecond}`
        } else {
          this.countTime = `${countHour}:${countMinute}:${countSecond}`
        }
      }, 1000)
    }
  },
  mounted () {
    GLOBALS.marchSetsPoint('A_H5PT0075001452') // H5平台-砸金蛋-活动未开始-页面
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.before {
  background: #1b640b url("./images/before/bg.png") no-repeat center top /
    7.2rem 12.8rem;
  width: 100vw;
  height: 100vh;
  position: relative;
  .btn {
    background: url("./images/before/btn-bg.png") no-repeat center top / 100%
      100%;
    width: 5.04rem;
    height: 1.4rem;
    line-height: 1.3rem;
    text-align: center;
    position: fixed;
    bottom: 0.38rem;
    left: 50%;
    margin-left: -2.52rem;
    font-size: 0.48rem;
    font-weight: bold;
    color: #fcffcf;
  }
}
</style>
