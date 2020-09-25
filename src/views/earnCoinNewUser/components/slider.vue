<template>
  <div class="slider">
    <swiper v-if="showNotice" :options="options">
      <swiper-slide v-for="(item,index) in list" :key="index">
        用户{{item.nickname}}{{item.taskName}}获得{{item.awardsName}}
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
    list: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    options: {
      autoplay: {
        disableOnInteraction: false,
        delay: 2000
      },
      direction : 'vertical',
      loop: true,
      height: 30,
      spaceBetween : 10
    }
  }),
  components: {
    swiper, swiperSlide
  },
  computed: {
    showNotice () {
      return  this.list.length
    }
  }
}
</script>
<style scoped lang="less">
.slider {
  overflow: hidden;
  position: absolute;
  left: 50%;
  top: 1.73rem;
  z-index: 10;
  transform: translate(-50%, 0);
  height: 30px;
  width: 5rem;
  .swiper-slide {
    color: #fff;
    width: 100%;
    height: 30px;
    text-align: center;
    background: rgba(0,0,0,.5);
    border-radius: .3rem;
    font-size: .24rem;
    white-space: nowrap;
    line-height: 30px;
    color: #FFF385;
  }
}
</style>