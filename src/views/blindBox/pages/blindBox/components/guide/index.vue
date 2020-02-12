import { clearInterval } from 'timers';
<template>
  <article @click="handleMask"
    class="guide-wrapper">
    <section v-if="step === 1">
      <img class="step1"
        @click.stop=""
        src="./assets/step1.png"
        alt="">
      <div class="know">({{count}}s)</div>
    </section>
    <section v-if="step === 2">
      <img class="step2"
        src="./assets/step2.png"
        alt="">
      <div class="step2-know">({{count}}s)</div>
    </section>
  </article>
</template>

<script>
export default {
  data () {
    return {
      step: 1,
      count: 2,
      countDown: null
    }
  },
  methods: {
    handleMask () {
      clearInterval(this.countDown)
      this.countDown = null
      this.step++
      this.count = 2
    },
    clearTimer () {
      if (this.countDown) clearInterval(this.countDown)
    }
  },
  watch: {
    step (val) {
      if (val === 2) {
        this.countDown = setInterval(() => {
          this.count--
          if (this.count === 0) {
            clearInterval(this.countDown)
            this.step++
            this.count = 2
            this.countDown = null
          }
        }, 1000)
      }
      if (val === 3) {
        this.$emit('close')
      }
    }
  },
  mounted () {
    this.countDown = setInterval(() => {
      this.count--
      if (this.count === 0) {
        clearInterval(this.countDown)
        this.countDown = null
        this.count = 2
        this.step++
      }
    }, 1000)
  },
  beforeDestroy () {
    this.clearTimer()
  }
}
</script>

<style lang="less" scoped>
.guide-wrapper {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  .step1 {
    width: 4.64rem;
    height: 2.43rem;
    position: relative;
    top: 0.7rem;
    left: 0.92rem;
  }
  .step2 {
    width: 5.05rem;
    height: 3.8rem;
    position: absolute;
    bottom: 2.5rem;
    left: 1.65rem;
  }
  .know {
    background: url("./assets/know.png") no-repeat;
    background-size: cover;
    width: 2.33rem;
    line-height: 0.87rem;
    color: #fff;
    position: absolute;
    top: 9.5rem;
    left: 2.7rem;
  }
  .step2-know {
    background: url("./assets/know.png") no-repeat;
    background-size: cover;
    width: 2.33rem;
    line-height: 0.87rem;
    color: #fff;
    position: absolute;
    top: 12rem;
    left: 2.7rem;
  }
}
</style>
