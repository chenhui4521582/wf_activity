<template>
  <div id="app" class="turn-wrap">
    <div class="top">
      <span>限时福利 </span>剩余<em>6</em>天<em>23</em>小时<em>45</em>分
    </div>
  </div>
</template>
<script>
export default {
  name: 'app',
  data () {
    return {

    }
  },
  components: {
    'rule': () => import('./components/rule.vue'),
    'turnpop': () => import('./components/turnpop')
  },
  mounted () {
  }
}
</script>
<style lang="less">
@import "../../common/css/base.css";
.bgWithFull(@url) {
  background: url(@url) no-repeat center center / 100% 100%;
}
.turn-wrap {
  min-height: 100vh;
  background: url("./img/bg.png") no-repeat center ~"-0.6rem" / 100%;

  .top {
    height: 0.6rem;
    color: #fff;
    display: flex;
    font-size: 0.28rem;
    align-self: center;
    align-content: center;
    justify-content: center;
    justify-content: center;
    font-weight: 500;
    .bgWithFull("./img/top-bg.png");
    span {
      font-size: 0.32rem;
      font-weight: 800;
    }
    em {
      display: inline-block;
      height: 0.36rem;
      font-size: 0.32rem;
      background: #fff;
      color: #000;
      font-weight: 800;
      padding: 0 0.08rem;
      border-radius: 0.04rem;
    }
  }
}
</style>
