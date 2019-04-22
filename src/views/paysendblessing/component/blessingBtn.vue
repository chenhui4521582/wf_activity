<template>
  <div class="btns">
    <div class="back-home-btn btn" @click="handleClick('back')">
      <img src="../images/new/back.png" alt="">
    </div>
    <div class="rules-btn btn" @click="handleClick('rule')">规则</div>
    <div class="rules-btn btn fq-btn" @click="handleClick('log')">福气记录</div>
    <div class="pay-btn btn" @click="handleClick('pay')">
      <img src="../images/pay-btn.png" alt="">
    </div>

  </div>
</template>

<script>
  export default {
	name: 'blessing-btn',
    methods: {
      handleClick (text) {
        if(text == 'pay') {
		  //H5平台-充值送福气-点击充值拿福气 埋点
		  GLOBALS.marchSetsPoint('A_H5PT0074000678')
        }
        if(text == 'rule') {
		  //H5平台-充值送福气-帮助 埋点
		  GLOBALS.marchSetsPoint('A_H5PT0074000678')
        }
		this.$emit('handleClick', text)
      }
    }
  }
</script>

<style scoped lang="less">
.btn {
  &.btn {
    position: absolute;
    z-index: 10;
    img {
      width: 100%;
      height: 100%;
      vertical-align: top;
    }
  }
  &.back-home-btn {
    left: .13rem;
    top: 1.04rem;
    width: .63rem;
    height: .63rem;
  }
  &.rules-btn {
    right: 0rem;
    top: 1.35rem;
    width: 1.11rem;
    height: .5rem;
    line-height: .5rem;
    text-indent: 0.1rem;
    background: url("../images/new/bj-bg.png") no-repeat center top;
    background-size:100% 100%;
    text-align: center;
      font-size:0.22rem;
      color: #7185FF;
      overflow: hidden;/*超出部分隐藏*/
      white-space: nowrap;/*不换行*/
      text-overflow:ellipsis;/*超出部分文字以...显示*/
    &.fq-btn {
        top:1.93rem;
    }
  }
  &.pay-btn {
    right: 0;
    top: 6.6rem;
    width: 1.59rem;
    height: 1.56rem;
    transform: scale(.5);
    animation: scale 2s infinite ease-in-out;
  }
}

  @keyframes scale {
    0% {
      transform: scale(.8);
    }
    50% {
      transform: scale(1);
    }
    100% {
      transform: scale(.8);
    }
  }

</style>
