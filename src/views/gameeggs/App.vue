<template>
  <div id="app" :class="{close:isclose}" v-if="show">
    <template v-if="!isclose">
      <div class="closeegg" @click="closegameeggs(1)"></div>
      <div class="rule" @click="showrule">规则</div>
      <div class="act_detail" @click="gotoact(1)">去活动详情</div>
      <div class="container" v-if="actInfoData">
        <div class="time" v-if="isShowDay">剩余时间: {{countdown.time.replace('小时',':').replace('分',':').replace('秒','')}}
        </div>
        <div class="time" v-else>截止时间: {{actInfoData.endTime}}</div>
        <div>

        </div>
        <div class="eggs" v-if="detailData">
          <div class="eggs_continer">
            <div class="item">
              <div class="num">{{detailData.remanentNum}}</div>
              <div class="txt">剩余锤子</div>
            </div>
            <div class="item">
              <div class="num" v-if="detailData.surplusNum">差{{detailData.surplusNum}}个锤子 砸下个蛋</div>
              <div class="num" v-else>可砸下一个蛋</div>
              <div class="arrow"></div>
              <div class="btn" @click="kickeggs(detailData.surplusNum)">去砸蛋</div>
            </div>
            <img src="./images/egg.png" alt="" class="item">
          </div>
        </div>
        <div class="games" v-if="actInfoData&&hbItems.length">
          <div class="text">
            <span class="dot"></span> <i>玩游戏得锤子</i> {{actInfoData.rulesExplain}}
          </div>
          <div class="games_container">
            <div class="content">
              <div class="hb-task-box">
                <div class="percent-box">
                  <div class="percent-number" :style="{width:wpercent}"></div>
                </div>
                <ul>
                  <li v-for="item in envelopsItem" v-if="!item.dot">
                    <h2>支持金叶</h2>
                    <h4>{{transUint(item.amount)}}</h4>
                    <div class="hb-line"></div>
                    <div class="envelopes">{{item.awards}}个</div>
                    <div class="btn btn-complete" v-if="item.status == 1">完成</div>
                    <div class="btn btn-default" v-else @click="closegameeggs(2)">去完成</div>
                  </li>
                  <li class="hb-dot-box" v-else>
                    <span class="hb-dot hb-dot1"></span>
                    <span class="hb-dot"></span>
                  </li>
                </ul>
              </div>
            </div>
            <div class="tips" v-if="detailData">
              <div>已支持金叶:{{transUint(detailData.gameBetting)}}</div>
              <div>累计锤子:{{detailData.gameReturnNum}}个</div>
            </div>
          </div>
        </div>
        <div class="packages">
          <div class="text">
            <span class="dot"></span> <i>购买礼包得锤子</i> 礼包可不限次购买，重复获取锤子
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
            <div class="tips" v-if="detailData">
              <div>已购买礼包:{{detailData.rechargeTime}}次</div>
              <div>累计锤子:{{detailData.rechargeReturnNum}}个</div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <awards-pop v-if="showAwardspop||(isclose)" :type="type" :awardsname="awardsname" @close="showAwardspop=false"
                @closeview="closegameeggs" @gotoact="gotoact"></awards-pop>
  </div>
