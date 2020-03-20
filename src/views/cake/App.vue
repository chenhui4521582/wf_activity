<template>
  <main class="cake-wrapper">
    <template v-if="!isShowRank">
      <article class="cake-container" v-if="isPeriod">
        <div class="back" @click="back"></div>
        <div class="add" @click="showPopup(0)"></div>
        <div class="record" @click="showRank"></div>
        <div class="sub-title"></div>
        <section class="cake-bg" :class="`state-${cakeState}`">
          <div class="cake-item" :class="[`level-${item.level}`,`status-${item.status}`]"
            v-for="(item,index) in configList">
            <div class="lock"></div>
            <div class="line"></div>
            <div class="desc">
              <p>瓜分<span>{{item.amount}}</span>话费券</p>
              <p>{{item.recharge|rechargeFilter}}</p>
            </div>
          </div>
        </section>
      </article>
      <article class="cake-rule">
        <h2>活动规则</h2>
        <section>
          <p>
            1. 活动时间：{{activityInfo.timeline}}
          </p>
          <p>
            2. 瓜分条件（蛋糕顺序为从上至下）：<br>
            &nbsp;&nbsp;&nbsp;① 第1层蛋糕：每日任意付费可解锁参与瓜分。<br>
            &nbsp;&nbsp;&nbsp;② 第2层蛋糕：每日任意付费满10元可解锁参与<br>瓜分第1层和第2层蛋糕。<br>
            &nbsp;&nbsp;&nbsp;③ 第3层蛋糕：活动期间（截止{{activityInfo.endDate}}）累计<br>付费满88元可解锁参与瓜分。<br>
          </p>
          <p>
            3. 瓜分时间：第1层和第2层蛋糕解锁后即可瓜分，<br>第3层蛋糕3.23&nbsp;&nbsp;22:00开启瓜分。<br>
            注意：第1层和第2层蛋糕为每日瓜分，瓜分截止时间为解锁次日10:00前，若用户未领取，则奖励自动失效，请及时参与瓜分。
          </p>
          <p>
            4. 瓜分规则：有资格参与瓜分的用户随机获得奖励，奖励随付费金额增加而变大。
          </p>
          <p>
            5.奖品发放：奖励可能为话费券/优惠券/未中奖。瓜分所得奖励将发放至我的资产。
          </p>
          <p>
            6. 活动结束后，奖励领取截止时间: 3.24&nbsp;&nbsp;22:00。活动期间所得奖励，若用户在活动结束后仍未领取，则自动失效。
          </p>
          <p class="bottom">
            活动最终解释权归平台所有
          </p>
        </section>
      </article>
      <article class="cake-btn">
        <section class="period" v-if="isPeriod">
          <div class="arrow"></div>
          <div class="middle">
            <p>继续解锁</p>
            <p class="sub">今日已有2000人参与瓜分</p>
          </div>
          <div class="arrow right"></div>
        </section>
        <section class="normal" v-else>
          <span>活动已结束</span>
        </section>
      </article>
    </template>
    <rank v-if="isShowRank" @on-back="closeRank"></rank>
    <pop-up v-if="isShowPopUp" :type="popType" @on-close="closePopup"></pop-up>
  </main>
</template>

