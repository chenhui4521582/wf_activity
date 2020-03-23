<template>
  <div class="save_beauties" :class="{hasReset: hasReset&&tabIndex==0}" v-if="actInfoData&&saved">
    <div class="save_beauties_container">
      <div class="savenums">已成功营救{{saved.rescueDay.length}}/6人</div>
      <div class="clickicons">
        <div class="item">
          <div class="back" @click="back"></div>
          <div class="rule" @click="showPop(7)"></div>
        </div>
        <div class="item">
          <div class="myprize" @click="showPop(2)"></div>
        </div>
      </div>
      <div class="tabs">
        <div class="item" v-for="(item,index) in tabsName" :class="{selected:tabIndex==index}"
             @click="selectTab(index)">
          {{item}}
        </div>
      </div>
      <div class="container">
        <template v-if="tabIndex==0">
          <div class="task_container">
            <div class="horn_content">
              <horn :noticeList="hornList" v-if="hornList.length"></horn>
            </div>
            <div :class="getClassName('content')"
                 :style="{backgroundImage:`url(${require(`./images/beauty/${this.actDay-1}.png`)})`}">
              <div class="content-item"
                   :class="{animation:!showBar&&currentItem.taskId==item.taskId,saved:item.taskStatus==2}"
                   v-for="(item,index) in actInfoData.userTaskInfoRsps">
                <div class="item">
                  <div class="task_title">{{item.taskName}}<br>即可解锁 ({{item.userTaskProgress}}/{{item.taskFinshNum}})
                  </div>
                  <div class="task_prize">解锁加赠<i>{{item.taskAwardName}}</i></div>
                </div>
                <div class="item">
                  <!--taskStatus (integer, optional): 任务状态:1：未达到领取条件，0：可领取，2：已领取 ,-->
                  <template v-if="item.taskStatus==1">
                    <div class="btn btnjiesuo" @click="gotounlock(item,index)">立即解锁</div>
                    <div class="btn btnsuipian" @click="getConfirmPop(item,0,index)" v-if="actInfoData.completeCardNum">
                      用万能碎片
                    </div>
                  </template>
                  <div class="btn canjiesuo" v-else-if="item.taskStatus==0" @click="gotounlock(item,index)">可解锁</div>
                </div>
              </div>
            </div>
            <div class="footer" v-if="!actInfoData.beautyIsRescue">
              <div class="item">成功解救<i>{{beautyname[actDay-1]}}</i>可再得<i>{{actInfoData.rescueAward}}</i></div>
              <div class="item">6天全部完成可再得<i>{{actInfoData.allRescueAward}}</i></div>
            </div>
            <div class="footer" v-else @click="tabIndex=1">
              <div class="item">恭喜您成功解救 <i>{{beautyname[actDay-1]}}</i></div>
              <div class="item">现在她已经加入到你的队伍中啦！<i>快去看看吧 >>></i></div>
            </div>
          </div>
          <div class="package_container">
            <div class="tips">救人心切? 我有锦囊妙计!</div>
            <div class="content">
              <div class="item" v-for="(item,index) in packages" @click="getConfirmPop(item,1,index)">
                <img :src="`${require(`./images/jinnang${index}.png`)}`" alt="">
                <div class="middle">
                  <template v-if="index==0">
                    <div class="title">{{item.name}}</div>
                    <div class="info">{{item.content}}</div>
                    <div class="desc">购买成功后解锁任意一块拼图碎片</div>
                  </template>
                  <template v-else>
                    <div class="title">{{item.name}}</div>
                    <div class="info">{{item.content}}<span class="desc">(可将未完成的全部任务难度降低且当前进度清0)</span></div>
                  </template>
                </div>
                <div class="line"></div>
                <div class="right">
                  <div class="price">{{item.price}}元</div>
                  <!--立即购买 无法购买 已购买-->
                  <div class="buy" v-if="!isTaskAllComplete&&item.buyFlag==1">
                    立即购买
                  </div>
                  <div class="buy gray" v-else>{{!item.buyFlag?'已购买':'无法购买'}}</div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="ranks_container">
            <div class="three_prize_container">
              <div class="list">
                <div class="list-item" v-for="(item,index) in saved.rescueDay.slice(0,3)"
                     :style="{backgroundImage:`url(${require(`./images/beautyShort/${item-1}.png`)})`}">
                  <div class="name">{{beautyname[item-1]}}</div>
                </div>
                <div class="list-item empty"
                     :class="{help:index==0&&!saved.rescueDay.slice(0,3).includes(actDay),torrowSave:actDay!=6&&index==0&&saved.rescueDay.slice(0,3).includes(actDay)}"
                     v-for="item,index in 3-saved.rescueDay.slice(0,3).length"
                     :style="{backgroundImage:`url(${require(`./images/beautyShort/default.png`)})`}"
                     @click="gotohelp(index==0&&!saved.rescueDay.slice(0,3).includes(actDay))"></div>
              </div>
              <div class="prize_btn" v-if="saved.composeAwardInfoRsps&&saved.composeAwardInfoRsps[0]">
                <div class="item">
                  <div class="desc">营救{{saved.composeAwardInfoRsps[0].rescueBeautyNum}}人得</div>
                  <div class="info">获得<i>{{saved.composeAwardInfoRsps[0].awardName}}</i></div>
                </div>
                <div class="btn" :class="{gray:saved.composeAwardInfoRsps[0].awardStatus!=0}"
                     @click="getRanksPrize('3',saved.composeAwardInfoRsps[0])">
                  {{saved.composeAwardInfoRsps[0].awardStatus==2?'已获得':'可领取'}}
                </div>
              </div>
            </div>
            <div class="all_prize_container">
              <div class="list">
                <div class="list-item" v-for="(item,index) in saved.rescueDay"
                     :style="{backgroundImage:`url(${require(`./images/beautyShort/${item-1}.png`)})`}">
                  <div class="name">{{beautyname[item-1]}}</div>
                </div>
                <div class="list-item empty"
                     :class="{help:index==0&&!saved.rescueDay.includes(actDay),torrowSave:actDay!=6&&index==0&&saved.rescueDay.includes(actDay)}"
                     v-for="(item,index) in 6-saved.rescueDay.length"
                     :style="{backgroundImage:`url(${require(`./images/beautyShort/default.png`)})`}"
                     @click="gotohelp(index==0&&!saved.rescueDay.includes(actDay))"></div>
              </div>
              <div class="prize_btn" v-if="saved.composeAwardInfoRsps&&saved.composeAwardInfoRsps[1]">
                <div class="item">
                  <div class="desc">营救{{saved.composeAwardInfoRsps[1].rescueBeautyNum}}人得</div>
                  <div class="info">获得<i>{{saved.composeAwardInfoRsps[1].awardName}}</i></div>
                </div>
                <div class="btn" :class="{gray:saved.composeAwardInfoRsps[1].awardStatus!=0}"
                     @click="getRanksPrize('6',saved.composeAwardInfoRsps[1])">
                  {{saved.composeAwardInfoRsps[1].awardStatus==2?'已获得':'可领取'}}
                </div>
              </div>
            </div>
            <div class="footer">
              本次活动惊喜多多，福利多多哦~
            </div>
          </div>
        </template>
      </div>
      <div class="bottom-wrap" v-if="tabIndex==0&&hasReset" @click="getConfirmPop({},2,0)">
        <div class="btn" v-if="!isTaskAllComplete">立即重置任务</div>
        <div class="btn gray" v-else>今日解救成功</div>
      </div>
    </div>
    <com-pop :pop-type="popType" :award-data="awardData" ref="comPop" :countTime="countTime" :actInfoData="actInfoData"
             :actDay="actDay" @confrimsure="confrimsure" @close="confrimsure"></com-pop>
    <loading v-show="showLoading" :showBar="false"></loading>
  </div>
