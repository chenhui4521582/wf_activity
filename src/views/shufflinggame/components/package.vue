<template>
  <section class="rule2" :style="{zIndex:isShowPop?3:2}">
    <img src="../images/package.png" alt="" @click="showPop">
    <div class="pop-mask" v-if="isShowPop" @touchmove.prevent></div>
    <transition name="scalc">
      <div class="pop" v-if="isShowPop">
        <div class="wrap">
          <div class="main">
            <div class="packages">
              <div class="item" v-for="(item,index) in leaguePacksListArr" @click="gotopay(item)">
                <div class="txt">{{item.content.split('+')[0]}}+{{item.content.split('+')[1]}}</div>
                <div class="btn"></div>
              </div>
            </div>
            <div class="text">累计获得总翻牌点可获得最高奖励 <span>30000元京东卡</span></div>
          </div>
        </div>
        <div class="close-icon" @click="isShowPop = false"></div>
      </div>
    </transition>
  </section>
</template>

<script>
  import {showLeaguePacksList} from '../utils/api'
  export default {
    name: "rule",
    data () {
      return {
        isShowPop: false,
        leaguePacksListArr: [],
      };
    },
    props: {
      ruleMain: {
        type: String,
        default: ""
      },
      from: {
        type: Number,
        default: 0
      }
    },
    methods: {
      async getShowLeaguePacksList() {
        const {code, data} = await showLeaguePacksList()
        if (code === 200) {
          GLOBALS.marchSetsPoint('A_H5PT0156001787')//H5平台-翻牌活动-弹窗反馈-翻牌礼包弹窗加载完成
          this.leaguePacksListArr = data.leaguePacksList
        }
      },
      showPop () {
        this.getShowLeaguePacksList()
        this.isShowPop = true
        GLOBALS.marchSetsPoint('A_H5PT0156001770')//H5平台-翻牌活动-中间区域-礼包按钮点击
      },
      gotopay(item) {
        localStorage.setItem('originDeffer', window.location.href)
        GLOBALS.marchSetsPoint('A_H5PT0156001788', {recharge_rmb: item.price, product_id: item.bizId})   // H5平台-翻牌活动-弹窗反馈-翻牌礼包弹窗-礼包点击
        localStorage.setItem('JDD_PARAM', JSON.stringify(item))
        if (window.linkUrl.getBackUrlFlag(this.channel) == 'bdWap' && this.channel != '100001') { // 好看、全民小视频
          location.href = 'https://wap.beeplaying.com/payment/#/bdPayment'
        } else {
          location.href = 'https://wap.beeplaying.com/payment/#/payment'
        }
      },
    }
  };
</script>

<style rel="stylesheet/less" lang="less" scoped>
  .rule2 {
    position: fixed;
    top: .64rem;
    left: 50%;
    margin-left: -2.81rem;
    img {
      width: 0.88rem;
      height: 0.88rem;
      position: fixed;
      left: 0.04rem;
      top: 3.68rem;
    }

    .pop-mask {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.55);
    }
    .pop {
      position: relative;
      z-index: 10;
      .wrap {
        width: 5.62rem;
        height: 7.64rem;
        background: url("../images/pop/package/bg.png") no-repeat center center /
        100% 100%;
        margin: 0 auto;
        box-sizing: border-box;
        padding: 2.69rem 0.8rem 0;
        .main {
          font-size: 0.2rem;
          font-weight: 400;
          .packages{
            width: 4.01rem;
            height: 4.23rem;
            display: flex;
            flex-direction: column;
            margin-bottom: .13rem;
            .item{
              height: 1.41rem;
              padding: .32rem 0.1rem  0 1.5rem;
              box-sizing: border-box;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              align-items: center;
              .txt{
                font-size:.2rem;
                /*font-weight:800;*/
                color:rgba(255,249,236,1);
              }
              .btn{
                width: 1.97rem;
                height:.75rem;
              }
              &:nth-child(1){
                background: url("../images/pop/package/package1.png") no-repeat center center /
        100% 100%;
                .btn{
                  background: url("../images/pop/package/btn288.png") no-repeat center center /
        100% 100%;
                }
              }
              &:nth-child(2){
                background: url("../images/pop/package/package2.png") no-repeat center center /
        100% 100%;
                .btn{
                  background: url("../images/pop/package/btn888.png") no-repeat center center /
        100% 100%;
                }
              }
              &:nth-child(3){
                background: url("../images/pop/package/package3.png") no-repeat center center /
        100% 100%;
                .btn{
                  background: url("../images/pop/package/btn1888.png") no-repeat center center /
        100% 100%;
                }
              }
            }
          }
          .text{
            font-size: .18rem;
            color: #3F1207;
            span{
              color: #CF5E20;
            }
          }
        }
      }
      .close-icon {
        width: 0.6rem;
        height: 0.6rem;
        background: url("../pages/images/common/close.png") no-repeat center
          center / 100% 100%;
        margin: 0.4rem auto 0;
      }
    }
    .scalc-enter-active {
      animation: fadeAnimation 0.3s ease-in-out;
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
