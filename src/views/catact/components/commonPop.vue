<template>
  <section class="commonPop" @touchmove.prevent>
    <div class="pop-mask" v-if="isShowPop || haveGif" @touchmove.prevent>
      <img v-if="haveGif" :src="imgUrl" alt="">
    </div>
    <transition :name="haveGif?'scalcLong':'scalc'">
      <div class="pop" v-if="isShowPop && !isEnd">
        <div class="wrap" :class="{'hammer-wrap':popType===3}">
          <div class="main">
            <ul class="awards-list" :class="`length-${awardsList.length}`">
              <li :class="item.awardsType" v-for="(item,index) in awardsList" :key="index">
                <img src="../pages/images/pop/awards/leaf.png" alt="">
                <span>item.awardsName</span>
              </li>
            </ul>
          </div>
          <div class="hit-egg-btn" @click="keepHit()" v-if="popType<3"></div>
          <div class="get-cz-btn" @click="getMore"></div>
        </div>
        <div class="close-icon" @click="closePop"></div>
      </div>
      <div class="pop" v-if="isShowPop && isEnd">
        <div class="wrap end-wrap" :class="{type1:true}">
          <div class="main">
            <p>
              您在此次活动排行榜中排名第1，<br>
              请收下您的奖励
            </p>
            <ul class="awards-list" :class="`length-${awardsList.length}`">
              <li :class="item.awardsType" v-for="(item,index) in awardsList" :key="index">
                <span>{{item.awardsName}}</span>
              </li>
            </ul>
            <p v-if="myRank&&myRank<=rankSize">恭喜您排名{{myRank}}，获得以上奖品</p>
            <p v-if="myRank>rankSize||!myRank">您排名{{myRank?myRank:'1000+'}}，<br>{{rankSize}}名以外不能领取奖励</p>
          </div>
          <div class="hit-egg-btn" @click="closePop">好的</div>
        </div>
        <div class="close-icon" :class="{type1:true}" @click="closePop"></div>
      </div>
    </transition>
  </section>
</template>

