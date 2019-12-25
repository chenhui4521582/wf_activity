<template>
  <div class="horn">
    <swiper v-if="isShow" :options="defaultOptions">
      <swiper-slide class="swiper-slide" v-for="(item, index) in hornList" :key="index">
        恭喜{{item.nickname}}抽中了{{item.awardsName}}
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
export default {
  name: 'horn',
  props: {
    hornList: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    defaultOptions: {
      loop: true,
      autoplay: 3000,
      direction: 'vertical',
      height: 60
    }
  }),
  components: {
    swiper,
    swiperSlide
  },
  computed: {
    isShow () {
      return this.hornList.length
    }
  },
}
</script>
<style lang="less" scoped>
.horn {
  position: absolute;
  top: .9rem;
  left: 2rem;
  width: 4rem;
  overflow: hidden;
  color:rgba(255,255,255,1);
  height: 0.4rem;
  line-height: 0.4rem;
  font-size: 0.22rem;
}
</style>
