<template>
  <section class="overtime-wrapper" v-if="gameType===achievementTaskInfo.gameType" @click="goOvertimeDetail">
    <div class="overtime">
      <span>
        {{countdownTime}}
      </span>
      <span>
        限时完成任务加奖{{achievementTaskInfo.awardsName}}
      </span>
    </div>
  </section>
</template>

<script>
export default {
  name: 'overtimeMasterTask',
  components: {

  },
  data () {
    return {
      achievementTaskInfo: {},
      countdownTime: '',
      timer: null
    }
  },
  props: {
    gameType: {
      type: [Number, String],
      default: null
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      const res = await this.axios.post('//ops-api.beeplaying.com/ops/api/achievement-task/info')
      const { data, code } = res.data
      if (code === 200) {
        this.achievementTaskInfo = data
        this.countDown(data.countdown)
      }
    },

    // 特惠倒计时
    countDown (info) {
      if (!info) return false
      let date = info / 1000
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
    },
    goOvertimeDetail () {
      WapCall.openGame('/activities/overtimeTask.html')
    }
  }
}
</script>

<style lang="less" scoped>
.overtime-wrapper {
  .overtime {
    height: 0.46rem;
    background: url("../img/crushMasterTask/overtime-bg.png") no-repeat center /
      100% 100%;
    line-height: 0.56rem;
    padding: 0 0.38rem 0 0.52rem;
    display: flex;
    justify-content: space-between;
    position: relative;
    color: #fedfac;
    font-size: 0.18rem;
    margin-bottom: 0.02rem;
    &::after {
      content: "";
      display: block;
      position: absolute;
      right: 0.14rem;
      top: 0;
      width: 0.18rem;
      height: 0.56rem;
      background: url("../img/crushMasterTask/arrow.png") no-repeat center /
        100%;
    }
  }
}
</style>
