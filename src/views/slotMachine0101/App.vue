<template>
  <div class="big">
    <div class="snow">
      <img src="./images/backgroundsnow.png"></div>
    <div class="container">
      <div class="top">
        <div class="back" @click="back">
          <div>返回</div>
        </div>
        <div class="rule" @click="showPop(0)">
          <div>规则</div>
        </div>
        <div class="rank" @click="gotoRank">
          <img src="./images/cup.png">
          <div>排行榜</div>
        </div>
        <div class="myprize" @click="showPop(1)">
          <img src="./images/christmas-present.png" alt="">
          <div>我的奖励</div>
        </div>
        <div class="active-time">
          <span style="white-space: nowrap;">活动时间：2019年12月25日-2020年1月1日</span>
        </div>
        <div class="main-title">
          <img src="./images/main-title.png" alt="">
        </div>
        <div class="vice-title">
          <img src="./images/vice-title.png" alt="">
        </div>
      </div>
      <game @gotowave="gotowave"></game>
      <prize @openprize='checkPrizeInfo'></prize>
      <!--<bottom></bottom>-->
    </div>
    <congratulation v-show="false"></congratulation>
    <drop-down ref="dropDown" :rules-explain="rulesExplain" @show-eggs-info="showDefaultEggs()"></drop-down>
    <com-pop :pop-type="popType" :prize-info-type="prizeInfoType" :wave-prize-info-type="wavePrizeInfoType"
             :rule-time="time" :prize-info-list=" prizeInfoList" :award-data="awardData"
             :max-can-select-limit="maxCanSelectLimit" ref="comPop" :jinbinum="jinbinum" @close="popType=0" @gotowavedirect="gotowavedirect"></com-pop>
  </div>
</template>


<script>
  import game from './component/game'
  import prize from './component/prize'
  import bottom from './component/bottom'
  import pop from './component/popup'
  import congratulation from './component/congratulation'

  export default {
    data() {
      return {
        showRule: false,
        prizeshow: true,
        num: '',
        time: '2019年12月25日-2020年1月1日',
        popType: 0,//0 规则 1我的奖励 2奖品信息 3抽奖弹窗
        prizeInfoType: 0,//0 特等奖 1 一等奖 2 二等奖 3 三等奖 4 参与奖
        wavePrizeInfoType: 0,//0 游戏币不足 1. 切换投注额度 2中奖弹窗
        awardData: null,//摇中奖品数据
        maxCanSelectLimit: 0,
        jinbinum:0,//点击领取获得金币数
        prizeInfoList: [
          [{
            awardType: 'jdk',
            awardName: '京东券1000元'
          }, {
            awardType: 'hfq',
            awardName: '话费券800元'
          }],
          [{
            awardType: 'jdk',
            awardName: '京东券500元'
          }, {
            awardType: 'jdk',
            awardName: '京东券300元'
          }, {
            awardType: 'hfq',
            awardName: '话费券250元'
          }, {
            awardType: 'jdk',
            awardName: '京东券250元'
          }],
          [{
            awardType: 'jdk',
            awardName: '京东券200元'
          }, {
            awardType: 'hfq',
            awardName: '话费券188元'
          }, {
            awardType: 'jdk',
            awardName: '京东券100元'
          }, {
            awardType: 'hfq',
            awardName: '话费券100元'
          }, {
            awardType: 'hfq',
            awardName: '话费券70元'
          }, {
            awardType: 'jdk',
            awardName: '京东券70元'
          }],
          [{
            awardType: '',
            awardName: ''
          }, {
            awardType: 'hfq',
            awardName: '话费券50元'
          }, {
            awardType: 'jdk',
            awardName: '京东券40元'
          }, {
            awardType: 'jdk',
            awardName: '京东券30元'
          }, {
            awardType: '',
            awardName: ''
          }, {
            awardType: 'hfq',
            awardName: '话费券23元'
          }, {
            awardType: 'jdk',
            awardName: '京东券23元'
          }, {
            awardType: 'jdk',
            awardName: '京东券20元'
          }, {
            awardType: 'hfq',
            awardName: '话费券20元'
          }],
          [{
            awardType: 'yg',
            awardName: '鱼干50g'
          }, {
            awardType: 'jdk',
            awardName: '京东券1元'
          }, {
            awardType: 'hfq',
            awardName: '话费券0.5元'
          }, {
            awardType: 'jdk',
            awardName: '京东券0.4元'
          }, {
            awardType: 'hfq',
            awardName: '话费券0.4元'
          }, {
            awardType: 'jyz',
            awardName: '金叶子500'
          }]
        ]
      }
    },
    methods: {
      checkPrizeInfo(type) {
        this.popType = 2;
        this.prizeInfoType = parseInt(type)
        this.$refs.comPop.showPop()
      },
      closeprize: function (e) {
        this.prizeshow = e
      },
      close: function (e) {
        this.showRule = e
      },
      back() {//返回

      },
      gotoRank() {//去排行榜
      },
      showPop(type) {//展示弹窗
        this.popType = type;
        setTimeout(() => {
          this.$refs.comPop.showPop()
        })
      },
      gotowave(num){
        this.popType = 3;
        this.wavePrizeInfoType=2;
        this.awardData={
          awardType: 'hfq',
          awardName: '话费券0.5元'
        }
        this.$refs.comPop.showPop()
      },
      gotowavedirect(){
        this.popType = 3;
        this.wavePrizeInfoType=2;
        this.awardData={
          awardType: 'jyz',
          awardName: '话费券0.5元'
        }
        this.$refs.comPop.showPop()
      }
    },
    components: {
      game,
      prize,
      bottom,
      pop,
      congratulation,
      comPop: () => import('./component/comPop'),
      dropDown: () => import('./component/dropDown')
    }
  }
