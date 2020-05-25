<template>
  <main v-if="userInfo" class="main">
    <horn />
    <section class="rule" @click="showRule">
      玩法规则
    </section>
    <Rule @onClose="show=false" :begin="userInfo.beginDate" :end="userInfo.endDate" :show="show" />
    <header class="header">
      <section class="preview">
        <div>
          <p>邀请人数</p>
          <p class="count">
            {{userInfo.invitedNum}}
            <span class="unit">人</span>
          </p>
        </div>
        <div>
          <p>累计金叶</p>
          <p class="count">
            {{userInfo.totalAmount}}
          </p>
        </div>
        <div>
          <p>可提现金叶</p>
          <p class="count">
            {{userInfo.withdrawAbleAmount}}
          </p>
          <p class="button" @click="getGoldLeaf"></p>
        </div>
      </section>
    </header>
    <article class="content">
      <section class="title">
        <img src="../../assets/title-left.png" alt="">
        邀请好友加入平台 立得金叶子
        <img src="../../assets/title-left.png" alt="">
      </section>
      <section class="wrapper">
        <div class="item">
          <div class="center">
            <p>邀请好友下载</p>
            <p>多多玩并登录</p>
          </div>
          <div class="prize">
            立得<span>1000</span>金叶
          </div>
        </div>
        <div class="right-icon"></div>
        <div class="item">
          <div class="center">
            <p>好友完成平台</p>
            <p>新人任务</p>
          </div>
          <div class="prize">
            立得<span>2000</span>金叶
          </div>
        </div>
        <div class="right-icon"></div>
        <div class="item">
          <div class="center">
            <p>好友充值</p>
            <p>购买金叶子</p>
          </div>
          <div class="prize">
            立得至少<span>1%</span>返利
            上不封顶！
          </div>
        </div>
      </section>
      <section class="title">
        <img src="../../assets/title-left.png" alt="">
        邀请越多 返利越多！
        <img src="../../assets/title-left.png" alt="">
      </section>
      <section class="wrapper">
        <Task :info="item" v-for="(item,index) in userInfo.configList" :key="index" />
        <div class="task"></div>
      </section>
    </article>
    <Drawer :show="isShare">
      <section class="share-content">
        <div @click="invite('1')">
          <img src="./assets/friend.png" alt="">
          <p>朋友圈</p>
        </div>
        <div @click="invite('0')">
          <img src="./assets/wechat.png" alt="">
          <p>微信好友</p>
        </div>
      </section>
      <div @click="isShare = false" class="cancel">取消</div>
    </Drawer>
    <footer @click="share" class="footer">
      <img class="arrow left" src="../../assets/arrow.png" alt="">
      <img class="arrow right" src="../../assets/arrow.png" alt="">
    </footer>
  </main>
</template>

<script>
import Horn from './components/horn/hornList'
import Task from './components/task'
import Target from './components/target'
import Rule from './components/rule'
import Drawer from '../../components/drawer'
import { activityInfo, withdraw, getFragment } from '../../apis/index'
import AppCall from '../../native'

export default {
  data () {
    return {
      show: false,
      userInfo: null,
      isShare: false
    }
  },
  components: {
    Task, 
    Target, 
    Rule, 
    Drawer, 
    Horn
  },
  methods: {
    async getGoldLeaf () {
      GLOBALS.marchSetsPoint('A_H5PT0246002890', {
        invited_number: this.userInfo.invitedNum
      })
      if (!this.userInfo.withdrawAbleAmount) {
        this.$toast.show({
          message: '暂无可提现金叶子',
          duration: 1000
        })
        return
      }
      const data = await withdraw()
      this.init()
      this.$toast.show({
        message: data.message,
        duration: 1000
      })
    },
    showRule () {
      this.show = true
      GLOBALS.marchSetsPoint('A_H5PT0246002892', {
        invited_number: this.userInfo.invitedNum
      })
    },
    async init () {
      const data = await activityInfo()
      this.userInfo = data.data

      let userInfo = localStorage.getItem('user_Info')
      userInfo = userInfo && JSON.parse(userInfo)
      const userId = userInfo.userId
      const inviter = await getFragment(userId)
      
      this.fragment = inviter.data.fragment || 20

      GLOBALS.marchSetsPoint('P_H5PT0246', {
        invited_number: this.userInfo.invitedNum,
        source_address: GLOBALS.getUrlParam('from') || ''
      })
    },
    share () {
      GLOBALS.marchSetsPoint('A_H5PT0246002891', {
        invited_number: this.userInfo.invitedNum
      })
      this.isShare = true
    },
    // IOS分享测试
    invite (type) {
      let that = this
      const title = `我在这里赚了${this.fragment || 20}话费，看看你能领多少？`
      const url = `${location.href}share?userId=${JSON.parse(localStorage.getItem('user_Info')).userId}&channelId=100030`
      const content = '玩游戏就能免费领话费，还有好多其他奖品等你拿！'
      try {
        AppCall.shareContent(JSON.stringify({ url, title, content, type }))
      } catch (e) { }
    }
  },
  mounted () {
    this.init()
    window.backShareStatue = function (res) {
      if (GLOBALS.channel === 100031) {
        res = JSON.parse(res).shareStatue
      }
      that.$toast.show({
        message: res.Code == 1 ? '分享成功' : '分享失败',
        duration: 1500
      })
    }
  }
}
</script>

