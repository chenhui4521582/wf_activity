<template>
  <div class="pop-window">
    <div class="pop-mask" @touchmove.prevent></div>
    <transition name="fade">
      <!--抽中弹窗-->
      <div class="bonus-success" v-if=" type==1&&finalAwards">
        <div class="desc">
          <div class="info01">抽中<i>加赠{{finalAwards.ratio}}%礼包</i></div>
          <div class="info02">
            <div class="title">
              <template v-if="finalAwards.welfare.giveAmount">
                赠{{transUint(finalAwards.welfare.giveAmount||0)}}金叶子
              </template>
            </div>
            <img :src="finalAwards.welfare.icon|filter" alt="">
          </div>
          <div class="info03">{{finalAwards.welfare.content}}</div>
          <div class="info04_btn" @click="gotoshop(finalAwards.welfare)">¥{{finalAwards.welfare.price}}</div>
          <div class="info05">
            加赠的金叶子分<i>7天到账</i>，购买成功后加赠优惠券<br>
            (优惠券可购买任意礼包）
          </div>
        </div>
        <div class="close" @click="close()"></div>
      </div>
      <div class="bonus-success type1" v-if="type==2&&detail">
        <div class="desc">
          <div class="info01">{{transUint(detail.productAmount)}}金叶子</div>
          <div class="info03"><img src="../imgs/pop/plus.png" alt="">{{transUint(detail.onceAwardsAmount)}}加赠金叶已发送</div>
          <div class="info04_btn" @click="gotocoupons">前往查看</div>
        </div>
        <div class="close" @click="close()"></div>
      </div>
    </transition>
  </div>
</template>
<script type="text/javascript">
  export default {
    data() {
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
      isRight() {
        let reg = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/
        return this.telPhone && reg.test(this.telPhone)
      },
    },
    methods: {
      transUint (awards) {
        let finish = awards > 10000 ? parseFloat((awards / 10000).toFixed(1)) + '万' : awards
        return finish
      },
      close() {
        this.$emit('close')
      },
      async gotoshop(item){
        localStorage.setItem('originDeffer', window.location.href+'?flag=1')
        GLOBALS.marchSetsPoint('A_H5PT0074001697', { recharge_rmb: item.price, product_id: item.bizId,product_name:item.name })
        localStorage.setItem('JDD_PARAM', JSON.stringify(item))
        if (window.linkUrl.getBackUrlFlag(this.channel) == 'bdWap' && this.channel != '100001') { // 好看、全民小视频
          location.href = 'https://wap.beeplaying.com/payment/#/bdPayment'
        } else {
          location.href = 'https://wap.beeplaying.com/payment/#/payment'
        }
      },
      async gotocoupons(){
        await GLOBALS.marchSetsPoint('A_H5PT0074001699')
        if(window.linkUrl.getBackUrlFlag(localStorage.getItem('APP_CHANNEL'))=='xmWap'){
          location.href = 'https://wap.beeplaying.com/xmWap/#/my/coupon'
        }else{
          location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL'), '', false, true, '#/couponlist')
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
    background: rgba(0, 0, 0, .7);
    z-index: 10;
  }

  .bonus-success {
    position: fixed;
    top: 40%;
    left: 48%;
    transform: translate(-50%, -50%);
    width: 5.77rem;
    height: 8.23rem;
    background: url("../imgs/pop/bg.png");
    background-size: 100% 100%;
    z-index: 11;
    .desc {
      position: absolute;
      top: 3.16rem;
      left: .2rem;
      right: .2rem;
      font-size: .24rem;
      font-weight: 400;
      color: rgba(255, 225, 229, 1);
      line-height: .32rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .info01{
        font-size:.48rem;
        font-weight:bold;
        color:rgba(255,255,255,1);
        i{
          color: #F8D750;
        }
        margin-bottom: .17rem;
      }
      .info02{
        width: 2.11rem;
        height: 2.11rem;
        background: url("../imgs/pop/package_bg.png") no-repeat;
        background-size: 100% 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: .2rem;
        .title{
          height: .38rem;
          line-height:.38rem;
          margin-bottom: .1rem;
          font-weight:bold;
          color:rgba(184,91,16,1);
        }
        img{
          width: 1.58rem;
          height: 1.58rem;
        }
      }
      .info03{
        font-size:.3rem;
        font-weight:400;
        color:rgba(248,215,80,1);
        margin-bottom: .2rem;
      }
      .info04_btn{
        width: 2.3rem;
        height: .61rem;
        line-height: .61rem;;
        text-align: center;
        font-size:.33rem;
        font-weight:bold;
        color:rgba(137,66,24,1);
        background: url("../imgs/pop/btn.png") no-repeat;
        background-size: 100% 100%;
        margin-bottom: .14rem;
      }
      .info05{
        font-size:.18rem;
        font-weight:400;
        color:rgba(194,151,255,1);
        text-align: center;
        i{
          color:#FFDC73
        }
      }
    }
    .close {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -.8rem;
      width: .57rem;
      height: .57rem;
      background: url("../imgs/pop/close.png");
      background-size: 100% 100%;
    }
    &.type1{
      width: 6.04rem;
      background: url("../imgs/pop/popbg1.png");
      background-size: 100% 100%;
      line-height: 0;
      .desc{
        top:3.5rem;
        left: .9rem;
        right: .5rem;
        .info01,.info03{
          font-size:.3rem;
          font-weight:400;
          color:rgba(248,215,80,1);
          margin-bottom: .1rem;
          img{
            width: .3rem;
            height: .3rem;
            margin-right: .09rem;
          }
        }
        .info04_btn{
          margin-top: 2.3rem;
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
