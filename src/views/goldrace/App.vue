<template>
  <main class="gold-race" v-if="info">
    <div class="bg" :class="{end:isEnd}">
      <template v-if="!isEnd">
        <div class="act_info">当前赛次结束倒计时</div>
        <div class="act_time" v-html="countdownTime"></div>
      </template>
      <div class="info" v-else>活动已结束</div>
    </div>
    <div class="back" @click="back()"></div>
    <div class="rule" @click="showPop(7)"></div>
    <article class="main-content">
      <div class="my-postion" :class="{end:!userInfo.showUpgradeProgress}">
        <template v-if="userInfo.showUpgradeProgress">
          <div class="info" v-if="myrace==0">达成{{upgradeCondition}}杯晋升白银段，活动第3-4天可参与白银赛</div>
          <div class="info" v-else>达成{{upgradeCondition}}杯晋升黄金段，活动第5天可参与黄金赛</div>
          <div class="percent-box">
            <div class="percent">
              <div class="percent-bar"
                   :style="{ width:((userInfo.totalNum-currentCondition)/(upgradeCondition-currentCondition)) * 100 + '%' }"></div>
            </div>
            <img :src="`${require(`./img/level${myrace}.png`)}`" alt="" class="icon left">
            <img :src="`${require(`./img/level${myrace+1}.png`)}`" alt="" class="icon right">
          </div>
          <div class="nums">
            <div class="item">{{currentCondition}}</div>
            <div class="item">{{userInfo.totalNum}}</div>
            <div class="item">{{upgradeCondition}}</div>
          </div>
        </template>
        <div class="position-info">
          <div class="item">
            <div class="title">我的段位</div>
            <img :src="`${require(`./img/level${myrace}.png`)}`" alt="" class="icon">
          </div>
          <div class="item">
            <div class="title">当前参与赛次</div>
            <div class="desc">{{raceInfo[userInfo.currentLevel-1]}}赛-第{{userInfo.currentRound}}场</div>
          </div>
          <div class="item">
            <div class="title">累计奖杯</div>
            <div class="desc">{{userInfo.totalNum}}</div>
          </div>
          <div class="item">
            <div class="title">赛次排名</div>
            <div class="desc">{{userInfo.rank}}</div>
          </div>
        </div>
        <img :src="`${require(`./img/mycup${isEnd?0:1}.png`)}`" alt="" class="mycup" @click="operation(false)">
      </div>
      <div class="task-info" :style="{backgroundImage:`url(${require(`./img/bg${isEnd?4:race}.png`)})`}"
           :class="{race0:race==0,race1:race==1,race2:race==2,end:isEnd}" v-if="levelData">
        <div class="more" @click="showPop(9)">了解更多>></div>
        <div class="left_btn" :style="{backgroundImage:`url(${require(`./img/left_btn${race}.png`)})`}"
             v-if="!isEnd&&userInfo.currentLevel>=race+1">
          {{raceInfo[levelData.level-1]}} 第{{levelData.round}}场
        </div>
        <div class="race-info">
          <div class="item" v-for="(item,index) in 3" @click="selectRace(index)">
            <div class="race-desc" :class="{race0:index==0,race1:index==1,race2:index==2,currentRace:index==race}">
              <img src="./img/flag.png" alt="" v-if="!isEnd&&index==myrace" class="flag">
              <div class="img-bg">
                <img :src="`${require(`./img/level${index}.png`)}`" alt="" class="icon">
              </div>
              <div class="desc">{{raceInfo[index]}}</div>
            </div>
            <div class="race-detail"
                 :class="{race0:index==0,race1:index==1,race2:index==2,currentRace:index==race&&!isEnd}">
              <div class="info">{{timesInfo[index]}}</div>
              <div class="num" style="height: .2rem">
                <template v-if="userInfo.currentLevel>=index+1">{{info.levelInfo[index].applyNum}}人参与</template>
              </div>
            </div>
          </div>
        </div>
        <div class="total_btn" :class="{race0:race==0,race1:race==1,race2:race==2,end:isEnd}">
          <div class="btn">累计奖杯赢话费</div>
          <div class="myprize" @click="showPop(1)">我的奖励>></div>
        </div>
        <red-packet ref="redPacket" :race="race" :isEnd="isEnd" :info="info" :list="levelData.progressList"
                    :showBtn="!isEnd&&userInfo.currentLevel>=race+1"
                    @gameReceive="gameReceive"/>
        <div class="total_btn" :class="{race0:race==0,race1:race==1,race2:race==2,end:isEnd}">
          <div class="btn">
            <template v-if="!isEnd">
              <template v-if="userInfo.currentLevel>=race+1">{{raceInfo[levelData.level-1]}}-第{{levelData.round}}场
              </template>
              赛段排行
            </template>
            <template v-else>上期赛次排行榜</template>
          </div>
          <div class="myprize" v-if="!isEnd&&userInfo.currentLevel>=race+1" @click="showPop(3)">上期排名>></div>
        </div>
        <div class="race-statement" :class="{race0:race==0,race1:race==1,race2:race==2,end:isEnd}">
          赛段单场次排名前20名玩家上榜获奖，杯数相同先达成者排名优先
        </div>
        <profit :race="race" :isEnd="isEnd" :showBtn="userInfo.currentLevel>=race+1" :behindThreeData="behindThreeData"
                :otherData="otherData" :lastThreeData="lastThreeData" :showOpen="isOpen"></profit>
      </div>
    </article>
    <drop-down ref="dropDown" :actInfoData="info" @showPop="showPop" @refresh="init"></drop-down>
    <comPop :popType="popType" :actInfoData="info" :awardData="awardData" :level="race" ref="comPop"
            @close="closePop" @showPop="showPop" @opendown="$refs.dropDown.curIndex=1" @refresh="init"></comPop>
  </main>
