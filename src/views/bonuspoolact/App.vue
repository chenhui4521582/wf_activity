<template>
  <div id="app">
    <!--返回按钮-->
    <div class="back" @click="back">返回</div>
    <template v-if="detailData">
      <!--回到顶部-->
      <div class="rule" @click="showrule">规则</div>
      <!--日期-->
      <div class="date">{{detailData.timeline}}</div>
      <div class="display" v-if="tabIndex">
        <div class="item" @click="tabIndex=0">
          <img src="./images/qianyuanbonus.png" alt="">
        </div>
        <div class="item">
          <img src="./images/zhongjidajiang.png" alt="">
        </div>
      </div>
      <div class="display1" v-else>
        <div class="item">
          <img src="./images/qianyuanbonus1.png" alt="">
        </div>
        <div class="item">
          <img src="./images/zhongjidajiang1.png" alt="" @click="tabIndex=1">
        </div>
      </div>
      <div class="gif" :class="{giftmove:detailData.ultimateState==1||detailData.ultimateState==4}" v-show="tabIndex==1">
        <template v-if="detailData.ultimateState==1||detailData.ultimateState==4">
          <img src="./images/yure_gif.png" alt="">
          <div class="bonus_content">
            <div class="price">{{detailData.ultimateAmount}}元</div>
            <div class="text">
              <span>奖</span>
              <span>励</span>
            </div>
          </div>
          <div class="info">连续报名5天即可瓜分</div>
        </template>
        <img src="./images/openprize.gif" alt="" v-else>
      </div>
      <div class="gif" v-show="tabIndex==0">
        <img src="./images/qianyuanbonusopen.gif" alt="" v-if="detailData.normalState==5">
        <img src="./images/qianyuanbonus.gif" alt="" v-else>
      </div>
      <!--瓜分记录入口-->
      <div class="record" @click="showrecord" v-if="bonusListData.length"></div>
      <!--正常奖池状态normalState 1=活动预热 2=用户未报名 3=用户已报名 4=报名截止 5=奖池开启 6=已结束 ,-->
      <!--千元红包-->
      <template v-if="tabIndex==0">
        <div class="btn bonus_pre" v-if="detailData.normalState==1">
          活动开启倒计时{{countdown.time}}
        </div>
        <div class="btn bonus_hot" @click="appointmentBonus" v-if="detailData.normalState==2">
          马上报名瓜分红包
        </div>
        <div class="btn bonus_hot" v-if="detailData.normalState==3">
          {{countdown.time}}后瓜分红包
        </div>
        <div class="btn bonus_pre pre" v-if="detailData.normalState==4">
          <span>本场报名已截止<br>下场开启倒计时：{{countdown.time}}</span>
        </div>
        <div class="btn bonus_divide" @click="divideBonus(0)" v-if="detailData.normalState==5">
          立即瓜分
        </div>
        <div class="btn bonus_end" v-if="detailData.normalState==6">
          活动已结束
        </div>
      </template>
      <!--终极大奖ultimateState (integer, optional): 终极奖池状态 1=未开启 2=开启 3=已结束-->
      <template v-else>
        <template v-if="detailData.ultimateState==1">
          <div class="btn bonus_pre" v-if="detailData.normalState==1">
            活动开启倒计时{{countdown.time}}
          </div>
          <div class="btn bonus_pre pre" v-if="[2,3,4,5].includes(detailData.normalState)" @click="tabIndex=0">
            <span>已报名<i>{{detailData.userApplyTime}}</i>天<br>快去抢红包吧</span>
          </div>
        </template>
        <div class="btn bonus_hot" v-if="detailData.ultimateState==2">
          {{countdown.time}}后免费瓜分
        </div>
        <div class="btn bonus_divide" @click="divideBonus(1)" v-if="detailData.ultimateState==3">
          立即瓜分
        </div>
        <div class="btn bonus_end" v-if="detailData.ultimateState==4">
          活动已结束
        </div>
      </template>
      <div class="info_txt" v-if="detailData.activityApplyNum">已有<i>{{detailData.activityApplyNum}}</i>人报名成功</div>
    </template>
    <!--以下都是弹窗-->
    <!--规则-->
    <bonus-success v-if="flag" :count="flag" @close="flag=0"
                   :dataStr="detailData&&(detailData.beginDate+'-'+detailData.endDate)||''"
                   :timetxt="detailData.divideTime" :num="detailData.activityApplyNum" :dividetimetxt="detailData.ultimateDivideDate">
      <bonus-record :data="bonusListData" v-if="flag==2"></bonus-record>
    </bonus-success>

    <!--开启红包弹窗-->
    <bonus-opened v-if="isshowBonusOpened" :awards="awards" @closePop="closeBonusRes" :normalState="detailData.normalState" :ultimateState="detailData.ultimateState" :tabindex="tabIndex" :dividetimestr="detailData.ultimateDivideDate"></bonus-opened>
  </div>
