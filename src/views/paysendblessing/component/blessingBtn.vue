<template>
  <div class="btns">
    <div class="back-home-btn btn" @click="handleClick('back')">
      <img src="../images/back.png" alt="">
    </div>
    <div class="rules-btn btn" @click="handleClick('rule')">
      <img src="../images/rules.png" alt="">
    </div>
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
    right: .13rem;
    top: 1.04rem;
    width: .63rem;
    height: .63rem;
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
