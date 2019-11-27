<template>
  <article class="swiper-user">
    <Swiper>
      <SwiperItem v-for="(item,index) in swiperList"
        :key="index">
        <div class="swiper-info">
          <p>恭喜{{item.name}}用户开出{{item.prize}}</p>
        </div>
      </SwiperItem>
    </Swiper>
  </article>
</template>

<script>
import Swiper from '../swiper/index'
import SwiperItem from '../swiper/swiperItem'

export default {
  data () {
    return {
      swiperList: [
        {
          name: 'xxxxxx',
          prize: '奔驰'
        },
        {
          name: 'xxxxxx',
          prize: 'iphone'
        },
        {
          name: 'xxxxxx',
          prize: 'ipad'
        },
        {
          name: 'xxxxxx',
          prize: 'macBook'
        },
        {
          name: 'xxxxxx',
          prize: '100元话费aaaaaaaaaaa'
        }
      ]
    }
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
