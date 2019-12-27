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
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 0.32rem;
  width: 100%;
  .content {
    border-radius: 0.1rem;
    width: 1.74rem;
    background: #6e7588;
    display: flex;
    flex-direction: column;
    align-items: center;
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
