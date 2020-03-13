<template>
  <section :style="{height:topfive.length>0&&currentindex==='second'?'14.9rem':''}">
    <div class="big-bg">
      <!-- 头部 （排行之上） -->
      <header>
        <div class="back"></div>
        <div class="rule" @click="popType=1"></div>
        <div class="guide" @click="popType=2"></div>
        <div class="countdown-container"></div>
        <!-- tab切换 -->
        <div class="tab-card">
          <div class="index-btn" @click="goindex" :class="[currentindex==='second'?'indexcss':'']">
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
          <p class="toponeprize">第一名最高赢800元京东卡</p>
          <div class="rankrecord" @click="popType=4"></div>
          <div class="coinrecord" @click="popType=3"></div>

          <!-- 中间排行榜 -->

          <div class="topthree">
            <template v-for="(item,index) in topThreeList ">
              <div
                class="top"
                :class="[index===1?'top-one':'',index===0?'top-two':'',index===2?'top-three':'']"
                :key="index"
              >
                <img
                  class="rank-icon"
                  :src="item.rank?require(`./images/rank/${item.rank}.png`):''"
                  alt
                />
                <div class="headpic">
                  <img :src="item.img || defaultImg |filter" alt />
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
                  <span>&nbsp;{{item.num}}</span>
                </div>
                <div class="prize-name"></div>
              </div>
            </template>
          </div>
          <!-- 排行榜列表 -->
          <article>
            <div class="ranklist-top">
              <ul>
                <li>
                  <span class="top-one-row">我的排名</span>
                  <span class="top-two-row">暂未上榜</span>
                </li>
                <li>
                  <span class="top-one-row">今日累计金币</span>
                  <span class="top-two-row">0</span>
                </li>
                <!-- 获取金币 -->
                <li>
                  <img src="./images/gaincoin.png" alt />
                  <!-- <img src="./images/gaincoin-end.png" alt=""> -->
                </li>
              </ul>
            </div>
            <ul class="ranklist-inner">
              <li>
                <div class="ranklist-title">排名</div>
                <div class="ranklist-title">玩家昵称</div>
                <div class="ranklist-title">金币数/更新时间</div>
                <div class="ranklist-title">当前奖励</div>
              </li>
              <div class="ranklist-scroll">
                <template v-if="true">
                  <li v-for="(item,index) in fourStartList" :key="index" class="rank-list">
                    <div
                      class="order"
                      :style="{backgroundColor:index>=3?'transparent':'',color:index>=3?'#FFF7B7':'',fontSize:index>=3?'0.24rem':''}"
                    >{{item.rank}}</div>
                    <div class="nickname">{{item.nickname}}</div>
                    <div class="coin-time">
                      <span>{{item.num}}</span>
                      <span>{{item.time}}</span>
                    </div>
                    <div class="userAwards-name">{{item.prize}}</div>
                  </li>
                </template>
                <template v-if="false">
                  <p class="notlist-tips">充值送金币,等你上榜赢大奖</p>
                </template>
              </div>
            </ul>
          </article>
        </main>
      </template>
      <!-- 副页 -->
      <template v-if="currentindex==='second'">
        <main>
          <div class="pink-bg">
            <p class="second-tips">
              · 3月30日-4月3日最终
              <span>计金币最多的5位玩家</span>累获终极大奖;
            </p>
            <p class="second-tips">· 4月4日系统自动发放终极奖励。</p>
          </div>
          <div class="black-bg">
            <p>
              您当前累计金币:
              <img src="./images/consumecoin.png" alt /> 002310
            </p>
          </div>
          <!-- 前5名排行榜 -->
          <p v-if="!topfive.length" class="secondnotlist-tips">充值送金币，等你上榜赢大奖</p>
          <ul v-if="topfive.length>0" class="topfive">
            <li v-for="(item,key) in topfive" :key="key">
              <div class="topfive-headpic">
                <img :src="item.img || defaultImg |filter" alt />
              </div>
              <div class="topfiveinfo">
                <p>
                  <img :src="require(`./images/${key}.png`)" alt />
                  {{item.nickname}}
                </p>
                <p>
                  累计金币
                  <img src="./images/small-coin.png" alt />
                  <span>{{item.num}}</span>
                </p>
              </div>
              <div class="line"></div>
              <div class="prize-img">
                <img src="./images/5000.png" alt />
              </div>
            </li>
          </ul>
        </main>
      </template>

      <div class="bottom-left"></div>
      <div class="bottom-right"></div>
    </div>
    <!-- <footer> -->

    <!-- </footer> -->  
    <comPop v-model="popType" :currentindex='currentindex' :topfive='topfive'></comPop>
  </section>

