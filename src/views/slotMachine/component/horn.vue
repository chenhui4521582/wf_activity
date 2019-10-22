<template>
  <div class="horn">
    <swiper v-if="isShow" :options="defaultOptions" >
      <swiper-slide class="swiper-slide" v-for="(item, index) in hornList" :key="index">
        恭喜{{item.nickname}}抽中了{{item.amount}}金叶子
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
      default: ()=>([])
    }
  },
  data: ()=> ({
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
    isShow() {
      return this.hornList.length
    }
  },
}
</script>
<style lang="less" scoped>
  .horn {
    margin: 2.4rem 0 0 2rem;
    width: 4rem;
    overflow: hidden;
    color: #FFE8DF;
    height: .6rem;
    line-height: .6rem;
    font-size: .24rem;
  }
</style>
