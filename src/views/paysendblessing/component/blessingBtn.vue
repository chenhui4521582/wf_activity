<template>
  <div class="btns">
    <div class="back-home-btn btn" @click="handleClick('back')">
      <img src="../images/back.png" alt="">
    </div>
    <div class="rules-btn btn" @click="handleClick('rule')">
      <img src="../images/rules.png" alt="">
    </div>
    <div class="blessing-log btn" @click="handleClick('log')">
      <img src="../images/blessing-log-btn.png" alt="">
    </div>
    <div class="pay-btn btn">
      <img src="../images/pay-btn.png" alt="">
    </div>
    <div class="check-btn btn" @click="handleClick('ranking')">
      <div class="container">
        <div class="border">
          <img src="../images/check-ranking-btn.png" alt="">
        </div>
      </div>
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
  &.blessing-log {
    right: .51rem;
    bottom: 7.95rem;
    width: 1.43rem;
    height: .81rem;
  }
  &.pay-btn {
    right: 0;
    bottom: 5.8rem;
    width: 1.59rem;
    height: 1.56rem;
  }
  &.check-btn {
    width: 100%;
    padding: 0 .15rem;
    bottom: .2rem;
    left: 0;
    box-sizing: border-box;
    .container {
      width: 100%;
      height: .81rem;
      padding: 3px;
      box-sizing: border-box;
      background:linear-gradient(-32deg, rgba(45, 61, 217, 0.97), rgba(82, 166, 236, 0.97));
      border-radius:10px;
    }
    .border {
      border-radius:10px;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background:linear-gradient(-54deg,rgba(61,80,203,1),rgba(94,120,235,1));
    }
    img {
      width: 1.74rem;
      height: .28rem;
    }
  }
}

</style>
