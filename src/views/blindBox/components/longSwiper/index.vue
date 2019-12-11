<template>
  <article class="swiper-user">
    <swiper v-if="swiperList"
      :options="swiperOption">
      <swiper-slide v-for="(item,index) in swiperList"
        :key="index">
        <div class="swiper-info">
          <p>恭喜{{item.nickname}}开出{{item.awardsName | textFilter}}</p>
        </div>
      </swiper-slide>
    </swiper>
  </article>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import { NoticeList } from '../../apis/user'

export default {
  data () {
    return {
      swiperOption: {
        autoplay: true,
        loop: true,
        watchOverflow: true,
        speed: 300,
        direction: 'vertical'
      },
      swiperList: null
    }
  },
  async mounted () {
    const { data: { data } } = await NoticeList()
    this.swiperList = data
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style lang="less" scoped>
.swiper-user {
  height: 1rem;
  background: #2a2d3c;
  overflow: hidden;
  .swiper-info {
    border: 0.02rem solid #fff;
    border-radius: 0.25rem;
    padding: 0.1rem 0;
    box-sizing: border-box;
    background: rgba(28, 32, 42, 0.52);
    color: #fff;
    font-size: 0.24rem;
    text-align: center;
  }
}
</style>
