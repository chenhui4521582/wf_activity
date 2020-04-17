<template>
  <div class="order-item" @click="jumpOrderDetail">
    <div class="wrap">
      <div class="order-img">
        <img :src="item.picture | filter" alt="">
      </div>
      <div class="desc">
        <div class="group offset">
          <div class="name">{{item.name}}</div>
          <div class="price">¥{{item.payPrice.toFixed(2)}}</div>
        </div>
        <div class="group flex-end">
          <div class="specification">
            <p>规格</p>
            <p>{{item.specs}}</p>
          </div>
          <div class="number">x{{item.num || 1}}</div>
        </div>
      </div>
    </div>
    <div class="practial">
      合计：{{item.hfqPrice}}话费券 + ¥{{item.realPrice}}
    </div>
    <!-- 待付款  status == 0 -->
    <div class="obligation" v-if="item.status == 0">
      <div class="white-btn cancel-btn" @click.stop="openOrderCancal">取消订单</div>
      <div class="red-btn comfirm-btn" @click.stop="gotoPay">付款</div>
    </div>
    <!-- 付款中 status == 1 -->
    <div class="in-payment" v-if="item.status == 1">
      正在付款，请刷新页面更新订单状态
    </div>
    <!-- 待发货 status == 2 -->
    <div class="send" v-if="item.status == 2">
      商品将在7天内发货，请耐心等待
    </div>
    <!-- 已发货 status == 3 -->
    <div class="shipped" v-if="item.status == 3">
      <div class="white-btn check-btn" @click.stop="openLogistics">查看物流</div>
      <div class="red-btn comfirm-btn" @click.stop="receipt">确认收货</div>
    </div>
    <!-- 订单已完成 status == 4 -->
    <div class="evalution finish" v-if="item.status == 4">
      <div class="icon">
        <img src="../img/finish-icon.png" alt="">
      </div>
      <div class="red-btn buy-btn" @click.stop="continueBuy">再次购买</div>
      <!-- <div class="red-btn evaluation-btn" @click="goEvaluation">立即评价</div> -->
    </div>
    <!-- 订单取消 status == 5 -->
    <div class="cancel finish" v-if="item.status == 5">
      <div class="icon">
        <img src="../img/cancel-icon.png" alt="">
      </div>
      <div class="explain">注：若产生退款，请点击<span @click="goServices">联系客服</span>及时处理订单</div>
      <div class="red-btn buy-btn" @click.stop="continueBuy">再次购买</div>
    </div>
    <!-- 退款 status == 6 -->
    <div class="refund finish" v-if="item.status == 6">
      <div class="icon">
        <img src="../img/refund-icon.png" alt="">
      </div>
      <div class="red-btn buy-btn" @click.stop="continueBuy">再次购买</div>
    </div>
    <!-- 评论过 status == 7 -->
    <!-- <div class="evalution-end completion" v-if="item.status == 7">
      <div class="white-btn check-evaluation" @click="checkEvaluation">查看评价</div>
      <div class="red-btn buy-btn" @click="continueBuy">再次购买</div>
    </div> -->
  </div>