</template>

<script>
  /* eslint-disable no-undef */
  import RedPacket from './components/redPacket/index'
  import profit from './components/profit/index'
  import {activityHome, gainAwardsRecord, getLevelInfo, getHistoryRankList} from './services/api'
  import _get from 'lodash.get'

  export default {
    name: 'middleUser',
    components: {
      RedPacket,
      profit,
      DropDown: () => import('./dropDown.vue'),
      comPop: () => import('./components/comPop')
    },
    data() {
      return {
        info: null,
        countdownTime: '',
        apiLocked: false,
        isEnd: false,
        race: 0,
        myrace: 0,
        raceInfo: ['青铜', '白银', '黄金'],
        timesInfo: ['活动第1-2天开启', '活动第3-4天开启', '活动第5-6天开启'],
        awardData: null,
        popType: 0,
        userInfo: null,
        currentCondition: 0,
        upgradeCondition: 0, // 升级下档位
        levelData: null,
        profitData: [],
        behindThreeData: [],
        otherData: [],
        lastThreeData: [],
        isOpen: true
      }
    },
    mounted() {
      this.init(true)
    },
    methods: {
      async init(flag = false) {
        if (this.apiLocked) {
          return
        }
        this.apiLocked = true
        const res = await activityHome()
        this.apiLocked = false
        const code = _get(res, 'code', 0)
        if (code === 200) {
          this.info = _get(res, 'data', {})
          this.isEnd = this.info.state !== 1
          this.userInfo = this.info.userInfo
          this.myrace = this.userInfo.maxLevel - 1
          if (flag) {
            this.race = this.myrace
          }
          this.currentCondition = this.myrace == 0 ? 0 : this.info.levelInfo.filter(item => item.level == this.userInfo.maxLevel)[0].upgradeCondition
          this.upgradeCondition = this.myrace < 2 ? this.info.levelInfo.filter(item => item.level == this.userInfo.maxLevel + 1)[0].upgradeCondition : 0
          this.countDown(_get(res, 'data.stageCountdown', 0))
          this.getLevelInfo(this.race + 1, null)
          if (this.userInfo.showUpgradePopup) {
            this.awardData = {
              race: this.userInfo.maxLevel - 1
            }
            setTimeout(() => {
              this.showPop(12)
            }, 1500)
          } else if (this.info.historyRankPopup && this.info.historyRankPopup.popup) {
            this.awardData = this.info.historyRankPopup
            if (flag) {
              if (this.userInfo.incrNum) {
                this.awardData = Object.assign({
                  popType: 10,
                  amount: this.userInfo.incrNum
                }, this.info.historyRankPopup)
              }
              setTimeout(() => {
                this.showPop(13)
              }, 1500)
            } else {
              if (this.userInfo.incrNum) {
                this.awardData = {
                  amount: this.userInfo.incrNum
                }
                setTimeout(() => {
                  this.showPop(10)
                }, 1500)
              }
            }
          } else if (this.userInfo.incrNum) {
            this.awardData = {
              amount: this.userInfo.incrNum
            }
            setTimeout(() => {
              this.showPop(10)
            }, 1500)
          }
        }
        flag && GLOBALS.marchSetsPoint('P_H5PT0344', {
          source_address: GLOBALS.getUrlParam('from') || ''
        }) // H5平台-黄金争夺赛-页面加载完成
      },
      back() {
        GLOBALS.marchSetsPoint('A_H5PT0344004327') // H5平台-黄金争夺赛-返回按钮点击
        location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL') || '')
      },
      // 弹窗
      showPop(type, data) {
        this.popType = type
        let point = ''
        switch (type) {
          case 1:
            point = 'A_H5PT0344004336'
            break// H5平台-黄金争夺赛-我的奖励弹窗加载完成
          case 3:
            point = 'A_H5PT0344004337'
            break// H5平台-黄金争夺赛-上期排名弹窗加载完成
          case 7:
            point = 'A_H5PT0344004328'
            break// 规则点击
          case 9:
            point = 'A_H5PT0344004338'
            break// H5平台-黄金争夺赛-赛制一览弹窗加载完成
          case 10:
            point = 'A_H5PT0344004333'
            break// H5平台-黄金争夺赛-新增奖杯弹窗加载完成
          case 12:
            point = 'A_H5PT0344004334'
            break// H5平台-黄金争夺赛-晋级白银或黄金弹窗加载完成
          case 13:
            point = 'A_H5PT0344004335'
            break// H5平台-黄金争夺赛-恭喜你上榜弹窗加载完成
        }
        point && GLOBALS.marchSetsPoint(point)
        setTimeout(() => {
          this.$refs.comPop.showPop()
        })
      },
      async gameReceive(item) {
        let points = ['A_H5PT0344004332', 'A_H5PT0344004331', '']
        points[item.state] && GLOBALS.marchSetsPoint(points[item.state], {
          task_id: item.id,
          task_name: `累计${item.amount}奖杯获得${item.awardsName}`,
          level: this.race + 1
        })
        if (item.state == 0) {
          this.operation(true)
        }
        if (item.state == 1) {
          if (this.apiLocked) {
            return
          }
          this.apiLocked = true
          const res = await gainAwardsRecord(item.id)
          this.apiLocked = false
          const code = _get(res, 'code', 0)
          if (code === 200) {
            this.init(false)
            this.$toast.show({
              message: '领取成功',
              duration: 3000
            })
          }
        }
      },
      countDown(data) {
        if (!data) {
          this.countdownTime = '<span class="end">已</span><span class="end">结</span><span class="end">束</span>'
          return false
        }
        let date = data / 1000
        this.timer = setInterval(() => {
          date = date - 1
          if (date <= 0) {
            date = 0
            clearInterval(this.timer)
            this.countdownTime = '<span class="end">已</span><span class="end">结</span><span class="end">束</span>'
          }
          let hour = Math.floor(parseInt(date / 60 / 60))
          let minute = Math.floor(parseInt(date / 60) % 60)
          let second = Math.floor(date % 60)
          let countHour = hour >= 10 ? hour : '0' + hour
          let countMinute = minute >= 10 ? minute : '0' + minute
          let countSecond = second >= 10 ? second : '0' + second
          this.countdownTime = `<span>${countHour}</span><span>:</span><span>${countMinute}</span><span>:</span><span>${countSecond}</span>`
        }, 1000)
      },
      async getLevelInfo(index, callack) {
        let {code, data} = await getLevelInfo(index)
        if (code == 200) {
          this.levelData = data
          if (this.isEnd) {
            // 结束后排行榜数据是上期排行的数据
            this.getHistoryRankList(index, () => {
              callack && callack()
            })
          } else {
            this.profitData = data.rankList
            this.behindThreeData = []
            this.otherData = []
            this.lastThreeData = []
            this.isOpen = true
            this.getRankList()
            callack && callack()
          }
        }
      },
      operation(isProgressBtn) {
        if (!this.isEnd) {
          this.$nextTick(() => {
            this.$refs.dropDown.outHandleTab()
          })
          if (!isProgressBtn) { // H5平台-黄金争夺赛-我要奖杯按钮点击
            GLOBALS.marchSetsPoint('A_H5PT0344004329')
          }
        }
      },
      selectRace(index) {
        GLOBALS.marchSetsPoint('A_H5PT0344004330', {
          level: index + 1
        })// H5平台-黄金争夺赛-铜银金赛段TAB点击
        this.rankList = []
        this.getLevelInfo(index + 1, () => {
          this.race = index
        })
      },
      // 弹窗关闭
      closePop() {
        this.popType = 0
        this.awardData = null
      },
      async getHistoryRankList(level, callback) {
        let {code, data} = await getHistoryRankList(level)
        if (code == 200) {
          this.profitData = data.rankList
          this.behindThreeData = []
          this.otherData = []
          this.lastThreeData = []
          this.isOpen = true
          this.getRankList()
        }
      },
      async getRankList() {
        if (this.profitData.length > 3) {
          this.lastThreeData = this.profitData.slice(3)
        }
        if (this.profitData.length > 5) {
          this.isOpen = false
          this.lastThreeData = this.profitData.slice(this.profitData.length - 1)
          this.otherData = this.profitData.slice(3, this.profitData.length - 1)
        }
        this.behindThreeData = this.profitData.slice(0, 3)
      }
    }
  }
