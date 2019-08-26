<template>
  <section id="app">
    <section class="adventure">
      <div class="gift">
        <img src="./img/gift.png" alt="">
      </div>
      <p>
        <span>更多奖励</span>可前往“<span>任务中心</span>”领取
      </p>
      <div class="btn" @click="goTask"></div>
    </section>
  </section>
</template>

<script>
export default {
  name: 'adventure',
  components: {

  },
  data () {
    return {

    }
  },
  mounted () {

  },
  methods: {
    goTask () {
      let url = `https://wap.beeplaying.com/activities/taskgames.html?channel=100006&token=d246c9377c8a40cc82f3b908f55011bd&gametype=12`
      parent.GameEval('closeweb')
      parent.GameEval('openweb', url)
    }
  }
}
</script>
<style  lang="less">
@import "../../common/css/base.css";
/* 坚屏模式 */
@media only screen and (orientation: portrait) {
  #app {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    background: transparent;
    font-size: 0.24rem;
    font-weight: 700;
    color: #fff;
  }
}

/* 横屏模式 */
@media screen and (orientation: landscape) {
  #app {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    background: transparent;
    font-size: 0.24rem;
    font-weight: 700;
    color: #fff;
    overflow: scroll;
  }
}
.adventure {
  width: 5rem;
  height: 5.8rem;
  background: url("./img/bg.png") no-repeat center center / 100% 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -2.5rem;
  margin-top: -2.9rem;
}
</style>