</template>
<script>
export default {
  name: 'orderItem',
  props: {
    item: {
      type: Object,
      default: () => { }
    }
  },
  data: () => ({

  }),
  methods: {
    isCancel (item) {
      if (item.cancel == 1) {
        return true
      }
      return false
    },
    isRefund (item) {
      if (item.refund == 1) {
        return true
      }
      return false
    },
    /** 去评价 **/
    goEvaluation () {
      this.$router.push({
        name: 'evaluation'
      })
    },
    /** 查看评价 **/
    checkEvaluation () {
      this.$router.push({
        name: 'evaluation'
      })
    },
    /** 去付款 **/
    gotoPay() {
      GLOBALS.marchSetsPoint('A_H5PT0276003265', {
        product_price: this.item.payPrice,
        product_id: this.item.id,
        product_name: this.item.name
      })
      let channel = localStorage.getItem('APP_CHANNEL')
      let orderInfo = {
        bizType: this.item.bizType,
        bizId: this.item.bizId,
        thirdOrderId: this.item.thirdOrderId,
        price: this.item.realPrice
      }
      localStorage.setItem('payment', JSON.stringify(orderInfo))
      let originDeffer = `//wap.beeplaying.com/activities/mall.html#/order?channel=${channel}&blindBox=true`
      localStorage.setItem('originDeffer', originDeffer)
      window.location.href = '/xmWap/#/payment/paymentlist?isBack=true'
    },
    /** 打开取消订单弹框 **/
    openOrderCancal () {
      this.$emit('openPopup', 1, this.item.id)
      GLOBALS.marchSetsPoint('A_H5PT0276003266', {
        product_price: this.item.payPrice,
        product_id: this.item.id,
        product_name: this.item.name
      })
    },
    /** 打开物流弹框 **/
    openLogistics () {
      this.$emit('openPopup', 2, null, this.item.shipInfo)
      GLOBALS.marchSetsPoint('A_H5PT0276003271')
    },
    /** 再次购买 **/
    continueBuy () {
      GLOBALS.marchSetsPoint('A_H5PT0276003270', {
        product_price: this.item.payPrice,
        product_id: this.item.id,
        product_name: this.item.name
      })
      this.$router.push({
        name: 'productDetail',
        query: {
          name: encodeURIComponent(this.item.name)
        }
      })
    },
    /** 打开确认收货弹框 **/
    receipt () {
      this.$emit('openPopup', 3, this.item.id)
    },
    /** 跳转订单详情 **/
    jumpOrderDetail () {
      this.$emit('jumpOrderDetail', this.item.id)
    },
    /** 跳转客服 **/
    goServices () {
      this.$emit('goServices')
    }
  }
}
</script>
<style lang="less" scoped>
.order-item {
  position: relative;
  margin-bottom: 0.2rem;
  padding: 0.3rem 0.2rem 0.36rem 0.3rem;
  border-radius: 0.16rem;
  background: #fff;
  .wrap {
    margin-bottom: 0.2rem;
    display: flex;
    justify-content: space-between;
    .order-img {
      margin-right: 0.16rem;
      flex-shrink: 0;
      width: 1.2rem;
      height: 1.2rem;
      img {
        vertical-align: top;
        width: 100%;
        height: 100%;
      }
    }
    .desc {
      flex: 1;
      display: flex;
      justify-content: center;
      flex-direction: column;
      .group {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #000;
        font-size: 0.24rem;
        &.offset {
          margin-bottom: 0.15rem;
        }
        &.flex-end {
          align-items: flex-end;
          p {
            color: #bbbbbb;
            &:first-child {
              margin-bottom: 0.05rem;
              font-size: 0.2rem;
            }
            &:last-child {
              font-size: 0.24rem;
            }
          }
        }
        .number {
          font-size: 0.24rem;
          color: #888888;
        }
      }
    }
  }
  .practial {
    margin-bottom: 0.2rem;
    text-align: right;
  }
  .white-btn {
    margin-right: 0.2rem;
    width: 1.2rem;
    height: 0.42rem;
    line-height: 0.44rem;
    text-align: center;
    color: #ff4141;
    border-radius: 0.1rem;
    background: #f0f0f0;
  }
  .red-btn {
    width: 1.2rem;
    height: 0.42rem;
    line-height: 0.44rem;
    text-align: center;
    color: #ffffff;
    border-radius: 0.1rem;
    background: #ff4141;
  }
  .obligation {
    display: flex;
    justify-content: flex-end;
    font-size: 0.24rem;
  }
  .send {
    text-align: right;
    color: #ff7800;
    font-size: 0.24rem;
    line-height: 1.2;
  }
  .shipped {
    display: flex;
    justify-content: flex-end;
    font-size: 0.24rem;
  }
  .finish {
    display: flex;
    justify-content: flex-end;
    font-size: 0.24rem;
    .check-evaluation {
      color: #ff7800;
    }
    & .icon {
      position: absolute;
      top: 0;
      right: 1.13rem;
      width: 1.76rem;
      height: 1.42rem;
      img {
        vertical-align: top;
        width: 100%;
        height: 100%;
      }
    }
    .explain {
      color: #bbbbbb;
      font-size: 0.2rem;
      span {
        text-decoration: underline;
        color: #5186ca;
      }
    }
  }
  .cancel {
    justify-content: space-between;
    align-items: center;
  }

  .in-payment {
    text-align: right;
    color: #ff7800;
    font-size: 0.24rem;
    line-height: 1.2;
  }
}
</style>