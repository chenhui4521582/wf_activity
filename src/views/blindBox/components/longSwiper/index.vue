<template>
  <article class="swiper-user">
    <Swiper v-if="swiperList">
      <SwiperItem v-for="(item,index) in swiperList"
        :key="index">
        <div class="swiper-info">
          <p>恭喜{{item.nickname}}开出{{item.awardsName}}</p>
        </div>
      </SwiperItem>
    </Swiper>
  </article>
</template>

<script>
import Swiper from '../swiper/index'
import SwiperItem from '../swiper/swiperItem'
import { NoticeList } from '../../apis/user'

export default {
  data () {
    return {
      swiperList: null
    }
  },
  async mounted () {
    const { data: { data } } = await NoticeList()
    this.swiperList = data
  },
  components: {
    Swiper,
    SwiperItem
  }
}
</script>

<style lang="less" scoped>
.swiper-user {
  height: 1rem;
  background: #2a2d3c;
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