</script>

<style scoped type="less">
  @import '../../common/css/base.css';

</style>
<style scoped type="less">

  .container {
    position: absolute;
    top: 0;
    height: 15rem;
  }

  .top {
    width: 7.2rem;
    height: 1.44rem;
  }

  .big {
    width: 7.2rem;
    height: 15rem;
    background: rgba(237, 36, 55, 1);
  }

  .snow {
    /* position: absolute;

    top: 1.17rem; */
  }

  .snow img {
    width: 7.2rem;
    height: 8.69rem;
    /* position: absolute;
    height: -1.17rem; */
  }

  .top span {
    text-align: center;
    display: block;
    /* position: relative;
    top: 1rem; */
  }

  .active-time {
    position: absolute;
    top: 0.3rem;
    left: 1.59rem;
    width: 3.97rem;
    height: 0.2rem;
    font-size: 0.2rem;
    font-family: PingFang SC;
    /* font-weight:bold; */
    color: rgba(255, 255, 255, 1);

  }

  .main-title {
    position: absolute;
    left: 1.16rem;
    top: 0.59rem;
    /* margin-top: 0.09rem; */
  }

  .main-title img {
    height: 1.66rem;
    width: 4.73rem;
  }

  .vice-title {
    position: absolute;
    z-index: 5;
    top: 1.95rem;
    left: 1.65rem;
  }

  .vice-title img {
    width: 3.55rem;
    height: 0.82rem;
  }

  .back {
    background: url("./images/left.png");
    background-size: 100% 100%;
    width: 0.98rem;
    height: 0.48rem;
    position: absolute;
    top: 0.16rem;
    display: flex;
    align-items: center;
  }

  .back div {
    /* width:0.45rem;
  height:0.23rem; */
    font-size: 0.24rem;
    font-family: PingFang SC;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    /* line-height:0.14rem; */
    margin: 0 auto;

  }

  .rule {
    background: url("./images/left.png");
    background-size: 100% 100%;
    width: 0.98rem;
    height: 0.48rem;
    position: absolute;
    top: 0.88rem;
    display: flex;
    align-items: center;
  }

  .rule div {
    /* width:46px;
  height:23px; */
    margin: 0 auto;
    font-size: 0.24rem;
    font-family: PingFang SC;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    /* line-height:14px; */
  }

  .rank {
    background: url("./images/right.png");
    background-size: 100% 100%;
    width: 1.44rem;
    height: 0.49rem;
    position: absolute;
    top: 0.15rem;
    left: 5.76rem;
    display: flex;
    align-items: center;
  }

  .rank div {
    /* width:0.70rem;
  height:0.23rem; */
    font-size: 0.24rem;
    font-family: PingFang SC;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    line-height: 0.14rem;
    position: absolute;
    left: 0.49rem;
  }

  .rank img {
    display: flex;
    width: 0.28rem;
    height: 0.27rem;
    position: absolute;
    left: 0.15rem;

    top: 50%;
    transform: translateY(-50%);
  }

  .myprize {
    background: url("./images/right2.png");
    display: flex;
    background-size: 100% 100%;
    width: 1.59rem;
    height: 0.49rem;
    position: absolute;
    top: 0.87rem;
    right: 0;
    z-index: 5;
    align-items: center;
  }

  .myprize img {
    width: 0.25rem;
    height: 0.29rem;
    position: absolute;
    left: 0.16rem;
    top: 50%;
    transform: translateY(-50%);
  }

  .myprize div {
    /* width:0.94rem; */
    /* height:0.23rem; */
    font-size: 0.24rem;
    font-family: PingFang SC;
    font-weight: bold;
    color: rgba(237, 36, 55, 1);
    line-height: 0.14rem;
    position: absolute;
    left: 0.45rem;

  }
