<template>
  <div class="tree">
    <div class="tree-status">
      <img class="caver" :class="{'caver-animation': switchStatus}" src="./img/caver.png" alt="">
      <img :class="[`status${status}`, {'tree-animation': switchStatus, 'userGuide': guideStep == 2}]" :src="tressStatusImg" alt="">
    </div>
    <div class="progress" v-if="treeInfo">
      <div class="wrap" :style="{'width': `${ treeInfo.treeWaterProgress || 0}%`}"></div>
    </div>
    <div class="tree-status-tips" v-if="treeInfo && !showTreeFinish">再浇{{ 100 - treeInfo.treeWaterProgress}}%就茂密啦</div>
    <div class="tree-status-tips" v-else>点击下方按钮领取果实吧</div>
    <!-- 即将得到的奖品 -->
    <div class="award" v-if="awardUrl">
      <img :src="awardUrl | filter" alt="">
    </div>
    <!-- 选种子按钮 -->
    <div class="tree-send" v-if="treeInfo && treeInfo.awardStatus == 2" @click="_getAwardList">
      <img src="./img/start-btn.png" alt="">
    </div>
    <!-- 浇水按钮 -->
    <div class="run-btn" :class="{'userGuide': guideStep == 2}" v-else-if="!showTreeFinish" @click="_watering(14)" >
      我的水滴：{{userInfo.waterNum || 0}}g
    </div>
    <!-- 收获按钮 -->
    <div class="tree-finish" v-else @click="_getAward"></div>
    <!-- 返回按钮 -->
    <div class="back" @click="backHome"></div>
    <!-- 规则按钮 -->
    <div class="plant-helper" @click="openRule"></div>
    <!-- 我的收货记录按钮 -->
    <div class="my-price" @click="_getLog"></div>
    <!-- 肥料礼包按钮 -->
    <div class="manure-card" @click="_getCardList"></div>
    <!-- 肥料按钮 -->
    <div class="manure" v-if="!showTreeFinish && (treeInfo && treeInfo.awardStatus != 2)" @click="_watering(15)" >
      <span>x{{userInfo.fertilizerNum || 0}}</span>
    </div>
    <!-- 领水滴 -->
    <div class="get-water" :class="{'userGuide': guideStep == 3}" @click="openTask"></div>
    <!-- 活动时间 -->
    <div class="activities-time">
      活动时间: {{userInfo.beginDate | formatTime('y-m-d')}}- {{userInfo.endDate | formatTime('y-m-d')}}
    </div>
    <!-- 浇水动画 -->
    <transition-group tag="ul" class="water-animation" v-on:enter="enter" >
      <li v-for="(item, index) in waterAniamtion" :key="index+item" :_index="index">{{item}}</li>
    </transition-group>
    <!-- Slide -->
    <slide></slide>
    <!-- Task -->
    <task v-model="showTask" @updateWater="updateWater"/>
    <!-- popup -->
    <popup 
      v-model="showPopup" 
      :popupType="popupType"
      :treeInfo="treeInfo"
      :treeFinishAward="treeFinishAward"
      :cardList="cardList"
      @treeUpgrade="treeUpgrade"
      @treeUpgradeAnimation="treeUpgradeAnimation"
      @tryAgen="_getAwardList"
      @checkLog="_getLog"
      @refresh="_getInfo"
      @openTask="openTask"
    />
    <!-- price-log -->
    <price-log v-model="showLog" :logList="logList" />
    <!-- select-seed -->
    <select-seed v-model="showSeed" :treeList="treeList" :treeInfo="treeInfo" @treeCallback="treeCallback" @hideCallback="_getInfo" @awardUrl="receiveAwardUrl"/>
    <!-- show-rule -->
    <rule v-model="showRule"/>
    <!-- newUserGuide -->
    <div class="mask" v-if="guideStep == 2 || guideStep == 3"></div>
    <img class="step2" v-if="guideStep == 2" src="./img/step2.png" alt="" />
    <img class="step3" v-if="guideStep == 3" src="./img/step3.png" alt=""/>
  </div>
