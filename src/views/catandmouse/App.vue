<template>
  <main v-else class="cat-and-mouse">
    <template v-if="popType===1">
      <div class="rule-wrapper">
        <div class="top">
          <div class="top-center"></div>
          <div class="close" @click="closePop()"></div>
        </div>
        <p>
          1.活动时间：2020.01.15-2020.01.21<br />
          2.活动期内，根据玩家完成喂猫20g鱼干的次数，可领取不同的奖励(每天只可完成1次，即一天内喂养40g鱼干也只计完成1次)；领取红包奖励时，会随机获得优惠券、话费券、金叶子、鱼干奖励中的其中一种；<br />
          3.累计七天喂猫可获得鼠年限定道具，效果为鱼干加成+5%（即每消耗1000金叶可额外获得0.05g鱼干)，持续5天；领取后可在猫房间内查看，到期后自动消失。<br />
          4.所有奖励限活动期间内领取，请及时领取自己的奖励。
        </p>
      </div>
    </template>
    <template v-else-if="popType===2">
      <div class="default-pop-wrapper">
        <div class="top">
          <div class="top-center-bg">
            <div class="top-center"></div>
          </div>
          <div class="close" @click="closePop()"></div>
        </div>
        <div class="awards-info">
          <div class="awards-image">
            <img class="img" :class="{'img-7':awardsInfo.awardsType===7}"
              :src="require('./img/awards-'+awardsInfo.awardsType+'.png')" alt="">
          </div>
          <p>{{awardsInfo.awardsName}}{{awardsInfo.awardsNum>1?'X'+awardsInfo.awardsNum:''}}</p>
          <div class="btn-wrapper">
            <div class="btn btn-green" @click="closePop(true)">
              {{awardsInfo.awardsType===7?'去查看':'收下奖励'}}</div>
          </div>
        </div>
      </div>
    </template>
    <template v-else-if="popType===3">
      <div class="red-packet-pop-wrapper">
        <div class="title"></div>
        <div class="mouse-icon"></div>
        <div class="open-icon" @click="closePop()"></div>
      </div>
    </template>
    <template v-else-if="popType===4">
      <div class="red-packet-pop-wrapper opened">
        <div class="top">
          <div class="top-center"></div>
        </div>
        <div class="awards-info">
          <div class="awards-image">
            <img class="img" :src="require('./img/awards-'+awardsInfo.awardsType+'.png')" alt="">
          </div>
          <p>{{awardsInfo.awardsName}}{{awardsInfo.awardsNum>1?'X'+awardsInfo.awardsNum:''}}</p>
          <div class="btn-wrapper">
            <div class="btn btn-green" @click="closePop(true)">收下奖励</div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="fireworks-bg">
      </div>
      <div class="main-content">
        <div class="top">
          <div class="top-left"></div>
          <div class="top-center"></div>
          <div class="close" @click="closePop()"></div>
        </div>
        <div class="time-and-rule">
          <div class="activity-time">活动时间：{{activityTime}}</div>
          <div class="rule-icon" @click="showRule"></div>
        </div>
        <div class="list-wrapper">
          <div class="title"></div>
          <div class="desc">活动每日限达成一次</div>
          <ul class="sign-list">
            <template v-for="(item,index) in giftList">
              <li class="list-item"
                :class="{'top-line':index<3,'bottom-line':index>2,'need-open':item.status===0&&item.fishNum>=configFishNum,'unopen':currentStep-item.step<0}"
                @click="clickItem(item,index)">
                <div class="item-content">
                  <img :class="'img-'+item.awardsType"
                    :src="require('./img/awards-'+item.awardsType+'.png')" alt="">
                  <span v-if="item.awardsName">{{item.awardsName}}</span>
                </div>
                <div class="other-wrap">
                  <template v-if="item.status===1">
                    <p>已领取</p>
                  </template>
                  <template v-else-if="item.fishNum>=configFishNum">
                    <p>可领取</p>
                  </template>
                  <template v-else-if="currentStep-item.step === 0">
                    <div class="percent-wrap">
                      <div class="percent"
                        :style="{width:`${Math.floor(item.fishNum/configFishNum*100)}%`}">
                      </div>
                      <span>
                        {{item.fishNum}}g/{{configFishNum}}g
                      </span>
                    </div>
                  </template>
                  <template v-else-if="currentStep-item.step === -1">
                    <p>明日开启</p>
                  </template>
                  <template v-else>
                    <p>未开始</p>
                  </template>
                </div>
                <div class="superscript" v-if="item.fishNum>=configFishNum">
                  <span>完成{{index+1}}次</span>
                </div>
                <div class="tips"
                  :class="{'tips-1':item.awardsType===6,'tips-2':item.awardsType===7}"
                  v-if="currentIndex===index">
                  <p>{{tipsText}}</p>
                </div>
              </li>
            </template>
          </ul>
        </div>
      </div>
      <div class="btn-wrapper">
        <div class="btn" @click="openCatFeedPop">去喂猫</div>
      </div>
    </template>
  </main>
