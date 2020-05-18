<template>
  <div class="rule" v-if="value">
    <div class="mask"></div>
    <div class="center" :class="{'one-awrad': list.length == 1}">
      <div class="title">
        <img src="../img/title1.png" alt="">
      </div>
      <div class="wrap">
        <div class="item" v-for="(item, index) in list" :key="index">
          <div class="award-img">
            <img v-if="item.typeDesc == 'hfq'" class="inner-img" src="../img/award-hfq.png" alt="">
            <img v-if="item.typeDesc == 'jdk'" class="inner-img" src="../img/award-jdk.png" alt="">
          </div>
          <div class="award-name">{{item.awardsName}}</div>
        </div>
        <div class="explain">
          奖品已发放到账户
        </div>
      </div>
      <div class="closed" @click="hide"></div>
    </div>
  </div>
  
</template>
<script>
export default {
  name: 'rule',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: () => ([])
    }
  },
  methods: {
    hide() {
      this.$emit('input', false)
    }
  }
}
</script>
<style scoped lang="less">
*{
  box-sizing: border-box;
}
.inner-img {
  vertical-align: top;
  width: 100%;
  height: 100%;
}
.rule{
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
  .center {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 6.55rem;
    height: 9.59rem;
    z-index: 2;
    transform: translate(-50%, -50%);
    background: url(../img/popup.png) no-repeat center top;
    background-size: 100% 100%;
    &.one-awrad {
      height: 8.59rem;
      background: url(../img/popup1.png) no-repeat center top;
      background-size: 100% 100%;
    }
    .title {
      margin: 3.6rem 2.1rem .3rem;
      width: 1.95rem;
      height: .37rem;
      img {
        vertical-align: top;
        width: 100%;
        height: 100%;
      }
    }
    .wrap {
      margin:.3rem 0 0 1.35rem;
      width: 3.55rem;
      overflow-y: scroll;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
      color: #fff;
      font-size: .24rem;
      font-weight: bold;
      line-height: .45rem;
      .item {
        overflow: hidden;
        margin: 0 auto .2rem;
        width: 1.93rem;
        height: 1.62rem;
        background: #fee2cd;
        border-radius: .1rem;
        .award-img {
          margin: .1rem auto 0;
          width: 1.83rem;
          height: 1.06rem;
        }
        .award-name {
          text-align: center;
          font-size: .22rem;
          color: #FA4D03;
        }
      }
      .explain {
        padding-top: .1rem;
        text-align: center;
        color: #FFE5CF;
        font-size: .24rem;
      }
    }
  }
  .closed {
    position: absolute;
    left: 2.72rem;
    bottom: -.6rem;
    z-index: 3;
    width: .6rem;
    height: .6rem;
    background: url(../img/close.png) no-repeat center center;
    background-size: 100% auto;
  }
}
</style>