<template>
  <div class="mask-container" v-if="value">
    <div
      class="mask"
      @touchmove.prevent
      :style="{height:currentindex==='second'&&topfive.length>0?'14.9rem':''} "
    ></div>
    <!-- 规则 -->
    <!-- <div class="mask-mask" > -->
    <template v-if="value===1">
      <div class="rule-bg">
        <div class="rule-container">
          <p class="light-color">
            <span class="dark-color">① 活动时间</span>
            ：{{activityInfo.beginDate}}-{{activityInfo.endDate}}，共5天
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
              <td>500元京东券</td>
            </tr>
            <tr>
              <td style=" border-right: 1px solid rgba(151,14,67,1);">排名第3名且金币数≥5000</td>
              <td>400元京东券</td>
            </tr>
            <tr>
              <td style=" border-right: 1px solid rgba(151,14,67,1);">排名前6名且金币数≥4000</td>
              <td>300元京东券</td>
            </tr>
            <tr>
              <td style=" border-right: 1px solid rgba(151,14,67,1);">排名前10名且金币数≥4000</td>
              <td>200元京东券</td>
            </tr>
            <tr>
              <td style=" border-right: 1px solid rgba(151,14,67,1);">排名前20名且金币数≥2000</td>
              <td>100元话费券</td>
            </tr>
            <tr>
              <td
                style="border-bottom:none;border-right: 1px solid rgba(151,14,67,1);"
              >排名前30名且金币数≥1000</td>
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
    <!-- 攻略,金币记录,往期榜单(无光背景) -->
    <!-- 太棒了（有光背景） -->
    <template
      v-if="value===2||value===3||value===4||value===5||value===6||value===7||value===8||value===9"
    >
      <div
        v-if="value===2||value===3||value===4||value===5||value===6||value===7||value===8||value===9"
        class="nolight-bg"
        :class="value===5||value===6||value===7||value===8||value===9?'light-bg':''"
      >
        <div>
          <div class="nolight-title">
            <img v-if="value===2" src="../images/compop/guide.png" alt />
            <img v-if="value===3" src="../images/compop/coinrecord.png" alt />
            <img v-if="value===4" src="../images/compop/topedlist.png" alt />
            <img v-if="value===5" src="../images/compop/toogood.png" alt />
            <img v-if="value===6" src="../images/compop/continue.png" alt />
            <img v-if="value===7||value===8" src="../images/compop/congratulation.png" alt />
            <img v-if="value===9" src="../images/compop/aiya.png" alt />
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
              <template v-if="coinrecord.length>0">
                <ul class="coinrecord-list">
                  <li>
                    <div class="datatime">日期</div>
                    <div class="gaincoin-num">获得金币数</div>
                  </li>
                  <div class="coin-scroll">
                    <li v-for="(item,key) in coinrecord" :key="key">
                      <div>{{item.date}}</div>
                      <div>{{item.coinNum}}</div>
                    </li>
                  </div>
                </ul>
              </template>
              <template v-if="coinrecord.length==0">
                <img class="nocoinrecord" src="../images/compop/sorry.png" alt />
                <p class="notop-tips">暂无上榜记录</p>
              </template>
            </div>
          </template>
          <!-- 往期榜单 -->
          <template v-if="value===4">
            <div class="topedlist-container">
              <div class="topedlist-tab">
                <!-- 昨日榜单按钮 -->
                <div
                  class="yesterday-btn"
                  @click="currenttoplist='yesterday'"
                  :style="{backgroundColor:currenttoplist==='toped'?'#ff5b57':''}"
                >
                  <img src="../images/compop/yesterday-btn.png" alt />
                </div>
                <!-- 往期榜单按钮 -->
                <div
                  class="toped-btn"
                  @click="currenttoplist='toped'"
                  :style="{backgroundColor:currenttoplist==='toped'?'transparent':''}"
                >
                  <img src="../images/compop/toped-btn.png" alt />
                </div>
              </div>
              <!-- 切换部分 昨日榜单 -->
              <template>
                <div class="toped-tab-container">
                  <ul>
                    <!--  昨日榜单-->
                    <template v-if="currenttoplist==='yesterday'&&yesterdayList.length>0">
                      <li>
                        <div>排名</div>
                        <div>昵称</div>
                        <div>金币数</div>
                        <div>奖励</div>
                      </li>
                      <div class="toped-list-inner topthreecss">
                        <li v-for="(item,key) in topthreeData" :key="'info1'+key">
                          <div>{{item.ranking}}</div>
                          <div>{{item.nickname}}</div>
                          <div>{{item.coinNum}}</div>
                          <div>{{item.awardsName}}</div>
                        </li>
                        <template v-if="isOpen">
                          <li v-for="(item,index) in otherData" :key="'inf'+index">
                            <div>{{item.ranking}}</div>
                            <div>{{item.nickname}}</div>
                            <div>{{item.coinNum}}</div>
                            <div>{{item.awardsName}}</div>
                          </li>
                        </template>

                        <li v-if="!isOpen">
                          <img
                            @click.stop="closeOpenProfit"
                            class="clickshow"
                            src="../images/compop/clickshow.png"
                            alt
                          />
                        </li>
                        <li v-for="(item,index) in lastTwoData " :key="'info'+index">
                          <div>{{item.ranking}}</div>
                          <div>{{item.nickname}}</div>
                          <div>{{item.coinNum}}</div>
                          <div>{{item.awardsName}}</div>
                        </li>
                      </div>
                    </template>
                    <template v-if="currenttoplist==='yesterday'&&yesterdayList.length==0">
                      <img class="sorry" src="../images/compop/sorry.png" alt />
                      <p class="notop-tips">暂无上榜记录</p>
                    </template>
                    <!--  往期排名-->
                    <template v-if="currenttoplist==='toped'">
                      <template v-if="rankingList.length>0">
                        <li>
                          <div>日期</div>
                          <div>排名</div>
                          <div>当日金币数</div>
                          <div>奖励</div>
                        </li>
                        <div class="toped-list-inner toped-second">
                          <li v-for="(item,key) in rankingList" :key="key">
                            <div>{{item.date}}</div>
                            <div>{{item.ranking}}</div>
                            <div>{{item.coinNum}}</div>
                            <div>{{item.awardsName}}</div>
                          </li>
                        </div>
                      </template>
                      <template v-if="rankingList.length==0">
                        <img class="sorry" src="../images/compop/sorry.png" alt />
                        <p class="notop-tips">暂无上榜记录</p>
                      </template>
                    </template>
                  </ul>
                </div>
              </template>
            </div>
          </template>
          <!-- 太棒了(恭喜您获得金币)，继续加油暂未上榜，恭喜您（昨日富翁榜上榜，获得奖品）恭喜您（终极土豪榜上榜获得奖品） 哎呀（富翁榜被反超） -->
          <template v-if="value===5||value===6||value===7||value===8||value===9">
            <div class="light-container">
              <img v-if="value===5" src="../images/compop/goldcoin.png" alt />
              <img v-if="value===6" src="../images/compop/comeon.png" alt />
              <!-- 奖品 -->
              <img
                v-if="value===7&&ontop.awardsType==='jdk'||value===8&&supertop.awardsType==='jdk' "
                src="../images/compop/jdk.png"
                alt
              />
              <img
                v-if="value===7&&ontop.awardsType==='hfq'||value===8&&supertop.awardsType==='hfq'"
                src="../images/compop/hfq.png"
                alt
              />
              <img v-if="value===9" src="../images/compop/pass.png" alt />
              <!-- 弹窗下面文字提示 -->
              <template v-if="value===5||value===6">
                <p v-if="value===5" class="purpletexts onerowtips">
                  恭喜您获得
                  <span class="orangetexts">{{addcoin.awardsNum}}个金币</span>
                </p>
                <p v-if="value===6" class="purpletexts onerowtips">
                  昨日获得
                  <span class="orangetexts">{{notop.awardsNum}}金币</span>，暂未上榜哦~
                </p>
                <div class="iknow" @click="close"></div>
              </template>
              <!-- 恭喜您上富翁榜弹窗下方文字提示 -->
              <template v-if="value===7">
                <p class="purpletexts congra-ontop">
                  昨日富翁榜
                  <span class="orangetexts">第{{ontop.awardsNum}}名</span>,
                  <br />获得
                  <span class="orangetexts">{{ontop.propAwardsName}}</span>
                </p>
                <p class="purpletexts" style="font-size:0.2rem">榜单奖励已自动发放到账</p>
                <div class="iknow congra-iknow" @click="close"></div>
              </template>
              <!-- 恭喜您上终极土豪榜弹窗下方文字提示 -->
              <template v-if="value===8">
                <p class="purpletexts endtop">
                  终极土豪榜
                  <span class="orangetexts">第{{supertop.awardsNum}}名</span>,
                  <br />获得
                  <span class="orangetexts">{{supertop.propAwardsName}}</span>
                </p>
              </template>
              <!-- 哎呀（富翁榜被反超） -->
              <template v-if="value===9">
                <p class="purpletexts pass">今日富翁榜排名刚刚 不小心被反超啦！</p>
                <div class="pass-btn">
                  <div class="ioverpass-btn" @click="goshop"></div>
                  <div class="iknow pass-iknow" @click="close"></div>
                </div>
              </template>
            </div>
          </template>
        </div>
      </div>
    </template>
    <div class="close" :class="value===1?'close-up':''" @click="close" :style="{top:value===1?'10.5rem':''}">
      <img src="../images/compop/close.png" alt />
    </div>
    <!-- </div> -->
  </div>
