<template>
  <div class="header">
    <div class="userInfo">
      <div class="leaf">
        <img src="../img/leaf-icon.png" alt="">
        {{userInfo.leafs | amountComputen}}
      </div>
      <div class="phone">
        <img src="../img/phone-icon.png" alt="">
        {{userInfo.phoneScrap / 10 | amountComputen}}
      </div>
    </div>
    <div class="my-log" @click="goLog">
      我的夺宝记录
      <span class="iconfont icon-next"></span>
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
    },
    details: {
      type: Object,
      default: ()=> ({})
    }
  },
  methods: {
    goLog() {
      this.$router.push({
        name: 'log', 
        query: {
          from: 'mylog'
        }
      })
      GLOBALS.marchSetsPoint('A_H5PT0202002084', {
        task_id: this.details.currentPeriodStatus,
        task_name: this.details.currentPeriodStatus
      })
    }
  }
}
</script>
<style lang="less" scoped>
.header {
  padding: .24rem 0;
  display: flex;
  justify-content: space-between;
  .userInfo {
    display: flex;
    justify-content: flex-start;
    font-size: .28rem;
    color: #888888;
    .leaf,.phone,.lottery {
      padding: 0 .3rem 0 0;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      img {
        margin-right: .1rem;
        vertical-align: top;
        width: .3rem;
        height: .3rem;
      }
    }
  }
  .my-log {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #000;
    font-size: .24rem;
    .iconfont {
      font-size: .2rem;
    }
  }
}
</style>