</template>

<script>
import _get from 'lodash.get'
import { activityInfo, mouseReceive } from './utils/api'
export default {
  name: '',
  components: {

  },
  data () {
    return {
      giftList: [],
      configFishNum: 0,
      fishNum: 0,
      defaultTime: '',
      currentIndex: 0,
      currentStep: 0,
      popType: 0, // 0:主体 1:规则 2:普通奖品弹窗 3:红包未开弹窗 4:红包打开弹窗
      awardsInfo: {}
    }
  },
  computed: {
    tipsText () {
      let tips = ''
      switch (this.giftList[this.currentIndex].awardsType) {
        case 6:
          tips = '随机获得免单券、优惠券、话费券、金叶子、鱼干五种奖励的其中一种'
          break
        case 7:
          tips = '鼠年限定道具，鱼干加成+10%，持续30天，获得后会再猫房间内显示，可自由挪动位置'
          break

        default:
          break
      }
      return tips
    },
    activityTime () {
      try {
        let activityTime = this.defaultTime.split('~')
        let startTime = activityTime[0].split('.')
        let endTime = activityTime[1].split('.')
        return `${startTime[0]}月${startTime[1]}日～${endTime[0]}月${endTime[1]}日`
      } catch (error) {
        return this.defaultTime
      }
    }
  },
  mounted () {
    this.getActivityInfo()
  },
  methods: {
    async getActivityInfo () {
      const res = await activityInfo()
      this.giftList = _get(res, 'data.activityConfigDetails', [])
      this.defaultTime = _get(res, 'data.activityTime', '')
      this.configFishNum = _get(res, 'data.configFishNum', 0)
      this.currentStep = _get(res, 'data.step', 0)
    },
    showRule () {
      this.popType = 1
    },
    clickItem (item, index) {
      if (item.status === 0 && item.fishNum >= this.configFishNum) {
        this.receive(item)
      } else {
        this.currentIndex = index
      }
    },
    async receive (item) {
      const res = await mouseReceive(item.step)
      this.awardsInfo = _get(res, 'data', {})
      if (item.awardsType === 6) {
        this.popType = 3
      } else {
        this.popType = 2
      }
      this.getActivityInfo()
    },
    openCatFeedPop () {
      if (parent && parent.GameEval && parent.openCatFeedPop) {
        parent.GameEval('closeweb')
        parent.openCatFeedPop()
      }
    },
    closePop (flag) {
      if (flag) {
        parent && parent.GameEval && parent.GameEval('closeweb')
        return
      }
      switch (this.popType) {
        case 0:
          parent && parent.GameEval && parent.GameEval('closeweb')
          break
        case 3:
          this.popType = 4
          break

        default:
          this.popType = 0
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
.bg(@url,@pos) {
  background-image: url(@url);
  background-repeat: no-repeat;
  background-position: @pos center;
  background-size: contain;
}
.cat-and-mouse {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.24rem;
  font-weight: bold;
  color: #d42011;
  .fireworks-bg {
    height: 5.42rem;
    .bg("./img/fireworks-bg.png", top);
  }
  .top {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    position: relative;
    .close {
      width: 1.1rem;
      height: 1.16rem;
      position: relative;
      .bg("./img/close.png", center);
    }
  }
  .rule-wrapper {
    width: 5.9rem;
    height: 5.84rem;
    .bg("./img/rule-bg.png", center);
    padding: 0 0.4rem 0.4rem;
    box-sizing: border-box;
    .top {
      .top-center {
        width: 3.1rem;
        height: 0.84rem;
        .bg("./img/rule-title.png", center);
        margin-top: -0.2rem;
      }
      .close {
        position: absolute;
        top: 0.38rem;
        right: -1.1rem;
      }
    }
    p {
      margin-top: 0.4rem;
      text-align: justify;
      line-height: 0.38rem;
    }
  }
  .default-pop-wrapper {
    width: 5.92rem;
    height: 4.24rem;
    .bg("./img/awards-bg.png", center);
    padding: 0 0.4rem 0.4rem;
    box-sizing: border-box;
    .top {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 0;
      .top-center-bg {
        width: 6.06rem;
        height: 1.38rem;
        .bg("./img/awards-title-bg.png", center);
      }
      .top-center {
        width: 3.1rem;
        height: 0.84rem;
        margin: -0.2rem auto 0;
        .bg("./img/awards-title.png", center);
      }
      .close {
        position: absolute;
        top: 0.38rem;
        right: -0.6rem;
      }
    }
    .awards-info {
      position: absolute;
      top: 0.84rem;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      font-size: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      p {
        font-size: 0.3rem;
        width: 100%;
        margin-top: 0.1rem;
      }
      .btn {
        margin: 0.14rem auto;
      }
    }
    .awards-image {
      width: 2.05rem;
      height: 1.66rem;
      display: flex;
      align-items: center;
      justify-content: center;
      .img {
        max-width: 100%;
        max-height: 100%;
      }
      .img-7 {
        margin-left: 0.4rem;
      }
    }
  }
  .main-content {
    min-height: 6.48rem;
    width: 6.94rem;
    margin: -3.26rem auto 0;
    padding: 0.14rem 0.14rem 0;
    box-sizing: border-box;
    .bg("./img/cat-main-bg.png", top);
    .top {
      .top-left {
        width: 1.58rem;
        height: 3.2rem;
        margin-left: -0.28rem;
        margin-top: -0.62rem;
        .bg("./img/top-left.png", center);
      }
      .top-center {
        width: 4.4rem;
        height: 1.24rem;
        margin-left: -0.2rem;
        margin-top: -0.5rem;
        .bg("./img/top-center.png", center);
      }
      .close {
        left: 0.3rem;
        top: 0.26rem;
      }
    }
    .time-and-rule {
      display: flex;
      justify-content: center;
      align-items: center;
      width: max-content;
      margin: -1.9rem auto 0;
      position: relative;
      .activity-time {
        background: #d41a0e;
        border-radius: 0.18rem;
        width: 3.76rem;
        line-height: 0.42rem;
        font-size: 0.24rem;
        color: #fff;
        text-align: center;
        box-shadow: inset 0px 1px 5px 0px rgba(154, 12, 1, 1),
          inset 0px -1px 1px 0px rgba(255, 147, 122, 1);
      }
      .rule-icon {
        margin-left: 0.1rem;
        margin-right: -0.62rem;
        width: 0.52rem;
        height: 0.52rem;
        .bg("./img/rule-icon.png", center);
      }
    }
    .list-wrapper {
      width: 6.66rem;
      height: 5.36rem;
      .bg("./img/list-bg.png", center);
      margin: auto;
      position: relative;
      padding: 0.1rem;
      box-sizing: border-box;
      .title {
        width: 2.7rem;
        height: 0.62rem;
        .bg("./img/title.png", center);
        margin: -0.16rem auto 0;
      }
      .desc {
        text-align: center;
        font-size: 0.24rem;
        font-weight: 400;
        color: #fff;
        margin-top: -0.1rem;
      }
      .sign-list {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        .list-item {
          width: 1.48rem;
          height: 1.94rem;
          .bg("./img/default-bg.png", center);
          position: relative;
          .item-content {
            margin: auto;
            text-align: center;
            font-size: 0;
            .img-1 {
              top: 0.4rem;
            }
            .img-6 {
              top: 0.3rem;
            }
            .img-7 {
              top: 0.1rem;
            }
            img {
              max-width: 1.16rem;
              max-height: 0.96rem;
              position: absolute;
              top: 0.2rem;
              left: 50%;
              transform: translateX(-50%);
            }
            span {
              display: block;
              font-size: 0.24rem;
              color: #d42011;
              position: absolute;
              bottom: 0.6rem;
              left: 50%;
              white-space: nowrap;
              transform: translateX(-50%);
            }
          }
          .other-wrap {
            position: absolute;
            height: 0.4rem;
            overflow: hidden;
            color: #fff;
            bottom: 0.1rem;
            left: 0;
            width: 100%;
            text-align: center;
            white-space: nowrap;
            display: flex;
            align-items: center;
            justify-content: center;
            .percent-wrap {
              margin: auto;
              width: 1.24rem;
              height: 0.24rem;
              border-radius: 0.12rem;
              background: #ba352e;
              position: relative;
              box-shadow: inset 0px 1px -1px 0px rgba(255, 170, 146, 1),
                inset 0px 1px -1px 0px rgba(213, 70, 62, 1);
              display: flex;
              align-items: center;
              margin-bottom: 0.1rem;
              .percent {
                position: absolute;
                height: inherit;
                width: 0;
                background: linear-gradient(
                  0deg,
                  rgba(244, 184, 1, 1),
                  rgba(249, 229, 51, 1)
                );
                border-radius: 0.12rem;
              }
              span {
                display: block;
                width: 100%;
                text-align: center;
                color: #fff;
                text-shadow: 0 0.02rem #d42011, 0.02rem 0 #d42011,
                  -0.02rem 0 #d42011, 0 -0.02rem #d42011;
                font-size: 0.2rem;
                padding-top: 0.02rem;
                position: relative;
              }
            }
          }
        }
        .top-line {
          margin: 0.06rem 0.2rem;
        }
        .bottom-line {
          margin: 0.36rem 0.02rem 0;
        }
        .need-open {
          .bg("./img/open-bg.png", center);
          animation: shake-rotate 200ms infinite ease-in-out 0s running;
        }
        .superscript {
          position: absolute;
          top: 0;
          left: 0;
          width: 0.76rem;
          height: 0.78rem;
          background-image: url(./img/superscript-icon.png);
          background-position: left top;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          span {
            display: block;
            transform-origin: center center;
            color: #fff;
            font-size: 0.18rem;
            white-space: nowrap;
            transform: rotate(-45deg) translate(-0.16rem, 0.06rem);
          }
        }
        .tips {
          width: 2.56rem;
          position: absolute;
          top: -0.3rem;
          left: -0.4rem;
          z-index: 1;
          font-size: 0.2rem;
          line-height: 0.24rem;
          color: #fff;
          padding: 0.14rem 0.12rem 0;
          box-sizing: border-box;
          text-align: justify;
        }
        .tips-1 {
          height: 1.3rem;
          padding: 0.18rem 0.14rem 0;
          .bg("./img/tips-1.png", center);
        }
        .tips-2 {
          top: -0.5rem;
          height: 1.46rem;
          left: -0.6rem;
          .bg("./img/tips-2.png", center);
        }
        .unopen::after {
          content: "";
          display: block;
          position: absolute;
          width: 1.48rem;
          height: 1.94rem;
          top: 0;
          left: 0;
          border-radius: 0.2rem;
          background-color: rgba(40, 11, 75, 0.3);
          background-image: url(./img/lock-icon.png);
          background-position: center 0.52rem;
          background-repeat: no-repeat;
          background-size: 0.58rem 0.58rem;
        }
      }
    }
  }
  .btn-wrapper {
    font-size: 0.4rem;
    text-align: center;
    .btn {
      color: #c45e13;
      font-weight: 500;
      width: 1.98rem;
      line-height: 0.84rem;
      height: 0.84rem;
      margin: 0.4rem auto;
      .bg("./img/yellow-btn.png", center);
    }
    .btn-green {
      .bg("./img/green-btn.png", center);
      color: #418d02;
    }
  }
  .red-packet-pop-wrapper {
    width: 7.2rem;
    height: 8.06rem;
    .bg("./img/red-packet-bg.png", center);
    overflow: hidden;
    box-sizing: border-box;
    position: relative;
    padding: 1.3rem;
    padding-left: 1.34rem;
    &.opened {
      .bg("./img/red-packet-opened-bg.png", center);
    }
    .title {
      width: 3.12rem;
      height: 0.86rem;
      .bg("./img/red-packet-title.png", center);
      margin: auto;
    }
    .mouse-icon {
      width: 1.46rem;
      height: 1.62rem;
      .bg("./img/awards-7.png", center);
      margin: 0 auto 0.1rem;
      position: relative;
      left: 0.1rem;
    }
    .open-icon {
      width: 1.78rem;
      height: 1.78rem;
      .bg("./img/open-icon.png", center);
      margin: auto;
    }
    .top {
      .top-center {
        width: 3.1rem;
        height: 0.84rem;
        margin: 0.04rem auto;
        .bg("./img/awards-title.png", center);
      }
    }

    .awards-info {
      text-align: center;
      font-size: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      margin: 0.4rem;
      p {
        font-size: 0.3rem;
        width: 100%;
        margin-top: 0.1rem;
      }
      .btn-wrapper {
        position: absolute;
        bottom: 1.1rem;
      }
    }
    .awards-image {
      width: 2.05rem;
      height: 1.66rem;
      display: flex;
      align-items: center;
      justify-content: center;
      .img {
        max-width: 100%;
        max-height: 100%;
      }
      .img-7 {
        margin-left: 0.4rem;
      }
    }
  }
}

@keyframes shake-rotate {
  0% {
    transform: translate(0px, 0px) rotate(0deg);
  }

  2% {
    transform: translate(0px, 0px) rotate(1.5deg);
  }

  50% {
    transform: translate(0px, 0px) rotate(0deg);
  }

  98% {
    transform: translate(0px, 0px) rotate(-1.5deg);
  }

  100% {
    transform: translate(0px, 0px) rotate(0deg);
  }
}
</style>
