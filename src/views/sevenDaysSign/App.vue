<template>
  <main class="b-to-c-wrapper" v-if="actInfo">
    <div class="b-to-c">
      <article class="btn-wrapper">
        <div class="back" @click="back">返回</div>
        <div class="activity-title">
          连续打卡<i>7天</i> 即可得VIP大礼包
        </div>
        <div class="myprize" @click="openPop(2)">我的奖品</div>
      </article>
      <article class="top-activity">
        <div class="rule" @click="openPop(1)">活动规则</div>
        <ul class="sign-list">
          <li v-for="(item,index) in signList" :key="index" :class="{signed:item.status==1}">
            <div class="icon">
              <div class="img-bg" :class="{lack:item.status==2,signed:item.status==1}"
                   @click="showTips(item.status==2)">{{item.status==2?'缺卡':''}}
              </div>
              <div class="progress-bar"
                   :class="{first:index==0,last:index==signList.length-1,signed:item.status>=1}"></div>
            </div>
            <p class="sign-text">
              第{{item.day}}天
            </p>
          </li>
        </ul>
        <template v-if="!actInfo.toDayIsClockIn||actInfo.toDayIsDraw">
          <div class="sign-btn" @click="sign" v-if="!actInfo.toDayIsClockIn">
            立即打卡 参与抽奖
          </div>
          <div class="sign-btn" @click="openPop(4)" v-else>
            立即抽奖
          </div>
        </template>
        <div class="sign-btn gray" v-else>
          已打卡
        </div>
      </article>
      <article class="bottom-activity">
        <p class="desc">购买以下任意充值包，即可获得抽奖机会，也可补卡：</p>
        <section class="gift-wrapper">
          <ul class="gift-list">
            <li class="gift-item" v-for="(item,index) in giftList" :key="index">
              <div class="gift-icon">
                <img :src="`${require(`./img/package${index>5?5:index}.png`)}`" alt=""
                     :style="packageImgs[index>5?5:index]">
              </div>
              <div class="gift-info">
                <div class="amount"><img src="./img/leaf-icon.png" alt="">{{item.name.replace('金叶子','')}}</div>
                <div class="origin-price">原价：<i>{{item.originPrice}}</i></div>
                <div class="pay-btn" @click.stop="buyGift(item)" v-if="!item.drawCount">￥{{item.price}}</div>
                <div class="pay-btn" @click.stop="openPop(5,item)" v-else>立即抽奖</div>
              </div>
            </li>
          </ul>
        </section>
      </article>
    </div>
    <pop-up v-model="showPrizeModal" @on-close="showPrizeModal=false" title="恭喜获得" :isHasDecoration="true">
      <div class="modal-container flag3">
        <div class="prizes">
          <div class="item">
            <img :src="awardData&&awardData.awardImg|filter" alt="">
            <div class="awards_name">{{awardData&&awardData.awardName}}</div>
          </div>
        </div>
      </div>
      <div class="btn" slot="footer" style="width: 2.5rem;margin: auto"
           @click="showPrizeModal=false">
        朕收下了
      </div>
    </pop-up>
    <modal v-model="showModal" @on-close="modalClose" :title="title" :isHasDecoration="popType>2"
           :button-show="popType>2">
      <div :class="getClassName('modal-container')">
        <template v-if="popType==1">
          <p>活动时间：{{actInfo.startDate}} 至 {{actInfo.endDate}}</p>
          <p>1.在活动页面每日点击打卡按钮，可打卡成功，并获得1次转盘抽奖机会； </p>
          <p>2.在活动页面连续打卡满7天，则可获得1个超值VIP大礼包；</p>
          <p>3.若7天内，有忘记打卡到账缺卡的，可点击购买页面下方是礼包，进行补卡；购买1次礼包可补卡1次，并获得1次转盘抽奖机会；</p>
          <p>多多玩游戏平台对本活动具有最终解释 权。</p>
        </template>
        <!--我的奖励-->
        <template v-else-if="popType==2">
          <div class="bonus-record">
            <template>
              <div class="title_items">
                <div class="title">奖品名称</div>
                <div class="title">获奖时间</div>
              </div>
              <div class="bonus-content">
                <scroll :data="record">
                  <ul>
                    <li v-for="item in record">
                      <div>
                        {{item.awardsName}}
                      </div>
                      <div>{{item.date}}</div>
                    </li>
                  </ul>
                </scroll>
              </div>
            </template>
          </div>
        </template>
        <template v-else-if="popType==3||popType==6">
          <div class="prizes" :class="{gt1:awards.length>1,flag6:popType==6}">
            <div class="item" v-for="item in awards">
              <img :src="item.awardImg|filter" alt="">
              <div class="awards_name" v-if="popType==3">{{item.awardName}}</div>
            </div>
          </div>
        </template>
        <template v-else-if="[4,5].includes(popType)">
          <div class="turntable-wrapper">
            <img class="bg" src="./img/turntable-bg.png" alt/>
            <ul class="awards" ref="awards">
              <li v-for="(item, index) in wheelAwards" :key="index" :style="domSort(index)">
                <div class="award-img">
                  <img :src="item.awardImg|filter" alt="">
                </div>
                <div class="award-name">{{item.awardsName.replace(/话费券|金叶子|优惠券|京东卡/g,'')}}</div>
              </li>
            </ul>
            <div class="awards-btn run" @click="popDrawPrize">
            </div>
          </div>
        </template>
      </div>
      <div class="btn" slot="footer" v-if="[3,6].includes(popType)" style="width: 2.5rem;margin: auto"
           @click="modalClose">
        朕收下了
      </div>
      <div class="btn" slot="footer" v-if="[4,5].includes(popType)"
           @click="popDrawPrize">
        立即抽奖
      </div>
    </modal>
  </main>
