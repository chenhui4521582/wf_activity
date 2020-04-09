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
          @openPopup="openPopup"
          @goServices="goServices"
        />
      </div>
      <div class="empty" v-else>
        <img src="./img/empty.png" alt="">
      </div>
    </div>
    <!-- 弹框 -->
    <modal 
      v-model="modal.show" 
      :type="modal.type" 
      :title="modal.title"
      :saveText="modal.saveText"
      :closeText="modal.closeText"
      @on-save="modalCallback"
      @on-close="hideModal"
    >
      <!-- 取消订单 -->
      <template v-if="modal.status == 1">
        <div class="pannel1">
          <p>取消订单后不可恢复</p>
          <p>请确认是否取消订单</p>
        </div>
        <div class="pannel2">
          <p>若您使用了优惠券或话费券</p>
          <p>订单取消后将自动退回</p>
        </div>
      </template>
      <!-- 查看物流 -->
      <template v-if="modal.status == 2">
        <div class="logistics-No">
          <span class="label">物流单号：</span>
          <span class="value">{{logisticsNo}}</span>
        </div>
        <div class="logistics-name">
          <span class="label">承运公司：</span>
          <span class="value">{{logisticsName}}</span>
        </div>
        <div class="logistics-explain">复制快递单号进行查询</div>
        <div class="copy" slot="footer" 
          v-clipboard:copy="logisticsNo"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError">复制</div>
      </template>
      <!-- 确认收货 -->
      <template v-if="modal.status == 3">
        <div class="receipt">
          请确认您已收到货品<br>
          确认收货后状态不可再次更改
        </div>
      </template>
    </modal>
    <!-- 返回商品列表 -->
    <div class="back">
      <img src="./img/back.png" alt="">
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
        refund: 0
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
        refund: 0
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
        refund: 0
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
        refund: 1
      }
    ],
    modal: {
      show: false,
      status: 1,
      type: 1,
      title: '温馨提示',
      saveText: '再考虑下',
      closeText: '取消订单',
    },
    logisticsNo: '123123123123',
    logisticsName: '顺丰'
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
    },
    /** 关闭弹框 **/
    hideModal() {
      this.modal.show = false
      this.modal.type = 1
      this.modal.status = 0
      this.modal.title = ''
      this.modal.saveText = ''
      this.modal.closeText = ''
    },
    /** 打开弹框 **/
    openPopup(status) {
      if(status == 1) {
        this.modal.show = true
        this.modal.type = 2
        this.modal.status = status
        this.modal.title = '温馨提示'
        this.modal.saveText = '再考虑下'
        this.modal.closeText = '取消订单'
      }
      if(status == 2) {
        this.modal.show = true
        this.modal.type = 1
        this.modal.status = status
        this.modal.title = '物流详情'
        this.modal.saveText = ''
        this.modal.closeText = ''
      }
      if(status == 3) {
        this.modal.show = true
        this.modal.type = 2
        this.modal.status = status
        this.modal.title = '温馨提示'
        this.modal.saveText = '确认收货'
        this.modal.closeText = '返回'
      }
    },
    /** 弹框回调 **/
    modalCallback() {
      console.log(111)
    },
    /** 跳转客服 **/
    goServices() {
      window.location.href = 'https://wap.beeplaying.com/xmWap/#/my/customerService'
    },
    onCopy() {
      this.$toast.show({message: '复制成功'})
    },
    onError() {
      this.$toast.show({message: '复制失败'})
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
  /** 弹框样式 **/
  .pannel1 {
    margin-bottom: .1rem;
    font-size: .24rem;
    color: #888;
    text-align: center;
    p {
      line-height: .36rem;
    }
  }
  .pannel2 {
    font-size: .20rem;
    color: #BBBBBB;
    text-align: center;
    p {
      line-height: .3rem;
    }
  }
  .logistics-No {
    margin: .2rem 0 .15rem;
    font-size: .24rem;
    color: #000;
  }
  .logistics-name {
    margin-bottom: .2rem;
    font-size: .24rem;
    color: #000;
  }
  .logistics-explain {
    font-size: .2rem;
    color: #BBBBBB;
    text-align: center;
  }
  .copy {
    height: .7rem;
    width: 100%;
    line-height: .72rem;
    font-size: .24rem;
    color: #fff;
    background: #FF4141;
    border-radius: .16rem;
  }
  .receipt {
    padding: .24rem 0 .1rem;
    text-align: center;
    color: #888888;
    font-size: .24rem;
    line-height: .38rem;
  }
  .back {
    position: absolute;
    right: .24rem;
    bottom: 1.1rem;
    z-index: 2;
    width: 1.2rem;
    height: 1.2rem;
    img {
      vertical-align: top;
      width: 100%;
      height: 100%;
    }
  }
}
</style>