<script>
import imgUrl from '../pages/images/common/open-eggs.gif'
export default {
  name: 'commonPop',
  data () {
    return {
      imgUrl: ''
    }
  },
  props: {
    isEnd: {
      type: Boolean,
      default: true
    },
    haveGif: {
      type: Boolean,
      default: false
    },
    isShowPop: {
      type: Boolean,
      default: false
    },
    popType: {
      type: Number,
      default: 0
    },
    awardsList: {
      type: Array,
      default: []
    },
    myRank: {
      type: Number,
      default: 0
    },
    rankSize: {
      type: Number,
      default: 0
    }
  },
  watch: {
    haveGif (val) {
      if (val) {
        this.imgUrl = imgUrl + '?' + Date.now()
      }
    }
  },
  methods: {
    closePop () {
      switch (this.popType) {
        case 2:
          GLOBALS.marchSetsPoint('A_H5PT0075001457')   // H5平台-砸金蛋-恭喜新增锤子弹窗-点击关闭
          break;
        case 3:
          GLOBALS.marchSetsPoint('A_H5PT0075001479')   // H5平台-砸金蛋-砸蛋失败弹窗-点击关闭
          break;

        default:
          GLOBALS.marchSetsPoint('A_H5PT0075001476')   // H5平台-砸金蛋-砸蛋成功弹窗-点击关闭
          break;
      }
      this.$emit('close-pop')
    },
    keepHit () {
      switch (this.popType) {
        case 2:
          GLOBALS.marchSetsPoint('A_H5PT0075001455')   // H5平台-砸金蛋-恭喜新增锤子弹窗-点击立即砸彩蛋
          break;

        default:
          GLOBALS.marchSetsPoint('A_H5PT0075001474')   // H5平台-砸金蛋-砸蛋成功弹窗-点击继续砸彩蛋
          break;
      }
      this.$emit('keep-hit')
    },
    getMore () {
      switch (this.popType) {
        case 2:
          GLOBALS.marchSetsPoint('A_H5PT0075001456')   // H5平台-砸金蛋-恭喜新增锤子弹窗-点击获取更多锤子
          break;
        case 3:
          GLOBALS.marchSetsPoint('A_H5PT0075001478')   // H5平台-砸金蛋-砸蛋失败弹窗-点击获取更多锤子
          break;

        default:
          GLOBALS.marchSetsPoint('A_H5PT0075001475')   // H5平台-砸金蛋-砸蛋成功弹窗-点击获取更多锤子
          break;
      }
      this.$emit('get-more')
    }
  },
  mounted () {
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.commonPop {
  position: fixed;
  top: 1.36rem;
  left: 50%;
  margin-left: -2.8rem;
  z-index: 10;
  .pop-mask {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.55);
    &.have-gif {
      background: rgba(0, 0, 0, 0.55) no-repeat center center / 100% 5.2rem;
      animation: bgChange 1s linear;
    }
    img {
      position: fixed;
      top: 50%;
      left: 50%;
      width: 100%;
      transform: translate(-50%, -50%);
    }
  }
  .pop {
    position: relative;
    z-index: 10;
    .wrap {
      width: 5.96rem;
      height: 7rem;
      background: no-repeat center center / 100% 100%;
      background-image: url("../pages/images/common/bg.png");
      margin: 0 auto;
      box-sizing: border-box;
      padding: 3rem 0.26rem 0;
      &.end-wrap {
        &.type1{
          padding: 2.8rem 0.26rem 0;
          width: 6rem;
          height: 7rem;
          background-image: url("../pages/images/pop/awards/bg_rank.png");
        }
        &.type2{
          padding: 1.2rem 0.26rem 0;
          width: 5.58rem;
          height: 5.66rem;
          background-image: url("../pages/images/pop/awards/bg_rank_loss.png");
        }
        &.type3{
          width: 5.96rem;
          height:10.16rem;
          background-image: url("../pages/images/pop/awards/bg_rank_extra.png");
        }
        &.type4{
          width: 5.96rem;
          height:7rem;
          background-image: url("../pages/images/pop/awards/bg_rank_extra.png");
        }
        .main {
          .awards-list {
            min-height: 2rem;
            &.length-1 {
              li.end-empty {
                max-width: 1.28rem;
                max-height: 1.66rem;
                background-color: transparent;
                background-size: 100% 100%;
                background-image: url("../pages/images/common/end-empty.png");
              }
            }
            &.length-2 {
              li {
                max-width: 1.28rem;
                max-height: 1.28rem;
                background-size: 100% 100%;
                &.jyz {
                  background-image: url("../pages/images/common/jyz-with-bg.png");
                }
                &.jdk {
                  background-image: url("../pages/images/common/jdk-with-bg1.png");
                }
                span {
                  bottom: 0;
                  display: block;
                  text-align: center;
                  height: 0.34rem;
                  line-height: 0.36rem;
                }
              }
            }
          }
          p {
            text-align: center;
            font-size: 0.28rem;
            font-weight: bold;
            color: #c85501;
            min-height: 0.6rem;
          }
        }
      }
      .main {
        font-size: 0.24rem;
        line-height: 0.3rem;
        letter-spacing: 0.02rem;
        font-weight: bold;
        color: #fff;
        .awards-list {
          min-height: 2rem;
          display: flex;
          align-content: center;
          justify-content: center;
          li {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            span {
              display: block;
              color: #c85501;
              width: 100%;
              text-align: center;
              font-size: 0.3rem;
              font-weight: bold;
              white-space: nowrap;
            }
            img{
              width: 60%;
            }
          }
        }
      }
      .get-cz-btn,
      .hit-egg-btn {
        width: 3rem;
        height: 0.9rem;
        margin: 0.5rem auto 0;
      }
      .hit-egg-btn {
        background: url("../pages/images/pop/awards/goongain.png");
        background-size: 100% 100%;
      }
      .get-cz-btn {
        background: url("../pages/images/pop/awards/ok.png");
        background-size: 100% 100%;
      }
    }
    .close-icon {
      width: 0.9rem;
      height: 0.8rem;
      background: url("../pages/images/common/close.png") no-repeat center
        center / 100% 100%;
      position: absolute;
      top: 2.6rem;
      right: .3rem;
      &.type1,&.type4{
        top: 2.3rem;
      }
      &.type2{
        background: url("../pages/images/pop/awards/loss_lose.png") no-repeat center
          center / 100% 100%;
        top: .77rem;
        right: 0;
      }
    }
  }
  .scalc-enter-active {
    animation: fadeAnimation 0.3s ease-in-out;
  }
  .scalcLong-enter-active {
    animation: fadeAnimation 1s ease-in-out;
  }
  @keyframes fadeAnimation {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
}
</style>