</template>


<script>
import BScroll from "better-scroll";
import _get from "lodash.get";
import { ranklist, totalranklist,activityinfo,coinrecord,prerankinfo } from "./services/api";
import comPop from "./component/comPop";
import utils from "../../common/js/utils.js";


export default {
  data() {
    return {
      popType:4,  //1规则 2攻略 3金币记录 4往期榜单
      currentindex: "index",
      defaultIndex: 30,
      defaultImg: "/cdn/common/images/common/img_photo.png",
      rankList: [
        {
          headpic: "",
          nickname: "周某某12321123213321",
          num: "123",
          prize: "",
          rank: "1",
          time: "3-31 15:33",
          prize: "300元京东券"
        },
        {
          headpic: "",
          nickname: "王某某",
          num: "400245",
          prize: "",
          rank: "2",
          time: "3-31 15:33",
          prize: "300元京东券"
        },
        {
          headpic: "",
          nickname: "胡魔某",
          num: "4000",
          prize: "",
          rank: "3",
          time: "3-31 15:33",
          prize: "300元京东券"
        },
        {
          headpic: "",
          nickname: "胡魔某",
          num: "4000",
          prize: "",
          rank: "4",
          time: "3-31 15:33",
          prize: "300元京东券"
        },
        {
          headpic: "",
          nickname: "胡魔某",
          num: "4000",
          prize: "",
          rank: "5",
          time: "3-31 15:33",
          time: "3-31 15:33",
          prize: "300元京东券"
        },
        {
          headpic: "",
          nickname: "这里是名称123",
          num: "4000",
          prize: "",
          rank: "6",
          time: "3-31 15:33",
          prize: "300元京东券"
        },
        {
          headpic: "",
          nickname: "胡魔某",
          num: "4000",
          prize: "",
          rank: "7",
          time: "3-31 15:33",
          prize: "300元京东券"
        },
        {
          headpic: "",
          nickname: "胡魔某",
          num: "4000",
          prize: "",
          rank: "8",
          time: "3-31 15:33",
          prize: "300元京东券"
        },
        {
          headpic: "",
          nickname: "胡魔某",
          num: "4000",
          prize: "",
          rank: "9",
          time: "3-31 15:33",
          prize: "300元京东券"
        },
        {
          headpic: "",
          nickname: "胡魔某",
          num: "4000",
          prize: "",
          rank: "10",
          time: "3-31 15:33",
          prize: "300元京东券"
        },
        {
          headpic: "",
          nickname: "胡魔某",
          num: "4000",
          prize: "",
          rank: "11",
          time: "3-31 15:33",
          prize: "300元京东券"
        },
        {
          headpic: "",
          nickname: "胡魔某",
          num: "4000",
          prize: "",
          rank: "12",
          time: "3-31 15:33",
          prize: "300元京东券"
        },
        {
          headpic: "",
          nickname: "胡魔某",
          num: "4000",
          prize: "",
          rank: "13",
          time: "3-31 15:33",
          prize: "300元京东券"
        },
        {
          headpic: "",
          nickname: "胡魔某",
          num: "4000",
          prize: "",
          rank: "14",
          time: "3-31 15:33",
          prize: "300元京东券"
        }
      ],
      RANKLIST: {},
      //副页前5排行榜
      topfive: [
        { headpic: "", nickname: "胡112321323213123某", num: "4000", prize: "" },
        { headpic: "", nickname: "胡魔某", num: "400123210", prize: "" },
        { headpic: "", nickname: "胡魔某", num: "4000", prize: "" },
        { headpic: "", nickname: "胡魔某", num: "4000", prize: "" },
        { headpic: "", nickname: "胡魔某", num: "4000", prize: "" }
      ]
    };
  },
  created() {
    // await this.getRankList();
  },
  mounted() {
    this.getRankList();
    this.getTotalRankList();
    this.getActivityIngo();
    this.getCoinRecord();
    this.getPreRankInfo();
    console.log();
  },
  methods: {
    // 奖励列表
  
    async getRankList() {
      const res = await ranklist();
      this.RANKLIST = _get(res, "data", {});

      // this.userAwards = _get(res, "data", []);
    },
    // 总排行榜列表
    async getTotalRankList() {
      const res = await totalranklist();
      this.RANKLIST = _get(res, "data", {});

      // this.userAwards = _get(res, "data", []);
    },
    // 活动信息
    async getActivityIngo(){
      const res = await activityinfo();
    },
    // 金币获取记录
       async getCoinRecord(){
      const res = await coinrecord();
    },
    // 往期榜单
        async getPreRankInfo(){
      const res = await prerankinfo();
    },
    goindex() {
      this.currentindex = "index";
    },
    gosecond() {
      this.currentindex = "second";
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
  created() {
    console.log("天天大富翁");
  },
  components:{
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
    height: 14rem;
    background: url(./images/bg.png) no-repeat;
    background-size: 100% 100%;
    // 头部（排行榜之上）
    header {
      overflow: hidden;
      position: relative;

      width: 100%;
      // height: 3.01rem;
      .back {
        background: url(./images/back.png) no-repeat;
        background-size: 100% 100%;
        width: 0.85rem;
        height: 0.5rem;
        // margin-top: 0.2rem;
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
      }
      .tab-card {
        background: url(./images/tab.png) no-repeat;
        background-size: 100% 100%;
        width: 5.31rem;
        height: 0.71rem;
        margin: 0.05rem auto 0;
        display: flex;
        align-items: center;
        .index-btn {
          flex: 1;
          display: flex;
          // width:2.58rem;
          // height:24px;
          font-size: 0.24rem;
          font-family: PingFang SC;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
          align-items: center;
          justify-content: center;
          width: 2.58rem;
          height: 0.56rem;
          background: rgba(237, 35, 99, 1);
          border-radius: 0.28rem 0rem 0rem 0.28rem;
          margin-left: 0.08rem;
          transition: all 1s;
          &.indexcss {
            // width:118px;
            // height:24px;
            font-size: 0.24rem;
            font-family: PingFang SC;
            font-weight: bold;
            color: rgba(255, 216, 227, 1);
            background: transparent;
          }
          img {
            width: 0.41rem;
            height: 0.44rem;
          }
        }
        .secondsheets-btn {
          transition: all 1s;
          height: 0.56rem;
          align-items: center;
          justify-content: center;
          flex: 1;
          display: flex;
          // width:2.58rem;
          // height:24px;
          font-size: 0.24rem;
          font-family: PingFang SC;
          font-weight: bold;
          color: rgba(255, 216, 227, 1);
          // background: pink;
          border-radius: 0px 0.28rem 0.28rem 0px;

          margin-right: 0.08rem;
          &.secondcss {
            // width: 2.58rem;
            // height: 0.56rem;
            background: rgba(233, 29, 88, 1);
            border-radius: 0px 0.28rem 0.28rem 0px;
            // width:119px;
            // height:24px;
            font-size: 0.24rem;
            font-family: PingFang SC;
            font-weight: bold;
            color: rgba(255, 255, 255, 1);
          }
          img {
            width: 0.46rem;
            height: 0.35rem;
          }
        }
      }
    }
    .toponeprize {
      // width:234px;
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
      // top: 4rem;
      left: 0.1rem;
      // float: left;
      // margin-top: 0.23rem;
      // margin-left: 0.1rem;
    }
    .coinrecord {
      background: url(./images/coinrecord.png) no-repeat;
      background-size: 100% 100%;
      width: 1.13rem;
      height: 0.55rem;
      position: absolute;
      right: 0.1rem;
      // float: right;
      // margin-right: 0.1rem;
      // margin-top: 0.26rem;
    }
    // 排行榜
    main {
      position: relative;
      animation: tab 1s linear ;
      transition: all 1s;
      &.main{
         animation: tab 1s linear ;
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
            img {
              width: 1.09rem;
              height: 1.11rem;
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
              width: 1.35rem;
              text-align: center;
              // height:20px;
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
            // margin: 0.3rem auto 0;
            position: absolute;
            top: 1.75rem;
            left: 50%;
            transform: translateX(-50%);
            &.num-one {
              position: absolute;
              top: 1.81rem;
              left: 50%;
              transform: translateX(-50%);
            }
            &.num-two {
            }
            &.num-three {
              position: absolute;
              top: 1.73rem;
              left: 50%;
              transform: translateX(-50%);
            }
            img {
              width: 0.3rem;
              height: 0.3rem;
            }
            span {
              text-align: center;
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
          }
        }
      }
      // 排行榜列表
      article {
        background: url(./images/ranklist-bg.png) no-repeat;
        background-size: 100% 100%;
        width: 6.8rem;
        height: 5.45rem;
        margin: 0.2rem auto 0;
        overflow: hidden;
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
        height: 2.2rem;
        margin-top: 0.11rem;
        li {
          display: flex;
          justify-content: space-evenly;
        }
        .ranklist-title {
          font-size: 0.2rem;
          font-family: PingFang SC;
          font-weight: 500;
          color: rgba(122, 247, 255, 1);
        }
        .ranklist-scroll {
          margin-top: 0.15rem;
          margin-top: 0.1rem;
          overflow: hidden;
          overflow-y: scroll;
          height: 3.1rem;
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
            justify-content: space-between;
            & div {
              text-align: center;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .order {
              margin-left: 0.15rem;
              width: 0.36rem;
              height: 0.36rem;
              background: rgba(255, 247, 183, 1);
              border-radius: 50%;
              // width:13px;
              // height:16px;
              font-size: 0.22rem;
              font-family: PingFang SC;
              font-weight: bold;
              color: rgba(70, 15, 83, 1);
              text-align: center;
              line-height: 0.36rem;
            }
            .nickname {
              width: 1.1rem;
              // height:21px;
              font-size: 0.22rem;
              font-family: PingFang SC;
              font-weight: 500;
              color: rgba(255, 247, 183, 1);
              margin-left: -0.1rem;
            }
            .coin-time {
              display: flex;
              flex-direction: column;
              align-items: center;
              height: 100%;
              justify-content: space-evenly;
              span:first-child {
                width: 1.08rem;
                // height:21px;
                font-size: 0.22rem;
                font-family: PingFang SC;
                font-weight: 500;
                color: rgba(255, 247, 183, 1);
              }
              span:last-child {
                // width:102px;
                // height:14px;
                font-size: 0.18rem;
                font-family: PingFang SC;
                font-weight: 500;
                color: rgba(255, 247, 183, 1);
                opacity: 0.6;
              }
            }

            .userAwards-name {
              width: 1.16rem;
              // height:19px;
              font-size: 0.2rem;
              font-family: PingFang SC;
              font-weight: 500;
              color: rgba(255, 247, 183, 1);
              // margin-right: 0.15rem;
            }
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
          // line-height:36px;
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
          // width:175px;
          // height:23px;
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
      // topfive
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

                // margin-left: -0.5rem;
            & p:first-child {
              //             width:82px;
              // height:27px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              ;
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
              // width:82px;
              // height:27px;
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
            //             width:465px;
            // height:36px;
            font-size: 0.36rem;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(255, 247, 183, 1);
            position: absolute;
            top: 40%;
          }
          .secondnotlist-tips{
               font-size: 0.36rem;
            font-family: PingFang SC;
            font-weight: 500;
            color: rgba(255, 247, 183, 1);
            // position: absolute;
            // top: 40%;
            margin: 1.11rem auto;
            text-align: center;
            
          }





    }
  }
  // footer{
  //   position: absolute;
  //   bottom: 0;
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
    opacity:0 ;
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

