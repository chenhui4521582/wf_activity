<template>
  <div id="app" :class="{aoke:curChannel==100006&&isHasIframe}">
    <!--返回按钮-->
    <div class="back" @click="back"></div>
    <div class="section0"><span>截止时间：6月25日23:59:59</span></div>
    <!--签到-->
    <div class="section1" id="section1">
      <div class="container">
        <ul class="signlist">
          <li v-for="item in 5">
            <img src="./images/package/sign_500.png" alt="" v-if="item>1">
            <img src="./images/package/signed.png" alt="" v-if="item==1">
            <div>第{{item}}天</div>
          </li>
        </ul>
        <!--<div class="btn">立即签到领取</div>-->
        <div class="btn signed">今日已经领取500金叶</div>
      </div>
    </div>
    <!--充值加赠-->
    <!--<div class="section2" id="section2">-->
    <!--<div class="container">-->
    <!--<img src="./images/package/600@2x.png" alt="">-->
    <!--<img src="./images/package/350@2x.png" alt="">-->
    <!--<img src="./images/package/168@2x.png" alt="">-->
    <!--<img src="./images/package/88@2x.png" alt="">-->
    <!--</div>-->
    <!--</div>-->
    <!--任务-->
    <div class="section3" id="section3">
      <div class="container">
        <div class="info">
          <span>任务累计积分：{{bonusData.jifen}}</span>
          <img src="./images/package/rule.png" alt="">
        </div>
        <div class="bonus">
          <ul>
            <li v-for="(item,index) in bonusData.data">
              <div class="jifen">{{item.jifen}}积分</div>
              <div class="award_name">{{item.prize}}</div>
              <div class="award_status" :class="{gained:item.status==1}" v-if="bonusData.jifen>=item.jifen"></div>
            </li>
          </ul>
          <div class="progress">
            <div class="progress-bar">
              <div class="progress-bar-len" :style="{width:getpercent(bonusData.jifen)}"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--更多游戏活动-->
    <div class="section4" id="section4">
      <div class="tabs">
        <ul>
          <li class="actived">糖果</li>
          <li>桌球</li>
          <li>捕鱼</li>
          <li>赏金</li>
        </ul>
      </div>
      <div class="list">
        <scroll :data="true">
          <div>
            <div class="game_item" v-for="item in 4">
              <img src="./images/package/fen.png" alt="" class="pic">
              <div class="info">
                <div class="title">今日累计支持5万金叶</div>
                <div class="progress">
                  <div class="progressbar">
                    <div class="progress-bar-len" style="{width:50%}"></div>
                  </div>
                  <img src="./images/package/fen.png" alt="" class="fen">
                  <div class="name">1积分</div>
                </div>
              </div>
              <div class="btn">领取积分</div>
            </div>
          </div>
        </scroll>
      </div>
    </div>
    <!--充值加赠-->
    <div class="section5" id="section5">
      <div class="container">
        <img src="./images/package/plusgained.png" alt="">
      </div>
    </div>
    <!--以下都是弹窗-->
    <!--&lt;!&ndash;规则&ndash;&gt;-->
    <!--<bonus-success v-if="showrulepop" :count="0"-->
                   <!--@close="showrulepop=false"-->
                   <!--:dataStr="detailData&&(detailData.activityBeginDate+'-'+detailData.activityEndDate)||''"></bonus-success>-->
    <!--&lt;!&ndash;绑定手机号&ndash;&gt;-->
    <!--<bonus-success v-if="isOpen" :count="1"-->
                   <!--@close="isOpen=false" @closemobile="closemobile" @refresh="myDetails"></bonus-success>-->
    <!--&lt;!&ndash;开启红包弹窗&ndash;&gt;-->
    <!--<bonus-opened v-if="isshowBonusOpened" :awards="awards" @closePop="closeBonusRes"></bonus-opened>-->
  </div>
