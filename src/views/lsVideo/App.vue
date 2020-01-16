<template>
  <div class="ls-video" :class="[from == 'plantFrom' ? 'in-plantFrom' : 'in-game']"> 
    <!-- 兼容游戏内打开跟平台打开 -->
    <template v-if="from == 'plantFrom'">
      <div class="back-home"></div>
      <div class="rule-btn"></div>
    </template>
    <!-- 兼容游戏内打开跟平台打开 -->
    <template v-if="from == 'game'">
      <div class="rule-btn"></div>
      <div class="close-btn"></div>
    </template>
    <!-- 导航 -->
    <div class="nav">
      <div class="item" :class="{'active1': currentIndex == 1}" @click="handleNav(1)">奖池高光时刻</div>
      <div class="item" :class="{'active2': currentIndex == 2}" @click="handleNav(2)">一杆多球</div>
    </div>
    <!-- 列表 -->
    <div class="list">
      <div class="list-item"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'lsVideo',
  data: ()=>({
    from: 'plantFrom',
    // from: 'game'
    currentIndex: 1
  }),
  methods: {
    handleNav(index) {
      this.currentIndex = index
    }
  }
}
</script>
<style scoped lang="less">
@import '../../common/css/base.css';
@import url('../../../static/iconfont/iconfont.css');
* {
  box-sizing: border-box;
}
.ls-video {
  overflow: hidden;
  min-height: 100vh;  
  background: url(./img/bg.jpg) no-repeat center top #bc77eb;
  background-size: 100% auto;
  .nav {
    margin: 2.48rem auto 0;
    padding: 0 .1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 5.06rem;
    height: .84rem;
    border: 2px solid #371175;
    background: #481898;
    border-radius: .5rem;
    .item {
      width: 2.1rem;
      height: .62rem;
      background: #170362;
      font-size: .24rem;
      color: #fff;
      text-align: center;
      line-height: .62rem;
      border-radius: .5rem;
      &.active1 {
        margin-top: -.2rem;
        height: .82rem;
        background: url(./img/nav-active-1.png) no-repeat center center;
        background-size: 100% 100%;
        text-indent: -9999px;
        border-radius: 0;
      }
      &.active2 {
        margin-top: -.2rem;
        height: .82rem;
        background: url(./img/nav-active-2.png) no-repeat center center;
        background-size: 100% 100%;
        text-indent: -9999px;
        border-radius: 0;
      }
    }
  }
  .list {
    padding: .16rem .25rem .16rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .recommend-item {
      overflow: hidden;
      width: 3.25rem;
      height: 2.5rem;
      background: url(./img/recommend-bg.png) no-repeat center center;
      background-size: 100% 100%
    }
    .list-item {
      overflow: hidden;
      width: 3.25rem;
      height: 2.5rem;
      background: url(./img/list-bg.png) no-repeat center center;
      background-size: 100% 100%
    }
    .title {

    }
  }
}
.in-plantFrom {
  .back-home {
    position: absolute;
    left: 0;
    top: .37rem;
    width: .8rem;
    height: .42rem;
    background: url(./img/back-icon.png) no-repeat left top;
    background-size: 100% 100%;
  }
  .rule-btn {
    position: absolute;
    right: 0;
    top: .37rem;
    width: .8rem;
    height: .42rem;
    background: url(./img/rule-icon.png) no-repeat left top;
    background-size: 100% 100%;
  }
}

.in-game {
  .close-btn {
    position: absolute;
    right: .1rem;
    top: .1rem;
    width: .4rem;
    height: .4rem;
    background: url(./img/closed.png) no-repeat center center;
    background-size: .2rem .2rem;
  }
  .rule-btn {
    position: absolute;
    left: 0;
    top: .59rem;
    width: .8rem;
    height: .42rem;
    background: url(./img/rule-icon.png) no-repeat left top;
    background-size: 100% 100%;
  }
}
</style>
