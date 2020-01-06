<template>
  <main class="cat-and-mouse">
    <div class="fireworks-bg">
    </div>
    <div class="main-content">
      <div class="top">
        <div class="top-left"></div>
        <div class="top-center"></div>
        <div class="close"></div>
      </div>
      <div class="time-and-rule">
        <div class="activity-time">活动时间：1月15日～1月21日</div>
        <div class="rule-icon"></div>
      </div>
      <div class="list-wrapper">
        <div class="title"></div>
        <div class="desc">活动每日限达成一次</div>
        <ul class="sign-list">
          <template v-for="(item,index) in 7">
            <li class="list-item"
              :class="{'top-line':index<3,'bottom-line':index>2,'need-open':index===1,'unopen':index>2}">
              <div class="superscript" v-if="index===0">
                <span>完成1次</span>
              </div>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: '',
  components: {

  },
  data () {
    return {

    }
  },
  mounted () {

  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.bg(@url,@pos) {
  background-image: url(@url);
  background-repeat: no-repeat;
  background-position: @pos center;
  background-size: contain;
}
.cat-and-mouse {
  .fireworks-bg {
    height: 5.42rem;
    .bg("./img/fireworks-bg.png", top);
  }
  .main-content {
    min-height: 6.48rem;
    width: 6.94rem;
    margin: -3.26rem auto 0;
    padding: 0.14rem 0.14rem 0;
    box-sizing: border-box;
    .bg("./img/cat-main-bg.png", top);
    .top {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      position: relative;
      .top-left {
        width: 1.58rem;
        height: 3.2rem;
        margin-left: -0.28rem;
        margin-top: -0.62rem;
        .bg("./img/top-left.png", center);
      }
      .top-center {
        width: 4.4rem;
        height: 1.24rem;
        margin-left: -0.2rem;
        margin-top: -0.5rem;
        .bg("./img/top-center.png", center);
      }
      .close {
        width: 1.1rem;
        height: 1.16rem;
        position: relative;
        left: 0.36rem;
        top: 0.26rem;
        .bg("./img/close.png", center);
      }
    }
    .time-and-rule {
      display: flex;
      justify-content: center;
      align-items: center;
      width: max-content;
      margin: -1.9rem auto 0;
      position: relative;
      .activity-time {
        background: #d41a0e;
        border-radius: 0.18rem;
        width: 3.76rem;
        line-height: 0.42rem;
        font-size: 0.24rem;
        color: #fff;
        text-align: center;
        box-shadow: inset 0px 1px 5px 0px rgba(154, 12, 1, 1),
          inset 0px -1px 1px 0px rgba(255, 147, 122, 1);
      }
      .rule-icon {
        margin-left: 0.1rem;
        margin-right: -0.62rem;
        width: 0.52rem;
        height: 0.52rem;
        .bg("./img/rule-icon.png", center);
      }
    }
    .list-wrapper {
      width: 6.66rem;
      height: 5.36rem;
      .bg("./img/list-bg.png", center);
      margin: auto;
      position: relative;
      padding: 0.1rem;
      box-sizing: border-box;
      .title {
        width: 2.7rem;
        height: 0.62rem;
        .bg("./img/title.png", center);
        margin: -0.16rem auto 0;
      }
      .desc {
        text-align: center;
        font-size: 0.24rem;
        font-weight: 400;
        color: #fff;
        margin-top: -0.1rem;
      }
      .sign-list {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        .list-item {
          width: 1.48rem;
          height: 1.94rem;
          .bg("./img/default-bg.png", center);
          position: relative;
        }
        .top-line {
          margin: 0.06rem 0.2rem;
        }
        .bottom-line {
          margin: 0.36rem 0.02rem 0;
        }
        .need-open {
          .bg("./img/open-bg.png", center);
        }
        .superscript {
          position: absolute;
          top: 0;
          left: 0;
          width: 0.76rem;
          height: 0.78rem;
          background-image: url(./img/superscript-icon.png);
          background-position: left top;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          span {
            display: block;
            transform-origin: center center;
            color: #fff;
            font-size: 0.18rem;
            white-space: nowrap;
            transform: rotate(-45deg) translate(-0.14rem, 0.04rem);
          }
        }
        .unopen::after {
          content: "";
          display: block;
          position: absolute;
          width: 1.48rem;
          height: 1.94rem;
          top: 0;
          left: 0;
          border-radius: 0.2rem;
          background-color: rgba(40, 11, 75, 0.3);
          background-image: url(./img/lock-icon.png);
          background-position: center 0.52rem;
          background-repeat: no-repeat;
          background-size: 0.58rem 0.58rem;
        }
      }
    }
  }
}
// 记得删除
main {
  background: rgba(0, 0, 0, 0.5);
}
</style>
