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
import _get from 'lodash.get'
import Popup from './components/popup'
import UserInfo from './components/userInfo'
import List from './components/List'
export default {
  name: 'index',
  data: ()=> ({
    showPopup: false,
    popupStatus: 0,
    historyList: [
      {
        periodId: 1,
        nickName: 'chenhui',
        title: '200元话费'
      },
      {
        periodId: 1,
        nickName: 'chenhui',
        title: '200元话费'
      },
      {
        periodId: 1,
        nickName: 'chenhui',
        title: '200元话费'
      },
      {
        periodId: 1,
        nickName: 'chenhui',
        title: '200元话费'
      },
      {
        periodId: 1,
        nickName: 'chenhui',
        title: '200元话费'
      },
      {
        periodId: 1,
        nickName: 'chenhui',
        title: '200元话费'
      }
    ],
    userInfo: {
      leaf: 9999,
      phone: 9999,
      cardLottery: 999
    },
    list: [
      {
        "countDown": 4000,
        "limitTotalAmount": 10,
        "participantsNumber": 0,
        "periodId": 1,
        "picture": require('./img/item-icon.png'),
        "smallTreasureId": 1,
        "title": "200元话费充值"
      },
      {
        "countDown": 4000,
        "limitTotalAmount": 10,
        "participantsNumber": 0,
        "periodId": 2,
        "picture": require('./img/item-icon1.png'),
        "smallTreasureId": 2,
        "title": "100元话费充值"
      },     
      {
        "countDown": 4000,
        "limitTotalAmount": 10,
        "participantsNumber": 0,
        "periodId": 3,
        "picture": require('./img/item-icon2.png'),
        "smallTreasureId": 3,
        "title": "50元话费充值"
      },     {
        "countDown": 4000,
        "limitTotalAmount": 10,
        "participantsNumber": 0,
        "periodId": 4,
        "picture": require('./img/item-icon3.png'),
        "smallTreasureId": 4,
        "title": "30元话费充值"
      }
    ]
  }),
  components: {
    Popup,
    UserInfo,
    List
  },
  computed: {},
  methods: {
    ruleClick() {
      this.showPopup = true
      this.popupStatus = 1
    },
    logClick() {
      this.showPopup = true
      this.popupStatus = 2
    },
    backClick() {
      window.location.history(-1)
    }
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