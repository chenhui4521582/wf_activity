<template>
  <div class="order-list">
    <Header title="我的订单"/>
    <div class="wrap">
      <div class="order-nav">
        <div class="nav-item" 
          v-for="(item, index) in nav" 
          :class="{'active': currentIndex == index}"
          :key="index"
          @click="handleClick(index)"
        >
          {{item}}
          <div class="line"></div>  
        </div>
      </div>
      <div class="list" v-if="showList">
        <order-item 
          v-for="(item, index) in list" 
          :item="item"
          :key="index" 
        />
      </div>
      <div class="empty" v-else>
        <img src="./img/empty.png" alt="">
      </div>
    </div>
  </div>  
</template>
<script>
import OrderItem from './components/listItem'
export default {
  name: 'orderList',
  data: () => ({
    nav: ['待付款', '待发货', '已发货', '已完成'],
    currentIndex: 0,
    list: [
      {
        img: '/group1/M00/3F/84/CmcEHV0xhj2AMl94AABS_LcXROk239.png',
        name: 'iPhone11 Pro',
        price: 9999,
        number: 1,
        hf: 30,
        practicalPrice: 129,
        evaluation: 0,
        status: 1,
      },
      {
        img: '/group1/M00/3F/84/CmcEHV0xhj2AMl94AABS_LcXROk239.png',
        name: 'iPhone11 Pro',
        price: 9999,
        number: 1,
        hf: 30,
        practicalPrice: 129,
        status: 2,
        evaluation: 0,
        cancel: 0
      },
      {
        img: '/group1/M00/3F/84/CmcEHV0xhj2AMl94AABS_LcXROk239.png',
        name: 'iPhone11 Pro',
        price: 9999,
        number: 1,
        hf: 30,
        practicalPrice: 129,
        status: 3,
        cancel: 0
      },
      {
        img: '/group1/M00/3F/84/CmcEHV0xhj2AMl94AABS_LcXROk239.png',
        name: 'iPhone11 Pro',
        price: 9999,
        number: 1,
        hf: 30,
        practicalPrice: 129,
        status: 4,
        evaluation: 0,
        cancel: 0,
        Refund: 0
      },
      {
        img: '/group1/M00/3F/84/CmcEHV0xhj2AMl94AABS_LcXROk239.png',
        name: 'iPhone11 Pro',
        price: 9999,
        number: 1,
        hf: 30,
        practicalPrice: 129,
        status: 4,
        evaluation: 1,
        cancel: 0,
        Refund: 0
      },
      {
        img: '/group1/M00/3F/84/CmcEHV0xhj2AMl94AABS_LcXROk239.png',
        name: 'iPhone11 Pro',
        price: 9999,
        number: 1,
        hf: 30,
        practicalPrice: 129,
        status: 4,
        evaluation: 0,
        cancel: 1,
        Refund: 0
      },
      {
        img: '/group1/M00/3F/84/CmcEHV0xhj2AMl94AABS_LcXROk239.png',
        name: 'iPhone11 Pro',
        price: 9999,
        number: 1,
        hf: 30,
        practicalPrice: 129,
        status: 4,
        evaluation: 0,
        cancel: 0,
        Refund: 1
      }
    ]
  }),
  components: {
    OrderItem
  },
  computed: {
    showList () {
      return this.list.length
    }
  },
  methods: {
    handleClick(index) {
      this.currentIndex = index
    }
  }
}
</script>
<style lang="less" scoped>
* {
  box-sizing: border-box;
}
.order-list {
  position: relative;
  overflow: hidden;
  padding-top: .9rem;
  height: 100vh;
  background: #F7F7F7;
  .wrap {
    .order-nav {
      padding: 0 .24rem;
      display: flex;
      justify-content: center;
      align-items: center;
      height: .94rem;
      .nav-item {
        padding: 0 .28rem;
        font-size: .32rem;
        color: #888888;
        &.active {
          position: relative;
          color: #000000;
          font-weight: bold;
          .line {
            position: absolute;
            left: 50%;
            bottom: -.1rem;
            transform: translate(-50%, 0);
            width: .32rem;
            height: .06rem;
            background: #FF4141;
            border-radius: .3rem;
          }
        }

      }
    }
    .list {
      position: absolute;
      padding: 0 .24rem;
      left: 0;
      right: 0;
      top: 1.84rem;
      bottom: 0;
      overflow-x: hidden;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
    }
    .empty {
      margin: 1.7rem 0 0 1.66rem;
      width: 3.38rem;
      height: 2.26rem;
      img {
        width: 3.38rem;
        height: 2.26rem;
      }
    }
  }
}
</style>