</template>
<script>
  import '../../common/js/window.js';
  // import bonusSuccess from './components/bonusSuccess'
  // import bonusOpened from './components/bonusOpened'
  // import bonusRecord from './components/bonusRecord'
  import common from "../../common/js/utils";
  import scroll from './components/scroll'
  export default {
    data() {
      return {
        bonusData: {
          data: [{
            jifen: 2,
            prize: '5元话费',
            status: 1
          }, {
            jifen: 4,
            prize: '5元话费',
            status: 0
          }, {
            jifen: 8,
            prize: '10元话费',
            status: 0
          }, {
            jifen: 14,
            prize: '15元话费',
            status: 0
          }],
          jifen: 6
        },
        curChannel: null,
        curToken: null,
        countdown: {//红包榜外显倒计时，最后一天显示
          time: ''
        },
        showrulepop: false,
        switches: {
          tzo: null
        },
        isOpen: false,
        showmobilepop: false,
        candivide: true,
        isshowBonusOpened: false,//是否显示开启红包弹窗
        packageData: [],//礼包数据
        bonusListData: [],//瓜分记录
        detailData: null,//活动信息
        awards: null,//瓜分奖品
        showfinger: false,
        showfingerPress: false,
      }
    },
    async mounted() {
      this.curChannel = localStorage.getItem('APP_CHANNEL') ? localStorage.getItem('APP_CHANNEL') : this.getUrlParam('channel')
      this.curToken = localStorage.getItem('ACCESS_TOKEN') ? localStorage.getItem('ACCESS_TOKEN') : this.getUrlParam('token')
    },
    computed: {
      isHasIframe() {
        return window != window.top
      }
    },
    methods: {
      getpercent(jifen) {
        switch (jifen) {
          case 1:
            return '0%';
            break
          case 1:
            return '4%';
            break
          case 2:
            return '10%';
            break
          case 3:
            return '20%';
            break
          case 4:
            return '30%';
            break
          case 5:
            return '40%';
            break
          case 6:
            return '45%';
            break
          case 7:
            return '50%';
            break
          case 8:
            return '58%';
            break
          case 9:
            return '65%';
            break
          case 10:
            return '70%';
            break
          case 11:
            return '75%';
            break
          case 12:
            return '80%';
            break
          case 13:
            return '85%';
            break
          default:
            return '100%'
        }
      },
      getDateInfo(date) {
        let dateObj = new Date(date);
        let month = dateObj.getMonth() + 1;
        let day = dateObj.getDate();
        return `${month}月${day}日`
      },
      showrule() {
        this.showrulepop = true
      },
      //获取地址栏问号后面的参数值
      getUrlParam: function (ename) {
        // var url = document.referrer;
        var url = window.location.href;
        var Request = new Object();
        if (url.indexOf("?") != -1) {
          var str = url.split('?')[1];
          var strs = str.split("&");
          for (var i = 0; i < strs.length; i++) {
            Request[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
          }
        } else {
          return '';
        }
        return Request[ename];
      },
      back() {
        top.location.href = window.linkUrl.getBackUrl(this.curChannel)
      },//回到首页
      getComputedStyle(ele, attr) {
        return window.getComputedStyle(ele, null)[attr]
      },
      fetch(url, params) {
        if (url.startsWith('/ops/api')) {
          url = '//ops-api.beeplay123.com' + url
        }
        if (url.startsWith('/wap/api')) {
          url = '//platform-api.beeplay123.com' + url
        }
        if (url.startsWith('/wap/api')) {
          url = '//shop-api.beeplay123.com' + url
        }
        return this.axios.post(url, params, {})
      },//请求封装方法
      async myDetails() {
        try {
          const res = await this.fetch('/ops/api/jackpot/getActivityInfo')
          if (res.data.code == 200 && res.data.data) {
            this.detailData = res.data.data;
            this.showfinger = res.data.data.userState == 1
            this.switches = {
              tzo: this.detailData.userIsOpenSms
            }
            !this.countdown.time && this.detailData.activityCountdown && GLOBALS.remainingTime(
              this,
              this.detailData.activityCountdown,
              this.countdown
            );
          }
        } catch (e) {

        }
      },//获取myDetails数据
      //礼包
      async getPackage() {//获取礼包数据
        try {
          const {data: data} = await this.axios.post('https://shop-api.beeplay123.com/shop/api/mall/leaguePacksList')
          if (data.code == 200) {
            this.packageData = data.data.leaguePacksList || []
            console.log('this.packageData', data.data.leaguePacksList.length)
          }
        } catch (e) {

        }
      },
      gotopay(val) {
        GLOBALS.marchSetsPoint('A_H5PT0074001379', {product_id: val.bizId})
        localStorage.setItem('JDD_PARAM', JSON.stringify(val))
        if (window.linkUrl.getBackUrlFlag(this.curChannel) == 'bdWap' && this.curChannel != '100001') {//好看、全民小视频
          top.location.href = 'https://wap.beeplay123.com/payment/#/bdPayment';
        } else {
          top.location.href = 'https://wap.beeplay123.com/payment/#/payment';
        }
      }
    },
    components: {
      scroll
    }
  }

</script>
<style lang="less" scoped>
  @import '../../common/css/base.css';

  #app {
    max-height: 23.61rem;
    min-height: 19.09rem;
    background: #26262E;
    font-size: .24rem;
  }

  .aoke {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    overflow-y: scroll;
  }

  .rule {
    font-size: .24rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    position: fixed;
    top: .18rem;
    right: .13rem;
    width: 1.08rem;
    height: .44rem;
    line-height: .44rem;
    background: rgba(47, 68, 235, 0.38);
    border-radius: .22rem;
    z-index: 10;
  }

  .back {
    position: fixed;
    top: .05rem;
    width: .51rem;
    height: .43rem;
    background: url("./images/package/back_bg.png");
    background-size: 100% 100%;
    z-index: 10;
  }

  .section0 {
    position: relative;
    width: 7.2rem;
    height: 2.86rem;
    background: url("./images/package/sec_bg.png");
    background-size: 100% 100%;
    span {
      position: absolute;
      top: 1.74rem;
      left: 1.71rem;
      font-size: .3rem;
      font-weight: 300;
      color: rgba(222, 201, 169, 1);
    }
  }

  .section1 {
    position: relative;
    width: 7.2rem;
    height: 2.8rem;
    margin-bottom: .28rem;
    &:before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
      width: 6.09rem;
      height: .37rem;
      background: url("./images/package/signtab.png");
      background-size: 100% 100%;
    }
    .container {
      position: absolute;
      top: .6rem;
      width: 5.2rem;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      .signlist {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 1.2rem;
        margin: auto;
        display: flex;
        justify-content: space-between;
        li {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          img {
            width: .67rem;
            height: .67rem;
          }
          div {
            font-weight: 400;
            color: rgba(227, 211, 182, 1);
          }
        }
      }
      .btn {
        width: 4.98rem;
        height: 1.04rem;
        line-height: 1.04rem;
        text-align: center;
        background: url("./images/package/sign_btn.png");
        background-size: 100% 100%;
        position: absolute;
        bottom: 0;
        font-size: .3rem;
        font-weight: bold;
        color: rgba(57, 61, 80, 1);
        &.signed {
          background: url("./images/package/signed_btn.png");
          background-size: 100% 100%;
          color: rgba(57, 61, 80, 1);
        }
      }
    }
  }

  .section2 {
    position: relative;
    height: 6.52rem;
    margin-bottom: .28rem;
    &:before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
      width: 6.09rem;
      height: .66rem;
      background: url("./images/package/chongzhitips.png");
      background-size: 100% 100%;
    }
    .container {
      position: absolute;
      top: .82rem;
      bottom: 0;
      left: 1rem;
      right: 1.04rem;
      display: flex;
      flex-shrink: 0;
      flex-wrap: wrap;
      justify-content: space-between;
      img {
        width: 2.52rem;
        height: 2.81rem;
        margin-bottom: .1rem;
      }
    }
  }

  .section3 {
    position: relative;
    height: 3rem;
    padding-bottom: .37rem;
    &:before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
      width: 6.09rem;
      height: .36rem;
      background: url("./images/package/dailytasktab@2x.png");
      background-size: 100% 100%;
    }
    .container {
      position: absolute;
      top: .63rem;
      bottom: 0;
      left: .53rem;
      right: .57rem;
      .info {
        height: .32rem;
        font-size: .28rem;
        font-weight: bold;
        color: rgba(227, 211, 182, 1);
        display: flex;
        align-items: center;
        img {
          margin-left: .23rem;
          width: .34rem;
          height: .32rem;
        }
      }
      .bonus {
        margin-top: .2rem;
        height: 1.85rem;
        position: relative;
        ul {
          display: flex;
          position: absolute;
          z-index: 1;
          li {
            display: flex;
            flex-direction: column;
            color: rgba(227, 211, 182, 1);
            align-items: center;
            position: relative;
            &:before {
              content: '';
              position: absolute;
              width: .39rem;
              height: .45rem;
              background: url("./images/package/bonus1.png");
              background-size: 100% 100%;
              top: .5rem;
            }
            &:nth-child(1) {
              margin-right: .38rem;
            }
            &:nth-child(2) {
              margin-right: .73rem;
            }
            &:nth-child(3) {
              margin-right: 1.03rem;
            }
            .jifen {
              font-size: .18rem;
              width: .99rem;
              height: .38rem;
              line-height: .3rem;
              text-align: center;
              background: url("./images/package/jifeninfo.png");
              background-size: 100% 100%;
              margin-bottom: .7rem;
            }
            .award_name {
              font-size: .2rem;
              font-weight: bold;
            }
            .award_status {
              margin-top: .13rem;
              width: .96rem;
              height: .52rem;
              background: url("./images/package/bonus_btn.png");
              background-size: 100% 100%;
              &.gained {
                margin-top: .18rem;
                width: .96rem;
                height: .4rem;
                background: url("./images/package/bonus_gain_btn.png");
                background-size: 100% 100%;
              }
            }
          }
        }
        .progress {
          position: absolute;
          top: .5rem;
          height: .45rem;
          left: 0;
          right: 0;
          display: flex;
          align-items: center;
          .progress-bar {
            height: .1rem;
            background: rgba(58, 64, 96, 1);
            border-radius: .05rem;
            width: 100%;
            position: relative;
            .progress-bar-len {
              height: 100%;
              background: rgba(209, 171, 142, 1);
              border-radius: .05rem;
            }
          }
        }
      }
    }
  }

  .section4 {
    position: relative;
    height: 6.6rem;
    padding-bottom: .78rem;
    .tabs {
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
      width: 6.11rem;
      height: .6rem;
      line-height: .6rem;
      background: rgba(57, 61, 80, 1);
      border: 1px solid rgba(222, 201, 170, 1);
      border-radius: .1rem;
      font-weight: bold;
      color: rgba(222, 201, 170, 1);
      ul {
        display: flex;
        li {
          flex: 1;
          text-align: center;
          &.actived {
            background: rgba(95, 101, 137, 1);
            border-radius: .1rem;
          }
        }
      }
    }
    .list {
      position: absolute;
      top: .8rem;
      width: 6.09rem;
      height: 5.8rem;
      left: 0;
      right: 0;
      margin: auto;
      .game_item {
        width: 6.09rem;
        height: 1.3rem;
        background: url("./images/package/game_bg.png");
        background-size: 100% 100%;
        margin-bottom: .2rem;
        padding: .2rem;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &:last-child {
          margin-bottom: 0;
        }
        .pic {
          width: .88rem;
          height: .9rem;
        }
        .info {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: .73rem;
          .title {
            font-size: .26rem;
            font-weight: bold;
            color: rgba(239, 239, 239, 1);
          }
          .progress {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: .24rem;
            font-weight: bold;
            color: rgba(241, 227, 215, 1);
            .progressbar {
              width: 2rem;
              height: .3rem;
              background: rgba(17, 25, 53, 1);
              border-radius: .08rem;
              .progress-bar-len {
                width: 50%;
                height: 100%;
                background: rgba(209, 171, 142, 1);
                border-radius: .08rem;
              }
            }
            img {
              margin-left: .13rem;
              margin-right: .07rem;
              width: .34rem;
              height: .34rem;
            }
          }
        }
        .btn {
          width: 1.2rem;
          text-align: center;
          height: .46rem;
          line-height: .46rem;
          font-weight: bold;
          color: rgba(42, 48, 68, 1);
          background: url("./images/package/gainjifen.png");
          background-size: 100% 100%;
        }
      }
    }
  }

  .section5 {
    position: relative;
    height: 3.59rem;
    padding-bottom: .94rem;
    &:before {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      margin: auto;
      width: 6.09rem;
      height: .66rem;
      background: url("./images/package/chongzhitips.png");
      background-size: 100% 100%;
    }
    .container {
      position: absolute;
      top: 1.17rem;
      bottom: 0;
      left: 1rem;
      right: 1.04rem;
      display: flex;
      flex-shrink: 0;
      flex-wrap: wrap;
      justify-content: center;
      img {
        width: 2.47rem;
        height: 2.42rem;
      }
    }
  }
</style>
