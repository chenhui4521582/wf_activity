<template>
  <article class="wrapper">
    <Dialog :layout="layout"
      :show="show"
      v-show="!isMagnify"
      @mask="closeMask"
      @onClose="$emit('close')"
      :close="true">
      <div @click.stop=""
        slot="header"
        class="title">开盲盒 即有机会抽中</div>
      <div @click.stop=""
        class="img-container">
        <swiper v-if="products"
          :options="options">
          <swiper-slide v-for="(item,index) in products"
            :key="index">
            <div class="content"
              :style="{background: `url(${imgFilter(item.awardsImage)})`, backgroundSize: 'cover'}">
            </div>
          </swiper-slide>
          <div slot="pagination"
            class="swiper-pagination"></div>
        </swiper>
        <p class="goods-name">{{goodsDetail.awardsName}}</p>
        <p class="goods-detail">
          <span class="goods-price">¥{{goodsDetail.showAmount}}</span>
          <span v-if="goodsDetail.remark"
            class="goods-remark">{{goodsDetail.remark}}</span>
        </p>
      </div>
      <div @click.stop=""
        slot="footer">
        <p class="open-box"
          @click="openBox">开一个试试</p>
        <p class="view-product"
          @click="toProducts">查看更多奖品>></p>
      </div>
    </Dialog>
    <MagnifyImage :img="img"
      @onClose="closeMagnify"
      :show="isMagnify" />
  </article>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import Dialog from '../dialog'
import MagnifyImage from '../magnifyImage'
import { ImageList } from '../../apis/products'
import { ChangeOne } from '../../apis/box'

export default {
  data () {
    const vm = this
    return {
      options: {
        autoplay: {
          disableOnInteraction: false,
          delay: 2000
        },
        loop: true,
        watchOverflow: true,
        speed: 300,
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets'
        },
        on: {
          click: function () {
            const realIndex = this.realIndex
            vm.viewImage(vm.products[realIndex].awardsImage)
          }
        },
        preventLinksPropagation: false
      },
      isMagnify: false,
      img: null,
      products: null,
      layout: {
        width: '6.1rem',
        padding: '0 0.56rem'
      }
    }
  },
  props: {
    goodsDetail: {
      type: Object,
      default: {
        awardsName: null,
        showAmount: null,
        remark: null,
        awardsId: null
      }
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeMask () {
      this.$emit('close')
    },
    toProducts () {
      GLOBALS.marchSetsPoint('A_H5PT0225002835', {
        awards_id: this.goodsDetail.awardsId,
        awards_name: this.goodsDetail.awardsName
      })
      this.$emit('close')
      this.$router.push({
        name: 'AllProducts'
      })
    },
    imgFilter (url) {
      if (url && url.indexOf('http') < 0) {
        return '//file.beeplaying.com' + url
      } else {
        return url
      }
    },
    async openBox () {
      GLOBALS.marchSetsPoint('A_H5PT0225002834', {
        awards_id: this.goodsDetail.awardsId,
        awards_name: this.goodsDetail.awardsName
      })
      const { data: { data } } = await ChangeOne()
      this.$router.push({
        name: 'ChooseBox',
        query: {
          sort: data.sort
        },
        params: {
          type: data.newColor
        }
      })
    },
    // 查看大图
    viewImage (item) {
      this.img = item
      this.isMagnify = true
    },
    // 关闭大图
    closeMagnify () {
      this.isMagnify = false
    }
  },
  components: {
    swiper, swiperSlide, Dialog, MagnifyImage
  },
  async mounted () {
    ({ data: { data: this.products } } = await ImageList(this.goodsDetail.awardsId))
    // ({ data: { data: this.products } } = await ImageList(47))
    if (this.products.length > 4) this.products = this.products.slice(0, 4)
    if (this.products.length === 0) this.products = [{ awardsImage: this.goodsDetail.awardsImage }]
    GLOBALS.marchSetsPoint('A_H5PT0225002833', {
      awards_id: this.goodsDetail.awardsId,
      awards_name: this.goodsDetail.awardsName
    })
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  .content {
    width: 4.98rem;
    height: 4.98rem;
    border-radius: 0.2rem;
  }
  .img-container {
    position: relative;
    .swiper-pagination {
      /deep/ .swiper-pagination-bullet.swiper-pagination-bullet-active {
        background: #f2c440;
      }
      /deep/ .swiper-pagination-bullet {
        background: #fff;
        opacity: 1;
      }
    }
  }
  .title {
    font-size: 0.36rem;
    color: #000;
    font-weight: bold;
    padding: 0.36rem 0 0.19rem;
  }
  .goods-name {
    color: #333333;
    font-size: 0.28rem;
    padding: 0.2rem 0;
    text-align: left;
  }
  .goods-detail {
    padding-bottom: 0.36rem;
    text-align: left;
    .goods-price {
      color: #ff2828;
      font-size: 0.36rem;
      font-weight: bold;
      padding-right: 0.56rem;
    }
    .goods-remark {
      background: #eeeeee;
      line-height: 0.38rem;
      border-radius: 0.19rem;
      padding: 0 0.19rem 0 0.16rem;
      color: #999999;
      font-size: 0.2rem;
      width: fit-content;
    }
  }
  .open-box {
    line-height: 0.7rem;
    border-radius: 0.16rem;
    background: #d1ac42;
    color: #fff;
    font-size: 0.3rem;
    text-align: center;
  }
  .view-product {
    color: #d1ac42;
    font-size: 0.24rem;
    text-align: center;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
  }
}
</style>
