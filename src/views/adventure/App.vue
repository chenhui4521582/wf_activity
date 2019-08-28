<template>
  <section id="app" class="adventure">
    <div class="gift">
      <img src="./img/gift.png" alt="">
    </div>
    <p>
      <span>更多奖励</span>可前往“<span>任务中心</span>”领取
    </p>
    <div class="btn" @click="goTask"></div>
  </section>
</template>

<script>
import utils from '../../common/js/utils'
export default {
  name: 'adventure',
  components: {

  },
  data () {
    return {

    }
  },
  computed: {
    _channel () {
      return utils.getUrlParam('channel') || localStorage.getItem('APP_CHANNEL') || ''
    },
    _token () {
      return utils.getUrlParam('token') || localStorage.getItem('ACCESS_TOKEN') || ''
    },
    _gametype () {
      return utils.getUrlParam('gametype') || localStorage.getItem('wj_gameType') || 0
    }
  },
  mounted () {
    GLOBALS.marchSetsPoint('A_H5PT0019001709') // H5平台-大户流失挽留(奇遇任务)-弹窗加载完成
  },
  methods: {
    goTask () {
      GLOBALS.marchSetsPoint('A_H5PT0019001710') // H5平台-大户流失挽留(奇遇任务)弹窗-前往查看点击
      let url = `${window.linkUrl.getBackUrl(this._channel, null, false, false, '#/taskview')}`
      parent.GameEval('closeweb')
      parent.location.href = url
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
    font-size: 0.22rem;
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
    font-size: 0.22rem;
    font-weight: 700;
    color: #fff;
    overflow: scroll;
  }
}
.adventure {
  width: 5rem;
  height: 5.8rem;
  background: url("./img/bg.png") no-repeat center center / 100% 100%;
  .gift {
    width: 4.34rem;
    height: 1.98rem;
    margin: 2.18rem auto 0;
    img {
      width: 100%;
      height: 100%;
    }
  }
  p {
    text-align: center;
    font-weight: normal;
    span {
      font-weight: bolder;
    }
  }
  .btn {
    width: 2.78rem;
    height: 0.74rem;
    background: url("./img/btn.png") no-repeat center center / 100% 100%;
    margin: 0.18rem auto;
  }
}
</style>