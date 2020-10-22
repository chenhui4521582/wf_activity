<template>
  <article class="jackpot-wrapper">
    <section class="top">
      <span>当前奖池累计</span>
      <img src="../img/problem-icon.png" alt="" @click="showPop()">
    </section>
    <section class="bottom">
      <div>
        <img src="../img/hf-icon.png" alt="">
        <span>{{info.awardPool}}</span>
      </div>
    </section>
  </article>
</template>

<script>
export default {
  name: '',
  components: {

  },
  props: {
    info: {
      type: Object,
      default: () => ({})
    }
  },
  mounted () {

  },
  methods: {
    showPop () {
      this.$emit('showPop', 11)
    }
  }
}
</script>

<style lang="less" scoped>
.jackpot-wrapper {
  margin-top: 0.84rem;
  text-align: center;
  font-weight: bold;
  img {
    height: 0.48rem;
  }
  .top {
    font-size: 0.36rem;
    color: #eda94e;
    position: relative;
    img {
      position: absolute;
      right: 0.5rem;
    }
  }
  .bottom {
    position: relative;
    overflow: hidden;
    height: 0.9rem;
    color: #fff2d1;
    font-size: 0.72rem;
    div {
      position: absolute;
      left: 50%;
      transform: translateX(calc(~'-50%' - 0.4rem));
      width: 100%;
    }
  }
}
</style>
