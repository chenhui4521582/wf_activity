<template>
  <div class="good-msg">
    <div class="goods">
      <div class="lottery-id">第44期</div>
      <div class="lottery-status">
        夺宝进行中<span class="ani_dot">...</span>
      </div>
      <div class="img">
        <img src="../img/item-icon.png" alt="">
      </div>
      <div class="rule iconfont icon-question"></div>
      <div class="award-status">
        <img src="../img/lottery-no.png" alt="">
        <img src="../img/lottery-yes.png" alt="">
      </div>
    </div>
    <div class="count-down">
      <span class="icon"></span>
      <span>夺宝剩余 {{countdownTime}}</span>
    </div>  
    <div class="goods-name">
      <div class="name">
        奖品：200元话费充值
      </div>
      <div class="purchased">
        已抢 <span>2630</span> 次
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'goodsMsg',
  props: {
    countDownNumber: {
      type: Number,
      default: 3000
    }
  },
  data: ()=> ({
    countdownTime: ''
  }),
  methods: {
    countDown (date) {
      if (!date) return false
      date = date / 1000
      this.timer = setInterval(() => {
        date = date - 1
        if (date <= 0) {
          date = 0
          clearInterval(this.timer)
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
  },
  mounted() {
    this.countDown(3000000)
  },
  watch: {
    countDownNumber(value) {
      if(value) {
        this.countDown(value)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.good-msg {
  background: #fff;
  border-radius: .16rem;
  .goods {
    padding-top: .47rem;
    position: relative;
    .lottery-id {
      position: absolute;
      top: .18rem;
      left: .18rem;
      width: .8rem;
      height: .3rem;
      line-height: .3rem;
      font-size: .2rem;
      color: #FFFFFF;
      background: #BBBBBB;
      border-radius: .06rem;
      text-align: center;
    }
    .lottery-status {
      position: absolute;
      top: .57rem;
      left: .18rem;
      color: #FF4141;
      font-size: .24rem;
    }
    .rule {
      position: absolute;
      top: .18rem;
      right: .15rem;
      color: #BBBBBB;
      font-size: .24rem;
    }
    .img {
      margin: 0 auto .36rem;
      width: 2.59rem;
      height: 1.93rem;
      img {
        vertical-align: top;
        width: 100%;
        height: 100%;
      }
    }
    .award-status {
      overflow: hidden;
      position: absolute;
      right: 0;
      top: 1.6rem;
      width: 1.76rem;
      height: 1.42rem;
      img {
        vertical-align: top;
        width: 100%;
        height: 100%;
      }
    }
  }
  .count-down {
    padding-left: .2rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: .6rem;
    color: #fff;
    font-size: .24rem;
    background: #FF7800;
    .icon {
      margin-right: .1rem;
      width: .3rem;
      height: .3rem;
      background: url(../img/countdown-icon.png) no-repeat center center / 100% 100%;
    }
  }
  .goods-name {
    padding: 0 .2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: .9rem;
    font-size: .24rem;
    .name {
      font-size: .32rem;
      color: #000000;
      font-weight:bold;
    }
    .purchased {
      font-size: .24rem;
      color: #888888;
      line-height: 1.2;
      span {
        color: #FF4141;
      }
    }
  }
}
.ani_dot {
  font-family: simsun;    
}
:root .ani_dot {
    display: inline-block;
    width: .5em;
    vertical-align: bottom;
    overflow: hidden;
}
@-webkit-keyframes dot {
    0% { width: 0; margin-right: 1.5em; }
    33% { width: .5em; margin-right: 1em; }
    66% { width: 1em; margin-right: .5em; }
    100% { width: 1.5em; margin-right: 0;}
}
.ani_dot {
    -webkit-animation: dot 3s infinite step-start;
}

@keyframes dot {
    0% { width: 0; margin-right: .9em; }
    33% { width: .3em; margin-right: .6em; }
    66% { width: .6em; margin-right: .3em; }
    100% { width: .7em; margin-right: 0;}
}
</style>