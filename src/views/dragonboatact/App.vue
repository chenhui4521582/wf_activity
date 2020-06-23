<template>
  <div id="app" class="koiwish" v-if="actInfo" :class="{rank:showRank}">
    <div class="koiwish_container" :class="{bg1:tabIndex==1}" v-if="!showRank">
      <img class="back" src="./images/back.png" alt="" @click="back">
      <img class="rule" src="./images/rule.png" alt="" @click="showPop(1)">
      <img class="gonglue" src="./images/gonglue.png" alt="" @click="showPop(2)">
      <template v-if="tabIndex==1">
        <div class="myprize" @click="showPop(10)"></div>
        <div class="detail" @click="openRank" v-if="!isEnd">赛况</div>
        <div class="yesterday" @click="showPop(9)" v-else>昨日排行</div>
      </template>
      <div class="time" :class="{end:isEnd}">
        <template v-if="!isEnd">
          今日{{actInfo.thisDate}} 第{{actInfo.thisDay}}回合
          <template v-for="item in countdown.time.replace('小','').split('天')[1]">
            <i v-if="!['时','分','秒'].includes(item)">{{item}}</i>
            <template v-else>{{item}}</template>
          </template>
        </template>
        <template v-else>
          <div class="line"></div>&nbsp;活动已结束&nbsp;<div class="line"></div>
        </template>
      </div>
      <div class="tabs" :class="{tab1:tabIndex==1}">
        <div class="item" v-for="(item,index) in tabsName" :class="{selected:index==tabIndex}"
             @click="setTabIndex(index)">
          {{item}}
        </div>
      </div>
      <div class="content"
           :class="{animation:tabIndex==0&&(!isEnd&&actInfo.zongzi.open&&!actInfo.zongzi.todayReceive)}">
        <template v-if="tabIndex==0">
          <div class="info">领取福粽累计第4天和累计第7天奖励更高</div>
          <div class="totalDays">
            <div class="item" v-for="item in actInfo.zongzi.totalTimes" :class="{selected:item<=totalDays}">
              {{item}}天
            </div>
          </div>
          <div class="btn" :class="{btngray:isEnd||!actInfo.zongzi.open||actInfo.zongzi.todayReceive}"
               @click="goToAppointment">
            点击开启 <i>(每天{{actInfo.zongzi.beginHour}}点-{{actInfo.zongzi.endHour}}点)</i>
          </div>
        </template>
        <template v-else>
          <div class="channels">
            <div class="item" v-for="item,index in actInfo.trackList" @click="setChannel(index)">
              <img :src="`${require(`./images/tab${index}${selectChannel==index?1:0}.png`)}`" alt=""
                   :class="{selected:selectChannel==index}">
              <span class="num" :class="{num1:index==1,num2:index==2}">{{item.applyNum}}人参与</span>
            </div>
          </div>
          <div class="channel" :style="{backgroundImage:`url(${require(`./images/channel${selectChannel}.png`)})`}">
            <p :class="{channel0:selectChannel==0}">{{channelNames[selectChannel]}}第1名最高<i>{{actInfo.trackList[selectChannel].maxAwardsName}}</i>
            </p>
            <div class="horn_content">
              <horn :noticeList="hornList" :channel="selectChannel" v-if="hornList.length"></horn>
            </div>
          </div>
          <div class="combat">
            <div class="item" v-for="(item,index) in currentCombat"
                 :style="{height:(item.amount-(currentCombat[index+1]&&currentCombat[index+1].amount||0))/actInfo.trackList[selectChannel].totalAmount*100+'%'}">
              <div class="tip" :style="{backgroundImage:`url(${require(`./images/award${index}.png`)})`}">
                <div class="amount">{{item.amount}}米</div>
                <div class="awardsName" v-html="item.awardsName.replace('话费券',`<br>话费券`)"></div>
              </div>
            </div>
            <div class="boats" v-if="actInfo.userInfo">
              <div class="item" :class="{boat:!!actInfo.userInfo.topBoat}"
                   :style="{top:getTop(actInfo.userInfo.topBoat,0)}">
                <template v-if="actInfo.userInfo.topBoat">
                  <img src="./images/boat0.png" alt="">
                  <div class="name">{{actInfo.userInfo.topBoat.nickname}}</div>
                  <div class="amount">{{actInfo.userInfo.topBoat.amount||0}}米</div>
                </template>
              </div>
              <div class="item" :style="{top:getTop(actInfo.userInfo,1)}" id="myboat">
                <img src="./images/boat1.png" alt="">
                <div class="name mine"></div>
                <div class="amount">{{actInfo.userInfo.currentAmount||0}}米</div>
              </div>
              <div class="item" :class="{boat:!!actInfo.userInfo.bottomBoat}"
                   :style="{top:getTop(actInfo.userInfo.bottomBoat,0)}">
                <template v-if="actInfo.userInfo.bottomBoat">
                  <img src="./images/boat2.png" alt="">
                  <div class="name">{{actInfo.userInfo.bottomBoat.nickname}}</div>
                  <div class="amount">{{actInfo.userInfo.bottomBoat.amount||0}}米</div>
                </template>
              </div>
            </div>
          </div>
        </template>
      </div>
      <template v-if="tabIndex==1">
        <div class="gobtn" v-if="!isEnd&&appointState==1" @click="getSprint">
          <div class="item">当前可划桨</div>
          <div class="item"><i>{{actInfo.userInfo&&actInfo.userInfo.unUseAmount||0}}</i>米</div>
        </div>
        <div class="footer" :class="{gray:isEnd||appointState==2}" @click="footerClick">
          <template v-if="appointState!=1">
            <div class="item">立即报名</div>
            <div class="item">（每天{{actInfo.applyDeadlineHour}}点前可报名）</div>
          </template>
          <div class="item" v-else>我要助力</div>
        </div>
      </template>
    </div>
    <rank v-else @back="rankBack" @showPop="showPop"></rank>
    <com-pop :pop-type="popType" :awardData="awardData" ref="comPop" @close="popType=0"
             @refresh="getActInfo" :ruleTime="actInfo&&actInfo.beginDate" @chooseChannel="chooseChannel"
             @showPop5="showPop5" :channels="actInfo.trackList" :actInfo="actInfo"></com-pop>
    <dropDown :tabindex="tabIndex" :mallBizConfigs="packages" ref="dropDown"></dropDown>
    <loading v-show="showLoading" :showBar="false"></loading>
  </div>
