<template>
  <div class="bigbonus" v-if="actInfo">
    <div class="bigbonus-container" :class="{fixed:$refs.dropDown&&$refs.dropDown.curIndex}">
      <img src="./images/back.png" alt="" class="back" @click="backHome">
      <img src="./images/rule.png" alt="" class="rule" @click="showPop(7)">
      <img src="./images/gonglue.png" alt="" class="gonglue" @click="showPop(9)">
      <div class="receive_prize">
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
        今日鹊桥会<i>第2场</i>
      </div>
      <div class="gain_distance">
        <div class="item">牛郎获得助力<i>00000米</i></div>
        <div class="item">织女获得助力<i>8888米</i></div>
      </div>
      <div class="operation_btn" @click="operation"></div>
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
                <li>
                  <div>牛郎助力队</div>
                  <div>1000</div>
                  <div>10000</div>
                  <div>5000元京东券<br>（加奖200元京东券）</div>
                </li>
              </ul>
            </div>
          </div>
          <div class="qixi_teamPrize" :class="{girl:!isBoyTeam}">
            <div class="qixi_teamPrize_content">
              <div class="num">
                8588元 <img src="./images/help.png" alt="" @click="showPop(8)">
              </div>
              <div class="info" :class="{girl:!isBoyTeam}">
                (预计本场鹊桥会达成团队奖励) <img src="./images/lastDatum_icon.png" alt="">
              </div>
            </div>
            <img :src="`${require(`./images/${!isBoyTeam?'boyteam_icon':'girlteam_icon'}.png`)}`" alt=""
                 @click="changeData" class="teamIcon">
          </div>
          <div class="team_record">
            <div class="title_items">
              <div class="title">名次</div>
              <div class="title">玩家昵称</div>
              <div class="title">今日累计助力</div>
              <div class="title">预计奖励</div>
            </div>
            <div class="content" :class="{empty:!record.length}">
              <scroll :data="record" v-if="record.length" ref="scroll">
                <ul>
                  <li v-for="(item,index) in record" :class="{last:index==record.length-1}">
                    <div><em :class="{first:item.rank==1,second:item.rank==2,third:item.rank==3}">{{item.rank}}</em>
                    </div>
                    <div>{{item.nickname}}</div>
                    <div>{{item.num}}米</div>
                    <div>5000元京东券<br>（加奖200元京东券）</div>
                  </li>
                </ul>
              </scroll>
              <template v-else>
                <img src="./images/all_icon.png" alt="">
                <!--活动结束-->
                <span>加入可见</span>
              </template>
            </div>
          </div>
          <div class="qixi_footer">
            加入队伍且助力10米以上可领取奖励；单场鹊桥会助力，队伍前3名有额外奖励；因人数较多，优先展示每组前10名玩家。
          </div>
        </template>
        <template v-else>
          <div class="last_rank">
            <div class="item"><em></em>每日个人榜</div>
            <div class="item">上期排行></div>
          </div>
          <div class="my_info mine">
            <div class="title_items mine">
              <div class="title">我的名次</div>
              <div class="title">今日累计助力(米）</div>
              <div class="title">奖励</div>
            </div>
            <div class="content mine">
              <ul>
                <li>
                  <div>1000</div>
                  <div>10000</div>
                  <div>5000元京东券</div>
                </li>
              </ul>
            </div>
          </div>
          <div class="team_record mine">
            <div class="title_items mine">
              <div class="title">名次</div>
              <div class="title">玩家昵称</div>
              <div class="title">今日累计助力</div>
              <div class="title">预计奖励</div>
            </div>
            <div class="content mine" :class="{empty:!record.length}">
              <scroll :data="record" v-if="record.length" ref="mineScroll">
                <ul>
                  <li v-for="(item,index) in record" :class="{last:index==record.length-1}">
                    <div><em :class="{first:item.rank==1,second:item.rank==2,third:item.rank==3}">{{item.rank}}</em>
                    </div>
                    <div>{{item.nickname}}</div>
                    <div>{{item.num}}米</div>
                    <div>5000元京东券<br>（加奖200元京东券）</div>
                  </li>
                </ul>
              </scroll>
              <template v-else>
                <img src="./images/all_icon.png" alt="">
                <!--活动结束-->
                <span>加入可见</span>
              </template>
            </div>
          </div>
          <div class="qixi_footer">
            个人榜不分组别，全服助力值最多前10名玩家获得排行大奖
          </div>
        </template>
      </div>
    </div>
    <drop-down ref="dropDown" :totalNum="actInfo.userInfo.totalNum" @showPop="showPop"
               @refresh="_getInfo">
    </drop-down>
    <comPop :popType="popType" :actInfoData="actInfo" :awardData="awardData" ref="comPop"
            @close="closePop" @showPop="showPop" @opendown="$refs.dropDown.curIndex=1"></comPop>
    <loading v-show="showLoading" :showBar="false"></loading>
  </div>
</template>
<script>
  import {getNoticeList, activityInfo, drawLot, receiveCoupon, getJackpotAmount} from './utils/api'

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
      // record: []
      record: [{
        rank: 1,
        nickname: 'XXXXXXXX',
        num: 1000,
        awardsName: ''
      },
        {
          rank: 2,
          nickname: 'XXXXXXXX',
          num: 1000,
          awardsName: ''
        }, {
          rank: 3,
          nickname: 'XXXXXXXX',
          num: 1000,
          awardsName: ''
        }, {
          rank: 4,
          nickname: 'XXXXXXXX',
          num: 1000,
          awardsName: ''
        }, {
          rank: 5,
          nickname: 'XXXXXXXX',
          num: 1000,
          awardsName: ''
        }]
    }),
    components: {
      horn: () => import('./components/horn'),
      comPop: () => import('./components/comPop'),
      loading: () => import('../../components/common/loading'),
      DropDown: () => import('./dropDown.vue'),
      scroll: () => import('./components/scroll')
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
        // ["中奖记录","抽奖券获得记录","昨日排行","今日排行","很遗憾","大家都在玩","活动规则","奖池计算说明","中奖攻略","恭喜您","温馨提示","恭喜获得！"]
        switch (type) {
          case 1:
            point = 'A_H5PT0309003767';
            break;//中奖记录
          case 2:
            point = 'A_H5PT0309003772';
            break;//抽奖券获得记录
          case 3:
            point = 'A_H5PT0309003769';
            break;//昨日排行
          case 4:
            point = 'A_H5PT0309003768';
            break;//今日排行
          case 6:
            point = 'A_H5PT0309003778';
            break;//大家都在玩
          case 7:
            point = 'A_H5PT0309003762';
            break;//规则点击
          case 9:
            point = 'A_H5PT0309003763';
            break;//中奖攻略
          case 8:
            point = 'A_H5PT0309003764';
            break;//奖池计算说明
          case 11:
            point = 'A_H5PT0309003780';
            break;//温馨提示
        }
        data && (this.awardData = data)
        point && GLOBALS.marchSetsPoint(point)
        setTimeout(() => {
          this.$refs.comPop.showPop()
        })
      },
      //返回
      backHome() {
        GLOBALS.marchSetsPoint('A_H5PT0309003761')
        history.back(-1)
      },
      //获取活动信息
      async _getInfo() {
        let {code, data} = await activityInfo()
        if (code == 200) {
          data.state = 1
          this.actInfo = data
          this.countDown(100000000)
          this._getNoticeList()
         setTimeout(() => {
            // this.showPop(11)
           // this.showPop(10)
           this.showPop(12)
          }, 1500)
          // if (data.rankInfo.popup) {
          //   if (data.rankInfo.awardsName) {
          //     setTimeout(() => {
          //       this.showPop(12, {
          //         awardsName: data.rankInfo.awardsName,
          //         awardsType: data.rankInfo.awardsType,
          //         info: `昨天排行第${data.rankInfo.myRank}名，获得以上奖励`,
          //         isRank: true
          //       })
          //     }, 1000)
          //     GLOBALS.marchSetsPoint('A_H5PT0309003781')//H5平台-奖池大满贯活动-次日上榜弹窗加载完成
          //   } else {
          //     this.$toast.show({
          //       message: '昨日您与排行榜失之交臂啦~',
          //       duration: 3000
          //     })
          //     setTimeout(() => {
          //       this.showPop(3)
          //     }, 3000)
          //   }
          // }
        }
      },
      //跑马灯
      async _getNoticeList() {
        let {code, data, message} = await getNoticeList()
        if (code == 200) {
          this.hornList = data
        }
      },
      init() {
        this._getInfo()
      },
      //抽奖
      async drawLuck(item) {
        GLOBALS.marchSetsPoint('A_H5PT0309003773')//H5平台-奖池大满贯活动-点击抽奖按钮点击
        if (this.actInfo.state == 1) {
          //券不够
          if (item.amount > this.actInfo.userInfo.remnantNum) {
            this.showPop(5)
            GLOBALS.marchSetsPoint('A_H5PT0309003774')
          } else {
            this.showLoading = true
            const {code, data, message} = await drawLot(item.amount)
            if (code === 200) {
              this.showLoading = false
              this.showPop(12, {
                awardsName: `${data.amount}个话费碎片${data.businessType == 4 ? `<br><i style="font-size: .26rem;font-weight:400;">（${data.rate}%奖池奖励）</i>` : ``}`,
                awardsType: 'hfq',
                info: `${data.progress.unlock ? `今日您已累计消耗${data.progress.total}张抽奖券，<br>下次高额券抽必中奖池大奖！` : `奖励将自动发放到账<br>（10个话费碎片=1元话费券）`}`
              })
              if (data.progress.unlock) {
                GLOBALS.marchSetsPoint('A_H5PT0309003776')
              } else if (data.rate) {
                GLOBALS.marchSetsPoint('A_H5PT0309003777')
              } else {
                GLOBALS.marchSetsPoint('A_H5PT0309003775')
              }
              this._getInfo()
            } else {
              this.showLoading = false
              this.$toast.show({
                message: message,
                duration: 1000
              })
              this._getInfo()
            }
          }
        } else {
          this.$toast.show({
            message: '活动已结束',
            duration: 1000
          })
        }
      },
      //抢券
      async gainQuan() {
        if (!this.countdown1.time) {
          GLOBALS.marchSetsPoint('A_H5PT0309003765')
          this.showLoading = true
          const {code, data, message} = await receiveCoupon()
          if (code == 200) {
            this.showLoading = false
            this.awardData = data
            this.showPop(10)
            GLOBALS.marchSetsPoint('A_H5PT0309003766')
            this._getInfo()
          } else {
            this.showLoading = false
            this.$toast.show({
              message: message,
              duration: 1000
            })
            this._getInfo()
          }
        }
      },
      //定时刷新奖池
      async setJackpotAmount() {
        let {code, data} = await getJackpotAmount()
        if (code == 200) {
          this.actInfo.jackpotAmount = data
        }
      },
      operation() {
        console.log('this.$refs.dropDown', this.$refs)
        this.$nextTick(() => {
          this.$refs.dropDown.outHandleTab()
        })
      },
      changeTabIndex(index) {
        this.tabIndex = index
        setTimeout(() => {
          if (index) {
            this.$refs.mineScroll.refresh()
            this.$refs.mineScroll.scrollTo(0, 0)
          } else {
            this.$refs.scroll.refresh()
            this.$refs.scroll.scrollTo(0, 0)
          }
        }, 1000)
      },
      changeData() {
        this.isBoyTeam = !this.isBoyTeam
      }
    },
    mounted() {
      GLOBALS.marchSetsPoint('P_H5PT0309', {
        source_address: GLOBALS.getUrlParam('from') || ''
      })
      this.init()
    },
    watch: {
      countTime(value) {
        if (!value) {
          this._getInfo()
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
    .bigbonus-container {
      width: 100%;
      height: 20.33rem;
      background: url("./images/bg.png");
      background-size: 100% 100%;
      position: relative;
      padding-top: 6.43rem;
      box-sizing: border-box;
      &.fixed {
        position: fixed;
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
      .gain_distance {
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
        &.gain {
          background: url("./images/btnGain.png");
          background-size: 100% 100%;
        }
        &.gray {
          background: url("./images/btnAdd0.png");
          background-size: 100% 100%;
        }
      }
      .task {
        width: 6.69rem;
        height: 10.11rem;
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
              font-size: .24rem;
              font-weight: 400;
              color: rgba(11, 105, 123, 1);
              padding-left: 1.5rem;
              box-sizing: border-box;
              display: flex;
              align-items: center;
              img {
                margin-left: .3rem;
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
          height: 4.06rem;
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
            height: 6.26rem;
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
            position: absolute;
            height: 3.5rem;
            left: 0rem;
            right: 0;
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
              height: 5.7rem;
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
    }
    .downbtn {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100vw;
      height: 1.04rem;
      background: url('./images/downbtn.png') center center / 100% 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      font-size: .28rem;
      font-weight: bold;
      color: rgba(95, 9, 7, 1);
      padding-top: .1rem;
      box-sizing: border-box;
      i {
        color: #FF3131;
      }
      .item:nth-child(2) {
        margin-top: .1rem;
      }
      &:not(.moreprize):before {
        content: '';
        position: absolute;
        top: -.28rem;
        left: 0;
        right: 0;
        margin: auto;
        width: 1.79rem;
        height: .28rem;
        background: url('./images/uparrow.png') center center / 100% 100%;
      }
      .item.moreprize {
        font-size: .32rem;
        font-weight: bold;
        color: rgba(95, 9, 7, 1);
        i {
          color: #FF1B16;
        }
        &:nth-child(2) {
          font-size: .24rem;
          font-weight: bold;
          text-decoration: underline;
          color: rgba(199, 61, 26, 1);
        }
      }
    }
  }

  .pop-mask {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1;
  }

  .drop-down {
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    z-index: 2;
    .drop-down-content {
      width: 100%;
      height: 4.2rem;
      position: fixed;
      left: 0;
      bottom: 0;
      font-size: 0.2rem;
      z-index: 12;
      box-sizing: border-box;
      background: url('./images/packages.png') center center / 100% 100%;
      padding: 0 .26rem;
      box-sizing: border-box;
      p {
        font-size: .28rem;
        font-weight: bold;
        color: rgba(95, 9, 7, 1);
        text-align: center;
        margin: .44rem 0 .31rem;
      }
      .packages {
        display: flex;
        justify-content: space-around;
        .item {
          width: 2.08rem;
          height: 2.77rem;
          text-align: center;
          background: rgba(255, 255, 255, 1);
          border-radius: .14rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          img {
            width: 1.42rem;
            height: 1.42rem;
          }
          .item-text {
            font-size: 0.2rem;
            color: rgba(108, 108, 108, 1);
            line-height: 0.26rem;
          }
          .btn-price {
            margin-top: .13rem;
            width: 1.5rem;
            height: 0.5rem;
            line-height: 0.5rem;
            color: rgba(255, 255, 255, 1);
            border-radius: 0.25rem;
            font-size: 0.24rem;
            font-weight: bold;
            text-align: center;
            background: rgba(255, 47, 47, 1);
            &.gray {
              background: rgba(136, 136, 136, 1);
            }
          }
        }
      }
      .downarrow {
        position: absolute;
        top: -.38rem;
        left: 0;
        right: 0;
        margin: auto;
        width: 1.79rem;
        height: .38rem;
        background: url('./images/downarrow.png') center center / 100% 100%;
      }
      &.gray:before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        background: rgba(0, 0, 0, .5);
        border-radius: .35rem .35rem 0 0;
      }
      &.gray:after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        width: 2.17rem;
        height: 2.17rem;
        background: url("./images/buyover.png");
        background-size: 100% 100%;
      }
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s;
  }

  /*低端机型之前的样式会有严重的展示问题，暂且用下面代替*/
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

  @keyframes huxi {
    0% {
      transform: scale(0.9);
    }
    10% {
      transform: scale(1);
    }
    20% {
      transform: scale(0.9);
    }
    30% {
      transform: scale(1);
    }
    40% {
      transform: scale(0.9);
    }
    50% {
      transform: scale(1);
    }
    60% {
      transform: scale(0.9);
    }
    70% {
      transform: scale(1);
    }
    80% {
      transform: scale(0.9);
    }
    90% {
      transform: scale(1);
    }
    100% {
      transform: scale(0.9);
    }
  }

  @keyframes tranRotateZ {
    0% {
      transform: rotateZ(0deg);
    }
    50% {
      transform: rotateZ(30deg);
    }
    100% {
      transform: rotateZ(0deg);
    }
  }
</style>
