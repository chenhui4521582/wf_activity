<template>
  <div class="my-seal">
    <div class="seal">
      当前拥有图章：
      <div class="seal-num">
        <div class="icon"></div>
        <div class="num"></div>
      </div>
    </div>
    <div class="exchange-log">

    </div>
  </div>
</template>
<script>
export default {
  name: 'mySeal'
}
</script>
<style lang="less" scoped>
.my-seal {
  display: flex;
  justify-content: space-between;
  .seal {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #1934C6;
    font-weight: bold;
  }
  .seal-num {
    width: 1.32rem;
    height: .55rem;
    background: url(../img/num-bg.png) no-repeat center center;
    background-size: 100% 100%;
  }
}
</style>