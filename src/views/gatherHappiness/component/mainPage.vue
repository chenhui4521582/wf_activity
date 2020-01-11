<template>
  <article class="main-page-wrapper">
    <div class="activity-time">
      {{activityInfo.timeline}}
    </div>
    <div class="middle">
      <div class="here-wrapper" :class="{percent100:percent===100}">
        <img class="here" src="../img/iamhere.png" />
      </div>
      <img class="percent-bg" :src="require(`../img/percent${percent===100?'100':''}-bg.png`)"
        alt />
      <div class="control">
        <div class="progess" :style="{width:percent+'%'}">
          <img src="../img/light.png" />
        </div>
        <div class="text">
          <span
            v-if="activityInfo.state===1">福气值{{activityInfo.myBlessing}}/{{activityInfo.maxBlessing}}</span>
          <span v-else>活动已结束</span>
        </div>
      </div>

      <div class="tomorrow">
        <span v-if="activityInfo.rebateAmount>0">明日返利：{{activityInfo.rebateAmount}}金叶</span>
        <span
          v-else>今日消耗{{activityInfo.bettingAmount}}金叶，达到{{activityInfo.minBetting}}明日才有返利哦~</span>
      </div>
      <div class="today">
        <span>（明日返利=今日总消耗金叶*返利比）</span>
      </div>
    </div>
    <div class="lower-middle">
      <p class="look" @click="openPop(3)">
        福气记录
      </p>
      <div class="button">
        <div class="button-firstrow" @click="toMall()">
          <img v-if="activityInfo.state===1" src="../img/chongzhi.png" alt />
        </div>
        <div class="button-secondrow" :class="{'red-dot':activityInfo.unReceiveNum}"
          @click="openPop(4)">
          <img src="../img/fanli.png" alt />
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: '',
  components: {

  },
  props: {
    activityInfo: {
      type: Object,
      default: {}
    }
  },
  computed: {
    percent () {
      let percent = Math.floor(this.activityInfo.myBlessing / this.activityInfo.maxBlessing * 100)
      return percent >= 100 ? 100 : percent
    }
  },
  methods: {
    openPop (type) {
      this.$emit('openPop', type)
    },
    toMall () {
      if (this.activityInfo.state === 1) {
        location.href = '/xmWap/#/payment/'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.main-page-wrapper {
  background: url("../img/gather-happiness-bg.png");
  background-size: 100% 100%;
  width: 7.2rem;
  height: 11.37rem;
  position: relative;
  margin: auto;
  padding: 5.9rem 0 0;
  box-sizing: border-box;
  .activity-time {
    position: absolute;
    font-size: 0.2rem;
    white-space: nowrap;
    color: #fff8e1;
    top: 2.5rem;
    left: 0.76rem;
  }
  .middle {
    height: 1.7rem;
    position: relative;
    .here-wrapper {
      position: absolute;
      top: -0.6rem;
      left: 0;
      right: auto;
      &.percent100 {
        left: auto;
        right: 0;
      }
    }
    .here {
      width: 1.22rem;
      height: 0.94rem;
      position: relative;
      animation: move 2s linear infinite;
    }
    @keyframes move {
      0% {
        left: 0;
      }
      30% {
        left: 0.1rem;
      }
      80% {
        left: -0.1rem;
      }
      100% {
        left: 0;
      }
    }
    .percent-bg {
      width: 7.05rem;
      height: 1.7rem;
    }
    .control {
      position: absolute;
      top: 0.56rem;
      left: 1.7rem;
      /* position: relative; */
      width: 3.6rem;
      display: flex;
    }
    .progess {
      height: 0.32rem;
      background: -webkit-gradient(
        linear,
        left top,
        right top,
        from(#ffdb48),
        to(#fe1919)
      );
      background: linear-gradient(90deg, #ffdb48 0%, #fe1919 100%);
      border-radius: 0.16rem;
      display: flex;
      position: relative;
      justify-content: center;
      align-items: center;
      img {
        height: 1.34rem;
        position: absolute;
        right: -0.4rem;
      }
    }
    .text {
      font-size: 0.22rem;
      font-weight: bold;
      color: #8c0e0e;
      position: absolute;
      //  top: 0.56rem;
      /* left: 3.3rem; */
      right: 0.05rem;
    }

    .tomorrow {
      font-size: 0.2rem;
      font-weight: bold;
      color: #fff7d4;
      position: absolute;
      top: 0.93rem;
      left: 50%;
      height: 0.36rem;
      line-height: 0.36rem;
      text-align: center;
      transform: translateX(-50%);
    }
    .today {
      text-align: center;
      width: 100%;
      font-size: 0.2rem;
      font-weight: bold;
      color: #0c555e;
      position: absolute;
      bottom: 0.06rem;
      left: 50%;
      -webkit-transform: translateX(-50%);
      transform: translateX(-50%);
    }
  }
  .lower-middle {
    position: absolute;
    top: 7.66rem;
    width: 100%;
    .look {
      width: 95%;
      height: 0.25rem;
      display: flex;
      justify-content: flex-end;
      font-size: 0.22rem;
      font-weight: bold;
      text-decoration: underline;
      color: rgba(255, 246, 210, 1);
      position: relative;
      z-index: 1;
    }
    .button {
      font-size: 0;
      margin-top: -0.1rem;
      .button-firstrow {
        width: 100%;
        height: 1.09rem;
        display: flex;
        justify-content: center;
      }
      .button-secondrow {
        width: 100%;
        height: 1.09rem;
        justify-content: center;
        display: flex;
        margin-top: -0.1rem;
        position: relative;
        &.red-dot::after {
          content: "";
          position: absolute;
          top: 0.1rem;
          left: 4.7rem;
          width: 0.12rem;
          height: 0.12rem;
          border-radius: 50%;
          background: #fe1919;
        }
      }
      img {
        width: 3.29rem;
        height: 1.09rem;
      }
    }
  }
}
</style>
