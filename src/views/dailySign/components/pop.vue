<template>
  <section class="commonPop" @touchmove.prevent >
    <div class="pop-mask" v-if="isShowPop" @touchmove.prevent></div>
    <div class="content" v-if="isLater">
        <img class="img_title" src="../images/pic_later.png" />
        <img class="img_sad" src="../images/pic_sad.png" />
        <div class="pnl_awardTime">
            奖励瓜分时间：<br/>
            报名次日 00:00 - 24:00<br/>
            <span>要记得每天来看看哟</span>
        </div>
        <div class="btn_sign">不服气！马上报名今日打卡</div>
    </div>
    <div class="content" v-else>
        <img class="img_title" src="../images/pic_success.png" />
        <div class="red_bag">
            <div class="price"><b>1.5</b>元</div>
        </div>
        <div class="btn_sign">马上报名明日打卡瓜分</div>
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
    isLater:false,
    isShowPop: {
      type: Boolean,
      default: false
    }
  },
  methods: {
   
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
      top:1.78rem;
      background:url('../images/bg_dialog.png') no-repeat;
      background-size:cover;
      z-index: 4;
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
