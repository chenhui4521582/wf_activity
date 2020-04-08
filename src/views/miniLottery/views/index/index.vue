<template>
  <div class="index">
    <!-- <Header title="夺宝活动"/> -->
    <div class="bg">
      <img src="./img/bg1.png" alt="">
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
        <div class="my-log" @click="mylogClick">
          <img src="./img/my-log-icon.png" alt="">
        </div>
      </div>
      <user-info :userInfo="userInfo"/>
      <list :list="list" @refreshList="_getLotteryList"/>
      <div class="rule">
        <div class="title">
          <img src="./img/rule-title-1.png" alt="">
        </div>
        <div class="center">
          1. 活动时间：2020.04.10 00:00:00-2020.04.17 23:59:59<br>
          2. 参与方式：消耗话费券换取夺宝码参与夺宝，每日夺宝商品参与次数的上限根据商品不同而不同，详情见夺宝商品详情页面。<br>
          3. 话费券和夺宝码换取比例：1话费券=1夺宝码。<br>
          4. 开奖条件：到达夺宝商品的开奖时间且夺宝商品参与人数满足最低开奖条件。<br>
          5. 开奖规则：系统随机抽取一个夺宝码作为幸运码，用户拥有的夺宝码中有幸运码的用户即为中奖用户。<br>
          6. 奖品发放规则：所得奖品将发放至我的资产，可至【我的夺宝记录】查看发放记录。<br>
          7. 活动解释权归平台所有。
        </div>
      </div>
    </div>
    <popup v-model="showPopup" :popupStatus="popupStatus" :list="historyList"/>
  </div>
</template>
<script>
import Services from "../../services/services"
import _get from 'lodash.get'
import Popup from './components/popup'
import UserInfo from './components/userInfo'
import List from './components/list'
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
      GLOBALS.marchSetsPoint('A_H5PT0202002076')
    },
    /** 历史记录按钮点击 **/
    logClick() {
      this.$router.push({
        name: 'log',
        query: {
          from: 'historylog'
        }
      })
    },
    mylogClick() {
      this.$router.push({
        name: 'log',
        query: {
          from: 'mylog'
        }
      })
    },
    /** 返回按钮点击 **/
    backClick() {
      GLOBALS.marchSetsPoint('A_H5PT0202002075')
      window.history.go(-1)
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
    }
  },
  mounted() {
    this._getUserInfo()
    this._getLotteryList()
    GLOBALS.marchSetsPoint('P_H5PT0202')
  }
}
</script>
<style lang="less" scoped>
.index {
  min-height: 100vh;
  position: relative;
  background: #fb5a46;
  .bg {
    position: absolute;
    z-index: 1;
    width: 100%;
    img {
      width: 100%;
      vertical-align: top;
    }
  }
  .container {
    position: relative;
    z-index: 2;
    .btns {
      position: relative;
      width: 100%;
      height: 3.36rem;
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
        top: .22rem;
        width: .93rem;
        height: .6rem;
      }
      .log {
        position: absolute;
        right: 0;
        top: .92rem;
        width: .93rem;
        height: .6rem;
      }
      .my-log {
        position: absolute;
        right: 0;
        top: 1.64rem;
        width: .93rem;
        height: .6rem;
      }
    }
    .rule {
      .title {
        height: .38rem;
        text-align: center;
        img {
          vertical-align: top;
          height: 100%;
        }
      }
      .center {
        padding: .27rem .33rem;
        font-size: .22rem;
        color: #fff;
        line-height: .38rem;
      }
    }
  }
}

</style>