<script>
import utils from '@/common/js/utils'
import { ActivityInfo } from './services/api'
import _get from 'lodash.get'
import Rank from './component/rank'
import PopUp from './component/popup'
export default {
  name: '',
  components: {
    Rank,
    PopUp
  },
  data () {
    return {
      isPeriod: true,
      activityInfo: {},
      configList: [],
      isShowRank: false,
      isShowPopUp: false,
      popType: 0
    }
  },
  computed: {
    curChannel () {
      return localStorage.getItem('APP_CHANNEL') || utils.getUrlParam('channel')
    },
    sourceAddress () {
      return utils.getUrlParam('from')
    },
    cakeState () {
      if (this.configList.length === 3) {
        return this.configList.map(ele => ele.status).join('')
      } else {
        return '000'
      }
    }
  },
  filters: {
    rechargeFilter (recharge) {
      switch (recharge) {
        case 10:
          return '付费满10元解锁'
        case 88:
          return '活动期间累计付费满88元解锁'
        default:
          return '任意付费解锁'
      }
    }
  },
  mounted () {
    this.getActivityInfo()
  },
  methods: {
    back () {
      history.go(-1)
    },
    async getActivityInfo () {
      const res = await ActivityInfo()
      this.activityInfo = _get(res, 'data', {})
      this.configList = _get(res, 'data.configList', [])
      let applyPopup = _get(res, 'data.applyPopup', false)
      let forgetPopup = _get(res, 'data.forgetPopup', false)
      if (applyPopup) {
        this.popType = 1
        this.isShowPopUp = true
      } else if (!forgetPopup) {
        this.popType = 2
        this.isShowPopUp = true
      }
    },
    showRank () {
      this.isShowRank = true
    },
    closeRank () {
      this.isShowRank = false
    },
    showPopup (type) {
      this.popType = type
      this.isShowPopUp = true
    },
    closePopup () {
      this.isShowPopUp = false
    }
  }
}
</script>

