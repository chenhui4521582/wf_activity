<template>
  <section>
    <div class="big-bg">
      <div class="top" v-show="topshow">
        <p>
          返利卡有效时间：
          <span v-for="(item,key) in newcountTime.split('')" :key="key">{{item}}</span>
          <!-- <span >06时30分12秒</span> -->
        </p>
        <p style=" margin-top: 0.05rem;">明天返利：{{this.state.rebateAmount}}金叶</p>
      </div>
      <div class="back" @click="back">返回</div>
      <div class="rule" @click="rule">规则</div>
      <div class="prize-record" @click="prizerecord">中奖记录</div>
      <!-- 倒计时 -->
      <div class="countdown">
        <span v-if="countTime">距离结束剩余</span>
        <span v-else>活动已经结束</span>

        <div class="countdown-item" v-for="(item,key) in countTime.split('')" :key="key">
          <span>{{item}}</span>
        </div>
      </div>
      <!-- 已有人数 -->
      <div class="tips">
        已有
        <span>{{rarePropNum|NumFormat}}</span>人获得稀有道具
      </div>
      <!-- 抽奖区域 -->
      <main>
        <div class="main-top">
          <img src="./images/myyellowrock.png" alt />
          <span class="mynum">{{remnantNum}}</span>
          <!-- 跳转商城 -->
          <img @click="goshop" src="./images/plus.png" alt />
        </div>
        <article>
          <ul v-if="newlist.length>=0">
            <li v-for="(item,i) in newlist" :key="i " :class="[i==index?'on':'']">
              <img v-if="item.awardsType=='flk'" src="./images/fanli.png" alt />
              <img v-if="item.awardsType=='jdk'" src="./images/jdk.png" alt />
              <img v-if="item.awardsType=='hfq'" src="./images/hfq.png" alt />
              <img v-if="item.awardsType=='yhq'" src="./images/yhq.png" alt />
              <img v-if="item.awardsType=='jyz'" src="./images/jyz.png" alt />

              <p class="text-one" v-if="item.awardsType=='jdk'">{{parseFloat(item.awardsName) }}元</p>
              <p class="text-two" v-if="item.awardsType=='jdk'">京东券</p>

              <p class="text-one" v-if="item.awardsType=='jyz'">{{parseFloat(item.awardsName) }}</p>
              <p class="text-two" v-if="item.awardsType=='jyz'">金叶子</p>

              <p class="text-one" v-if="item.awardsType=='hfq'">{{parseFloat(item.awardsName) }}元</p>
              <p class="text-two" v-if="item.awardsType=='hfq'">话费券</p>

              <p
                class="text-one"
                style="white-space: normal;
    text-align: center;line-height: 0.28rem;"
                v-if="item.awardsType=='yhq'"
              >{{item.awardsName}}</p>
              <div class="absolute" :class="[i==prized[0]?'end':'']"></div>
              <div class="absolute" :class="[i==prized[1]?'end':'']"></div>
              <div class="absolute" :class="[i==prized[2]?'end':'']"></div>
              <div class="absolute" :class="[i==prized[3]?'end':'']"></div>
              <div class="absolute" :class="[i==prized[4]?'end':'']"></div>
              <div class="absolute" :class="[i==prized[5]?'end':'']"></div>
              <div class="absolute" :class="[i==prized[6]?'end':'']"></div>
              <div class="absolute" :class="[i==prized[7]?'end':'']"></div>
              <div class="absolute" :class="[i==prized[8]?'end':'']"></div>
              <div class="absolute" :class="[i==prized[9]?'end':'']"></div>
            </li>

            <!-- <li v-for="(item,i) in list" :key="i" :class="[i==index?'on':'']">
              <img :src="item.img" alt />
              <p>{{item.text1}}</p>
              <p>{{item.text2}}</p>
              <div :class="[i==prized[0]?'end':'']"></div>
              <div :class="[i==prized[1]?'end':'']"></div>
              <div :class="[i==prized[2]?'end':'']"></div>
              <div :class="[i==prized[3]?'end':'']"></div>
              <div :class="[i==prized[4]?'end':'']"></div>
              <div :class="[i==prized[5]?'end':'']"></div>
              <div :class="[i==prized[6]?'end':'']"></div>
              <div :class="[i==prized[7]?'end':'']"></div>
              <div :class="[i==prized[8]?'end':'']"></div>
              <div :class="[i==prized[9]?'end':'']"></div>
            </li>-->
          </ul>
          <div class="middle-container">
            <div class="game-tips">每次探宝必得1个奖励，已得奖励不重复抽中，探宝10次获得所有奖励。</div>
            <div class="current-consume">
              <img src="./images/smallyellow.png" alt />
              <span>{{nextConsume}}</span>
            </div>
            <div class="playgame">
              <img
                class="goplay"
                v-if="prized.length!=10"
                @click="startLottery"
                src="./images/startbtn.png"
                alt
              />
              <img v-if="prized.length==10" @click="notenough" src="./images/blackbtn.png" alt />
            </div>
          </div>
        </article>
      </main>
      <comPop
        v-model="popType"
        :prizeshow="prizeshow"
        :activityInfo="activityInfo"
        :state="state"
        :userAwards="userAwards"
      ></comPop>
    </div>
  </section>
