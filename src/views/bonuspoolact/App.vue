<template>
  <div id="app">
    <template v-if="detailData">
      <!--返回按钮-->
      <div class="back" :style="{background:detailData.icons&&detailData.icons.back}" @click="back">返回</div>
      <!--回到顶部-->
      <div class="rule" :style="{background:detailData.icons&&detailData.icons.rule}" @click="showrule">规则</div>
      <!--日期-->
      <div class="date">{{detailData.timeline}}</div>
      <div class="display">
        <div class="item" @click="qianghongbaoclick(0)">
          <img :src="(detailData.icons&&detailData.icons[`tab0${tabIndex==0?1:0}`]||icons[`tab0${tabIndex==0?1:0}`])|filter" alt="">
        </div>
        <div class="item" @click="qianghongbaoclick(1)">
          <img :src="(detailData.icons&&detailData.icons[`tab1${tabIndex||0}`]||icons[`tab1${tabIndex||0}`])|filter" alt="">
        </div>
      </div>
      <div class="gif" :class="{giftmove:detailData.ultimateState==1||detailData.ultimateState==4}"
        v-show="tabIndex==1"
        @click="zhongjidajiangImgClick(detailData.normalState,detailData.ultimateState)">
        <template v-if="detailData.ultimateState==1||detailData.ultimateState==4">
          <img :src="(detailData.icons&&detailData.icons.divideyure||icons.divideyure)|filter" alt="">
          <div class="bonus_content">
            <div class="price">{{detailData.ultimateAmount}}元</div>
            <div class="text">
              <span>奖</span>
              <span>励</span>
            </div>
          </div>
          <!-- <div class="info">任意报名3天即可瓜分</div> -->
        </template>
        <img :src="(detailData.icons&&detailData.icons.divideopenprize||icons.divideopenprize)|filter" alt="" v-else>
      </div>
      <div class="gif" v-show="tabIndex==0" @click="qianyuanbonusImgClick(detailData.normalState)">
        <img :src="(detailData.icons&&detailData.icons.qianyuanbonusopen||icons.qianyuanbonusopen)|filter" alt="" v-if="detailData.normalState==5">
        <img :src="(detailData.icons&&detailData.icons.qianyuanbonus||icons.qianyuanbonus)|filter" alt="" v-else>
      </div>
      <!--瓜分记录入口-->
      <img :src="(detailData.icons&&detailData.icons.divideRecord||icons.divideRecord)|filter" class="record" @click="showrecord" v-if="bonusListData.length">
      <!--正常奖池状态normalState 1=活动预热 2=用户未报名 3=用户已报名 4=报名截止 5=奖池开启 6=已结束 ,-->
      <!--千元红包-->
      <template v-if="tabIndex==0">
        <div class="btn bonus_pre" v-if="detailData.normalState==1" :style="{backgroundImage:`url(${getImgUrl('bonusPre')})`}">
          活动开启倒计时{{countdown.time}}
        </div>
        <div class="btn bonus_hot" @click="appointmentBonus(false,tabIndex)"
          v-if="detailData.normalState==2" :style="{backgroundImage:`url(${getImgUrl('bonusHot')})`}">
          马上报名瓜分红包
        </div>
        <div class="btn bonus_hot bonus_signed" @click="showToast('今晚22:00来瓜分吧~')"
          v-if="detailData.normalState==3" :style="{backgroundImage:`url(${getImgUrl('bonusHot')})`}">
          本场已报名<br />
          {{countdown.time}}后瓜分红包
        </div>
        <div class="btn bonus_pre pre" v-if="detailData.normalState==4" :style="{backgroundImage:`url(${getImgUrl('bonusPre')})`}">
          <span>本场报名已截止<br>下场开启倒计时：{{countdown.time}}</span>
        </div>
        <div class="btn bonus_divide" @click="divideBonus(0)" v-if="detailData.normalState==5" :style="{backgroundImage:`url(${getImgUrl('bonusDivide')})`}">
          立即瓜分
        </div>
        <div class="btn bonus_end" v-if="detailData.normalState==6">
          活动已结束
        </div>
      </template>
      <!--终极大奖ultimateState (integer, optional): 终极奖池状态 1=未开启 2=开启 3=已结束-->
      <template v-else>
        <template v-if="detailData.ultimateState==1">
          <div class="btn bonus_pre" v-if="detailData.normalState==1" :style="{backgroundImage:`url(${getImgUrl('bonusPre')})`}">
            活动开启倒计时{{countdown.time}}
          </div>
          <div class="btn bonus_pre pre" v-if="[2,3,4,5].includes(detailData.normalState)"
            @click="qianghongbaoclick(undefind,false);zhongjidajiangImgClick(detailData.normalState,detailData.ultimateState)" :style="{backgroundImage:`url(${getImgUrl('bonusPre')})`}">
            <span>已报名<i>{{detailData.userApplyTime}}</i>天<br>快去抢红包吧</span>
          </div>
        </template>
        <div class="btn bonus_hot" v-if="detailData.ultimateState==2" :style="{backgroundImage:`url(${getImgUrl('bonusHot')})`}">
          {{countdown.time}}后免费瓜分
        </div>
        <div class="btn bonus_divide" @click="divideBonus(1)" v-if="detailData.ultimateState==3" :style="{backgroundImage:`url(${getImgUrl('bonusDivide')})`}">
          立即瓜分
        </div>
        <div class="btn bonus_end" v-if="detailData.ultimateState==4">
          活动已结束
        </div>
      </template>
      <div class="info_txt" v-if="detailData.activityApplyNum">
        已有<i>{{detailData.activityApplyNum}}</i>人报名成功</div>
      <div class="buqian_icon" @click="buqianclick(true)" v-if="makeupData&&makeupData.show"></div>
    </template>
    <!--以下都是弹窗-->
    <!--规则-->
    <bonus-success v-if="flag" :count="flag" @close="flag=0"
      :dataStr="detailData&&(detailData.beginDate+'-'+detailData.endDate)||''"
      :timetxt="detailData.divideTime" :num="detailData.activityApplyNum"
      :dividetimetxt="detailData.ultimateDivideDate" @appointmentBonus="appointmentBonus"
      :makeupPackageData="makeupPackageData" :appointmentday="appointmentday" :timeline="timeline">
      <bonus-record :data="bonusListData" v-if="flag==2"></bonus-record>
    </bonus-success>

    <!--开启红包弹窗-->
    <bonus-opened v-if="isshowBonusOpened" :awardsData="awards" @closePop="closeBonusRes"
      :normalState="detailData.normalState" :ultimateState="detailData.ultimateState"
      :tabindex="tabIndex" :dividetimestr="detailData.ultimateDivideDate"></bonus-opened>
  </div>