</template>
<script>
  import '../../common/js/window.js'
  import bonusSuccess from './components/bonusSuccess'
  import bonusOpened from './components/bonusOpened'
  import bonusRecord from './components/bonusRecord'

  export default {
    data() {
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
        tabIndex: 0
      }
    },
    async mounted() {
      this.curChannel = localStorage.getItem('APP_CHANNEL') ? localStorage.getItem('APP_CHANNEL') : this.getUrlParam('channel')
      this.curToken = localStorage.getItem('ACCESS_TOKEN') ? localStorage.getItem('ACCESS_TOKEN') : this.getUrlParam('token')
      await this.myDetails()
      await this.bonusListClick()
      await GLOBALS.marchSetsPoint('A_H5PT0074001374',{
        source_address:this.getUrlParam('from')||''
      })// H5平台-奖池瓜分页面加载
    },
    computed: {
      countdownText() { // 倒计时文案 红包榜外显倒计时，最后一天显示
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
      isHasIframe() {
        return window != window.top
      }
    },
    methods: {
      showrule() {
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
      back() {
        top.location.href = window.linkUrl.getBackUrl(this.curChannel)
      }, // 回到首页
      getComputedStyle(ele, attr) {
        return window.getComputedStyle(ele, null)[attr]
      },
      fetch(url, params) {
        if (url.startsWith('/ops/api')) {
          url = '//ops-api.beeplaying.com' + url
        }
        if (url.startsWith('/wap/api')) {
          url = '//platform-api.beeplaying.com' + url
        }
        if (url.startsWith('/wap/api')) {
          url = '//shop-api.beeplaying.com' + url
        }
        return this.axios.post(url, params, {})
      }, // 请求封装方法
      async bonusListClick() {//红包记录
        try {
          const res = await this.fetch('/ops/api/jackpot/getWinningRecord', {
            page: 1,
            pageSize: 500
          })
          if (res.data.code == 200 && res.data.data) {
            this.bonusListData = res.data.data || []
          }
        } catch (e) {

        }
      },
      async myDetails() {
        try {
          const res = await this.fetch('/ops/api/jackpot/getActivityInfo')
          if (res.data.code == 200 && res.data.data) {
            this.detailData = res.data.data
            //千元红包结束，终极大奖还有资格瓜分 默认选中终极大奖
            if (this.detailData.normalState == 6 && this.detailData.ultimateState == 3) {
              this.tabIndex = 1
            }
            !this.countdown.time && this.detailData.countdown && GLOBALS.remainingTime(
              this,
              this.detailData.countdown,
              this.countdown
            )
          }
        } catch (e) {

        }
      }, // 获取myDetails数据
      async divideBonus(flag) { // 开始瓜分 0 红包瓜分 1 终极瓜分
        GLOBALS.marchSetsPoint('A_H5PT0074001376')
        let {data} = await this.fetch(flag?'/ops/api/jackpot/divideUltimate':'/ops/api/jackpot/divideUp', {isShowTotast: false})
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
      async appointmentBonus() { // 报名
        GLOBALS.marchSetsPoint('A_H5PT0074001375')
        let {data} = await this.fetch('/ops/api/jackpot/userApply', {isShowTotast: false})
        if (data.code == 200) {
          this.flag = 3
        } else {
          this.flag = 4
        }
        this.myDetails()
      },
      async closeBonusRes() {
        await this.myDetails()
        this.isshowBonusOpened = false
      },
      async showrecord() {
        GLOBALS.marchSetsPoint('A_H5PT0074001592')// H5平台-奖池瓜分页面-点击瓜分记录
        await this.bonusListClick()
        this.flag = 2
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
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: url("./images/bg.png");
    background-size: 100% 100%;
    color: rgba(255, 255, 255, 1);
    &:before {
      content: '';
      position: absolute;
      top: -.2rem;
      left: .13rem;
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
    width: .8rem;
    height: .5rem;
    line-height: .5rem;
    background: rgba(183, 59, 208, 1);
    border-radius: 0.25rem 0 0 .25rem;
    z-index: 10;
  }

  .back {
    position: fixed;
    top: 0.18rem;
    width: .8rem;
    height: .5rem;
    line-height: .5rem;
    text-align: center;
    background: rgba(72, 15, 153, 1);
    border-radius: 0 .25rem 0.25rem 0;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    z-index: 10;
  }

  .date {
    font-size: .3rem;
    font-weight: bold;
    position: absolute;
    top: .38rem;
    left: 50%;
    transform: translateX(-50%);
    padding-top: .08rem;
  }

  .display {
    position: absolute;
    top: 2.5rem;
    height: 1.33rem;
    left: .54rem;
    right: .54rem;
    display: flex;
    justify-content: space-around;
    .item {
      width: 3.12rem;
      height: 1.33rem;
      position: relative;
      z-index: 1;
      img {
        width: 1.33rem;
        height: .38rem;
        position: absolute;
        left: 50%;
        top: 40%;
        transform: translate(-50%, -40%);
      }
      &:nth-child(1) {
        background: url("./images/tip_btn_blue.png");
        background-size: 100% 100%;
      }
      &:nth-child(2) {
        background: url("./images/tip_btn_red.png");
        background-size: 100% 100%;
      }
    }
  }

  .display1 {
    position: absolute;
    top: 2.5rem;
    height: 1.33rem;
    left: .54rem;
    right: .54rem;
    display: flex;
    justify-content: space-around;
    .item {
      width: 3.12rem;
      height: 1.33rem;
      position: relative;
      z-index: 1;
      img {
        width: 1.33rem;
        height: .38rem;
        position: absolute;
        left: 50%;
        top: 40%;
        transform: translate(-50%, -40%);
      }
      &:nth-child(1) {
        background: url("./images/tip_btn_red.png");
        background-size: 100% 100%;
      }
      &:nth-child(2) {
        background: url("./images/tip_btn_blue.png");
        background-size: 100% 100%;
      }
    }
  }

  .gif {
    position: absolute;
    top: 3.6rem;
    left: 50%;
    transform: translateX(-50%);
    img {
      idth: 5.32rem;
      height: 6.2rem;
    }
    &.giftmove {
      padding-top: .2rem;
      box-sizing: border-box;
      animation:giftmove 2s infinite;
      img {
        width: 4.41rem;
        height: 5.84rem;
      }
    }
    .bonus_content {
      position: absolute;
      top: 3.9rem;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      width: 100%;
      .price {
        font-size: .74rem;
        font-weight: bold;
        color: rgba(255, 206, 77, 1);
        text-shadow: 0 .03rem .01rem rgba(112, 30, 22, 0.26);
      }
      .text {
        display: flex;
        flex-direction: column;
        font-size: .34rem;
        font-weight: bold;
        color: rgba(255, 206, 77, 1);
      }
    }
    .info {
      position: absolute;
      top: 5rem;
      font-size: .24rem;
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
    height: .62rem;
    background: url("./images/record_icon.png");
    background-size: 100% 100%;
    z-index: 2;
  }

  .btn {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top:9.9rem;
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
    padding-bottom: .3rem;
    font-size: .36rem;
    color: rgba(65, 28, 124, 1);
    z-index: 1;
    &.bonus_divide {
      font-size: .42rem;
      color: rgba(75, 20, 47, 1);
      background: url("./images/guafen_btn.png");
      background-size: 100% 100%;
    }
    &.bonus_hot {
      font-size: .4rem;
      color: rgba(168, 13, 9, 1);
      background: url("./images/baoming_btn.png");
      background-size: 100% 100%;
    }
    &.bonus_end {
      font-size: .42rem;
      color: rgba(72, 72, 72, 1);
      background: url("./images/act_end_btn.png");
      background-size: 100% 100%;
    }
    &.pre {
      font-size: .3rem;
      span {
        line-height: .4rem;
        i {
          color: #FB484C;
        }
      }
    }
  }

  .info_txt {
    position: absolute;
    top:11.1rem;
    font-size: .3rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    width: 100%;
    text-align: center;
    i {
      color: #FDCD00;
    }
  }

  @keyframes giftmove {
    10%{
      transform: translateX(-50%) rotate(-3deg);
    }
    30%{
      transform:translateX(-50%) rotate(3deg);
    }
    50%{
      transform:translateX(-50%) rotate(-3deg);
    }
    70%{
      transform:translateX(-50%) rotate(3deg);
    }
    80%,100%{
      transform:translateX(-50%) rotate(0deg);
    }
  }
</style>
