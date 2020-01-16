<template>
  <div class="ls-video" :class="[from == 'plantFrom' ? 'in-plantFrom' : 'in-game']"> 
    <!-- 兼容游戏内打开跟平台打开 -->
    <template v-if="from == 'plantFrom'">
      <div class="back-home"></div>
      <div class="rule-btn" @click="openRule"></div>
    </template>
    <!-- 兼容游戏内打开跟平台打开 -->
    <template v-if="from == 'game'">
      <div class="rule-btn" @click="openRule"></div>
      <div class="close-btn" @click="close"></div>
    </template>
    <!-- 导航 -->
    <div class="nav">
      <div class="item" :class="{'active1': currentIndex == 2}" @click="handleNav(2)">奖池高光时刻</div>
      <div class="item" :class="{'active2': currentIndex == 1}" @click="handleNav(1)">一杆多球</div>
    </div>
    <!-- 列表 -->
    <div class="list">
      <div class="recommend-item item" v-for="(item, index) in optimumTimeList" :key="index">
        <list :item="item" :currentIndex="currentIndex"></list>
      </div>
      <div class="list-item item" v-for="(item, index) in highlightTimeList" :key="index">
        <list :item="item" :currentIndex="currentIndex"></list>
      </div>
    </div>
    <!-- 规则 -->
    <rule></rule>
  </div>

</template>

<script>
import List from './list'
import Services from './services/services'
import _get from 'lodash.get'
export default {
  name: 'lsVideo',
  data: ()=>({
    from: 'plantFrom',
    // from: 'game'
    optimumTimeList: [],
    highlightTimeList: [],
    currentIndex: 2,
    page: 1,
    pageSize: 20,
    showRule: false
  }),
  components: {
    List
  },
  methods: {
    handleNav(index) {
      this.currentIndex = index
    },
    _getHighlightTimeList() {
      Services.highlightTimeList({
        optimumNum: 2,
        page: this.page,
        pageSize: this.pageSize,
        sortRule: 1,
        type: this.currentIndex
      }).then(res=> {
        let {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.highlightTimeList = _get(res, 'data.data.highlightTimeList', [])
          this.optimumTimeList = _get(res, 'data.data.optimumTimeList', [])
        }
      })
    },
    openRule() {
      this.showRule = true
    },
    close() {

    }
  },
  created() {
    this._getHighlightTimeList()
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
