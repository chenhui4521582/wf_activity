

<template>
  <div class="popup" v-if="value">
    <div class="mask"></div>
    <div class="wrap">
      <!-- 许愿树长大弹框 -->
      <template v-if="popupType == 1">
        <div class="tree">
          <div class="title1">
            <img src="../img/popup-tree-title1.png" alt="">
          </div>
          <div class="title2">
            <img src="../img/popup-tree-title2.png" alt="">
          </div>
          <div class="body">
            <div class="preveTree">
              <img :src="proveTree" alt="">
            </div>
            <div class="right-arrows">
              <img src="../img/right-arrows.png" alt="">
            </div>
            <div class="nextTree">
              <img :src="currentTree" alt="">
            </div>
          </div>
          <div class="btn" @click="hidePopup">
            <img src="../img/popup-tree-btn.png" alt="">
          </div>
        </div>
      </template>
      <!-- 收获弹框 -->
      <template v-if="popupType == 2">
        <div class="get-award">
          <div class="title">
            <img src="../img/popup-award-title.png" alt="">
          </div>
          <div class="award">
            <div class="group">
              <img :src="treeFinishAward.awardImage | filter" alt="">
              <p>{{treeFinishAward.awardName}}</p>
            </div>
          </div>
          <div class="btns">
            <div class="cancel" @click="tryAgen">
              <img src="../img/try-agen.png" alt="">
            </div>
            <div class="confirm" @click="checkLog">
              <img src="../img/check-myprice.png" alt="">
            </div>
          </div>
        </div>
      </template>
      <!-- 惊喜弹框 -->
      <template v-if="popupType == 3">
        <div class="accident">
          <div class="title1">
            <img src="../img/popup-accident-title2.png" alt="">
          </div>
          <div class="title2">
            <img src="../img/popup-accident-title1.png" alt="">
          </div>
          <div class="award">
            <img :src="treeInfo.awardConfigRsp.awardImage | filter" alt="">
            <p>{{treeInfo.awardConfigRsp.awardName || ''}}</p>
          </div>
          <div class="btn" @click="hidePopup">
            <img src="../img/accident-text.png" alt="">
          </div>
        </div>
      </template>
      <!-- 水滴不足弹框 -->
      <template v-if="popupType == 4">
        <div class="no-water">
          <div class="title">
            <img src="../img/no-water.png" alt="">
          </div>
          <div class="icon">
            <img src="../img/no-water-icon.png" alt="">
          </div>
          <div class="title2">
            <img src="../img/go-task-icon.png" alt="">
          </div>
          <div class="btn" @click="openTask">
            <img src="../img/get-water-icon.png" alt="">
          </div>
        </div>
      </template>
      <!-- 肥料礼包弹框 -->
      <template v-if="popupType == 5">
        <div class="manure">
          <div class="title">
            <img src="../img/manure-title.png" alt="">
          </div>
          <div class="items">
            <div class="item item1" >
              <div class="title2">成长值+60</div>
              <div class="icon">
                <img src="../img/manure-icon1.png" alt="">
              </div>
              <div class="numer">+5000金叶子</div>
              <div class="btn" v-if="cardList[0].buyFlag == 1" @click="gotoPay(0)">
                <img src="../img/manure-btn1.png" alt="">
              </div>
              <div class="btn no" v-if="cardList[0].buyFlag == 0">
                <img src="../img/buyend-text.png" alt="">
              </div>
            </div>
            <div class="item item2" >
              <div class="title2">成长值+220</div>
              <div class="icon">
                <img src="../img/manure-icon2.png" alt="">
              </div>
              <div class="numer">+13W金叶子</div>
              <div class="btn" v-if="cardList[1].buyFlag == 1" @click="gotoPay(1)">
                <img src="../img/manure-btn2.png" alt="">
              </div>
              <div class="btn no" v-if="cardList[1].buyFlag == 0">
                <img src="../img/buyend-text.png" alt="">
              </div>
            </div>
          </div>
          <div class="tips">*肥料礼包每日限购一次*</div>
        </div>
      </template>
      <div class="close" @click="hidePopup"></div>
    </div>
  </div>
