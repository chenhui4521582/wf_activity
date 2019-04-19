<template>
  <div class="header">
    <img class="bg" src="../images/header-bg.png" alt="" />
    <div class="back-home" @click="backHome">
      <img src="../images/home-btn.png" alt="">
    </div>
  </div>
</template>

<script>
  export default {
	name: 'rankingHeader',
    methods: {
	  backHome () {
	    window.history.go(-1)
      }
    }
  }
</script>

<style scoped lang="less">
  .header {
    position: relative;
    min-height: 3.82rem;
    .bg {
      width: 100%;
      vertical-align: top;
    }
    .back-home {
      position: absolute;
      left: .36rem;
      top: .16rem;
      width: .63rem;
      height: .63rem;
      img {
        width: 100%;
        height: 100%;
        display: block;
        cursor: pointer;
      }
    }
  }
</style>
