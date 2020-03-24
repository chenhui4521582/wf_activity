<template>
  <div class="slide">
    <swiper :options="options" v-if="showList">
      <swiper-slide v-for="(item, index) in noticeList" :key="index">恭喜{{item.nickname}}抽中{{item.awardsName}}</swiper-slide>
    </swiper>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
  name: 'slide',
  props: {
    noticeList: {
      type: Array,
      default: () => []
    }
  },
  data: ()=> ({
    options: {
      loop: true,
      autoplay: true,
      direction: 'vertical',
      height: parseInt(document.documentElement.style.fontSize) * .61
    }
  }),
  computed: {
    showList() {
      return this.noticeList.length
    }
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>
<style scoped lang="less">
.slide{
  margin: 0 auto;
  overflow: hidden;
  width: 6.1rem;
  height: .61rem;
  background: url(../img/lottery-notice-bg.png) no-repeat center center;
  background-size: 100% 100%;
  .swiper-slide {
    text-align: center;
    font-size: .24rem;
    line-height: .63rem;
    color: #F6F7E1;
  }
}
</style>