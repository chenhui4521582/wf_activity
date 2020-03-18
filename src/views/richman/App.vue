<template>
  <section :style="{height:topfive.length&&currentindex==='second'?'14.9rem':''}">
    <div class="stopprevent" :style="{overflow:popType?'hidden':'',height:popType?'100%':''}">
      <div class="big-bg" :style="{}">
        <!-- 气泡 -->
        <div class="bubble" v-if="currentindex==='index'&&rankListInfo.popup===true">
          当前距离上一档奖励
          <br />
          还差{{rankListInfo.lessCoinNum}}金币
        </div>
        <!-- 头部 （排行之上） -->
        <header>
          <div class="back" @click="back"></div>
          <div class="rule" @click="rule"></div>
          <div class="guide" @click="guide"></div>
          <div class="countdown-container">
            <div>
              <div class="countdowntime" v-if="countTime&&activityInfo.state!=2">
                距离今日榜单结束仅剩&nbsp;
                <div v-if="countTime.length" class="block-bg">{{countTime.slice(0,2)}}</div>&nbsp;
                <div v-if="countTime.length">{{countTime.slice(2,3)}}</div>&nbsp;
                <div v-if="countTime.length" class="block-bg">{{countTime.slice(3,5)}}</div>&nbsp;
                <div v-if="countTime.length">{{countTime.slice(5,6)}}</div>&nbsp;
                <div v-if="countTime.length" class="block-bg">{{countTime.slice(6,8)}}</div>&nbsp;
                <div v-if="countTime.length">{{countTime.slice(8,9)}}</div>
              </div>
              <div class="countdowntime" v-if="activityInfo.state==2||countTime==''">
          活动已经结束
              </div>
            </div>
          </div>
          <!-- tab切换 -->
          <div class="tab-card">
            <div
              class="index-btn"
              @click="goindex"
              :class="[currentindex==='second'?'indexcss':'']"
            >
              <img src="./images/cup.png" alt />
              <span>&nbsp;每日富翁榜</span>
            </div>
            <div
              class="secondsheets-btn"
              @click="gosecond"
              :class="[currentindex==='second'?'secondcss':'']"
            >
              <img src="./images/crown.png" alt />
              <span>&nbsp;终极土豪榜</span>
            </div>
          </div>
        </header>
        <!-- 首页内容 -->
        <template v-if="currentindex==='index'">
          <main class=".main">
            <div class="gotop" v-show="gotop" @click="toTop">
              <img src="./images/gotop.png" alt />
            </div>
            <p class="toponeprize">第一名最高赢800元京东卡</p>
            <div class="rankrecord" @click="rankrecord"></div>
            <div class="coinrecord" @click="gocoinrecord"></div>
            <!-- 中间排行榜 -->
            <div class="topthree">
              <template v-for="(item,index) in topThreeList ">
                <div
                  class="top"
                  :class="[index===1?'top-one':'',index===0?'top-two':'',index===2?'top-three':'']"
                  :key="index"
                >
                  <img class="rank-icon" :src="require(`./images/rank/${index}.png`)" alt />
                  <div class="headpic">
                    <img :src="item.profilePhoto || defaultImg |filter" alt />
                  </div>
                  <div
                    class="name"
                    :class="[index===1?'name-one':'',index===0?'name-two':'',index===2?'name-three':'']"
                  >
                    <span :class="[index===1?'name-one-span':'']">{{item.nickname}}</span>
                  </div>
                  <div
                    class="prize-num"
                    :class="[index===1?'num-one':'',index===0?'num-two':'',index===2?'num-three':'']"
                  >
                    <img src="./images/coin.png" alt />
                    <span>&nbsp;{{item.coinNum}}</span>
                  </div>
                  <div class="prize-name" :class="index==1?'prize-name-numone':''">
                    <p v-if="item.awardsName">
                      <span class="dollar">¥</span>
                      {{item.awardsName.split('元')[0]}}
                    </p>
                    <p v-if="item.awardsName">{{item.awardsName.split('元')[1]}}</p>
                  </div>
                </div>
              </template>
            </div>
            <!-- 排行榜列表 -->
            <div class="scroll-infinite">
              <article>
                <div class="header">
                  <div class="ranklist-top">
                    <ul>
                      <li>
                        <span class="top-one-row">我的排名</span>
                        <span
                          v-if="rankListInfo.onList===true"
                          class="top-two-row"
                        >{{rankListInfo.myRank}}</span>
                        <span v-if="rankListInfo.onList===false" class="top-two-row">暂未上榜</span>
                      </li>
                      <li>
                        <span class="top-one-row">今日累计金币</span>
                        <span class="top-two-row">{{rankListInfo.coinNum}}</span>
                      </li>
                      <!-- 获取金币 -->
                      <li>
                        <img
                          v-if="activityInfo.state===1&&countTime!=''"
                          @click="goshop"
                          src="./images/gaincoin.png"
                          alt
                        />
                        <img
                          v-if="countTime===''"
                          @click="activityend"
                          src="./images/gaincoin-end.png"
                          alt
                        />
                      </li>
                    </ul>
                  </div>
                </div>
                <ul class="ranklist-inner" :style="{height:rankList.length<8?'5rem':''}">
                  <li>
                    <div class="ranklist-title rank">排名</div>
                    <div class="ranklist-title nickname">玩家昵称</div>
                    <div class="ranklist-title coinnum">金币数/更新时间</div>
                    <div class="ranklist-title currentprize">当前奖励</div>
                  </li>
                  <div class="ranklist-scroll">
                    <template v-if="rankList.length>3">
                      <li v-for="(item,index) in fourStartList" :key="index" class="rank-list">
                        <div
                          class="order"
                          :style="{backgroundColor:index>=3?'transparent':'',color:index>=3?'#FFF7B7':'',fontSize:index>=3?'0.24rem':''}"
                        >{{item.rank}}</div>
                        <div class="nickname">{{item.nickname}}</div>
                        <div class="coin-time">
                          <span>{{item.coinNum}}</span>
                          <span>{{item.updateTime}}</span>
                        </div>
                        <div class="userAwards-name">{{item.awardsName}}</div>
                      </li>
                      <li v-if="rankList.length>=8" class="already">已经到底了</li>
                    </template>
                    <template v-if="rankList.length===0&&countTime!=''">
                      <p class="notlist-tips">充值送金币,等你上榜赢大奖</p>
                    </template>
                  </div>
                </ul>
              </article>
            </div>
          </main>
        </template>
        <!-- 副页 -->
        <template v-if="currentindex==='second'">
          <main>
            <div class="pink-bg">
              <p class="second-tips">
                · 3月30日-4月3日最终
                <span>累计金币最多的5位玩家</span>获终极大奖;
              </p>
              <p class="second-tips">· 4月4日系统自动发放终极奖励。</p>
            </div>
            <div class="black-bg">
              <p>
                您当前累计金币:
                <img src="./images/consumecoin.png" alt />
                {{totalranklist.totalNum}}
              </p>
            </div>
            <!-- 前5名排行榜 -->
            <p v-if="!topfive.length&&countTime!=''" class="secondnotlist-tips">充值送金币，等你上榜赢大奖</p>
            <ul v-if="topfive.length>0" class="topfive">
              <li v-for="(item,key) in topfive" :key="key">
                <div class="topfive-headpic">
                  <img :src="item.profilePhoto || defaultImg |filter" alt />
                </div>
                <div class="topfiveinfo">
                  <p>
                    <img :src="require(`./images/${key}.png`)" alt />
                    {{item.nickname}}
                  </p>
                  <p>
                    累计金币
                    <img src="./images/small-coin.png" alt />
                    <span>{{item.coinNum}}</span>
                  </p>
                </div>
                <div class="line"></div>
                <div class="prize-img">
                  <img :src="require(`./images/topfiveprize/${key}.png`)" alt />
                </div>
              </li>
            </ul>
          </main>
        </template>
        <div class="bottom-left"></div>
        <div class="bottom-right"></div>
      </div>
    </div>
    <comPop
      v-model="popType"
      :currentindex="currentindex"
      :topfive="topfive"
      :activityInfo="activityInfo"
      :coinrecord="coinrecord"
      :notop="notop"
      :ontop="ontop"
      :addcoin="addcoin"
      :pass="pass"
      :supertop="supertop"
      :endlist="endlist"
      @close-index="closeindex"
    ></comPop>
  </section>
