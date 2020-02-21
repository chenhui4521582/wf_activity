<template>
  <main v-if="userInfo"
    class="main">
    <section class="rule"
      @click="show=true">
      玩法规则
    </section>
    <Rule @onClose="show=false"
      :begin="userInfo.beginDate"
      :end="userInfo.endDate"
      :show="show" />
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
          <p class="button"
            @click="getGoldLeaf">去提现</p>
        </div>
      </section>
    </header>
    <article class="content">
      <section class="title">
        <img src="../../assets/title-left.png"
          alt="">
        <div>
          <p>邀请好友加入平台</p>
          <p>好友进行充值即可获得好友充值金额返利</p>
        </div>
        <img src="../../assets/title-left.png"
          alt="">
      </section>
      <section class="wrapper">
        <Task :info="item"
          v-for="(item,index) in userInfo.configList"
          :key="index" />
        <Target :price="userInfo.taskTotalAmount" />
      </section>
    </article>
    <Drawer :show="isShare">
      <section class="share-content">
        <div>
          <img src="./assets/friend.png"
            alt="">
          <p>朋友圈</p>
        </div>
        <div>
          <img src="./assets/wechat.png"
            alt="">
          <p>微信好友</p>
        </div>
        <div>
          <img src="./assets/qq.png"
            alt="">
          <p>QQ好友</p>
        </div>
        <div>
          <img src="./assets/zone.png"
            alt="">
          <p>QQ空间</p>
        </div>
      </section>
      <div @click="isShare = false"
        class="cancel">取消</div>
    </Drawer>
    <footer @click="invite"
      class="footer">
      <img class="arrow left"
        src="../../assets/arrow.png"
        alt="">
      <img class="arrow right"
        src="../../assets/arrow.png"
        alt="">
    </footer>
  </main>
</template>

<script>
import Task from './components/task'
import Target from './components/target'
import Rule from './components/rule'
import Drawer from '../../components/drawer'
import { activityInfo, withdraw } from '../../apis/index'
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
    Task, Target, Rule, Drawer
  },
  methods: {
    async getGoldLeaf () {
      if (!this.userInfo.withdrawAbleAmount) {
        this.$toast.show({
          message: '暂无可提现金叶子',
          duration: 1000
        })
        return
      }
      const data = await withdraw(this.userInfo.withdrawAbleAmount)
      this.init()
      this.$toast.show({
        message: data.message,
        duration: 1000
      })
    },
    async init () {
      const data = await activityInfo()
      this.userInfo = data.data
    },
    // IOS分享测试
    invite (type = 0) {
      let that = this

      window.backShareStatue = function(res){
        if (GLOBALS.channel === 100031) {
          res = JSON.parse(res).shareStatue
        }
        that.$toast.show({
          message: res === 1 ? '分享成功' : '分享失败',
          duration: 1500
        })
      }

      try{
        AppCall.shareContent(JSON.stringify({ url: location.href, title: document.title, content: '', type: '0' }))
      }catch(e){}
    }
  },
  mounted () {
    this.init()
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
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  .share-content {
    padding: 0.38rem 0 .48rem .33rem;
    display: flex;
    font-size: .18rem;
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
    line-height: 0.4rem;
    border-radius: 0.2rem;
    background: rgba(255, 79, 0, 0.73);
    color: #ffd5b6;
    font-size: 0.24rem;
    text-align: center;
    position: absolute;
    right: 0.17rem;
    top: 0.22rem;
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
        background: #ff5a00;
        color: #fff;
        border-radius: 0.15rem;
        font-size: 0.2rem;
        font-weight: bold;
        line-height: 0.3rem;
        width: 1rem;
        margin: 0 auto;
        position: absolute;
        left: 26%;
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
    padding: 0.23rem 0.9rem 0.35rem;
    color: #fff;
    font-size: 0.22rem;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      width: 0.58rem;
    }
  }
  .content {
    background: url("../../assets/bg2.png") no-repeat;
    background-size: 100% 100%;
    flex: 1;
  }
  .wrapper {
    display: flex;
    padding: 0 0.2rem;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}
.footer {
  position: absolute;
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
