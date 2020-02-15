<template>
  <section class="current-product-list">
    <div class="header">
      <div class="header-left">
        <img class="gift"
          src="../assets/box.png"
          alt="">
        <span>盲盒明星奖品</span>
      </div>
      <div></div>
      <a href="#/allProducts"
        @click="moreAwards()">更多奖品>></a>
    </div>
    <Swiper :is-guide="show" />
  </section>
</template>

<script>
/* eslint-disable no-undef */
import { hotAwardsList } from '../../../apis/products';
import Swiper from './prodcut-list'

export default {
  name: '',
  components: { Swiper },
  data () {
    return {
      products: [],
      productStyles: {
        width: `${this.wrapWidth}px`,
        left: 0
      },
      copyStyles: {
        width: `${this.wrapWidth}px`,
        left: 0
      },
      wrapWidth: 0,
      productTimer: null
    }
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    // this.getProductInfo()
  },
  methods: {
    async getProductInfo () {
      const res = await hotAwardsList()
      const { data } = res.data
      this.products = data || []
      this.$nextTick(() => {
        this.wrapWidth =
          this.$refs.productDivWraper &&
          this.$refs.productDivWraper.offsetWidth
        // this.newProductLogic()
      })
    },
    moreAwards () {
      GLOBALS.marchSetsPoint('A_H5PT0225002541') // H5平台-盲盒页面-更多奖品点击
    },
    newProductLogic () {
      this.$nextTick(() => {
        let productUl = document.getElementById('productUl')
        let nodes = document.getElementById('copyProductUl')
        let liNodes = this.$refs.productLi
        nodes.innerHTML = productUl.innerHTML

        let offsetWidth = 0

        liNodes &&
          liNodes.map((item, index) => {
            offsetWidth += item.offsetWidth + 1
          })

        // 设置UL宽度
        this.productStyles.width = `${offsetWidth}px`
        this.copyStyles.width = `${offsetWidth}px`
        this.copyStyles.left = `${offsetWidth}px` // 设置拷贝ul初始位置
        let x = 0
        let fun = () => {
          this.productStyles.left = `${x}px`
          this.copyStyles.left = `${x + parseInt(offsetWidth)}px`
          x--
          if (x + parseInt(offsetWidth) === 0) {
            x = 0
          }
        }
        this.productTimer = setInterval(fun, 80)
      })
    }
  },
  destroyed () {
    clearInterval(this.productTimer)
  }
}
</script>

<style lang="less" scoped>
@keyframes bounce {
  25% {
    transform: rotate(-10deg) scale(1.5);
  }
  50% {
    transform: rotate(0deg) scale(1);
  }
  75% {
    transform: rotate(10deg) scale(1.5);
  }
  100% {
    transform: rotate(0deg) scale(1);
  }
}

.current-product-list {
  width: 7.05rem;
  padding: 0.18rem;
  padding-top: 0.3rem;
  margin: 0 auto;
  color: #fff;
  font-size: 0.24rem;
  max-width: 100vw;
  box-sizing: border-box;
  overflow: hidden;
  .gift {
    animation: bounce 0.9s linear 2;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.3rem;
    padding-left: 0.5rem;
    .header-left {
      display: flex;
      align-items: center;
      .back {
        padding: 0 0.15rem 0 0.09rem;
        line-height: 0.45rem;
        font-size: 0.24rem;
        color: #fff;
        border: 1px solid #fff;
        border-left: none;
        border-top-right-radius: 0.23rem;
        border-bottom-right-radius: 0.23rem;
      }
      img {
        width: 0.22rem;
        height: 0.22rem;
        margin-left: 0.15rem;
        margin-right: 0.06rem;
      }
    }
    a {
      color: #fee994;
    }
  }
  .product-list-wrapper {
    position: relative;
    box-sizing: border-box;
    height: 1.12rem;
    box-sizing: border-box;
    overflow: hidden;
  }

  ul {
    position: absolute;
    top: 0;
    height: 1.27rem;
    overflow: hidden;
    li {
      float: left;
      overflow: auto;
      white-space: nowrap;
      transition: all 50ms linear;
      text-align: center;
      div {
        padding-bottom: 0.3rem;
        box-sizing: border-box;
        position: relative;
        max-width: 1.74rem;
        min-width: 1.74rem;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 1.15rem;
        margin: 0 0.16rem;
        padding-top: 0.04rem;
        background: #6e7588;
        box-sizing: border-box;
        border-radius: 0.1rem;
        font-size: 0.18rem;
        img {
          max-height: 100%;
          max-width: 100%;
          display: block;
          margin: 0 auto;
          border-radius: 0.1rem;
        }
        span {
          position: absolute;
          display: block;
          z-index: 8;
          margin-top: -0.3rem;
          text-align: center;
          bottom: 0;
          left: 0;
          right: 0;
          height: 0.3rem;
          line-height: 0.3rem;
          padding: 0 0.1rem;
          background: #f2db8f;
          color: #2a2e3a;
          overflow: hidden;
          text-overflow: ellipsis;
          box-sizing: border-box;
          border-radius: 0 0 0.1rem 0.1rem;
        }
      }
    }
  }
}
</style>
