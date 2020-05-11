<template>
  <div class="slider" id="slider">
    <span class="red" v-if="info.over">已结束，排名公示，奖励将统一发放</span>
    <swiper v-if="show && !info.over" :options="defaultOptions" >
      <swiper-slide class="swiper-slide">
        排行榜截至<span class="red">{{info.publishTime}}</span>
      </swiper-slide>
      <swiper-slide class="swiper-slide">
        排名<span class="red">前3</span>用户可获得限定头像框和猫道具
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
  name: 'slider',
  props: {
    info: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    defaultOptions: {
      loop: true,
      autoplay: true,
      direction: 'vertical',
      height: 0
    },
    show: false
  }),
  components: {
    swiper,
    swiperSlide
  },
  mounted () {
    this.defaultOptions.height = document.getElementById('slider').clientHeight
    this.show = true
  }
}
</script>
<style lang="less">
.slider {
  overflow: hidden;
  height: .7rem;
  box-shadow: 0px 3px 6px rgba(0,0,0,0.08);
  border-radius: .16rem;
  background: url(../img/tip.png) no-repeat center top;
  background-size: 100% 100%;
  line-height: .7rem;
  text-align: center;
  font-size: .24rem;
  .red {
    color: #FF4141;
  }
  .swiper-slide {
    line-height: .7rem;
    text-align: center;
    font-size: .24rem;
    color: #000;
  }
}
</style>