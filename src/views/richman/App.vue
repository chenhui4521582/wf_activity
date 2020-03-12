<template>
  <section>
    <div class="big-bg">
      <header>
        <div class="back"></div>
        <div class="rule"></div>
        <div class="guide"></div>
        <div class="countdown-container"></div>
        <div class="tab-card"></div>
        <div class="top"></div>
        <div class="coinrecord"></div>
      </header>
    </div>
  </section>
</template>


<script>
import BScroll from "better-scroll";
import _get from "lodash.get";
import {} from "./services/api";
import comPop from "./component/comPop";
import utils from "../../common/js/utils.js";
</script>
<script>
export default {
  data() {
    return {};
  },
  created() {
    console.log("天天大富翁");
  }
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body,
p,
h1,
h2,
h3,
h4,
h5,
h6,
p,
div,
a,
em,
i,
ul,
li {
  margin: 0;
  padding: 0;
  line-height: 1;
}

ul li {
  list-style: none;
}

a {
  text-decoration: none;
}
</style>
<style lang="less" scoped>
section {
  width: 100%;
  height: 100vh;
  background-color: #0b0800;
  overflow: hidden;
  .big-bg {
    position: relative;
    overflow: hidden;
    // width: 7.2rem;
    height: 13.83rem;
    background: url(./images/bg.png) no-repeat;
    background-size: 100% 100%;
    header {
      overflow: hidden;
      position: relative;

      width: 100%;
      // height: 3.01rem;
      .back {
        background: url(./images/back.png) no-repeat;
        background-size: 100% 100%;
        width: 0.85rem;
        height: 0.5rem;
        // margin-top: 0.2rem;
        position: absolute;
        top: 0.2rem;
      }
      .rule {
        width: 0.93rem;
        height: 0.55rem;
        background: url(./images/rule.png) no-repeat;
        background-size: 100% 100%;
        position: absolute;
        top: 0.2rem;
        right: 0.1rem;
      }
      .guide {
        background: url(./images/guide.png) no-repeat;
        background-size: 100% 100%;
        width: 0.93rem;
        height: 0.55rem;
        position: absolute;
        top: 0.93rem;
        right: 0.1rem;
      }
      .countdown-container {
        background: url(./images/countdown.png) no-repeat;
        background-size: 100% 100%;
        width: 4.2rem;
        height: 0.73rem;
        margin: 2.28rem auto 0;
      }
      .tab-card{
          background: url(./images/tab.png) no-repeat;
        background-size: 100% 100%;
        width: 5.31rem;
        height: 0.71rem;
        margin: 0.05rem auto 0;
      }
      .top{
   background: url(./images/top.png) no-repeat;
        background-size: 100% 100%;
        width: 1.13rem;
        height: 0.55rem;
    //     position: absolute;
    // top: 4rem;
    // left: 0.1rem;
        float: left;
    margin-top: 0.23rem;
    margin-left: 0.1rem;
      }
      .coinrecord{
   background: url(./images/coinrecord.png) no-repeat;
        background-size: 100% 100%;
        width: 1.13rem;
        height: 0.55rem;
        float: right;
    margin-right: 0.1rem;
    margin-top: 0.26rem;
      }
    }
  }
}
@keyframes breathe {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
</style>

