<template>
  <div
    class="mask"
    v-if="value"
    :style="{height:currentindex==='second'&&topfive.length>0?'14.9rem':''}"
  >
    <!-- 规则 -->
    <template v-if="value===1">
      <div class="rule-bg">
        <div class="rule-container">
          <p class="light-color">
            <span class="dark-color">① 活动时间</span>：3月30日-4月3日，共5天
          </p>
          <p class="dark-color">② 活动期间，单笔充值每满5元送1个金币，累计金币上榜有奖;</p>
          <p class="dark-color">③ 每日富翁榜</p>
          <p class="light-color">• 单天累计金币≥1000，则有机会登榜每日富豪榜;</p>
          <p class="light-color">• 金币统计时间为每天0点-24点，最终金币数最高的前30名玩家上榜;</p>
          <p class="light-color">• 每天0点起由系统自动发放上期榜单奖励，共发榜5次</p>
          <p class="dark-color">• 富翁榜奖励梯度如下：</p>
          <table>
            <tr>
              <td style=" border-right: 1px solid rgba(151,14,67,1);text-align:center">当日金币数</td>
              <td style="text-align:center">奖励</td>
            </tr>
            <tr>
              <td style=" border-right: 1px solid rgba(151,14,67,1);">排名第1名且金币数≥5000</td>
              <td>800元京东券</td>
            </tr>
            <tr>
              <td style=" border-right: 1px solid rgba(151,14,67,1);">排名第2名且金币数≥5000</td>
              <td>500京东券</td>
            </tr>
            <tr>
              <td style=" border-right: 1px solid rgba(151,14,67,1);">排名第3名且金币数≥5000</td>
              <td>400京东券</td>
            </tr>
            <tr>
              <td style=" border-right: 1px solid rgba(151,14,67,1);">排名第6名且金币数≥4000</td>
              <td>300京东券</td>
            </tr>
            <tr>
              <td style=" border-right: 1px solid rgba(151,14,67,1);">排名第10名且金币数≥4000</td>
              <td>200京东券</td>
            </tr>
            <tr>
              <td style=" border-right: 1px solid rgba(151,14,67,1);">排名第20名且金币数≥2000</td>
              <td>100元话费券</td>
            </tr>
            <tr>
              <td
                style="border-bottom:none;border-right: 1px solid rgba(151,14,67,1);"
              >排名第30名且金币数≥1000</td>
              <td style="border-bottom:none;">10元话费券</td>
            </tr>
          </table>
          <p class="dark-color">④ 终极土豪榜</p>
          <p class="light-color">• 活动共5天，累计金币最多的5位玩家，赢终极大奖;</p>
          <p class="light-color">• 活动结束后，上榜奖励由系统自动发放到账;</p>
          <p class="dark-color">⑤ 金币数相同，则先达成者排名优先;</p>
          <p class="dark-color">⑥ 如有问题，请联系在线客服。</p>
        </div>
      </div>
    </template>
    <!-- 攻略,金币记录,往期榜单 -->
    <template v-if="value===2||value===3||value===4">
      <div class="nolight-bg">
        <div class="nolight-title">
          <img v-if="value===2" src="../images/compop/guide.png" alt />
          <img v-if="value===3" src="../images/compop/coinrecord.png" alt />
            <img v-if="value===4" src="../images/compop/topedlist.png" alt />
        </div>
        <!-- 攻略 -->
        <template v-if="value==2">
          <div class="guide-container">
            <p class="guide-texts">
              <img src="../images/compop/guide1.png" alt /> 充值送金币
            </p>
            <p class="guide-light-texts">
              • 单笔充值
              <span class="guide-orange-texts">每满5元送1个金币,</span>累计金币
              <span class="guide-orange-texts">上榜有奖</span>;
            </p>
            <p class="guide-texts">
              <img src="../images/compop/guide2.png" alt /> 每日富翁榜
            </p>
            <p class="guide-light-texts">• 单天累计金币≥1000，则有机会登榜每日富豪榜;</p>
            <p class="guide-light-texts">• 金币统计时间为每天0点-24点,最终金币数最高的前30名玩家上榜;</p>
            <p class="guide-light-texts">
              • 上榜奖励共7种，最高
              <span class="guide-orange-texts">800元京东券</span>,详见规则;
            </p>
            <p class="guide-light-texts">• 每天0点系统自动发放上期榜单奖励;</p>
            <p class="guide-texts">
              <img src="../images/compop/guide3.png" alt /> 终极土豪榜
            </p>
            <p class="guide-light-texts">
              • 活动5天内，累计金币最多的5位玩家,
              <span class="guide-orange-texts">赢终极大奖</span>
            </p>
          </div>
        </template>
        <!-- 金币记录 -->
        <template v-if="value===3">
          <div class="coinrecord-container">
            <ul class="coinrecord-list">
              <li>
                <div class="datatime">日期</div>
                <div class="gaincoin-num">获得金币数</div>
              </li>
              <div class="coin-scroll">
                <li v-for="(item,key) in coinlist" :key="key">
                  <div>{{item.time}}</div>
                  <div>{{item.num}}</div>
                </li>
              </div>
            </ul>
          </div>
        </template>
        <!-- 往期榜单 -->
        <template v-if="value===4">
          <div class="topedlist-container">
            <div class="topedlist-tab">

            </div>
          </div>
        </template>
      </div>
    </template>

    <!-- <div class="pop-bg" :class="[value==7&&prizeshow.sort-1==0?'big-pop-bg':'']">

    </div>-->
    <div class="close" @click.stop="close">
      <img src="../images/compop/close.png" alt />
    </div>
  </div>
