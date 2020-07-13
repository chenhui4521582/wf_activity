<template>
  <div class="box" :class="{'product': isProduct}">
    <div class="wrap">
      <swiper :options="options" ref="mySwiper">
        <swiper-slide data="1"><img src="../img/box-3.png" alt="" /><div class="bottom"></div></swiper-slide>
        <swiper-slide data="2"><img src="../img/box-2.png" alt="" /><div class="bottom"></div></swiper-slide>
        <swiper-slide data="3"><img src="../img/box-1.png" alt="" /><div class="bottom"></div></swiper-slide>
      </swiper>
    </div>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
  name: 'box',
  data: () => ({
    options: {
      slidesPerView: 3,
      spaceBetween: 15,
      centeredSlides: true,
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      on: {
        slideChangeTransitionEnd: () => {
          let element = document.querySelector('.swiper-slide-active')
          boxVm.$emit('slideChange', element.getAttribute('data'))
        }
      }
    }
  }),
  computed: {
    /** 解决swiper 上了生产环境样式问题 **/
    isProduct () {
      return process.env.NODE_ENV === "production"
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  created () {
    window.boxVm = this
  }
}
</script>
<style lang="less">
.box {
  margin-top: -.1rem;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 4rem;
  &::after {
    content: '';
    position: absolute;
    top: -.3rem;
    right: 0;
    width: .92rem;
    height: 3.71rem;
    z-index: 3;
    transform: rotate(180deg);
    background: url(../img/cover.png) no-repeat center top;
    background-size: 100% 100%;
  }
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: -.3rem;
    width: .92rem;
    height: 3.71rem;
    z-index: 3;
    background: url(../img/cover.png) no-repeat center top;
    background-size: 100% 100%;
  }
  .wrap {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 2;
    width: 12rem;
    height: 4rem;
  }
  .swiper-slide {
    display: flex;
    justify-content: flex-start;
    height: 4rem;
    justify-items: center;
    align-items: center;
    img {
      width: 2.5rem;
    }
    .bottom {
      display: none;
    }
  }
  .swiper-slide-active {
    position: relative;
    justify-content: center;
    img {
      position: relative;
      z-index: 1;
      width: 3.9rem;
      animation: box infinite 2s;
    }
    .bottom {
      display: block;
      position: absolute;
      left: 50%;
      top: 2.8rem;
      transform:  translate(-50%, 0);
      margin-left: -1.92rem;
      width: 3.84rem;
      height: 1.42rem;
      background: url(../img/bottom.png) no-repeat center center;
      background-size: 100% 100%;
      animation: cover infinite 2s;
    }
    &.active {
      img {
        animation: award 1s 1;
      }
    }
  }
  .swiper-slide-prev {
    justify-content: flex-end;
  }
  .swiper-slide-next {
    justify-content: flex-start;
  }
  .swiper-button-prev {
    top: 1.55rem;
    width: .9rem;
    height: .9rem;
    background: url(../img/box-btn.png) no-repeat center center;
    background-size: 100% 100%;
  }
  .swiper-button-next {
    transform: rotate(180deg);
    width: .9rem;
    height: .9rem;
    background: url(../img/box-btn.png) no-repeat center center;
    background-size: 100% 100%;
  }

  @keyframes box {
    0% {
      transform: translate(0, 0);
    }
    25% {
      transform: translate(0, -.2rem);
    }
    50% {
      transform: translate(0, 0);
    }
    75% {
      transform: translate(0, -.2rem);
    }
    100% {
      transform: translate(0, 0);
    }
  }
  @keyframes cover {
    0% {
      transform: scale(1) translateZ(0);
    }
    25% {
      transform: scale(.85) translateZ(0);
    }
    50% {
      transform: scale(1) translateZ(0);
    }
    75% {
      transform: scale(.85) translateZ(0);
    }
    100% {
      transform: scale(1) translateZ(0);
    }
  }
  @keyframes award {
    0% {
      transform: translate(-.05rem, 0);
    }
    10% {
      transform: translate(.05rem, 0)
    }
    20% {
      transform: translate(0, 0)
    }
    30% {
      transform: translate(0, -.05rem)
    }
    40% {
      transform: translate(0, .05rem)
    }
    50% {
      transform: translate(0, 0)
    }
    60% {
      transform: translate(-.05rem, 0);
    }
    70% {
      transform: translate(.05rem, 0)
    }
    80% {
      transform: translate(0, 0)
    }
    90% {
      transform: translate(0, .05rem)
    }
    100% {
      transform: translate(0, -.05rem)
    }
  }
}

.product {
  .swiper-wrapper {
    display: flex;
    position: absolute;
    height: 4rem;
  }
  .swiper-button-prev {
    position: absolute;
    left: 0;
    z-index: 4;
    top: 1.55rem;
    width: .9rem;
    height: .9rem;
    background: url(../img/box-btn.png) no-repeat center center;
    background-size: 100% 100%;
  }
  .swiper-button-next {
    position: absolute;
    right: 0;
    top: 1.55rem;
    z-index: 4;
    transform: rotate(180deg);
    width: .9rem;
    height: .9rem;
    background: url(../img/box-btn.png) no-repeat center center;
    background-size: 100% 100%;
  }
}


</style>