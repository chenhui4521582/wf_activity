<template>
  <main>
    <div class="mask"></div>
    <div class="content-box">
      <img class="bg" src="../pages/images/pop/lottery_prize.png" alt="">
      <div class="content">
        <div class="img">
          <img :src="lotteryParmas && lotteryParmas.awardImg|filter">
          <p style="font-size: .5rem;font-weight:bold; color:rgba(254,90,1,1);">{{lotteryParmas &&lotteryParmas.awardName}}</p>
          <p class="tips">答应我，明天再来转盘领奖哦~</p>
        </div>
        <div class="btn-check" @click="close"></div>

      </div>
    </div>
    <div class="btn-close" @click="close"></div>

  </main>
</template>

<script type="text/javascript">
  export default {
    props: {
      lotteryParmas: {
        default: ''
      }
    },
    methods: {
      close() {
        this.$emit('close');
      }
    }
  }
</script>

<style lang='less' scoped>
  * {
    box-sizing: border-box;
  }

  .mask {
    z-index: 11;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.55);
  }

  .shine {
    position: fixed;
    z-index: 11;
    width: 130%;
    top: -1rem;
    left: 50%;
    margin-left: -65%;
    animation: rotate 2s linear infinite;
  }

  .content-box {
    position: fixed;
    z-index: 12;
    width: 5.7rem;
    left: 50%;
    margin-left: -2.85rem;
    top: 1.2rem;
    text-align: center;
    .content-title {
      line-height: .5rem;
      font-size: .3rem;
      i {
        color: #FFCF52;
      }
    }
    .bg {
      width: 5.7rem;
      display: block;
    }
    .content {
      position: absolute;
      width: 100%;
      top: 0;
      padding: 3rem 2% 8%;
      height: 100%;
      .title {
        height: 24px;
        display: block;
        margin: 0 auto;
      }
      .icon {
        width: 1.6rem;
        height: 1.6rem;
        margin: 0 auto;
        background: #FFD66D;
        border: 1px solid #fff;
        border-radius: 5px;
        margin-top: 10%;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 70%;
          display: block;
          margin: 0 auto;
        }
      }
      /*.img {*/
        /*margin: .35rem auto 1rem;*/
        /*!*width: 1.48rem;*!*/
        /*!*height: 1.48rem;*!*/
        /*max-width: 70%;*/
        /*max-height: 2.08rem;*/
        /*!*background: #FFD66D;*!*/
        /*!*border-radius: .12rem;*!*/
        /*!*border: 1px solid #fff;*!*/
        /*.hb-icon {*/
          /*width: 1.09rem;*/
          /*height: .84rem;*/
          /*margin: 0 auto;*/
          /*display: block;*/
          /*margin-top: 10%;*/
        /*}*/
      /*}*/
      .img{
        width: 5.22rem;
        height: 4.18rem;
        background: url("../pages/images/pop/light.png");
        background-size: 100% 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding-top: 1rem;
        box-sizing: border-box;
        margin: auto;
      }

      .num {
        font-size: .28rem;
        text-align: center;
        margin-top: 3%;
      }
      .tips {
        margin-bottom: .3rem;
        margin-top: .2rem;
        font-size: .28rem;
        font-weight:bold;
        color:rgba(254,90,1,1);
      }
      .btn-check {
        background: url("../pages/images/pop/iknow.png");
        background-size: 100% 100%;
        width: 3.86rem;
        height: 1rem;
        font-weight: bold;
        margin: 0 auto;
        text-align: center;
        padding: 3.5% 0;
      }
    }

  }

  .btn-close {
    position: fixed;
    top: 10.5rem;
    z-index: 12;
    width: .6rem;
    height: .6rem;
    left: 50%;
    margin-left: -.3rem;
    background: url(../pages/images/common/close.png);
    background-size: 100% 100%;
  }
</style>
