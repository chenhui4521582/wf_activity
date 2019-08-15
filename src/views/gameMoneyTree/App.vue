<template>
  <div id="app" v-if="show">
    <div class="closeegg" @click="closegameeggs(1)"></div>
    <div class="rule" @click="showrule">规则</div>
    <div class="act_detail" @click="gotoact(1)">去活动详情</div>
    <div class="container" v-if="actAndUserInfoData">
      <!-- <div class="time" v-if="isShowDay">剩余时间: {{countdown.time.replace('小时',':').replace('分',':').replace('秒','')}}</div> -->
      <!-- <div class="time" v-else>截止时间: {{actAndUserInfoData.endTime}}</div> -->
      <div class="time"></div>
      <div class="eggs" v-if="actAndUserInfoData">
        <div class="eggs_continer">
          <div class="item">
            <div class="num">{{actAndUserInfoData.remanentFood}}</div>
            <div class="txt">剩余养料</div>
          </div>
          <div class="item">
            <div class="num" v-if="actAndUserInfoData.remanentFood<500">差{{500-actAndUserInfoData.remanentFood}}份养料 摇金果奖励</div>
            <div class="num" v-else>可摇摇钱树</div>
            <div class="arrow"></div>
            <div class="btn" @click="kickeggs()">立即去摇奖励</div>
          </div>
          <img src="./images/gift-icon.png" alt="" class="item">
        </div>
      </div>
      <div class="games" v-if="actAndUserInfoData&&hbItems.length">
        <div class="text">
          <span class="dot"></span> <i>玩游戏领养料</i> 每支持1000金叶，可获得1份养料
        </div>
        <div class="games_container">
          <div class="content">
            <div class="hb-task-box">
              <div class="percent-box">
                <div class="percent-number" :style="{width:wpercent}"></div>
              </div>
              <ul>
                <li v-for="(item,index) in envelopsItem" v-if="!item.dot">
                  <h2>支持金叶</h2>
                  <h4 v-if="envelopsItem.length<6">{{transUint(item.bettingAmount )}}</h4>
                  <template v-else>
                    <h4 v-if="index<envelopsItem.length-1">{{transUint(item.bettingAmount )}}</h4>
                    <h4 v-else>终极档位</h4>
                  </template>
                  <div class="hb-line"></div>
                  <div class="envelopes">{{item.awards}}个</div>
                  <div class="btn btn-complete" v-if="item.status == 2">完成</div>
                  <div class="btn btn-success" v-if="item.status == 0" @click="gotoact(2)">领取</div>
                  <div class="btn btn-default" v-if="item.status == 1" @click="closegameeggs(2,item)">去完成</div>
                </li>
                <li class="hb-dot-box" v-else>
                  <span class="hb-dot hb-dot1"></span>
                  <span class="hb-dot"></span>
                </li>
              </ul>
            </div>
          </div>
          <div class="tips" v-if="actAndUserInfoData">
            <div>已支持金叶:{{transUint(actAndUserInfoData.userBetting )}}</div>
            <div>累计养料:{{actAndUserInfoData.receiveByCumulativeBetting}}个</div>
          </div>
        </div>
      </div>
      <div class="packages">
        <div class="text">
          <span class="dot"></span> <i>购买礼包得养料</i> 礼包可不限次购买，重复获取养料
        </div>
        <div class="games_container">
          <div class="content">
            <div class="item" v-for="(item,index) in packageData" @click="gotopay(item)">
              <img src="./images/gift1.png" alt="" v-if="index==0">
              <img src="./images/gift2.png" alt="" v-if="index==1">
              <img src="./images/gift3.png" alt="" v-if="index==2">
              <div class="info">
                {{item.content.split('+')[0]}}
                <template v-if="item.content.split('+')[1]"><br>+{{item.content.split('+')[1]}}</template>
              </div>
              <div class="btn">¥{{item.price}}</div>
            </div>
          </div>
          <div class="tips" v-if="actAndUserInfoData">
            <div>已购买礼包:{{actAndUserInfoData.buyPackageTime||0 }}次</div>
            <div>累计养料:{{actAndUserInfoData.receiveByPackage }}个</div>
          </div>
        </div>
      </div>
    </div>
    <awards-pop v-if="showAwardspop" :type="type" :awardsname="awardsname" :gametype="currentGameType" @close="showAwardspop=false" @closeview="closegameeggs" @gotoact="gotoact"></awards-pop>
  </div>
