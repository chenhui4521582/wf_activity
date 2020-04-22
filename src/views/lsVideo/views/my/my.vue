<template>
  <div class="my-lsvideo">
    <Header class="header" title="我的高光"/>
    <!-- 列表 -->
    <div class="listWrap" ref="box" v-if="showList">
      <div class="title">共{{showList}}个记录</div>
      <better-scroll ref="scroll" :data="list" :probeType="3" :listenScroll="true" @scroll="onScroll">
        <div class="list" ref="wrap" >
          <div class="list-item item" 
            v-for="(item, index) in list" 
            :key="`list${index}`" 
            @click="handleClick(item, index)"
          >
            <div class="video-img" :class="{'ratepool': item.type == 2}">
              <div class="amount">
                <span>{{item.amount}}出杆</span>
              </div>
              <!-- 一杆几球 -->
              <div class="oddsResult" v-if="item.type == 1">{{item.odds}}倍奖励</div>
              <!-- 击中奖池 -->
              <div class="oddsResult" v-if="item.type == 2" >{{item.ratePoolAwards}}奖励</div>
            </div>

            <div class="video-text">
              <!-- 一杆几球 -->
              <p class="name" v-if="item.type == 1">一杆{{item.ballNum}}球</p>
              <!-- 击中奖池 -->
              <p class="name" v-if="item.type == 2">击中奖池</p>
              <p class="desc">
                <span class="play-num">播放量：{{item.playbackVolume}}</span>
              </p>
              <div class="time">{{item.createTime}}</div>
            </div>
          </div>
          <!-- 没有数据了 -->
          <bottom-line class="bottom-line" :color="'#ddd'" v-if="noData" />
        </div>
      </better-scroll>
      <!-- 加载动画 -->
      <loading-animation 
        v-if="!noData && loadingAnimation" 
        class="loading-animation" 
        :color="'#999'" 
        :showBar="true" 
        :smaller="true"
      />
      <!-- back-top -->
      <div v-if="isBackTop" class="back-top" @click="backTop"></div>
    </div>
    <!-- 没有数据 -->
    <empty v-else />
    <div class="item"></div>
  </div>
</template>
<script>
import BetterScroll from '../../components/betterScroll/betterScroll'
import BottomLine from '../../components/bottomLine'
import LoadingAnimation from '../../components/loadingAnimation'
import Empty from './empty'
import utils from '../../components/utils'
import Services from '../../services/services'
import _get from 'lodash.get'
export default {
  name: 'myLsVideo',
  data: () => ({
    from: 'platFrom',
    page: 1,
    pageSize: 20,
    list: [],
    isBackTop: false,
    scrollLock: false,
    loadingAnimation: false,
    noData: false
  }),
  components: {
    LoadingAnimation,
    BottomLine,
    BetterScroll,
    Empty
  },
  computed: {
    showList() {
      return this.list.length
    }
  },
  methods: {
    getMyVideo() {
      if(this.scrollLock) {
        return false
      }
      this.scrollLock = true
      Services.getMyVideo({
        page: this.page,
        pageSize: this.pageSize
      }).then(res => {
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
          this.getMyVideo()
        }, 200)
      }
      /** 是否显示返回顶部 **/
      if (Math.abs(Math.round(y)) > 200) {
        this.isBackTop = true
      } else {
        this.isBackTop = false
      }
    },
    handleClick(item, index) {
      GLOBALS.marchSetsPoint('A_H5PT0232003285', {
        from_project_id: this.from,
        task_id: item.id,
      })
      if(this.from == 'game' && parent.playLsVideo) {
        let id = item.id
        parent.playLsVideo(id, 3, index)
      }else {
        let id = item.id
        let channel = localStorage.getItem('APP_CHANNEL')
        location.href = `//wap.beeplaying.com/billiards/?channel=${channel}&id=${id}&index=${index}&type=3&time=${Date.now()}`
      }
    },
    backTop() {
      this.$refs.scroll.scrollTo(0, 0)
      this.isBackTop = false
    }
  },
  mounted() {
    this.getMyVideo()
    document.title = "我的高光"
    this.from = utils.getUrlParams('from') || 'platFrom'
  }
}
</script>
<style lang="less" scoped>
* {
  box-sizing: border-box;
}
.my-lsvideo {
  padding: .9rem .24rem;
  position: relative;
  height: 100vh;
  background: #fff;
  .header {
    background: #fff;
    border-bottom: 1px solid rgba(204,204,204, .4);
  }
  .title {
    position: absolute;
    top: -.7rem;
    padding-left: .06rem;
    height: .7rem;
    line-height: .7rem;
    font-size: .26rem;
    color: #717171;
  }
  .listWrap {
    position: absolute;
    left: .24rem;
    right: .24rem;
    bottom: 0;
    top: 1.6rem;
    .loading-animation {
      position: absolute;
      left: 50%;
      bottom: .1rem;
      transform: translate(-50%, 0);
    }
    .list {
      position: relative;
      padding: .1rem .1rem .6rem .1rem ;
      .list-item {
        display: flex;
        justify-self: start;
        margin-bottom: .2rem;
        padding: .15rem 0 .3rem .26rem;
        height: 2.09rem;
        box-shadow: 0px 1px 11px 1px rgba(209,209,209,0.32);
        border-radius: .16rem;
        .video-img {
          margin-right: .2rem;
          overflow: hidden;
          width: 2.11rem;
          height: 1.63rem;
          background: url(../../img/my-list.png) no-repeat center top;
          background-size: 100% 100%;
          text-align: center;
          .amount {
            margin: .77rem auto .23rem;
            padding: 0 .1rem;
            width: 1.3rem;
            height: .27rem;
            line-height: .27rem;
            background: #DD3DF0;
            font-size: .18rem;
            color: #fff;
            border-radius: .24rem;
          }
          .oddsResult {
            height: .28rem;
            line-height: .28rem;
            font-size: .18rem;
            color: #fff;
          }
          &.ratepool {
            background: url(../../img/my-list1.png) no-repeat center top;
            background-size: 100% 100%;
          }
        }
        .video-text {
          padding-top: .35rem;
          .name {
            margin-bottom: .15rem;
            font-size: .3rem;
            color: #232323;
            font-weight: bold;
          }
          .desc,.time {
            margin-bottom: .15rem;
            font-size: .24rem;
            color: #717171;
          }
        }
      }
      .bottom-line {
        flex-wrap: nowrap;
        margin: .2rem auto;
      }
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
}
</style>