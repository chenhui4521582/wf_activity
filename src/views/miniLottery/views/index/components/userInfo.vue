<template>
  <div class="user-info">
    <div class="leaf">
      {{userInfo.leaf}}
    </div>
    <div class="phone">
      {{userInfo.phone}}
    </div>
    <div class="card-lottery">
      {{userInfo.cardLottery}}
    </div>
  </div>
</template>
<script>
export default {
  name: 'userInfo',
  props: {
    userInfo: {
      type: Object,
      default: ()=> ({})
    }
  }
}
</script>
<style lang="less" scoped>
  .user-info {
    padding-left: 1.45rem; 
    display: flex;
    justify-items: flex-start;
    font-size: .24rem;
    color: #F1303D;
    .leaf {
      margin-right: .85rem;
      width: 1.1rem;
      height: .5rem;
      line-height: .5rem;
    }
    .phone {
      margin-right: 1.05rem;
      width: 1.1rem;
      height: .5rem;
      line-height: .5rem;
    }
    .card-lottery {
      width: 1.1rem;
      height: .5rem;
      line-height: .5rem;
    }
  }
</style>