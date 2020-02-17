<template>
  <article @click="handleMask"
    class="guide-wrapper">
    <section v-if="step === 1">
      <img class="step1"
        @click.stop=""
        src="./assets/step1.png"
        alt="">
      <div @click="setPoint('A_H5PT0225002855')"
        class="know">知道了 <span>({{count}}s)</span></div>
    </section>
    <section v-if="step === 2">
      <img class="step2"
        src="./assets/step2.png"
        alt="">
      <div @click="setPoint('A_H5PT0225002857')"
        class="step2-know">知道了 <span>({{count}}s)</span></div>
    </section>
  </article>
</template>

<script>
export default {
  data () {
    return {
      step: 1,
      count: 4,
      countDown: null
    }
  },
  methods: {
    handleMask () {
      clearInterval(this.countDown)
      this.countDown = null
      this.step++
      this.count = 4
    },
    clearTimer () {
      if (this.countDown) clearInterval(this.countDown)
    },
    setPoint (val) {
      GLOBALS.marchSetsPoint(val)
    }
  },
  watch: {
    step (val) {
      if (val === 2) {
        GLOBALS.marchSetsPoint('A_H5PT0225002856')
        this.countDown = setInterval(() => {
          this.count--
          if (this.count === 0) {
            clearInterval(this.countDown)
            this.step++
            this.count = 4
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
    GLOBALS.marchSetsPoint('A_H5PT0225002854')
    this.countDown = setInterval(() => {
      this.count--
      if (this.count === 0) {
        clearInterval(this.countDown)
        this.countDown = null
        this.count = 4
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
    width: 100%;
    position: relative;
    top: 0.4rem;
  }
  .step2 {
    width: 5.05rem;
    height: 2.84rem;
    position: absolute;
    bottom: 26%;
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
    font-size: 0.32rem;
    padding-left: 0.6rem;
    span {
      font-size: 0.24rem;
    }
  }
  .step2-know {
    background: url("./assets/know.png") no-repeat;
    background-size: cover;
    width: 2.33rem;
    line-height: 0.87rem;
    color: #fff;
    position: absolute;
    bottom: 9%;
    left: 2.3rem;
    font-size: 0.32rem;
    padding-left: 0.6rem;
    span {
      font-size: 0.24rem;
    }
  }
}
</style>