</template>
<script>
import '../../common/js/window.js'
import bonusSuccess from './components/bonusSuccess'
import bonusOpened from './components/bonusOpened'
import bonusRecord from './components/bonusRecord'

export default {
  data () {
    return {
      curChannel: null,
      curToken: null,
      countdown: {// 红包榜外显倒计时，最后一天显示
        time: ''
      },
      showrulepop: false,
      isOpen: false,
      showmobilepop: false,
      candivide: true,
      isshowBonusOpened: false, // 是否显示开启红包弹窗
      packageData: [], // 礼包数据
      bonusListData: [], // 瓜分记录
      detailData: null, // 活动信息
      awards: null, // 瓜分奖品
      showfinger: false,
      showfingerPress: false,
      flag: 0,
      tabIndex: 0,
      makeupData: null,
      makeupPackageData: null,
      appointmentday: 0,
      timeline: '',
      icons:{
        'back':'#480f99',//返回按钮背景色值
        'rule':'#b73bd0',//规则按钮背景色值
        'tab00':'/group1/M00/43/2B/CmcEHV6CqoWAIe6YAABBLN7sUvY485.png',//第一个TAB未选中
        'tab11':'/group1/M00/43/2B/CmcEHV6CqseAB6SRAABgyKFugys745.png',//第二个TAB选中
        'tab01':'/group1/M00/43/2B/CmcEHV6CqquAOmDBAABaHb0X8rM751.png',//第一个TAB选中
        'tab10':'/group1/M00/43/2B/CmcEHV6CqrmAQxLXAABF7QhQBno932.png',//第二个TAB未选中
        'bonusPre':'/group1/M00/42/47/CmcEHF6B6UqAMFBdAABQBQTtB3Q998.png',//预热按钮
        'bonusHot':'/group1/M00/42/47/CmcEHF6B6TaAQayQAABPaNfX34k322.png',//活动中按钮
        'bonusDivide':'/group1/M00/42/47/CmcEHF6B6R6AMVs6AABPyldAp-4691.png',//瓜分按钮
        'divideRecord':'/group1/M00/42/47/CmcEHF6B6XuAPNq7AAAt8i88H6E305.png',//瓜分记录
        'qianyuanbonus':'/group1/M00/42/47/CmcEHF6B6aaAWvPnAA0QcIc12vU001.gif',//千元红包GIF
        'qianyuanbonusopen':'/group1/M00/42/47/CmcEHF6B6beAQlpzAAx9Dg0NFfE280.gif',//千元红包开启GIF
        'divideyure':'/group1/M00/42/47/CmcEHF6B6Y-AXg6iAAlEzKqRyt0337.png',//终极大奖预热
        'divideopenprize':'/group1/M00/42/47/CmcEHF6B6V2AN15nAAqEFFxeVqc254.gif'//终极奖池开启GIF
      }
    }
  },
  async mounted () {
    this.curChannel = localStorage.getItem('APP_CHANNEL') ? localStorage.getItem('APP_CHANNEL') : this.getUrlParam('channel')
    this.curToken = localStorage.getItem('ACCESS_TOKEN') ? localStorage.getItem('ACCESS_TOKEN') : this.getUrlParam('token')
    await this.myDetails()

    // 后端告知是否弹框
    if (this.detailData.applyPopup) {
      this.flag = 3
    }
    await this.bonusListClick()
    await GLOBALS.marchSetsPoint('A_H5PT0074001374', {
      source_address: this.getUrlParam('from') || ''
    })// H5平台-奖池瓜分页面加载
  },
  computed: {
    countdownText () { // 倒计时文案 红包榜外显倒计时，最后一天显示
      if (this.countdown.time) {
        let hourText = this.countdown.time.split(':')[0]
        let days = Math.floor(hourText / 24)
        if (days == 0) {
          return this.countdown.time
        } else {
          return ''
        }
      } else {
        return ''
      }
    },
    isHasIframe () {
      return window != window.top
    }
  },
  methods: {
    async buqianclick (flag) {
      flag && GLOBALS.marchSetsPoint('A_H5PT0074001812')
      let { code, data } = (await this.fetch(`/shop/api/mall/showLeaguePacksList/${this.makeupData.batchId}`)).data
      if (code == 200) {
        if (this.makeupData.type == 1) {
          this.makeupPackageData = data.leaguePacksList[0]
          this.flag = 6
          GLOBALS.marchSetsPoint('A_H5PT0074001811')
        } else {
          this.makeupPackageData = data.leaguePacksList[1]
          this.flag = 7
          GLOBALS.marchSetsPoint('A_H5PT0074001811')
        }
      }
    },
    qianghongbaoclick (value, isTab = true) {
      if (value) {
        GLOBALS.marchSetsPoint('A_H5PT0074001702')
      } else {
        GLOBALS.marchSetsPoint(isTab ? 'A_H5PT0074002015' : 'A_H5PT0074001703')
      }
      if (value != undefined) {
        this.tabIndex = value
      }
    },
    showrule () {
      this.flag = 1
    },
    // 获取地址栏问号后面的参数值
    getUrlParam: function (ename) {
      // var url = document.referrer;
      var url = window.location.href
      var Request = new Object()
      if (url.indexOf('?') != -1) {
        var str = url.split('?')[1]
        var strs = str.split('&')
        for (var i = 0; i < strs.length; i++) {
          Request[strs[i].split('=')[0]] = (strs[i].split('=')[1])
        }
      } else {
        return ''
      }
      return Request[ename]
    },
    back () {
      if (this.detailData && this.detailData.normalState == 2 && !localStorage.getItem('clickflag')) {
        GLOBALS.marchSetsPoint('A_H5PT0074001815')
        localStorage.setItem('clickflag', '1')
        this.flag = 5
      } else {
        // top.location.href = window.linkUrl.getBackUrl(this.curChannel)
        history.back(-1)
      }
    }, // 回到首页
    getComputedStyle (ele, attr) {
      return window.getComputedStyle(ele, null)[attr]
    },
    fetch (url, params) {
      if (url.startsWith('/ops/api')) {
        url = '//ops-api.beeplaying.com' + url
      }
      if (url.startsWith('/wap/api')) {
        url = '//platform-api.beeplaying.com' + url
      }
      if (url.startsWith('/shop/api')) {
        url = '//shop-api.beeplaying.com' + url
      }
      return this.axios.post(url, params, {})
    }, // 请求封装方法
    async bonusListClick () { // 红包记录
      try {
        const res = await this.fetch('/ops/api/jackpot/getWinningRecord', {
          page: 1,
          pageSize: 500
        })
        if (res.data.code == 200 && res.data.data) {
          this.bonusListData = res.data.data.records || []
          this.timeline = res.data.data.timeline
        }
      } catch (e) {

      }
    },
    async myDetails (tabIndex) {
      try {
        const res = await this.fetch('/ops/api/jackpot/getActivityInfo')
        if (res.data.code == 200 && res.data.data) {
          this.detailData = res.data.data
          // 千元红包结束，终极大奖还有资格瓜分 默认选中终极大奖
          // if (this.detailData.normalState == 6 && (this.detailData.ultimateState == 3||this.detailData.ultimateState == 2)) {
          //   this.tabIndex = 1
          // }tabIndex
          if (!(tabIndex == 0)) {
            if (this.detailData.ultimateState == 3) {
              this.tabIndex = 1
            } else {
              if ([2, 3, 4, 5].includes(this.detailData.normalState) && this.detailData.userApplyTime) {
                this.tabIndex = 0
              } else {
                this.tabIndex = 1
              }
            }
          }

          !this.countdown.time && this.detailData.countdown && GLOBALS.remainingTime(
            this,
            this.detailData.countdown,
            this.countdown
          )
          this.makaup()
        }
      } catch (e) {

      }
    }, // 获取myDetails数据
    async divideBonus (flag) { // 开始瓜分 0 红包瓜分 1 终极瓜分
      GLOBALS.marchSetsPoint('A_H5PT0074001376')
      let { data } = await this.fetch(flag ? '/ops/api/jackpot/divideUltimate' : '/ops/api/jackpot/divideUp', { isShowTotast: false })
      if (data.code == 200) {
        this.awards = data.data// 瓜分奖品
        this.isshowBonusOpened = true
      } else {
        this.$toast.show({
          message: data.message,
          duration: 2000
        })
        this.myDetails()
      }
    },
    showToast (message) {
      this.$toast.show({
        message,
        duration: 1500
      })
    },
    async appointmentBonus (isfrompop, tabIndex) { // 报名
      if (!isfrompop) {
        GLOBALS.marchSetsPoint('A_H5PT0074001375')
      }
      let { data } = await this.fetch('/ops/api/jackpot/userApply', { isShowTotast: false })
      if (data.code == 200) {
        this.appointmentday = data.data
        this.flag = 3
      } else {
        this.flag = 4
      }
      this.myDetails(tabIndex)
    },
    async closeBonusRes (eventType) {
      await this.myDetails()
      if (eventType == 1) {
        this.tabIndex = 1
      }
      if (eventType == 2) {
        this.tabIndex = 0
      }
      this.isshowBonusOpened = false
    },
    async showrecord () {
      GLOBALS.marchSetsPoint('A_H5PT0074001592')// H5平台-奖池瓜分页面-点击瓜分记录
      await this.bonusListClick()
      this.flag = 2
    },
    async makaup () {
      try {
        const res = await this.fetch('/ops/api/jackpot/make-up')
        if (res.data.code == 200 && res.data.data) {
          this.makeupData = res.data.data
          if (this.makeupData.show && this.makeupData.popup) { // 自动弹出
            this.buqianclick(false)
          }
        }
      } catch (e) {

      }
    },
    qianyuanbonusImgClick (state) {
      if (state == 2) {
        this.appointmentBonus(false, this.tabIndex)
      } else if (state == 5) {
        this.divideBonus(0)
      }
    },
    zhongjidajiangImgClick (normalState, state) {
      if ([2, 3, 4, 5].includes(normalState)) {
        if (normalState == 2) {
          this.appointmentBonus(false)
          this.qianghongbaoclick()
        } else {
          this.qianghongbaoclick(0)
        }
      }
      if (state == 3) {
        this.divideBonus(1)
      }
    },
    getImgUrl(typename){
      let url=this.detailData&&this.detailData.icons&&this.detailData.icons[typename]||this.icons[typename]
      if (url && !url.includes('http')) {
        return '//file.beeplaying.com' + url
      } else {
        return url
      }
    }
  },
  components: {
    bonusSuccess, bonusOpened, bonusRecord
  },
  watch: {
    'countdown.time': function (val) {
      if (!val) {
        this.myDetails()
      }
    }
  }
}

