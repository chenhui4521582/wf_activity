<template>
  <div class="ls-video" :class="[from == 'platFrom' ? 'in-platFrom' : 'in-game']"> 
    <!-- 兼容游戏内打开跟平台打开 -->
    <template v-if="from == 'platFrom'">
      <div class="back-home" @click="backHome"></div>
      <div class="rule-btn" @click="openRule">规则</div>
      <div class="my" @click="goMy">我的高光</div>
    </template>
    <!-- 兼容游戏内打开跟平台打开 -->
    <template v-if="from == 'game'">
      <div class="rule-btn" @click="openRule">规则</div>
      <div class="close-btn" @click="close"></div>
      <div class="my" @click="goMy">我的高光</div>
    </template>
    <!-- 导航 -->
    <div class="nav">
      <div class="item" :class="{'active1': currentIndex == 2}" @click="handleNav(2)">击中奖池</div>
      <div class="item" :class="{'active2': currentIndex == 1}" @click="handleNav(1)">一杆多球</div>
    </div>
    <!-- 列表 -->
    <div class="listWrap" ref="box" v-if="showList">
      <better-scroll ref="scroll" :data="list" :probeType="3" :listenScroll="true" @scroll="onScroll">
        <div class="list" ref="wrap" >
          <template v-if="showList">
            <div class="list-item item" :class="{'active': currentIndex == 1}"  v-for="(item, index) in list" :key="`list${index}`">
              <list :item="item" :currentIndex="currentIndex" :from="from" :index="index"></list>
            </div>
            <!-- 没有数据了 -->
            <bottom-line class="bottom-line" v-if="noData" />
            <!-- 加载动画 -->
            <loading-animation class="loading-animation" v-if="!noData && loadingAnimation" :showBar="true" :smaller="true"/>
          </template>
        </div>
      </better-scroll>
      <!-- back-top -->
      <div v-if="isBackTop" class="back-top" @click="backTop"></div>
    </div>
    <!-- 规则 -->
    <rule v-model="showRule"></rule>
    <!-- loading -->
    <loading v-if="!showList" :showBar="true"/>
  </div>
</template>
<script>
import Loading from '@/components/common/loading'
import BottomLine from '../../components/bottomLine'
import LoadingAnimation from '../../components/loadingAnimation'
import BetterScroll from '../../components/betterScroll/betterScroll'
import Rule from '../../components/rule'
import List from './list'
import Services from '../../services/services'
import utils from '../../components/utils'
import _get from 'lodash.get'
export default {
  name: 'lsVideo',
  data: ()=>({
    from: 'platFrom',
    // from: 'game'
    list: [],
    currentIndex: 1,
    page: 1,
    pageSize: 20,
    showRule: false,
    isBackTop: false,
    scrollLock: false,
    loadingAnimation: false,
    noData: false
  }),
  components: {
    Rule,
    List,
    Loading,
    BetterScroll,
    LoadingAnimation,
    BottomLine
  },
  computed: {
    showList() {
      return this.list.length
    }
  },
  methods: {
    handleNav(index) {
      this.currentIndex = index
      this.isBackTop = false
      this.resetParams()
      this._getHighlightTimeList()
      GLOBALS.marchSetsPoint('A_H5PT0232002705', {
        from_project_id: this.from
      })
    },
    backHome() {
      window.history.go(-1)
      GLOBALS.marchSetsPoint('A_H5PT0232002703', {
        from_project_id: this.from
      })
    },
    backTop() {
      this.isBackTop = false
    },
    goMy() {
      GLOBALS.marchSetsPoint('A_H5PT0232003284', {
        from_project_id: this.from
      })
      this.$router.push({
        name: 'my',
        query: {
          from: this.$route.query.from
        }
      })
    },
    onScroll ({ y }) {
      let box = this.$refs.box.clientHeight
      let scrollBox = this.$refs.wrap.clientHeight
      let endPosition = scrollBox - box
      if (Math.abs(Math.round(y)) > endPosition) {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        /** 开启加载动画 **/
        this.loadingAnimation = true
        this.timer = setTimeout(() => {
          this.page++
          this._getHighlightTimeList()
        }, 200)
      }
      /** 是否显示返回顶部 **/
      if (Math.abs(Math.round(y)) > 200) {
        this.isBackTop = true
      } else {
        this.isBackTop = false
      }
    },
    resetParams () {
      this.page = 1
      this.pageSize = 20
      this.scrollLock = false
      this.list = []
      this.loadingAnimation = false
      this.noData = false
    },
    _getHighlightTimeList() {
      if(this.scrollLock) {
        return false
      }
      this.scrollLock = true
      Services.highlightTimeList({
        page: this.page,
        pageSize: this.pageSize,
        type: this.currentIndex
      }).then(res=> {
        let {code, data, message} = _get(res, 'data')
        if(code == 200) {
          let list = _get(res, 'data.data', [])
          this.list = this.list.concat(list)
          /** 关闭加载动画 **/
          this.loadingAnimation = false
          if(list.length == 20) {
            this.scrollLock = false
          }else {
            /** 没有数据了 **/
            this.noData = true
          }
        }
      }).catch(error => {
        this.scrollLock = false
        this.loadingAnimation = false
      })
    },
    openRule() {
      this.showRule = true
      GLOBALS.marchSetsPoint('A_H5PT0232002704', {
        from_project_id: this.from
      })
    },
    /** 列表返回顶部 **/
    backTop() {
      this.$refs.scroll.scrollTo(0, 0)
      this.isBackTop = false
    },
    close() {
      if(parent && parent.closeWebView) {
        parent.closeWebView()
      }
    }
  },
  created() {
    this._getHighlightTimeList()
    this.from = utils.getUrlParams('from') || 'platFrom'
    GLOBALS.marchSetsPoint('P_H5PT0232', {
      from_project_id: this.from
    })
  }
}
</script>
<style scoped lang="less">

