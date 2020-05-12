<template>
  <div class="master-strategy">
    <!-- 返回 -->
    <div class="back-btn" @click="backHome">
      <img class="inner-img" src="./img/back-icon.png" alt="">
    </div>
    <!-- 规则 -->
    <div class="rule-btn" @click="openRule">
      <img class="inner-img" src="./img/rule-icon.png" alt="">
    </div>
    <!-- 排行榜 -->
    <div class="ranking-btn" @click="goRanking">
      <img class="inner-img" src="./img/ranking-icon.png" alt="">
    </div>
    <!-- horn -->
    <div class="horn">
      <div class="icon">
        <img src="./img/trumpet.png" alt="" class="inner-img">
      </div>
      <div class="text">
        经过半个月得投稿和筛选，我们精选了{{totalCount}}条内容平台公示，大家可为 自己喜欢得攻略点赞哦。
      </div>
    </div>
    <!-- banner -->
    <div class="banner">
      <img class="inner-img" src="./img/banner.png" alt="">
    </div>
    <!-- nav -->
    <div class="nav">
      <better-scroll 
        v-if="showScroll" 
        ref="scroll" 
        :scrollY=false 
        :scrollX=true
        :data="nav" 
        :listenScroll="true" 
        :probeType="3"
      >
        <div class="nav-wrap">
          <div class="item" 
            v-for="(item, index) in nav" 
            :class="{'active': currentIndex == index}"
            :key="index" 
            @click="handleNavClick(index, item)"
          >
            {{item.name}} 
            <div class="bottom-icon"></div>
          </div>
        </div>
      </better-scroll>
    </div>
    <!-- content -->
    <div class="content" ref="box">
      <better-scroll ref="scroll" :data="list" :probeType="3" :listenScroll="true" @scroll="onScroll">
        <div class="list" ref="wrap" >
          <div class="list-item"  v-for="(item, index) in list" :key="index">
            <div class="text" ref="text" :class="{'active': item.pulldown}" @click="toggle(index)">
              <div class="text-wrap" v-html="item.content">
              </div>
              <div class="check-btn" v-if="item.showBtn && item.pulldown">查看更多 <span class="arraw"></span></div>
              <div class="check-btn" v-if="item.showBtn && !item.pulldown">点击收起 <span class="arraw"></span></div>
            </div>
            <div class="user-info">
              <div class="user" @click="checkUserInfo(item)">
                <div class="avatar">
                  <img v-if="item.headImg"  class="inner-img" :src="item.headImg | filter" alt="">
                  <img v-else class="inner-img" src="./img/img_photo.png" alt="">
                </div>
                <div class="nick-name">
                  {{item.nickName}}
                </div>
              </div>
              <div class="praise" @click.stop="_setPraise(item, index)">
                <div class="praise-icon">
                  <img v-if="item.praise"  class="inner-img" src="./img/praise-active.png" alt="">
                  <img v-else class="inner-img" src="./img/praise.png" alt="">
                </div>
                <div class="praise-num">
                  {{item.praiseCount}}
                </div>
              </div>
            </div>
          </div>
          <!-- 加载动画 -->
          <loading-animation class="loading-animation" v-if="loadingAnimation" :showBar="true" :smaller="true"/>
        </div>
      </better-scroll>
    </div>
    <!-- footer -->
    <div class="footer">
      <div class="jump" @click="jump">我要投稿</div>
      <div class="play-game" @click="openRecommend">
        去玩游戏
      </div>
    </div>
    <!-- rule -->
    <rule v-model="showRule" />
    <!-- userInfo -->
    <user-info ref="userInfo"/>
    <!-- recomend -->
    <recommend v-model="showRecommend" />
  </div>
