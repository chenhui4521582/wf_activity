

<template>
  <div class="popup" v-if="value">
    <div class="mask"></div>
    <div class="wrap">
      <!-- 规则 -->
      <template v-if="popupType == 1">
        <div class="rule">
          <div class="title">抽奖规则</div>
          <div class="content">
            请您仔细阅读以下活动规则，参与活动即视为您已阅读并认可本活动规则。<br>
            1. 活动时间：2020年4月8日-2020年4月15日。<br>
            2. 抽奖说明：点击【马上抽奖】会扣除选择商品抽奖所需话费券，话费券不退还，每日抽奖上限20次。<br>
            3.奖品发放：奖品将在中奖后发放至我的奖品，请至我的奖品领取。<br>
            4. 奖品图片仅供参考，请以具体实物为准。<br>
            5.活动期间，凡以不正当手段（如恶意刷单、作弊、扰乱系统、实施网络攻击等）参与本次活动的用户，平台有权终止其参与活动并回收所有奖品；如遇不可抗力（包括但不限于重大灾害事件、活动受政府机关指令需要停止举办或调整、活动中存在大面积作弊行为、活动遭遇严重网络攻击或系统故障导致活动不能正常进行）的影响，平台可暂停、中止或终止活动。关于活动任何其它疑问，请联系在线客服。<br>
            6. 奖品中奖概率：<br>
            <div class="table">
              <div class="nav">
                <div class="td name">奖品名称</div>
                <div class="td price">奖品价值</div>
                <div class="td probability">中奖概率</div>
              </div>
              <div class="tr" v-for="(item, index) in list" :key="index">
                <div class="td name">{{item.name}}</div>
                <div class="td price">{{item.marketPrice}}</div>
                <div class="td probability">{{item.rate}}%</div>
              </div>
            </div>
            7. 据苹果公司免责条款特此声明：本活动与苹果公司无关。
            <div class="bottom">
              活动解释权归平台所有
            </div>
          </div>
        </div>
      </template>
      <!-- 抽奖记录 -->
      <template v-if="popupType == 2">
        <div class="log">
          <div class="title">抽奖记录</div>
          <div class="nav" v-if="showLogList">
            <div class="name">奖品名称</div>
            <div class="time">抽奖时间</div>
            <div class="check"></div>
          </div>
          <div class="log-list" v-if="showLogList">
            <div class="item" v-for="(item, index) in log" :key="index">
              <div class="name">{{item.name}}</div>
              <div class="time">{{item.date | formatTime('y.m.d')}}</div>
              <div class="check">立即查看>></div>
            </div>
          </div>
          <div class="no-list" v-else>
            <img src="../img/empty-icon.png" alt="">
            <p class="text">空空如也</p>
            <div class="go-award" @click="hidePopup">快去抽奖吧>></div>
          </div>
        </div>
      </template>
      <!-- 抽奖 -->
      <template v-if="popupType == 3">
        <div class="award-animation" v-if="animation.show">
          <img ref="img1" class="img1" src="../img/animation-bg2.png" alt="">
          <img ref="img2" class="img2" src="../img/animation-bg1.png" alt="">
          <img ref="cover1" class="cover1" src="../img/cover1.png" alt="">
          <img ref="cover2" class="cover2" src="../img/cover2.png" alt="">
          <div ref="award" class="award">
            <img :src="awards.img | filter" alt="">
          </div>
          <div class="text">{{animation.text}}</div>
        </div>
        <div class="award-popup" v-if="lotteryEnd">
          <!-- 抽奖成功 -->
          <div class="lotter-success" v-if="lotterySuccess">
            <div class="title">欧皇出现</div>
            <div class="light">
              <img src="../img/light.png" alt="">
            </div>
            <div class="award-img">
              <img :src="awards.img | filter" alt="">
            </div>
            <div class="award-name">{{awards.name}}</div>
            <div class="award-btn" @click="goMyPrice">
              <img src="../img/popup-btn4.png" alt="">
            </div>
          </div>
          <!-- 抽奖失败 -->
          <div class="lotter-error" v-else>
            <div class="title">啊哦，和大奖擦肩而过了~</div>
            <div class="error-img">
              <img src="../img/no-award.png" alt="">
            </div>
            <div class="error-name">再来一次吧</div>
            <div class="error-btn" @click="lotteryContinue">
              <img src="../img/popup-btn1.png" alt="">
            </div>
          </div>
        </div>
      </template>
      <!-- 抽奖确认 -->
      <template v-if="popupType == 4">
        <div class="lotter-comfirm">
          <div class="title">本次抽奖将会消耗</div>
          <div class="light">
            <img src="../img/light.png" alt="">
          </div>
          <div class="award-img">
            <img :src="info.picture | filter" alt="">
          </div>
          <div class="award-name">{{info.purchasePrice}}话费券</div>
          <div class="award-btn" >
            <div class="cancel btn" @click="hidePopup">取消</div>
            <div class="comfirm btn" @click="lottery"></div>
          </div>
        </div>
      </template>
      <div class="close" @click="hidePopup" v-if="!animation.show"></div>
    </div>
  </div>
