<template>
  <div class="pop-window">
    <div class="pop-mask" @touchmove.prevent></div>
    <transition name="fade">
      <!--抽中弹窗-->
      <div class="bonus-success" v-if="type == 1 && finalAwards">
        <div class="desc">
          <div class="info01">
            抽中<i>加赠{{ finalAwards.ratio }}%礼包</i>
          </div>
          <div class="info02">
            <div class="title">
              <template v-if="finalAwards.welfare.giveAmount">
                赠{{ transUint(finalAwards.welfare.giveAmount || 0) }}金叶子
              </template>
            </div>
            <img :src="finalAwards.welfare.icon | filter" alt="" />
          </div>
          <div class="info03">{{ finalAwards.welfare.content }}</div>
          <div class="info04_btn" @click="gotoshop(finalAwards.welfare)">
            ¥{{ finalAwards.welfare.price }}
          </div>
          <div class="info05">
            加赠的金叶子分<i>7天到账</i>，购买成功后加赠优惠券<br />
            (优惠券可购买任意礼包）
          </div>
        </div>
        <div class="close" @click="close()"></div>
      </div>
      <div class="bonus-success type1" v-if="type == 2 && detail">
        <div class="pay-tips">支付成功</div>
        <div class="desc">
          <div class="info01">{{ transUint(detail.productAmount) }}金叶子</div>
          <div class="info03">
            <img src="../imgs/pop/plus.png" alt="" />{{
              transUint(detail.onceAwardsAmount)
            }}加赠金叶已发送
          </div>
          <div class="discount-award">
            <div class="discount-tips">额外送你8.5折优惠券(7天)</div>
            <div class="coupons"></div>
          </div>
          <div class="info04_btn" @click="gotocoupons">前往查看</div>
          <div class="award-tips">
            优惠券已发放到你的账户<br />(优惠券可购买任意礼包）
          </div>
        </div>
        <div class="close" @click="close()"></div>
      </div>
    </transition>
  </div>
</template>
<script type="text/javascript">
export default {
  data () {
    return {
      telPhone: ''
    }
  },
  props: {
    type: {
      type: Number,
      default: '0'
    },
    detail: {
      type: Object,
      default: null
    },
    finalAwards: {
      type: Object,
      default: null
    }
  },
  computed: {
    isRight () {
      let reg = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/
      return this.telPhone && reg.test(this.telPhone)
    }
  },
  methods: {
    transUint (awards) {
      let finish =
        awards > 10000
          ? parseFloat((awards / 10000).toFixed(1)) + '万'
          : awards
      return finish
    },
    close () {
      this.$emit('close')
    },
    async gotoshop (item) {
      localStorage.setItem('originDeffer', window.location.href + '?flag=1')
      GLOBALS.marchSetsPoint('A_H5PT0074001697', {
        recharge_rmb: item.price,
        product_id: item.bizId,
        product_name: item.name
      })
      localStorage.setItem('JDD_PARAM', JSON.stringify(item))
      localStorage.setItem('payment', JSON.stringify(item))
      location.href =
        'https://wap.beeplaying.com/xmWap/#/payment/paymentlist?isBack=true'
    },
    async gotocoupons () {
      await GLOBALS.marchSetsPoint('A_H5PT0074001699')
      if (
        window.linkUrl.getBackUrlFlag(localStorage.getItem('APP_CHANNEL')) ==
        'xmWap'
      ) {
        location.href = 'https://wap.beeplaying.com/xmWap/#/my/coupon'
      } else {
        location.href = window.linkUrl.getBackUrl(
          localStorage.getItem('APP_CHANNEL'),
          '',
          false,
          true,
          '#/couponlist'
        )
      }
    }
  }
}
</script>
<style lang="less" scoped>
.pop-window {
  position: relative;
  z-index: 11;
  width: 100%;
  height: 100%;
  min-height: 100%;
  max-height: 100%;
  .pop-close {
    width: 0.68rem;
    height: 0.68rem;
    position: absolute;
    right: -0.34rem;
    top: -0.34rem;
  }
}

.pop-mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 10;
}

.bonus-success {
  position: fixed;
  top: 40%;
  left: 48%;
  transform: translate(-50%, -50%);
  width: 5.77rem;
  height: 8.23rem;
  background: url('../imgs/pop/pop-bg.png');
  background-size: 100% 100%;
  z-index: 11;
  .pay-tips {
    height: 0.42rem;
    color: #fff;
    text-align: center;
    font-size: 0.42rem;
    line-height: 0.42rem;
    margin-top: 3.14rem;
    font-weight: bold;
  }
  .desc {
    position: absolute;
    top: 3.16rem;
    left: 0.6rem;
    right: 0.6rem;
    font-size: 0.24rem;
    font-weight: 400;
    color: rgba(255, 225, 229, 1);
    line-height: 0.32rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .info01 {
      font-size: 0.48rem;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      i {
        color: #f8d750;
      }
      margin: 0.2rem 0 0.17rem 0;
    }
    .info02 {
      width: 2.11rem;
      height: 2.11rem;
      background: url('../imgs/pop/award-bg.png') no-repeat;
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 0.2rem;
      .title {
        height: 0.38rem;
        line-height: 0.38rem;
        margin-bottom: 0.1rem;
        font-weight: bold;
        color: rgba(184, 91, 16, 1);
      }
      img {
        width: 1.58rem;
        height: 1.58rem;
      }
    }
    .info03 {
      font-size: 0.3rem;
      font-weight: 400;
      color: rgba(248, 215, 80, 1);
      margin-bottom: 0.2rem;
    }
    .discount-award {
      position: absolute;
      width: 3.12rem;
      height: 1.68rem;
      background-image: url('../imgs/pop/discount-bg.png');
      background-size: cover;
      .discount-tips {
        height: 0.41rem;
        white-space: nowrap;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: #b85b10;
        text-align: center;
        line-height: 0.41rem;
      }
      .coupons {
        height: 0.93rem;
        width: 2.3rem;
        margin: 0.17rem auto 0;
        background-image: url('../imgs/pop/coupon.png');
        background-size: cover;
      }
    }
    .info04_btn {
      width: 2.3rem;
      height: 0.61rem;
      line-height: 0.61rem;
      text-align: center;
      font-size: 0.33rem;
      font-weight: bold;
      color: rgba(137, 66, 24, 1);
      background: url('../imgs/pop/btn.png') no-repeat;
      background-size: 100% 100%;
    }
    .award-tips {
      margin-top: 0.1rem;
      width: 1.86rem;
      height: 0.4rem;
      color: #ffc4de;
      font-size: 0.18rem;
      text-align: left;
      white-space: nowrap;
    }
    .info05 {
      font-size: 0.18rem;
      font-weight: 400;
      color: #ffc4de;
      text-align: center;
      i {
        color: #ffdc73;
      }
    }
  }
  .close {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -0.8rem;
    width: 0.57rem;
    height: 0.57rem;
    background: url('../imgs/pop/close.png');
    background-size: 100% 100%;
  }
  &.type1 {
    width: 6.04rem;
    background: url('../imgs/pop/pop-bg.png');
    background-size: 100% 100%;
    line-height: 0;
    .desc {
      top: 3.5rem;
      left: 0;
      right: 0;
      .info01,
      .info03 {
        font-size: 0.3rem;
        font-weight: 400;
        color: rgba(248, 215, 80, 1);
        margin-bottom: 0.1rem;
        img {
          width: 0.3rem;
          height: 0.3rem;
          margin-right: 0.09rem;
          vertical-align: bottom;
        }
      }
      .info04_btn {
        margin-top: 2rem;
      }
    }
  }
}
.fade-enter-active {
  animation: fadeAnimation 0.3s ease-in-out;
}
@keyframes fadeAnimation {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
