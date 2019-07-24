<template>
  <section class="myAwards" :style="{zIndex:isShowPop?2:1}">
    <img src="../pages/images/myAwards/icon.png" alt="" @click="showPop">
    <div class="pop-mask" v-if="isShowPop" @touchmove.prevent></div>
    <transition name="scalc">
      <div class="pop" v-if="isShowPop">
        <div class="wrap">
          <div class="main">
            <ul class="awards-list">
              <li class="hfq"><span>{{hfqAmount|numberFilter}}</span></li>
              <li class="jdk"><span>{{jdkAmount|numberFilter}}</span></li>
              <li class="yg"><span>{{ygAmount|ygFilter}}</span></li>
            </ul>
            <p class="title">砸蛋记录</p>
            <div class="awards-history-title">
              <p>砸蛋时间</p>
              <p>砸蛋奖励</p>
            </div>
            <ul class="awards-history">
              <li v-for="(item , index) in awardsList" :key="index">
                <p>{{item.receiverTime | dateFilter}}</p>
                <p>{{item.awardsName}}</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="close-icon" @click="isShowPop = false"></div>
      </div>
    </transition>
  </section>
</template>

<script>
import { myAwards } from '../utils/api'
export default {
  name: 'myAwards',
  data () {
    return {
      isShowPop: false,
      hfqAmount: 0,
      jdkAmount: 0,
      ygAmount: 0,
      awardsList: []
    }
  },
  methods: {
    async init () {
      const { code, data } = await myAwards()
      if (code === 200) {
        this.hfqAmount = data.hfqAmount
        this.jdkAmount = data.jdkAmount
        this.ygAmount = data.ygAmount
        this.awardsList = data.awardsList
      }
    },
    showPop () {
      GLOBALS.marchSetsPoint('A_H5PT0075001461')   // H5平台-砸金蛋-点击已砸奖励
      this.isShowPop = true;
      this.init()
    }
  },
  filters: {
    dateFilter (date) {
      let dateArr = date.split(' ')[0].split('-')
      let timeArr = date.split(' ')[1].split(':')
      return `${dateArr[1]}-${dateArr[2]} ${timeArr[0]}:${timeArr[1]}`
    },
    numberFilter (number) {
      if (number > 10000) {
        return Math.floor(number / 100) / 100 + 'w'
      }
      return number
    },
    ygFilter (number) {
      if (number > 1000) {
        return Math.floor(number / 10) / 100 + 'kg'
      }
      return number + 'g'
    },
  },
  mounted () {
  },
  destroyed () {

  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.myAwards {
  position: fixed;
  top: 1.36rem;
  left: 50%;
  margin-left: -2.46rem;
  img {
    width: 1.1rem;
    height: 0.94rem;
    position: fixed;
    left: 0.14rem;
    bottom: 1.64rem;
  }

  .pop-mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.55);
  }
  .pop {
    position: relative;
    z-index: 10;
    .wrap {
      width: 4.92rem;
      height: 7.8rem;
      background: url("../pages/images/myAwards/bg.png") no-repeat center center /
        100% 100%;
      margin: 0 auto;
      box-sizing: border-box;
      padding: 2.36rem 0.26rem 0;
      .main {
        font-size: 0.24rem;
        line-height: 0.3rem;
        letter-spacing: 0.02rem;
        font-weight: bold;
        color: #fff;
        .awards-list {
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 0.18rem;
          color: #c85501;
          li {
            flex: 1;
            display: block;
            width: 1.4rem;
            height: 1.4rem;
            position: relative;
            &.hfq {
              background: url("../pages/images/common/hfq-with-bg.png")
                no-repeat center center / 100% 100%;
            }
            &.jdk {
              background: url("../pages/images/common/jdk-with-bg.png")
                no-repeat center center / 100% 100%;
              margin: 0 0.08rem;
            }
            &.yg {
              background: url("../pages/images/common/yg-with-bg.png") no-repeat
                center center / 100% 100%;
            }
            span {
              position: absolute;
              bottom: 0;
              display: block;
              text-align: center;
              width: 100%;
              height: 0.3rem;
              line-height: 0.3rem;
            }
          }
        }
        .title {
          margin-top: 0.26rem;
          font-size: 0.3rem;
          font-weight: bold;
        }
        .awards-history-title {
          display: flex;
          padding: 0.1rem 0;
          background: #ffcb7c;
          margin-top: 0.16rem;
          height: 0.26rem;
          align-items: center;
          align-content: center;
          border: 0.02rem #ffcb7c solid;
          p {
            flex: 1;
            text-align: center;
            color: #c87600;
            font-size: 0.24rem;
            font-weight: 400;
          }
          p:not(:last-child) {
            border-right: 0.02rem #e8951d solid;
          }
        }
        .awards-history {
          background: #e8951d;
          color: #fff;
          font-size: 0.2rem;
          font-weight: 400;
          height: 2.54rem;
          overflow-y: scroll;
          -webkit-overflow-scrolling: touch;
          -webkit-user-select: none;
          li {
            display: flex;
            height: 0.5rem;
            align-items: center;
            p {
              flex: 1;
              text-align: center;
            }
          }
        }
      }
    }
    .close-icon {
      width: 0.6rem;
      height: 0.6rem;
      background: url("../pages/images/common/close.png") no-repeat center
        center / 100% 100%;
      margin: 0.4rem auto 0;
    }
  }
  .scalc-enter-active {
    animation: fadeAnimation 0.3s ease-in-out;
  }
  @keyframes fadeAnimation {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
}
</style>