</script>

<style lang="less" scoped>
  .backImg(@url) {
    background: url(@url) no-repeat center center;
    background-size: 100% 100%;
  }

  .gold-race {
    position: relative;
    font-size: 0.24rem;
    overflow-x: hidden;
    overflow-y: scroll;
    height: 100vh;
    width: 100%;
    background: #000000;
    margin: auto;
    .bg {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 5.97rem;
      height: 3.26rem;
      .backImg('./img/title1.png');
      padding-top: 1.9rem;
      box-sizing: border-box;
      text-align: center;
      font-weight: bold;
      &.end {
        .backImg('./img/title0.png');
      }
      .act_info {
        color: #FFE8F0;
      }
      .act_time {
        margin-top: .12rem;
        color: #FFE8F0;
      }
    }
    .back {
      position: absolute;
      left: 0.07rem;
      top: 0.15rem;
      width: .88rem;
      height: .77rem;
      .backImg('./img/back.png');
    }
    .rule {
      position: absolute;
      right: 0.07rem;
      top: 0.15rem;
      width: .88rem;
      height: .77rem;
      .backImg('./img/rule.png');
    }

    .main-content {
      position: absolute;
      width: 100%;
      top: 3rem;
      padding-bottom: .16rem;
      .my-postion {
        position: relative;
        width: 6.5rem;
        height: 4.88rem;
        .backImg('./img/my_position1.png');
        margin: auto;
        padding-top: .93rem;
        box-sizing: border-box;
        &.end {
          padding-top: 1.05rem;
          height: 3.78rem;
          .backImg('./img/my_position0.png');
        }
        .info {
          font-size: .22rem;
          font-weight: bold;
          color: #D4D3FF;
          text-align: center;
        }
        .percent-box {
          padding: .3rem .9rem 0;
          box-sizing: border-box;
          position: relative;
          .percent {
            height: .2rem;
            background: #FFFFFF;
            border-radius: .1rem;
            .percent-bar {
              height: .2rem;
              background: linear-gradient(90deg, #2D3FFF 0%, #00FCFF 100%);
            }
          }
          .icon {
            width: .86rem;
            height: .86rem;
            position: absolute;
            top: -.05rem;
            &.left {
              left: .54rem;
            }
            &.right {
              right: .51rem;
            }
          }
        }
        .nums {
          margin-top: .2rem;
          display: flex;
          justify-content: space-between;
          font-weight: bold;
          color: #D4D3FF;
          padding: 0 .51rem 0 .54rem;
          box-sizing: border-box;
          .item {
            text-align: center;
            &:nth-child(1) {
              width: .86rem;
            }
            &:nth-child(2) {
              width: 3.73rem;
            }
            &:nth-child(3) {
              width: .86rem;
            }
          }
        }
        .position-info {
          margin: .05rem auto 0;
          width: 5.8rem;
          height: 1.4rem;
          .backImg('./img/myposition_info.png');
          display: flex;
          justify-content: space-between;
          padding: .31rem .2rem 0;
          box-sizing: border-box;
          img {
            width: .86rem;
            height: .86rem;
          }
          .item {
            line-height: 1;
            font-weight: bold;
            color: #FFFFFF;
            .desc {
              height: .86rem;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: .22rem;
            }
          }
        }
        .mycup {
          width: 2rem;
          height: .6rem;
          position: absolute;
          left: 0;
          right: 0;
          bottom: .15rem;
          margin: auto;
        }
      }
      .task-info {
        width: 6.9rem;
        height: 13.72rem;
        background-size: 100% 100%;
        margin: .1rem auto 0;
        position: relative;
        padding-top: 1.71rem;
        box-sizing: border-box;
        &.end {
          padding-top: 1.18rem;
          height: 12.8rem;
        }
        .more {
          position: absolute;
          top: .5rem;
          right: .25rem;
          font-weight: bold;
          color: #00FBFF;
        }
        .left_btn {
          position: absolute;
          top: 3.51rem;
          left: -.14rem;
          width: .8rem;
          height: 2.19rem;
          position: absolute;
          background-size: 100% 100%;
          padding: .2rem .4rem .3rem .1rem;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          text-align: center;
          font-weight: 800;
          color: #BA312A;
          z-index: 1;
        }
        &.race1 {
          .left_btn {
            color: #3A3769;
          }
        }
        &.race2 {
          .left_btn {
            color: #A93700;
          }
        }
        .race-info {
          display: flex;
          .item {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            line-height: 1;
            .race-desc {
              width: 1.85rem;
              height: 1.49rem;
              background: linear-gradient(0deg, #DEAF90 0%, #E8C2A0 100%);
              border-radius: .16rem;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              font-weight: bold;
              color: #7E320A;
              position: relative;
              .img-bg {
                width: 1.65rem;
                height: 1rem;
                background: #FEE9D3;
                border-radius: .12rem;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom: .08rem;
                img {
                  width: .97rem;
                }
              }
              &.race1 {
                background: #AFB1C5;
                .img-bg {
                  background: #EAEFF0;
                }
                color: #3A3769;
              }
              &.race2 {
                background: #EDB45E;
                .img-bg {
                  background: #FFF0D5;
                }
                color: #A93700;
              }
              .flag {
                width: 1.2rem;
                height: .64rem;
                position: absolute;
                left: .18rem;
                top: -.88rem;
              }
            }
            .race-detail {
              margin-top: .1rem;
              font-weight: bold;
              color: #7C7BA8;
              text-align: center;
              .num {
                margin-top: .07rem;
                font-size: .2rem;
              }
              &.currentRace {
                &.race0 {
                  color: #FEE9D3;
                  .num {
                    color: #DFB191;
                  }
                }
                &.race1 {
                  color: #FFFFFF;
                }
                &.race2 {
                  color: #A93700;
                }
              }
            }
          }
        }
        .total_btn {
          display: flex;
          padding-left: 1.5rem;
          box-sizing: border-box;
          margin: .32rem 0 .25rem;
          .btn {
            width: 2.8rem;
            height: .65rem;
            .backImg('./img/common_btn.png');
            font-size: .26rem;
            font-weight: bold;
            color: #FFF0D5;
            text-align: center;
            line-height: .65rem;
            margin-right: .57rem;
          }
          .myprize {
            font-weight: bold;
            color: #FEE9D3;
            line-height: .65rem;
          }
          &.race1 {
            .btn {
              .backImg('./img/btn1.png');
              color: #EAEFF0;
            }
            .myprize {
              color: #FFFFFF;
            }
          }
          &.race2 {
            .myprize {
              color: #A93700;
            }
          }
          &.end {
            .btn {
              .backImg('./img/btn3.png');
              color: #FEE9D3;
            }
            .myprize {
              color: #00FCFF;
            }
          }
        }
        .race-statement {
          font-size: .2rem;
          font-weight: bold;
          color: #844835;
          text-align: center;
          margin-bottom: .2rem;
          &.race1 {
            color: #3A3769;
          }
          &.race2 {
            color: #A93700;
          }
          &.end {
            color: #9C9BCB;
          }
        }
      }
      .time {
        color: #fff;
        font-weight: bold;
        text-align: center;
        font-style: italic;
      }
      .end-time {
        background: #849be9;
        width: 4.1rem;
        padding: 0 0.24rem;
        height: 0.48rem;
        margin: -0.04rem auto;
        text-align: center;
        line-height: 0.46rem;
        border-radius: 0.24rem;
        color: #1f2961;
      }
    }
  }
</style>
