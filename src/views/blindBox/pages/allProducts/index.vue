<template>
  <article class="wrapper">
    <NavBar @back="$router.go(-1)"
      title="所有商品" />
    <section ref="products"
      @scroll="getScroll"
      class="container">
      <Product v-for="(item,index) in products"
        :key="index"
        :product="item" />
      <p class="over">已经到底了</p>
      <ShortSwiper class="products-swiper" />
    </section>
    <Bottom />
    <img v-if="scrollTop"
      @click="back"
      class="back"
      src="./assets/button.png">
  </article>
</template>

<script>
import NavBar from '../../components/navBar'
import Product from './components/product'
import Bottom from './components/bottom'
import ShortSwiper from '../../components/shortSwiper'

export default {
  data () {
    return {
      scrollTop: null,
      products: [
        {
          img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574844710234&di=aafa619456b5a5aca55f828c868ae9d4&imgtype=0&src=http%3A%2F%2Fi1.sinaimg.cn%2Fent%2Fd%2F2008-06-04%2FU105P28T3D2048907F326DT20080604225106.jpg',
          name: 'iphone11手机',
          price: 123123,
          count: 123
        },
        {
          img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574844710234&di=aafa619456b5a5aca55f828c868ae9d4&imgtype=0&src=http%3A%2F%2Fi1.sinaimg.cn%2Fent%2Fd%2F2008-06-04%2FU105P28T3D2048907F326DT20080604225106.jpg',
          name: 'iphone11手机',
          price: 123123,
          count: 123
        },
        {
          img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574844710234&di=aafa619456b5a5aca55f828c868ae9d4&imgtype=0&src=http%3A%2F%2Fi1.sinaimg.cn%2Fent%2Fd%2F2008-06-04%2FU105P28T3D2048907F326DT20080604225106.jpg',
          name: 'iphone11手机',
          price: 123123,
          count: 123
        },
        {
          img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574844710234&di=aafa619456b5a5aca55f828c868ae9d4&imgtype=0&src=http%3A%2F%2Fi1.sinaimg.cn%2Fent%2Fd%2F2008-06-04%2FU105P28T3D2048907F326DT20080604225106.jpg',
          name: 'iphone11手机',
          price: 123123,
          count: 123
        },
        {
          img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574844710234&di=aafa619456b5a5aca55f828c868ae9d4&imgtype=0&src=http%3A%2F%2Fi1.sinaimg.cn%2Fent%2Fd%2F2008-06-04%2FU105P28T3D2048907F326DT20080604225106.jpg',
          name: 'iphone11手机',
          price: 123123,
          count: 123
        },
        {
          img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574844710234&di=aafa619456b5a5aca55f828c868ae9d4&imgtype=0&src=http%3A%2F%2Fi1.sinaimg.cn%2Fent%2Fd%2F2008-06-04%2FU105P28T3D2048907F326DT20080604225106.jpg',
          name: 'iphone11手机',
          price: 123123,
          count: 123
        },
        {
          img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574844710234&di=aafa619456b5a5aca55f828c868ae9d4&imgtype=0&src=http%3A%2F%2Fi1.sinaimg.cn%2Fent%2Fd%2F2008-06-04%2FU105P28T3D2048907F326DT20080604225106.jpg',
          name: 'iphone11手机',
          price: 123123,
          count: 123
        },
        {
          img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574844710234&di=aafa619456b5a5aca55f828c868ae9d4&imgtype=0&src=http%3A%2F%2Fi1.sinaimg.cn%2Fent%2Fd%2F2008-06-04%2FU105P28T3D2048907F326DT20080604225106.jpg',
          name: 'iphone11手机',
          price: 123123,
          count: 123
        },
        {
          img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574844710234&di=aafa619456b5a5aca55f828c868ae9d4&imgtype=0&src=http%3A%2F%2Fi1.sinaimg.cn%2Fent%2Fd%2F2008-06-04%2FU105P28T3D2048907F326DT20080604225106.jpg',
          name: 'iphone11手机',
          price: 123123,
          count: 123
        },
        {
          img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1574844710234&di=aafa619456b5a5aca55f828c868ae9d4&imgtype=0&src=http%3A%2F%2Fi1.sinaimg.cn%2Fent%2Fd%2F2008-06-04%2FU105P28T3D2048907F326DT20080604225106.jpg',
          name: 'iphone11手机',
          price: 123123,
          count: 123
        }
      ]
    }
  },
  methods: {
    // 返回顶部
    back () {
      let scrollTop = this.$refs.products.scrollTop
      let steep = scrollTop / 2000
      let timer = setInterval(() => {
        scrollTop -= steep
        steep += 5
        if (scrollTop <= 0) {
          clearInterval(timer)
        }
        this.$refs.products.scrollTop = scrollTop
      }, 20)
    },
    // 获取滚动距离
    getScroll (e) {
      this.scrollTop = e.target.scrollTop
    }
  },
  watch: {

  },
  components: {
    NavBar,
    Product,
    Bottom,
    ShortSwiper
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  position: relative;
  .back {
    position: absolute;
    right: 0.01rem;
    bottom: 0.8rem;
    width: 1.07rem;
  }
  .container {
    flex: 1;
    background: rgb(238, 238, 238);
    padding: 0.15rem;
    overflow: scroll;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    .products-swiper {
      position: absolute;
      top: 0.2rem;
      left: 0.2rem;
    }
    .over {
      font-size: 0.24rem;
      color: #bbb;
      padding: 0.3rem 0;
      text-align: center;
      width: 100%;
    }
  }
}
</style>