</template>
<script>
  /* eslint-disable no-undef */
  import utils from '@/common/js/utils'
  import {
    moveInfo,
    signIn,
    moveInleto,
    getUserAwards,
    drawPrize,
    getWheelAwards
  } from './services/api'
  import _get from 'lodash.get'
  import popup from './component/popup'
  import modal from './component/modal/modal'
  import scroll from './component/scroll'
  import popUp from './component/popup'

  export default {
    name: '',
    components: {
      popup,
      modal,
      scroll,
      popUp
    },
    data () {
      return {
        beginTime: '',
        endTime: '',
        signNum: 0,
        todaySigned: false,
        signList: [],
        bizList: [],
        isShowPop: false,
        popType: 0,
        leafNum: 0,
        showModal: false,
        showPrizeModal: false,
        downLoadUrl: 'http://t.cn/A6ZJFebP',
        actInfo: null,
        giftList: [],
        packageImgs: [{
          width: '1.05rem',
          height: '1.25rem'
        }, {
          width: '1.05rem',
          height: '1.29rem'
        }, {
          width: '1.14rem',
          height: '1.26rem'
        }, {
          width: '1.41rem',
          height: '1.26rem'
        }, {
          width: '1.41rem',
          height: '1.26rem'
        }, {
          width: '1.41rem',
          height: '1.23rem'
        }],
        titles: ['活动规则', '我的奖品', '恭喜获得', '恭喜打卡成功', '赠送1次抽奖', `恭喜连续7日打卡成功<br>获得VIP大礼包`],
        record: [],
        wheelAwards: [],
        currentDay: 0,
        drawProductIds: [],
        awards: [],
        currentPackage: null,
        awardData: null
      }
    },
    async mounted () {
      await moveInleto()
      await this.getWheelAwards()
      this.init(true)
      GLOBALS.marchSetsPoint('P_H5PT0351', {source_address: this.sourceAddress})// H5平台-多多玩APP连续打卡活动-页面加载完成
    },
    computed: {
      sourceAddress () {
        return utils.getUrlParam('from')
      },
      title () {
        if (this.popType == 5) {
          return `赠送${this.drawProductIds.length}次抽奖`
        } else {
          return this.titles[this.popType - 1]
        }
      }
    },
    filters: {
      timeFilter (time) {
        return time.split(' ')[0]
      }
    },
    methods: {
      getClassName (name) {
        return `${name} flag${this.popType}`
      },
      modalClose () {
        this.showModal = false
        if (this.popType == 6 && this.drawProductIds.length) {
          console.log(this.popType,this.drawProductIds)
          this.openPop(5)
        }
      },
      back () {
        GLOBALS.marchSetsPoint('A_H5PT0351004476')   // 点击返回
        location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL')) + '&time=' + new Date().getTime()
      },
      async init (flag=false) {
        const res = await moveInfo()
        if (res.code == 200) {
          this.actInfo = res.data
          this.beginTime = _get(res, 'data.beginTime', '')
          this.endTime = _get(res, 'data.endTime', '')
          this.currentDay = this.actInfo.toDay
          this.todaySigned = res.data.toDayIsClockIn
          this.signList = res.data.clockInRspS
          this.giftList = res.data.giftBagRsps
          if (this.actInfo.state == 1&&flag) {
            res.data.giftBagRsps.filter(item => item.drawCount > 0).map(item => {
              for (let i = 0; i < item.drawCount; i++) {
                this.drawProductIds.push(item.productId)
              }
            })
            if (res.data.showRepairClockIn) {
              this.$toast.show({
                message: '补卡成功',
                duration: 1500
              })
            }
            this.awards = this.actInfo.extraAwards || []
            if (this.awards.length) {
              setTimeout(() => {
                this.openPop(6)
              }, res.data.showRepairClockIn ? 0 : 1500)
            } else {
              if (this.drawProductIds.length) {
                setTimeout(() => {
                  this.openPop(5)
                }, res.data.showRepairClockIn ? 0 : 1500)
              }
            }
          }
        }
      },
      async sign () {
        GLOBALS.marchSetsPoint('A_H5PT0351004471')// HH5平台-多多玩APP连续打卡活动-立即打卡按钮点击
        if (this.todaySigned) {
          this.$toast.show({
            message: '请勿重复签到',
            duration: 2000
          })
          return
        }
        const {code,data, message} = await signIn()
        if (code === 200) {
          this.awards = data|| []
          if (this.awards.length) {
            this.drawProductIds = []
            this.openPop(6)
          } else {
            this.openPop(4)
          }
          this.init(false)
        } else {
          this.$toast.show({
            message: message,
            duration: 2000
          })
        }
      },
      buyGift (item) {
        GLOBALS.marchSetsPoint('A_H5PT0351004473', {
          product_id: item.productId,
          product_name: item.name,
          product_price: item.price
        })// H5平台-多多玩APP连续打卡活动-补卡按钮点击
        localStorage.setItem('payment', JSON.stringify(item))
        localStorage.setItem('originDeffer', location.href)
        location.href = 'https://wap.beeplaying.com/xmWap/#/payment/paymentlist?isBack=true'
      },
      async getWheelAwards () {
        let {code, data} = await getWheelAwards()
        if (code == 200) {
          this.wheelAwards = data
        }
      },
      async openPop (type, item) {
        // titles: ['活动规则', '我的奖品', '恭喜获得', '恭喜打卡成功', '赠送1次抽奖', `恭喜连续7日打卡成功<br>获得VIP大礼包`],
        let points = ['A_H5PT0351004475', 'A_H5PT0351004474', '', 'A_H5PT0351004477', 'A_H5PT0351004481', 'A_H5PT0351004480']
        points[type - 1] && GLOBALS.marchSetsPoint(points[type - 1])
        if (type == 2) {
          let {code, data} = await getUserAwards()
          if (code == 200) {
            this.record = data
            this.popType = type
            this.showModal = true
          }
        } else {
          if (type == 5) {
            if (item) {
              this.drawProductIds = []
              for (let i = 0; i < item.drawCount; i++) {
                this.drawProductIds.push(item.productId)
              }
            }
          }
          this.popType = type
          this.showModal = true
        }
      },
      closeCallback () {
        this.init(false)
      },
      // 抽奖
      async drawPrize (sourceType, sourceId) {
        let {code, data, message} = await drawPrize(sourceType, sourceId)
        if (code == 200) {
          this.awardData = data
          let dom = this.$refs.awards
          let current =
            this.wheelAwards &&
            this.wheelAwards.find((item, index) => {
              return this.awardData.sort === item.sort
            })
          /** 打开动画 **/
          this.turntableAnimation(dom, current.sort, () => {
            this.popType == 5 && (this.drawProductIds = this.drawProductIds.splice(1))
            if (this.popType == 4 || this.drawProductIds.length == 0) {
              this.showModal = false
              this.init()
            }
            this.showPrizeModal = true
            GLOBALS.marchSetsPoint('A_H5PT0351004479')
          })
        } else {
          this.$toast.show({
            message
          })
          this.init(false)
        }
      },
      showTips (isShowBK) {
        if (isShowBK) {
          GLOBALS.marchSetsPoint('A_H5PT0351004472')// H5平台-多多玩APP连续打卡活动-补卡按钮点击
          this.$toast.show({
            message: '购买礼包进行补卡，每购买1次礼包，可补卡一次'
          })
        }
      },
      // 弹窗立即抽奖
      popDrawPrize () {
        GLOBALS.marchSetsPoint(this.popType == 4 ? 'A_H5PT0351004478' : 'A_H5PT0351004482')
        this.drawPrize(this.popType == 4 ? 1 : 2, this.popType == 4 ? this.currentDay : this.drawProductIds[0], true)
      },
      /** 计算转盘奖品角度 **/
      domSort (index) {
        let mean = Math.floor(360 / this.wheelAwards.length)
        return `transform: rotate(${Math.floor(mean * index)}deg)`
      },
      /** 转盘动画 **/
      turntableAnimation (dom, index, callback) {
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
        let awardDeg = (index-1) * Math.ceil(360 / dom.childNodes.length)
        /** 最终旋转度数 = 上次度数  + 奖品所在位置角度 + 随机度数  **/
        dom.style.transition = 'all 3.2s ease-in-out'
        dom.style.transform = `translate(-50%, 0) rotate(-${provDeg +
        awardDeg}deg)`
        /** 动画运行完成解锁并且运行回调 **/
        setTimeout(() => {
          this.animationLock = false
          if (callback) {
            callback && callback.call(this)
          }
        }, 3200)
      }
    }
  }
