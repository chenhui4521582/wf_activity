<template>
  <article class="swiper-user">
    <swiper v-if="swiperList"
      :options="swiperOption">
      <swiper-slide v-for="(item,index) in swiperList"
        :key="index">
        <div class="swiper-info">
          <p>恭喜{{item.nickname}}用户</p>
          <p>抽中{{item.awardsName | swiperFilter}}</p>
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
  filters: {
    swiperFilter (value) {
      if (value && value.length > 15) {
        return `${value.substr(0, 15)}…`
      }
      return value
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
  height: 0.7rem;
  overflow: hidden;
  .swiper-info {
    padding: 0.06rem 0.2rem;
    box-sizing: border-box;
    background: rgba(9,27,119, 0.6);
    border-radius: 0.25rem;
    color: #fff;
    line-height: 1.2;
    font-size: 0.18rem;
    text-align: center;
  }
}
</style>
