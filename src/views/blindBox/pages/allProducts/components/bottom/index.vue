<template>
  <footer class="footer">
    <div class="button"
      @click="$router.push({
      name:'Index'
    })">去开盲盒</div>
    <p class="tips">15元可开到心仪商品</p>
  </footer>
</template>

<script>
export default {

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
    width: 2.2rem;
    line-height: 0.56rem;
    background: #d1ac42;
    border-radius: 0.16rem;
    color: #fff;
    font-size: 0.24rem;
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
