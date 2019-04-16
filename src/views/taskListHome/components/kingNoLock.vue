<template>
  <div class="task-title king-nolock">
    <!--<img src="../images/king-bg.png" alt="" class="no-lock-bg bg-task">-->
    <img :src="item.lockBgIcon | filter" class="no-lock-bg bg-task">
    <div class="no-lock-body">
      <p class="left-part">
        <img :src="item.lockIcon | filter" alt="">
        <!--<img src="../images/king-icon.png" alt="" class="king-icon">-->
      </p>
      <div class="right-part">
        <div class="task-name">
          <!--<img src="../images/king-name.png" alt="">-->
          <!--<em>共得505元奖励</em>-->
          <img :src="item.titleIcon | filter" alt="">
          <em>共得{{item.reward}}奖励</em>
        </div>
        <div class="rule">解锁条件：获取“糖果大师”勋章</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
	name: 'kingNoLock',
    props: {
      item: Object
    }
  }
</script>

<style lang="less" scoped>
  @import '../../../common/css/base.css';
  @import "../taskListHome.less";
</style>
