<template>
  <section class="commonPop" v-if="isShowPop" @touchmove.prevent >
    <div class="pop-mask" @touchmove.prevent></div>
    <div class="content" v-if="awardInfo.status == 2">
        <img class="img_title" src="../images/pic_later.png" />
        <img class="img_sad" src="../images/pic_sad.png" />
        <div class="pnl_awardTime">
            {{awardInfo.period}}期奖励瓜分时间：<br/>
            报名次日 00:00 - 24:00<br/>
            <span>要记得每天来看看哟</span>
        </div>
        <a class="btn_sign" @click="closePop()" v-if="awardInfo.apply && $parent.activityInfo.state==1">今日已付费，打卡成功！</a>
        <a class="btn_sign" @click="closePop()" v-else-if="$parent.activityInfo.state==2">确认</a>
        <a class="btn_sign" v-else href="/xmWap/#/payment/" @click="event('A_H5PT0238002763')">不服气！马上报名今日打卡</a>
        <div class="btn_close" @click="closePop()"></div>
    </div>
    <div class="content" v-if="awardInfo.status == 1">
        <img class="img_title" src="../images/pic_success.png" />
        <div class="red_bag">
            <div class="price"><b>{{awardInfo.amount}}</b>元</div>
        </div>
        <a class="btn_sign" @click="closePop()" v-if="awardInfo.apply && $parent.activityInfo.state==1">今日已付费，打卡成功！</a>
        <a class="btn_sign" @click="closePop()" v-else-if="$parent.activityInfo.state==2">确认</a>
        <a class="btn_sign" v-else @click="event('A_H5PT0238002762')" href="/xmWap/#/payment/">马上报名明日打卡瓜分</a>
        <div class="btn_close" @click="closePop()"></div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'pop',
  data () {
    return {
     
    }
  },
  props: {
    awardInfo:{
      type: Object,
      default:{}
    },
    isShowPop: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closePop(){
      this.$parent.isShowPop = false;
    },
    event(id){
      GLOBALS.marchSetsPoint(id);
      this.closePop();
    },
  },
  mounted () {
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.commonPop {
  .pop-mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.55);
    z-index: 3;
  }
  
  .content{
      position: fixed;
      width:5.6rem;
      height:8.69rem;
      left:0.8rem;
      top:1.28rem;
      background:url('../images/bg_dialog.png') no-repeat;
      background-size:cover;
      z-index: 4;
      .btn_close
      {
        position: absolute;
         width: 0.66rem;
         height: 0.66rem;
         border-radius:50%;
         left: 2.5rem;
         bottom: -1rem;
         background:url('../images/icon_close.png') #FE7607 no-repeat;
         background-size:0.33rem 0.33rem;
         background-position: center center;
      }
      .img_title
      {
          display: block;
          height:0.56rem;
          margin: 2.89rem auto 0 auto;
      }
      .img_sad
      {
          display: block;
          height: 1.85rem;
          margin: 0.25rem auto 0 auto;
      }
      .pnl_awardTime
      {
          font-size:0.3rem;
          line-height: 0.42rem;
          color:#333;
          text-align: center;
          span{
              color:#FE7537;
          }
      }
      .btn_sign
      {
          background: url('../images/btn_red_long.png') no-repeat;
          background-size:cover;
          width:4.4rem;
          height:0.86rem;
          text-align: center;
          font-size:0.32rem;
          line-height: 0.86rem;
          color:#fff;
          margin: 0.44rem auto 0 auto;
          display: block;
      }
      .red_bag
      {
          background: url('../images/bg_red_bag.png') no-repeat;
          background-size: cover;
          width:2.43rem;
          height:2.92rem;
          margin:0.38rem auto 0 auto;
          overflow: hidden;
          .price{
              margin-top:1.47rem;
              color:#fff;
              font-size: 0.3rem;
              font-weight: bold;
              text-align: center;
              b{
                  font-size: 0.6rem;
              }
          }
      }
  }
}
</style>