</template>
<script>
import BScroll from "better-scroll";
import _get from "lodash.get";
import { activityInfo, bet, ratePropState, userAwards } from "./services/api";
import comPop from "./component/comPop";
import utils from "../../common/js/utils.js";
export default {
  data() {
    return {
      topshow: false,
      time: "",
      fanlitime: "",
      countTime: "",
      // 返利卡倒计时
      newcountTime: "",
      fanlicountTime: "",
      // countDown:['1','天','0','1','时','0','0','分','0','0','秒'],
      popType: 0, //1规则 2中奖记录 3探宝成功 4宝石比上次多弹窗 5很遗憾（当前宝石不够抽奖额度） 6充值返利获得金叶 7抽中返利卡
      index: -1, // 当前转动到哪个位置，起点位置
      count: 10, // 总共有多少个位置
      timer: 0, // 每次转动定时器
      speed: 200, // 初始转动速度
      times: 0, // 转动次数
      cycle: 30, // 转动基本次数：即至少需要转动多少次再进入抽奖环节
      prize: -1, // 中奖位置
      prized: [], //已抽中的位置
      click: true,
      showToast: false, //显示中奖弹
      list: [
        { img: require("./images/fanli.png"), id: 0 },
        {
          img: require("./images/jdk.png"),
          text1: "60元",
          text2: "京东券",
          id: 1
        },
        {
          img: require("./images/jyz.png"),
          text1: "25000",
          text2: "金叶子",
          id: 2
        },
        {
          img: require("./images/jdk.png"),
          text1: "100元",
          text2: "京东券",
          id: 3
        },
        {
          img: require("./images/hfq.png"),
          text1: "50元",
          text2: "话费券",
          id: 4
        },
        {
          img: require("./images/hfq.png"),
          text1: "88元",
          text2: "话费券",
          id: 5
        },
        {
          img: require("./images/jdk.png"),
          text1: "12元",
          text2: "京东券",
          id: 6
        },
        {
          img: require("./images/jdk.png"),
          text1: "250元",
          text2: "京东券",
          id: 7
        },
        {
          img: require("./images/yhq.png"),
          text1: "充300减35元",
          text2: "优惠券",
          id: 8
        },
        {
          img: require("./images/jdk.png"),
          text1: "150元",
          text2: "京东券",
          id: 9
        }
      ],
      // 接口返回奖品列表
      newlist: [],
      // 传中奖信息
      prizeshow: {},
      // 活动信息
      activityInfo: {},
      // newlist1:[],
      // 投注
      bet: {},
      // 我的钻石剩余数
      remnantNum: "",
      // 下次消耗
      nextConsume: "",
      // 已获得人数
      rarePropNum: "",
      // 返利卡状态
      state: {},
      // 奖励列表
      userAwards: [],
      message: ""
    };
  },
  created() {
    // this.popType = 7;
    // this.prizeshow.sort=1
    // GLOBALS.marchSetsPoint("P_H5PT0251", {
      // source_address: GLOBALS.getUrlParam("from") || ""
    // });
    // 合并
    // 合并
  },
  mounted() {
    this.getActivityInfo();
    this.getState(2);
    this.getUserAwards();
    console.log("活动倒计时", this.countTime);
    console.log("返利卡倒计时", this.newcountTime);
    // 活动信息接口
    console.log(this.activityInfo);
    console.log(this.time);
    //  this.newlist1()
  },
  computed: {},
  methods: {
    // 活动信息接口
    async getActivityInfo() {
      const res = await activityInfo();
      this.activityInfo = _get(res, "data", {});
      this.newlist = _get(res, "data.wheelAwardsList", []);
      this.remnantNum = this.activityInfo.remnantNum;
      this.rarePropNum = this.activityInfo.rarePropNum;
      this.nextConsume = this.activityInfo.nextConsume;
      for (var i = 0; i < this.newlist.length; i++) {
        if (this.newlist[i].state == 1) {
          this.prized.push(this.newlist[i].sort - 1);
          // console.log('newlist',this.newlist[i].sort)
        }
      }
      if (this.activityInfo.incrPropNum > 0) {
        this.popType = 4;
        // GLOBALS.marchSetsPoint("A_H5PT0251002971");
      }
      console.log(this.prized);
      // this.newlist =  this.activityInfo.wheelAwardsList;
      console.log("奖品列表", this.newlist);
      this.time = this.activityInfo.countdown;
      // 初始化判断已领取奖励
      // this.prized.push(this.activityInfo.);
      this.countDown(this.time);

      const code = _get(res, "code", 0);
    },
    // 投注
    async getBet() {
      const res = await bet();
      this.bet = _get(res, "data", {});
      const code = _get(res, "code", 0);
      this.message = _get(res, "message", null);
      console.log("res", res);
      console.log("bet", code);
      if (res.message == "您已获取所有奖励") {
        this.$toast.show({
          message: "您已获取所有奖励",
          duration: 1000
        });
      } else if (res.message == "您的宝石不足") {
        this.popType = 5;
        // GLOBALS.marchSetsPoint("A_H5PT0251002970");
        return;
      } else {
        this.startRoll();
        if (this.bet) {
          this.remnantNum = this.bet.remnantNum;
          this.rarePropNum = this.bet.rarePropNum;
          this.nextConsume = this.bet.nextConsume;
        }
      }

      console.log("bet1 ", this.bet);
    },
    // 返利卡状态
    async getState(type) {
      const res = await ratePropState(type);
      this.state = _get(res, "data", {});
      if (this.state.rebateCountdown > 0) {
        this.topshow = true;
        this.fanlitime = this.state.rebateCountdown;
        this.fanlicountDown(this.fanlitime);
      }
      if (this.state.rebatePopup) {
        this.popType = 6;
        // GLOBALS.marchSetsPoint("A_H5PT0251002973");
      }
    },
    // 奖励列表
    async getUserAwards() {
      const res = await userAwards();
      this.userAwards = _get(res, "data", []);
    },
    // 返回上一级
    back() {
      history.go(-1);
      // GLOBALS.marchSetsPoint("A_H5PT0251002964");
    },
    // 黄钻加号 跳转商城
    goshop() {
      parent.location.href = "https://wap.beeplaying.com/xmWap/#/payment/";
      // GLOBALS.marchSetsPoint("A_H5PT0251002966");
    },
    end() {},
    // 点击规则
    rule() {
      this.popType = 1;
      // GLOBALS.marchSetsPoint("A_H5PT0251002965");
    },
    // 中奖记录
    prizerecord() {
      this.popType = 2;
      this.getUserAwards();
      // GLOBALS.marchSetsPoint("A_H5PT0251002967");
    },
    // 钻石不够无法抽奖
    notenough() {
      // this.popType = 5;
      this.$toast.show({
        message: "您已获得所有奖励",
        duration: 1000
      });
    },
    //倒计时
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
      this.countTime = `${countHour}:${countMinute}:${countSecond}`;
      this.timer = setInterval(() => {
        date = date - 1;
        if (date <= 0) {
          date = 0;
          clearInterval(this.timer);
          this.countTime = "";
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
        if (day >= 0) {
          this.countTime = `${day}天${countHour}时${countMinute}分${countSecond}秒`;
        } else {
          this.countTime = `${countHour}:${countMinute}:${countSecond}`;
        }
      }, 1000);
    },
    // 返利卡倒计时0
    fanlicountDown(item) {
      if (!item) return false;
      let date = item / 1000;
      let { day, countHour, countMinute, countSecond } = this.getCountInfo(
        date
      );
      this.newcountTime = `${countHour}:${countMinute}:${countSecond}`;
      this.timer = setInterval(() => {
        date = date - 1;
        if (date <= 0) {
          date = 0;
          clearInterval(this.timer);
          this.newcountTime = "";
          return;
        }
        let day = Math.floor(date / 86400);
        let hour = Math.floor(parseInt(date / 60 / 60) % 24);
        let minute = Math.floor(parseInt(date / 60) % 60);
        let second = Math.floor(date % 60);
        // let countDay = day >= 10 ? day : '0' + day
        let countHour = hour >= 10 ? hour : "0" + hour;
        let countMinute = minute >= 10 ? minute : "0" + minute;
        let countSecond = second >= 10 ? second : "0" + second;
        if (day >= 0) {
          this.newcountTime = `${countHour}时${countMinute}分${countSecond}秒`;
        } else {
          this.newcountTime = `${countHour}:${countMinute}:${countSecond}`;
        }
      }, 1000);
    },
    // 防止连点
    // stop(){
    //    if(this.click==false){

    //       }
    // },
    // 点击投注
    async startLottery() {
      if (this.message == "您的宝石不足") {
        this.popType = 5;
      } else if (!this.click) {
        this.$toast.show({
          message: "正在抽奖",
          duration: 1000
        });
      } else {
        this.click = false;
        await this.getBet();

        // GLOBALS.marchSetsPoint("A_H5PT0251002968");
      }
    },
    // 开始抽奖
    startRoll() {
      this.times += 1; // 转动次数
      this.oneRoll();

      // 转动过程调用的每一次转动方法，这里是第一次调用初始化
      // 如果当前转动次数达到要求 && 目前转到的位置是中奖位置

      if (this.times > this.cycle + 10 && this.prize === this.index) {
        if (this.bet.wheelAwards.state == 1) {
          this.prized.push(this.prize);
        }

        // this.prizeshow = this.list[this.prize];
        this.prizeshow = this.bet.wheelAwards;
        setTimeout(() => {
          this.click = true;
          if (this.prizeshow.sort - 1 == 0) {
            this.popType = 7;
            // GLOBALS.marchSetsPoint("A_H5PT0251002972");
            // 添加超级返利
            // this.topshow = true;
          } else {
            this.popType = 3;
            // GLOBALS.marchSetsPoint("A_H5PT0251002969", {
            //   awards_name: this.prizeshow.awardsName
            // });
          }
        }, 800);
        console.log("要传的信息", this.prizeshow);
        clearTimeout(this.timer); // 清除转动定时器，停止转动
        this.prize = -1;
        this.times = 0;
        this.speed = 200;
      } else {
        if (this.times < this.cycle) {
          this.speed -= 15; // 加快转动速度
        } else if (this.times === this.cycle) {
          // const index = parseInt(Math.random() * 10) || 0; // 随机获得一个中奖位置
          this.prize = this.bet.wheelAwards.sort - 1; //中奖位置

          console.log(this.prize);
          console.log(this.prized);
          // console.log(this.prized[0])
          if (this.prize > 9) {
            this.prize = 9;
          }
        } else if (
          this.times > this.cycle + 10 &&
          ((this.prize === 0 && this.index === 9) ||
            this.prize === this.index + 1)
        ) {
          this.speed += 500;
        } else {
          this.speed += 30;
        }
        if (this.speed < 40) {
          this.speed = 40;
        }
        this.timer = setTimeout(this.startRoll, this.speed);
      }
    },
    oneRoll() {
      let index = this.index; // 当前转动到哪个位置
      const count = this.count; // 总共有多少个位置
      index += 1;
      if (index > count - 1) {
        index = 0;
      }
      this.index = index;
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
  width: 7.2rem;
  height: 100vh;
  background-color: #0b0800;
  overflow: hidden;
  .big-bg {
    position: relative;
    overflow: hidden;
    width: 7.2rem;
    height: 11.35rem;
    background: url(./images/bg.png) no-repeat;
    background-size: 100% 100%;
    .top {
      background: url(./images/top.png) no-repeat;
      background-size: 100% 100%;
      width: 4.33rem;
      height: 0.784rem;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      & p {
        font-size: 0.24rem;
        font-family: Alibaba PuHuiTi;
        font-weight: bold;
        color: rgba(253, 239, 202, 1);
      }
    }
    .back {
      background: url(./images/left.png) no-repeat;
      background-size: 100% 100%;
      width: 0.44rem;
      height: 0.69rem;
      text-align: center;
      font-size: 0.24rem;
      font-family: Alibaba PuHuiTi;
      font-weight: 400;
      color: rgba(245, 194, 103, 1);
      margin-top: 0.32rem;
      line-height: 0.365rem;
    }
    .rule {
      background: url(./images/left.png) no-repeat;
      background-size: 100% 100%;
      width: 0.47rem;
      height: 0.69rem;
      line-height: 0.365rem;
      text-align: center;
      font-size: 0.24rem;
      font-family: Alibaba PuHuiTi;
      font-weight: 400;
      color: rgba(245, 194, 103, 1);
      margin-top: 0.15rem;
    }
    .prize-record {
      position: absolute;
      background: url(./images/right.png) no-repeat;
      background-size: 100% 100%;
      width: 0.44rem;
      height: 1.19rem;
      text-align: center;
      font-size: 0.24rem;
      font-family: Alibaba PuHuiTi;
      font-weight: 400;
      color: rgba(245, 194, 103, 1);
      top: 0.23rem;
      right: 0;
      line-height: 0.3rem;
    }
    .countdown {
      width: 4.58rem;
      height: 0.54rem;
      background: rgba(48, 36, 24, 0.71);
      border: 0.02rem solid rgba(245, 194, 103, 1);
      align-items: center;
      justify-content: space-around;
      border-radius: 0.27rem;
      margin: 1.94rem auto 0;
      display: flex;
      font-size: 0.24rem;
      font-family: Alibaba PuHuiTi;
      font-weight: 400;
      color: rgba(208, 169, 99, 1);
      & span {
      }
      .countdown-item:nth-child(2),
      :nth-child(4),
      :nth-child(5),
      :nth-child(7),
      :nth-child(8),
      :nth-child(10),
      :nth-child(11) {
        width: 0.25rem;
        height: 0.32rem;
        text-align: center;
        background: rgba(245, 194, 103, 1);
        border-radius: 0.04rem;

        font-size: 0.24rem;
        font-family: Alibaba PuHuiTi;
        font-weight: 400;
        color: rgba(77, 49, 28, 1);
        display: flex;
        justify-content: center;
        align-items: center;
        i {
          font-size: 0.24rem;
          font-family: Alibaba PuHuiTi;
          font-weight: 400;
          color: rgba(208, 169, 99, 1);
        }
      }
    }
    & .tips {
      background: url(./images/tips.png) no-repeat;
      background-size: 100% 100%;
      width: 6.36rem;
      height: 0.17rem;
      margin: 0.3rem auto 0;
      text-align: center;
      line-height: 0.17rem;
      font-size: 0.24rem;
      font-family: Alibaba PuHuiTi;
      font-weight: 400;
      color: rgba(208, 169, 99, 1);
      span {
        color: #ffedb6;
        font-size: 0.24rem;
      }
    }
    // 抽奖样式
    main {
      overflow: hidden;
      height: 6rem;
      width: 92%;
      margin: 0.2rem auto 0;
      .main-top {
        display: flex;
        margin-top: 0.1rem;
        height: 0.5rem;
        width: 2.4rem;
        align-items: center;
        margin-left: 2.2rem;
        justify-content: space-around;
        img:first-child {
          display: block;
          width: 0.36rem;
          height: 0.33rem;
        }
        .mynum {
          white-space: nowrap;
          font-size: 0.3rem;
          font-family: Alibaba PuHuiTi;
          font-weight: bold;
          color: rgba(208, 169, 99, 1);
        }
        img:last-child {
          display: block;
          width: 0.78rem;
          height: 0.37rem;
        }
      }
      article {
        width: 100%;
        margin-top: 0.2rem;
        box-sizing: border-box;
        position: relative;
        height: 5.1rem;
        .absolute {
          position: absolute;
        }
        ul {
          li {
            list-style: none;
            width: 1.4rem;
            height: 1.55rem;
            background: rgba(61, 35, 20, 1);
            position: absolute;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .text-one {
              margin-top: 0.1rem;
            }
            .text-two {
              margin-top: 0.05rem;
            }
            &.on {
              background: url(./images/current.png) no-repeat;
              background-size: 100% 100%;
              width: 1.45rem;
              height: 1.6rem;
            }
            .end {
              background: url(./images/received.png) no-repeat;
              background-size: 100% 100%;
              width: 1.4rem;
              height: 1.55rem;
              position: absolute;
            }
            p {
              white-space: nowrap;
              font-size: 0.24rem;
              font-family: Alibaba PuHuiTi;
              font-weight: 400;
              color: rgba(240, 144, 67, 1);
            }
            img {
              width: 1.11rem;
              height: 0.64rem;
            }
            &:nth-child(1) {
              left: 0.4rem;
              &::before {
                content: "";
                display: block;
                width: 0.46rem;
                height: 0.26rem;
                position: absolute;
                background: url(./images/xiyou.png) no-repeat;
                background-size: 100% 100%;
                top: 0;
                left: 0;
              }
              img {
                width: 100%;
                height: 100%;
              }
            }
            &:nth-child(2) {
              left: 1.9rem;
            }
            &:nth-child(3) {
              left: 3.4rem;
            }
            &:nth-child(4) {
              left: 4.9rem;
            }
            &:nth-child(5) {
              left: 4.9rem;
              top: 1.7rem;
            }
            &:nth-child(6) {
              left: 4.9rem;
              top: 3.4rem;
            }
            &:nth-child(7) {
              left: 3.4rem;
              top: 3.4rem;
            }
            &:nth-child(8) {
              left: 1.9rem;
              top: 3.4rem;
            }
            &:nth-child(9) {
              left: 0.4rem;
              top: 3.4rem;
            }
            &:nth-child(10) {
              left: 0.4rem;
              top: 1.7rem;
            }
          }
        }
        .middle-container {
          position: absolute;
          top: 1.6rem;
          left: 50%;
          width: 2.99rem;
          transform: translateX(-50%);
          margin-top: 0.05rem;
          display: flex;
          flex-direction: column;
          /* align-items: baseline; */
          justify-content: space-around;
          height: 1.65rem;
          .game-tips {
            text-align: center;
            font-size: 0.18rem;
            font-family: Alibaba PuHuiTi;
            font-weight: 400;
            color: rgba(208, 169, 99, 1);
          }
          .current-consume {
            display: flex;
            align-items: center;
            width: 1.2rem;
            margin: 0.05rem auto;
            justify-content: space-around;
            img {
              width: 0.27rem;
              height: 0.24rem;
              display: block;
            }
            span {
              font-size: 0.3rem;
              font-family: Alibaba PuHuiTi;
              font-weight: bold;
              color: rgba(249, 225, 129, 1);
            }
          }
          .playgame {
            margin-left: 0.05rem;
            .goplay {
              // animation: breathe 1s linear infinite alternate;
            }
            img {
              display: block;
              width: 2.96rem;
              height: 0.65rem;
              margin: 0 auto;
              &:first-child:active {
                transform: translateY(0.02rem);
                transform: scale(0.9);
              }
              &:first-child:visited {
                scale: 1;
              }
            }
          }
        }
      }
    }
  }
}
@keyframes breathe {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
// .big{
//   background-color: blue;
//   width: 500px;
//   height: 400px;
//   margin: 20px auto;
//   position: relative;
//   overflow: hidden;
//   ul{
//     margin-top: 10px;
//     height: 500px;

//     li{
//       position: absolute;
//       list-style: none;
//         height: 100px;
//         width: 100px;
//         background-color: white;
//         &:nth-child(1){
// left: 10px;
//         }
//          &:nth-child(2){
//           left: 120px;
//         }
//          &:nth-child(3){
//            left: 240px;
//         }
//          &:nth-child(4){
//           left: 360px;
//         }
//          &:nth-child(5){
//           left: 360px;
//           top: 120px;
//         }
//          &:nth-child(6){
//           left: 360px;
//           top: 250px;
//         }
//          &:nth-child(7){
//            left: 240px;
//             top: 250px;
//         }
//          &:nth-child(8){
//             left: 120px;
//              top: 250px;
//         }
//          &:nth-child(9){
//           left: 10px;
//           top: 250px;
//         }
//              &:nth-child(10){
//           left: 10px;
//           top: 120px;
//         }

//     }
//     .btn{
//       width:  100px;
//       height: 100px;
//       position: absolute;
//       background-color: red;
//       font-size: 20px;
//       left: 200px;
//       top: 120px;
//     }
//     .on{
//         background-color: black;
//         opacity: 0.7;
//     }
//   }
//   .mask{
//     top: 50%;
//     transform: translateX(-50%) translateY(-50%);
//     left: 50%;
//     width: 200px;
//     height: 200px;
//         position: absolute;

//     background-color: red;
//     font-size: 20px;
//     text-align: center;
//     color: white;

//   }
//   .end{
// width: 100px;
// height: 100px;
//    background-color: black;
//         opacity: 0.7;
//   }
// }
</style>>

