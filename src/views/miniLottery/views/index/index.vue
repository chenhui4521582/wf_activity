<template>
  <div class="index">
    <!-- <Header title="夺宝活动"/> -->
    <div class="bg">
      <img src="./img/bg1.png" alt="">
      <img src="./img/bg2.png" alt="">
    </div>
    <div class="container">
      <div class="btns">
        <div class="back" @click="backClick">
          <img src="./img/back-icon.png" alt="">
        </div>
        <div class="rule" @click="ruleClick">
          <img src="./img/rule-icon.png" alt="">
        </div>
        <div class="log" @click="logClick">
          <img src="./img/log-icon.png" alt="">
        </div>
      </div>
      <user-info :userInfo="userInfo"/>
      <list :list="list" />
    </div>
    <popup v-model="showPopup" :popupStatus="popupStatus" :list="historyList"/>
  </div>
</template>
<script>
import Services from "../../services/services"
import _get from 'lodash.get'
import Popup from './components/popup'
import UserInfo from './components/userInfo'
import List from './components/List'
export default {
  name: 'index',
  data: ()=> ({
    showPopup: false,
    popupStatus: 0,
    /** 用户信息 **/
    userInfo: {},
    /** 历史中奖列表 **/
    historyList: [],
    /** 夺宝列表 **/
    list: []
  }),
  components: {
    Popup,
    UserInfo,
    List
  },
  computed: {},
  methods: {
    /** 规则按钮点击 **/
    ruleClick() {
      this.showPopup = true
      this.popupStatus = 1
    },
    /** 历史记录按钮点击 **/
    logClick() {
      this.showPopup = true
      this.popupStatus = 2
    },
    /** 返回按钮点击 **/
    backClick() {
      window.location.history(-1)
    },
    /** 获取用户信息 **/
    _getUserInfo() {
      Services.getUserInfo().then(res=> {
        let {code, data, message} = _get(res, 'data')
        if(code === 200) {
          this.userInfo = data
        }
      })
    },
    /** 获取全部场次列表 **/
    _getLotteryList() {
      Services.getLotteryList().then(res=> {
        let {code, data, message} = _get(res, 'data')
        if(code === 200) {
          this.list = _get(res, 'data.data.list', [])
        }
      })
    },
    /** 获取之前场次列表 **/
    _getHistoryList() {
      Services.getHistoryList().then(res=> {
      })
    }
  },
  mounted() {
    this._getUserInfo()
    this._getLotteryList()
    this._getHistoryList()
  }
}
</script>
<style lang="less" scoped>
.index {
  position: relative;
  .bg {
    position: absolute;
    z-index: 1;
    width: 100%;
    img {
      width: 100%;
      vertical-align: top;
      &:last-child{
        margin-top: -1px;
      }
    }
  }
  .container {
    position: relative;
    z-index: 2;
    .btns {
      position: relative;
      width: 100%;
      height: 3.4rem;
      img {
        width: 100%;
        height: 100%;
      }
      .back {
        position: absolute;
        left: 0;
        top: .23rem;
        width: .91rem;
        height: .5rem;
      }
      .rule {
        position: absolute;
        right: 0;
        top: .27rem;
        width: .93rem;
        height: .6rem;
      }
      .log {
        position: absolute;
        right: 0;
        top: 1.06rem;
        width: .93rem;
        height: .6rem;
      }
    }
  }
}

</style>