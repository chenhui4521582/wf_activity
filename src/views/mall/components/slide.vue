<template>
  <div class="slide">
    <swiper :options="options">
      <swiper-slide>水滴可以通过领水滴领取</swiper-slide>
      <swiper-slide>施肥树苗长得更快~</swiper-slide>
      <swiper-slide>树苗结果要及时领取礼物哟</swiper-slide>
      <swiper-slide>以后可以从首页活动中心进入</swiper-slide>
      <swiper-slide>我的收获可以看到种成的树苗哦</swiper-slide>
      <swiper-slide>我在茁壮成长啦</swiper-slide>
    </swiper>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
  name: 'slide',
  data: ()=> ({
    options: {
      loop: true,
      autoplay: true,
      direction: 'vertical',
      height: 57
    }
  }),
  components: {
    swiper,
    swiperSlide
  }
}
</script>
<style scoped lang="less">
.slide{
  overflow: hidden;
  position: absolute;
  bottom: 9.35rem;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 5;
  width: 4.58rem;
  height: 1rem;
  background: url(../img/award-tips.png) no-repeat center center;
  background-size: 100% 100%;
  .swiper-slide {
    text-align: center;
    font-size: .26rem;
    color: #77330C;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>