</template>
<script>
import Recommend from './components/recommend'
import UserInfo from './components/userInfo'
import LoadingAnimation from './components/loadingAnimation'
import BottomLine from './components/bottomLine'
import Rule from './components/rule'
import BetterScroll from '../../components/scroll/scroll'
import Services from '../../services/services'
import utils from '../../components/utils'
import _get from 'lodash.get'
export default {
  name: 'masterStrategy',
  data: ()=>({
    currentIndex: 0,
    info: {},
    list: [],
    page: 1,
    scrollLock: false,
    showRule: false,
    loadingAnimation: false,
    showRecommend: false
  }),
  components: {
    BetterScroll,
    Rule,
    LoadingAnimation,
    BottomLine,
    UserInfo,
    Recommend
  },
  computed: {
    nav () {
      return _get(this.info, 'categoryList', [])
    },
    isShowRank () {
      return _get(this.info, 'isShowRank', false)
    },
    totalCount () {
      return _get(this.info, 'totalCount', 0)
    },
    showScroll () {
      return this.nav.length
    }
  },
  methods: {
    handleNavClick (index, item) {
      this.currentIndex = index
      this.resetParams()
      this._getList()
      GLOBALS.marchSetsPoint('A_H5PT0282003393', {
        awards_name: item.name
      })
    },
    /** 监控滚动 **/
    onScroll ({ y }) {
      let box = this.$refs.box.clientHeight
      let scrollBox = this.$refs.wrap.clientHeight
      let endPosition = scrollBox - box
      if (Math.abs(Math.round(y)) > endPosition) {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          this.page++
          this._getList()
        }, 300)
      }
      /** 是否显示返回顶部 **/
      if (Math.abs(Math.round(y)) > 200) {
        this.isBackTop = true
      } else {
        this.isBackTop = false
      }
    },
    /** 重置数据 **/
    resetParams () {
      this.page = 1
      this.pageSize = 20
      this.scrollLock = false
      this.list = []
      this.loadingAnimation = false
    },
    /** 获取活动信息 **/
    _getInfo () {
      Services.getInfo().then(res => {
        const {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.info = _get(res, 'data.data', {})
          this._getList()
        }
      })
    },
    /** 获取列表 **/
    _getList () {
      if(this.scrollLock) return
      this.scrollLock = true
      /** 开启加载动画 **/
      this.loadingAnimaion(true)
      const id = _get(this.info, ['categoryList', this.currentIndex, 'id'], 1)
      Services.getList({
        "categoryId": id,
        "page": this.page,
        "pageSize": 20
      }).then(res => {
        const {code, data, message} = _get(res, 'data')
        if(code == 200) {
          let list = _get(res, 'data.data', [])
          this.list = this.list.concat(list)
          /** 关闭加载动画 **/
          this.loadingAnimaion(false)
          if(list.length == 20) {
            this.scrollLock = false
          }
          this.countPullDown()
        }
      }).catch(error => {
        this.scrollLock = false
        this.loadingAnimaion(false)
      })
    },
    /** 加载动画 **/
    loadingAnimaion (status) {
      this.loadingAnimation = status
      this.$refs.scroll.refresh()
    },
    /** 计算是否需要下拉 **/
    countPullDown () {
      this.$nextTick(() => {
        let element = this.$refs.text
        let fontsize = document.documentElement.style.fontSize.replace('px', '')
        element.forEach((item, index) => {
          if(item.childNodes[0].clientHeight / fontsize > 1.1) {
            let list = this.list[index]
            list.pulldown = true
            list.showBtn = true
            this.$set(this.list, index, list)
          }
        })
      })
    },
    toggle (index) {
      let list = this.list[index]
      list.pulldown = !list.pulldown
      this.$set(this.list, index, list)
    },
    /** 返回首页 **/
    backHome () {
      window.location.href = "//wap.beeplaying.com/xmWap/"
    },
    /** 打开规则 **/
    openRule () {
      this.showRule = true
    },
    /** 查看用户信息 **/
    checkUserInfo (item) {
      this.$refs.userInfo.init(item.userId)
    },
    /** 打开更多游戏 **/
    openRecommend () {
      this.showRecommend = true
      GLOBALS.marchSetsPoint('A_H5PT0282003395')
    },
    /** 点赞 **/
    _setPraise (item, index) {
      Services.setPraise({value: item.id}).then(res => {
        const {code, message, data} = _get(res, 'data', {})
        if(code == 200) {
          this.list[index].praise = true
          this.list[index].praiseCount++
          this.$toast.show({ message: '点赞成功'})
        } else {
          this.$toast.show({ message })
        }
      })
    },
    jump () {
      GLOBALS.marchSetsPoint('A_H5PT0282003394')
      window.location.href = 'https://wj.qq.com/s2/5837168/9470/'
    },
    goRanking () {
      GLOBALS.marchSetsPoint('A_H5PT0282003392')
      this.$router.push({
        name: 'ranking'
      })
      
    }
  },
  mounted() {
    this._getInfo()
    GLOBALS.marchSetsPoint('P_H5PT0282', {
      from_project_id: utils.getUrlParams('from')
    })
  }
}
</script>
<style lang="less" scoped>
.inner-img {
  vertical-align: top;
  width: 100%;
  height: 100%;
}
.master-strategy {
  overflow: hidden;
  position: relative;
  height: 100vh;
  background: #BD1919;
  .back-btn {
    position: absolute;
    left: 0;
    top: .9rem;
    width: .83rem;
    height: .5rem;
  }
  .rule-btn {
    position: absolute;
    right: 0;
    top: .9rem;
    width: .9rem;
    height: .5rem;
  }
  .ranking-btn {
    position: absolute;
    right: 0;
    top: 2.84rem;
    width: .9rem;
    height: 1.05rem;
  }
  .horn {
    position: absolute;
    padding: 0 .2rem;
    height: .7rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background:rgba(255,240,189,.6);
    .icon {
      margin-right: .13rem;
      flex-shrink: 0;
      width: .42rem;
      height: .42rem;
    }
    .text {
      line-height: .24rem;
      font-size: .2rem;
      color: #D10F30;
      font-weight: bold;
    }
  }
  .banner {
    height: 4.27rem;
  }
  .nav {
    position: relative;
    height: .7rem;
    background: linear-gradient(0deg,rgba(255,55,55,0.98),rgba(200,34,34,0.98));
    .nav-wrap {
      display: inline-flex;
      justify-content: flex-start; 
      height: .7rem;
      .item {        
        position: relative;
        white-space: nowrap;
        padding: 0 .3rem;
        min-width: 1.1rem;
        text-align: center;
        height: .7rem;
        line-height: .7rem;
        font-size: .24rem;
        color: #FFC5C5;
        font-weight: bold;
        .bottom-icon {
          display: none;
          position: absolute;
          left: 50%;
          bottom: -.09rem;
          margin-left: -.11rem;
          width: .22rem;
          height: .1rem;
          background: url(./img/bottom-icon.png) no-repeat center top;
          background-size: 100% 100%;
        }
        &.active {
          border-radius: .04rem;
          color: #EA2E2F;
          background:linear-gradient(0deg,rgba(255,225,174,0.98),rgba(255,210,0,0.98));
          .bottom-icon {
            display: block;
          }
        }
      }
    }
  }
  .content {
    overflow: hidden;
    position: absolute;
    top: 5.2rem;
    left: .24rem;
    right: .24rem;
    bottom: 1rem;
    .list {
      position: relative;
      padding-bottom: 50px;
      .loading-animation {
        position: absolute;
        left: 50%;
        bottom: 20px;
        transform: translate(-50%, 0);
      }
      .bottom-line {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 20px;
      }
    }
    .list-item {
      margin-bottom: .2rem;
      padding: .2rem .2rem 0;
      border-radius: .16rem;
      background: #FFF4E6;
      &:last-child {
        margin-bottom: 0;
      }
      .text {
        font-size: .24rem;
        color: #000000;
        &.active {
          .text-wrap {
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
          }
          .check-btn {
            .arraw {
              transform: rotate(90deg);
            }
          }
        }
        .text-wrap {
          font-size: .24rem;
          line-height: .36rem;
        }
        .check-btn{
          margin-top: .1rem;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          font-size: .2rem;
          color: #FF7800;
          .arraw {
            margin-left: .08rem;
            width: .13rem;
            height: .21rem;
            background: url(./img/next-icon.png) no-repeat right center;
            background-size: .13rem .21rem;
            transform: rotate(-90deg);
          }
        }
      }
      .user-info {
        height: .68rem;
        display: flex;
        justify-content: space-between;
        .user,.praise {
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
        .avatar {
          margin-right: .2rem;
          width: .3rem;
          height: .3rem;
        }
        .nick-name {
          font-size: .24rem;
          font-weight: bold;
          color: #000;
        }
        .praise-icon {
          margin-right: .11rem;
          width: .3rem;
          height: .3rem;
        }
        .praise-num {
          font-size: .24rem;
          font-weight: bold;
          color: #888888;
        }
      }
    }
    .back-top {
      position: absolute;
      right: .24rem;
      bottom: .5rem;
      width: .6rem;
      height: .6rem;
    }
  }
  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    .jump,.play-game {
      width: 50%;
      height: .9rem;
      font-size: .28rem;
      font-weight: bold;
      text-align: center;
      line-height: .9rem;
      color: #BD1919;
      background: #FE9921;
    }
    .play-game {
      background: #FFC90D;
    }
  }
}
</style>