<template>
  <div class="slider">
    <swiper v-if="isShow" :options="defaultOptions" >
      <swiper-slide class="swiper-slide" v-for="(item, index) in list" :key="index">
        {{item}}
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
  props: ['list'],
  name: 'slider',
  computed: {
    isShow () {
      return this.list.length
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  data: () => ({
    defaultOptions: {
      loop: true,
      autoplay: true,
      direction: 'vertical',
      height: 44
    }
  })
}
</script>
<style scoped lang="less">
.slider {
  margin: .2rem auto .3rem;
  width: 3.56rem;
  height: .44rem;
  background: url(../img/slider-bg.png) no-repeat center center;
  background-size: 100% 100%;
  overflow: hidden;
  .swiper-slide {
    width: 3.56rem;
    height: .44rem;
    line-height: .44rem;
    text-align: center;
    font-size: .22rem;
    color: #fff;
  }
}
</style>