</template>
<script>
import Slide from './components/slide'
import Rule from './components/rule'
import SelectSeed from './components/selectSeed'
import PriceLog from './components/price-log'
import Task from './components/task'
import Popup from './components/popup'
import Services from './services/services'
import utils from './components/utils'
import _get from 'lodash.get'
import Velocity from 'velocity-animate'
export default {
  name: 'tree',
  data: ()=>({
    /** 用户信息 **/
    userInfo: {},
    /** 树苗信息 **/
    treeInfo: null,
    /** 是否显示规则 **/
    showRule: false,
    /** 是否显示种子选择 **/
    showSeed: false,
    /** 种子奖励 **/
    treeList: [],
    /** 是否显示任务 **/
    showTask: false,
    /** 显示我的奖励 **/
    showLog: false,
    /** 奖励列表 **/
    logList: [],
    /** 是否显示弹框 **/
    showPopup: false,
    /** 弹框类型 **/
    popupType: 5,
    /** 树的状态 **/
    status: 0,
    /** 浇水动画 **/
    waterAniamtion: [],
    /** 树木成长动画 **/
    switchStatus: false,
    /** 树木收获按钮 **/
    showTreeFinish:false,
    /** 树木收获奖励数据 **/
    treeFinishAward: {},
    /** 是否需要新手引导 **/
    newUserGuide: false,
    step: 0,
    /** 礼包数据 **/
    cardList: [],
    /** 奖品图片 **/
    awardUrl: ''
  }),
  components: {
    Task,
    Popup,
    PriceLog,
    SelectSeed,
    Rule,
    Slide
  },
  computed: {
    tressStatusImg () {
      if(this.status == 0) {
        return ''
      }
      return require(`./img/tree${this.status}.png`)
    },
    guideStep() {
      if(this.newUserGuide) {
        return this.step
      }
      return false
    }
  },
  methods: {
    backHome() {
      window.location.href = "//wap.beeplaying.com/xmWap/#/"
    },
    openTask() {
      if(this.newUserGuide) {
        this.step = 4
        this.newUserGuide = false
      }
      this.showTask = true
      GLOBALS.marchSetsPoint('A_H5PT0247002897')
    },
    openRule() {
      this.showRule = true
      GLOBALS.marchSetsPoint('A_H5PT0247002895')
    },
    treeCallback(data) {
      if(this.newUserGuide) {
        this.step = 2
      }
      this.status = data.currTreeGrade
      this.userInfo.waterNum = data.userWaterNum
      this.treeInfo = data
      GLOBALS.marchSetsPoint('A_H5PT0247002893')
    },
    receiveAwardUrl(data) {
      this.awardUrl = data
    },
    enter(el, done) {
      let index = el.getAttribute('_index')
      let parent = el.parentNode
      Velocity(el,{
        zIndex: 10000 - index,
        opacity: 0,
        bottom: '3rem',
      },{
        duration: 3000,
        delay: 500,
        complete: () => {
          this.waterAniamtion.shift()
          done()
        }
      })
    },
    /** 更新水滴 **/
    updateWater(data) {
      this.userInfo.waterNum = this.userInfo.waterNum + data
    },
    /** 树升级弹框 **/
    treeUpgrade() {
      this.showPopup = true
      this.popupType = 1
    },
    /** 树升级弹框回调 **/
    treeUpgradeAnimation() {
      this.showPopup = false
      this.status = this.treeInfo.currTreeGrade
      this.treeAnimation()
      if(this.newUserGuide) {
        this.step = 3
      }
    },
    /** 树切换动画 **/
    treeAnimation() {
      this.switchStatus = true
      clearTimeout(this.timer)
      this.timer = setTimeout(() =>  {
        this.switchStatus = false
      }, 2800)
    },
    /** 获取活动信息 **/
    _getInfo() {
      Services.getInfo().then(res=> {
        // res = {data: {"code":200,"data":{"state":1,"beginDate":"2020-02-28 10:23:33","endDate":"2020-03-08 23:59:59","timeline":"2020年2月28日-2020年3月8日","countdown":null,"userTreeInfoRsp":{"awardId":744,"treeGrade":12,"treeWaterNum":1931,"awardStatus":0,"userWaterNum":null},"waterNum":8214004,"fertilizerNum":100000},"message":null}}
        let {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.userInfo = _get(res, 'data.data', {})
          this.treeInfo = _get(res, 'data.data.userTreeInfoRsp')
          this.status = _get(res, 'data.data.userTreeInfoRsp.currTreeGrade', 0)
          this.awardUrl = _get(res, 'data.data.awardUrl', '')
          let activities_status = _get(res, 'data.data.state')
          /** 树木收获状态 **/
          if(!!this.treeInfo && this.treeInfo.awardStatus == 1) {
            this.showTreeFinish = true
          }else {
            this.showTreeFinish = false
          }
          if(activities_status == 0) {
            this.$toast.show({message: '当前活动尚未开始'})
            return 
          }
          if(activities_status == 2) {
            this.$toast.show({message: '当前活动已经结束'})
            return 
          }
          /** 用户尚未领取种子 **/
          if(!this.treeInfo) {
            this._getAwardList()
          }
        }
      })
    },
    /** 获取果实类型 **/
    _getAwardList() {
      Services.getAwardList().then(res=> {
        let {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.treeList = data
          this.showSeed = true
        }
      })
    },
    /** 领取树成熟奖励 **/
    _getAward() {
      Services.getAward().then(res=> {
        let {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.popupType = 2
          this.showPopup = true
          this.treeFinishAward = _get(res, 'data.data', {})
        }else {
          this.$toast.show({message})
        }
      })
    },
    /** 浇水施肥 **/
    _watering(type) {
      let parasm = {
        num: type == 14 ? this.userInfo.waterNum >= 100 ? 100 : 10  : 1,
        type
      }
      if(this.newUserGuide) {
        this.step = 0
      }
      if(type == 14 && this.userInfo.waterNum < parasm.num) {
        this.showPopup= true
        this.popupType = 4
        return 
      }
      if(type == 15 && this.userInfo.fertilizerNum < parasm.num) {
        this._getCardList()
        return
      }
      if(this.switchStatus == true) {
        return false
      }
      if(this.lock) {
        return false
      }
      this.lock = true
      Services.watering(parasm).then(res=> {
        this.lock = false
        let {code, data, message} = _get(res, 'data')
        if(code == 200) {
          GLOBALS.marchSetsPoint('A_H5PT0247002894')
          /** 浇水动画 **/
          this.waterAniamtion.push(`+${data.treeAddwaterNum}`)
          /** 更新肥料数量 **/
          this.userInfo.fertilizerNum = _get(res, 'data.data.userFertilizerNum')
          /** 更新水滴数量 **/
          this.userInfo.waterNum = _get(res, 'data.data.userWaterNum')
          /** 更新树信息 **/
          this.treeInfo = _get(res, 'data.data')
          /** 收获弹框 **/
          if(!!this.treeInfo && this.treeInfo.awardStatus == 1) {
            this.showTreeFinish = true
            this.treeAnimation()
            return
          }
          /** 意外惊喜 **/
          if(this.treeInfo.awardConfigRsp) {
            this.showPopup = true
            this.popupType = 3
            return 
          }
          /** 打开晋级窗口 **/
          if(this.treeInfo.treeGrade != this.treeInfo.currTreeGrade){
            this.showPopup = true
            this.popupType = 1
            return
          }
        }else {
          this.$toast.show({message})
        }
      }).catch(error=> {
        this.lock = false
        this.switchStatus = false
      })
    },
    /** 收获列表 **/
    _getLog() {
      Services.getLog().then(res=> {
        let {code, data, message} = _get(res,'data')
        if(code == 200) {
          this.logList = _get(res, 'data.data', [])
          this.showLog = true
          
        }else {
          this.$toast.show({message})
        }
      })
      GLOBALS.marchSetsPoint('A_H5PT0247002896')
    },
    /** 获取新手引导 **/
    _getNewUserGuide() {
      Services.getNewUserGuide().then(res=> {
        let {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.newUserGuide = true
          this.step = 1
        }else {
          this.newUserGuide = false
        }
      })
    },
    /** 获取肥料礼包 **/
    _getCardList() {
      Services.getCardList().then(res=> {
        let {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.cardList = _get(res, 'data.data.leaguePacksList')
          this.showPopup = true
          this.popupType = 5
        }
      })
    },
    init() {
      this._getInfo()
      this._getNewUserGuide()
    }
  },
  mounted() {
    this.init()
    GLOBALS.marchSetsPoint('P_H5PT0247')
  }
}
</script>
<style scoped lang="less">
@import '../../common/css/base.css';
@import url('../../../static/iconfont/iconfont.css');
* {
  box-sizing: border-box;
}
.tree {
  position: relative;
  height: 100vh;
  background: url(./img/bg.png) no-repeat center bottom #54cff7;
  background-size: 100% auto;
  .tree-status {
    position: absolute;
    width: 3.2rem;
    height: 4rem;
    left: 2.1rem;
    bottom: 4.75rem;
    .status1 {
      left: .7rem;
      bottom: -.05rem;
      width: 1.67rem;
    }
    .status2 {
      left: .7rem;
      bottom: 0;
      width: 1.67rem;
    }
    .status3 {
      left: .78rem;
      bottom: -.05rem;
      width: 1.78rem;
    }
    .status4 {
      left: 1rem;
      bottom: .2rem;
      width: 1.18rem;
    }
    .status5 {
      left: .9rem;
      bottom: 0;
      width: 1.58rem;
    }
    .status6 {
      left: .55rem;
      bottom: 0;
      width: 2.16rem;
    }
    .status7 {
      left: .4rem;
      bottom: 0;
      width: 2.57rem;
    }
    .status8 {
      left: .2rem;
      bottom: .1rem;
      width: 2.92rem;
    }
    .status9 {
      left: -.7rem;
      bottom: .1rem;
      width: 4.46rem;
    }
    .status10 {
      left: -.1rem;
      bottom: 0.1rem;
      width: 3.51rem;
    }
    .status11 {
      left: -1rem;
      bottom: .1rem;
      width: 5.4rem;
    }
    .status12 {
      left: -1.1rem;
      bottom: .1rem;
      width: 5.54rem;
    }
    .userGuide{
      z-index: 100;
    }
    img{
      position: absolute;
      z-index: 2;
    }
    .tree-animation {
      animation: tree 3s 1;
    }
    .caver {
      position: absolute;
      left: -1rem;
      bottom: 0rem;
      z-index: 1;
      width: 5.03rem;
      height: 2.28rem;
      background: url(./img/caver.png) no-repeat center center;
      background-size: 100% 100%;
      opacity: 0; 
    }
    .caver-animation {
      animation: caver 3s 1;
    }
    .switch-enter {
      opacity: 0;
    }
    .switch-enter-to {
      opacity: 1;
    }
    .switch-leave {
      opacity: 1;
    }
    .switch-leave-to {
      opacity: 0;
    }
    .switch-enter-active,.switch-leave-active {
      transition: all 2s;
    }
  }
  .progress {
    padding: .05rem;
    position: absolute;
    left: 50%;
    bottom: 4.66rem;
    z-index: 5;
    width: 3.27rem;
    height: .28rem;
    border-radius: .14rem;
    background: #77330C;
    transform: translate(-50%, 0);
    .wrap {
      width: 0%;
      height: 100%;
      border-radius: .14rem;
      background: #FFE23F;
    }
  }
  .tree-status-tips {
    position: absolute;
    left: 50%;
    bottom: 4.3rem;
    transform: translate(-50%, 0);
    text-align: center;
    color: #FFFFFF;
    text-shadow: 0 0 4px #77330C;
    // -webkit-text-stroke: 2.4px #000000;
  }
  .run-btn {
    padding-top: 1.16rem;
    position: absolute;
    left: 50%;
    bottom: 1.96rem;
    width: 3.66rem;
    height: 1.7rem;
    border-radius: .14rem;
    background: url(./img/go-water-btn.png) no-repeat center bottom ;
    background-size: 100% auto;
    transform: translate(-50%, 0);
    text-align: center;
    font-size: .24rem;
    color: #fff;
    &.userGuide{
      z-index: 99;
      box-shadow: 0 0 0 999px rgba(0,0,0,.7)
    }
  }
  .award {
    position: absolute;
    left:1rem;
    bottom: 7.6rem;
    width: 1.51rem;
    height: 1.26rem;
    z-index: 10;
    background: url(./img/award-bg.png) no-repeat center center;
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: .73rem;
      height: auto;
    }
  }
  .tree-finish {
    padding-top: 1.16rem;
    position: absolute;
    left: 50%;
    bottom: 2.4rem;
    width: 3.52rem;
    height: 1.3rem;
    border-radius: .14rem;
    background: url(./img/tree-finish.png) no-repeat center bottom ;
    background-size: 100% auto;
    transform: translate(-50%, 0);
  }
  .tree-send {
    position: absolute;
    left: 50%;
    bottom: 2.4rem;
    width: 3.52rem;
    height: 1.3rem;
    border-radius: .14rem;
    background: url(./img/sign-btn-bg.png) no-repeat center bottom ;
    background-size: 100% auto;
    transform: translate(-50%, 0);
    img {
      margin: .21rem 0 0 .8rem;
      width: 1.92rem;
      height: .57rem;
    }
  }
  
  .back {
    position: absolute;
    left: .12rem;
    top: 0;
    z-index: 6;
    width: 1.16rem;
    height: 1.3rem;
    background: url(./img/back.png) no-repeat center center;
    background-size: 100% auto;
  }
  .plant-helper {
    position: absolute;
    right: .12rem;
    top: .14rem;
    z-index: 6;
    width: 1.24rem;
    height: 1.24rem;
    background: url(./img/rule-icon.png) no-repeat center center;
    background-size: 100% 100%;
  }
  .my-price {
    position: absolute;
    right: 1.6rem;
    top: .14rem;
    z-index: 6;
    width: 1.24rem;
    height: 1.24rem;
    background: url(./img/my-price.png) no-repeat center center;
    background-size: 100% 100%;
  }
  .manure-card {
    position: absolute;
    right: .15rem;
    top: 2.08rem;
    z-index: 6;
    width: 1.24rem;
    height: 1.24rem;
    background: url(./img/manure-card.png) no-repeat center center;
    background-size: 100% 100%;
  }
  .manure {
    position: absolute;
    left: 0;
    bottom: 5rem;
    width: 1.6rem;
    height: 1.6rem;
    background: url(./img/manure.png) no-repeat center center;
    background-size: 100% 100%;
    font-size: .32rem;
    color: #fff;
    text-align: center;
    padding-top: 1.1rem;
    font-weight: bold;
    -webkit-text-stroke-width: 1px;
    -webkit-text-stroke-color: #027F9E;
  }
  .get-water {
    position: absolute;
    right: 0;
    bottom: 3.13rem;
    width: 1.6rem;
    height: 1.6rem;
    background: url(./img/water.png) no-repeat center center;
    background-size: 100% 100%;
    &.userGuide {
      z-index: 99;
      box-shadow: 0 0 0 999px rgba(0,0,0,.7);
      border-radius: 50%;
    }
  }
  .activities-time {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0);
    width: 5.11rem;
    height: .6rem;
    line-height: .6rem;
    background: url(./img/activities-time.png) no-repeat center center;
    background-size: 100% 100%;
    text-align: center;
    font-size: .24rem;
    color: #fff;
  }
  .water-animation {
    position: absolute;
    right: .3rem;
    bottom: 5.5rem;
    z-index: 5;
    li {
      position: absolute;
      right: 0;
      bottom: 0;
      padding: .1rem .5rem;
      background: rgba(0,0,0,.5);
      color: #fff;
      border-radius: .1rem;
      line-height: 1.1;
      background: url(./img/tips.png) no-repeat center center;
      background-size: 100% 100%;
      &.fade-enter {
        opacity: 1;
        transform: translate(0, 0);
      }
      &.fade-enter-to {
        opacity: 0;
        transform: translate(0, -2rem);
      }
      &.fade-enter-active {
        transition: all 3s .8s;
      }
    }

  }
  .mask {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    z-index: 90;
  }
  .step2 {
    position: absolute;
    left: .6rem;
    bottom: 4rem;
    z-index: 100;
    width: 6.05rem;
    height: 1.32rem;
  }
  .step3 {
    position: absolute;
    left: .6rem;
    bottom: 1.67rem;
    z-index: 100;
    width: 6.05rem;
    height: 1.32rem;
  }
  @keyframes tree {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes caver {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
}
</style>
