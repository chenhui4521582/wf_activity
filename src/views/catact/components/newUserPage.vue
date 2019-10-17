<template>
  <section class="newUserPage" v-if="isShow" @click.stop="">
    <section class="step1" :class="{first:!isNext}">
      <div class="circle"></div>
    </section>
    <section class="part1" v-if="!isNext">
      <img class="text1" src="../pages/images/newUserPage/text1.png" alt="">
      <img class="text2" src="../pages/images/newUserPage/text2.png" alt="">
      <img class="left" src="../pages/images/newUserPage/left.png" alt="">
      <img class="next" src="../pages/images/newUserPage/next.png" alt="" @click="clickNext()">
      <img class="hand" src="../pages/images/newUserPage/hand.png" alt="">
    </section>
    <section class="step2" :class="{first:!isNext}">
      <div class="circle"></div>
    </section>
    <section class="step3" :class="{next:isNext}">
      <section class="step3_1">
        <div class="circle"></div>
      </section>
      <section class="step3_2">
        <div class="circle"></div>
      </section>
    </section>
    <section class="part2" v-if="isNext">
      <img class="text3" src="../pages/images/newUserPage/text3.png" alt="">
      <img class="text4" src="../pages/images/newUserPage/text4.png" alt="">
      <img class="right1" src="../pages/images/newUserPage/right.png" alt="">
      <img class="right2" src="../pages/images/newUserPage/right.png" alt="">
      <img class="get-hammer" src="../pages/images/newUserPage/get-hammer.png" alt="" @click="getHammer">
      <img class="hand" src="../pages/images/newUserPage/hand.png" alt="">
    </section>
  </section>
</template>

<script>
import { activityGuide } from '../utils/api'
export default {
  name: 'newUserPage',
  data () {
    return {
      isNext: false
    }
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    getHammer () {
      this.$emit('get-hammer')
    },
    clickNext () {
      this.isNext = true
      this.$emit('show-default-eggs')
    }
  },
  mounted () {
  },
  destroyed () {

  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.newUserPage {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  .step1 {
    width: 100vw;
    height: 3.3rem;
    overflow: hidden;
    position: relative;
    &.first {
      .circle {
        width: 1.8rem;
        height: 1.8rem;
        border-radius: 0.9rem;
      }
    }
    .circle {
      box-shadow: 0 0 0 9rem rgba(0, 0, 0, 0.55);
      position: absolute;
      top: 1.5rem;
      left: 2.2rem;
    }
  }
  .part1 {
    img {
      position: fixed;
      z-index: 11;
    }
    .text1 {
      width: 2.04rem;
      left: 2.1rem;
      top: 3.3rem;
    }
    .text2 {
      width: 3.1rem;
      left: 1.6rem;
      top: 3.6rem;
    }
    .left {
      width: 0.64rem;
      left: 1.7rem;
      top: 4rem;
    }
    .next {
      width: 1.5rem;
      left: 2.6rem;
      top: 4.7rem;
    }
    .hand {
      width: 1.1rem;
      top: 4.5rem;
      left: 4rem;
      animation: tranRotateZ 1s linear infinite;
    }
  }
  .step2 {
    width: 100vw;
    height: 3.7rem;
    overflow: hidden;
    position: relative;
    &.first {
      .circle {
        width: 2.3rem;
        height: 3.2rem;
        border-radius: 50% ~"/" 50%;
      }
    }
    .circle {
      box-shadow: 0 0 0 9rem rgba(0, 0, 0, 0.55);
      position: absolute;
      left: -0.5rem;
      top: 0.3rem;
    }
  }
  .step3 {
    width: 100vw;
    height: calc(100vh ~"-" 7rem);
    display: flex;
    &.next {
      .step3_1 {
        .circle {
          width: 3.2rem;
          height: 1.3rem;
          border-radius: 50% ~"/" 50%;
        }
      }
      .step3_2 {
        .circle {
          width: 1.3rem;
          height: 1.3rem;
          border-radius: 50% ~"/" 50%;
        }
      }
    }
    .step3_1 {
      overflow: hidden;
      position: relative;
      width: 5.7rem;
      .circle {
        box-shadow: 0 0 0 9rem rgba(0, 0, 0, 0.55);
        position: absolute;
        left: 1.98rem;
        bottom: 1.46rem;
      }
    }
    .step3_2 {
      overflow: hidden;
      position: relative;
      width: calc(~"100%" - 5.7rem);
      .circle {
        box-shadow: 0 0 0 9rem rgba(0, 0, 0, 0.55);
        position: absolute;
        right: 0.2rem;
        bottom: 1.4rem;
      }
    }
  }
  .part2 {
    img {
      position: fixed;
      z-index: 11;
    }
    .text3 {
      width: 1.78rem;
      bottom: 3.7rem;
      left: 2.3rem;
    }
    .text4 {
      width: 2rem;
      bottom: 3.7rem;
      left: 4.8rem;
    }
    .right1 {
      width: 0.64rem;
      bottom: 3rem;
      left: 3rem;
    }
    .right2 {
      width: 0.64rem;
      bottom: 2.8rem;
      left: 5.7rem;
    }
    .get-hammer {
      width: 2.04rem;
      bottom: 4.3rem;
      left: 3rem;
    }
    .hand {
      width: 1.1rem;
      bottom: 4.3rem;
      left: 4.8rem;
      animation: tranRotateZ 1s linear infinite;
    }
  }
  @keyframes tranRotateZ {
    0% {
      transform: rotateZ(0deg);
    }
    50% {
      transform: rotateZ(30deg);
    }
    100% {
      transform: rotateZ(0deg);
    }
  }
}
</style>