</template>
<script>
  import '../../common/js/window.js';
  import awardsPop from './components/awardPop'

  export default {
    data() {
      return {
        show: false,
        hbItems: [],
        awardsname: '',
        showAwardspop: false,
        type: 4,
        token: '',
        channel: '',
        currentGameType: '',
        packageData: [],//礼包数据
        countdown: {//倒计时
          time: ''
        },
        actInfoData: null,
        detailData: null,
        isclose: false
      }
    },
    created() {
      this.getActivityInfo()
    },
    mounted() {
      this.token = GLOBALS.getUrlParam('token') ? GLOBALS.getUrlParam('token') : localStorage.getItem('ACCESS_TOKEN')
      this.channel = GLOBALS.getUrlParam('channel') ? GLOBALS.getUrlParam('channel') : localStorage.getItem('APP_CHANNEL')
      this.currentGameType = GLOBALS.getUrlParam('gametype')
    },
    computed: {
      envelopsItem() {
        if (!this.hbItems) {
          return []
        }

        // 获取最大值
        let maxItem = this.hbItems && this.hbItems.length && this.hbItems.sort((a, b) => {
          return a.amount - b.amount
        })[this.hbItems.length - 1]

        // 删除数组最后一位
        const data = this.hbItems.slice()
        data.pop()

        let nArr = data.filter((item) => {
          return item.status != 1
        }).sort((a, b) => {
          return a.amount - b.amount
        })
        let tArr = data.filter((item) => {
          return item.status == 1
        }).sort((a, b) => {
          return a.amount - b.amount
        })
        let result = []
        if (nArr.length > 4) {
          result = nArr.splice(0, 4)
          // result.push(nArr.pop())
          // 个数大于5个的时候加个dot
          result.splice(4, 0, {dot: true})
          result.push(maxItem)
          return result
        } else if (nArr.length == 4) {
          result = nArr.splice(0, 4)
          result.push(maxItem)
          return result
        } else {
          result = [...this.getList(nArr, tArr), maxItem]
          return result
        }

      },
      wpercent() {
        if (!this.hbItems || this.hbItems.length == 0) {
          return
        }
        if (this.hbItems && this.envelopsItem) {
          if (this.envelopsItem && this.envelopsItem[this.envelopsItem.length - 1] && this.envelopsItem[this.envelopsItem.length - 1].status != 0) {
            return '100%'
          } else {
            let minUnfinished = this.hbItems.filter((item) => {
              return item.status == 0
            }).sort((a, b) => {
              return a.amount - b.amount
            })[0]
            let idArr = [...this.envelopsItem.map(c => c.sort)].indexOf(minUnfinished.sort)
            if (this.envelopsItem.length == 6) {
              if (idArr == -1) {//在省略号里
                console.log(parseFloat(5 * 100 / 6).toFixed(2) + '%')
                return parseFloat(5 * 100 / 6).toFixed(2) + '%'
              } else {
                if (idArr == 0) {
                  return parseFloat((idArr + this.detailData.gameBetting / (minUnfinished.amount)) * 100 / 12) + '%'
                } else {
                  return parseFloat((1 / 12 + (idArr - 1) / 6 + this.detailData.gameBetting / (minUnfinished.amount) / 6) * 100) + '%'
                }
              }
            } else {
              if (idArr == 0) {
                return parseFloat((idArr + this.detailData.gameBetting / (minUnfinished.amount)) * 100 / 12) + '%'
              } else {
                return parseFloat((1 / 12 + (idArr - 1) * 5 / 24 + this.detailData.gameBetting / (minUnfinished.amount) * 5 / 24) * 100) + '%'
              }
            }
          }
        } else {
          return 0
        }

      },
      isShowDay() {
        return this.countdown.time && this.countdown.time.split('天')[0] <= 1
      }
    },
    methods: {
      /** 单位转换 **/
      transUint(awards) {
        let finish = awards > 10000 ? parseFloat((awards / 10000).toFixed(1)) + '万' : awards
        return finish
      },
      fetch(url, params) {
        if (url.startsWith('/ops/api')) {
          url = '//ops-api.beeplay123.com' + url
        }
        if (url.startsWith('/wap/api')) {
          url = '//platform-api.beeplay123.com' + url
        }
        if (url.startsWith('/wap/api')) {
          url = '//shop-api.beeplay123.com' + url
        }
        return this.axios.post(url, params, {})
      },//请求封装方法
      closegameeggs(flag) {
        if (flag) {
          flag == 1 && GLOBALS.marchSetsPoint('A_H5PT0075001490')
          flag == 2 && GLOBALS.marchSetsPoint('A_H5PT0075001488')
        }
        if (parent.closeWebView) {
          parent.closeWebView()
        }
      },
      getList(newArr, completeArr, maxItem) {
        if (newArr.length < 4) {
          var len = 4 - newArr.length;
          return newArr.concat(completeArr.splice(completeArr.length - len, len)).sort(function (a, b) {
            return a.amount - b.amount
          })
        }
      },
      showrule() {
        GLOBALS.marchSetsPoint('A_H5PT0075001485')
        this.type = 1;
        this.awardsname = `<p>1、消耗锤子可砸开彩蛋，获取奖励。砸完当前所有蛋，将会生成新蛋供您砸</p>
<p>2、购买活动内礼包可获得锤子，重复购买可重复获取；</p><p>3、在以下游戏中，活动期间累计支持金叶子到一定值可获得锤子<p>
<p>${this.actInfoData.rulesInfo}<p><p>4、活动结束后，将按累计获得的锤子数（不管是否被消耗）排名，前30名有奖励<p>`
        this.showAwardspop = true;
      },
      gotoact(flag = 0) {//去活动详情
        if (flag) {
          GLOBALS.marchSetsPoint('A_H5PT0075001486')
        }
        parent.location.href = `http://wap.beeplay123.com/activities/eggs.html?channel=${this.channel}&token=${this.token}`
      },
      kickeggs(num) {
        GLOBALS.marchSetsPoint('A_H5PT0075001487')
        if (num) {
          this.awardsname = num;
          this.type = 2;
        } else {
          this.type = 3;
        }
        this.showAwardspop = true;
      },
      async getActivityInfo() {
        let {data: data} = await this.fetch('/ops/api/plant-food-v2/activity-info')
        if (data.code == 200) {//活动开启
          this.show = true;
          this.actInfoData = data.data
          if (data.data.open) {
            GLOBALS.marchSetsPoint('A_H5PT0075001484')
            GLOBALS.remainingTime(
              this,
              data.data.countdown,
              this.countdown,
              true
            );
            this.getDetailData()
            this.getBetProgress()
            this.getPackage()
          } else {
            this.isclose = true;
            this.type = 4;
          }
        }
      },
      async getDetailData() {
        let self = this
        this.axios.all([this.fetch('/ops/api/plant-food-v2/user-info'), this.fetch('/ops/api/plant-food-v2/current-bet-progress')]).then(this.axios.spread(function ({data: data}, {data: data1}) {
          if (data.code == 200) {
            self.detailData = data.data;
          }
          if (data.code == 200 && data1.code == 200) {
            self.detailData.surplusNum = data1.data.consumeNum - self.detailData.remanentNum > 0 ? (data1.data.consumeNum - self.detailData.remanentNum) : 0;
          }
        }));
      },
      //礼包
      async getPackage() {//获取礼包数据
        try {
          const {data: data} = await this.axios.post('https://shop-api.beeplay123.com/shop/api/mall/showLeaguePacksList/20190711')
          if (data.code == 200) {
            this.packageData = data.data.leaguePacksList || []
          }
        } catch (e) {

        }
      },
      gotopay(val) {
        GLOBALS.marchSetsPoint('A_H5PT0075001489', {product_id: val.bizId})
        val.needpaybackurl=`https://wap.beeplay123.com/activities/gameeggs.html`
        localStorage.setItem('JDD_PARAM', JSON.stringify(val))
        if (window.linkUrl.getBackUrlFlag(this.channel) == 'bdWap' && this.channel != '100001') {//好看、全民小视频
          location.href = 'https://wap.beeplay123.com/payment/#/bdPayment';
        } else {
          location.href = 'https://wap.beeplay123.com/payment/#/payment';
        }
      },
      async getBetProgress() {
        let {data: data} = await this.fetch('/ops/api/plant-food-v2/game-progress')
        if (data.code == 200) {
          this.hbItems = data.data
        }
      }
    },
    components: {
      awardsPop
    },
    watch: {
      'countdown.time': function (val) {
        if (!val) {
          this.isclose = true;
          this.type = 4;
        }
      }
    }
  }

