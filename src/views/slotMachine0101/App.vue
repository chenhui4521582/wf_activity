<template>
  <div class="big" :class="{noshowrank:!showRank}">
    <template v-if="actData">
      <div class="snow">
        <img src="./images/backgroundsnow.png"></div>
      <div class="container" v-if="!showRank">
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
            <span style="white-space: nowrap;">活动时间:{{actData.timeline}}</span>
          </div>
          <div class="main-title">
            <img src="./images/main-title.png" alt="">
          </div>
          <div class="vice-title">
            <img src="./images/vice-title.png" alt="">
          </div>
        </div>
        <game @gotowave="gotowave" :my-info="userData" :act-info="actData" :horn-list="hornList" :award-data="awardData" ref="game"></game>
        <prize @openprize='checkPrizeInfo'></prize>
      </div>
      <profit v-else @back="rankBack" :my-info="userData" :count-down="actData.countdown"></profit>
      <drop-down ref="dropDown" :rules-explain="time" @show-eggs-info="showDefaultEggs()" v-if="!showRank"
                 :my-info="userData" @refresh="refresh"></drop-down>
      <com-pop :pop-type="popType" :prize-info-type="prizeInfoType" :wave-prize-info-type="wavePrizeInfoType"
               :rule-time="time" :award-data="awardData"
               :max-can-select-limit="maxCanSelectLimit" ref="comPop" :jinbinum="jinbinum" @close="popType=0"
               @gotowavedirect="gotowavedirect"></com-pop>
    </template>
    <loading v-show="showLoading"></loading>
  </div>
</template>


<script>
  import Services from './services/services'
  import game from './component/game'
  import prize from './component/prize'
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
        maxCanSelectLimit: null,
        jinbinum: 0,//点击领取获得金币数
        showRank: false,//是否展示排行榜
        actData: null,//活动信息
        userData: null,//用户信息
        awardsLevelItem:null,//选中的档位
        showLoading:false,
        hornList:[]
      }
    },
    methods: {
      getLevelName(showLevel) {
        switch (showLevel) {
          case 1:
            return '参与奖';
            break;
          case 2:
            return '三等奖';
            break;
          case 3:
            return '二等奖';
            break;
          case 4:
            return '一等奖';
            break;
          case 5:
            return '特等奖';
            break;
        }
      },
      checkPrizeInfo(type) {
        this.popType = 2;
        this.prizeInfoType = parseInt(type)
        setTimeout(() => {
          this.$refs.comPop.showPop()
        })
      },
      back() {//返回
        GLOBALS.marchSetsPoint('A_H5PT0229002654')//H5平台-双旦活动页-返回按钮点击
        location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL') || '')
      },
      rankBack(){
        if(this.actData.state==1){
          this.showRank=false
        }else{
          location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL') || '')
        }
      },
      gotoRank() {//去排行榜
        GLOBALS.marchSetsPoint('A_H5PT0229002656') //H5平台-双旦活动页-排行榜按钮点击
        this.showRank = true
      },
      showPop(type) {//展示弹窗
        //A_H5PT0229002655 H5平台-双旦活动页-规则按钮点击
        //A_H5PT0229002658 H5平台-双旦活动页-摇奖记录按钮点击
        let points=['A_H5PT0229002655','A_H5PT0229002658']
        GLOBALS.marchSetsPoint(points[type])
        this.popType = type;
        setTimeout(() => {
          this.$refs.comPop.showPop()
        })
      },
      gotowave({item,popType,wavePrizeInfoType,maxCanSelectLimit,awardData}) {
        this.awardsLevelItem=item
        this.popType = popType;
        this.wavePrizeInfoType=wavePrizeInfoType
        this.maxCanSelectLimit=maxCanSelectLimit
        this.awardData=awardData
        if(wavePrizeInfoType==2){
          this.getUserInfo()
        }
        setTimeout(() => {
          this.$refs.comPop.showPop()
        }, 100)
      },
      async gotowavedirect() {
        this.$refs.game.gotowavedirect()
      },
      async getActInfo() {
        let {code, data} = (await Services.getActInfo()).data
        if (code == 200) {
          GLOBALS.marchSetsPoint('P_H5PT0229', {
            source_address: GLOBALS.getUrlParam('from') || ''
          })//H5平台-双旦活动页面加载完成
          this.actData = data
          this.time = data.beginDate + '-' + data.endDate
          this.showRank = data.state!=1
          this.getUserInfo()
        }
      },
      async getUserInfo() {
        let {code, data} = (await Services.getUserInfo()).data
        if (code == 200) {
          this.userData = data
          this.getHornList()
        }
      },
      async getHornList(){
        let {code, data} = (await Services.getHornList()).data
        if (code == 200) {
          this.hornList = data
        }
      },
      refresh(num){
        this.getUserInfo()
        if(num){
          this.popType = 3;
          this.wavePrizeInfoType = 3;
          this.jinbinum=num
          setTimeout(() => {
            this.$refs.comPop.showPop()
          }, 100)
        }
      }
    },
    components: {
      game,
      prize,
      comPop: () => import('./component/comPop'),
      dropDown: () => import('./component/dropDown'),
      profit: () => import('./component/dropDown/component/profit'),
      loading:()=>import('../../components/common/loading.vue'),
    },
    mounted() {
      this.getActInfo()
    }
  }
</script>
<style lang="less">
  @import '../../common/css/base.css';

  .container {
    position: absolute;
    top: 0;
    /*height: 15rem;*/
  }

  .top {
    width: 7.2rem;
    height: 1.44rem;
  }

  .big {
    width: 7.2rem;
    height: 12.8rem;
    background: rgba(237, 36, 55, 1);
    &.noshowrank {
      padding-bottom: 1.5rem;
    }
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
    z-index: 1;
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
    z-index: 1;
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