</template>
<script>
import Services from '../services/services'
import _get from 'lodash.get'
export default {
  name: 'popup',
  props: ['popupType', 'value', 'log', 'awards', 'info', 'list'],
  data: () => ({
    lotteryEnd: false,
    animation: {
      show: false,
      step: 1,
      text: '正在开奖'
    }
  }),
  computed: {
    showLogList() {
      return this.log.length
    },
    lotterySuccess() {
      if(this.awards.img && this.awards.name && this.awards.win) {
        return true
      }
      return false
    }
  },
  methods: {
    hidePopup() {
      // /** 重新拉取数据 **/
      // if(this.popupType == 2){
      //   this.$emit('refresh')
      // }
      // /** 浇水意外奖励 **/
      // if(this.popupType == 3 && this.treeInfo.treeGrade != this.treeInfo.currTreeGrade){
      //   this.$emit('treeUpgrade')
      //   return
      // }
      // /** 树长大了 动画 **/
      // if(this.popupType == 1 && this.treeInfo.treeGrade != this.treeInfo.currTreeGrade){
      //   this.$emit('treeUpgradeAnimation')
      //   return
      // }
      this.$emit('input', false)
    },
    openAnimation() {
      this.animation.show = true
      this.lotteryEnd = false
      this.animation.step = 1
      this.animation.text = '正在开奖'
    },
    animationStep1() {
      this.openAnimation()
      let index = 0
      clearTimeout(this.animationStatus1)
      clearTimeout(this.animationStatus2)
      this.animationStatus1 = setInterval(() => {
        index ++
        this.animation.text = this.animation.text + '.'
        if(index == 4) {
          index = 0
          this.animation.text = '正在开奖'
        }
      }, 400);
      this.animationStatus2 = setTimeout(() => {
        clearTimeout(this.animationStatus1)
        index = 0
        if(this.lotterySuccess) {
          this.animationStep2()
          GLOBALS.marchSetsPoint('A_H5PT0264003113')
        }else {
          GLOBALS.marchSetsPoint('A_H5PT0264003115')
          this.animation.show = false
          this.lotteryEnd = true
        }
      }, 1000);
    },
    animationStep2() {
      this.animation.text = '恭喜获得'
      let el1 = this.$refs.img1
      let cover1 = this.$refs.cover1
      let cover2 = this.$refs.cover2
      let award = this.$refs.award
      el1.classList.add('active')
      cover1.classList.add('active')
      cover2.classList.add('active')
      award.classList.add('active')
      clearTimeout(this.awardTimer)
      this.awardTimer = setTimeout(() => {
        this.lotteryEnd = true
        this.animation.show = false
      }, 2000);
    },
    goMyPrice() {
      GLOBALS.marchSetsPoint('A_H5PT0264003114')
      window.location.href = "https://wap.beeplaying.com/xmWap/#/my/prize"
    },
    lotteryContinue() {
      GLOBALS.marchSetsPoint('A_H5PT0264003116')
      this.$emit('lotteryContinue')
    },
    lottery() {
      GLOBALS.marchSetsPoint('A_H5PT0264003112')
      this.$emit('lottery')
    }
  },
  watch: {
    popupType (newVlue) {
      if(newVlue && this.popupType == 3) {
        this.animationStep1()
      }
      if(newVlue && this.popupType == 4) {
         GLOBALS.marchSetsPoint('A_H5PT0264003111')
      }
    }
  }
}
</script>
<style scoped lang="less">
* {
  box-sizing: border-box;
}
.popup {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 10;
  .mask {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
    background: rgba(0,0,0,.7);
  }
  .wrap {
    position: absolute;
    left: 50%;
    top: 45%;
    z-index: 2;
    transform: translate(-50%, -50%);
    .close {
      position: absolute;
      left: 50%;
      bottom: -.7rem;
      width: .38rem;
      height: .38rem;
      transform: translate(-50%, 0);
      background: url(../img/close-icon.png) no-repeat center center;
      background-size: .37rem .37rem;
    }
    img {
      vertical-align: top;
      width: 100%;
      height: 100%;
    }
    .rule {
      overflow: hidden;
      width: 4.68rem;
      height: 8.33rem;
      background: url(../img/popup-bg3.png) no-repeat center center;
      background-size: 100% 100%;
      color: #fff;
      .title {
        font-weight:bold;
        margin: 1.48rem 0 0;
        text-align: center;
        font-size: .32rem;
      }
      .content {
        margin: .4rem .47rem;
        font-size: .22rem; 
        color: #fff;
        line-height: .35rem;
        height: 5.6rem;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        .table {
          margin: .52rem 0 .2rem;
          border-radius: .16rem;
          border:1px solid rgba(255,255,255,1);
          .nav {
            overflow: hidden;
            .td {
              float: left;
              text-align: center;
            }
            .name {
              width: 40%;
              height: .5rem;
              line-height: .5rem;
              border-right: 1px solid #fff;
            }
            .price {
              width: 30%;
              height: .5rem;
              line-height: .5rem;
              border-right: 1px solid #fff;
            }
            .probability {
              width: 30%;
              height: .5rem;
              line-height: .5rem;
            }
          }
          .tr {
            overflow: hidden;
            .td {
              text-align: center;
              float: left;
              &.name {
                padding: 0 .1rem;
                overflow: hidden;
                text-overflow: ellipsis;
                width: 40%;
                height: .5rem;
                line-height: .5rem;
                border-right: 1px solid #fff;
                border-top: 1px solid #fff;
                white-space: nowrap;
              }
              &.price {
                width: 30%;
                height: .5rem;
                line-height: .5rem;
                border-right: 1px solid #fff;
                border-top: 1px solid #fff;
              }
              &.probability {
                width: 30%;
                height: .5rem;
                line-height: .5rem;
                border-top: 1px solid #fff;
              }
            }
          }
        }
        .bottom {
          margin: .52rem 0 .2rem;
          text-align: center;
          font-size: .18rem;
        }
      }
    }
    .log {
      overflow: hidden;
      width: 5.46rem;
      height: 6.91rem;
      background: url(../img/popup-bg4.png) no-repeat center center;
      background-size: 100% 100%;
      color: #fff;
      .title {
        margin: 1.7rem 0 0;
        font-weight:bold;
        text-align: center;
        font-size: .32rem;
      }
      .no-list {
        margin: 1.2rem auto;
        width: 2.16rem;
        height: 1.53rem;
        .text {
          margin-top: .27rem;
          text-align: center;
          font-size: .26rem;
          color: #C4C2DD;
        }
        .go-award {
          margin-top: .6rem;
          text-align: center;
          font-size: .26rem;
          color: #FFD305;
        }
      }
      .nav {
        margin: .5rem auto 0;
        display: flex;
        padding: 0 .49rem;
        justify-content: center;
        line-height: .5rem;
        font-size: .24rem;
        color: #fff;
        .name {
          width: 40%;
          text-align: center;
        }
        .time {
          width: 30%;
          text-align: center;
        }
        .check {
          width: 30%;
          text-align: center;
        }
      }
      .log-list {
        margin: 0 .49rem;
        height: 3.6rem;
        overflow-y: auto;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;
        .item {
          display: flex;
          justify-self: space-beween;
          font-size: .20rem;
          color: #fff;
          line-height: .48rem;
          height: .46rem;
          background: #110097;
          &:nth-child(even) {
            background: none;
          }
          .name {
            width: 40%;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .time {
            width: 30%;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .check {
            width: 30%;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #FFD305;
          }
        }
      }
    }
    .award-animation {
      position: relative;
      width: 4.68rem;
      height: 4.5rem;
      .img1 {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 2.1rem;
        z-index: 2;
        transform-origin: right center;
        &.active {
          transition: all .8s;
          transform: rotateZ(15deg);
          top: -1.6rem;
        }
      }
      .img2 {
        position: absolute;
        top: 1.54rem;
        left: 0;
        right: 0;
        height: 2.98rem;
        z-index: 1;
      }
      .cover1 {
        position: absolute;
        top: -2rem;
        left: -.56rem;
        width: 5.87rem;
        height: 5.96rem;
        z-index: 3;
        transform: scale(0);
        transform-origin: center center;
        &.active {
          transition: all .5s .3s;
          transform: scale(1);
        }
      }
      .cover2 {
        position: absolute;
        top: -1.6rem;
        left: -.28rem;
        width: 5.36rem;
        height: 3.93rem;
        transform: scale(0);
        z-index: 4;
        transform-origin: center center;
        &.active {
          transition: all .5s .3s;
          transform: scale(1);
        }
      }
      .award {
        position: absolute;
        top: 0;
        left: 1.3rem;
        height: 2rem;
        transform: scale(0);
        z-index: 5;
        text-align: center;
        transform-origin: center center;
        &.active {
          transition: all .5s .3s;
          transform: scale(1);
        }
        img {
          width: auto;
          height: 100%;
        }
      }
      .text {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 1rem;
        z-index: 3;
        color: #fff;
        font-size: .32rem;
        color: #FFD205;
        text-align: center;
      }

    }
    .award-popup {
      overflow: hidden;
      width: 4.68rem;
      height: 6.53rem;
      background: url(../img/popup-bg1.png) no-repeat center top;
      background-size: 100% 100%;
      .title {
        font-weight:bold;
        margin: 1.44rem 0 0;
        text-align: center;
        font-size: .32rem;
        color: #fff;
      }
      .lotter-success {
        .light {
          position: absolute;
          left: 50%;
          top: 1.4rem;
          transform: translate(-50%, 0);
          width: 3.77rem;
          height: 4rem;
        }
        .award-img {
          position: relative;
          z-index: 3;
          padding: .5rem .4rem .2rem;
          text-align: center;
          height: 2.7rem;
          img {
            max-width: 100%;
            width: auto;
            height: 100%;
          }
        }
        .award-name {
          text-align: center;
          font-size: .28rem;
          color: #FFFFFF;
          font-weight: 800;
        }
        .award-btn {
          margin: .56rem auto 0;
          width: 3.51rem;
          height: .71rem;
        }
      }
      .lotter-error {
        .error-img {
          margin-top: .95rem;
          text-align: center;
          height: 1.61rem;
          img {
            width: auto;
            height: 100%;
          }
        }
        .error-name {
          margin: .23rem;
          text-align: center;
          font-size: .22rem;
          color: #FFFFFF;
          font-weight: 500;
        }
        .error-btn {
          margin: .56rem auto 0;
          width: 3.51rem;
          height: .71rem;
        }
      }
    }
    .lotter-comfirm {
      overflow: hidden;
      width: 4.68rem;
      height: 6.53rem;
      background: url(../img/popup-bg1.png) no-repeat center top;
      background-size: 100% 100%;
      .title {
        font-weight:bold;
        margin: 1.44rem 0 0;
        text-align: center;
        font-size: .32rem;
        color: #fff;
      }
      .light {
          position: absolute;
          left: 50%;
          top: 1.4rem;
          transform: translate(-50%, 0);
          width: 3.77rem;
          height: 4rem;
        }
        .award-img {
          position: relative;
          z-index: 3;
          padding: .5rem .4rem .2rem;
          text-align: center;
          height: 2.7rem;
          img {
            max-width: 100%;
            width: auto;
            height: 100%;
          }
        }
        .award-name {
          text-align: center;
          font-size: .28rem;
          color: #FFFFFF;
          font-weight: 800;
        }
        .award-btn {
          margin: .56rem auto 0;
          display: flex;
          justify-content: center;
          .cancel {
            padding: 0 .6rem;
            height: .71rem;
            text-align: center;
            line-height: .71rem;
            color: #fff;
            font-size: .26rem;
            font-weight: bold;
          }
          .comfirm {
            width: 2.11rem;
            height: .71rem;
            background: url(../img/popup-btn3.png) no-repeat center center;
            background-size: 100% 100%;
          }
        }

    }
  }
}
</style>