</script>
<style lang="less" scoped>
@import "../../common/css/base.css";

#app {
  position: absolute;
  height: 11.5rem;
  left: 0;
  right: 0;
  background: url("./images/bg.jpg");
  background-size: 100% 100%;
  color: rgba(255, 255, 255, 1);
  &:before {
    content: "";
    position: absolute;
    top: -0.2rem;
    left: 0.13rem;
    width: 7rem;
    height: 10.76rem;
    background: url("./images/decoration_bg.png") no-repeat;
    background-size: 100% 100%;
    z-index: 1;
  }
}

.rule {
  font-size: 0.24rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  text-align: center;
  position: fixed;
  top: 0.18rem;
  right: 0;
  width: 0.8rem;
  height: 0.5rem;
  line-height: 0.5rem;
  background: rgba(183, 59, 208, 1);
  border-radius: 0.25rem 0 0 0.25rem;
  z-index: 10;
}

.back {
  position: fixed;
  top: 0.18rem;
  width: 0.8rem;
  height: 0.5rem;
  line-height: 0.5rem;
  text-align: center;
  background: rgba(72, 15, 153, 1);
  border-radius: 0 0.25rem 0.25rem 0;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  z-index: 10;
}

.date {
  font-size: 0.3rem;
  font-weight: bold;
  position: absolute;
  top: 0.38rem;
  left: 50%;
  transform: translateX(-50%);
  padding-top: 0.08rem;
}

