<template>
  <div class="bestbest">
    <div class="bestbest-container">
      <img src="./images/back.png" alt="" class="back" @click="backHome">
      <div class="horn"></div>
      <div class="rule">活动攻略</div>
      <div class="myprize">奖励</div>
      <img src="./images/mine.png" alt="" class="mine">
      <div class="bestbest-person">
        <!--<img src="./images/playbtn.png" alt="">-->
        <!--<img src="./images/prizebtn.png" alt="">-->
        <img src="./images/overbtn.png" alt="">
      </div>
      <div class="best-num">抽签次数：<i>888次</i></div>
    </div>
    <div class="downbtn" :class="{moreprize:moreprize}" @click="showPackages=true" v-if="!showPackages">
      <!--<div class="item">连续参与3天即可<i>免费抽取高额奖励</i>上上签！</div>-->
      <!--<div class="item">XX日0点开启！</div>-->
      <div class="item" :class="{moreprize:moreprize}">高额奖励上上签,<i>最高抽取150元京东卡！</i></div>
      <div class="item" :class="{moreprize:moreprize}">查看大家手气>></div>
    </div>
    <div class="pop-mask" v-if="showPackages" @touchmove.prevent></div>
    <transition name="fade">
      <div class="drop-down" v-if="showPackages">
        <p>购买下列礼包可获得抽签次数</p>
        <div class="packages">
          <div class="item" v-for="(item,index) in 3">
            <img :src="`${require(`./images/package${index}.png`)}`" alt="">
            <span
              class="item-text">{{item.content.split('+')[0]}}<br/>+{{item.content.split('+')[1]}}</span>
            <a href="javascript:" class="btn-price">￥{{item.price}}</a>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  export default {
    name: 'tree',
    data: () => ({
      moreprize: false,
      showPackages: false,
      leaguePacksListArr:[{
        content:'1次抽签机会+2000金叶子',
        price:2
      },{
        content:'1次抽签机会+2000金叶子',
        price:2
      },{
        content:'1次抽签机会+2000金叶子',
        price:2
      }]
    }),
    components: {},
    computed: {},
    methods: {
      backHome() {
        window.location.href = "//wap.beeplaying.com/xmWap/#/"
      },
      /** 获取活动信息 **/
      _getInfo() {
        // Services.getInfo().then(res=> {
        //   // res = {data: {"code":200,"data":{"state":1,"beginDate":"2020-02-28 10:23:33","endDate":"2020-03-08 23:59:59","timeline":"2020年2月28日-2020年3月8日","countdown":null,"userTreeInfoRsp":{"awardId":744,"treeGrade":12,"treeWaterNum":1931,"awardStatus":0,"userWaterNum":null},"waterNum":8214004,"fertilizerNum":100000},"message":null}}
        //   let {code, data, message} = _get(res, 'data')
        //   if(code == 200) {
        //     this.userInfo = _get(res, 'data.data', {})
        //     this.treeInfo = _get(res, 'data.data.userTreeInfoRsp')
        //     this.status = _get(res, 'data.data.userTreeInfoRsp.currTreeGrade', 0)
        //     this.awardUrl = _get(res, 'data.data.awardUrl', '')
        //     let activities_status = _get(res, 'data.data.state')
        //     /** 树木收获状态 **/
        //     if(!!this.treeInfo && this.treeInfo.awardStatus == 1) {
        //       this.showTreeFinish = true
        //     }else {
        //       this.showTreeFinish = false
        //     }
        //     if(activities_status == 0) {
        //       this.$toast.show({message: '当前活动尚未开始'})
        //       return
        //     }
        //     if(activities_status == 2) {
        //       this.$toast.show({message: '当前活动已经结束'})
        //       return
        //     }
        //     /** 用户尚未领取种子 **/
        //     if(!this.treeInfo) {
        //       this._getAwardList()
        //     }
        //   }
        // })
      },
      init() {
        this._getInfo()
      }
    },
    mounted() {
      this.init()
      // GLOBALS.marchSetsPoint('P_H5PT0247')
    }
  }
