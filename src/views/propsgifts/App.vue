<template>
  <section class="coinact" v-if="actInfo">
    <div class="coinact_bg">
      <div class="coin-click" style="height:2.34rem">
        <img src="./images/back.png" alt="" class="back" @click="back">
        <img src="./images/rule.png" alt="" class="rule" @click="showPop(1)">
        <div class="time">距离活动结束:
          <div class="countdown_item" v-for="item in countTime.split('')">
            <i v-if="!['天','时','分','秒'].includes(item)">{{item}}</i>
            <template v-else>{{item}}</template>
          </div>
        </div>
      </div>
      <div class="lottery_container">
        <div class="chances">
          <div class="chances_txt">当前抽奖机会：</div>
          <div class="chances_btn">
            {{actInfo.userInfo.wheelTime}}
            <div class="plus" @click="gotomall">+</div>
          </div>
        </div>
        <div class="record" @click="showPop(5)">抽奖记录 ></div>
        <div class="lottery">
          <div class="wrapper">
            <img class="bg" src="./images/lottory.png" alt/>
            <ul class="awards" ref="awards">
              <li v-for="(item, index) in actInfo.wheelList" :key="index" :style="domSort(index)">
                <div class="award-name">
                  <p>{{item.awardsName}}</p>
                </div>
                <div class="award-img">
                  <img :src="`${require(`./images/awards/${item.awardsType}.png`)}`" alt/>
                </div>
              </li>
            </ul>
            <div class="awards-btn run" @click="runLottery"></div>
          </div>
        </div>
      </div>
      <div class="exchange_container">
        <div class="exchange_info">
          <div class="item">
            当前幸运碎片：
            <div class="info_bg">{{actInfo.userInfo.luckySpNum}}</div>
          </div>
          <div class="item" @click="showPop(6)">兑换记录 ></div>
        </div>
        <div class="exchange_list">
          <div class="item" v-for="item in actInfo.exchangeList">
            <div class="item_bg" :class="{showcorner:item.onceLimit}">
              <div class="awards_name">{{item.awardsName}}</div>
              <img :src="`${require(`./images/awards/${item.awardsType}.png`)}`" alt="">
              <div class="exchange_num">{{item.consume}}碎片</div>
            </div>
            <div class="item_btn" :class="{gray:!item.usable}" @click="exchagePrize(item)"></div>
          </div>
        </div>
      </div>
    </div>
    <com-pop :popType="popType" ref="comPop" :actInfo="actInfo" :awardData="awardData" @close="closePop"></com-pop>
    <loading v-show="showLoading" :showBar="false"></loading>
  </section>
</template>

