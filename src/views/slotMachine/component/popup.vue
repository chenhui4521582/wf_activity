<template>
  <div class="popup" v-if="value">
    <div class="mask"></div>
    <div class="container">
      <div class="no-time" v-if="status == 1">
        <div class="btn" @click="goPay"></div>
      </div>

      <div class="awards" v-if="status == 2 && AwardsList.length">
        <ul>
          <template v-for="(item, index) in AwardsList">
            <li :key="index">
              <div :class="`number${item.number}`" v-if="item.state == 1"></div>
              <div class="why" v-else></div>
              <p>{{index | unit}}</p>
            </li>
          </template>
        </ul>
        <div class="tips">解锁位数越大，奖励越大哦！</div>
        <div class="my-award">{{AwardsNumber}}</div>
      </div>
      <div class="close" @click="hide"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'popup',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    status: {
      default: 1
    },
    AwardsList: {
      type: Array,
      default: () =>([])
    },
    AwardsNumber: {
      default: ""
    }
  },
  filters: {
    unit(value) {
      switch(value) {
        case 0 :
          return '个位'
          break;
        case 1 :
          return '十位'
          break;
        case 2 :
          return '百位'
          break;
        case 3 :
          return '千位'
          break;
        case 4 :
          return '万位'
          break;
        case 5 :
          return '十万位'
          break;
        case 6 :
          return '百万位'
          break;  
      }
    }
  },
  methods: {
    hide() {
      this.$emit('input', false)
    },
    /** 去支付 **/
    goPay() {
      let APP_CHANNEL = localStorage.getItem('APP_CHANNEL')
      if(['100039001','100069','100070','100073','100075','100080'].includes(APP_CHANNEL)) {
        window.location.href = `https://wap.beeplaying.com/xmWap/#/payment/?channel=${APP_CHANNEL}`
      }else {
        window.location.href = `https://wap.beeplaying.com/payment/#/mall?channel=${APP_CHANNEL}`
      }
    },
  }
}
</script>
<style lang="less" scoped>
.popup {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
  .mask {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
    background: rgba(0,0,0,.7)
  }
  .container {
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 2;
    transform: translate(-50%, -50%);
    .no-time {
      overflow: hidden;
      width: 6.22rem;
      height: 6.85rem;
      background: url(../images/no-time-pop.png) no-repeat center center / 100% 100%;
      .btn {
        margin: 5.07rem auto 0;  
        width: 4.12rem;
        height: 1.08rem;
        background: url(../images/no-time-btn.png) no-repeat center center / 100% 100%;
      }
    }
    .awards {
      overflow: hidden;
      width: 6.22rem;
      height: 6.85rem;
      background: url(../images/pop-bg.png) no-repeat center center / 100% 100%;
      p {
        line-height: .4rem;
        text-align: center;
        color: #640F0B;
        font-size: .24rem;
      }
      ul {
        overflow: hidden;
        margin: 1.87rem .4rem 0 .79rem;
        li {
          margin: 0 .2rem .2rem 0;
          float: left;
          .why {
            width: 1.04rem;
            height: 1.04rem;
            border-radius: .2rem;
            background: url(../images/number-random.png) no-repeat center center / .46rem .65rem;
          }
          .number1 {
            width: 1.04rem;
            height: 1.04rem;
            border-radius: .2rem;
            background: url(../images/1.png) no-repeat center center / .32rem .82rem rgba(217,98,30,1);
          }
          .number2 {
            width: 1.04rem;
            height: 1.04rem;
            border-radius: .2rem;
            background: url(../images/2.png) no-repeat center center / .64rem .82rem rgba(217,98,30,1);
          }
          .number3 {
            width: 1.04rem;
            height: 1.04rem;
            border-radius: .2rem;
            background: url(../images/3.png) no-repeat center center / .64rem .82rem rgba(217,98,30,1);
          }
          .number4 {
            width: 1.04rem;
            height: 1.04rem;
            border-radius: .2rem;
            background: url(../images/4.png) no-repeat center center / .66rem .82rem rgba(217,98,30,1);
          }
          .number5 {
            width: 1.04rem;
            height: 1.04rem;
            border-radius: .2rem;
            background: url(../images/5.png) no-repeat center center / .65rem .82rem rgba(217,98,30,1);
          }
          .number6 {
            width: 1.04rem;
            height: 1.04rem;
            border-radius: .2rem;
            background: url(../images/6.png) no-repeat center center / .64rem .82rem rgba(217,98,30,1);
          }
          .number7 {
            width: 1.04rem;
            height: 1.04rem;
            border-radius: .2rem;
            background: url(../images/7.png) no-repeat center center / .64rem .82rem rgba(217,98,30,1);
          }
          .number8 {
            width: 1.04rem;
            height: 1.04rem;
            border-radius: .2rem;
            background: url(../images/8.png) no-repeat center center / .64rem .82rem rgba(217,98,30,1);
          }
          .number9 {
            width: 1.04rem;
            height: 1.04rem;
            border-radius: .2rem;
            background: url(../images/9.png) no-repeat center center / .64rem .82rem rgba(217,98,30,1);
          }
        }
      }
      .tips {
        text-align: center;
        font-size: .24rem;
        color: #CC1818;
      }
      .my-award {
        margin-top: .74rem;
        padding-left: 4rem;
        font-size: .3rem;
        color: #FFCE58;
        text-align: left;
      }
    }
  }
  .close {
    position: absolute;
    bottom: -1rem;
    left: 50%;
    transform: translate(-50%, 0);
    width: .6rem;
    height: .6rem;
    background: url(../images/close-btn.png) no-repeat center center / 100% 100%;
  }
}
</style>