</template>
<script>
import '../../common/js/window.js'
import awardsPop from './components/awardPop'

export default {
  data () {
    return {
      show: false,
      hbItems: [],
      awardsname: '',
      showAwardspop: false,
      type: 2,
      token: '',
      channel: '',
      currentGameType: '',
      packageData: [], // 礼包数据
      countdown: {// 倒计时
        time: ''
      },
      actAndUserInfoData: null
    }
  },
  created () {
    this.getActivityAndUserInfo()
  },
  mounted () {
    this.token = GLOBALS.getUrlParam('token') ? GLOBALS.getUrlParam('token') : localStorage.getItem('ACCESS_TOKEN')
    this.channel = GLOBALS.getUrlParam('channel') ? GLOBALS.getUrlParam('channel') : localStorage.getItem('APP_CHANNEL')
    this.currentGameType = GLOBALS.getUrlParam('gametype')
  },
  computed: {
    envelopsItem () {
      if (!this.hbItems) {
        return []
      }

      // 获取最大值
      let maxItem = this.hbItems && this.hbItems.length && this.hbItems.sort((a, b) => {
        return a.bettingAmount - b.bettingAmount
      })[this.hbItems.length - 1]

      // 删除数组最后一位
      const data = this.hbItems.slice()
      data.pop()

      let nArr = data.filter((item) => {
        return item.status == 1
      }).sort((a, b) => {
        return a.bettingAmount - b.bettingAmount
      })
      let tArr = data.filter((item) => {
        return item.status != 1
      }).sort((a, b) => {
        return a.bettingAmount - b.bettingAmount
      })
      let result = []
      if (nArr.length >= 4) {
        if (tArr.length) {
          result = [tArr[tArr.length - 1], ...nArr.splice(0, 3)]
        } else {
          result = nArr.splice(0, 4)
        }
        // result.push(nArr.pop())
        // 个数大于5个的时候加个dot
        result.splice(4, 0, { dot: true })
        result.push(maxItem)
        return result
      } else {
        result = [...this.getList(nArr, tArr), maxItem]
        return result
      }
    },
    wpercent () {
      if (!this.hbItems || this.hbItems.length == 0) {
        return
      }
      if (this.hbItems && this.envelopsItem) {
        if (this.envelopsItem && this.envelopsItem[this.envelopsItem.length - 1] && this.envelopsItem[this.envelopsItem.length - 1].status != 1) {
          return '100%'
        } else {
          let minUnfinished = this.hbItems.filter((item) => {
            return item.status == 1
          }).sort((a, b) => {
            return a.bettingAmount - b.bettingAmount
          })[0]
          let idArr = [...this.envelopsItem.map(c => c.order)].indexOf(minUnfinished.order)
          if (this.envelopsItem.length == 6) {
            if (idArr == -1) { // 在省略号里
              console.log(parseFloat(5 * 100 / 6).toFixed(2) + '%')
              return parseFloat(5 * 100 / 6).toFixed(2) + '%'
            } else {
              if (idArr == 0) {
                return parseFloat((idArr + this.actAndUserInfoData.userBetting / (minUnfinished.bettingAmount)) * 100 / 12) + '%'
              } else {
                return parseFloat((idArr - 1) / 6 + this.actAndUserInfoData.userBetting / (minUnfinished.bettingAmount) / 6 * 100) + '%'
              }
            }
          } else {
            if (idArr == 0) {
              return parseFloat((idArr + this.actAndUserInfoData.userBetting / (minUnfinished.bettingAmount)) * 100 / 12) + '%'
            } else {
              return parseFloat(((idArr - 1) + this.actAndUserInfoData.userBetting / minUnfinished.bettingAmount) * 5 / 24 * 100) + '%'
            }
          }
        }
      } else {
        return 0
      }
    },
    isShowDay () {
      return this.countdown.time && +this.countdown.time.split('天')[0] <= 1
    }
  },
  methods: {
    /** 单位转换 **/
    transUint (awards) {
      let finish = awards > 10000 ? parseFloat((awards / 10000).toFixed(1)) + '万' : awards
      return finish
    },
    async fetch (url, params) {
      if (url.startsWith('/ops/api')) {
        url = '//ops-api.beeplaying.com' + url
      }
      if (url.startsWith('/wap/api')) {
        url = '//platform-api.beeplaying.com' + url
      }
      if (url.startsWith('/wap/api')) {
        url = '//shop-api.beeplaying.com' + url
      }
      if (url.startsWith('/shop/api')) {
        url = '//shop-api.beeplaying.com' + url
      }
      const res = await this.axios.post(url, params, {})
      return res.data
    }, // 请求封装方法
    closegameeggs (flag, item = null) {
      if (flag) {
        flag == 1 && GLOBALS.marchSetsPoint('A_H5PT0018001666', {
          from_project_id: this.currentGameType
        })
        flag == 2 && GLOBALS.marchSetsPoint('A_H5PT0018001660', {
          from_project_id: this.currentGameType,
          task_id: item.sort,
          task_name: `支持金叶${this.transUint(item.bettingAmount)}`
        })
      }
      if (parent.closeWebView) {
        parent.closeWebView()
      }
    },
    getList (newArr, completeArr, maxItem) {
      if (newArr.length < 4) {
        var len = 4 - newArr.length
        return newArr.concat(completeArr.splice(completeArr.length - len, len)).sort(function (a, b) {
          return a.bettingAmount - b.bettingAmount
        })
      }
    },
    showrule () {
      GLOBALS.marchSetsPoint('A_H5PT0018001662', {
        from_project_id: this.currentGameType
      })
      this.type = 1
      this.awardsname = `<p>1. 活动时间：${this.actAndUserInfoData.activityTime}</p><p>养料榜结算时间：${this.actAndUserInfoData.endTime}</p><p>2. 养料作用：</p><p>使用养料摘取果实，可获得若干的金叶、话费券、京东券、满减券；</p><p>活动结束后，将按累计获得的养料数（不管是否被消耗）排名，前30名有奖励。累计养料数一样的，按照时间先后顺序排序。</p><p>3. 养料获取途径：</p><p>参与活动免费摇一次铜果实；</p><p>消费达到指定额度领取养料</p><p>玩游戏，金叶消耗达到额度领取养料；套圈、物资争夺、斗地主不计入此活动；</p><p>购买活动礼包获得养料；</p><p>4. 注意事项：</p><p>养料数目相同时，榜单排名有先后，实际发放奖励以较高奖励为准。</p><p>活动期间，禁止作弊行为。如有任何疑问，可在游戏中心--“我的”--“帮助联系客服，或致电400-873-5311。</p>`
      this.showAwardspop = true
    },
    gotoact (flag = 0) { // 去活动详情
      let params = `time=${new Date().getTime()}&channel=${this.channel}&token=${this.token}`
      if (flag === 1) {
        GLOBALS.marchSetsPoint('A_H5PT0018001663', {
          from_project_id: this.currentGameType
        })
      }
      if (flag === 2) {
        GLOBALS.marchSetsPoint('A_H5PT0018001665', {
          from_project_id: this.currentGameType
        })
      }
      if (flag === 2 || flag === 3) {
        params = params + '&showMoreProps=true'
      }
      parent.location.href = `https://wap.beeplaying.com/moneyTree?${params}`
    },
    kickeggs () {
      GLOBALS.marchSetsPoint('A_H5PT0018001664', {
        from_project_id: this.currentGameType
      })
      if (!this.actAndUserInfoData.remanentFood) {
        this.awardsname = 1
        this.type = 2
        this.showAwardspop = true
      } else {
        this.type = 3
        this.showAwardspop = true
      }
    },
    async getActivityAndUserInfo () {
      let { data, code } = await this.fetch('/ops/api/plant-food/user-info')
      if (code == 200) { // 活动开启
        this.show = true
        this.actAndUserInfoData = data
        this.actAndUserInfoData.endTime = GLOBALS.formatDate(data.rankAwardsSendTime, 'll').split('年')[1]
        if (data.settleTime > 0) {
          GLOBALS.marchSetsPoint('A_H5PT0075001484', {
            from_project_id: this.currentGameType
          })
          GLOBALS.remainingTime(
            this,
            data.settleTime,
            this.countdown,
            true
          )
          this.getBetProgress()
          this.getPackage()
        }
      }
    },
    // 礼包
    async getPackage () { // 获取礼包数据
      try {
        const { data, code } = await this.fetch('/shop/api/mall/showLeaguePacksList/plantfood')
        if (code == 200) {
          this.packageData = data.leaguePacksList || []
        }
      } catch (e) {

      }
    },
    gotopay (val) {
      localStorage.setItem('originDeffer', parent.location.href)
      GLOBALS.marchSetsPoint('A_H5PT0018001661', {
        product_id: val.bizId,
        from_project_id: this.currentGameType,
        recharge_rmb: val.price
      })
      val.needpaybackurl = `https://wap.beeplaying.com/activities/gameMoneyTree.html`
      localStorage.setItem('JDD_PARAM', JSON.stringify(val))
      if (window.linkUrl.getBackUrlFlag(this.channel) == 'bdWap' && this.channel != '100001') { // 好看、全民小视频
        location.href = 'https://wap.beeplaying.com/payment/#/bdPayment'
      } else {
        location.href = 'https://wap.beeplaying.com/payment/#/payment'
      }
    },
    async getBetProgress () {
      let { data, code } = await this.fetch('/ops/api/plant-food/playGameProgress')
      if (code == 200) {
        this.hbItems = data.platFoodPlayGameTaskConfigList
      }
    }
  },
  components: {
    awardsPop
  }
}