</template>
<script>
import BScroll from "better-scroll";
import _get from "lodash.get";
import {
  ranklist,
  totalranklist,
  activityinfo,
  coinrecord,
  prerankinfo,
  test
} from "./services/api";
import comPop from "./component/comPop";
import utils from "../../common/js/utils.js";
import { activityInfo } from "../treasurehunt/services/api";

export default {
  data() {
    return {
      gotop: false,
      // 倒计时
      countTime: "",
      popType: 0, //1规则 2攻略 3金币记录 4往期榜单 5太棒了（恭喜您获得100个金币）6继续加油（昨日获得金币，暂未上榜哦~）7恭喜您 （昨日富翁榜上榜获得奖品）8恭喜您（终极土豪榜上榜，获得奖品） 9哎呀（富翁榜被反超）
      currentindex: "index",
      defaultIndex: 30,
      defaultImg: "/cdn/common/images/common/img_photo.png",
      rankList: [],
      RANKLIST: {},
      //副页前5排行榜
      topfive: [],
      countTime: "",
      // 活动信息
      activityInfo: {},
      // 金币记录
      coinrecord: [],
      // 往期榜单
      prerankinfo: {},
      // 昨日榜单
      yesterdayList: [],
      // 往期排名
      rankingList: [],
      // 每日排行榜列表信息
      rankListInfo: {},
      // 总排行榜信息
      totalranklist: {},
      //未上榜
      notop: {},
      // 上榜
      ontop: {},
      // 金币新增
      addcoin: {},
      // 排名反超
      pass: {},
      // 终极土豪榜上榜
      supertop: {},
      continume: false,
      change: 0,//子组件传回
      endlist: 0
    };
  },
  created() {
    // await this.getRankList();
    GLOBALS.marchSetsPoint("P_H5PT0263", {
      source_address: GLOBALS.getUrlParam("from") || ""
    });
  },
  mounted() {
    this.getRankList(); //每日排行榜接口
    this.getTotalRankList(); //总排行接口（TOP5）
    this.getActivityInfo(); //活动信息接口
    this.getCoinRecord(); //金币记录接口
    window.addEventListener("scroll", this.handleScroll, true);
  },
  watch: {
    change(val) {
      // console.log("this.change", this.change);

      // this.getsecondlist()
      // this.getActivityInfo();
      this.getpop();
    },
    countTime(val){
      if(val===''){
        this.getActivityInfo()
        this.getRankList()
        console.log('再次调用接口')
      }
    }
  },
  computed: {
    topThreeList() {
      let arr = this.rankList.filter((currentValue, index, arr) => {
        return index < 3;
      });
      if (arr.length < 3) {
        let emptyArr = [];
        for (let i = 0; i < 3 - arr.length; i++) {
          emptyArr.push({});
        }
        arr = [...arr, ...emptyArr];
      }
      let second = arr.splice(1, 1);
      arr.unshift(...second);
      return arr;
    },
    fourStartList() {
      let arr = this.rankList.filter((currentValue, index, arr) => {
        return index > 2 && index < this.defaultIndex;
      });
      return arr;
    }
  },
  methods: {
    //监听屏幕长度  超出设置长度显示 置顶按钮
        handleScroll() {
      let scrolltop =
        document.documentElement.scrollTop || document.body.scrollTop;
      scrolltop > 30 ? (this.gotop = true) : (this.gotop = false);
    },
    // 置顶按钮
    toTop() {
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      // 实现滚动效果
      const timeTop = setInterval(() => {
        document.body.scrollTop = document.documentElement.scrollTop = top -= 50;
        if (top <= 0) {
          clearInterval(timeTop);
        }
      }, 10);
    },
    // 
    getsecondlist() {
      if (this.activityInfo.popupList[1].propType === 1) {
        // 未上榜
        this.notop = this.activityInfo.popupList[1];
        this.popType = 6;
        GLOBALS.marchSetsPoint("A_H5PT0263003102");
      } else if (this.activityInfo.popupList[1].propType === 0) {
        // 上榜
        this.ontop = this.activityInfo.popupList[1];
        // this.popType = 7;
        GLOBALS.marchSetsPoint("A_H5PT0263003101");
      } else if (this.activityInfo.popupList[1].propType === 2) {
        // 金币新增
        this.addcoin = this.activityInfo.popupList[1];
        this.popType = 5;

        GLOBALS.marchSetsPoint("A_H5PT0263003099");
      } else if (this.activityInfo.popupList[1].propType === 3) {
        // 排名反超
        this.pass = this.activityInfo.popupList[1];
        this.popType = 9;

        GLOBALS.marchSetsPoint("A_H5PT0263003100");
      } else if (this.activityInfo.popupList[1].propType === 4) {
        // 终极土豪榜上榜
        this.supertop = this.activityInfo.popupList[1];
        this.popType = 8;
        GLOBALS.marchSetsPoint("A_H5PT0263003103");
      }
    },
    // 点击弹窗关闭按钮 传回的值，用于监听，变化时再次执行弹窗（当有多个弹窗时触发）
    closeindex(e) {
      this.change = e;
    },
    //    stopScroll(){
    //     var mo=function(e){e.preventDefault();};
    //     document.body.style.overflow='hidden';
    //     document.addEventListener("touchmove",mo,false);
    //    },

    // canScroll(){
    //     var mo=function(e){e.preventDefault();};
    //     document.body.style.overflow='';//出现滚动条
    //     document.removeEventListener("touchmove",mo,false);
    // },
    //禁止页面滑动

    // 返回首页
    back() {
      window.location.href = `https://wap.beeplaying.com/xmWap/`;
      GLOBALS.marchSetsPoint("A_H5PT0263003093");
    },
    // 规则
    rule() {
      this.popType = 1;
      // this.stopScroll()
      GLOBALS.marchSetsPoint("A_H5PT0263003094");
    },
    // 攻略
    guide() {
      this.popType = 2;
      GLOBALS.marchSetsPoint("A_H5PT0263003095");
    },
    // 往期榜单
    rankrecord() {
      this.popType = 4;

      GLOBALS.marchSetsPoint("A_H5PT0263003096");
    },
    // 金币记录
    gocoinrecord() {
      this.popType = 3;
      this.getCoinRecord();
      GLOBALS.marchSetsPoint("A_H5PT0263003097");
    },
    // 跳转商城
    goshop() {
      localStorage.setItem('originDeffer', window.location.href)
      parent.location.href = "https://wap.beeplaying.com/xmWap/#/payment/";
      GLOBALS.marchSetsPoint("A_H5PT0263003098");
    },
    // 活动结束获取金币按钮置灰时点击
    activityend() {
      this.$toast.show({
        message: "活动已经结束",
        duration: 1000
      });
    },
    // 排行接口列表
    async getRankList() {
      const res = await ranklist();
      this.rankListInfo = _get(res, "data", {});
      this.rankList = this.rankListInfo.rankList;

      // this.userAwards = _get(res, "data", []);
    },
    // 总排行榜列表
    async getTotalRankList() {
      const res = await totalranklist();
      this.totalranklist = _get(res, "data", {});
      this.topfive = this.totalranklist.rankList;
      // this.userAwards = _get(res, "data", []);
    },
    // 活动信息
    // getcontinume(e){
    //   this.continume=e
    // },
    // 循环弹窗
    // 监听弹窗关闭按钮传回的值，变化时执行（用于有多个弹窗时，再次触发下一个弹窗）
    getpop() {
      if (this.change === 1) {
        // console.log("change1", this.change);
        if (this.activityInfo.popupList[1].propType === 1) {
          // 未上榜
          this.notop = this.activityInfo.popupList[1];
          this.popType = 6;
          // this.index = 0;
          GLOBALS.marchSetsPoint("A_H5PT0263003102");
        } else if (this.activityInfo.popupList[1].propType === 0) {
          // 上榜
          this.ontop = this.activityInfo.popupList[1];
          this.popType = 7;
          // this.index = 0;
          GLOBALS.marchSetsPoint("A_H5PT0263003101");
        } else if (this.activityInfo.popupList[1].propType === 2) {
          // 金币新增
          this.addcoin = this.activityInfo.popupList[1];
          this.popType = 5;
          // this.index = 0;
          GLOBALS.marchSetsPoint("A_H5PT0263003099");
        } else if (this.activityInfo.popupList[1].propType === 3) {
          // 排名反超
          this.pass = this.activityInfo.popupList[1];
          this.popType = 9;
          // this.index = 0;
          GLOBALS.marchSetsPoint("A_H5PT0263003100");
        } else if (this.activityInfo.popupList[1].propType === 4) {
          // 终极土豪榜上榜
          this.supertop = this.activityInfo.popupList[1];
          this.popType = 8;
          // this.index = 0;
          GLOBALS.marchSetsPoint("A_H5PT0263003103");
        }
      }
      // 如果弹窗有3个，第二个关闭按钮传回change===2，弹第3个弹窗
      if (this.change === 2) {
        // console.log("change2", this.change);
        if (this.activityInfo.popupList[2].propType === 1) {
          // this.endlist = 0;
          // 未上榜
          this.notop = this.activityInfo.popupList[2];
          this.popType = 6;
          this.change = 0;
          GLOBALS.marchSetsPoint("A_H5PT0263003102");
        } else if (this.activityInfo.popupList[2].propType === 0) {
          // 上榜
          // this.endlist = 0;
          this.ontop = this.activityInfo.popupList[2];
          this.popType = 7;
          GLOBALS.marchSetsPoint("A_H5PT0263003101");
        } else if (this.activityInfo.popupList[2].propType === 2) {
          // 金币新增
          this.addcoin = this.activityInfo.popupList[2];
          this.popType = 5;
          // this.endlist = 0;
          GLOBALS.marchSetsPoint("A_H5PT0263003099");
        } else if (this.activityInfo.popupList[2].propType === 3) {
          // 排名反超
          this.pass = this.activityInfo.popupList[2];
          this.popType = 9;
          // this.endlist = 0;
          GLOBALS.marchSetsPoint("A_H5PT0263003100");
        } else if (this.activityInfo.popupList[2].propType === 4) {
          // 终极土豪榜上榜
          // this.endlist = 0;
          this.supertop = this.activityInfo.popupList[2];
          this.popType = 8;
          GLOBALS.marchSetsPoint("A_H5PT0263003103");
        }
      }
    },
    // 活动信息
    async getActivityInfo() {
      const res = await activityinfo();
      this.activityInfo = _get(res, "data", {});
      // 判断是否首次进入
      if (this.activityInfo.first === true) {
        this.popType = 2;
      }
      // 判断弹窗类型
      if (this.change !== 1 && this.change !== 2) {
        // 第一次
        if (this.activityInfo.popupList.length) {
          if (this.activityInfo.popupList[0].propType === 1) {
            // 未上榜
            this.notop = this.activityInfo.popupList[0];
            this.popType = 6;

            GLOBALS.marchSetsPoint("A_H5PT0263003102");
          } else if (this.activityInfo.popupList[0].propType === 0) {
            // 上榜
            this.ontop = this.activityInfo.popupList[0];
            this.popType = 7;

            GLOBALS.marchSetsPoint("A_H5PT0263003101");
          } else if (this.activityInfo.popupList[0].propType === 2) {
            // 金币新增
            this.addcoin = this.activityInfo.popupList[0];
            this.popType = 5;

            GLOBALS.marchSetsPoint("A_H5PT0263003099");
          } else if (this.activityInfo.popupList[0].propType === 3) {
            // 排名反超
            this.pass = this.activityInfo.popupList[0];
            this.popType = 9;
            // this.endlist = 0;
            GLOBALS.marchSetsPoint("A_H5PT0263003100");
          } else if (this.activityInfo.popupList[0].propType === 4) {
            // 终极土豪榜上榜
            this.supertop = this.activityInfo.popupList[0];
            this.popType = 8;

            GLOBALS.marchSetsPoint("A_H5PT0263003103");
          }
        }
      }
  // 获取接口活动时间倒计时，传入ms执行函数
  if(this.activityInfo.state!=2){
    this.countDown(this.activityInfo.countdown);
  }
      
    },

    // 金币获取记录
    async getCoinRecord() {
      const res = await coinrecord();
      this.coinrecord = _get(res, "data", {});
    },
    // 测试（自测加金币接口）
    async getTest() {
      const res = await test();
      // this.coinrecord = _get(res, "data", {});
    },
    // 往期榜单
    // async getPreRankInfo() {
    //   const res = await prerankinfo();
    //  this.prerankinfo = _get(res, "data", {});
    //  this.yesterdayList = this.prerankinfo.yesterdayList
    //  this.rankingList = this.prerankinfo.rankingList
    //  console.log(this.yesterdayList,this.rankingList)
    // },
    // 首页每日富翁榜按钮（首页tab切换）
    goindex() {
      this.currentindex = "index";
      this.getRankList();
    },
     // 首页终极富翁榜按钮（副页tab切换）
    gosecond() {
          GLOBALS.marchSetsPoint("A_H5PT0263003092");
      this.currentindex = "second";
      this.getTotalRankList();
    },
    getCountInfo(dateinfo) {
      let day = Math.floor(dateinfo / 86400);
      let hour = Math.floor(parseInt(dateinfo / 60 / 60) % 24);
      let minute = Math.floor(parseInt(dateinfo / 60) % 60);
      let second = Math.floor(dateinfo % 60);
      // let countDay = day >= 10 ? day : '0' + day
      let countHour = hour >= 10 ? hour : "0" + hour;
      let countMinute = minute >= 10 ? minute : "0" + minute;
      let countSecond = second >= 10 ? second : "0" + second;
      return {
        day,
        countHour,
        countMinute,
        countSecond
      };
    },
    countDown(item) {
      if (!item) return false;
      let date = item / 1000;
      let { day, countHour, countMinute, countSecond } = this.getCountInfo(
        date
      );
      let self = this;
      doTimer();
      this.timer = setInterval(() => {
        doTimer();
      }, 1000);
      function doTimer() {
        date = date - 1;
        if (date <= 0) {
          date = 0;
          clearInterval(self.timer);
          self.countTime = "";
          return;
        }
        let day = Math.floor(date / 86400);
        let hour = Math.floor(parseInt(date / 60 / 60) % 24);
        let minute = Math.floor(parseInt(date / 60) % 60);
        let second = Math.floor(date % 60);
        let countDay = day >= 10 ? day : "0" + day;
        let countHour = hour >= 10 ? hour : "0" + hour;
        let countMinute = minute >= 10 ? minute : "0" + minute;
        let countSecond = second >= 10 ? second : "0" + second;
        self.countTime = `${countHour}时${countMinute}分${countSecond}秒`;
      }
    }
  },
  components: {
    comPop
  }
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body,
p,
h1,
h2,
h3,
h4,
h5,
h6,
p,
div,
a,
em,
i,
ul,
li {
  margin: 0;
  padding: 0;
  line-height: 1;
  list-style-type: none;
}

ul li {
  list-style: none;
}

a {
  text-decoration: none;
}
</style>
<style lang="less" scoped>
section {
  width: 100%;
  height: 100vh;
  // 土豪榜长度
  // height: 14.9rem;
  position: relative;
  background-color: #1c044f;
  // overflow: hidden;
  .big-bg {
    // position: fixed;
    //  left: 0;
    //   bottom: 0;
    //   right: 0;
    //   top: 0;
    // overflow: hidden;
    // width: 7.2rem;
    // height: 13.87rem;
    // position: relative;
    height: 14rem;
    background: url(./images/bg.png) no-repeat;
    background-size: 100% 100%;
    .bubble {
      background: url(./images/bubble.png) no-repeat;
      background-size: 100% 100%;
      width: 2.16rem;
      height: 0.67rem;
      text-align: center;
      position: absolute;
      top: 8.1rem;
      left: 2.6rem;
      z-index: 1;
      font-size: 0.2rem;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(108, 34, 166, 1);
      line-height: 0.25rem;
    }
    // 头部（排行榜之上）
    header {
      overflow: hidden;
      position: relative;
      width: 100%;
      .back {
        background: url(./images/back.png) no-repeat;
        background-size: 100% 100%;
        width: 0.85rem;
        height: 0.5rem;
        position: absolute;
        top: 0.2rem;
      }
      .rule {
        width: 0.93rem;
        height: 0.55rem;
        background: url(./images/rule.png) no-repeat;
        background-size: 100% 100%;
        position: absolute;
        top: 0.2rem;
        right: 0.1rem;
      }
      .guide {
        background: url(./images/guide.png) no-repeat;
        background-size: 100% 100%;
        width: 0.93rem;
        height: 0.55rem;
        position: absolute;
        top: 0.93rem;
        right: 0.1rem;
      }
      .countdown-container {
        background: url(./images/countdown.png) no-repeat;
        background-size: 100% 100%;
        width: 4.2rem;
        height: 0.73rem;
        margin: 2.28rem auto 0;
        overflow: hidden;
        div:nth-child(1) {
          margin: 0.2rem auto 0;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
          .countdowntime {
            white-space: nowrap;
            margin: 0 auto;
            height: 0.29rem;
            display: flex;
            align-items: center;
            font-size: 0.2rem;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(255, 233, 171, 1);
            // 另一种方法
            .block-bg {
              width: 0.3rem;
              height: 0.32rem;
              background: rgba(255, 234, 173, 1);
              border-radius: 0.06rem;
              margin: 0;
              font-size: 0.25rem;
              font-weight: bold;
              color: rgba(255, 35, 103, 1);
              line-height: 0.35rem;
              display: block;
            }
          }
        }
      }
      .tab-card {
        background: url(./images/tab.png) no-repeat;
        background-size: 100% 100%;
        width: 5.31rem;
        height: 0.71rem;
        margin: 0.05rem auto 0;
        display: flex;
        align-items: center;
        transition: all 1s;
        .index-btn {
          flex: 1;
          display: flex;
          font-size: 0.24rem;
          font-family: PingFang SC;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
          align-items: center;
          justify-content: center;
          width: 2.58rem;
          height: 0.56rem;
          background-color: rgba(237, 35, 99, 1);
          border-radius: 0.28rem 0rem 0rem 0.28rem;
          margin-left: 0.08rem;
          transition: all 1s;
          &.indexcss {
            font-size: 0.24rem;
            font-family: PingFang SC;
            font-weight: bold;
            color: rgba(255, 216, 227, 1);
            background-color: transparent;
            transition: all 1s;
          }
          img {
            width: 0.41rem;
            height: 0.44rem;
          }
        }
        .secondsheets-btn {
          background: transparent;
          height: 0.56rem;
          align-items: center;
          justify-content: center;
          flex: 1;
          display: flex;
          font-size: 0.24rem;
          font-family: PingFang SC;
          font-weight: bold;
          color: rgba(255, 216, 227, 1);
          border-radius: 0px 0.28rem 0.28rem 0px;
          margin-right: 0.08rem;
          transition: all 1s;
          &.secondcss {
            background-color: rgba(233, 29, 88, 1);
            border-radius: 0px 0.28rem 0.28rem 0px;
            font-size: 0.24rem;
            font-family: PingFang SC;
            font-weight: bold;
            color: rgba(255, 255, 255, 1);
            transition: all 1s;
          }
          img {
            width: 0.46rem;
            height: 0.35rem;
          }
        }
      }
    }
    .toponeprize {
      margin: 0.22rem auto 0;
      text-align: center;
      height: 0.19rem;
      font-size: 0.2rem;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(254, 235, 75, 1);
    }
    .rankrecord {
      background: url(./images/top.png) no-repeat;
      background-size: 100% 100%;
      width: 1.13rem;
      height: 0.55rem;
      position: absolute;
      left: 0.1rem;
    }
    .coinrecord {
      background: url(./images/coinrecord.png) no-repeat;
      background-size: 100% 100%;
      width: 1.13rem;
      height: 0.55rem;
      position: absolute;
      right: 0.1rem;
    }
    // 排行榜
    main {
      position: relative;
      animation: tab 1s linear;
      transition: all 1s;
      .gotop {
        width: 0.45rem;
        height: 0.45rem;
        position: fixed;
        right: 0.3rem;
        bottom: 2rem;
        display: flex;
        z-index: 2;
        img {
          width: 0.45rem;
          height: 0.45rem;
        }
      }
      &.main {
        animation: tab 1s linear;
        // transition: all 1s;
      }
      .topthree {
        display: flex;
        justify-content: space-around;
        margin-top: 0.55rem;
        .top {
          position: relative;
          &.top-one {
            background: url(./images/topone-bg.png) no-repeat;
            background-size: 100% 100%;
            width: 1.9rem;
            height: 3.29rem;
          }
          &.top-two {
            background: url(./images/toptwo-bg.png) no-repeat;
            background-size: 100% 100%;
            width: 1.7rem;
            height: 3.23rem;
            margin-top: 0.39rem;
          }
          &.top-three {
            background: url(./images/topthree-bg.png) no-repeat;
            background-size: 100% 100%;
            width: 1.7rem;
            height: 3.2rem;
            margin-top: 0.39rem;
          }
          .rank-icon {
            width: 0.85rem;
            height: 0.68rem;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: -0.4rem;
          }
          .headpic {
            text-align: center;
            margin: 0.18rem auto 0;
            width: 1.13rem;
            height: 1.14rem;
            border-radius: 50%;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .name {
            position: absolute;
            top: 0.7rem;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            align-items: center;
            justify-content: center;
            span {
              width: 1.4rem;
              text-align: center;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              margin-top: 0.46rem;
              font-size: 0.22rem;
              font-family: PingFang SC;
              font-weight: 500;
              color: rgba(255, 255, 255, 1);
              &.name-one-span {
                margin-top: 0.56rem;
              }
            }
            &.name-one {
              background: url(./images/name-one.png) no-repeat;
              background-size: 100% 100%;
              width: 1.74rem;
              height: 1.05rem;
            }
            &.name-two {
              background: url(./images/name-two.png) no-repeat;
              background-size: 100% 100%;
              width: 1.74rem;
              height: 0.96rem;
            }
            &.name-three {
              background: url(./images/name-three.png) no-repeat;
              background-size: 100% 100%;
              width: 1.74rem;
              height: 0.96rem;
            }
          }
          .prize-num {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 75%;
            position: absolute;
            top: 1.75rem;
            left: 50%;
            transform: translateX(-50%);
            &.num-one {
              position: absolute;
              top: 1.82rem;
              left: 50%;
              transform: translateX(-50%);
            }
            &.num-two {
            }
            &.num-three {
              position: absolute;
              top: 1.72rem;
              left: 50%;
              transform: translateX(-50%);
            }
            img {
              width: 0.3rem;
              height: 0.3rem;
              margin-left: 0.2rem;
            }
            span {
              width: 0.8rem;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              font-size: 0.22rem;
              font-family: PingFang SC;
              font-weight: 500;
              color: rgba(255, 255, 255, 1);
            }
          }
          .prize-name {
            position: absolute;
            height: 0.5rem;
            height: 0.85rem;
            width: 1.2rem;
            top: 2.2rem;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            &.prize-name-numone {
              top: 2.26rem;
            }
            p:first-child {
              font-size: 0.35rem;
              font-family: Impact;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
              .dollar {
                width: 0.13rem;
                height: 0.16rem;
                font-size: 0.21rem;
                font-family: PingFang SC;
                font-weight: 800;
                color: rgba(255, 255, 255, 1);
              }
            }
            p:last-child {
              font-size: 0.19rem;
              font-family: Source Han Sans CN;
              font-weight: 500;
              color: rgba(255, 255, 255, 1);
            }
          }
        }
      }
      // 排行榜列表
      .scroll-infinite {
        background-color: #1c044f;
        position: relative;
      }
      article {
        margin: 0.2rem auto 0;
        overflow: hidden;
      }
      .header {
        background: url(./images/header.png) no-repeat;
        background-size: 100% 100%;
        width: 6.8rem;
        overflow: hidden;
        margin: 0 auto;
      }
      .ranklist-top {
        background: url(./images/ranklist-top.png) no-repeat;
        background-size: 100% 100%;
        width: 6.46rem;
        height: 0.8rem;
        margin: 0.15rem auto 0;
        ul {
          display: flex;
          justify-content: space-around;
          align-items: center;
          position: relative;
          height: 100%;

          li {
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 100%;
            justify-content: space-evenly;
            .top-one-row {
              font-size: 0.22rem;
              font-family: PingFang SC;
              font-weight: 500;
              color: rgba(122, 247, 255, 1);
            }
            .top-two-row {
              font-size: 0.2rem;
              font-family: PingFang SC;
              font-weight: bold;
              color: rgba(255, 247, 183, 1);
            }
            img {
              width: 1.4rem;
              height: 0.5rem;
              margin-right: -0.15rem;
            }
          }
        }
      }
      .ranklist-inner {
        margin-top: 0.11rem;
        background: url(./images/middle.png) no-repeat;
        background-size: 100% 100%;
        width: 6.8rem;
        margin: 0 auto;
        li {
          display: flex;
          justify-content: space-evenly;
          &:first-child {
            padding-top: 0.1rem;
            width: 5.75rem;
            margin: 0 auto;
          }
        }
        .ranklist-title {
          font-size: 0.2rem;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(122, 247, 255, 1);
          text-align: center;
          &.rank {
            width: 0.5rem;
          }
          &.nickname {
            width: 2rem;
            text-align: center;
          }
          &.coinnum {
            width: 1.6rem;
            text-align: center;
          }
          &.currentprize {
            width: 1.5rem;
            text-align: center;
          }
        }
        .ranklist-scroll {
          margin-top: 0.15rem;
          margin-top: 0.1rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          .rank-list {
            flex-shrink: 0;
            align-items: center;
            height: 0.7rem;
            border-bottom: 1px solid #745b7b;
            width: 5.75rem;
            &:last-child {
              margin-bottom: 1rem;
            }
            & div {
              text-align: center;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .order {
              width: 0.36rem;
              height: 0.36rem;
              background: rgba(255, 247, 183, 1);
              border-radius: 50%;
              font-size: 0.22rem;
              font-family: PingFang SC;
              font-weight: bold;
              color: rgba(70, 15, 83, 1);
              text-align: center;
              line-height: 0.36rem;
            }
            .nickname {
              width: 2rem;
              font-size: 0.22rem;
              font-family: PingFang SC;
              font-weight: 500;
              color: rgba(255, 247, 183, 1);
            }
            .coin-time {
              width: 1.49rem;
              display: flex;
              flex-direction: column;
              align-items: center;
              height: 100%;
              justify-content: space-evenly;
              span:first-child {
                width: 1.08rem;
                font-size: 0.22rem;
                font-family: PingFang SC;
                font-weight: 500;
                color: rgba(255, 247, 183, 1);
              }
              span:last-child {
                font-size: 0.18rem;
                font-family: PingFang SC;
                font-weight: 500;
                color: rgba(255, 247, 183, 1);
                opacity: 0.6;
              }
            }

            .userAwards-name {
              width: 1.5rem;
              font-size: 0.2rem;
              font-family: PingFang SC;
              font-weight: 500;
              color: rgba(255, 247, 183, 1);
              // margin-right: 0.15rem;
            }
          }
          .already {
            font-size: 0.2rem;
            font-family: Source Han Sans CN;
            font-weight: 400;
            color: rgba(255, 247, 183, 1);
            margin: 0.2rem auto;
          }
        }
      }
      // 副页样式
      .pink-bg {
        background: url(./images/pink-bg.png) no-repeat;
        background-size: 100% 100%;
        width: 6.4rem;
        height: 1rem;
        margin: 0.25rem auto 0;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        .second-tips {
          margin-left: 0.33rem;
          font-size: 0.22rem;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          span {
            font-size: 0.22rem;
            color: #feeb4b;
            font-weight: 500;
          }
        }
      }
      .black-bg {
        background: url(./images/black-bg.png) no-repeat;
        background-size: 100% 100%;
        width: 3.3rem;
        height: 0.7rem;
        margin: 0.2rem auto 0;
        display: flex;
        justify-content: center;
        align-items: center;
        p {
          text-align: center;
          font-size: 0.24rem;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(254, 235, 75, 1);
          img {
            vertical-align: bottom;
            width: 0.28rem;
            height: 0.27rem;
          }
        }
      }
      .topfive {
        margin-top: 0.25rem;
        li {
          background: url(./images/blue-bg.png) no-repeat;
          background-size: 100% 100%;
          width: 7.2rem;
          height: 1.6rem;
          display: flex;
          align-items: center;
          justify-content: space-evenly;
          .topfive-headpic {
            width: 1.1rem;
            height: 1.1rem;
            border-radius: 50%;
            img {
              width: 1.1rem;
              height: 1.1rem;
              border-radius: 50%;
            }
          }
          .topfiveinfo {
            width: 3rem;
            display: flex;
            flex-direction: column;
            height: 55%;
            justify-content: space-between;
            & p:first-child {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              font-size: 0.28rem;
              font-family: PingFang SC;
              font-weight: 500;
              color: rgba(255, 255, 255, 1);
              img {
                width: 0.45rem;
                height: 0.5rem;
                vertical-align: text-bottom;
              }
            }
            & p:last-child {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              font-size: 0.28rem;
              font-family: PingFang SC;
              font-weight: 500;
              color: rgba(255, 255, 255, 1);
              img {
                width: 0.26rem;
                height: 0.26rem;
              }
              span {
                font-size: 0.34rem;
                font-family: PingFang SC;
                font-weight: 500;
                color: rgba(254, 235, 75, 1);
              }
            }
          }
          .line {
            background: url(./images/line.png) no-repeat;
            background-size: 100% 100%;
            width: 1px;
            height: 0.96rem;
          }
          .prize-img {
            width: 2.01rem;
            height: 1.32rem;
            img {
              width: 2.01rem;
              height: 1.32rem;
            }
          }
        }
      }
      .notlist-tips {
        font-size: 0.36rem;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(255, 247, 183, 1);
        margin-top: 0.5rem;
      }
      .secondnotlist-tips {
        font-size: 0.36rem;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(255, 247, 183, 1);
        margin: 1.11rem auto;
        text-align: center;
      }
    }
  }
  .bottom-left {
    background: url(./images/bottom-left.png) no-repeat;
    background-size: 100% 100%;
    width: 2rem;
    height: 1.81rem;
    position: fixed;
    left: -0.1rem;
    bottom: -0.1rem;
  }
  .bottom-right {
    background: url(./images/bottom-right.png) no-repeat;
    background-size: 100% 100%;
    width: 2rem;
    height: 1.81rem;
    position: fixed;
    right: -0.1rem;
    bottom: -0.1rem;
  }
  // }
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