</template>
<script>
import {} from "../services/api";
import _get from "lodash.get";
import {
  ranklist,
  totalranklist,
  activityinfo,
  coinrecord,
  prerankinfo
} from "../services/api";
export default {
  data() {
    return {
      continume: true,
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
        { time: "3-31 14:05", num: "50220" }
      ],
      // 昨日榜单
      yesterdaylist: [
        {
          id: "1",
          nickname: "这里是昵称",
          coinnum: "5500",
          prizename: "800元京东券"
        },
        {
          id: "2",
          nickname: "这里是昵称",
          coinnum: "5500",
          prizename: "800元京东券"
        }
        // {
        //   id: "3",
        //   nickname: "这里是昵1231212称",
        //   coinnum: "5501210123",
        //   prizename: "800元京东券"
        // },
        // {
        //   id: "4",
        //   nickname: "这里是昵称",
        //   coinnum: "5501210",
        //   prizename: "800元京东券"
        // },
        // {
        //   id: "5",
        //   nickname: "这里是昵称",
        //   coinnum: "5500",
        //   prizename: "800元京东券"
        // },
        // {
        //   id: "6",
        //   nickname: "这里是昵称",
        //   coinnum: "5500",
        //   prizename: "800元京东券"
        // },
        // {
        //   id: "7",
        //   nickname: "这里是昵称",
        //   coinnum: "5500",
        //   prizename: "800元京东券"
        // },
        // {
        //   id: "8",
        //   nickname: "这里是昵称",
        //   coinnum: "5500",
        //   prizename: "800元京东券"
        // },
        // {
        //   id: "9",
        //   nickname: "这里是昵称",
        //   coinnum: "5500",
        //   prizename: "8元话费券"
        // },
        //    {
        //   id: "10",
        //   nickname: "这里是昵称",
        //   coinnum: "5500",
        //   prizename: "8元话费券"
        // },
        //    {
        //   id: "11",
        //   nickname: "这里是昵称",
        //   coinnum: "5500",
        //   prizename: "8元话费券"
        // },
        //    {
        //   id: "12",
        //   nickname: "这里是昵称",
        //   coinnum: "5500",
        //   prizename: "8元话费券"
        // },
        //    {
        //   id: "13",
        //   nickname: "这里是昵称",
        //   coinnum: "5500",
        //   prizename: "8元话费券"
        // },
        //    {
        //   id: "14",
        //   nickname: "这里是昵称",
        //   coinnum: "5500",
        //   prizename: "8元话费券"
        // },
      ],
      // 往期排名
      topedlist: [
        { time: "3-31", order: "1", num: "5500", prize: "800元京东券" },
        { time: "3-31", order: "1", num: "5500", prize: "800元京东券" },
        { time: "3-31", order: "1", num: "5500", prize: "800元京东券" },
        { time: "3-31", order: "1", num: "5500", prize: "800元京东券" },
        { time: "3-31", order: "1", num: "5500", prize: "800元京东券" },
        { time: "3-31", order: "1", num: "5500", prize: "800元京东券" },
        { time: "3-31", order: "1", num: "5500", prize: "800元京东券" },
        { time: "3-31", order: "1", num: "5500", prize: "800元京东券" },
        { time: "3-31", order: "1", num: "5500", prize: "800元京东券" }
      ],
      isOpen: true,
      click: true,
      currenttoplist: "yesterday",
      defaultIndex: 3,
      lastTwoData: [],
      topthreeData: [],
      otherData: [],
      yesterdayList: [],
      rankingList: [],
      ontop1: {},
      addcoin1: {},
      pass1: {},
      supertop1: {},
      index: 1,
      endlist: 2
    };
  },
  created() {},
  mounted() {

    this.getRankList();
  },
  computed: {},

  methods: {
    // 获取金币按钮(跳转商城)
    goshop() {
      parent.location.href = "https://wap.beeplaying.com/xmWap/#/payment/";
    },
    // 往期榜单接口（昨日榜单，上榜记录）
    async getRankList() {
      this.isLoading = true;
      const res = await prerankinfo();
      this.prerankinfo = _get(res, "data", {});
      this.yesterdayList = this.prerankinfo.yesterdayList;
      this.rankingList = this.prerankinfo.rankingList;
      // console.log(this.yesterdayList, this.rankingList);
      // 如果超出一屏高度，排行榜则用展开按钮分割，点击时展开所有排行榜
      if (this.yesterdayList && this.yesterdayList.length > 3) {
        this.lastTwoData = this.yesterdayList.slice(3);
      }
      if (this.yesterdayList && this.yesterdayList.length > 6) {
        this.isOpen = false;
        this.lastTwoData = this.yesterdayList.slice(
          this.yesterdayList.length - 2
        );
        this.otherData = this.yesterdayList.slice(
          3,
          this.yesterdayList.length - 2
        );
      }
      this.topthreeData = this.yesterdayList.slice(0, 3);

      this.isLoading = false;
    },
    // 点击展开排行榜按钮
    closeOpenProfit() {
      this.isOpen = true;
    },
    close() {
      this.$emit("input", 0);
      // 如果弹窗数组长度大于2（即要弹两个弹窗时）
      if (this.activityInfo.popupList.length >= 2 && this.index === 1) {
        setTimeout(() => {
          this.$emit("close-index", this.index);
          if (this.activityInfo.popupList.length === 3) {
            this.index = 2;
          }
        }, 300);
      }
      // 如果弹窗数组长度等于3（即第二个弹窗之后判断还有第三个弹窗时）
      if (this.activityInfo.popupList.length === 3 && this.index === 2) {
        setTimeout(() => {
          this.$emit("close-index", this.endlist);
        }, 300);
      }
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
    },
    activityInfo: {
      type: Object,
      default: {}
    },
    coinrecord: {
      type: Array,
      default: []
    },
    // 未上榜
    notop: {
      type: Object,
      default: {}
    },
    // 上榜
    ontop: {
      type: Object,
      default: {}
    },
    // 金币新增
    addcoin: {
      type: Object,
      default: {}
    },
    // 排名反超
    pass: {
      type: Object,
      default: {}
    },
    // 终极土豪榜
    supertop: {
      type: Object,
      default: {}
    }
    // endlist:{
    //   type:Number,
    //   default:0
    // }
    //   yesterdayList:{
    //     type:Array,
    //     default:[]
    //   },
    // rankingList:{
    //   type:Array,
    //   default:[]
    // }
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
.mask-container {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  left: 0;
  z-index: 1;
  .mask-mask {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 11;
  }
}
.mask {
  width: 100%;
  // height: 12.8rem;
  // height: 14rem;
  height: 100%;
  z-index: 2;
  position: fixed;
  // position: absolute;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}
// 规则弹窗
.rule-bg {
  background: url(../images/compop/rule-bg.png);
  background-size: 100% 100%;
  width: 6.11rem;
  height: 9.1rem;
  margin: 0.7rem auto 0;
  position: relative;
  // overflow-y: scroll;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  animation: change 0.5s linear;
  z-index: 5;
  .rule-container {
    margin: 1.8rem auto 0;
    width: 4.94rem;
    
    overflow: auto;
    height: 6.9rem;
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
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5;
  animation: change 0.5s linear;
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
        div {
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
    // 抱歉表情
    .nocoinrecord {
      margin: 1.2rem auto 0;
      width: 2rem;
      height: 2rem;

      display: block;
    }
    // 未上榜文字提示
    .notop-tips {
      text-align: center;
      margin: 0.3rem auto 0;
      font-size: 0.32rem;
      font-family: PingFang SC;
      font-weight: bold;
      color: rgba(156, 15, 68, 1);
    }
  }
  // 往期榜单
  .topedlist-container {
    margin: 0.7rem auto 0;
    width: 5.38rem;
    height: 4.07rem;
    .topedlist-tab {
      background: url(../images/compop/topedlist-tab.png);
      background-size: 100% 100%;
      width: 3.3rem;
      height: 0.5rem;
      margin: 0 auto;
      display: flex;
      .yesterday-btn {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0.5rem 0.5rem 0.5rem 0.5rem;
        background-size: 100% 100%;
        width: 1.5rem;
        height: 0.5rem;
        transition: all 0.5s;
        img {
          width: 0.89rem;
          height: 0.25rem;
        }
      }
      .toped-btn {
        transition: all 0.5s;
        background-color: #ff5b57;
        border-radius: 0.5rem 0.5rem 0.5rem 0.5rem;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 0.89rem;
          height: 0.25rem;
        }
      }
    }
    // 昨日榜单
    .toped-tab-container {
      height: 3.6rem;
      animation: tab 0.5s linear;
      transition: all 0.5s;
      // 抱歉表情
      .sorry {
        margin: 0.4rem auto 0;
        width: 2rem;
        height: 2rem;
        display: block;
      }
      // 未上榜文字提示
      .notop-tips {
        text-align: center;
        margin: 0.3rem auto 0;
        font-size: 0.32rem;
        font-family: PingFang SC;
        font-weight: bold;
        color: rgba(156, 15, 68, 1);
      }
      ul {
        height: 100%;
        // overflow: hidden;
        li {
          display: flex;
          justify-content: space-around;
          margin-top: 0.21rem;
        }
        li:first-child {
          div {
            font-size: 0.2rem;
            font-family: PingFang SC;
            font-weight: bold;
            color: rgba(156, 15, 68, 1);
          }
        }
        .toped-list-inner {
          height: 91%;
          overflow: auto;
          &.topthreecss {
            .clickshow {
              width: 2.64rem;
              height: 0.46rem;
              margin: 0 auto;
            }
            li {
              &:nth-child(1) {
                div:nth-child(1) {
                  width: 0.3rem;
                  height: 0.3rem;
                  background: rgba(255, 94, 87, 1);
                  border-radius: 50%;
                }
              }
              &:nth-child(2) {
                div:nth-child(1) {
                  width: 0.3rem;
                  height: 0.3rem;
                  background: rgba(254, 127, 117, 1);
                  border-radius: 50%;
                }
              }
              &:nth-child(3) {
                div:nth-child(1) {
                  width: 0.3rem;
                  height: 0.3rem;
                  background: rgba(254, 179, 79, 1);
                  border-radius: 50%;
                }
              }
            }
          }
          li {
            justify-content: space-between;
            align-items: center;
            div {
              font-weight: normal;
              font-size: 0.2rem;
              font-family: PingFang SC;
              // font-weight:bold;
              color: rgba(156, 15, 68, 1);
              text-align: center;
            }
            div:first-child {
              width: 0.3rem;
              font-size: 0.22rem;
              font-family: PingFang SC;
              font-weight: bold;
              color: rgba(156, 15, 68, 1);
              margin-left: 0.5rem;
              text-align: center;
              line-height: 0.3rem;
            }
            div:nth-child(2) {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              width: 2rem;
              padding-left: 0.3rem;
            }
            div:nth-child(3) {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              width: 1rem;
              // padding-left: 0.15rem;
            }
            div:nth-child(4) {
              width: 1.5rem;
            }
          }
          // 往期排名
          &.toped-second {
            li {
              div:first-child {
                width: 1rem;
                padding-left: 0.23rem;
                font-weight: normal;
                margin-left: 0rem;
              }
              div:nth-child(2) {
                width: 1rem;
                padding-left: 0rem;
              }
              div:nth-child(3) {
                padding-left: 0.3rem;
              }
            }
          }
        }
      }
    }
  }
}
// 无光背景
.light-bg {
  background: url(../images/compop/light-bg.png);
  background-size: 100% 100%;
  width: 6.11rem;
  height: 6.83rem;
  margin: 1.8rem auto 0;
  overflow: hidden;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5;
  // 太棒了（恭喜您获得金币 有光背景）
  .light-container {
    margin: 0.43rem auto 0;
    width: 5.38rem;
    height: 4.65rem;
    img {
      width: 2rem;
      height: 2rem;
      margin: 1rem auto 0;
      display: block;
    }
    .purpletexts {
      font-size: 0.32rem;
      font-family: PingFang SC;
      font-weight: bold;
      color: rgba(156, 15, 68, 1);
      text-align: center;
      &.onerowtips {
        margin: 0.45rem auto 0;
        text-align: center;
      }
      &.congra-ontop {
        margin: 0.05rem auto 0;
        text-align: center;
        line-height: 0.4rem;
      }
      &.endtop {
        margin: 0.48rem auto 0;
        line-height: 0.45rem;
      }
      &.pass {
        width: 3rem;
        text-align: center;
        margin: 0.23rem auto 0;
        line-height: 0.4rem;
      }
    }
    .orangetexts {
      font-size: 0.32rem;
      font-family: PingFang SC;
      font-weight: bold;
      color: #ff4828;
    }
    .iknow {
      background: url(../images/compop/iknow.png);
      background-size: 100% 100%;
      width: 2.4rem;
      height: 0.81rem;
      margin: 0.25rem auto 0;
      &.pass-iknow {
        margin: 0;
      }
      &.congra-iknow {
        margin: 0.11rem auto 0;
      }
    }
    .pass-btn {
      margin-top: 0.05rem;
      justify-content: space-around;
      display: flex;
      .ioverpass-btn {
        background: url(../images/compop/ipass.png);
        background-size: 100% 100%;
        width: 2.41rem;
        height: 0.82rem;
      }
    }
  }
}
.close {
  width: 0.5rem;
  height: 0.5rem;
  margin: 0.36rem auto 0;
  position: absolute;
  top: 9rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
  &.close-up{
    margin: 0 auto;
    top: 9.9rem!important;
  }
  img {
    display: block;
    width: 0.6rem;
    height: 0.6rem;
  }
}

@keyframes tab {
  0% {
    opacity: 0;
  }
  50% {
    // transform: scale(0.9);
  }
  100% {
    // transform: scale(1);
    opacity: 1;
  }
}
</style>