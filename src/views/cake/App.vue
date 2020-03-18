<template>
  <main class="cake-wrapper">
    <article class="cake-container" v-if="isPeriod">
      <div class="back" @click="back"></div>
      <div class="add"></div>
      <div class="record"></div>
      <div class="sub-title"></div>
      <section class="cake-bg" :class="`state-000`">
        <div class=""></div>
      </section>
    </article>
    <article class="cake-rule">
      <h2>活动规则</h2>
      <section>
        <p>
          1. 活动时间：2020-03-20 10:00 -2020-03-23 22:00
        </p>
        <p>
          2. 瓜分条件（蛋糕顺序为从上至下）：<br>
          &nbsp;&nbsp;&nbsp;① 第1层蛋糕：每日任意付费可解锁参与瓜分。<br>
          &nbsp;&nbsp;&nbsp;② 第2层蛋糕：每日任意付费满10元可解锁参与<br>瓜分第1层和第2层蛋糕。<br>
          &nbsp;&nbsp;&nbsp;③ 第3层蛋糕：活动期间（截止3.23&nbsp;&nbsp;22:00）累计<br>付费满88元可解锁参与瓜分。<br>
        </p>
        <p>
          3. 瓜分时间：第1层和第2层蛋糕解锁后即可瓜分，<br>第3层蛋糕3.23&nbsp;&nbsp;22:00开启瓜分。<br>
          注意：第1层和第2层蛋糕为每日瓜分，瓜分截止时间为解锁次日10：00前，若用户未领取，则奖励自动失效，请及时参与瓜分。
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
  </main>
</template>

<script>
import utils from '@/common/js/utils'
import { activityInfo } from './services/api'
import _get from 'lodash.get'
export default {
  name: '',
  components: {

  },
  data () {
    return {
      isPeriod: true
    }
  },
  computed: {
    curChannel () {
      return localStorage.getItem('APP_CHANNEL') || utils.getUrlParam('channel')
    },
    sourceAddress () {
      return utils.getUrlParam('from')
    }
  },
  mounted () {

  },
  methods: {
    back () {
      history.go(-1)
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
      &.state-100 {
        .bg-center("./img/state-100.png");
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
