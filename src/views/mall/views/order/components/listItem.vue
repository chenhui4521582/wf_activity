<template>
  <div class="order-item">
    <div class="wrap">
      <div class="order-img">
        <img :src="item.img | filter" alt="">
      </div>
      <div class="desc">
        <div class="group offset">
          <div class="name">{{item.name}}</div>
          <div class="price">¥{{item.price.toFixed(2)}}</div>
        </div>
        <div class="group flex-end">
          <div class="specification">
            <p>所选型号</p>
            <p>512G</p>
          </div>
          <div class="number">x{{item.number}}</div>
        </div>
      </div>
    </div>
    <div class="practial">
      合计：30话费券+¥129.00
    </div>
    <!-- 待付款  status == 1 -->
    <div class="obligation" v-if="item.status == 1">
      <div class="white-btn cancel-btn">取消订单</div>
      <div class="red-btn comfirm-btn">付款</div>
    </div>
    <!-- 待发货 status == 2 -->
    <div class="send" v-if="item.status == 2">
      商品将在7天内发货，请耐心等待
    </div>
    <!-- 已发货 status == 3 -->
    <div class="shipped" v-if="item.status == 3">
      <div class="white-btn check-btn">查看物流</div>
      <div class="red-btn comfirm-btn">确认收货</div>
    </div>
    <!-- 已完成 status == 4-->
    <div class="success" 
      v-if="item.status == 4" 
      :class="{cancel: isCancel(item), refund: isRefund(item)}"
    >
      <!-- 退款 -->
      <template v-if="isRefund(item)">
        <div class="icon"></div>
      </template>
      <!-- 订单取消 -->
      <template v-else-if="isCancel(item)">
        <div class="icon"></div>
      </template>
      <!-- 没有评论过 -->
      <template v-else-if="item.evaluation == 0">
        <div class="white-btn  buy-btn">再次购买</div>
        <div class="red-btn evaluation-btn">立即评价</div>
      </template>
      <!-- 评论过 -->
      <template v-else-if="item.evaluation == 1">
        <div class="white-btn check-evaluation">查看评价</div>
        <div class="red-btn buy-btn">再次购买</div>
      </template>
    </div>
  </div>  
</template>
<script>
export default {
  name: 'orderItem',
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    isCancel (item) {
      if(item.cancel == 1){
        return true
      }
      return false
    },
    isRefund (item) {
      if(item.refund == 1){
        return true
      }
      return false
    }
  }
}
</script>
<style lang="less" scoped>
.order-item {
  margin-bottom: .2rem;
  padding: .3rem .2rem .36rem .3rem;
  border-radius: .16rem;
  background: #fff;
  .wrap {
    margin-bottom: .2rem;
    display: flex;
    justify-content: space-between;
    .order-img {
      margin-right: .16rem;
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
        font-size: .24rem;
        &.offset {
          margin-bottom: .15rem;
        }
        &.flex-end {
          align-items: flex-end;
          p {
            color: #BBBBBB;
            &:first-child {
              font-size: .2rem;
            }
            &:last-child {
              font-size: .24rem;
            }
          }
        }
        .number {
          font-size: .24rem;
          color: #888888;
        }
      }
      
    }
  }
  .practial {
    margin-bottom: .2rem;
    text-align: right;
  }
  .white-btn {
    margin-right: .2rem;
    width: 1.2rem;
    height: .42rem;
    line-height: .44rem;
    text-align: center;
    color: #FF4141;
    border-radius: .1rem;
    background: #F0F0F0;
  }
  .red-btn {
    width: 1.2rem;
    height: .42rem;
    line-height: .44rem;
    text-align: center;
    color: #FFFFFF;
    border-radius: .1rem;
    background: #FF4141;
  }
  .obligation {
    display: flex;
    justify-content: flex-end;
    font-size: .24rem;
  }
  .send {
    text-align: right;
    color: #FF7800;
    font-size: .24rem;
    line-height: 1.2;
  }
  .shipped {
    display: flex;
    justify-content: flex-end;
    font-size: .24rem;
  }
  .success {
    display: flex;
    justify-content: flex-end;
    font-size: .24rem;
    .check-evaluation {
      color: #FF7800;
    }
  }
}
</style>