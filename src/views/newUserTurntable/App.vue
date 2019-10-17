<template>
  <div id="app" class="turn-wrap">
    <div class="top">
      <span>限时福利 </span>剩余<em>{{countTime.day}}</em>天<em>{{countTime.hour}}</em>小时<em>{{countTime.minute}}</em>分
    </div>
    <div class="main">
      <div class="list-wrapper">
        <ul class="awards-list"></ul>
        <div class="pointer"></div>
      </div>
    </div>
    <div class="horn">

    </div>
  </div>
</template>
<script>
export default {
  name: 'app',
  data () {
    return {
      info: {},
      countTime: {}
    }
  },
  components: {
    'rule': () => import('./components/rule.vue'),
    'turnpop': () => import('./components/turnpop')
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      const res = await this.axios.post('//ops-api.beeplaying.com/ops/api/wheel/newUser/info')
      // const { data } = res.data
      const data = {
        wheelTimes: 1000000000
      }
      if (data) {
        this.info = data
        this.countDown(data.wheelTimes)
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
        let _day = Math.floor(date / 86400)
        let _hour = Math.floor(parseInt(date / 60 / 60) % 24)
        let _minute = Math.floor(parseInt(date / 60) % 60)
        let day = _day
        let hour = _hour >= 10 ? _hour : '0' + _hour
        let minute = _minute >= 10 ? _minute : '0' + _minute
        if (day > 0) {
          this.countTime = {
            day,
            hour,
            minute
          }
        }
      }, 1000)
    },
  }
}
</script>
<style lang="less">
@import "../../common/css/base.css";
.bgWithFull(@url) {
  background: url(@url) no-repeat center center / 100% 100%;
}
.turn-wrap {
  min-height: 100vh;
  background: url("./img/bg.png") no-repeat center ~"-0.6rem" / 100%;
  overflow-x: hidden;
  overflow-y: auto;
  .top {
    height: 0.6rem;
    line-height: 0.36rem;
    color: #fff;
    display: flex;
    font-size: 0.28rem;
    align-self: center;
    align-content: center;
    justify-content: center;
    justify-content: center;
    font-weight: 500;
    padding: 0.12rem 0;
    box-sizing: border-box;
    .bgWithFull("./img/top-bg.png");
    span {
      font-size: 0.32rem;
      font-weight: 800;
    }
    em {
      font-size: 0.32rem;
      background: #fff;
      color: #000;
      font-weight: 800;
      padding: 0 0.08rem;
      border-radius: 0.04rem;
    }
  }
  .main {
    position: relative;
    margin-top: 3.06rem;
    left: 50%;
    margin-left: -2.6rem;
    width: 5.2rem;
    height: 5.2rem;
    .bgWithFull("./img/light1.png");
    animation: changeBg 0.3s infinite ease;
    .list-wrapper {
      padding: 0.2rem;
      box-sizing: border-box;
      height: 100%;
      .awards-list {
        height: 100%;
        .bgWithFull("./img/awards.png");
      }
      .pointer {
        height: 2rem;
        width: 1.84rem;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -1.1rem;
        margin-left: -0.92rem;
        .bgWithFull("./img/pointer.png");
      }
    }
  }

  @keyframes changeBg {
    0% {
      .bgWithFull("./img/light1.png");
    }

    100% {
      .bgWithFull("./img/light2.png");
    }
  }
}
</style>