* {
  box-sizing: border-box;
}
.ls-video {
  overflow: hidden;
  min-height: 100vh;  
  background: url(../../img/bg.jpg) no-repeat center top #a55fdb;
  background-size: 100% auto;
  .nav {
    margin: 2.73rem auto 0;
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
        background: url(../../img/nav-active-1.png) no-repeat center center;
        background-size: 100% 100%;
        text-indent: -9999px;
        border-radius: 0;
      }
      &.active2 {
        margin-top: -.2rem;
        height: .82rem;
        background: url(../../img/nav-active-2.png) no-repeat center center;
        background-size: 100% 100%;
        text-indent: -9999px;
        border-radius: 0;
      }
    }
  }
  .list {
    padding: .16rem .25rem .7rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .item {
      margin-bottom: .08rem;
    }
    .list-item {
      overflow: hidden;
      width: 3.25rem;
      height: 2.5rem;
      background: url(../../img/list-bg.png) no-repeat center center;
      background-size: 100% 100%;
      &.active {
        background: url(../../img/list-bg-1.png) no-repeat center center;
        background-size: 100% 100%;
      }
    }
  }
}
.listWrap {
  position: fixed;
  top: 3.55rem;
  left: 0;
  right: 0;
  bottom: 0;
  .loading-animation {
    margin: 0 auto;
  }
  .back-top {
    position: absolute;
    right: .24rem;
    bottom: 2rem;  
    width: .7rem;
    height: .7rem;
    background: url(../../img/back-top.png) no-repeat center center;
    background-size: 100% 100%;
  }
}
.in-platFrom {
  .back-home {
    position: absolute;
    left: 0;
    top: .37rem;
    width: .8rem;
    height: .42rem;
    background: url(../../img/back-icon.png) no-repeat left top;
    background-size: 100% 100%;
  }
  .rule-btn {
    position: absolute;
    left: 0;
    top: 1.1rem;
    width: .8rem;
    height: .42rem;
    background: #B437D0;
    border-radius: 0 .21rem .21rem 0;
    line-height: .44rem;
    text-align: center;
    color: #fff;
    font-size: .2rem;
  }
  .my {
    position: absolute;
    right: 0;
    top: .37rem;
    width: 1.16rem;
    height: .42rem;
    background: #B437D0;
    border-radius: .21rem 0 0 .21rem;
    line-height: .44rem;
    text-align: center;
    color: #fff;
    font-size: .2rem;
  }
}
.in-game {
  position: fixed;
  left: .28rem;
  right: .28rem;
  bottom: 1.28rem;
  top: 1.28rem;
  min-height: auto;
  border-radius: .2rem;
  .my {
    position: absolute;
    left: 0;
    top: 1.3rem;
    width: 1.16rem;
    height: .42rem;
    background: #B437D0;
    border-radius: 0 .21rem .21rem 0;
    line-height: .44rem;
    text-align: center;
    color: #fff;
    font-size: .2rem;
  }
  .close-btn {
    position: absolute;
    right: .1rem;
    top: .1rem;
    width: .4rem;
    height: .4rem;
    background: url(../../img/closed.png) no-repeat center center;
    background-size: .2rem .2rem;
  }
  .rule-btn {
    position: absolute;
    left: 0;
    top: .37rem;
    width: .8rem;
    height: .42rem;
    background: #B437D0;
    border-radius: 0 .21rem .21rem 0;
    line-height: .44rem;
    text-align: center;
    color: #fff;
    font-size: .2rem;
  }
  .listWrap {
    top: 4.8rem;
    left: .28rem;
    right: .28rem;
    bottom: 1.28rem;
  }
  .list {
    .item {
      margin-bottom: .08rem;
    }
    .list-item {
      overflow: hidden;
      width: 3rem;
      height: 2.33rem;
      background: url(../../img/list-bg.png) no-repeat center center;
      background-size: 100% 100%
    }
  }
}
</style>
