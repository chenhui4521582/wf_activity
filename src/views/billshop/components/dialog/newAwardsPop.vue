<template>
  <main>
    <div class="mask"></div>
    <template v-if="!flag">
      <img class="shine" src="./image/shine.png" alt="">
      <div class="content-box">
        <img class="bg" src="./image/bg.png" alt="">
        <div class="content">
          <slot></slot>
          <div class="btn">
            <div class="btn1" @click="historygo">再换一个</div>
            <div class="btn2" @click="close">收下了</div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="content-box">
        <img class="bg" src="./image/bg.png" alt="">
        <div class="content">
          <slot></slot>
          <div class="btn">
            <div class="btn1" @click="historygo">再换一个</div>
            <div class="btn2" @click="close">收下了</div>
          </div>
        </div>
      </div>
    </template>
  </main>
</template>

<script>
  export default {
    props: {
      flag:{
        type:Number,
        default:0//0 表示中奖弹窗 1表示展示已发奖弹窗33
      }
    },
    methods: {
      close(){
        this.$emit('close')
      },
      historygo(){
        history.go(-1)
      }
    },
    mounted() {
    },
  }
</script>

<style lang='less' scoped>
  * {
    box-sizing: border-box;
  }

  .mask {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .shine {
    position: fixed;
    z-index: 11;
    width: 130%;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    animation: rotate 2s linear infinite;
  }

  .content-box {
    position: fixed;
    z-index: 12;
    width: 70%;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    text-align: center;
    .content-title {
      line-height: .5rem;
      font-size: .3rem;
      i {
        color: #FFCF52;
      }
    }
    .bg {
      width: 100%;
      display: block;
    }
    .content {
      position: absolute;
      width: 100%;
      top: 0;
      padding: .4rem 2%;
      padding-bottom: 8%;
      height: 100%;
      .title {
        height: 1.18rem;
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
      .img {
        margin: .35rem auto .16rem;
        width: 1.48rem;
        height: 1.48rem;
        background: #FFD66D;
        border-radius: .12rem;
        border: 1px solid #fff;
        .hb-icon {
          width: 1.09rem;
          height: .84rem;
          margin: 0 auto;
          display: block;
          margin-top: 10%;
        }
      }
      .awards-img {
        width: 1.48rem;
        height: 1.48rem;
      }
      .num {
        font-size: .26rem;
        text-align: center;
        margin-top: 3%;
        color: #fff;
      }
      .tips {
        margin-top: .1rem;
        font-size: .22rem;
        color: rgba(255, 255, 255,1);
        margin-bottom: .29rem;
      }
      .btn{
        display: flex;
        justify-content: space-around;
        div{
          width:1.9rem;
          height:.62rem;
          line-height:.62rem;
          text-align: center;
          border-radius:.12rem;
          font-size:.28rem;
          font-weight:bold;
          &.btn1{
            color:rgba(172,67,51,1);
            background:rgba(255,146,129,1);
          }
          &.btn2{
            color:rgba(163,76,0,1);
            background:rgba(255,207,82,1);
          }
        }
      }
      .btn-check {
        color: #A34C00;
        font-size: 14px;
        background: #FFCF52;
        width: 50%;
        font-weight: bold;
        margin: 0 auto;
        text-align: center;
        margin-top: 10%;
        padding: 3.5% 0;
        border-radius: 6px;
      }
    }

  }


  .content-box_profit {
    position: fixed;
    z-index: 12;
    width: 5.12rem;
    left: 50%;
    transform: translate(-50%, -50%);
    top: 50%;
    .content-title {
      line-height: .5rem;
      font-size: .3rem;
      i {
        color: #FFCF52;
      }
    }
    .bg {
      width: 100%;
      display: block;
    }
    .dear {
      position: absolute;
      top: 2.43rem;
      left: .95rem;
      width: 1.26rem;
      height: .28rem;
      line-height: .78rem;
      /*background: url(../../images/game2/pop_dear.png);*/
      /*background-size: 100% 100%;*/
    }
    .content {
      position: absolute;
      top: 2.86rem;
      left: .95rem;
      right: .5rem;
      bottom: 1.36rem;
      .slot {
        font-size: .24rem;
        font-weight: bold;
        color: rgba(156, 86, 11, 1);
        line-height: .26rem;
        p {
          margin-bottom: .2rem;
        }
      }
    }
    .btn-check {
      position: absolute;
      bottom: .58rem;
      left: 50%;
      transform: translateX(-50%);
      width: 2.61rem;
      height: .78rem;
      line-height: .78rem;
      text-align: center;
      /*background: url(../../images/game2/pop_btn.png);*/
      /*background-size: 100% 100%;*/
      font-size: .28rem;
      font-weight: bold;
      color: rgba(255, 249, 219, 1);
    }
  }

  .content-box_profitpre {
    position: fixed;
    z-index: 12;
    width: 5.15rem;
    left: 50%;
    transform: translate(-50%, -50%);
    top: 50%;
    .content-title {
      line-height: .5rem;
      font-size: .3rem;
      i {
        color: #FFCF52;
      }
    }
    .bg {
      width: 100%;
      display: block;
    }
    .content {
      position: absolute;
      top: 1.93rem;
      bottom: 1.36rem;
      text-align: center;
      width: 100%;
      .slot {
        font-size: .24rem;
        font-weight: bold;
        color: #6E4837;
        line-height: .26rem;
        p {
          margin-bottom: .2rem;
        }
        i {
          color: #FF2E00
        }
      }
    }
    .btn-check {
      position: absolute;
      bottom: -.73rem;
      left: 50%;
      transform: translateX(-50%);
      width: 2.56rem;
      height: .73rem;
      text-align: center;
      /*background: url(../../images/game2/playprofit_btn.png);*/
      /*background-size: 100% 100%;*/
      font-size: .28rem;
      font-weight: bold;
      color: rgba(255, 249, 219, 1);
    }
    .btn-close-profitpre {
      position: absolute;
      width: .4rem;
      height: .4rem;
      top: .1rem;
      right: .1rem;
      z-index: 12;
      /*background: url(../../images/game2/pop_close.png) no-repeat;*/
      /*background-size: 100% 100%;*/
    }
  }
</style>