<style lang="less" scoped>
.bg-center (@url) {
  background: url(@url) no-repeat center top;
  background-size: 100% 100%;
}
.cake-wrapper {
  min-height: 100vh;
  width: 100%;
  background: #320e12 no-repeat center top;
  background-size: 100% auto;
  font-family: aAlibaba PuHuiTil;
  font-size: 0.2rem;
  .cake-container {
    width: 100%;
    min-height: 580px;
    background: #320e12 url(./img/bg.png) no-repeat center -0.02rem;
    background-size: 100% auto;
    position: relative;
    padding: 0.1rem 0 0;
    box-sizing: border-box;
    .back {
      width: 0.62rem;
      height: 0.56rem;
      .bg-center("./img/back.png");
      position: absolute;
      left: 0;
      top: 0.52rem;
    }
    .add {
      width: 0.92rem;
      height: 0.8rem;
      .bg-center("./img/add-icon.png");
      position: absolute;
      right: 0.1rem;
      top: 1.54rem;
    }
    .record {
      width: 0.92rem;
      height: 0.8rem;
      .bg-center("./img/record-icon.png");
      position: absolute;
      right: 0.1rem;
      top: 2.46rem;
    }
    .sub-title {
      width: 1.56rem;
      height: 0.8rem;
      .bg-center("./img/subtitle.png");
      position: absolute;
      top: 1.7rem;
      left: 2.84rem;
    }
    .cake-bg {
      width: 4.98rem;
      height: 6.56rem;
      position: relative;
      margin: 1.9rem 1.06rem 0 1.16rem;
      &.state-000 {
        .bg-center("./img/state-000.png");
      }
      &.state-001 {
        .bg-center("./img/state-001.png");
      }
      &.state-002 {
        .bg-center("./img/state-002.png");
      }
      &.state-100 {
        .bg-center("./img/state-100.png");
      }
      &.state-101 {
        .bg-center("./img/state-101.png");
      }
      &.state-110 {
        .bg-center("./img/state-110.png");
      }
      &.state-111 {
        .bg-center("./img/state-111.png");
      }
      &.state-200 {
        .bg-center("./img/state-200.png");
      }
      &.state-202 {
        .bg-center("./img/state-202.png");
      }
      &.state-210 {
        .bg-center("./img/state-210.png");
      }
      &.state-220 {
        .bg-center("./img/state-220.png");
      }
      &.state-221 {
        .bg-center("./img/state-221.png");
      }
      &.state-222 {
        .bg-center("./img/state-222.png");
      }
      .cake-item {
        width: 100%;
        position: relative;
        .lock {
          width: 0.12rem;
          height: 0.12rem;
          background: #fff;
          border-radius: 50%;
          position: absolute;
        }
        .desc {
          color: #ffdb6e;
          font-size: 0.2rem;
          width: 1.9rem;
          border-radius: 0.2rem;
          background-color: rgba(0, 0, 0, 0.4);
          padding: 0.1rem;
          position: absolute;
          bottom: 0.6rem;
          line-height: 0.24rem;
          span {
            color: #d33124;
            font-size: 0.28rem;
          }
        }
        .line {
          background: #fff;
          height: 0.01rem;
          position: absolute;
        }
        &.level-1 {
          height: 2.6rem;
          .lock {
            bottom: 0.6rem;
            left: 1.5rem;
          }
          .desc {
            left: -1rem;
          }
          .line {
            width: 0.5rem;
            left: 1.08rem;
            bottom: 0.74rem;
            transform-origin: center center;
            transform: rotateZ(15deg);
          }
        }
        &.level-2 {
          height: 1.8rem;
          .lock {
            bottom: 0.64rem;
            right: 0.7rem;
          }
          .desc {
            right: -1rem;
            bottom: 0.84rem;
          }
          .line {
            width: 0.5rem;
            right: 0.22rem;
            bottom: 0.76rem;
            transform-origin: center center;
            transform: rotateZ(-15deg);
          }
        }
        &.level-3 {
          height: 2.16rem;
          .lock {
            bottom: 0.7rem;
            left: 1.5rem;
          }
          .desc {
            left: -1rem;
          }
          .line {
            width: 0.5rem;
            left: 1.08rem;
            bottom: 0.82rem;
            transform-origin: center center;
            transform: rotateZ(15deg);
          }
        }

        &.status-0 {
          .lock {
            width: 0.54rem;
            height: 0.54rem;
            .bg-center("./img/lock-icon.png");
            position: absolute;
            bottom: 0.4rem;
            left: 50%;
            margin-left: -0.27rem;
          }
          &.level-1 {
            .line {
              width: 1.2rem;
              bottom: 0.8rem;
              transform-origin: center center;
              transform: rotateZ(10deg);
            }
          }
          &.level-2 {
            .lock {
              bottom: 0.5rem;
              right: 1.5rem;
            }
            .line {
              width: 1.2rem;
              right: 1.08rem;
              bottom: 0.94rem;
              transform-origin: center center;
              transform: rotateZ(-10deg);
            }
          }
          &.level-3 {
            .lock {
              bottom: 0.6rem;
            }
            .line {
              width: 1.2rem;
              bottom: 1rem;
              transform-origin: center center;
              transform: rotateZ(10deg);
            }
          }
        }
      }
    }
  }
  .cake-rule {
    color: #ac7f61;
    font-size: 0.24rem;
    padding: 0.24rem 0.42rem 0.32rem;
    h2 {
      font-size: 0.3rem;
      text-align: center;
    }
    p {
      margin: 0.3rem auto;
    }
    .bottom {
      color: #604634;
      font-size: 0.2rem;
      text-align: center;
      margin: 0.6rem auto 1.2rem;
    }
  }
  .cake-btn {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    section {
      width: 100%;
      height: 0.94rem;
      background: no-repeat center top;
      background-size: 100% 100%;
      font-weight: 800;
      font-size: 0.32rem;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-top: 0.1rem;
      box-sizing: border-box;
    }
    .normal {
      background-image: url(./img/bottom-normal-btn-bg.png);
      color: #fff;
    }
    .period {
      background-image: url(./img/bottom-period-btn-bg.png);
      color: #cf3600;
      .middle {
        text-align: center;
        width: 3rem;
        line-height: 0.34rem;
        margin: auto 0.14rem;
        .sub {
          font-size: 0.2rem;
          color: #cf7500;
        }
      }
      .arrow {
        width: 0.84rem;
        height: 0.22rem;
        .bg-center("./img/arrow.png");
        &.right {
          transform: rotateY(180deg);
        }
      }
    }
  }
}
</style>