<script>
  import {getActInfo, drawPrize, exchagePrize} from './utils/api'

  export default {
    name: 'coinact',
    components: {
      comPop: () => import('./components/comPop'),
      loading: () => import('../../components/common/loading')
    },
    data() {
      return {
        popType: 0,
        actInfo: null,
        awardData: null,
        countTime: '',
        showLoading: false
      }
    },
    async mounted() {
      await this.getActInfo()
      GLOBALS.marchSetsPoint('P_H5PT0315', {
        source_address: GLOBALS.getUrlParam('from') || ''
      })
    },
    methods: {
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
      gotomall() {
        GLOBALS.marchSetsPoint('A_H5PT0315003927')
        location.href = 'https://wap.beeplaying.com/xmWap/#/payment'
      },
      /** 计算转盘奖品角度 **/
      domSort(index) {
        let mean = Math.floor(360 / this.actInfo.wheelList.length)
        return `transform: rotate(${Math.floor(mean * (index))}deg)`
      },
      back() {
        GLOBALS.marchSetsPoint('A_H5PT0315003922')
        location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL')) + '&time=' + new Date().getTime()
      },
      async getActInfo() {
        let {code, data} = await getActInfo()
        if (code == 200) {
          this.actInfo = data
          this.countDown(data.countdown)
          // 新增的抽奖次数
          if (this.actInfo.incrWheelTime) {
            setTimeout(() => {
              this.awardData = {
                awardsNum: this.actInfo.incrWheelTime
              }
              this.showPop(2)
            }, 1000)
          }
        }
      },
      gotopay(item) {
        localStorage.setItem('originDeffer', window.location.href)
        GLOBALS.marchSetsPoint('A_H5PT0277003315', {
          recharge_rmb: item.price,
          product_id: item.bizId,
          awards_name: item.name,
          product_name: item.name
        })   // H5平台-超级大赢家活动-礼包点击
        localStorage.setItem('JDD_PARAM', JSON.stringify(item))
        localStorage.setItem('payment', JSON.stringify(item))
        location.href =
          'https://wap.beeplaying.com/xmWap/#/payment/paymentlist?isBack=true'
      },
      //弹窗
      showPop(type) {
        this.popType = type
        let points = ['A_H5PT0315003923', 'A_H5PT0315003928', 'A_H5PT0315003929', '', 'A_H5PT0315003925', 'A_H5PT0315003926']
        points[type - 1] && GLOBALS.marchSetsPoint(points[type - 1])
        setTimeout(() => {
          if (this.awardData&&this.awardData.awardsName) {
            GLOBALS.marchSetsPoint(this.awardData.source == 'exhange' ? 'A_H5PT0315003931' : 'A_H5PT0315003930', {
              awards_name: this.awardData.awardsName,
              awards_id: this.awardData.sort
            })
          }
          this.$refs.comPop.showPop()
        })
      },
      async gain(category, item) {
        if (category) {
          if (item.awardsState == 0) {
            location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL')) + '&time=' + new Date().getTime()

          } else if (item.awardsState == 1) {
            GLOBALS.marchSetsPoint('A_H5PT0310003854')
            let {code, data, message} = await receivePrize(category, item.sort)
            if (code == 200) {
              this.awardData = Object.assign(data, {
                awardsNum: item.awardsNum
              })
              this.showPop(3)
              this.getActInfo()
            } else {
              this.$toast.show.show({
                message,
                duration: 1000
              })
            }
          }
        } else {
          GLOBALS.marchSetsPoint('A_H5PT0310003854')
          let {code, data, message} = await receiveAll()
          if (code == 200) {
            this.awardData = data
            this.showPop(3)
            this.getActInfo()
          } else {
            this.$toast.show.show({
              message,
              duration: 1000
            })
          }
        }
      },
      closePop(data) {
        this.popType = 0
        if (data && data.bagPopup) {
          this.showPop(2)
        }
        this.awardData = null
      },
      /** 转盘转动 **/
      async runLottery() {
        GLOBALS.marchSetsPoint('A_H5PT0315003924')
        if (this.actInfo.userInfo.wheelTime) {
          this.showLoading = true
          let {code, data, message} = await drawPrize()
          if (code === 200) {
            this.awards = data
            let dom = this.$refs.awards
            let current =
              this.actInfo.wheelList &&
              this.actInfo.wheelList.find((item, index) => {
                return this.awards.sort === item.sort
              })
            /** 打开动画 **/
            this.turntableAnimation(dom, current.sort, () => {
              /** 通知父级打开奖励弹框 **/
              this.awardData = {
                sort: data.sort,
                awardsType: data.awardsType,
                awardsName: `${data.awardsName}${data.awardsRemark ? `<br><i style="font-size:.24rem;color:rgba(34,112,144,1);">${data.awardsRemark}</i>` : ''}`,
                info: '如抽中碎片，累计可以兑换道具哦~',
                source: 'draw'
              }
              this.showPop(4)
              this.showLoading = false
              this.getActInfo()
            })
          } else {
            this.$toast.show({
              message
            })
            this.showLoading = false
          }
        } else {
          this.awardData = {
            awardsNum: this.actInfo.conventRate
          }
          this.showPop(3)
        }
      },
      /** 转盘动画 **/
      turntableAnimation(dom, index, callback) {
        /** 动画没有执行完的时候 不可以再次点击**/
        if (this.animationLock) {
          return false
        }
        this.animationLock = true
        /** 当前转了几次了 **/
        this.newNumber = this.newNumber === undefined ? 0 : this.newNumber
        /** 动画默认圈数 **/
        this.animationRoate = 9 * 360
        /** 旋转次数+1 **/
        this.newNumber += 1
        /** 停止位置大于奖品个数，旋转角度=0 **/
        if (index >= dom.childNodes.length) {
          index = 0
        }
        /** 上次度数 **/
        let provDeg = this.newNumber * this.animationRoate
        /** 奖品所在位置角度 **/
        let awardDeg = (index - 1) * Math.ceil(360 / dom.childNodes.length)
        /** 最终旋转度数 = 上次度数  + 奖品所在位置角度  **/
        dom.style.transition = 'all 3.2s ease-in-out'
        dom.style.transform = `rotate(-${provDeg + awardDeg}deg)`
        /** 动画运行完成解锁并且运行回调 **/
        setTimeout(() => {
          this.animationLock = false
          if (callback) {
            callback && callback.call(this)
          }
        }, 3200)
      },
      async exchagePrize(item) {
        if (item.usable) {
          if (item.consume > this.actInfo.userInfo.luckySpNum) {
            this.$toast.show({
              message: '当前碎片不足'
            })
          } else {
            this.showLoading = true
            let {code, data, message} = await exchagePrize(item.sort)
            if (code == 200) {
              this.awardData = {
                sort: item.sort,
                awardsType: data.awardsType,
                awardsName: `${data.awardsName}${data.awardsRemark ? `<br><i style="font-size:.24rem;color:rgba(34,112,144,1);">${data.awardsRemark}</i>` : ''}`,
                info: ['hfq',' jdk','lucky-sp'].includes(data.awardsType)?'':'可前往游戏内查看',
                source: 'exhange'
              }
              this.showPop(4)
              this.showLoading = false
              this.getActInfo()
            } else {
              this.$toast.show({
                message
              })
              this.showLoading = false
            }
          }
        }
      }
    },
    watch: {
      countTime(val) {
        if (!val) {
          this.getActInfo()
        }
      }
    }
  }