</script>
<style scoped lang="less">
  @import '../../common/css/base.css';

  * {
    box-sizing: border-box;
  }

  .bestbest {
    min-height: 100vh;
    background: #D52B42;
    .bestbest-container {
      width: 100%;
      height: 13.01rem;
      background: url("./images/bg.png");
      background-size: 100% 100%;
      position: relative;
      padding-top: 2.14rem;
      box-sizing: border-box;
      .back {
        width: .5rem;
        height: .5rem;
        position: absolute;
        top: .12rem;
        left: .23rem;
      }
      .mine {
        width: .81rem;
        height: 1.83rem;
        position: absolute;
        top: 6.41rem;
        right: .29rem;
      }
      .horn {
        width: 3.95rem;
        height: .44rem;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        margin: auto;
        background: url("./images/horn.png");
        background-size: 100% 100%;
      }
      .rule, .myprize {
        width: .55rem;
        height: 1.31rem;
        background: rgba(156, 28, 43, 1);
        border-radius: .28rem;
        font-size: .24rem;
        font-weight: bold;
        color: rgba(52, 8, 12, 1);
        position: absolute;
        right: .2rem;
        padding: 0 .15rem;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        line-height: .3rem;
        &.rule {
          top: .53rem
        }
        &.myprize {
          height: 1.06rem;
          top: 2.03rem
        }
      }
      &:before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        height: 11.25rem;
        background: url("./images/decoration.png");
        background-size: 100% 100%;
      }
      .bestbest-person {
        position: relative;
        left: 0;
        right: 0;
        margin: auto;
        width: 5.73rem;
        height: 7.48rem;
        background: url("./images/person.png");
        background-size: 100% 100%;
        img {
          position: absolute;
          left: 2.29rem;
          bottom: 2rem;
          width: 1.21rem;
          height: 1.51rem;
        }
      }
      .best-num {
        height: .6rem;
        font-size: .28rem;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        line-height: .6rem;
        i {
          color: #FFC418;
        }
      }
    }
    .downbtn {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100vw;
      height: 1.04rem;
      background: url('./images/downbtn.png') center center / 100% 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      font-size: .28rem;
      font-weight: bold;
      color: rgba(95, 9, 7, 1);
      padding-top: .1rem;
      box-sizing: border-box;
      i {
        color: #FF3131;
      }
      .item:nth-child(2) {
        margin-top: .1rem;
      }
      &:not(.moreprize):before {
        content: '';
        position: absolute;
        top: -.28rem;
        left: 0;
        right: 0;
        margin: auto;
        width: 1.79rem;
        height: .28rem;
        background: url('./images/uparrow.png') center center / 100% 100%;
      }
      .item.moreprize {
        font-size: .32rem;
        font-weight: bold;
        color: rgba(95, 9, 7, 1);
        i {
          color: #FF1B16;
        }
        &:nth-child(2) {
          font-size: .24rem;
          font-weight: bold;
          text-decoration: underline;
          color: rgba(199, 61, 26, 1);
        }
      }
    }
  }

  .pop-mask {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1;
  }

  .drop-down {
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    z-index: 2;
    .drop-down-content {
      width: 100%;
      height: 4.2rem;
      position: fixed;
      left: 0;
      bottom: 0;
      font-size: 0.2rem;
      z-index: 12;
      padding-top: .11rem;
      box-sizing: border-box;
      background: url('./images/packages.png') center center / 100% 100%;
      .d-tab {
        border-radius: 0.4rem 0.4rem 0 0;
        overflow-y: hidden;
        width: 100%;
        height: 0.75rem;
        position: relative;
        z-index: 15;
        -webkit-transform: translateZ(0);
        ul {
          height: 0.75rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
        }
        li {
          text-align: center;
          font-size: 0.3rem;
          color: #FA2D35;
          font-weight: bold;
          &:nth-child(2) {
            font-size: 0.2rem;
            color: rgba(196, 94, 19, 1);
            font-weight: 400;
          }
        }
      }
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s;
  }

  /*低端机型之前的样式会有严重的展示问题，暂且用下面代替*/
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
