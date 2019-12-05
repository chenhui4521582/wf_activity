<template>
  <article class="swiper-user">
    <Swiper v-if="swiperList">
      <SwiperItem v-for="(item,index) in swiperList"
        :key="index">
        <div class="swiper-info">
          <p>恭喜{{item.nickname}}用户</p>
          <p>抽中{{item.awardsName}}</p>
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
  height: 0.62rem;
  .swiper-info {
    padding: 0.06rem 0.2rem;
    box-sizing: border-box;
    background: rgba(28, 32, 42, 0.52);
    border-radius: 0.25rem;
    color: #fff;
    font-size: 0.18rem;
    text-align: center;
  }
}
</style>