</script>
<style lang="less" scoped>
@import "../../common/css/base.css";
/* 坚屏模式 */
@media only screen and (orientation: portrait) {
  #app {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    background: #ffe6b3;
    font-size: 0.24rem;
    font-weight: 700;
    color: #fff;
    width: 6.6rem;
    height: 9.9rem;
  }
}

/* 横屏模式 */
@media screen and (orientation: landscape) {
  #app {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    background: #ffe6b3;
    font-size: 0.24rem;
    font-weight: 700;
    color: #fff;
    width: 6.6rem;
    height: 9.9rem;
    overflow: scroll;
  }
}

#app {
  &.close {
    background: transparent;
  }
  &:not(.close):before {
    content: "";
    position: absolute;
    top: 0.2rem;
    left: 0;
    right: 0;
    margin: auto;
    width: 5.14rem;
    height: 0.45rem;
    background: url("./images/titlebg.png");
    background-size: 100% 100%;
  }
  .closeegg {
    position: absolute;
    right: 0;
    width: 0.5rem;
    height: 0.5rem;
    background: url("./images/closebg.png");
    background-size: 100% 100%;
    z-index: 1;
  }
  .rule {
    position: absolute;
    top: 0.83rem;
    width: 0.74rem;
    height: 0.54rem;
    line-height: 0.54rem;
    text-align: center;
    background: url("./images/rule.png");
    background-size: 100% 100%;
    z-index: 1;
  }
  .act_detail {
    position: absolute;
    right: 0;
    top: 0.83rem;
    width: 1.34rem;
    height: 0.54rem;
    line-height: 0.54rem;
    text-align: center;
    background: url("./images/detail_btn.png");
    background-size: 100% 100%;
    z-index: 1;
  }
  .container {
    position: absolute;
    width: 6.3rem;
    top: 0.72rem;
    bottom: 0.29rem;
    left: 0;
    right: 0;
    margin: auto;
    .time {
      color: #216b0d;
      margin-bottom: 0.4rem;
      padding-left: 1.6rem;
    }
    .eggs {
      height: 0.97rem;
      /*padding: 0 1.34rem 0 .74rem;*/
      margin-bottom: 0.15rem;
      display: flex;
      justify-content: center;
      .eggs_continer {
        float: left;
        display: flex;
        .item {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          &:nth-child(1) {
            padding-top: 0.06rem;
            padding-bottom: 0.14rem;
            box-sizing: border-box;
            margin-right: 0.02rem;
            .num {
              font-size: 0.6rem;
              color: rgba(197, 84, 0, 1);
            }
            .txt {
              font-weight: 400;
              color: rgba(197, 83, 0, 1);
            }
          }
          &:nth-child(2) {
            padding-top: 0.13rem;
            box-sizing: border-box;
            margin-right: 0.09rem;
            .num {
              font-size: 0.18rem;
              font-weight: 400;
              color: rgba(220, 141, 0, 1);
            }
            .arrow {
              width: 2.02rem;
              height: 0.17rem;
              border-bottom: 0.04rem solid #dc8d00;
              box-sizing: border-box;
              position: relative;
              &:after {
                content: "";
                position: absolute;
                right: 0.05rem;
                bottom: -0.03rem;
                height: 0.13rem;
                width: 0.04rem;
                background: #dc8d00;
                border-radius: 0.02rem;
                transform: rotate(-45deg);
              }
            }
            .btn {
              margin-top: 0.1rem;
              font-size: 0.2rem;
              height: 0.4rem;
              line-height: 0.4rem;
              text-align: center;
              background: #df5507;
              border-radius: 0.2rem;
              padding: 0 0.14rem;
            }
          }
          &:nth-child(3) {
            width: 0.97rem;
            height: 0.91rem;
          }
        }
      }
    }
    .games {
      clear: both;
      margin-bottom: 0.15rem;
      .text {
        font-size: 0.2rem;
        font-weight: 400;
        color: rgba(192, 112, 2, 1);
        line-height: 0.25rem;
        .dot {
          display: inline-block;
          width: 0.12rem;
          height: 0.12rem;
          background: rgba(226, 129, 42, 1);
          border-radius: 50%;
        }
        i {
          font-size: 0.24rem;
          font-weight: bolder;
          color: rgba(192, 112, 2, 1);
        }
      }
      .games_container {
        margin-top: 0.1rem;
        height: 2.76rem;
        background: rgba(255, 250, 241, 1);
        box-shadow: 0 0.05rem 0.09rem 0 rgba(79, 33, 26, 0.13);
        border-radius: 0.15rem;
        position: relative;
        .content {
          .hb-task-box {
            padding: 0 0.07rem;
            ul {
              display: flex;
            }
            .percent-box {
              height: 0.15rem;
              background: rgba(172, 222, 246, 1);
              border-radius: 0.08rem;
              position: absolute;
              left: 0.2rem;
              right: 0.2rem;
              top: 1rem;
              .percent-number {
                /*width: 40%;*/
                height: 0.15rem;
                position: absolute;
                left: 0;
                top: 0;
                background: rgba(220, 141, 0, 1);
                border-radius: 0.08rem;
                &:after {
                  content: "";
                  width: 0.23rem;
                  height: 0.23rem;
                  background: url(./images/percent-dot.png) no-repeat;
                  background-size: 100% 100%;
                  position: absolute;
                  right: -0.1rem;
                  top: -0.04rem;
                }
              }
            }
            li {
              flex: 1;
              display: flex;
              flex-direction: column;
              align-items: center;
              h2 {
                font-size: 0.2rem;
                font-weight: 500;
                color: rgba(71, 129, 14, 1);
                padding-top: 0.28rem;
              }
              h4 {
                font-size: 0.22rem;
                font-weight: 800;
                color: rgba(71, 129, 14, 1);
                margin: 0.1rem auto 0.05rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              &:last-child h4 {
                max-width: 1.2rem;
              }
              .hb-line {
                width: 0.33rem;
                height: 0.37rem;
                background: url("./images/envelopes.png");
                background-size: 100% 100%;
                z-index: 1;
              }
              &.hb-dot-box {
                flex: 0 0 0.6rem;
              }
              .hb-dot {
                display: block;
                width: 0.27rem;
                height: 0.06rem;
                background: url(./images/dot.png) no-repeat;
                background-size: 100% 100%;
                &.hb-dot1 {
                  margin: 0.54rem auto 1.15rem;
                }
              }
              .envelopes {
                /*width: 0.59rem;*/
                height: 0.3rem;
                line-height: 0.3rem;
                margin: 0.04rem auto 0;
                font-size: 0.2rem;
                color: #81942d;
                text-align: center;
              }
              .btn {
                display: block;
                width: 0.89rem;
                height: 0.46rem;
                font-size: 0.24rem;
                font-weight: bold;
                display: flex;
                align-items: center;
                justify-content: center;
                &.btn-receive {
                  /*background: url(./images/btn-receive.png) no-repeat;*/
                  /*background-size: 100% 100%;*/
                  color: rgba(255, 236, 203, 1);
                }
                &.btn-default {
                  background: #dc8d00;
                  border-radius: 0.24rem;
                  background-size: 100% 100%;
                  color: rgba(255, 255, 255, 1);
                }
                &.btn-complete {
                  font-size: 0.24rem;
                  color: #ea8c12;
                  background: transparent;
                }
                &.btn-success {
                  font-size: 0.24rem;
                  border-radius: 0.24rem;
                  color: #fff;
                  background: #97b103;
                }
              }
            }
          }
        }
        .tips {
          color: rgba(148, 77, 0, 1);
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 0.52rem;
          background: rgba(254, 192, 65, 1);
          border-radius: 0 0 0.15rem 0.15rem;
          display: flex;
          padding: 0.09rem 0;
          box-sizing: border-box;
          div {
            flex: 1;
            text-align: center;
            line-height: 0.34rem;
            &:nth-child(1) {
              border-right: 1px solid rgba(178, 112, 20, 1);
            }
          }
        }
      }
    }
    .packages {
      .text {
        font-size: 0.2rem;
        font-weight: 400;
        color: rgba(192, 112, 2, 1);
        line-height: 0.3rem;
        .dot {
          display: inline-block;
          width: 0.12rem;
          height: 0.12rem;
          background: rgba(226, 129, 42, 1);
          border-radius: 50%;
        }
        i {
          font-size: 0.24rem;
          font-weight: bolder;
          color: rgba(192, 112, 2, 1);
        }
      }
      .games_container {
        margin-top: 0.1rem;
        height: 3.3rem;
        background: rgba(255, 250, 241, 1);
        box-shadow: 0 0.05rem 0.09rem 0 rgba(79, 33, 26, 0.13);
        border-radius: 0.15rem;
        position: relative;
        .content {
          position: absolute;
          top: 0.15rem;
          bottom: 0.77rem;
          left: 0.2rem;
          right: 0.2rem;
          background: #fff;
          display: flex;
          justify-content: space-between;
          .item {
            width: 1.8rem;
            height: 2.48rem;
            background: rgba(255, 212, 136, 1);
            border-radius: 0.1rem;
            padding: 0.14rem 0 0.17rem;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            img {
              width: 1.04rem;
              height: 1.15rem;
            }
            .info {
              text-align: center;
              font-size: 0.2rem;
              font-weight: 400;
              color: rgba(154, 86, 25, 1);
              line-height: 0.3rem;
            }
            .btn {
              width: 0.96rem;
              height: 0.39rem;
              line-height: 0.39rem;
              text-align: center;
              background: rgba(255, 127, 50, 1);
              border-radius: 20px;
            }
          }
        }
        .tips {
          color: rgba(148, 77, 0, 1);
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 0.52rem;
          background: rgba(254, 192, 65, 1);
          border-radius: 0 0 0.15rem 0.15rem;
          display: flex;
          padding: 0.09rem 0;
          box-sizing: border-box;
          div {
            flex: 1;
            text-align: center;
            line-height: 0.34rem;
            &:nth-child(1) {
              border-right: 1px solid rgba(178, 112, 20, 1);
            }
          }
        }
      }
    }
  }
}
</style>
