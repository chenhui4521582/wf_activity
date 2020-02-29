<template>
  <main class="b-to-c">
    <article class="btn-wrapper">
      <div class="back" @click="back">返回</div>
      <div class="rule" @click="openPop(1)">规则</div>
    </article>
    <article class="activity-time">
      <template v-if="beginTime&&endTime">
        活动时间{{beginTime|timeFilter}}至{{endTime|timeFilter}}
      </template>
      <template v-else>
        活动暂未开启
      </template>
    </article>
    <article class="top-activity">
      <ul class="sign-list">
        <li v-for="(item,index) in signList" :key="index" :class="{signed:index<signNum}">
          <div class="icon"></div>
          <p class="leaf-num">{{item.amount}}</p>
          <p class="sign-text">
            <template v-if="index<signNum">
              已签
            </template>
            <template v-else>
              第{{item.sort}}天
            </template>
          </p>
        </li>
      </ul>
      <div class="sign-btn" @click="sign()">
        <template v-if="isDDW">立即签到</template>
        <template v-else>去多多玩APP签到</template>
      </div>
      <p class="desc">活动期间，去多多玩APP或WAP站可领取签到奖励</p>
    </article>
    <article class="bottom-activity">
      <p class="desc">活动期间购买礼包可在多多玩APP抽取免单机会</p>
      <section class="gift-wrapper">
        <p class="move-num">你还有<span>{{moveNum}}次</span>抽奖机会</p>
        <ul class="gift-list">
          <li class="gift-item" v-for="(item,index) in giftList">
            <div class="gift-icon" :class="`gift-${item.grade}`" @click.stop="buyGift(item)"></div>
            <div class="use-btn" :class="{'have-time':item.num}" v-if="isDDW"
              @click.stop="takeFree(item)">
              抽免单</div>
          </li>
        </ul>
        <div v-if="!isDDW" class="sign-btn" @click="toDDW">
          去多多玩APP抽免单
        </div>
        <p class="other">每进行一次付费即可获得1次抽奖机会</p>
      </section>
    </article>
    <popup v-model="isShowPop" :type="popType" :leaf-num="leafNum" @on-close="closeCallback"
      @on-confirm="confirmCallback"></popup>
  </main>