.display {
  position: absolute;
  top: 2.5rem;
  height: 1.33rem;
  left: 0.54rem;
  right: 0.54rem;
  display: flex;
  justify-content: space-around;
  .item {
    width: 3.12rem;
    height: 1.33rem;
    position: relative;
    z-index: 1;
    img {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 50%;
      top: 40%;
      transform: translate(-50%, -40%);
    }
  }
}
.gif {
  position: absolute;
  top: 3.6rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  img {
    idth: 5.32rem;
    height: 6.2rem;
  }
  &.giftmove {
    padding-top: 0.2rem;
    box-sizing: border-box;
    animation: giftmove 2s infinite;
    img {
      width: 4.41rem;
      height: 5.84rem;
    }
  }
  .bonus_content {
    position: absolute;
    top: 4.1rem;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    width: 100%;
    animation: scale 2s infinite;
    .price {
      font-size: 0.74rem;
      font-weight: bold;
      color: rgba(255, 206, 77, 1);
      text-shadow: 0 0.03rem 0.01rem rgba(112, 30, 22, 0.26);
    }
    .text {
      display: flex;
      flex-direction: column;
      font-size: 0.34rem;
      font-weight: bold;
      color: rgba(255, 206, 77, 1);
    }
  }
  .info {
    position: absolute;
    top: 5rem;
    font-size: 0.24rem;
    font-weight: 400;
    color: rgba(123, 10, 49, 1);
    width: 100%;
    text-align: center;
  }
}