</template>
<script>
import {} from "../services/api";
import _get from "lodash.get";

export default {
  data() {
    return {
      coinlist: [
        { time: "3-31 14:05", num: "500" },
        { time: "3-31 14:05", num: "1500" },
        { time: "3-31 14:05", num: "50" },
        { time: "3-31 14:05", num: "0" },
        { time: "3-31 14:05", num: "500" },
        { time: "3-31 14:05", num: "5010" },
        { time: "3-31 14:05", num: "50220" },
        { time: "3-31 14:05", num: "503330" },
          { time: "3-31 14:05", num: "50220" },
            { time: "3-31 14:05", num: "50220" },
              { time: "3-31 14:05", num: "50220" },
                { time: "3-31 14:05", num: "50220" },
      ],
      click: true
    };
  },
  created() {},
  mounted() {},
  methods: {
    // 更多了解返利卡（跳转到规则）
    gorule() {
      this.$emit("input", 1);
    },
    // 去获取宝石
    goshop() {
      window.location.href = "https://wap.beeplaying.com/xmWap/#/payment/";
      this.$emit("input", 0);
    },
    close() {
      this.$emit("input", 0);
      // 传父组件click开关 恢复click的值
      this.$emit("clickshow", this.click);
    }
  },
  props: {
    value: {
      type: Number,
      default: 0
    },
    currentindex: {
      type: String,
      default: ""
    },
    topfive: {
      type: Array,
      default: []
    }
  }
};
</script>
<style lang="less">
* {
  padding: 0;
  margin: 0;
}

@keyframes change {
  0% {
    -webkit-transform: scale(0);
    // scale:0
  }
  50% {
    -webkit-transform: scale(1.2);
  }
  100% {
    -webkit-transform: scale(1);
  }
}

