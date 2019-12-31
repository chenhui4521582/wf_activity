<template>
  <footer class="footer">
    <div class="button"
      @click="toIndex()">去开盲盒</div>
    <p class="tips">15元可开到心仪奖品</p>
  </footer>
</template>

<script>
export default {
  methods: {
    toIndex () {
      this.$router.push({
        name: 'Index'
      })
      GLOBALS.marchSetsPoint("A_H5PT0225002563") // H5平台-盲盒页面-商品列表页面-去开盲盒点击
    }
  }
}
</script>

<style lang="less" scoped>
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgb(238, 238, 238);
  padding: 0.3rem 0;
  .button {
    width: 2.4rem;
    line-height: 0.7rem;
    background: #d1ac42;
    border-radius: 0.16rem;
    color: #fff;
    font-size: 0.28rem;
    text-align: center;
  }
  .tips {
    font-size: 0.2rem;
    color: #888;
    text-align: center;
    padding-top: 0.18rem;
  }
}
</style>