</template>
<script>
import Services from '../services/services'
import _get from 'lodash.get'
export default {
  name: 'popup',
  props: ['popupType', 'value', 'treeInfo', 'treeFinishAward', 'cardList'],
  methods: {
    hidePopup() {
      /** 重新拉取数据 **/
      if(this.popupType == 2){
        this.$emit('refresh')
      }
      /** 浇水意外奖励 **/
      if(this.popupType == 3 && this.treeInfo.treeGrade != this.treeInfo.currTreeGrade){
        this.$emit('treeUpgrade')
        return
      }
      /** 树长大了 动画 **/
      if(this.popupType == 1 && this.treeInfo.treeGrade != this.treeInfo.currTreeGrade){
        this.$emit('treeUpgradeAnimation')
        return
      }
      this.$emit('input', false)
    },
    gotoPay(index) {
      let channel = localStorage.getItem('APP_CHANNEL')
      let originDeffer = `//wap.beeplaying.com/activities/tree.html?channel=${channel}&blindBox=true`
      localStorage.setItem('payment', JSON.stringify(this.cardList[index]))
      localStorage.setItem('originDeffer', originDeffer)
      switch(index) {
        case 0 :
          GLOBALS.marchSetsPoint('A_H5PT0244002828')
          break;
        case 1 :
          GLOBALS.marchSetsPoint('A_H5PT0244002829')
          break;
      }
      window.location.href="//wap.beeplaying.com/xmWap/#/payment/paymentlist"
    },
    openTask() {
      this.$emit('input', false)
      this.$emit('openTask')
    },
    tryAgen() {
      this.$emit('input', false)
      this.$emit('tryAgen')
    },
    checkLog() {
      this.$emit('input', false)
      this.$emit('checkLog')
    }
  },
  computed: {
    currentTree() {
      return require(`../img/tree${this.treeInfo.currTreeGrade}.png`)
    },
    proveTree() {
      return require(`../img/tree${this.treeInfo.treeGrade}.png`)
    }
  }
}
</script>
<style scoped lang="less">
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
    left: .21rem;
    top: 50%;
    z-index: 2;
    transform: translate(0, -50%);
    width: 6.37rem;
    height: 7.54rem;
    background: url(../img/popup-bg.png) no-repeat center center;
    background-size: 100% 100%;
    .close {
      position: absolute;
      right: -.2rem;
      top: .18rem;
      width: 1.01rem;
      height: 1.05rem;
      background: url(../img/close.png) no-repeat center center;
      background-size: 100% 100%;
    }
    img {
      vertical-align: top;
      width: 100%;
      height: 100%;
    }
    .tree {
      .title1 {
        margin: 1.45rem 0 0 1.13rem;
        width: 4.32rem;
        height: .59rem;
      }
      .title2 {
        margin: .1rem 0 0 2.13rem;
        width: 2.27rem;
        height: .26rem;
      }
      .body {
        height: 2.64rem;
        margin: .2rem 0;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        .preveTree {
          display: flex;
          align-items: flex-end;
          width: 1.82rem;
          height: 2.5rem;
          img {
            vertical-align: bottom;
            height: 100%;
          }
        }
        .right-arrows {
          margin: 0 .1rem .6rem;
          width: .51rem;
          height: .44rem;
        }
        .nextTree {
          display: flex;
          align-items: flex-end;
          width: 2.11rem;
          height: 2.5rem;
          img {
            vertical-align: bottom;
            height: 100%;
          }
        }
      }
      .btn {
        margin: .2rem 0 0 1.53rem;
        width: 3.52rem;
        height: 1.3rem;
        background: url(../img/sign-btn-bg.png) no-repeat center center;
        background-size: 100% 100%;
        img {
          margin: .2rem 0 0 .8rem;
          width: 1.91rem;
          height: .58rem;
        }
      }
  
    }
    .get-award {
      .title {
        margin: 1.71rem 0 0 1.44rem;
        width: 3.74rem;
        height: .6rem;
      }
      .award {
        position: absolute;
        top: 1.9rem;
        left: 1.22rem;
        width: 4.18rem;
        height: 3.73rem;
        background: url(../img/light.png) no-repeat center center;
        background-size: 100% 100%;
        text-align: center;
        .group {
          position: absolute;
          left: 50%;
          top: 58%;
          transform: translate(-50%, -50%);
          img {
            width: 1.92rem;
            height: auto;
          }
          p {
            margin-top: .05rem;
            color: #CD4211;
            font-size: .36rem;
            font-weight: bold;
          }
        }
      }
      .btns {
        position: absolute;
        top: 5.7rem;
        left: .83rem;
        display: flex;
        justify-content: flex-start;
        align-items: flex-end;
        .cancel {
          width: 2.29rem;
          height: 1.01rem;
          margin-right: .27rem;
          background: url(../img/btn3.png) no-repeat center bottom;
          background-size: 100% 100%;
          img {
            margin: .21rem 0 0 .47rem;
            width: 1.36rem;
            height: .42rem;
          }
        }
        .confirm {
          width: 2.29rem;
          height: .98rem;
          background: url(../img/btn1.png) no-repeat center bottom;
          background-size: 100% 100%;
          img {
            margin: .2rem 0 0 .48rem;
            width: 1.33rem;
            height: .42rem;
          }
        }
      }
    }
    .accident {
      .title1 {
        margin: 1.73rem 0 0 2.34rem;
        width: 1.82rem;
        height: .85rem;
      }
      .title2 {
        margin: .1rem 0 0 1.65rem;
        width: 3.25rem;
        height: .61rem;
      }
      .award {
        height: 2.26rem;
        text-align: center;
        img {
          margin-top: .3rem;
          width: 1.64rem;
          height: 1.41rem;
        }
        p {
          margin-top: .05rem;
          color: #CD4211;
          font-size: .36rem;
          font-weight: bold; 
        }
      }
      .btn {
        margin: 0 0 0 1.53rem;
        width: 3.52rem;
        height: 1.3rem;
        background: url(../img/btn1.png) no-repeat center center;
        background-size: 100% 100%;
        img {
          margin: .2rem 0 0 1.05rem;
          width: 1.43rem;
          height: .57rem;
        } 
      }
    }
    .no-water {
      .title {
        margin: 1.48rem 0 0 1.45rem;
        width: 3.69rem;
        height: 1.48rem;
      }
      .icon {
        margin: .32rem 0 0 2.9rem;
        width: .63rem;
        height: .87rem;
      }
      .title2 {
        margin: .3rem 0 0 1.27rem;
        width: 4rem;
        height: .5rem;
      }
      .btn {
        margin: .6rem 0 0 1.53rem;
        width: 3.52rem;
        height: 1.3rem;
        background: url(../img/btn1.png) no-repeat center center;
        background-size: 100% 100%;
        img {
          margin: .24rem 0 0 .83rem;
          width: 1.91rem;
          height: .58rem;
        }
      }
    }
    .manure {
      .title {
        margin: 1.36rem 0 0 1.69rem;
        width: 3.2rem;
        height: .86rem;

      }
      .items {
        margin: .1rem 0 0 .77rem;
        display: flex;
        justify-content: flex-start;
        .item {
          width: 2.46rem;
          background: url(../img/card-bg.png) no-repeat center top;
          background-size: 100% 3.3rem; 
          .title2 {
            margin: .67rem 0 0 .35rem;
            width: 1.77rem;
            height: .54rem;
            background: url(../img/manure-title2.png) no-repeat center center;
            background-size: 100% 100%; 
            font-size: .22rem;
            text-align: center;
            line-height: .5rem;
            color: #fff;
            font-weight: bold;
          }
          .icon {
            margin-top: -.1rem;
            height: 1.56rem;
          }
          .numer {
            margin-top: -.1rem;
            text-align: center;
            font-size: .28rem;
            color: #fff;
            font-weight: bold;
          }
          .btn {
            margin: .3rem auto ;
            background: url(../img/btn1.png) no-repeat center center;
            background-size: 100% 100%; 
            width: 2.3rem;
            height: .98rem;
            &.no {
              background: url(../img/buyend.png) no-repeat center center;
              background-size: 100% 100%; 
            }
          }
        }
        .item1 {
          .icon {
            margin-left: .67rem;
            width: 1.17rem;
          }
          .btn {
            img {
              margin: .2rem 0 0 .52rem;
              width: 1.24rem;
              height: .42rem;
            }
          }
        }
        .item2 {
          .icon {
            margin-left: .32rem;
            width: 1.88rem;
          }
         .btn {
            img {
              margin: .2rem 0 0 .45rem;
              width: 1.37rem;
              height: .42rem;
            }
          }
        }
      }
      .tips {
        text-align: center;
        font-weight: bold;
        font-size: .22rem;
        color: #9D694C;
      }
    }
  }
}
</style>