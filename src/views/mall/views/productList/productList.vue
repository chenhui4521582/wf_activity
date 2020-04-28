<template>
  <div class="product-list">
    <!-- <Header title="话费券当钱花"/> -->
    <!-- banner -->
    <div class="banner">
      <img src="./img/banner.png" alt="">
    </div>
    <!-- back 按钮 -->
    <div class="back-btn" @click="backHome">
      <img src="./img/back.png" alt="">
    </div>
    <!-- rule 按钮 -->
    <div class="rule-btn" @click="openRule">购买须知</div>
    <!-- order 按钮 -->
    <div class="order-btn" @click="jumpMyOrder">
      <img src="./img/order-btn.png" alt="">
    </div>
    <!-- container -->
    <div class="container">
      <!-- 导航条 -->
      <div class="nav">
        <div class="nav-item" v-for="(item, index) in list" :key="index"
          :class="{'active': currentIndex == index}" @click="handerClick(index)">
          {{item.categoryName || ''}}</div>
      </div>
      <!-- 列表 -->
      <div class="list">
        <list-item v-for="(item, index) in productList" :key="index" :item="item" />
      </div>
    </div>
    <!-- rule -->
    <rule v-model="showRule" />
  </div>
</template>
<script>
import { getProductList } from '../../services/product'
import _get from 'lodash.get'
import ListItem from './components/listItem'
import Rule from './components/rule'
export default {
  name: 'productList',
  data: () => ({
    list: [],
    currentIndex: 0,
    showRule: false
  }),
  components: {
    ListItem,
    Rule
  },
  computed: {
    productList () {
      return _get(this.list[this.currentIndex], 'productList', {})
    }
  },
  methods: {
    backHome () {
      window.location.href = 'https://wap.beeplaying.com/xmWap/'
    },
    handerClick (index) {
      this.currentIndex = index
    },
    openRule () {
      this.showRule = true
    },
    jumpMyOrder () {
      this.$router.push({
        name: 'order'
      })
    },
    /** 获取商品列表 **/
    _getProductList () {
      getProductList().then(res => {
        const { code, data, message } = _get(res, 'data')
        if (code == 200) {
          this.list = _get(res, 'data.data.categoryList', [])
        }
      })
    }
  },
  mounted () {
    this._getProductList()
    GLOBALS.marchSetsPoint('P_H5PT0276', {
      source_address: navigator.Referer
    })
  }
}
</script>
<style lang="less" scoped>
* {
  box-sizing: border-box;
}
img {
  width: 100%;
  height: 100%;
  vertical-align: top;
}
.product-list {
  position: relative;
  padding-top: 3.28rem;
  height: 100vh;
  background: #bd191a;
  .banner {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
    width: 100%;
    height: 3.58rem;
  }
  .back-btn {
    position: absolute;
    left: 0;
    top: 0.3rem;
    z-index: 2;
    width: 0.71rem;
    height: 0.56rem;
  }
  .rule-btn {
    position: absolute;
    right: 0.3rem;
    top: 0.3rem;
    z-index: 2;
    width: 1.3rem;
    height: 0.4rem;
    text-align: center;
    line-height: 0.42rem;
    font-size: 0.22rem;
    color: #ffe79f;
    font-weight: bold;
    background: #d03142;
    border-radius: 0.2rem;
  }
  .order-btn {
    position: fixed;
    right: 0.2rem;
    bottom: 0.33rem;
    z-index: 3;
    width: 1.2rem;
    height: 1.2rem;
  }
  .container {
    position: relative;
    z-index: 2;
    height: 100%;
    .nav {
      display: flex;
      justify-content: center;
      background: linear-gradient(
        0deg,
        rgba(255, 55, 55, 0.98),
        rgba(200, 34, 34, 0.98)
      );
      .nav-item {
        flex: 1;
        padding: 0 0.3rem;
        height: 0.7rem;
        line-height: 0.72rem;
        text-align: center;
        font-size: 0.24rem;
        color: #ffc5c5;
        &.active {
          background: linear-gradient(
            0deg,
            RGBA(255, 212, 143, 1),
            RGBA(254, 163, 5, 1)
          );
          color: #ea2e2f;
          font-size: 0.28rem;
          font-weight: 800;
          line-height: 0.74rem;
        }
      }
    }
    .list {
      padding: 0.26rem 0.3rem;
      position: absolute;
      top: 0.7rem;
      left: 0;
      right: 0;
      bottom: 0;
      overflow-x: hidden;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
    }
  }
}
</style>