@-webkit-keyframes change {
  0% {
    -webkit-transform: scale(0);
    // scale:0
  }
  50% {
    -webkit-transform: scale(1.2);
  }
  100% {
    -webkit-transform: scale(1);
  }
}
.mask {
  width: 100%;
  // height: 12.8rem;
  height: 14rem;

  // position: fixed;
  position: absolute;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  animation: change 0.4s linear;
  -webkit-animation: change 0.4s linear;
  -moz-animation: change 0.4s linear;
  // 规则弹窗
  .rule-bg {
    background: url(../images/compop/rule-bg.png);
    background-size: 100% 100%;
    width: 6.11rem;
    height: 10.49rem;
    margin: 0.6rem auto 0;
    position: relative;
    overflow: hidden;
    .rule-container {
      margin: 1.99rem auto 0;
      width: 4.94rem;

      .light-color {
        font-size: 0.2rem;
        font-family: PingFang SC;
        color: rgba(156, 15, 68, 1);
        line-height: 0.32rem;
      }
      .dark-color {
        font-size: 0.2rem;
        font-family: PingFang SC;
        font-weight: bold;
        color: rgba(156, 15, 68, 1);
        line-height: 0.32rem;
      }
      table {
        border-collapse: separate;
        border-spacing: 0;
        width: 4.7rem;
        height: 3.25rem;
        border: 1px solid rgba(151, 14, 67, 1);
        border-radius: 0.16rem;
        margin: 0.1rem auto 0.1rem;
        td {
          padding-left: 0.19rem;
          border-bottom: 1px solid rgba(151, 14, 67, 1);
        }
        tr {
          font-size: 0.2rem;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(155, 16, 68, 1);
        }
      }
    }
  }
  // 攻略
  .nolight-bg {
    background: url(../images/compop/nolight-bg.png);
    background-size: 100% 100%;
    width: 6.11rem;
    height: 6.83rem;
    margin: 1.8rem auto 0;
    overflow: hidden;
    .nolight-title {
      display: flex;
      margin: 0.78rem auto 0;
      width: 2.2rem;
      height: 0.6rem;

      img {
        width: 2.2rem;
        height: 0.6rem;
      }
    }
    // 攻略
    .guide-container {
      margin: 0.7rem auto 0;
      width: 5.38rem;
      height: 4.07rem;
      padding-right: 0.3rem;
      & p {
        &:nth-child(2),
        &:nth-child(4),
        &:nth-child(5),
        &:nth-child(6),
        &:nth-child(7),
        &:nth-child(9) {
          margin-left: 0.3rem;
        }
      }
      .guide-texts {
        font-size: 0.2rem;
        font-family: PingFang SC;
        font-weight: bold;
        color: rgba(156, 15, 68, 1);
        line-height: 0.36rem;
      }
      .guide-light-texts {
        font-size: 0.2rem;
        font-family: PingFang SC;
        color: rgba(156, 15, 68, 1);
        line-height: 0.36rem;
      }
      .guide-orange-texts {
        font-size: 0.2rem;
        font-family: PingFang SC;
        color: #ff6012;
        line-height: 0.36rem;
      }
      img {
        vertical-align: middle;
        width: 0.58rem;
        height: 0.5rem;
      }
    }
    // 金币记录
    .coinrecord-container {
      margin: 0.7rem auto 0;
      width: 5.38rem;
      height: 4.07rem;
      // padding-right: 0.3rem;
      .coinrecord-list {
        height: 100%;
        width: 90%;
        margin: 0 auto;
        li {
          
          display: flex;
          div{
            flex: 1;
            text-align: center;
          }
        }
        .datatime {
          text-align: center;
          flex: 1;
          font-size: 0.2rem;
          font-family: PingFang SC;
          font-weight: bold;
          color: rgba(156, 15, 68, 1);
        }
        .gaincoin-num {
          text-align: center;
          flex: 1;
          font-size: 0.2rem;
          font-family: PingFang SC;
          font-weight: bold;
          color: rgba(156, 15, 68, 1);
        }
        .coin-scroll {
          height: 90%;
          margin-top: 0.31rem;
    overflow: auto;
          li {
            height: 0.5rem;
            font-size: 0.22rem;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(156, 15, 68, 1);
          }
        }
      }
    }
    // 往期榜单
    .topedlist-container{
        margin: 0.7rem auto 0;
      width: 5.38rem;
      height: 4.07rem;
      .topedlist-tab{
        background: url(../images/compop/topedlist-tab.png);
        background-size: 100% 100%;
        width: 3.3rem;
        height: 0.5rem;
        margin: 0 auto;
      }
    }
  }
  .close {
    width: 0.5rem;
    height: 0.5rem;
    margin: 0.36rem auto 0;
    img {
      display: block;
      width: 0.6rem;
      height: 0.6rem;
    }
  }
}
</style>