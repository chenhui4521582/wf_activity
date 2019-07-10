<template>
  <div class="pop-window">
    <div class="pop-mask" @touchmove.prevent></div>
    <div class="bonus-success" :class="{plus:type==2}">
      <div class="img" v-if="type">
        <img src="../images/package/bonus2.png" alt="" v-if="type==3" style="max-width: 50%">
        <img src="../images/package/fen1.png" alt="" v-else-if="type==4" style="max-width: 70%">
        <img src="../images/package/leaf.png" alt="" v-else style="max-width: 70%">
      </div>
      <span class="title" v-if="type!=2">{{awardsname}}领取成功</span>
      <span class="title" v-else>{{awardsname.split(';')[2]}}到账</span>
      <div class="info">
        <div class="desc" v-if="type==2">
          <p><i>{{awardsname.split(';')[0]}}</i>连续登录<br>可领完<i>全部{{awardsname.split(';')[1]}}</i>加赠金叶子</p>
        </div>
        <div class="close" @click="close">好的</div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    data() {
      return {
      }
    },
    props:{
      type:{
        type: Number,
        default:0//1.签到送叶子 2.加赠送叶子 3.任务积分领红包 4.游戏任务领积分
      },
      awardsname:{
        type:String,
        default: ''
      }
    },
    methods: {
      close() {
        this.$emit('close')
      }
    },
    mounted() {
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
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 4.9rem;
    height:5.52rem;
    background: url("../images/package/pop1.png");
    background-size: 100% 100%;
    z-index: 11;
    &.plus{
      background: url("../images/package/pop2.png");
      background-size: 100% 100%;
    }
    .img{
      position: absolute;
      top: 1.05rem;
      left: 1.7rem;
      right: 1.75rem;
      height: 1.45rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .title {
      position: absolute;
      top: 2.73rem;
      left:0;
      right:0;
      margin: auto;
      font-size:.3rem;
      font-weight:bold;
      color:rgba(84,52,20,1);
      text-align: center;
    }
    .info{
      width: 100%;
      position: absolute;
      top:3.83rem;
      bottom:.39rem;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
    }
    .desc {
      font-size: .24rem;
      font-weight:bold;
      color:#EADDC5;
      line-height: .3rem;
      i{
        color:#FF2323
      }
    }
    .close {
      width: 2.63rem;
      height: .58rem;
      line-height:.58rem;
      text-align: center;
      font-size:.27rem;
      font-weight:bold;
      color:rgba(18,19,26,1);
      background: url("../images/package/pop_btn.png");
      background-size: 100% 100%;
    }
  }
</style>
