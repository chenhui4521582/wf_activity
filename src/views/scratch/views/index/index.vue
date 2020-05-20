<template>
  <div class="scratch">
    <!-- 返回 -->
    <div class="back-btn" @click="backHome">
      <img class="inner-img" src="./img/back-icon.png" alt="">
    </div>
    <!-- 规则 -->
    <div class="rule-btn" @click="openRule">
      <img class="inner-img" src="./img/rule-icon.png" alt="">
    </div>
    <!-- 攻略 -->
    <div class="strategy-btn" @click="_getBetAward(2)">
      <img class="inner-img" src="./img/strategy-icon.png" alt="">
    </div>
    <!-- 奖励明细 -->
    <div class="prize-btn" @click="_getAwardLog">
      <img class="inner-img" src="./img/price-icon.png" alt="">
    </div>
    <!-- content -->
    <div class="content">
      <div class="scratch-item" v-for="(item, index) in stageConfigList" :key="index">
        <img class="inner-img" :src="item.img" alt="">
        <div class="check-prize" @click="_getBetAward(1)">查看奖励</div>
        <div class="btns">
          <div class="one">
            <div class="text" @click="openScratch(item, 1)">消耗{{item.consumeNum || 0}}个游戏币</div>
            <div class="explain">获得1个随机中级奖励</div>
          </div>
          <div class="ten">
            <div class="text" @click="openScratch(item, 10)">消耗{{item.consumeNum * 10}}个游戏币</div>
            <div class="explain">获得10个随机中级奖励</div>
          </div>
        </div>
        <div class="total">剩余{{userInfo.remnantNum || 0}}个游戏币</div>
      </div>
    </div>
    <!-- footer -->
    <div class="footer">
      <div class="get-coin" @click="openDialog(1)">
        <p>获取游戏币</p>
        <p>剩余{{userInfo.remnantNum || 0}}个</p>
      </div>
      <div class="ranking" @click="openDialog(2)">
        有奖排行榜
      </div>
    </div>
    <!-- rule -->
    <rule v-model="showRule" :info="info" @openBetAward="_getBetAward"/>
    <!-- guide -->
    <guide v-model="showGuide" :guideInfo="info.guideInfo"/>
    <!-- down-popup -->
    <down-popup v-model="showDownPopup" @showPop="openGames" @refresh="refresh"/>
    <!-- popup -->
    <popup 
      v-model="showPopup" 
      :title="popupTitle" 
      :popupStatus="popupStatus" 
      :betAwards="betAwards" 
      :betIndex="betIndex"
      :log="awardLog"
      :scratch="scratch"
      :awardList="awardList"
      :boxArr="boxArr"
      @getAward="_getScratch"
      @openAward="openAward"
    />
  </div>