<style lang="less" scoped>
@keyframes moveLeft {
  50% {
    transform: translateX(0.3rem);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes moveRight {
  50% {
    transform: translateX(-0.3rem) rotate(180deg);
  }
  100% {
    transform: translateX(0) rotate(180deg);
  }
}

.main {
  min-height: 100vh;
  padding-bottom: .94rem;
  position: relative;
  display: flex;
  flex-direction: column;
  .share-content {
    padding: 0.38rem 0 0.48rem 0.33rem;
    display: flex;
    font-size: 0.18rem;
    & > div {
      padding-right: 0.2rem;
    }
    img {
      width: 1rem;
    }
  }
  .cancel {
    background: #f0f0f0;
    line-height: 0.9rem;
    font-size: 0.24rem;
    color: #ff4141;
    text-align: center;
  }
  .header {
    height: 4.8rem;
    padding-top: 3.2rem;
    background: url("../../assets/bg.png") no-repeat;
    background-size: 100% 100%;
  }
  .rule {
    width: 1.28rem;
    height: .4rem;
    line-height: 0.4rem;
    border-radius: 0.2rem;
    background: rgba(255, 79, 0, 0.73);
    color: #ffd5b6;
    font-size: 0.24rem;
    text-align: center;
    position: absolute;
    right: 0.17rem;
    top: 0.22rem;
    font-weight:800;
  }
  .preview {
    width: 6.4rem;
    margin: 0 auto;
    text-align: center;
    font-size: 0.24rem;
    color: #4c4a49;
    display: flex;
    & > div {
      border-right: 1px solid #cbcbcb;
      flex: 1;
      position: relative;
      &:last-child {
        border: none;
      }
      .button {
        position: absolute;
        left: 26%;
        width: 1rem;
        height: 0.3rem;
        background: url(./assets/btn.png) no-repeat center top;
        background-size: 100% 100%;
      }
      .count {
        color: #000;
        font-size: 0.42rem;
        font-weight: bold;
        padding: 0.1rem 0;
      }
      .unit {
        font-size: 0.2rem;
        color: #000;
      }
    }
  }
  .title {
    padding: 0 0.9rem 0.35rem;
    color: #fff;
    font-size: 0.26rem;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      width: 0.58rem;
    }
  }
  .content {
    padding-top: .23rem;
    background: url("../../assets/bg2.png") no-repeat;
    background-size: 100% 100%;
    flex: 1;
  }
  .wrapper {
    margin-bottom: .6rem;
    display: flex;
    padding: 0 0.2rem;
    justify-content: space-between;
    flex-wrap: wrap;
    .task {
      width: 2rem;
    }
    .item {
      width: 1.8rem;
      height: 1.8rem;
      text-align: center;
      border-radius: .32rem;
      background: #FFE4C9;
      &:last-child {
        .prize {
          white-space: normal;
          line-height: 1.2;
        }
      }
      .center {
        margin: 0 .18rem;
        height: 1.13rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        font-size: .24rem;
        font-weight: bold;
        color: #4C4A49;
        border-bottom: 1px solid #FFBEA1;
        p {
          white-space: nowrap;
          line-height: .4rem;
        }
      }
      .prize {
        height: .66rem;
        line-height: .66rem;
        font-size: .2rem;
        white-space: nowrap;
        span {
          color: #E93232;
          font-size: .28rem;
        }
      }
    }
    .right-icon {
      height: 1.8rem;
      width: .42rem;
      background: url(./assets/right-icon.png) no-repeat center center;
      background-size: .42rem .23rem;
    }
  }
}
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 0.94rem;
  width: 100%;
  background: url("../../assets/footer.png") no-repeat;
  background-size: cover;
  display: flex;
  justify-content: space-between;
  padding: 0.39rem 0.9rem 0;
  .arrow {
    width: 0.85rem;
    height: 0.23rem;
    &.left {
      animation: moveLeft 0.7s infinite ease-in-out;
    }
    &.right {
      transform: rotate(180deg);
      animation: moveRight 0.7s infinite ease-in-out;
    }
  }
}
</style>