</template>

<script>
  /* eslint-disable */
  import '../../common/js/window.js';
  import {activityInfo, getHornList, getPackages, goApply, getSign, getSprint} from './utils/api'

  export default {
    name: 'App',
    data() {
      return {
        tabsName: ['天降福粽', '龙舟大会'],
        popType: 0,//'活动规则', '端午争霸须知', '恭喜获得', '恭喜您！', '快去冲刺龙舟', '昨日战报', '点击选择赛道', '报名成功！', '昨日排行'
        showLoading: false,
        actInfo: null,
        awardData: null,
        timer: null,
        countdown: {
          time: ''
        },
        tabIndex: 0,
        isEnd: false,
        totalDays: 0,
        selectChannel: 0,
        channelNames: ['铜赛道', '银赛道', '金赛道'],
        hornList: [],
        appointState: 0,//0 未报名 1已报名 2报名过期,
        showRank: false,
        showDropDown: true,
        packages: []
      }
    },
    computed: {
      currentCombat() {
        return this.actInfo && this.actInfo.trackList[this.selectChannel].awardsList.slice().reverse() || []
      }
    },
    components: {
      comPop: () => import('./components/comPop'),
      loading: () => import('../../components/common/loading.vue'),
      horn: () => import('./components/horn.vue'),
      rank: () => import('./components/rank.vue'),
      dropDown: () => import('./components/dropDown')
    },
    methods: {
      rankBack() {
        this.showRank = false
        if (this.appointState == 1) {
          setTimeout(() => {
            this.getAnchor('myboat')
          }, 100)
        }
      },
      getTop(item, flag) {
        let amount = flag ? item.currentAmount : (item && item.amount || 0)
        let totalAmount = this.actInfo.trackList[this.selectChannel].totalAmount
        let xamount = totalAmount - amount
        return (xamount < 0 ? 0 : xamount) / totalAmount * 100 + '%'
      },
      setTabIndex(index) {
        if (index != this.tabIndex) {
          GLOBALS.marchSetsPoint(index ? 'A_H5PT0302003617' : 'A_H5PT0302003614')
          this.tabIndex = index
          if (index == 1 && this.appointState == 1) {
            setTimeout(() => {
              this.getAnchor('myboat')
            }, 100)
          }
        }
      },
      getAwardName(awardType) {
        switch (awardType) {
          case 'jyz':
            return '金叶子';
            break;
          case 'yg':
            return '鱼干';
            break;
          case 'jdk':
            return '京东券';
            break;
          case 'hfq':
            return '话费券';
            break;
        }
      },
      back() {
        GLOBALS.marchSetsPoint('A_H5PT0302003608')
        history.back(-1)
      },
      showPop(popType) {
        //'活动规则', '端午争霸须知', '恭喜获得', '恭喜您！', '快去冲刺龙舟', '昨日战报', '点击选择赛道', '报名成功！', '昨日排行'
        let points = ['A_H5PT0302003609', 'A_H5PT0302003610', 'A_H5PT0302003616', 'A_H5PT0302003624', 'A_H5PT0302003625', 'A_H5PT0302003626', 'A_H5PT0302003619', 'A_H5PT0302003620', 'A_H5PT0302003613', 'A_H5PT0302003611']
        let params = {}
        if (['A_H5PT0302003624', 'A_H5PT0302003625', 'A_H5PT0302003626'].includes(popType)) {
          if (popType == 'A_H5PT0302003624') {
            params = {
              race: this.channelNames[this.selectChannel],
              awards_name: this.awardData && this.awardData.awardsName || ''
            }
          } else if (popType == 'A_H5PT0302003625') {
            params = {
              awards_id: this.awardData && this.awardData.awardsName,
              awards_name: this.appointState == 0 ? '报名前' : '报名后'
            }
          } else {
            params = {
              awards_id: this.awardData && this.awardData.awardsName ? 1 : 0
            }
          }
        }
        points[popType - 1] && GLOBALS.marchSetsPoint(points[popType - 1], params)
        this.popType = popType
        setTimeout(() => {
          this.$refs.comPop.showPop()
        })
      },
      async getActInfo() {
        const {code, data} = await activityInfo()
        if (code === 200) {
          this.actInfo = data
          this.isEnd = data.state == 0 || data.state == 2
          this.totalDays = data.zongzi.totalReceiveTimes
          this.appointState = this.actInfo.applyStatus
          if (this.actInfo.userInfo) {
            this.selectChannel = this.actInfo.userInfo.trackLevel - 1
          } else {
            this.selectChannel = 0
          }
          !this.countdown.time && this.actInfo.countdown && GLOBALS.remainingTime(
            this,
            this.actInfo.countdown,
            this.countdown,
            true
          )
          if (this.actInfo.yesterdayAwards.popup) {
            this.awardData = this.actInfo.yesterdayAwards
            setTimeout(() => {
              this.showPop(6)
            }, 1000)
          } else {
            this.showPop5(1000)
          }
          this.getHornList(this.selectChannel + 1)
        }
      },
      showPop5(num) {
        if (this.actInfo.incrBagAmount || this.actInfo.incrGameAmount) {
          this.awardData = {
            awardsType: '', awardsName: (this.actInfo.incrBagAmount + this.actInfo.incrGameAmount),
            isFromPackage: this.actInfo.incrBagAmount > 0,
            isAppointment: this.appointState == 1
          }
          setTimeout(() => {
            this.showPop(5)
          }, num)
        }
      },
      footerClick() {
        if (!this.isEnd & this.appointState != 2) {
          if (this.appointState == 1) {
            // //我要助力
            GLOBALS.marchSetsPoint('A_H5PT0302003621')
            this.$refs.dropDown.showPop()
            GLOBALS.marchSetsPoint('A_H5PT0302003622')
          } else {
            GLOBALS.marchSetsPoint('A_H5PT0302003618')
            this.showPop(7)
          }
        }
      },
      async goToAppointment() {
        if (!this.isEnd && this.actInfo.zongzi.open && !this.actInfo.zongzi.todayReceive) {
          GLOBALS.marchSetsPoint('A_H5PT0302003615')//H5平台-端午争霸活动-点击开启按钮点击
          this.showLoading = true
          let {code, data, message} = await getSign()
          if (code == 200) {
            this.showLoading = false
            this.awardData = data
            this.showPop(3)
            this.getActInfo()
          } else {
            this.showLoading = false
            this.$toast.show({
              message,
              duration: 1000
            })
          }
        }
      },
      async chooseChannel(item) {
        this.showLoading = true
        let {code, data, message} = await goApply(item.trackLevel)
        if (code == 200) {
          this.showLoading = false
          this.selectChannel = item.trackLevel - 1
          this.awardData = {
            awardsType: 'channel' + (item.trackLevel - 1),
            awardsName: `您已成功加入${item.name}`
          }
          this.showPop(8)
          this.getActInfo()
        } else {
          this.showLoading = false
          this.$toast.show({
            message: message,
            duration: 1000
          })
        }
      },
      async getPackages() {
        let {code, data} = await getPackages()
        if (code == 200) {
          this.packages = data.mallBizConfigs
        }
      },
      setChannel(index) {
        if (!this.isEnd) {
          if (this.appointState == 0) {
            this.selectChannel != index && (setTimeout(() => {
              this.selectChannel = index
            }, 500))
            this.getHornList(this.selectChannel + 1)
          } else if (this.appointState == 1 && (index != this.selectChannel)) {
            this.$toast.show({
              message: `你已报名${this.channelNames[this.selectChannel]}`,
              duration: 1000
            })
          }
        }
      },
      async getHornList(idx) {
        let {code, data} = await getHornList(idx)
        if (code == 200) {
          this.hornList = data
        }
      },
      openRank() {
        if (!this.isEnd) {
          if (this.appointState == 1) {
            this.showRank = true
          } else {
            this.$toast.show({
              message: '报名后可见',
              duration: 1000
            })
          }
        } else {
          this.showRank = true
        }
      },
      async getSprint() {
        if (this.actInfo.userInfo && this.actInfo.userInfo.unUseAmount) {
          this.showLoading = true
          let {code, data, message} = await getSprint()
          if (code == 200) {
            this.showLoading = false
            this.actInfo.userInfo = data.userInfo
            if (data.unlockAwards) {
              setTimeout(() => {
                this.awardData = Object.assign(data.unlockAwards, {
                  amount: data.userInfo.currentAmount
                })
                this.showPop(4)
              }, 500)
            }
          } else {
            this.showLoading = false
            this.$toast.show({
              message,
              duration: 1000
            })
          }
        }
      },
      getAnchor(name) {
        if (window == window.top) {
          document.body.scrollTop = document.getElementById(name).offsetTop + document.getElementById(name).offsetHeight
          !document.body.scrollTop && (document.documentElement.scrollTop = document.getElementById(name).offsetTop + document.getElementById(name).offsetHeight)
        } else {
          document.getElementById('app').scrollTop = document.getElementById(name).offsetTop + document.getElementById(name).offsetHeight
        }
      },
    },
    async mounted() {
      GLOBALS.marchSetsPoint('P_H5PT0302', {
        source_address: GLOBALS.getUrlParam('from') || ''
      })//H5平台-端午争霸活动-页面加载完成(默认奖励页)
      this.getActInfo()
      GLOBALS.marchSetsPoint('A_H5PT0302003614')//H5平台-端午争霸活动-天降福粽页加载完成
      this.getPackages()
    },
    watch: {
      'countdown.time':
        function (val) {
          if (!val) {
            this.getActInfo()
          }
        }
    }
  }