</script>

<style lang="less" scoped>
  p,
  section,
  div,
  ul {
    border: none;
    padding: 0;
    margin: 0;
  }

  li {
    list-style: none;
  }

  .bg-top(@url) {
    background-position: center top;
    background-repeat: no-repeat;
    background-size: 100% auto;
    background-image: url(@url);
  }

  .bg-center(@url) {
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url(@url);
  }

  .b-to-c-wrapper {
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
    text-align: center;
    -webkit-overflow-scrolling: touch;
    height: 100vh;
    background: #F7F7F7;
  }

  .b-to-c {
    background-color: #3e1648;
    box-sizing: border-box;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
    font-family: Alibaba PuHuiTi;
    position: relative;

    background: #F7F7F7;
    font-size: 0.24rem;
    font-weight: 400;
    .btn-wrapper {
      font-size: 0.3rem;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      position: absolute;
      left: 0;
      right: 0;
      top: 0.24rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: .24rem;
      font-weight: 500;
      color: #FFFFFF;
      text-align: center;
      line-height: .42rem;
      .back {
        width: .79rem;
        height: .42rem;
        background: #FF4141;
        border-radius: 0 .22rem .22rem 0;
      }
      .myprize {
        width: 1.1rem;
        height: .42rem;
        background: #FF4141;
        border-radius: .22rem 0 0 .22rem;
      }
      .activity-title {
        font-size: .3rem;
        font-weight: bold;
        color: #000000;
        i {
          font-style: normal;
          color: #FF4141;
        }
      }
    }
    .sign-btn {
      width: 3.92rem;
      height: 1.16rem;
      color: #c5250f;
      font-size: 0.32rem;
      text-align: center;
      line-height: 0.84rem;
      font-weight: bold;
    }
    .top-activity {
      width: 6.72rem;
      height: 3rem;
      margin: .75rem auto 0;
      overflow: hidden;
      background: #FFFFFF;
      border-radius: .16rem;
      .rule {
        height: .83rem;
        line-height: .83rem;
        font-size: .24rem;
        font-weight: bold;
        color: #FF7800;
        text-align: center;
      }
      .sign-list {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 6.16rem;
        margin: auto;
        li {
          position: relative;
          width: .88rem;
          .icon {
            margin: auto;
            width: 0.88rem;
            height: 0.68rem;
            font-size: .2rem;
            font-weight: bold;
            color: #FF7800;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            .img-bg {
              width: 0.68rem;
              height: 0.68rem;
              position: absolute;
              top: 0;
              bottom: 0;
              left: 0;
              right: 0;
              margin: auto;
              .bg-center("./img/sign_icon0.png");
              z-index: 1;
              &.signed {
                .bg-center("./img/sign_icon1.png");
              }
              &.lack {
                .bg-center("./img/sign_icon2.png");
                display: flex;
                align-items: center;
                justify-content: center;
              }
            }
            .progress-bar {
              width: 100%;
              height: .06rem;
              background: #FFF2D0;
              position: absolute;
              &.signed {
                background: #FFBC00;
              }
              &.first {
                width: .78rem;
                left: .1rem;
              }
              &.last {
                width: .78rem;
                right: .1rem;
              }
            }
          }
          .sign-text {
            margin-top: 0.13rem;
            width: 0.9rem;
            text-align: center;
            font-size: 0.24rem;
            color: #000000;
            font-weight: 400;
          }
        }
      }
      .sign-btn {
        margin: 0.24rem auto 0;
        width: 3.2rem;
        height: .56rem;
        background: #FF4141;
        font-size: .24rem;
        font-weight: 500;
        color: #FFFFFF;
        border-radius: .16rem;
        text-align: center;
        line-height: .56rem;
        &.gray {
          background: #BBBBBB;
        }
      }
    }
    .bottom-activity {
      width: 6.72rem;
      margin: 0.5rem auto;
      overflow: hidden;
      .desc {
        color: #c7a3c2;
        font-size: .28rem;
        font-weight: bold;
        color: #000000;
        margin-bottom: .4rem;
      }
      .gift-wrapper {
        .move-num {
          margin-top: 0.22rem;
          font-size: 0.3rem;
          color: #fff;
          font-weight: bold;
          span {
            color: #ffdc71;
          }
        }
        .gift-list {
          margin-top: 0.48rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          li {
            width: 3.3rem;
            height: 1.72rem;
            border-radius: .16rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-left: .17rem;
            box-sizing: border-box;
            background: #FFFFFF;
            margin-bottom: .12rem;
            .gift-icon {
              width: 1.41rem;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .gift-info {
              width: 1.5rem;
              .amount {
                padding-left: .05rem;
                box-sizing: border-box;
                text-align: left;
                display: flex;
                align-items: center;
                img {
                  width: .24rem;
                  height: .24rem;
                  margin-right: .03rem;
                }
                font-size: .28rem;
                font-weight: bold;
                color: #252525;
              }
              .origin-price {
                padding-left: .05rem;
                box-sizing: border-box;
                font-size: .2rem;
                font-weight: 500;
                color: #000000;
                text-align: left;
                margin: .04rem auto .12rem;
                i {
                  color: #FF7800;
                  font-style: normal;
                }
              }
              .pay-btn {
                width: 1.1rem;
                height: .42rem;
                background: #FF4141;
                border-radius: .1rem;
                text-align: center;
                line-height: .42rem;
                font-size: .24rem;
                font-weight: 500;
                color: #FFFFFF;
              }
            }
          }
        }
      }
    }
  }

  .modal-container {
    padding: 0.37rem 0 0.33rem;
    font-size: 0.24rem;
    &.flag1 {
      font-size: .24rem;
      font-weight: 400;
      line-height: .42rem;
      color: #000000;
      p {
        text-align: left;
      }
    }
    &.flag2 {
      padding: 0.37rem .1rem 0.33rem;
      .bonus-record {
        height: 4.05rem;
        position: relative;
        margin: auto;
        font-size: .28rem;
        font-weight: 400;
        .title_items {
          display: flex;
          height: .55rem;
          width: 100%;
          padding: .09rem 0;
          box-sizing: border-box;
          .title {
            flex: 1;
            font-size: .3rem;
            text-align: ce nter;
            height: .55rem;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #000;
            font-weight: bold;
            height: .37rem;
          }
        }
        .bonus-content {
          position: absolute;
          height: 3.5rem;
          top: .55rem;
          left: 0rem;
          right: 0;
          color: #888888;
          overflow: hidden;
          font-size: .24rem;
          ul {
            display: flex;
            flex-direction: column;
            li {
              display: flex;
              justify-content: space-between;
              height: .8rem;
              align-items: center;
              div {
                flex: 1;
                text-align: center;
                display: flex;
                align-items: center;
                justify-content: center;
              }
            }
          }
        }
        &.empty {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          margin: auto;
          display: flex;
          justify-content: center;
          /*&:before {*/
          /*content: '';*/
          /*position: absolute;*/
          /*top: 1rem;*/
          /*left: 0;*/
          /*right: 0;*/
          /*margin: auto;*/
          /*width: 1.27rem;*/
          /*height: 1.27rem;*/
          /*background: url("../images/compop/empty.png");*/
          /*background-size: 100% 100%;*/
          /*}*/
          /*&:after {*/
          /*content: '没有记录';*/
          /*position: absolute;*/
          /*top: 2.5rem;*/
          /*left: 0;*/
          /*right: 0;*/
          /*margin: auto;*/
          /*font-size: .3rem;*/
          /*font-weight: 400;*/
          /*color: #983D00;*/
          /*align-self: flex-end;*/
          /*text-align: center;*/
          /*}*/
        }
      }
    }
    &.flag3, &.flag6 {
      .prizes {
        &.flag6 {
          margin-top: .2rem;
        }
        .item {
          img {
            width: 2.56rem;
            height: 1.6rem;
          }
          .awards_name {
            font-size: .24rem;
            font-weight: 400;
            color: #FF4141;
          }
        }
        &.gt1 {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          img {
            width: 1.96rem;
            height: 1.23rem;
          }
        }
      }
    }
    &.flag4, &.flag5 {
      .turntable-wrapper {
        position: relative;
        width: 413*0.01rem;
        height: 413*0.01rem;
        .bg {
          width: 100%;
          height: 100%;
        }
        .awards {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          margin: auto;
          transform: translate(-50%, 0) rotate(0);
          width: 350*0.01rem;
          height: 350*0.01rem;
          background: url('./img/turntable_split_bg.png') no-repeat top center;
          background-size: 100% 100%;
          li {
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            right: 0;
            padding-top: 10*0.01rem;
            .award-name {
              padding-bottom: 5*0.01rem;
              text-align: center;
              font-size: 20*0.01rem;
              color: #000000;
              font-weight: 400;
            }
            .award-img {
              margin: 0 auto;
              width: 84*0.01rem;
              height: .53rem;
              img {
                vertical-align: top;
                width: 100%;
                height: 100%;
              }
            }
          }
        }
        .awards-btn {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          margin: auto;
          transform: translate(-50%, 0);
          width: 122*0.01rem;
          height: 142*0.01rem;
          &.run {
            background: url('./img/turntable_enabled.png') no-repeat top center;
            background-size: 100% 100%;
            span {
              position: absolute;
              bottom: 55*0.01rem;
              left: 0;
              right: 0;
              text-align: center;
              font-size: 22*0.01rem;
              color: #fff;
              -webkit-text-stroke: 2*0.01rem #854528;
              font-weight: bold;
            }
          }
          /*&.disabled {*/
          /*background: url('./img/turntable/disabled.png') no-repeat top center;*/
          /*background-size: 100% 100%;*/
          /*span {*/
          /*position: absolute;*/
          /*bottom: 65*0.01rem;*/
          /*left: 0;*/
          /*right: 0;*/
          /*text-align: center;*/
          /*font-size: 22*0.01rem;*/
          /*color: #fff;*/
          /*-webkit-text-stroke: 0.02rem hsla(0, 0%, 42%, 0.6);*/
          /*}*/
          /*}*/
        }
      }
    }
  }

  .btn {
    width: 4.1rem;
    height: 0.7rem;
    line-height: 0.7rem;
    font-size: 0.24rem;
    color: #fff;
    background: #ff4141;
    border-radius: 0.16rem;
  }
</style>