</template>

<script>
  import '../../common/js/window.js';
  import {
    activityInfo,
    myAwards,
    myBeauty,
    getNoticeList,
    gameComposeReceive,
    taskAutoComplete,
    taskReceive,
    taskReset,
    showLeaguePacksList
  } from './utils/api'
  import Loading from "../../components/common/loading";

  export default {
    name: 'App',
    data() {
      return {
        tabsName: ['每日营救', '我的队伍'],
        tabIndex: 0,
        beautyname: ['晴晴', '倩雯', '丽娜', '熙瑶', '文洁', '君君'],
        actDay: 6,
        hasReset: true,
        saved: null,
        popType: 0,
        awardData: null,
        countTime: '',
        actInfoData: null,
        hornList: [],
        packages: [],
        isTaskAllComplete: false,
        showLoading: false,
        showBar: true,
        currentItem: null,
        currentDate: new Date().toLocaleDateString(),
        beautyDay: localStorage.getItem('beautyDay')
      }
    },
    components: {
      comPop: () => import('./component/comPop'),
      horn: () => import('./component/horn'),
      Loading
    },
    methods: {
      getClassName(name) {
        return `${name} beauty${this.actDay - 1}`
      },
      getCountInfo(dateinfo) {
        let day = Math.floor(dateinfo / 86400)
        let hour = Math.floor(parseInt(dateinfo / 60 / 60) % 24)
        let minute = Math.floor(parseInt(dateinfo / 60) % 60)
        let second = Math.floor(dateinfo % 60)
        // let countDay = day >= 10 ? day : '0' + day
        let countHour = hour >= 10 ? hour : '0' + hour
        let countMinute = minute >= 10 ? minute : '0' + minute
        let countSecond = second >= 10 ? second : '0' + second
        return {
          day, countHour, countMinute, countSecond
        }
      },
      //倒计时
      countDown(item) {
        if (!item) return false
        let date = item / 1000
        let {day, countHour, countMinute, countSecond} = this.getCountInfo(date)
        this.countTime = `${countHour}时${countMinute}分${countSecond}秒`
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
          let countHour = hour >= 10 ? hour : '0' + hour
          let countMinute = minute >= 10 ? minute : '0' + minute
          let countSecond = second >= 10 ? second : '0' + second
          if (day > 0) {
            this.countTime = `${day}天${countHour}时${countMinute}分${countSecond}秒`
          } else {
            this.countTime = `${countHour}时${countMinute}分${countSecond}秒`
          }
        }, 1000)
      },
      //返回
      back() {
        GLOBALS.marchSetsPoint('A_H5PT0265003122')   // 点击返回
        location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL')) + '&time=' + new Date().getTime()
      },
      //弹窗
      showPop(type) {
        this.popType = type
        let point = ''
        switch (type) {
          case 7:
            point = 'A_H5PT0265003123';
            break;//规则点击
          case 2:
            point = 'A_H5PT0265003121';
            break;//我的奖励
        }
        point && GLOBALS.marchSetsPoint(point)
        if ([1].includes(type)) {
          setTimeout(() => {
            this.$refs.comPop.showPop()
          }, 1000)
        } else {
          type == 2 && GLOBALS.marchSetsPoint('A_H5PT0252002997')
          setTimeout(() => {
            this.$refs.comPop.showPop()
          })
        }
      },
      //活动信息
      async getActInfo(flag) {
        let {code, data} = await activityInfo()
        if (code == 200) {
          this.actInfoData = data
          if (data.state == 1) {
            this.actDay = data.activityDay
            this.hasReset = data.hasResetCard == 1
            this.isTaskAllComplete = data.userTaskInfoRsps.filter(item => item.taskStatus == 1).length == 0
            let surplusDay = Math.floor(data.countdown / 1000 / 86400)
            if (surplusDay != this.beautyDay) {
              this.beautyDay = surplusDay
              localStorage.setItem('beautyDay', Math.floor(data.countdown / 1000 / 86400))
            }
            this.countDown(data.countdown)
            if (flag) {
              if (data.beautyIsRescue == 0) {
                if (this.currentDate != localStorage.getItem('beautyDate')) {
                  localStorage.setItem('beautyDate', new Date().toLocaleDateString())
                  this.showPop(1);
                }
              }
              this.showLeaguePacksList()
              this.myBeauty()
              this.getHornList()
              GLOBALS.marchSetsPoint('P_H5PT0265', {
                source_address: GLOBALS.getUrlParam('from') || ''
              })
            }
          } else {
            localStorage.removeItem('beautyDate')
            localStorage.removeItem('beautyDay')
          }
        }
      },
      selectTab(index) {
        if (index != this.tabIndex) {
          this.tabIndex = index;
          index == 1 && GLOBALS.marchSetsPoint('A_H5PT0265003120')
        }
      },
      //我的队伍奖励领取
      //3:领取拯救三人奖励 6：领取拯救六人奖励
      async getRanksPrize(type, item) {
        if (item.awardStatus == 0) {
          GLOBALS.marchSetsPoint(type == 3 ? 'A_H5PT0265003129' : 'A_H5PT0265003130')
          let {code, data, message} = await gameComposeReceive(item.awardId)
          if (code == 200) {
            this.awardData = {
              tips: type == 3 ? `成功救出了3人<br>获得` : '全部营救成功<br>获得',
              type: 'hfq',
              awardsImg: data.awardUrl,
              awardsName: data.awardName,
              info: type == 6 ? '恭喜你，在这次活动中成功救出所有女孩，现在你的队伍已集合完毕，去做更多有趣的事吧~' : '',
              btnName: type == 3 ? '愉快收下' : ''
            }
            this.showPop(3)
            this.myBeauty()
          } else {
            this.$toast.show({
              message: message,
              duration: 2000
            })
          }
        }
      },
      getConfirmPop(item, confirmtype, index) {
        item.confirmtype = confirmtype;
        item.index = index;
        if (confirmtype == 0) {
          GLOBALS.marchSetsPoint('A_H5PT0265003127', {
            task_id: item.taskId,
            task_name: item.taskName
          })
          this.awardData = {title: '温馨提示', tips: `你有未使用的万能碎片<br>确认重置未完成的任务吗？`, item, btn1Name: '再想想', btn2Name: '确认'}
          this.showPop(6)
        } else if (confirmtype == 1) {
          if (!this.isTaskAllComplete && item.buyFlag == 1) {
            GLOBALS.marchSetsPoint(index == 0 ? 'A_H5PT0265003124' : 'A_H5PT0265003125')
            this.awardData = {
              title: index == 0 ? '英雄救美' : '真正男子汉',
              tips: index == 0 ? `确定购买万能碎片礼包<br>加速解救${this.beautyname[this.actDay - 1]}吗？` : `确定付费${item.price}元重置<br>降低未完成任务的难度<br>而加速解救${this.beautyname[this.actDay - 1]}吗？`,
              item,
              btn1Name: '让她受苦',
              btn2Name: '加速救她'
            }
            this.showPop(6)
          }
        } else {
          if(!this.isTaskAllComplete){
            GLOBALS.marchSetsPoint('A_H5PT0265003126')
            this.awardData = {title: '温馨提示', tips: `确认重置未完成的任务吗？`, item, btn1Name: '再想想', btn2Name: '确认'}
            this.showPop(6)
          }
        }
      },
      async confrimsure(item) {
        if (item.hasOwnProperty('extraAward') && item.extraAward) {
          GLOBALS.marchSetsPoint('A_H5PT0265003128')
          this.awardData = {
            tips: item.extraTips,
            type: 'hfq',
            awardsImg: item.extraAward.awardUrl,
            awardsName: item.extraAward.awardName,
            info: item.extraInfo,
            btnName: item.extrabtnName
          }
          this.showPop(3)
        } else {
          let {confirmtype, index} = item
          if (confirmtype == 0) {//使用万能碎片
            this.getTaskAward(item, index, true)
          } else if (confirmtype == 1) {//加速救她
            this.gotopay(item)
          } else {//使用重置卡
            let {code, message} = await taskReset()
            if (code == 200) {
              this.getActInfo(false)
            }
            this.$toast.show({
              message: code == 200 ? '重置成功' : message,
              duration: 2000
            })
          }
        }
      },
      async getHornList() {
        let {code, data} = await getNoticeList()
        if (code == 200) {
          this.hornList = data
        }
      },
      async myBeauty() {
        let {code, data} = await myBeauty()
        if (code == 200) {
          this.saved = data
        }
      },
      async gotounlock(item, index) {
        if (item.taskStatus == 1) {//立即解锁
          GLOBALS.jumpOutsideGame(item.gameUrl)
        } else if (item.taskStatus == 0) {//可解锁
          this.getTaskAward(item, index, false)
        }
      },
      async getTaskAward(item, index, isUseSuiPian) {
        this.currentItem = item
        this.showLoading = true
        this.showBar = false
        try {
          let code = 0
          let data = null
          let message = null
          if (isUseSuiPian) {
            let res = await taskAutoComplete(item.taskId)
            code = res.code
            data = res.data
            message = res.message
          } else {
            let res = await taskReceive(item.taskId)
            code = res.code
            data = res.data
            message = res.message
          }
          if (code == 200) {
            setTimeout(() => {
              this.actInfoData.userTaskInfoRsps[index].taskStatus = 2
              setTimeout(() => {
                this.awardData = {
                  tips: '获得',
                  type: 'hfq',
                  awardsImg: data.taskAward.awardUrl,
                  awardsName: data.taskAward.awardName,
                  info: data.rescueAward ? '喔~好棒！任务已经全部完成啦！' : `离救出她更进一步了<br>继续加油吧~`,
                  btnName: '',
                  extraAward: data.rescueAward,
                  extraTips: `呜呜呜~终于见到你了<br>主人，特意献上以下奖励`,
                  extrabtnName: '收下啦',
                  extraInfo: `往后的日子里你可要好好照顾她哦~`
                }
                this.showPop(3)
                this.getActInfo(false)
                if (data.rescueAward) {
                  this.myBeauty()
                  this.getHornList()
                }
                this.showLoading = false
                this.showBar = true
              }, 100)
            }, 1000)
          }
          else {
            this.showLoading = false
            this.showBar = true
            this.$toast.show({
              message: message,
              duration: 2000
            })
          }
        } catch (e) {
          this.showLoading = false
        }
      },
      async showLeaguePacksList() {
        let {code, data} = await showLeaguePacksList()
        if (code == 200) {
          this.packages = data.leaguePacksList
        }
      },
      gotopay(item) {
        localStorage.setItem('originDeffer', window.location.href)
        localStorage.setItem('JDD_PARAM', JSON.stringify(item))
        localStorage.setItem('payment', JSON.stringify(item))
        location.href =
          'https://wap.beeplaying.com/xmWap/#/payment/paymentlist?isBack=true'
      },
      gotohelp(flag) {
        flag && (this.tabIndex = 0)
      }
    },
    mounted() {
      this.getActInfo(true)
    },
    watch: {
      countTime(val) {
        if (!val) {
          this.getActInfo(true)
        }
      },
      beautyDay(value, old) {
        if (old != null) {
          this.getActInfo(true)
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../../common/css/base.css';
  @import url('../../../static/iconfont/iconfont.css');

  .save_beauties {
    min-height: 100vh;
    &.hasReset {
      padding-bottom: 1.15rem;
    }
    background: #f5ab97;
    .save_beauties_container {
      width: 7.2rem;
      height: 14.93rem;
      background: url("./images/bg.png");
      background-size: 100% 100%;
      position: relative;
      .savenums {
        height: .3rem;
        position: absolute;
        top: .3rem;
        left: 0;
        right: 0;
        margin: auto;
        text-align: center;
        line-height: .3rem;
        font-size: .22rem;
        font-weight: 400;
        color: rgba(134, 56, 28, 1);
      }
      .clickicons {
        height: 1.7rem;
        position: absolute;
        top: .33rem;
        left: .23rem;
        right: .14rem;
        margin: auto;
        display: flex;
        justify-content: space-between;
        .item {
          .back, .rule {
            width: .5rem;
            height: .85rem;
            &.back {
              background: url("./images/back.png");
              background-size: 100% 100%;
            }
            &.rule {
              background: url("./images/rule.png");
              background-size: 100% 100%;
            }
          }
          .myprize {
            width: .5rem;
            height: 1.33rem;
            background: url("./images/myprize.png");
            background-size: 100% 100%;
          }
        }
      }
      .tabs {
        width: 4.27rem;
        position: absolute;
        top: 1.8rem;
        left: 0rem;
        right: 0rem;
        margin: auto;
        display: flex;
        justify-content: space-between;
        .item {
          width: 1.99rem;
          height: .52rem;
          background: url("./images/tab.png");
          background-size: 100% 100%;
          font-size: .24rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          text-align: center;
          line-height: .52rem;
          &.selected {
            height: .65rem;
            background: url("./images/tabselected.png");
            background-size: 100% 100%;
            padding-bottom: .07rem;
            box-sizing: border-box;
          }
        }
      }
      .container {
        position: absolute;
        top: 2.46rem;
        left: 0;
        right: 0;
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 1;
        .task_container {
          width: 5.86rem;
          height: 8.38rem;
          background: url("./images/bg00.png");
          background-size: 100% 100%;
          position: relative;
          margin-bottom: .12rem;
          .horn_content {
            position: absolute;
            left: 1.66rem;
            right: .1rem;
            top: .25rem;
            margin-bottom: auto;
          }
          &:before {
            content: '';
            width: 1.62rem;
            height: 1.66rem;
            background: url("./images/saveicon.png");
            background-size: 100% 100%;
            position: absolute;
            z-index: 1;
            position: absolute;
            left: -.06rem;
            top: -.04rem;
          }
          .content {
            position: absolute;
            top: .71rem;
            bottom: 1.17rem;
            left: .26rem;
            right: .26rem;
            margin: auto;
            background-size: 100% 100%;
            border-radius: .2rem;
            .content-item {
              height: 20%;
              background: rgba(44, 15, 40, 1);
              opacity: 0.92;
              padding: 0 .3rem;
              box-sizing: border-box;
              display: flex;
              justify-content: space-between;
              border-bottom: 1px solid rgba(174, 142, 131, 0.22);
              &:nth-child(1) {
                border-radius: .2rem .2rem 0 0;
              }
              &:nth-child(5) {
                border-radius: 0 0 .2rem .2rem;
              }
              &.animation {
                animation: fadeout 1s forwards;
              }
              &.saved {
                opacity: 0;
              }
              .item {
                font-size: .2rem;
                font-weight: 400;
                display: flex;
                flex-direction: column;
                justify-content: center;
                .task_title {
                  font-weight: bold;
                  color: rgba(255, 214, 201, 1);
                  line-height: .3rem;
                }
                .task_prize {
                  margin-top: .12rem;
                  color: rgba(255, 214, 201, 1);
                  i {
                    color: #FF8B45
                  }
                }
                &:nth-child(2) {
                  .btn {
                    width: 1.18rem;
                    height: .4rem;
                    line-height: .43rem;
                    text-align: center;
                    color: rgba(255, 255, 255, 1);
                    background: rgba(255, 214, 201, 1);
                    border-radius: .2rem;
                    &.btnsuipian {
                      margin-top: .14rem;
                      background: rgba(169, 93, 255, 1);
                    }
                    &.btnjiesuo {
                      color: #733928;
                    }
                    &.canjiesuo {
                      background: rgba(255, 108, 61, 1);
                    }
                  }
                }
              }
            }
          }
          .footer {
            width: 100%;
            position: absolute;
            bottom: 0.1rem;
            height: .8rem;
            text-align: center;
            font-size: .24rem;
            font-weight: bold;
            color: rgba(81, 37, 34, 1);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            i {
              color: #FF1510;
            }
            .item:nth-child(2) {
              margin-top: .1rem;
            }
          }
        }
        .package_container {
          width: 5.86rem;
          height: 3.48rem;
          background: url("./images/bg01.png");
          background-size: 100% 100%;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          &:before {
            content: '';
            width: 1.62rem;
            height: 1.66rem;
            background: url("./images/onetime.png");
            background-size: 100% 100%;
            position: absolute;
            left: -.06rem;
            top: -.04rem;
          }
          padding: .22rem .26rem .27rem;
          box-sizing: border-box;
          .tips {
            width: 3.48rem;
            height: .45rem;
            text-align: center;
            line-height: .47rem;
            background: rgba(218, 141, 90, 1);
            border-radius: .23rem;
            font-size: .26rem;
            font-weight: bold;
            color: rgba(255, 242, 237, 1);
            background: #DB8D5A;
          }
          .content {
            .item {
              display: flex;
              align-items: center;
              justify-content: space-between;
              width: 5.33rem;
              height: 1.15rem;
              background: rgba(242, 190, 172, 1);
              border-radius: .16rem;
              padding: .13rem;
              box-sizing: border-box;
              &:nth-child(2) {
                margin-top: .11rem;
              }
              img {
                width: .88rem;
                height: .88rem;
              }
              .middle {
                width: 3rem;
                height: 100%;
                font-size: .22rem;
                font-weight: 400;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                .title {
                  color: rgba(87, 31, 20, 1);
                }
                .info {
                  color: rgba(255, 42, 37, 1);
                }
                .desc {
                  font-size: .18rem;
                  color: rgba(144, 98, 82, 1);
                }
              }
              .line {
                width: 1px;
                height: .66rem;
                background: rgba(144, 98, 82, 0.41);
              }
              .right {
                .price {
                  font-size: .32rem;
                  font-weight: bold;
                  color: rgba(255, 42, 37, 1);
                  text-align: center;
                }
                .buy {
                  margin-top: .1rem;
                  width: .9rem;
                  height: .4rem;
                  line-height: .42rem;
                  text-align: center;
                  background: rgba(252, 105, 58, 1);
                  border-radius: .2rem;
                  font-size: .18rem;
                  font-weight: 400;
                  color: rgba(255, 255, 255, 1);
                  &.gray {
                    background: rgba(120, 97, 89, 1);
                  }
                }
              }
            }
          }
        }
      }
      .bottom-wrap {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100vw;
        height: 1.13rem;
        background: rgba(151, 92, 72, 1);
        border-radius: .16rem .16rem 0 0;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1;
        .btn {
          width: 3.62rem;
          height: .6rem;
          line-height: .62rem;
          text-align: center;
          background: rgba(255, 108, 61, 1);
          border-radius: .16rem;
          font-size: .3rem;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
          &.gray {
            background: rgba(120, 97, 89, 1);
          }
        }
      }
      .ranks_container {
        width: 5.86rem;
        height: 11.78rem;
        background: url("./images/bg1.png");
        background-size: 100% 100%;
        position: relative;
        padding-top: .35rem;
        box-sizing: border-box;
        &:before {
          content: '';
          width: 1.62rem;
          height: 1.66rem;
          background: url("./images/saveicon.png");
          background-size: 100% 100%;
          position: absolute;
          z-index: 1;
          position: absolute;
          left: -.06rem;
          top: -.04rem;
        }
        .three_prize_container {
          height: 3.56rem;
          background-size: 100% 100%;
          padding: 0 .43rem 0 .53rem;
          box-sizing: border-box;
          margin-bottom: .28rem;
        }
        .all_prize_container {
          height: 6.05rem;
          padding: 0 .43rem 0 .53rem;
          box-sizing: border-box;
          margin-bottom: .4rem;
        }
        .list {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          margin-bottom: .3rem;
          .list-item {
            width: 1.54rem;
            height: 2.25rem;
            background-size: 100% 100%;
            margin: .2rem 0 0;
            position: relative;
            .name {
              position: absolute;
              bottom: 0;
              left: 0;
              right: 0;
              margin: auto;
              width: 100%;
              height: .42rem;
              background: rgba(118, 22, 71, 1);
              border: 2px solid rgba(218, 161, 146, 0.84);
              border-radius: .16rem;
              box-sizing: border-box;
              font-size: .24rem;
              font-weight: bold;
              color: rgba(255, 255, 255, 1);
              text-align: center;
              line-height: .42rem;
            }
            &.help:after {
              content: '';
              position: absolute;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              margin: auto;
              width: .8rem;
              height: .8rem;
              background: url("./images/helpicon.png");
              background-size: 100% 100%;
              z-index: 1;
            }
            &.torrowSave:after {
              content: '';
              position: absolute;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              margin: auto;
              width: .8rem;
              height: .8rem;
              background: url("./images/tomorrowsave.png");
              background-size: 100% 100%;
            }
          }
        }
        .prize_btn {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .desc {
            font-size: .24rem;
            font-weight: 400;
            color: rgba(231, 171, 150, 1);
          }
          .info {
            margin-top: .13rem;
            font-size: .3rem;
            font-weight: bold;
            color: rgba(231, 171, 150, 1);
            i {
              color: #FF3333;
            }
          }
          .btn {
            width: 1.51rem;
            height: .6rem;
            line-height: .6rem;
            text-align: center;
            background: rgba(255, 86, 41, 1);
            border-radius: .1rem;
            font-size: .28rem;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            &.gray {
              background: rgba(120, 97, 89, 1);
            }
          }
        }
        .footer {
          height: 1.02rem;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: .3rem;
          font-weight: bold;
          color: rgba(81, 37, 34, 1);
          text-align: center;
        }
      }
      &:after {
        content: '';
        position: absolute;
        top: 2.25rem;
        left: 0;
        width: 4.7rem;
        height: 7.55rem;
        background: url("./images/light.png");
        background-size: 100% 100%;
      }
    }
  }

  @keyframes fadeout {
    0% {
      opacity: 1;
    }
    90% {
      opacity: .5;
    }
    100% {
      opacity: 0;
    }
  }
</style>