.record {
  position: absolute;
  top: 9.24rem;
  right: 0;
  width: 1.6rem;
  height: 0.62rem;
  z-index: 2;
}

.btn {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 9.9rem;
  width: 5.74rem;
  height: 1.2rem;
  background: url("./images/yufe_bmjiezhi_btn.png");
  background-size: 100% 100%;
  text-align: center;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding-bottom: 0.3rem;
  font-size: 0.36rem;
  color: rgba(65, 28, 124, 1);
  z-index: 1;
  &.bonus_divide {
    font-size: 0.42rem;
    color: rgba(75, 20, 47, 1);
    background: url("./images/guafen_btn.png");
    background-size: 100% 100%;
  }
  &.bonus_hot {
    font-size: 0.4rem;
    &.bonus_signed {
      font-size: 0.3rem;
      line-height: 0.35rem;
    }
    color: rgba(168, 13, 9, 1);
    background: url("./images/baoming_btn.png");
    background-size: 100% 100%;
  }
  &.bonus_end {
    font-size: 0.42rem;
    color: rgba(72, 72, 72, 1);
    background: url("./images/act_end_btn.png");
    background-size: 100% 100%;
  }
  &.pre {
    font-size: 0.3rem;
    span {
      line-height: 0.4rem;
      i {
        color: #fb484c;
      }
    }
  }
}

.info_txt {
  position: absolute;
  top: 11.1rem;
  font-size: 0.3rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  width: 100%;
  text-align: center;
  i {
    color: #fdcd00;
  }
}
.buqian_icon {
  width: 1.18rem;
  height: 1.28rem;
  background: url("./images/new2/buqian_icon.png");
  background-size: 100% 100%;
  position: absolute;
  top: 4rem;
  right: 0;
  z-index: 1;
}
/*@keyframes giftmove {*/
/*10%{*/
/*transform: translateX(-50%) rotate(-3deg);*/
/*}*/
/*30%{*/
/*transform:translateX(-50%) rotate(3deg);*/
/*}*/
/*50%{*/
/*transform:translateX(-50%) rotate(-3deg);*/
/*}*/
/*70%{*/
/*transform:translateX(-50%) rotate(3deg);*/
/*}*/
/*80%,100%{*/
/*transform:translateX(-50%) rotate(0deg);*/
/*}*/
/*}*/
@keyframes scale {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.2);
  }
}
</style>
