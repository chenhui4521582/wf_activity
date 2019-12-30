<template>
  <article class="wrapper">
    <swiper v-if="products"
      :options="options">
      <swiper-slide v-for="(item,index) in products"
        :key="index">
        <section class="content">
          <img :src="item.awardsImage | imgFilter"
            alt="" />
          <p class="des">{{ item.awardsName }}</p>
          <span class="price">¥{{item.showAmount}}</span>
        </section>
      </swiper-slide>
    </swiper>
  </article>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import { hotAwardsList } from '../../../apis/products'

export default {
  data () {
    return {
      options: {
        autoplay: {
          disableOnInteraction: false,
          delay: 2000
        },
        loop: true,
        watchOverflow: true,
        slidesPerView: 3,
        centeredSlides: true,
        speed: 300
      },
      products: null
    }
  },
  components: {
    swiper, swiperSlide
  },
  async mounted () {
    const res = await hotAwardsList()
    const { data } = res.data
    this.products = data || []
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  padding: 0 0.2rem;
  .content {
    border-radius: 0.1rem;
    width: 1.74rem;
    background: #F4C4A3;
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    .price {
      width: 0.64rem;
      line-height: 0.26rem;
      background: #FA7A19;
      color: #fff;
      text-align: center;
      font-size: 0.18rem;
      position: absolute;
      right: 0;
      top: 0;
      border-bottom-left-radius: 0.1rem;
      border-top-right-radius:  0.1rem;
    }
    img {
      width: 0.8rem;
      height: 0.8rem;
    }
    .des {
      border-radius: 0.1rem;
      background: #f2db8f;
      color: #2a2e3a;
      width: 1.74rem;
      height: 0.3rem;
      box-sizing: border-box;
      line-height: 0.3rem;
      font-size: 0.18rem;
      padding: 0 0.1rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