</style>
<!--<template>
  <div class="slot-machine">
    <div class="container">
      <div class="btns">
        <div class="back" @click="back"></div>
        <div class="openRule" @click="openRule"></div>
      </div>
      <horn :hornList="hornList"></horn>
      <animation :animationList="animationList" :userInfo="userInfo" @refersh="_getUserInfo"/>
    </div>
    <div class="bg">
      <img src="./images/bg.png" alt="">
    </div>
    <slot-Machine-rule v-model="showRule" :userInfo="userInfo"/>
  </div>
</template>
<script>
// import Services from './services/services'
// import _get from 'lodash.get'
// export default {
//   name: 'slotMachine',
//   data: () => ({
//     userInfo: {
//       beginDate: '',
//       endDate: '',
//       nextStage: '',
//       nextStageRecharge: '',
//       recharge: ''
//     },
//     hornList: [1,2,3,4,5,6],
//     animationList: [],
//     nextStage: 3,
//     showRule: false
//   }),
//   components: {
//     animation: () => import('./component/animation'),
//     slotMachineRule: () => import('./component/slotMachineRule'),
//     horn: () => import('./component/horn')
//   },
//   methods: {
//     _getUserInfo() {
//       Services.getUserInfo().then(res=> {
//         let {code, data, message} = _get(res, 'data', '')
//         if(code === 200) {
//           this.userInfo = _get(res, 'data.data',[])
//           this.animationList = _get(res, 'data.data.playProgressList',[])
//         }else {
//           this.$toast.show({
//             message: message,
//             duration: 1500
//           });
//         }
//       })
//     },
//     _getHornList() {
//       Services.getHornList().then(res => {
//         let {code, data, message} = _get(res, 'data', '')
//         if(code === 200) {
//           this.hornList = data
//         }else {
//           this.$toast.show({
//             message: message,
//             duration: 1500
//           });
//         }
//         console.log('hornlist的数据',data)
//       })
//     },
//     _runAnimation() {},
//     /** 打开规则 **/
//     openRule() {
//       this.showRule = true
//       GLOBALS.marchSetsPoint('A_H5PT0203002128')
//     },
//     /** 返回 **/
//     back() {
//       history.back(-1)
//       GLOBALS.marchSetsPoint('A_H5PT0203002127')
//     }
//   },
//   mounted () {
//     this._getUserInfo()
//     this._getHornList()
//     GLOBALS.marchSetsPoint('A_H5PT0203002126')
//   }
// }
// </script>

// <style scoped type="less">
// @import '../../common/css/base.css';
// </style>

// <style lang="less" scoped>
// .slot-machine {
//   position: relative;
//   min-height: 100vh;
//   background: #800508;
//   .container {
//     position: absolute;
//     left: 0;
//     top: 0;
//     width: 100%;
//     z-index: 2;
//     .btns {
//       position: absolute;
//       left: 0;
//       top: 0;
//       .back {
//         width: .6rem;
//         height: 1.3rem;
//         background: url(./images/back-btn.png) no-repeat center center / 100% 100%;
//       }
//       .openRule {
//         width: .6rem;
//         height: 1.3rem;
//         background: url(./images/rule.png) no-repeat center center / 100% 100%;
//       }
//     }
//   }
//   .bg {
//     position: absolute;
//     left: 0;
//     top: 0;
//     width: 100%;
//     z-index: 1;
//     img {
//       vertical-align: top;
//       width: 100%;
//     }
//   }
// }
// </style>