</template>
<script>
import utils from '@/common/js/utils'
import { moveInfo, signIn, signInfo, getMallProductListByType, userMoveNum, userMoveSend } from './services/api'
import _get from 'lodash.get'
import popup from './component/popup'
export default {
  name: '',
  components: {
    popup
  },
  data () {
    return {
      beginTime: '',
      endTime: '',
      signNum: 0,
      todaySigned: false,
      signList: [],
      moveNumArr: [],
      bizList: [],
      isShowPop: false,
      popType: 0,
      leafNum: 0
    }
  },
  mounted () {
    this.init()
  },
  computed: {
    curChannel () {
      return localStorage.getItem('APP_CHANNEL') || utils.getUrlParam('channel')
    },
    isDDW () { return this.curChannel === '100030' },
    isIOS () { return utils.isIOS() },
    isAndroid () { return utils.isAndroid() },
    moveNum () {
      let num = 0
      if (this.moveNumArr && this.moveNumArr.length > 0) {
        num = this.moveNumArr.reduce((accumulator, currentValue) => {
          return accumulator + currentValue.num
        }, 0)
      }
      return num
    },
    giftList () {
      let arr = [{ grade: '68', num: 0 }, { grade: '88', num: 0 }, { grade: '888', num: 0 }]
      let beforelist = []
      let afterlist = []
      arr.forEach(element => {
        if (this.moveNumArr && this.moveNumArr.length > 0) {
          this.moveNumArr.forEach(item => {
            if (element.grade === item.grade) {
              element.num = item.num
              beforelist.push(element)
            }
          })
        }
      })
      if (beforelist.length <= 0) {
        beforelist = arr
      }
      beforelist.forEach(element => {
        if (this.bizList && this.bizList.length > 0) {
          this.bizList.forEach(item => {
            if (Number(element.grade) === item.price) {
              element = { ...element, ...item }
              afterlist.push(element)
            }
          })
        }
      })
      if (afterlist.length <= 0) {
        afterlist = arr
      }
      return afterlist
    }
  },
  filters: {
    timeFilter (time) {
      return time.split(' ')[0]
    }
  },
  methods: {
    back () {
      history.go(-1)
    },
    async init () {
      const res = await moveInfo()
      this.beginTime = _get(res, 'data.beginTime', '')
      this.endTime = _get(res, 'data.endTime', '')
      this.signInfo()
      this.getMallProductListByType()
      this.userMoveNum()
    },
    async signInfo () {
      const res = await signInfo()
      this.signNum = _get(res, 'data.signNum', 0)
      this.todaySigned = _get(res, 'data.today', false)
      this.signList = _get(res, 'data.signConfig', [])
    },
    async getMallProductListByType () {
      const res = await getMallProductListByType()
      let arr = _get(res, 'data.mallBizConfigs', [])
      if (arr) {
        this.bizList = arr.sort((a, b) => {
          return a.price - b.price
        })
      }
    },
    async userMoveNum () {
      const res = await userMoveNum()
      this.moveNumArr = _get(res, 'data', [])
    },
    async sign () {
      if (this.isDDW && this.beginTime) {
        if (this.todaySigned) {
          this.$toast.show({
            message: '请勿重复签到',
            duration: 2000
          })
          return
        }
        const res = await signIn()
        const code = _get(res, 'code', 0)
        if (code === 200) {
          this.leafNum = _get(res, 'data', 0)
          this.openPop(6)
        } else {
          this.$toast.show({
            message: '请勿重复签到',
            duration: 2000
          })
        }
      } else {
        this.toDDW()
      }
    },
    buyGift (item) {
      if (this.isDDW && this.beginTime) {
        localStorage.setItem('payment', JSON.stringify(item))
        location.href = 'https://wap.beeplaying.com/xmWap/#/payment/paymentlist?isBack=true'
      } else {
        this.toDDW()
      }
    },
    async userMoveSend (value) {
      const res = await userMoveSend(value)
      let code = _get(res, 'code', 0)
      if (code === 200) {
        this.leafNum = _get(res, 'data.awardNum', 0)
        if (this.leafNum) {
          this.openPop(6)
        } else {
          this.openPop(4)
        }
      } else if (code === 104) {
        this.openPop(4)
      } else if (code === 102) {
        this.openPop(3)
      }
    },
    takeFree (item) {
      if (this.isDDW && this.beginTime) {
        if (item.num) {
          this.userMoveSend(item.grade)
        } else {
          this.openPop(3)
        }
      } else {
        this.toDDW()
      }
    },
    toDDW () {
      if (this.isIOS) {
        this.openPop(2)
        return
      } else if (!this.beginTime) {
        this.openPop(5)
        return
      } else if (this.isAndroid) {
        this.openPop(0)
      }
    },
    openPop (type) {
      this.popType = type
      this.isShowPop = true
    },
    closeCallback () {
      this.init()
    },
    confirmCallback () {
      switch (this.popType) {
        case 0:
          location.href = 'https://wap.beeplaying.com/ddwdownload/'
          break
        case 5:
          location.href = 'https://wap.beeplaying.com/ball/'
          break

        default:
          break
      }
      this.init()
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
.b-to-c {
  min-height: 100vh;
  background-color: #3e1648;
  box-sizing: border-box;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  font-family: Alibaba PuHuiTi;
  position: relative;
  .bg-top("./img/bg.png");
  font-size: 0.24rem;
  font-weight: 400;
  text-align: center;
  .btn-wrapper {
    font-size: 0.3rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    position: absolute;
    left: 0;
    top: 0.24rem;
    div {
      width: 0.54rem;
      border-radius: 0 0.2rem 0.2rem 0;
      text-align: center;
      line-height: 0.34rem;
      padding: 0.2rem 0 0.28rem;
    }
    .back {
      background-color: #e88085;
    }
    .rule {
      background-color: #ac5ff4;
    }
  }
  .activity-time {
    font-size: 0.24rem;
    font-weight: 400;
    color: #fff;
    text-align: center;
    line-height: 0.3rem;
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
    width: 6.64rem;
    height: 5.38rem;
    margin: 1.8rem auto 0;
    overflow: hidden;
    .bg-center("./img/top-bg.png");
    .sign-list {
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 0 0.45rem;
      margin-top: 1.56rem;
      li {
        position: relative;
        .icon {
          width: 0.9rem;
          height: 1.12rem;
          .bg-center("./img/normal-icon.png");
        }
        .leaf-num {
          position: absolute;
          top: 0.58rem;
          left: 0;
          width: 0.9rem;
          text-align: center;
          font-size: 0.3rem;
          font-weight: 400;
          color: #fff;
        }
        .sign-text {
          margin-top: 0.08rem;
          width: 0.9rem;
          text-align: center;
          font-size: 0.26rem;
          color: #ff1626;
          font-weight: bold;
        }
        &.signed {
          .icon {
            .bg-center("./img/activated-icon.png");
          }
          .leaf-num {
            color: #c6635d;
          }
          .sign-text {
            color: #fdb42d;
          }
        }
      }
    }
    .sign-btn {
      margin: 0.24rem auto 0;
      .bg-center("./img/red-btn-bg.png");
    }
    .desc {
      color: #bc8fb6;
    }
  }
  .bottom-activity {
    width: 6.64rem;
    height: 7.28rem;
    margin: 0.36rem auto;
    overflow: hidden;
    .bg-center("./img/bottom-bg.png");
    .desc {
      color: #c7a3c2;
      margin-top: 1.36rem;
    }
    .gift-wrapper {
      width: 5.74rem;
      height: 4.88rem;
      box-sizing: border-box;
      margin: 0.18rem auto 0;
      overflow: hidden;
      .bg-center("./img/gift-bg.png");
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
        padding: 0 0.2rem;
        display: flex;
        align-items: center;
        justify-content: space-around;
        li {
          .gift-icon {
            width: 1.64rem;
            height: 1.96rem;
            &.gift-68 {
              .bg-center("./img/68.png");
            }
            &.gift-88 {
              .bg-center("./img/88.png");
            }
            &.gift-888 {
              .bg-center("./img/888.png");
            }
          }
          .use-btn {
            background-color: #aba59e;
            color: #fff;
            width: 1.4rem;
            height: 0.6rem;
            line-height: 0.6rem;
            text-align: center;
            margin: 0.16rem auto 0.4rem;
            border-radius: 0.3rem;
            font-size: 0.32rem;
            font-weight: bold;
            &.have-time {
              background-color: #feb661;
              color: #c5250f;
            }
          }
        }
      }
      .sign-btn {
        margin: 0.12rem auto 0;
        .bg-center("./img/orange-btn-bg.png");
      }
      .other {
        color: #d88174;
      }
    }
  }
}
</style>