</script>
<style lang="less" scoped>
  @import '../../common/css/base.css';
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
      font-size: .24rem;
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
      font-size: .24rem;
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
      content: '';
      position: absolute;
      top: .2rem;
      left: 0;
      right: 0;
      margin: auto;
      width: 5.14rem;
      height: .45rem;
      background: url("./images/titlebg.png");
      background-size: 100% 100%;
    }
    .closeegg {
      position: absolute;
      right: 0;
      width: .5rem;
      height: .5rem;
      background: url("./images/closebg.png");
      background-size: 100% 100%;
      z-index: 1;
    }
    .rule {
      position: absolute;
      top: .83rem;
      width: .74rem;
      height: .54rem;
      line-height: .54rem;
      text-align: center;
      background: url("./images/rule.png");
      background-size: 100% 100%;
      z-index: 1;
    }
    .act_detail {
      position: absolute;
      right: 0;
      top: .83rem;
      width: 1.34rem;
      height: .54rem;
      line-height: .54rem;
      text-align: center;
      background: url("./images/detail_btn.png");
      background-size: 100% 100%;
      z-index: 1;
    }
    .container {
      position: absolute;
      width: 6.3rem;
      top: .72rem;
      bottom: .29rem;
      left: 0;
      right: 0;
      margin: auto;
      .time {
        color: #216b0d;
        margin-bottom: .4rem;
        padding-left: 1.6rem;
      }
      .eggs {
        height: .97rem;
        /*padding: 0 1.34rem 0 .74rem;*/
        margin-bottom: .15rem;
        display: flex;
        justify-content: center;
        .eggs_continer{
          float: left;
          display: flex;
          .item {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            &:nth-child(1) {
              padding-top: .06rem;
              padding-bottom: .14rem;
              box-sizing: border-box;
              margin-right: .02rem;
              .num {
                font-size: .6rem;
                color: rgba(197, 84, 0, 1);
              }
              .txt {
                font-weight: 400;
                color: rgba(197, 83, 0, 1);
              }
            }
            &:nth-child(2) {
              padding-top: .13rem;
              box-sizing: border-box;
              margin-right: .09rem;
              .num {
                font-size: .18rem;
                font-weight: 400;
                color: rgba(220, 141, 0, 1);
              }
              .arrow {
                width: 2.02rem;
                height: .17rem;
                border-bottom: .04rem solid #dc8d00;
                box-sizing: border-box;
                position: relative;
                &:after {
                  content: '';
                  position: absolute;
                  right: 0.05rem;
                  bottom: -.03rem;
                  height: .13rem;
                  width: .04rem;
                  background: #dc8d00;
                  border-radius: .02rem;
                  transform: rotate(-45deg);
                }
              }
              .btn {
                margin-top: .1rem;
                width: .98rem;
                height: .4rem;
                line-height: .4rem;
                text-align: center;
                background: rgba(223, 85, 7, 1);
                border-radius: .2rem;
              }
            }
            &:nth-child(3) {
              width: .97rem;
              height: .91rem;
            }
          }
        }
      }
      .games {
        clear: both;
        margin-bottom: .15rem;
        .text {
          font-size: .2rem;
          font-weight: 400;
          color: rgba(192, 112, 2, 1);
          line-height: .3rem;
          .dot {
            display: inline-block;
            width: .12rem;
            height: .12rem;
            background: rgba(226, 129, 42, 1);
            border-radius: 50%;
          }
          i {
            font-size: .24rem;
            font-weight: bolder;
            color: rgba(192, 112, 2, 1);
          }
        }
        .games_container {
          margin-top: .1rem;
          height: 2.76rem;
          background: rgba(255, 250, 241, 1);
          box-shadow: 0 .05rem .09rem 0 rgba(79, 33, 26, 0.13);
          border-radius: .15rem;
          position: relative;
          .content {
            .hb-task-box {
              padding: 0 0.07rem;
              ul {
                display: flex;
              }
              .percent-box {
                width: 5.86rem;
                height: 0.15rem;
                background: rgba(172, 222, 246, 1);
                border-radius: 0.08rem;
                position: absolute;
                left: 0.3rem;
                top: 1.01rem;
                border-radius: 0.08rem;
                .percent-number {
                  /*width: 40%;*/
                  height: 0.15rem;
                  position: absolute;
                  left: 0;
                  top: 0;
                  background: rgba(220, 141, 0, 1);
                  border-radius: 0.08rem;
                  &:after {
                    content: '';
                    width: 0.23rem;
                    height: 0.23rem;
                    background: url(./images/percent-dot.png) no-repeat;
                    background-size: 100% 100%;
                    position: absolute;
                    right: -0.1rem;
                    top: -0.04rem;
                  }
                ;
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
                  white-space: nowrap
                }
                &:last-child h4 {
                  max-width: 1.2rem;
                }
              ;
                .hb-line {
                  width: .33rem;
                  height: .37rem;
                  background: url("./images/envelopes.png");
                  background-size: 100% 100%;
                  z-index: 1;
                }
                &.hb-dot-box {
                  flex: 0 0 .6rem;
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
                  line-height: .3rem;
                  margin: 0.04rem auto 0;
                  font-size: 0.2rem;
                  color: #81942D;
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
                    background: url(./images/gotoplay.png) no-repeat;
                    background-size: 100% 100%;
                    color: rgba(255, 255, 255, 1);
                  }
                  &.btn-complete {
                    font-size: 0.24rem;
                    color: #EA8C12;
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
            height: .52rem;
            background: rgba(254, 192, 65, 1);
            border-radius: 0 0 .15rem .15rem;;
            display: flex;
            padding: .09rem 0;
            box-sizing: border-box;
            div {
              flex: 1;
              text-align: center;
              line-height: .34rem;
              &:nth-child(1) {
                border-right: 1px solid rgba(178, 112, 20, 1);
              }
            }
          }
        }
      }
      .packages {
        .text {
          font-size: .2rem;
          font-weight: 400;
          color: rgba(192, 112, 2, 1);
          line-height: .3rem;
          .dot {
            display: inline-block;
            width: .12rem;
            height: .12rem;
            background: rgba(226, 129, 42, 1);
            border-radius: 50%;
          }
          i {
            font-size: .24rem;
            font-weight: bolder;
            color: rgba(192, 112, 2, 1);
          }
        }
        .games_container {
          margin-top: .1rem;
          height: 3.46rem;
          background: rgba(255, 250, 241, 1);
          box-shadow: 0 .05rem .09rem 0 rgba(79, 33, 26, 0.13);
          border-radius: .15rem;
          position: relative;
          .content {
            position: absolute;
            top: .21rem;
            bottom: .77rem;
            left: .3rem;
            right: .3rem;
            background: #fff;
            display: flex;
            justify-content: space-between;
            .item {
              width: 1.8rem;
              height: 2.48rem;
              background: rgba(255, 212, 136, 1);
              border-radius: .1rem;
              padding: .14rem 0 .17rem;
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
                font-size: .2rem;
                font-weight: 400;
                color: rgba(154, 86, 25, 1);
                line-height: .3rem;
              }
              .btn {
                width: .96rem;
                height: .39rem;
                line-height: .39rem;
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
            height: .52rem;
            background: rgba(254, 192, 65, 1);
            border-radius: 0 0 .15rem .15rem;;
            display: flex;
            padding: .09rem 0;
            box-sizing: border-box;
            div {
              flex: 1;
              text-align: center;
              line-height: .34rem;
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
