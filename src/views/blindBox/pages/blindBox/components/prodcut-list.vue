<template>
  <article class="wrapper">
    <swiper v-if="products"
      :options="options">
      <swiper-slide v-for="(item,index) in products"
        :key="index">
        <section @click="detail(item)"
          class="content">
          <img :src="item.awardsImage | imgFilter"
            alt="" />
          <p class="des">{{ item.awardsName }}</p>
          <span class="price">¥{{item.showAmount}}</span>
        </section>
      </swiper-slide>
    </swiper>
    <ProductDialog :goods-detail="goodsDetail"
      v-if="show"
      @close="show=false"
      :show="show" />
  </article>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import { hotAwardsList } from '../../../apis/products'
import ProductDialog from '../../../components/productDialog'

export default {
  data () {
    return {
      options: {
        autoplay: {
          disableOnInteraction: false,
          delay: 2000
        },
        loop: true,
        initialSlide: 1,
        watchOverflow: true,
        slidesPerView: 3,
        centeredSlides: true,
        speed: 300
      },
      show: false,
      products: null,
      awardsId: null,
      goodsDetail: {
        awardsName: null,
        showAmount: null,
        remark: null
      }
    }
  },
  methods: {
    detail (item) {
      GLOBALS.marchSetsPoint('A_H5PT0225002749', {
        awards_id: item.awardsName
      })
      this.goodsDetail = item
      this.show = true
    }
  },
  components: {
    swiper, swiperSlide, ProductDialog
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
  padding-left: 0.34rem;
  .content {
    border-radius: 0.1rem;
    width: 1.8rem;
    background: rgba(129, 131, 136, 0.73);
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    .price {
      width: 0.7rem;
      line-height: 0.26rem;
      background: #f2db8f;
      color: #f5000c;
      text-align: center;
      font-size: 0.18rem;
      position: absolute;
      right: 0;
      top: 0;
      border-bottom-left-radius: 0.1rem;
      border-top-right-radius: 0.1rem;
    }
    img {
      width: 1rem;
      height: 1rem;
    }
    .des {
      // border-radius: 0.1rem;
      border-bottom-right-radius: 0.1rem;
      border-bottom-left-radius: 0.1rem;
      background: #f2db8f;
      color: #2a2e3a;
      width: 1.8rem;
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
