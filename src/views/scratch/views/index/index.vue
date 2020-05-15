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
    <!-- rule -->
    <rule v-model="showRule" />
    <!-- recomend -->
    <recommend v-model="showRecommend" />
  </div>
</template>
<script>
import Recommend from './components/recommend'
import Rule from './components/rule'
import Services from '../../services/services'
import utils from '../../components/utils'
import _get from 'lodash.get'
export default {
  name: 'masterStrategy',
  data: ()=>({
    currentIndex: 0,
    info: {},
    showRule: false,
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
    /** 返回首页 **/
    backHome () {
      window.location.href = "//wap.beeplaying.com/xmWap/"
    },
    /** 打开规则 **/
    openRule () {
      this.showRule = true
    },
    /** 打开更多游戏 **/
    openRecommend () {
      this.showRecommend = true
      GLOBALS.marchSetsPoint('A_H5PT0282003395')
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