</template>
<script>
import Popup from './components/popup'
import Guide from './components/guide'
import DownPopup from './components/downPopup'
import Rule from './components/rule'
import Services from '../../services/services'
import utils from '../../components/utils'
import _get from 'lodash.get'
export default {
  name: 'scratch',
  data: ()=>({
    currentIndex: 0,
    info: {},
    showRule: false,
    showGuide: false,
    showDownPopup: null,
    showPopup: false,
    popupTitle: '',
    popupStatus: 0,
    betAwards: [],
    betIndex: 1,
    awardLog: [],
    scratch: {
      times: 0,
      consumeNum: 0
    },
    award: []
  }),
  components: {
    Rule,
    Guide,
    DownPopup,
    Popup
  },
  computed: {
    userInfo () {
      return _get(this.info, 'userInfo', {})
    },
    stageConfigList () {
      let stageConfigList = _get(this.info, 'stageConfigList', [])
      stageConfigList.forEach((item, index) => {
        item.img = require(`./img/item${index}.png`)
      })
      return stageConfigList
    },
    boxArr () {
      let arr = {}
      for(let i =0; i < this.award.length; i++) {
        if(arr[this.award[i].level]) {
          arr[this.award[i].level].times++
        }else {
          arr[this.award[i].level] = {}
          arr[this.award[i].level].times = 1
        }
        switch (this.award[i].level) {
          case 1: 
            arr[this.award[i].level].name = '特等奖'
            arr[this.award[i].level].img = require('./img/box1.png')
            break
          case 2: 
            arr[this.award[i].level].name = '一等奖'
            arr[this.award[i].level].img = require('./img/box2.png')
            break
          case 3: 
            arr[this.award[i].level].name = '二等奖'
            arr[this.award[i].level].img = require('./img/box3.png')
            break
        }
      }
      return arr
    },
    awardList () {
      let arr = [],name = ''
      for(let i = 0; i< this.award.length; i++) {
        switch (this.award[i].level) {
          case 1: 
            name = '特等奖'
            break
          case 2: 
            name = '一等奖'
            break
          case 3: 
            name = '二等奖'
            break
        }
        arr[i] = Object.assign({},this.award[i], { name })
      }
      return arr
    }
  },
  methods: {
    handleNavClick (index, item) {
      this.currentIndex = index
      this.resetParams()
      GLOBALS.marchSetsPoint('A_H5PT0282003393', {
        awards_name: item.name
      })
    },
    /** 获取活动信息 **/
    _getInfo () {
      Services.activityInfo().then(res => {
        const {code, data, message} = res
        if(code == 200) {
          this.info = _get(res, 'data', {})
          if(this.info.guideInfo.popup) {
            this.openGuide()
          }
        }
      })
    },
    /** 获取功率和奖励 **/
    _getBetAward (index) {
      Services.betAwards().then(res => {
        const {code, data, message} = res
        if(code == 200) {
          this.betAwards = _get(res, 'data', {})
          this.betIndex = index
          this.openPopup(1, '活动攻略+奖励')
        }
      })
      GLOBALS.marchSetsPoint('A_H5PT0285003414') 
    },
    /** 获取奖励纪录 **/
    _getAwardLog () {
      Services.getAwardLog().then(res => {
        const {code, data, message} = res
        if(code == 200) {
          this.awardLog = _get(res, 'data', {})
          this.openPopup(2, '奖励明细')
        }else {
          this.$toast.show({ message })
        }
      })
      GLOBALS.marchSetsPoint('A_H5PT0285003415') 
    },
    /** 刮卡头部文字 **/
    scratchTitle (stage) {
      switch (stage) {
        case 1:
          return '普通刮刮乐'
          break
        case 2: 
          return '中级刮刮乐'
          break
        case 3: 
          return '超级刮刮乐'
          break
      }
    },
    /** 打开刮奖弹框 **/ 
    openScratch (item, times) {
      if(this.userInfo.remnantNum < item.consumeNum * times) {
        this.$toast.show({message: '您的游戏币不足'})
        return
      }
      this.scratch = {
        times,
        consumeNum: item.consumeNum,
        stage: item.stage
      }
      let name = this.scratchTitle(item.stage)
      this.openPopup(3, name)
      if(item.stage == 1) {
        if(times == 1) {
          GLOBALS.marchSetsPoint('A_H5PT0285003416')
          return
        }
        GLOBALS.marchSetsPoint('A_H5PT0285003417')
      }
      if(item.stage == 2) {
        if(times == 1) {
          GLOBALS.marchSetsPoint('A_H5PT0285003418')
          return
        }
        GLOBALS.marchSetsPoint('A_H5PT0285003419')
      }
      if(item.stage == 3) {
        if(times == 1) {
          GLOBALS.marchSetsPoint('A_H5PT0285003420')
          return
        }
        GLOBALS.marchSetsPoint('A_H5PT0285003421')
      }
      
    },
    /** 刮奖 **/
    _getScratch () {
      this.award = []
      Services.getScratch({
        stage: this.scratch.stage,
        times: this.scratch.times
      }).then(res => {
        const {code, data, message} = res
        if(code == 200) {
          this.award = _get(res, 'data.awardsList', [])
          this._getInfo()
        }else {
          this.$toast.show({ message })
        }
      })
    },
    /** 打开奖品弹框 **/ 
    openAward () {
      this.openPopup(4, '恭喜您获得')
      GLOBALS.marchSetsPoint('A_H5PT0285003430') 
    },
    openGames () {
      this.openPopup(5, '大家都在玩')
    },
    refresh () {
      this._getInfo()
    },
    /** 返回首页 **/
    backHome () {
      GLOBALS.marchSetsPoint('A_H5PT0285003412') 
      window.location.href = "//wap.beeplaying.com/xmWap/"
    },
    /** 打开规则 **/
    openRule () {
      this.showRule = true
      GLOBALS.marchSetsPoint('A_H5PT0285003413') 
    },
    /** 打开Guide弹框 **/
    openGuide () {
      this.showGuide = true
    },
    openDialog (index) {
      this.showDownPopup = index
      if(index == 1) {
        GLOBALS.marchSetsPoint('A_H5PT0285003422')
      } else {
        GLOBALS.marchSetsPoint('A_H5PT0285003423')
      }
    },
    /** 打开弹框 **/
    openPopup (status, title) {
      this.popupTitle = title
      this.showPopup = true
      this.popupStatus = status
    }
  },
  mounted() {
    this._getInfo()
    GLOBALS.marchSetsPoint('P_H5PT0285', {
      source_address: document.referrer
    }) 
  }
}
</script>
<style lang="less" scoped>
.inner-img {
  vertical-align: top;
  width: 100%;
  height: 100%;
}
.scratch {
  min-height: 100vh;
  padding: 1.68rem 0 1.2rem;
  overflow: hidden;
  position: relative;
  background: url(./img/bg.png) no-repeat center top;
  background-size: 100% auto;
  .content {
    .scratch-item {
      position: relative;
      margin: 0 auto .12rem;
      width: 6.34rem;
      height: 4.73rem;
      .check-prize {
        position: absolute;
        left: .14rem;
        top: 1.05rem;
        width: .25rem;
        height: .95rem;
        text-align: center;
        font-size: .24rem;
        color: #F85665;
        font-weight: bold;
        line-height: .25rem;
      }
      .btns {
        position: absolute;
        left: .57rem;
        top: 2.9rem;
        width: 5.3rem;
        display: flex;
        justify-content: space-between;
        .text {
            width: 2.47rem;
            height: .87rem;
            text-align: center;
            font-size: .28rem;
            font-weight: bold;
            line-height: .78rem;
            color: #fff;
          }
        .explain {
          font-size: .18rem;
          text-align: center;
        }
        .one {
          .text {
            background: url(./img/blur-btn.png) no-repeat center center;
            background-size: 100% 100%;
          }
        }
        .ten {
          .text {
            background: url(./img/red-btn.png) no-repeat center center;
            background-size: 100% 100%;
          }
        }
      }
      .total {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        text-align: center;
        color: #fff;
        font-size: .24rem;
        height: .5rem;
        line-height: .5rem;
      }
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    padding: .05rem .3rem 0;
    height: 1.1rem;
    border-radius: .16rem .16rem 0 0;
    background: #4353C8;
    border-top: .06rem solid #000;
    .get-coin {
      width: 3.08rem;
      height: .92rem;
      text-align: center;
      color: #000;
      font-size: .3rem;
      background: url(./img/yellow-btn.png) no-repeat center top;
      background-size: 100% auto;
      display: flex;
      justify-content: center;
      flex-direction: column;
      p {
        width: 100%;
        line-height: .3rem;
        &:first-child {
          font-weight: bold;
          color: #000;
          font-size: .3rem;
          font-weight: bold;
        }
        &:last-child {
          color: #000;
          font-size: .18rem;
        }
      }
    }
    .ranking {
      width: 3.08rem;
      height: .92rem;
      line-height: .86rem;
      text-align: center;
      color: #000;
      font-size: .3rem;
      font-weight: bold;
      background: url(./img/white-btn.png) no-repeat center top;
      background-size: 100% auto;
    }
  }
  .back-btn {
    position: absolute;
    left: .08rem;
    top: .16rem;
    width: .56rem;
    height: .62rem;
  }
  .rule-btn {
    position: absolute;
    right: 0.12rem;
    top: .16rem;
    width: .56rem;
    height: 1.05rem;
  }
  .strategy-btn {
    position: absolute;
    left: 0.08rem;
    top: .83rem;
    width: .56rem;
    height: 1.35rem;
  }
  .prize-btn {
    position: absolute;
    right: 0.12rem;
    top: 1.24rem;
    width: .56rem;
    height: 1.35rem;
  }
}
</style>