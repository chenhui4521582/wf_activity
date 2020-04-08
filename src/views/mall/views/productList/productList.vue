<template>
  <div class="product-list">
    <Header title="话费券当钱花"/>
    <!-- banner -->
    <div class="banner">
      <img src="./img/banner.png" alt="">
    </div>
    <!-- back 按钮 -->
    <div class="back-btn">
      <img src="./img/back.png" alt="">
    </div>
    <!-- rule 按钮 -->
    <div class="rule-btn" @click="openRule">购买须知</div>
    <!-- order 按钮 -->
    <div class="order-btn">
      <img src="./img/order-btn.png" alt="">
    </div>
    <!-- container -->
    <div class="container">
      <!-- 导航条 -->
      <div class="nav">
        <div class="nav-item" 
          v-for="(item, index) in nav"
          :key="index"
          :class="{'active': currentIndex == index}"
          @click="handerClick(index)"
        >{{item}}</div>
      </div>
      <!-- 列表 -->
      <div class="list">
        <list-item 
          v-for="(item, index) in list"
          :key="index"
          :item="item"
        />
      </div>
    </div>
    <!-- rule -->
    <rule v-model="showRule"/>
  </div>
</template>
<script>
import ListItem from './components/listItem'
import Rule from './components/rule'
export default {
  name: 'productList',
  data: () => ({
    nav: ['生活居家', '手机数码', '美食', '家具家电'],
    list: [
      {
        title: '话费券最高可抵100元',
        img: '/group1/M00/3F/84/CmcEHV0xhj2AMl94AABS_LcXROk239.png',
        name: 'iPhone XR 64G',
        buyNo: '300',
        price: '5632'
      },
      {
        title: '话费券最高可抵100元',
        img: '/group1/M00/3F/84/CmcEHV0xhj2AMl94AABS_LcXROk239.png',
        name: 'iPhone XR 64G',
        buyNo: '300',
        price: '5632'
      },
      {
        title: '话费券最高可抵100元',
        img: '/group1/M00/3F/84/CmcEHV0xhj2AMl94AABS_LcXROk239.png',
        name: 'iPhone XR 64G',
        buyNo: '300',
        price: '5632'
      },
      {
        title: '话费券最高可抵100元',
        img: '/group1/M00/3F/84/CmcEHV0xhj2AMl94AABS_LcXROk239.png',
        name: 'iPhone XR 64G',
        buyNo: '300',
        price: '5632'
      },
      {
        title: '话费券最高可抵100元',
        img: '/group1/M00/3F/84/CmcEHV0xhj2AMl94AABS_LcXROk239.png',
        name: 'iPhone XR 64G',
        buyNo: '300',
        price: '5632'
      },
    ],
    currentIndex: 0,
    showRule: false
  }),
  components: {
    ListItem,
    Rule
  },
  methods: {
    handerClick(index) {
      this.currentIndex = index
    },
    openRule() {
      this.showRule = true
    }
  }
}
</script>
<style lang="less" scoped>
*{
  box-sizing: border-box;
}
img {
  width: 100%;
  height: 100%;
  vertical-align: top;
}
.product-list {
  position: relative;
  padding-top: 4.19rem;
  height: 100vh;
  background: #BD191A;
  .banner {
    position: absolute;
    left: 0;
    top: .9rem;
    z-index: 1;
    width: 100%;
    height: 3.58rem;
  }
  .back-btn {
    position: absolute;
    left: 0;
    top: 1.2rem;
    z-index: 2;
    width: .71rem;
    height: .56rem;
  }
  .rule-btn {
    position: absolute;
    right: .3rem;
    top: 1.2rem;
    z-index: 2;
    width: 1.3rem;
    height: .4rem;
    text-align: center;
    line-height: .42rem;
    font-size: .22rem;
    color: #FFE79F;
    font-weight: bold;
    background: #D03142;
    border-radius: .2rem;
  }
  .order-btn {
    position: fixed;
    right: .2rem;
    bottom: .33rem;
    z-index: 3;
    width: 1.2rem;
    height: 1.2rem;
  }
  .container {
    position: relative;
    z-index: 2;
    .nav {
      display: flex;
      justify-content: center;
      background:linear-gradient(0deg,rgba(255,55,55,0.98),rgba(200,34,34,0.98));
      .nav-item {
        flex: 1;
        padding: 0 .3rem; 
        height: .7rem;
        line-height: .72rem;
        text-align: center;
        font-size: .24rem;
        color: #FFC5C5;
        &.active {
          background:linear-gradient(0deg,RGBA(255, 212, 143, 1),RGBA(254, 163, 5, 1));
          color: #EA2E2F;
          font-size: .28rem;
          font-weight:800;
          line-height: .74rem;
        }
      }
    }
    .list {
      padding: .26rem .3rem;
      position: fixed;
      top: 4.89rem;
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