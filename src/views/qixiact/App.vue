<template>
  <div class="bigbonus" id="app" v-if="actInfo" :class="{fixed:$refs.dropDown&&$refs.dropDown.curIndex}">
    <img src="./images/back.png" alt="" class="back" @click="backHome">
    <img src="./images/rule.png" alt="" class="rule" @click="showPop(7)">
    <message ref="message"></message>
    <img src="./images/gonglue.png" alt="" class="gonglue" @click="showPop(9)">
    <div class="receive_prize" :class="{red:actInfo.personalUnReceive||actInfo.teamUnReceive}"
         @click="showPop(1,actInfo.personalUnReceive&&!actInfo.teamUnReceive?1:0)">
      领奖
    </div>
    <div class="qixi_countdown">
      <template v-if="actInfo.state==1">
        距离活动结束
        <div class="countdown_item" v-for="item in countTime.split('')">
          <i v-if="!['天','时','分','秒'].includes(item)">{{item}}</i>
          <template v-else>{{item}}</template>
        </div>
      </template>
      <template v-else>
        <div class="countdown_item end">
          活动已结束
        </div>
      </template>
    </div>
    <div class="qixi_times">
      今日鹊桥会<i>第{{actInfo.dynamic.round}}场</i>
    </div>
    <div class="boy_girl">
      <div class="item" :style="{left:girlLeft}"></div>
      <div class="item" :style="{right:boyRight}"></div>
    </div>
    <div class="bridge">
      <span>当前距离相会还差<i>{{actInfo.dynamic.diffAmount}}</i>米</span>
    </div>
    <div class="gain_distance">
      <div class="item">牛郎获得助力<i>{{actInfo.dynamic.menAmount}}米</i></div>
      <div class="item">织女获得助力<i>{{actInfo.dynamic.womenAmount}}米</i></div>
    </div>
    <div class="operation_btn" :class="{gain:actInfo.userTeam>-1,gray:actInfo.state!=1,finger:showFinger}"
         @click="operation"></div>
    <div class="task">
      <div class="tabs">
        <div class="item" v-for="(item,index) in tabs" :class="{selected:tabIndex==index}"
             @click="changeTabIndex(index)">
          <img :src="tabIndex==index?item.activeIcon:item.icon" alt="">
          <span>{{item.text}}</span>
        </div>
      </div>
      <template v-if="tabIndex==0">
        <div class="my_info">
          <div class="title_items">
            <div class="title">我的队伍</div>
            <div class="title">我的名次</div>
            <div class="title">本场助力</div>
            <div class="title">预计奖励</div>
          </div>
          <div class="content">
            <ul>
              <li v-if="actInfo.userTeam>-1&&record">
                <div>{{record.user.team==0?'织女助力队':'牛郎助力队'}}</div>
                <div>{{record.user.rank?record.user.rank:'无'}}</div>
                <div>{{record.user.amount}}</div>
                <div v-html="record.user.awards.replace('+','<br>(加奖')+')'"
                     v-if="record.user.awards.includes('+')"></div>
                <div v-else>{{record.user.awards}}</div>
              </li>
              <li v-else>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </li>
            </ul>
          </div>
        </div>
        <div class="qixi_teamPrize" :class="{girl:!isBoyTeam}">
          <div class="qixi_teamPrize_content">
            <div class="num">
              <template v-if="actInfo.state!=1">活动结束</template>
              <template v-else-if="actInfo.userTeam>-1">{{record&&record.rank.teamAwards}}</template>
              <template v-else>加入可见</template>
              <img :src="`${require(`./images/${isBoyTeam?'help':'help_girl'}.png`)}`" alt=""
                   @click="showPop(8)">
            </div>
            <div class="info" :class="{girl:!isBoyTeam}">
              (预计本场鹊桥会达成团队奖励) <img src="./images/lastDatum_icon.png" alt="" @click="showPop(2,isBoyTeam?0:1)">
            </div>
          </div>
          <img :src="`${require(`./images/${!isBoyTeam?'boyteam_icon':'girlteam_icon'}.png`)}`" alt=""
               @click="changeData" class="teamIcon">
        </div>
        <div class="team_record">
          <div class="title_items">
            <div class="title">名次</div>
            <div class="title">玩家昵称</div>
            <div class="title">本场场次助力</div>
            <div class="title">预计奖励</div>
          </div>
          <div class="content" :class="{empty:actInfo.userTeam==-1}">
            <ul v-if="actInfo.userTeam>-1&&record&&record.rank.rankList.length">
              <li v-for="(item,index) in record.rank.rankList" :class="{last:index==record.rank.rankList.length-1}">
                <div><em :class="{first:item.rank==1,second:item.rank==2,third:item.rank==3}">{{item.rank}}</em>
                </div>
                <div>{{item.nickname}}</div>
                <div>{{item.amount}}米</div>
                <div v-html="item.awardsName.replace('+','<br>(加奖')+')'" v-if="item.awardsName.includes('+')"></div>
                <div v-else>{{item.awardsName}}</div>
              </li>
            </ul>
            <template v-if="actInfo.userTeam==-1">
              <img src="./images/all_icon.png" alt="">
              <span v-if="actInfo.state==1">加入可见</span>
              <span v-else>活动结束</span>
            </template>
          </div>
        </div>
        <div class="qixi_footer">
          加入队伍且助力比0.1%以上才可瓜分奖励；单场鹊桥会助力，队伍前3名有额外奖励；因人数较多，优先展示每组前10名玩家。
        </div>
      </template>
      <template v-else>
        <div class="last_rank">
          <div class="item"><em></em>每日个人榜</div>
          <div class="item" @click="showPop(3)">上期排行></div>
        </div>
        <div class="my_info mine">
          <div class="title_items mine">
            <div class="title">我的名次</div>
            <div class="title">今日累计助力(米）</div>
            <div class="title">奖励</div>
          </div>
          <div class="content mine">
            <ul>
              <li v-if="actInfo.userTeam>-1&&record">
                <div>{{record.myRank?record.myRank:'无'}}</div>
                <div>{{record.amount}}</div>
                <div v-html="record.currentAwards.replace('+','<br>(加奖')+')'"
                     v-if="record.currentAwards.includes('+')"></div>
                <div v-else>{{record.currentAwards}}</div>
              </li>
              <li v-else>
                <div></div>
                <div></div>
                <div></div>
              </li>
            </ul>
          </div>
        </div>
        <div class="team_record mine">
          <div class="title_items mine">
            <div class="title">名次</div>
            <div class="title">玩家昵称</div>
            <div class="title">本场场次助力</div>
            <div class="title">预计奖励</div>
          </div>
          <div class="content mine" :class="{empty:actInfo.userTeam==-1}">
            <ul v-if="actInfo.userTeam>-1&&record&&record.rankList.length">
              <li v-for="(item,index) in record.rankList" :class="{last:index==record.rankList.length-1}">
                <div><em :class="{first:item.rank==1,second:item.rank==2,third:item.rank==3}">{{item.rank}}</em>
                </div>
                <div>{{item.nickname}}</div>
                <div>{{item.amount}}米</div>
                <div v-html="item.awardsName.replace('+','<br>(加奖')+')'" v-if="item.awardsName.includes('+')"></div>
                <div v-else>{{item.awardsName}}</div>
              </li>
            </ul>
            <template v-if="actInfo.userTeam==-1">
              <img src="./images/all_icon.png" alt="">
              <span v-if="actInfo.state==1">加入可见</span>
              <span v-else>活动结束</span>
            </template>
          </div>
        </div>
        <div class="qixi_footer">
          个人榜不分组别，全服助力值最多前10名玩家获得排行大奖
        </div>
      </template>
    </div>
    <div class="back_top" v-if="isShowTopIcon" @click="getAnchor('app')" id="backTop"></div>
    <drop-down ref="dropDown" :actInfoData="actInfo" @showPop="showPop"
               @refresh="_getInfo">
    </drop-down>
    <comPop :popType="popType" :actInfoData="actInfo" :awardData="awardData" ref="comPop"
            @close="closePop" @showPop="showPop" @opendown="$refs.dropDown.curIndex=1" @refresh="_getInfo"></comPop>
    <loading v-show="showLoading" :showBar="false"></loading>
  </div>
</template>
<script>
  import {
    activityInfo,
    applyTeam,
    getDynamic,
    getCurrentTeamRank,
    getRankListPersonal
  } from './utils/api'

  export default {
    name: 'bigbonus',
    data: () => ({
      popType: 0,
      hornList: [],
      showLoading: false,
      actInfo: null,
      awardData: null,
      timer: null,
      percent: ['0.5', '1', '3'],
      countTime: '',
      tabs: [{
        text: '团队榜',
        icon: `${require(`./images/team_icon0.png`)}`,
        activeIcon: `${require(`./images/team_icon1.png`)}`
      }, {
        text: '个人榜',
        icon: `${require(`./images/person_icon0.png`)}`,
        activeIcon: `${require(`./images/person_icon1.png`)}`
      }
      ],
      tabIndex: 0,
      isBoyTeam: true,
      record: null,
      timerDynamic: null,
      round: 0,
      showFinger: false,
      isShowTopIcon: false
    }),
    computed: {
      girlLeft() {
        if (this.actInfo.dynamic.womenAmount + this.actInfo.dynamic.menAmount > this.actInfo.totalAmount) {
          return (-100 + 520 * this.actInfo.dynamic.womenAmount / (this.actInfo.dynamic.womenAmount + this.actInfo.dynamic.menAmount)) / 100 + 'rem'
        } else {
          return (-100 + 520 * this.actInfo.dynamic.womenAmount / this.actInfo.totalAmount) / 100 + 'rem'
        }
      },
      boyRight() {
        if (this.actInfo.dynamic.womenAmount + this.actInfo.dynamic.menAmount > this.actInfo.totalAmount) {
          return (520 * this.actInfo.dynamic.menAmount / (this.actInfo.dynamic.womenAmount + this.actInfo.dynamic.menAmount)) / 100 + 'rem'
        } else {
          return (520 * this.actInfo.dynamic.menAmount / this.actInfo.totalAmount) / 100 + 'rem'
        }
      },
      fontsize() {
        return parseFloat(localStorage.getItem('fontsize') || '100')
      }
    },
    components: {
      horn: () => import('./components/horn'),
      comPop: () => import('./components/comPop'),
      loading: () => import('../../components/common/loading'),
      DropDown: () => import('./dropDown.vue'),
      message: () => import('./components/message')
    },
    methods: {
      //倒计时
      countDown(item) {
        if (!item) return false
        let date = item / 1000
        this.timer = setInterval(() => {
          date = date - 1
          if (date <= 0) {
            date = 0
            clearInterval(this.timer)
            this.countTime = ''
            return
          }
          let day = Math.floor(date / 86400)
          let hour = Math.floor(parseInt(date / 60 / 60) % 24)
          let minute = Math.floor(parseInt(date / 60) % 60)
          let second = Math.floor(date % 60)
          // let countDay = day >= 10 ? day : '0' + day
          let countDay = day >= 10 ? day : '0' + day
          let countHour = hour >= 10 ? hour : '0' + hour
          let countMinute = minute >= 10 ? minute : '0' + minute
          let countSecond = second >= 10 ? second : '0' + second
          if (day > 0) {
            this.countTime = `${countDay}天${countHour}时${countMinute}分${countSecond}秒`
          } else {
            this.countTime = `${hour ? countHour + '时' : ''}${countMinute}分${countSecond}秒`
          }
        }, 1000)
      },
      //弹窗关闭
      closePop() {
        this.popType = 0
        this.awardData = null
      },
      move(e) {
        e.preventDefault()
      },
      //弹窗
      showPop(type, data) {
        this.popType = type
        let point = ''
        switch (type) {
          case 1:
            point = 'A_H5PT0323004011';
            break;//H5平台-七夕鹊桥会活动-领奖按钮点击
          case 3:
            point = 'A_H5PT0323004018';
            break;//H5平台-七夕鹊桥会活动-个人榜-上期排行框加载完成
          case 7:
            point = 'A_H5PT0323004007';
            break;//规则点击
          case 9:
            point = 'A_H5PT0323004008';
            break;//中奖攻略
          case 8:
            point = 'A_H5PT0323004014';
            break;//奖池计算说明
          case 10:
            point = 'A_H5PT0323004017';
            break;//H5平台-七夕鹊桥会活动-新增助力值弹窗加载完成
          case 11:
            point = 'A_H5PT0323004019';
            break;//H5平台-七夕鹊桥会活动-奖励待领取弹窗加载完成
          case 12:
            point = 'A_H5PT0323004010';
            break;//H5平台-七夕鹊桥会活动-入队成功弹窗加载完成
        }
        data && (this.awardData = data)
        if ([1, 2].includes(type)) {
          this.awardData = {
            tabIndex: data
          }
        }
        point && GLOBALS.marchSetsPoint(point)
        setTimeout(() => {
          this.$refs.comPop.showPop()
        })
      },
      //返回
      backHome() {
        GLOBALS.marchSetsPoint('A_H5PT0323004006')
        history.back(-1)
      },
      //获取活动信息
      async _getInfo(isFirst = false) {
        let {code, data} = await activityInfo()
        if (code == 200) {
          this.actInfo = data
          this.countDown(data.countdown)
          this.round = this.actInfo.dynamic.round
          if (this.actInfo.userTeam > -1) {
            this.isBoyTeam = this.actInfo.userTeam == 1
          }
          if (this.timerDynamic) {
            clearInterval(this.timerDynamic)
          }
          if (this.actInfo.state == 1) {//活动期间轮询接口
            this.timerDynamic = setInterval(() => {
              this.setJackpotAmount()
            }, 5000)
            this.getTodayData()
          }
          if (this.actInfo.firstLoadPopup) {//首次进入强弹活动攻略
            setTimeout(() => {
              this.showPop(9)
            }, 1500)
          } else if (this.actInfo.personalUnReceive || this.actInfo.teamUnReceive) {
            if (isFirst) {
              if (this.actInfo.incrNum) {
                this.awardData = {
                  popType: 10,
                  amount: this.actInfo.incrNum
                }
              }
              setTimeout(() => {
                this.showPop(11)
              }, 1500)
            } else {
              if (this.actInfo.incrNum) {
                this.awardData = {
                  amount: this.actInfo.incrNum
                }
                setTimeout(() => {
                  this.showPop(10)
                }, 1500)
              }
            }
          } else if (this.actInfo.incrNum) {
            this.awardData = {
              amount: this.actInfo.incrNum
            }
            setTimeout(() => {
              this.showPop(10)
            }, 1500)
          }
        }
      },
      init() {
        this._getInfo(true)
      },
      //定时刷新
      async setJackpotAmount() {
        let {code, data} = await getDynamic()
        if (code == 200) {
          this.actInfo.dynamic = data
          if (this.round != this.actInfo.dynamic.round) {
            this._getInfo(false)
          }
        }
      },
      async operation() {
        if (this.actInfo.state == 1) {
          if (this.actInfo.userTeam == -1) {//入队
            GLOBALS.marchSetsPoint('A_H5PT0323004009')//H5平台-七夕鹊桥会活动-一键入队按钮点击
            let {code, data, message} = await applyTeam()
            if (code == 200) {
              this.awardData = {
                team: data
              }
              this.showPop(12)
              await this._getInfo(false)
              this.showFinger = true
              setTimeout(() => {
                this.showFinger = false
              }, 3000)
            } else {
              this.$toast.show({
                message
              })
            }
          } else {//助力
            GLOBALS.marchSetsPoint('A_H5PT0323004016')//H5平台-七夕鹊桥会活动-获取助力值按钮点击
            this.$nextTick(() => {
              this.$refs.dropDown.outHandleTab()
            })
          }
        }
      },
      changeTabIndex(index) {
        this.tabIndex = index
        this.getTodayData()
      },
      changeData() {
        GLOBALS.marchSetsPoint('A_H5PT0323004013')
        this.isBoyTeam = !this.isBoyTeam
        this.getTodayData()
      },
      async getTodayData() {
        if (this.actInfo.userTeam > -1) {
          this.record = null
          if (this.tabIndex == 0) {
            let {code, data} = await getCurrentTeamRank(this.isBoyTeam ? 1 : 0)
            if (code == 200) {
              this.record = data
            }
          } else {
            let {code, data} = await getRankListPersonal(true)
            if (code == 200) {
              this.record = data
            }
          }
        }
      },
      getAnchor(name) {
        if (window == window.top) {
          document.body.scrollTop = document.getElementById(name).offsetTop - parseFloat(document.querySelector('html').style.fontSize || 0) * 0.76
          !document.body.scrollTop && (document.documentElement.scrollTop = document.getElementById(name).offsetTop - parseFloat(document.querySelector('html').style.fontSize || 0) * 0.76)
        } else {
          document.getElementById('app').scrollTop = document.getElementById(name).offsetTop - parseFloat(document.querySelector('html').style.fontSize || 0) * 0.76
          this.isShowTopIcon = false
        }
      },
    },
    async mounted() {
      GLOBALS.marchSetsPoint('P_H5PT0323', {
        source_address: GLOBALS.getUrlParam('from') || ''
      })
      await this.init()
      if (window == window.top) {
        window.onscroll = () => {
          //超过一屏就显示回到顶部的图标
          this.isShowTopIcon = (document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop) >= 4.32 * this.fontsize
        }
      } else {
        window.ontouchmove = () => {
          //超过一屏就显示回到顶部的图标
          this.isShowTopIcon = document.getElementById('app').scrollTop >= 4.32 * this.fontsize
        }
      }
    },
    watch: {
      countTime(value) {
        if (!value) {
          this._getInfo(true)
        }
      }
    }
  }
</script>
<style scoped lang="less">
  @import '../../common/css/base.css';

  * {
    box-sizing: border-box;
  }

  .bigbonus {
    min-height: 100vh;
    background: #369BC9;
    padding: 6.43rem 0 .5rem;
    box-sizing: border-box;
    position: relative;
    &:before {
      content: '';
      width: 100%;
      height: 20.33rem;
      background: url("./images/bg.jpg");
      background-size: 100% 100%;
      position: absolute;
      top: 0
    }
    &.fixed {
      position: fixed;
      left: 0;
      right: 0;
      margin: auto;
    }
    .back, .rule, .gonglue {
      width: .7rem;
      height: .7rem;
      position: absolute;
      top: .19rem;
      left: .15rem;
      &.rule {
        top: 1.1rem;
      }
      &.gonglue {
        top: 2rem;
      }
    }
    .receive_prize {
      position: absolute;
      top: 1.72rem;
      right: 0;
      width: .94rem;
      height: .66rem;
      line-height: .66rem;
      text-align: center;
      background: rgba(240, 121, 5, 1);
      border-radius: .33rem 0 0 .33rem;
      font-size: .36rem;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      &.red:before {
        content: '';
        width: .18rem;
        height: .18rem;
        background: rgba(255, 9, 56, 1);
        border-radius: 50%;
        position: absolute;
        left: .04rem;
        top: -0.05rem;
      }
    }
    .qixi_countdown {
      position: absolute;
      top: .18rem;
      left: 0;
      right: 0;
      margin: auto;
      font-size: 0.22rem;
      font-weight: 400;
      color: rgba(255, 254, 250, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      .countdown_item {
        margin-left: 0.01rem;
        i {
          display: inline-block;
          width: 0.2rem;
          height: 0.25rem;
          line-height: 0.25rem;
          text-align: center;
          background: rgba(34, 106, 194, 1);
          border-radius: 0.04rem;
        }
        &.end {
          margin-left: 0;
          font-size: .3rem;
        }
      }
    }
    .qixi_times {
      width: 2.35rem;
      position: absolute;
      top: 2.41rem;
      left: 2.6rem;
      font-size: .26rem;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      text-align: center;
      i {
        color: #FFDE3E;
      }
    }
    .boy_girl {
      position: absolute;
      top: 2.69rem;
      width: 100%;
      height: 2.78rem;
      .item {
        position: absolute;
        width: 2.06rem;
        height: 2.56rem;
        background: url("./images/girl.png");
        background-size: 100% 100%;
        bottom: 0;
        transition: all 1s ease 0.5s;
        &:nth-child(2) {
          position: absolute;
          width: .94rem;
          height: 2.78rem;
          background: url("./images/boy.png");
          background-size: 100% 100%;
        }
      }
    }
    .bridge {
      position: absolute;
      top: 2.83rem;
      width: 100%;
      height: 4.93rem;
      background: url("./images/bridge.png");
      background-size: 100% 100%;
      span {
        position: absolute;
        top: 2.87rem;
        left: 2.3rem;
        width: 2.9rem;
        font-size: .2rem;
        font-weight: bold;
        color: #a04521;
        text-align: center;
        i {
          color: #C90712;
        }
      }
    }
    .gain_distance {
      position: relative;
      width: 4.66rem;
      height: 1.38rem;
      background: url("./images/PK.png");
      background-size: 100% 100%;
      padding: .1rem 0;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      margin: 0 auto .46rem;
      .item {
        font-size: .3rem;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        i {
          color: #FFE558;
        }
      }
    }
    .operation_btn {
      width: 5.61rem;
      height: 1.14rem;
      margin: 0 auto .37rem;
      background: url("./images/btnAdd1.png");
      background-size: 100% 100%;
      position: relative;
      &.gain {
        background: url("./images/btnGain.png");
        background-size: 100% 100%;
      }
      &.gray {
        background: url("./images/btnAdd0.png");
        background-size: 100% 100%;
      }
      &.finger {
        &:before {
          content: '';
          position: absolute;
          top: .07rem;
          left: 4.11rem;
          width: 1.76rem;
          height: 1.1rem;
          background: url("./images/finger.png");
          background-size: 100% 100%;
          animation: fingerMove 1s infinite ease-in-out;
        }
      }
    }
    .task {
      position: relative;
      width: 6.69rem;
      /*height: 10.11rem;*/
      background: url("./images/task_bg.png");
      background-size: 100% 100%;
      margin: 0 auto;
      padding: .22rem;
      box-sizing: border-box;
      .tabs {
        display: flex;
        width: 6.24rem;
        height: .93rem;
        background: rgba(25, 72, 118, 1);
        border-radius: .08rem;
        overflow: hidden;
        .item {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: .4rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          &:nth-child(1) {
            img {
              width: .51rem;
              height: .4rem;
              margin-right: .3rem;
            }
          }
          &:nth-child(2) {
            img {
              width: .42rem;
              height: .42rem;
              margin-right: .18rem;
            }
          }
          &.selected {
            background: rgba(70, 189, 156, 1);
            color: rgba(255, 242, 149, 1);
          }
        }
      }
      .my_info {
        width: 100%;
        height: 1.6rem;
        position: relative;
        margin: .15rem auto 0;
        font-size: .22rem;
        font-weight: 400;
        color: rgba(255, 227, 197, 1);
        border-radius: .08rem;
        overflow: hidden;
        &.mine {
          height: 1.07rem;
          border-radius: .08rem .08rem 0 0;
        }
        .title_items {
          display: flex;
          align-items: center;
          height: .56rem;
          background: rgba(49, 82, 131, 1);
          color: rgba(177, 208, 255, 1);
          .title {
            flex: .8;
            text-align: center;
            height: .3rem;
            line-height: .3rem;
            box-sizing: border-box;
            &:nth-child(1) {
              flex: .9;
            }
            &:nth-child(4) {
              flex: 1.5;
            }
            &:nth-child(1), &:nth-child(2), &:nth-child(3) {
              border-right: 1px solid rgba(34, 63, 107, 1);
            }
          }
          &.mine {
            background: rgba(84, 150, 172, 1);
            color: rgba(255, 255, 255, 1);
            .title {
              border: 0;
              &:nth-child(1) {
                flex: .5;
              }
            }
          }
        }
        .content {
          position: absolute;
          height: 1.04rem;
          left: 0rem;
          right: 0;
          font-weight: 400;
          background: rgba(34, 63, 107, 1);
          overflow: hidden;
          color: rgba(255, 242, 149, 1);
          border-radius: 0 0 .08rem .08rem;
          ul {
            display: flex;
            flex-direction: column;
            li {
              display: flex;
              justify-content: space-between;
              align-items: center;
              height: 1.04rem;
              div {
                flex: .8;
                text-align: center;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                &:nth-child(1) {
                  flex: .9;
                }
                &:nth-child(4) {
                  flex: 1.5;
                }
              }
            }
          }
          &.mine {
            height: .5rem;
            background: rgba(84, 150, 172, 1);
            border-radius: 0;
            ul {
              li {
                height: .5rem;
                div {
                  font-size: .24rem;
                  &:nth-child(1) {
                    flex: .5;
                  }
                }
              }
            }
          }
        }
      }
      .qixi_teamPrize {
        margin-top: .15rem;
        width: 100%;
        height: 1.8rem;
        background: url("./images/boyteam_prize.png");
        background-size: 100% 100%;
        position: relative;
        &.girl {
          background: url("./images/girlteam_prize.png");
          background-size: 100% 100%;
        }
        .qixi_teamPrize_content {
          width: 100%;
          height: 100%;
          padding-top: .7rem;
          box-sizing: border-box;
          .num {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: .48rem;
            font-weight: bold;
            color: rgba(233, 33, 33, 1);
            img {
              margin-left: .2rem;
              width: .4rem;
              height: .4rem;
            }
          }
          .info {
            height: .38rem;
            font-size: .24rem;
            font-weight: 400;
            color: rgba(11, 105, 123, 1);
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            img {
              position: absolute;
              top: 0;
              right: .18rem;
              width: 1.04rem;
              height: .38rem;
            }
            &.girl {
              color: rgba(80, 19, 59, 1);
            }
          }
        }
        .teamIcon {
          width: .86rem;
          height: .86rem;
          position: absolute;
          top: .14rem;
          right: -.4rem;
        }
      }
      .team_record {
        width: 100%;
        min-height: 4.06rem;
        position: relative;
        margin: .15rem auto 0;
        font-size: .22rem;
        font-weight: 400;
        color: rgba(255, 227, 197, 1);
        border-radius: .08rem;
        overflow: hidden;
        &.mine {
          border-radius: 0 0 .08rem .08rem;
          margin: 0 auto;
        }
        .title_items {
          display: flex;
          align-items: center;
          height: .56rem;
          background: rgba(49, 82, 131, 1);
          color: rgba(177, 208, 255, 1);
          .title {
            flex: 1;
            text-align: center;
            height: .3rem;
            line-height: .3rem;
            box-sizing: border-box;
            &:nth-child(1) {
              flex: .5;
            }
            &:nth-child(2) {
              flex: .8;
            }
            &:nth-child(4) {
              flex: 1.5;
            }
            &:nth-child(1), &:nth-child(2), &:nth-child(3) {
              border-right: 1px solid rgba(34, 63, 107, 1);
            }
          }
        }
        .content {
          min-height: 3.5rem;
          font-weight: 400;
          background: rgba(34, 63, 107, 1);
          overflow: hidden;
          color: rgba(208, 237, 255, 1);
          border-radius: 0 0 .08rem .08rem;
          ul {
            display: flex;
            flex-direction: column;
            li {
              display: flex;
              justify-content: space-between;
              align-items: center;
              height: .86rem;
              position: relative;
              &:not(.last):after {
                content: '';
                position: absolute;
                left: 0;
                right: 0;
                bottom: 0;
                margin: auto;
                width: 5.74rem;
                height: .01rem;
                background: rgba(47, 78, 125, 1);
              }
              div {
                flex: 1;
                text-align: center;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                &:nth-child(1) {
                  flex: .5;
                }
                &:nth-child(2) {
                  flex: .8;
                }
                &:nth-child(4) {
                  flex: 1.5;
                }
                em {
                  &.first, &.second, &.third {
                    display: inline-block;
                    width: .39rem;
                    height: .39rem;
                    background: rgba(255, 240, 136, 1);
                    border-radius: 50%;
                    text-align: center;
                    line-height: .39rem;
                    color: rgba(34, 63, 107, 1);
                    &.second {
                      background: rgba(227, 255, 250, 1);
                    }
                    &.third {
                      background: rgba(245, 163, 89, 1);
                    }
                  }
                }
              }
            }
          }
          &.empty {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            img {
              width: 1.28rem;
              height: 1.28rem;
              margin-bottom: .16rem;
            }
            span {
              font-size: .36rem;
              font-weight: bold;
              color: rgba(93, 126, 174, 1);
            }
          }
          &.mine {
            min-height: 5.63rem;
          }
        }
      }
      .qixi_footer {
        margin-top: .15rem;
        font-size: .22rem;
        font-weight: 400;
        color: rgba(127, 174, 244, 1);
      }
      .last_rank {
        margin-top: .4rem;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        em {
          display: inline-block;
          width: .04rem;
          height: .3rem;
          background: rgba(255, 240, 136, 1);
          margin-right: .15rem;
        }
        .item {
          font-size: .3rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          &:nth-child(1) {
            display: flex;
            align-items: center;
          }
          &:nth-child(2) {
            font-size: .24rem;
            font-weight: 400;
            color: rgba(255, 242, 149, 1);
          }
        }
      }
    }
    .back_top {
      position: fixed;
      right: .05rem;
      bottom: 4rem;
      width: .77rem;
      height: .77rem;
      background: url("./images/backtop.png");
      background-size: 100% 100%;
    }
  }

  @keyframes fingerMove {
    0% {
      transform: translateY(-0.07rem);
    }
    50% {
      transform: translateY(0.07rem);
    }
    100% {
      transform: translateY(-.14rem);
    }
  }
</style>