</script>
<style lang="less">
  @import '../../common/css/base.css';
  @import url('./iconfont/iconfont.css');

  .koiwish {
    min-height: 100vh;
    position: relative;
    &:not(.rank) {
      background: #57D5E1;
      padding: 2.87rem 0 .5rem;
      box-sizing: border-box;
    }
    .koiwish_container {
      height: 11.37rem;
      background: url("./images/bg0.png");
      background-size: 100% 100%;
      position: absolute;
      width: 100%;
      top: 0;
      &.bg1 {
        height: 20.36rem;
        background: url("./images/bg1.png");
        background-size: 100% 100%;
      }
      &:before {
        content: '';
        width: 6.15rem;
        height: 2.39rem;
        position: absolute;
        top: .61rem;
        left: .65rem;
        background: url("./images/top.png");
        background-size: 100% 100%;
      }
      .time {
        right: 0;
        position: absolute;
        top: .3rem;
        font-size: .24rem;
        font-weight: 400;
        color: #692013;
        left: 0;
        text-align: center;
        i {
          display: inline-block;
          width: .19rem;
          height: .24rem;
          background: rgba(251, 199, 59, 1);
          border-radius: .04rem;
          text-align: center;
          line-height: .26rem;
          margin: 0 .02rem;
        }
        &.end {
          font-size: .3rem;
          font-weight: bold;
          color: rgba(105, 32, 19, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          .line {
            width: .42rem;
            height: .03rem;
            background: rgba(105, 31, 19, 1);
            border-radius: 1px;
          }
        }
      }
      .tabs {
        position: absolute;
        top: 3.1rem;
        left: 0;
        right: 0;
        margin: auto;
        width: 5.54rem;
        height: .75rem;
        background: url("./images/tab0.png");
        background-size: 100% 100%;
        display: flex;
        &.tab1 {
          background: url("./images/tab1.png");
          background-size: 100% 100%;
        }
        .item {
          flex: 1;
          text-align: center;
          line-height: .75rem;
          font-size: .3rem;
          font-weight: bold;
          color: rgba(4, 61, 32, 1);
          &.selected {
            color: rgba(107, 35, 21, 1);
          }
        }
      }
      .back {
        width: .68rem;
        height: .68rem;
        position: absolute;
        top: .17rem;
        left: .15rem;
        z-index: 1;
      }
      .rule {
        width: .68rem;
        height: .68rem;
        position: absolute;
        top: .96rem;
        left: .15rem;
      }
      .gonglue {
        width: .68rem;
        height: .68rem;
        position: absolute;
        top: 2.46rem;
        left: .15rem;
      }
      .myprize {
        width: .81rem;
        height: .7rem;
        background: rgba(247, 123, 37, 1);
        border-radius: .35rem 0 0 .35rem;
        position: absolute;
        top: .39rem;
        right: 0;
        &:before {
          content: '';
          position: absolute;
          top: -.22rem;
          left: 0;
          right: 0;
          margin: auto;
          width: .64rem;
          height: .86rem;
          background: url("./images/myprize.png");
          background-size: 100% 100%;
        }
      }
      .detail {
        width: .88rem;
        height: .7rem;
        background: rgba(255, 247, 44, 1);
        border-radius: .35rem 0 0 .35rem;
        position: absolute;
        top: 2.46rem;
        right: 0;
        font-size: .3rem;
        font-weight: bold;
        color: rgba(106, 33, 19, 1);
        text-align: center;
        line-height: .75rem;
      }
      .yesterday {
        width: .61rem;
        height: 1.59rem;
        padding: 0 .2rem;
        box-sizing: border-box;
        background: rgba(255, 108, 0, 1);
        border-radius: .2rem 0 0 .2rem;
        position: absolute;
        top: 2rem;
        right: 0;
        font-size: .3rem;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        display: flex;
        align-items: center;
      }
      .content {
        position: absolute;
        top: 4.03rem;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        .info {
          font-size: .24rem;
          font-weight: bold;
          color: rgba(34, 27, 12, 1);
          text-align: center;
          margin-bottom: .07rem;
        }
        .totalDays {
          width: 6.41rem;
          display: flex;
          justify-content: space-between;
          margin: auto;
          .item {
            width: .89rem;
            height: 1.12rem;
            background: url("./images/card.png");
            background-size: 100% 100%;
            font-size: .3rem;
            font-weight: bold;
            color: rgba(132, 53, 24, 1);
            text-align: center;
            line-height: 1.3rem;
            &.selected {
              background: url("./images/card_selected.png");
              background-size: 100% 100%;
            }
          }
        }
        &.animation {
          &:before {
            content: '';
            position: absolute;
            left: 1.48rem;
            bottom: 4.08rem;
            width: 1.15rem;
            height: .77rem;
            background: url("./images/tips0.png");
            background-size: 100% 100%;
            animation: toggleTip0 .5s infinite ease-in-out;
          }
          &:after {
            content: '';
            position: absolute;
            right: 1.53rem;
            bottom: 4.65rem;
            width: 1.15rem;
            height: .77rem;
            background: url("./images/tips1.png");
            background-size: 100% 100%;
            animation: toggleTip1 .5s infinite ease-in-out;
          }
        }
        .btn {
          margin: 3.91rem auto 0;
          width: 4.12rem;
          height: 1.28rem;
          background: url("./images/btn.png");
          background-size: 100% 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-size: .48rem;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
          i {
            margin-top: .09rem;
            font-size: .18rem;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
          }
          &.btngray {
            background: url("./images/btngray.png");
            background-size: 100% 100%;
          }
        }
        .channels {
          width: 5.72rem;
          height: 1.14rem;
          display: flex;
          justify-content: space-between;
          margin: auto;
          .item {
            position: relative;
            img {
              width: 1.78rem;
              height: .89rem;
              &.selected {
                width: 1.78rem;
                height: 1.14rem;
              }
            }
            .num {
              position: absolute;
              top: .57rem;
              left: 0;
              right: 0;
              margin: auto;
              font-size: .18rem;
              font-weight: 400;
              color: rgba(255, 210, 198, 1);
              text-align: center;
              &.num1 {
                color: rgba(43, 67, 73, 1);
              }
              &.num2 {
                color: rgba(191, 85, 55, 1);
              }
            }
          }
        }
        .channel {
          width: 5.72rem;
          height: 1.84rem;
          background-size: 100% 100%;
          margin: .18rem auto 1.6rem;
          position: relative;
          p {
            font-size: .3rem;
            font-weight: bold;
            color: rgba(255, 255, 255, 1);
            position: absolute;
            top: .21rem;
            left: 0;
            right: 0;
            text-align: center;
            i {
              color: #FFF33F;
            }
            &.channel0 {
              color: #591B05;
            }
          }
          .horn_content {
            position: absolute;
            top: .76rem;
            left: 2.13rem;
            right: .4rem;
          }
        }
        .combat {
          width: 5.63rem;
          height: 7.4rem;
          margin-left: 1.25rem;
          position: relative;
          .item {
            position: relative;
            .tip {
              position: absolute;
              top: -1.2rem;
              width: 5.63rem;
              height: 1.57rem;
              background-size: 100% 100%;
              .amount {
                height: .52rem;
                position: absolute;
                left: 4.7rem;
                right: 0;
                text-align: center;
                top: .1rem;
                font-size: .22rem;
                font-weight: bold;
                color: rgba(255, 255, 255, 1);
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .awardsName {
                position: absolute;
                left: 4.32rem;
                bottom: -0.4rem;
                font-size: .24rem;
                font-weight: bold;
                color: rgba(255, 255, 255, 1);
                text-align: center;
              }
            }
          }
          .boats {
            position: absolute;
            top: 0;
            bottom: 0;
            left: .52rem;
            right: 1.37rem;
            display: flex;
            justify-content: space-between;
            .item {
              position: absolute;
              display: flex;
              flex-direction: column;
              align-items: center;
              &:nth-child(1) {
                left: 0;
                width: .84rem;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                img {
                  width: .84rem;
                  height: 1.35rem;
                }
                .name, .amount {
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  font-size: .18rem;
                  font-weight: 400;
                  color: rgba(255, 255, 255, 1);
                  text-align: center;
                  &.amount {
                    color: rgba(254, 77, 77, 1);
                  }
                  &.name {
                    width: .84rem;
                    margin: .08rem 0 .06rem;
                  }
                }
              }
              &:nth-child(2) {
                left: 0;
                right: 0;
                img {
                  width: 1.39rem;
                  height: 2.18rem;
                }
                .name {
                  width: .35rem;
                  height: .26rem;
                  background: url("./images/mine.png");
                  background-size: 100% 100%;
                }
                .amount {
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  font-size: .24rem;
                  font-weight: 400;
                  color: rgba(254, 77, 77, 1);
                  margin: .04rem 0 .03rem;
                }
                transition: all 1s ease 0.5s;
              }
              &:nth-child(3) {
                right: 0;
                width: .84rem;
                img {
                  width: .84rem;
                  height: 1.35rem;
                }
                .name, .amount {
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  font-size: .18rem;
                  font-weight: 400;
                  color: rgba(255, 255, 255, 1);
                  text-align: center;
                  &.amount {
                    color: rgba(254, 77, 77, 1);
                  }
                  &.name {
                    width: .84rem;
                    margin: .08rem 0 .06rem;
                  }
                }
              }
            }
          }
        }
      }
      .gobtn {
        position: fixed;
        left: 0;
        bottom: 1.35rem;
        width: 2.91rem;
        height: 1.02rem;
        background: url("./images/gobtn.png");
        background-size: 100% 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding-right: 1rem;
        box-sizing: border-box;
        .item {
          font-size: .3rem;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
          &:nth-child(2) {
            margin-top: .1rem;
            i {
              color: #FFF22B;
            }
          }
        }
      }
      .footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 1.08rem;
        background: rgba(247, 131, 39, 1);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .item {
          font-size: .44rem;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
          &:nth-child(2) {
            margin-top: .11rem;
            font-size: .24rem;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
          }
        }
        &.gray {
          background: rgba(117, 117, 117, 1);
        }
      }
    }
  }

  @keyframes toggleTip0 {
    0% {
      bottom: 4.03rem;
    }

    50% {
      bottom: 4.08rem;
    }

    100% {
      bottom: 4.03rem;
    }
  }

  @keyframes toggleTip1 {
    0% {
      bottom: 4.7rem;
    }

    50% {
      bottom: 4.65rem;
    }

    100% {
      bottom: 4.7rem;
    }
  }
</style>