</script>
<style lang="less">
  @import "../../common/css/base.css";

  .coinact {
    min-height: 100vh;
    position: relative;
    background: #07315C;
    .coinact_bg {
      height: 16.91rem;
      background: url("./images/bg.png");
      background-size: 100% 100%;
      position: relative;
      left: 0;
      right: 0;
      margin: auto;
    }
    .time {
      width: 5.18rem;
      height: 1.89rem;
      padding-top: 1.46rem;
      box-sizing: border-box;
      background: url("./images/time.png");
      background-size: 100% 100%;
      position: absolute;
      top: .28rem;
      left: 0;
      right: 0;
      margin: auto;
      color: rgba(255, 255, 255, 1);
      text-align: center;
      font-size: .24rem;
      font-weight: 800;
      //z-index: 1;
      display: flex;
      justify-content: center;
      .countdown_item {
        margin-left: 0.05rem;
        i {
          color: #FFE921;
        }
      }
    }
    .back, .rule {
      position: absolute;
      top: .3rem;
      width: .75rem;
      height: .42rem;
      //z-index: 2;
      &.back {
        left: .1rem;
      }
      &.rule {
        right: .1rem;
      }
    }
    .lottery_container {
      position: relative;
      //z-index: 1;
      .chances {
        position: absolute;
        left: .3rem;
        display: flex;
        align-items: center;
        font-size: .24rem;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        box-sizing: border-box;
        //z-index: 1;
        .chances_btn {
          position: relative;
          min-width: 1.32rem;
          height: .42rem;
          background: rgba(255, 232, 35, 1);
          box-shadow: 0 .01rem .18rem 0 rgba(152, 46, 0, 1);
          border-radius: .21rem;
          padding: 0 .3rem 0 .2rem;
          box-sizing: border-box;
          font-size: .25rem;
          font-weight: 800;
          color: rgba(141, 62, 49, 1);
          line-height: .45rem;
          .plus {
            position: absolute;
            top: -.04rem;
            right: -.25rem;
            width: .5rem;
            height: .5rem;
            background: rgba(255, 232, 35, 1);
            box-shadow: 0 .01rem .13rem 0px rgba(187, 2, 27, 0.79), 0 .01rem .15rem 0 rgba(247, 91, 20, 1);
            border-radius: 50%;
            font-size: .5rem;
            color: rgba(141, 62, 49, 1);
            font-weight: bold;
            line-height: .5rem;
            text-align: center;
            z-index: 1;
          }
        }
      }
      .record {
        position: absolute;
        top: .13rem;
        right: .3rem;
        font-size: .24rem;
        font-weight: bold;
        color: rgba(255, 240, 107, 1);
        z-index: 1;
      }
      .lottery {
        .wrapper {
          position: relative;
          width: 7.2rem;
          height: 7.06rem;
          .bg {
            vertical-align: top;
            width: 100%;
            height: 100%;
          }
          .awards {
            position: absolute;
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
            width: 4.73rem;
            height: 4.73rem;
            background: url('./images/split_bg.png') no-repeat top center;
            background-size: 100% 100%;
            li {
              position: absolute;
              left: 0;
              top: 0;
              bottom: 0;
              right: 0;
              padding-top: .2rem;
              .award-name {
                text-align: center;
                font-size: .24rem;
                color: #734200;
                height: .5rem;
                p {
                  height: 100%;
                  padding: 0 1.6rem;
                  line-height: 1.1;
                }
              }
              .award-img {
                margin: 0 auto;
                width: .8rem;
                img {
                  vertical-align: top;
                  width: 100%;
                  transform: rotate(270deg);
                }
              }
            }
          }
          .awards-btn {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
            width: 2.55rem;
            height: 2.82rem;
            &.run {
              background: url('./images/start.png') no-repeat top center;
              background-size: 100% 100%;
              animation: btnScale 2s infinite;
            }
          }
        }
      }
    }
    .exchange_container {
      position: relative;
      //z-index: 1;
      padding: .57rem 0 .13rem;
      box-sizing: border-box;
      .exchange_info {
        padding: 0 .3rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: .1rem;
        .item {
          font-size: .24rem;
          font-weight: bold;
          &:nth-child(1) {
            display: flex;
            align-items: center;
            color: rgba(255, 255, 255, 1);
            .info_bg {
              min-width: 1.3rem;
              height: .42rem;
              padding: 0 .1rem;
              box-sizing: border-box;
              line-height: .45rem;
              text-align: center;
              background: rgba(255, 232, 35, 1);
              box-shadow: 0 .01rem .18rem 0 rgba(152, 46, 0, 1);
              border-radius: .21rem;
              font-size: .28rem;
              font-weight: 800;
              color: rgba(141, 62, 49, 1);
            }
          }
          &:nth-child(2) {
            color: rgba(255, 240, 107, 1);
          }
        }
      }
      .exchange_list {
        display: flex;
        flex-wrap: wrap;
        .item {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: .15rem;
          .item_bg {
            width: 1.6rem;
            height: 2rem;
            background: url("./images/item_bg.png");
            background-size: 100% 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            .awards_name {
              height: .7rem;
              position: absolute;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: .2rem;
              font-weight: 500;
              color: rgba(75, 185, 220, 1);
              text-align: center;
              width: 90%;
            }
            img {
              height: 1.34rem;
              margin-top: .34rem;
            }
            .exchange_num {
              font-size: .24rem;
              font-weight: bold;
              color: rgba(6, 64, 93, 1);
            }
            &.showcorner {
              &:before {
                content: '';
                position: absolute;
                left: .85rem;
                top: -.13rem;
                width: .81rem;
                height: .38rem;
                background: url("./images/onetime.png");
                background-size: 100% 100%;
              }
            }
          }
          .item_btn {
            margin-top: .07rem;
            width: 1.8rem;
            height: .91rem;
            background: url("./images/btn0.png");
            background-size: 100% 100%;
            &.gray {
              background: url("./images/btn1.png");
              background-size: 100% 100%;
            }
          }
        }
      }
    }
  }
</style>
