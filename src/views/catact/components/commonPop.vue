<template>
  <section class="commonPop" @touchmove.prevent :class="{type4:isEnd&&myInfo.state==2,type1:isEnd&&myInfo.state==1,type2:isEnd&&myInfo.state==0,type3:isEnd&&myInfo.state==3}">
    <div class="pop-mask" v-if="isShowPop" @touchmove.prevent>
    </div>
    <transition name="scalc">
      <div class="pop" v-if="isShowPop && !isEnd">
        <div class="wrap">
          <div class="main">
            <ul class="awards-list">
              <li :class="item.awardsType" v-for="(item,index) in awardsList" :key="index" style="height: 2rem;align-items: center;justify-content: space-around">
                <img src="../pages/images/pop/awards/leaf.png" alt="" v-if="item.awardsType==1" style="width: 1.52rem;">
                <img src="../pages/images/pop/awards/huafei.png" alt="" v-else-if="item.awardsType==10">
                <img src="../pages/images/pop/awards/fish.png" alt="" v-else-if="item.awardsType==26">
                <span>{{item.awardsName}}</span>
              </li>
            </ul>
          </div>
          <div class="hit-egg-btn" @click="getMore" v-if="haveGif"></div>
          <div class="get-cz-btn" @click="closePop" v-else></div>
        </div>
        <div class="close-icon" @click="closePop"></div>
      </div>
      <div class="pop" v-if="isShowPop && isEnd">
        <div class="wrap end-wrap" :class="{type4:myInfo.state==2,type1:myInfo.state==1,type2:myInfo.state==0,type3:myInfo.state==3}">
          <div class="main">
            <template v-if="myInfo.state==0">
              <p>
                您在此次活动排行榜中未能成功上榜，<br>
                与奖励擦肩而过啦~
              </p>
              <ul class="awards-list">
                <li><img src="../pages/images/pop/awards/loss.png" alt="" class="maobi"></li>
              </ul>
            </template>
            <template  v-else-if="myInfo.state==1||myInfo.state==3">
              <p>
                您在此次活动排行榜中排名第{{myInfo.rankInfo.rank}}，<br>
                请收下您的奖励
              </p>
              <ul class="awards-list">
                <li><img src="../pages/images/pop/awards/maobi.png" alt="" class="maobi"></li>
                <li><span>{{myInfo.rankInfo.currentAwards}}</span></li>
              </ul>
              <p v-if="myInfo.state==3" style="margin-top: .14rem">
                您累计4天完成当日所有任务，<br>
                请收下额外奖励
              </p>
            </template>
            <p v-else>
              您累计4天完成当日所有任务，<br>
              请收下额外奖励
            </p>
            <ul class="awards-list" v-if="myInfo.state==2||myInfo.state==3">
              <li><img :src="myInfo.extInfo.awardsImg|filter" class="leaf"></li>
              <li><span>{{myInfo.extInfo.currentAwards}}</span></li>
            </ul>
          </div>
          <div class="btn" v-if="myInfo.state<2">
            <div class="hit-egg-btn shouxia left" :class="{loss:myInfo.state==0}" @click="gotocat"></div>
            <div class="hit-egg-btn shouxia right" :class="{loss:myInfo.state==0}" @click="closePop1"></div>
          </div>
          <div class="hit-egg-btn shouxia" @click="closePop1" v-else></div>
        </div>
        <div class="close-icon" :class="{type4:myInfo.state==2,type1:myInfo.state==1,type2:myInfo.state==0,type3:myInfo.state==3}" @click="closePopend"></div>
      </div>
    </transition>
  </section>
</template>

<script>
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
      default: false
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
      default: ()=>[]
    },
    myRank: {
      type: Number,
      default: 0
    },
    rankSize: {
      type: Number,
      default: 0
    },
    myInfo:{
      type: Object,
      default: ()=>{}
    }
  },
  methods: {
    closePop () {
      this.$emit('close-pop')
    },
    keepHit () {
      this.closePop()
    },
    getMore () {
      GLOBALS.marchSetsPoint('A_H5PT0201002058')//H5平台-撸猫活动-继续领取额外奖励按钮点击(领取最后一天最后一个每日任务奖励触发)
      this.closePop()
      this.$emit('get-more',false)
    },
    closePop1(){
      this.$emit('close-pop')
      this.axios.post('//ops-api.beeplaying.com/ops/api/cat/activity/closePopup')
    },
    gotocat(){
      location.href= `https://wap.beeplaying.com/petcat?channel=${localStorage.getItem('APP_CHANNEL')}`
    },
    closePopend(){
      this.$emit('close-pop')
      this.$emit('closePopend')
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
  &.notisEnd{
    margin-left: -3rem;
  }
  &.type4{
    margin-left: -3.3rem;
  }
  &.type2{
    top: 3rem;
  }
  &.type3{
    top: 0;
  }
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
          padding:2.8rem 0.6rem 0 .26rem;
          width: 6rem;
          height: 7rem;
          background-image: url("../pages/images/pop/awards/bg_rank.png");
        }
        &.type2{
          padding: 1.4rem 0.26rem 0;
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
          width: 6.82rem;
          height:7.52rem;
          background-image: url("../pages/images/pop/awards/bg_extra.png");
        }
        .main {
          .awards-list {
            min-height: 2rem;
          }
          p {
            text-align: center;
            font-size: 0.24rem;
            font-weight:500;
            color:rgba(155,66,1,1);
            line-height: .3rem;
            &.jine{
              font-size:.3rem;
              font-weight:bold;
              color:rgba(155,66,1,1);
            }
          }
        }
        .btn{
          display: flex;
          justify-content: space-around;
          align-items: center;
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
          justify-content: space-around;
          flex-direction: column;
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
              width: 40%;
              &.maobi{
                width: 2.4rem;
              }
              &.leaf{
                width: 30%;
              }
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
        &.shouxia{
          background: url("../pages/images/pop/awards/ok.png");
          background-size: 100% 100%;
          margin: 0.2rem auto 0;
        }
        &.left{
          width: 2rem;
          background: url("../pages/images/pop/awards/use_rightnow.png");
          background-size: 100% 100%;
          &.loss{
            background: url("../pages/images/pop/awards/gocomplete.png");
            background-size: 100% 100%;
          }
        }
        &.right{
          width: 2rem;
          background: url("../pages/images/pop/awards/ok_yellow.png");
          background-size: 100% 100%;
          &.loss{
            background: url("../pages/images/pop/awards/ok1.png");
            background-size: 100% 100%;
          }
        }
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
      &.type1{
        top: 2.3rem;
      }
      &.type2{
        background: url("../pages/images/pop/awards/loss_lose.png") no-repeat center
          center / 100% 100%;
        top: .77rem;
        right: 0;
      }
      &.type4{
        top: 2.5rem;
        right: .7rem;
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
