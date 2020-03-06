<template >
  <transition name="transition">
    <div class="mask" v-if="value==1||value==2||value==7||value==13||value==12||value==20">
      <div class="second-container" :style="{height:value==13?'100%':'',}">
        <div class="tab" v-show="value!=13">
          <div
            @click="gain"
            class="left"
            :style="{'background' :value==2?'#113ABD':'','color':value==2?'#FFFFFF':''}"
          >获得药剂</div>
          <div
            @click="gorank"
            class="right"
            :style="{'background' :isvalue==2?'#5A80FB':'','color':value==2?'#113ABD':''}"
          >有奖排行榜</div>
        </div>
        <!-- 第一个副页,获取瓜分券 -->

        <div class="second-middle" :style="{marginTop:value==13?'0':''}">
          <template v-if="value==1||value==7||value==12||value==20">
            <h5>
              <div></div>&nbsp; 每日任务送药剂（每日重置）
            </h5>
            <ul class="task">
              <li>
                <div>今日完成20个每日任务给1个药丸</div>
                <div class="right">
                  <div class="complete" v-show="userProgress.taskProgress[0].state==0" @click="gocomplete">去完成</div>
                  <div class="draw" v-show="userProgress.taskProgress[0].state==1" @click="draw(1)">领取</div>
                  <div class="completed" v-show="userProgress.taskProgress[0].state==2">已完成</div>
                  <div class="num">{{userProgress.taskProgress[0].finishNum}}/{{userProgress.taskProgress[0].totalNum}}</div>
                </div>
              </li>
              <li>
                <div class="left">今日累计充值10元给1个药丸</div>
                <div class="right">
                  <div class="complete" v-show="userProgress.taskProgress[1].state==0" @click="gocomplete">去完成</div>
                  <div class="completed" v-show="userProgress.taskProgress[1].state==2">已完成</div>
                  <div class="draw" v-show="userProgress.taskProgress[1].state==1" @click="draw(2)">领取</div>

                  <div class="num">{{userProgress.taskProgress[1].finishNum}}/{{userProgress.taskProgress[1].totalNum}}</div>
                </div>
              </li>
            </ul>
            <h5>
              <div></div>&nbsp;玩游戏得药剂
            </h5>
            <p class="second-tips">
              在游戏中（除套圈，枪火英雄，麻将，斗地主，飞机大战，
              生肖大作战及跑得快）消耗金叶可以获得对应数量的药剂
            </p>
            <main>
              <!-- 进度条 -->
              <div class="progess">
                <div class="line"></div>
              </div>

              <div class="main-container">
                <ul>
                  <li v-for="(item,key) in userProgress.gameProgress.progressList" :key="item.id">
                    <div class="point" v-show="key==4">
                      <div class="point-up">
                        <div></div>
                        <div style="margin:0 0.06rem"></div>
                        <div></div>
                      </div>
                      <div class="point-down">
                        <div></div>
                        <div style="margin:0 0.06rem"></div>
                        <div></div>
                      </div>
                    </div>
                    <div>
                      <p v-show="key!=4">支持金叶</p>
                      <p
                        v-show="key!=4"
                        style="font-size:0.22rem;font-weight:bold;white-space:nowrap"
                      >{{item.amount}}</p>
                    </div>
                    <!-- <div v-if="currentIndex==key">...</div> -->
                    <div v-show="key!=4" class="img">
                      <img v-show="item.propType==1" src="../images/secondpage/small-yellow.png" />
                        <img v-show="item.propType==2" src="../images/playgame/alcohol.png" />
                          <img v-show="item.propType==3" src="../images/secondpage/small-green.png" />
                    </div>
                    <p v-show="key!=4">{{item.awards}}</p>
                    <div
                      v-show="key!=4&&item.status==1"
                      class="main-btn"
                      @click="gamedraw(item.sort,item.awards)"
                    >领取</div>
                    <div v-show="key!=4&&item.status==0" class="complete" @click="playgame">去完成</div>
                    <div v-show="key!=4&&item.status==2" class="completed">完成</div>
                  </li>
                </ul>
              </div>
              <div class="main-bottom">
                <div class="main-bottom-left">
                  <span>已支持金叶：</span>
                  <span>{{userProgress.gameProgress.gameBetting|filterPrice}}</span>
                </div>
              </div>
            </main>
            <h5>
              <div></div>&nbsp; 超值礼包额外赠
            </h5>
            <section>
              <div class="section">
                <div class="prize" v-for="(item,key) in list2" :key="key">
                  <div class="prize-img">
                    <img :src="item.img" />
                  </div>
                  <div class="prize-texts">
                    <p>{{item.text1}}</p>
                    <p style="color:#E74615">
                      <span>赠</span>
                      {{item.text2}}
                    </p>
                  </div>
                  <div class="prize-btn">{{item.money}}</div>
                </div>
              </div>
              <div class="section-bottom">
                <div class="section-bottom-left">已购买礼包：{{userProgress.buyTime}}次</div>
                <!-- <div class="shape"></div>
                <div class="section-bottom-right">累计瓜分券：720张</div>-->
              </div>
            </section>
          </template>
          <!-- 第二个副页，有奖排行榜 -->
          <template v-if="value==2||value==13">
            <div class="rank-title">
              <div class="back" v-if="value==13"></div>
            </div>
            <div class="rank-topthree">
              <div
                class="rank-top"
                v-for="(item,index) in topThreeList "
                :key="index"
                :class="index===0?'top-two':index===1?'top-one':index===2?'top-three':''"
              >
                <div class="headpic">
                  <img :src="item.profilePhoto || defaultImg |filter" alt="">
                </div>
                <div class="username">{{item.nickname}}</div>
                <div class="num">{{item.totalNum}}</div>
                <div class="prize-texts">
                  <p >{{(item.awardsName||''|filterPrice).split('+')[0]}}</p>
                  <p  >+{{(item.awardsName||''|filterPrice).split('+')[1]}}</p>
                </div>
              </div>
            </div>
            <!-- 排行榜列表 -->
            <div class="rank-list-container">
              <!-- 头部标题 -->
              <div class="rank-list-top">
                <!-- 我的排名 -->
                <div class="top-myrank">
                  <p class="top-texts">我的排名</p>
                  <p class="top-num">{{ranklist.myRank}}</p>
                </div>
                <div class="line"></div>
                <!-- 消灭的病毒 -->
                <div class="killed-virus">
                  <p class="top-texts">消灭的病毒</p>
                  <p class="top-num">{{ranklist.totalNum}}</p>
                </div>
                <div class="line"></div>
                <!-- 当前奖励 -->
                <div class="current-prize">
                  <p class="top-texts">当前奖励</p>
                  <p class="top-num">{{ranklist.currentAwards.split('+')[0]}}+</p>
                  <p class="top-num">{{ranklist.currentAwards.split('+')[1]}}</p>
                </div>
              </div>
              <div class="rank-list-main">
                <div class="main-top">
                  <ul>
                    <!-- 列表第一行 -->
                    <li class="title">
                      <p class="rank">排名</p>
                      <div class="line"></div>
                      <p class="nickname">昵称</p>
                      <div class="line"></div>
                      <p class="virus-time">消灭病毒+时间</p>
                      <div class="line"></div>
                      <p class="prize">奖励</p>
                    </li>
                    <!-- 排行榜列表 -->
                    <li class="rank-list" v-for="(item,key) in fourStartList">
                      <div
                        :style="{background:key==1?'#FF8439':key==2?'#FF3C3C':''}"
                        class="order"
                      >{{item.rank}}</div>
                      <div class="nick">{{item.nickname}}</div>
                      <div class="num-time">
                        <p>{{item.totalNum}}</p>
                        <p>{{item.updateTime}}</p>
                      </div>
                      <div class="prize">
                        <p>{{item.awardsName.split('+')[0]}}+</p>
                        <p>{{item.awardsName.split('+')[1]}}</p>
                      </div>
                    </li>
                    <li class="btn-rank" v-if="otherList.length>0&&!isOpen">
                      <img
                        @click.stop="closeOpenProfit"
                        src="../images/secondpage/rank/clickshow.png"
                        alt
                      />
                    </li>
                    <template v-if="isOpen">
                      <li class="rank-list" v-for="(item,index) in otherList" :key="index">
                        <div class="order" :class="'ordercss'">{{item.rank}}</div>
                        <div class="nick">{{item.nickname}}</div>
                        <div class="num-time">
                          <p>{{item.totalNum}}</p>
                          <p>{{item.updateTime}}</p>
                        </div>
                        <div class="prize">
                          <p>{{item.awardsName.split('+')[0]}}+</p>
                          <p>{{item.awardsName.split('+')[1]}}</p>
                        </div>
                      </li>
                    </template>
                    <li class="rank-list" v-for="(item,key) in lastStartList">
                     <div class="order" :class="'ordercss'">{{item.rank}}</div>
                        <div class="nick">{{item.nickname}}</div>
                        <div class="num-time">
                          <p>{{item.totalNum}}</p>
                          <p>{{item.updateTime}}</p>
                        </div>
                        <div class="prize">
                          <p>{{item.awardsName.split('+')[0]}}+</p>
                          <p>{{item.awardsName.split('+')[1]}}</p>
                        </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="bottom-tips">
              <p>活动期间累计消灭的病毒数量计入排行榜</p>
              <p>前30名上榜有奖，如最终累计数量一样，则先达成排名靠前</p>
            </div>
          </template>
          <div class="shouqi" @click="close">
            <div></div>
          </div>
        </div>
      </div>

      <!-- <compop :newitem="newitem"></compop> -->
    </div>
  </transition>
  <!--  -->
</template>
<script>
import { ranklist,taskReceive,userprogress,gamereceive } from "../services/api";
import _get from "lodash.get";
import compop from "./comPop";
export default {
  data() {
    return {
      // key:'',
      // 排行榜
      ranklist: {},
      // 排行榜
      rankList:{},
      // 领取奖励
      taskreceive:{},
      // 用户进度
      userProgress:{},
      // 累消领取奖励
      gameReceive:{},
      // 点击指定sort返回的奖品数量
      num:{},
      newitem: "",
      defaultIndex: 6,
      isOpen: false,
      isValue: "",
      currentIndex: 4,
       defaultImg: '/cdn/common/images/common/img_photo.png',
      // 前三
      topthree: [
        {
          name: "诛仙妹妹",
          num: "88888888个",
          text1: "1500万金叶",
          text2: "+15000京东卡"
        },
        {
          name: "刘德华",
          num: "88888888个",
          text1: "500万金叶",
          text2: "+15000京东卡"
        },
        {
          name: "紫霞仙子",
          num: "88888888个",
          text1: "200万金叶",
          text2: "+8000京东卡"
        }
      ],
      // 第三名以后排名
      rank_list: [
        {
          name: "诛仙妹妹",
          num: "88888888个",
          text1: "500万金叶",
          text2: "+15000京东卡"
        },
        {
          name: "刘德华",
          num: "88888888个",
          text1: "1500万金叶",
          text2: "+20000京东卡"
        },
        {
          name: "紫霞仙子",
          num: "88888888个",
          text1: "200万金叶",
          text2: "+8000京东卡"
        },
        {
          order: "4",
          nick: "这里是昵称",
          num: "155555个",
          time: "09/10/9:00",
          prize1: "5000万金叶+",
          prize2: "10000京东卡"
        },
        {
          order: "5",
          nick: "这里是昵称",
          num: "155555个",
          time: "09/10/9:00",
          prize1: "5000万金叶+",
          prize2: "10000京东卡"
        },
        {
          order: "6",
          nick: "这里是昵称",
          num: "155555个",
          time: "09/10/9:00",
          prize1: "5000万金叶+",
          prize2: "10000京东卡"
        },
        {
          order: "7",
          nick: "这里是昵称",
          num: "155555个",
          time: "09/10/9:00",
          prize1: "5000万金叶+",
          prize2: "10000京东卡"
        },
        {
          order: "8",
          nick: "这里是昵称",
          num: "155555个",
          time: "09/10/9:00",
          prize1: "5000万金叶+",
          prize2: "10000京东卡"
        },
        {
          order: "9",
          nick: "这里是昵称",
          num: "155555个",
          time: "09/10/9:00",
          prize1: "5000万金叶+",
          prize2: "10000京东卡"
        },
        {
          order: "10",
          nick: "这里是昵称",
          num: "155555个",
          time: "09/10/9:00",
          prize1: "5000万金叶+",
          prize2: "10000京东卡"
        },
        {
          order: "11",
          nick: "这里是昵称",
          num: "155555个",
          time: "09/10/9:00",
          prize1: "5000万金叶+",
          prize2: "10000京东卡"
        },
        {
          order: "12",
          nick: "这里是昵称",
          num: "155555个",
          time: "09/10/9:00",
          prize1: "5000万金叶+",
          prize2: "10000京东卡"
        },
        {
          order: "13",
          nick: "这里是昵称",
          num: "155555个",
          time: "09/10/9:00",
          prize1: "5000万金叶+",
          prize2: "10000京东卡"
        },
        {
          order: "14",
          nick: "这里是昵称",
          num: "155555个",
          time: "09/10/9:00",
          prize1: "5000万金叶+",
          prize2: "10000京东卡"
        },
        {
          order: "15",
          nick: "这里是昵称",
          num: "155555个",
          time: "09/10/9:00",
          prize1: "5000万金叶+",
          prize2: "10000京东卡"
        },
        {
          order: "16",
          nick: "这里是昵称",
          num: "155555个",
          time: "09/10/9:00",
          prize1: "5000万金叶+",
          prize2: "10000京东卡"
        },
        {
          order: "17",
          nick: "这里是昵称",
          num: "155555个",
          time: "09/10/9:00",
          prize1: "5000万金叶+",
          prize2: "10000京东卡"
        },
        {
          order: "18",
          nick: "这里是昵称",
          num: "155555个",
          time: "09/10/9:00",
          prize1: "5000万金叶+",
          prize2: "10000京东卡"
        }
      ],
      list: [
        {
          id: "0",
          num1: "20万",
          num2: "1个",
          type: "药丸",
          img: require("../images/secondpage/small-yellow.png")
        },
        {
          id: "1",
          num1: "50万",
          num2: "3个",
          type: "药丸",
          img: require("../images/secondpage/small-yellow.png")
        },
        {
          id: "2",
          num1: "100万",
          num2: "8个",
          type: "酒精",
          img: require("../images/playgame/alcohol.png")
        },
        {
          id: "3",
          num1: "300万",
          num2: "24个",
          type: "酒精",
          img: require("../images/playgame/alcohol.png")
        },
        { item: "1" },
        {
          id: "5",
          num1: "450000万",
          num2: "6万个",
          type: "疫苗",
          img: require("../images/secondpage/small-green.png")
        }
      ],
      list2: [
        {
          img: require("../images/secondpage/288.png"),
          text1: "28.8万金叶子",
          text2: "15药丸",
          money: "¥288"
        },
        {
          img: require("../images/secondpage/888.png"),
          text1: "88.8万金叶子",
          text2: "70药丸",
          money: "¥888"
        },
        {
          img: require("../images/secondpage/1888.png"),
          text1: "188.8万金叶子",
          text2: "180疫苗",
          money: "¥1888"
        }
      ]
    };
  },
  watch:{
    
  },
  components: {
    compop
  },
 async created() {
    await this.getRankList();
    await this.getUserProgress();
  console.log('排行榜接口',this.ranklist)
  console.log('排行榜列表',this.rankList)
  console.log('第四个开始',this.fourStartList)
  console.log('中间的',this.otherList)
  console.log('最后3个',this.lastStartList)
  },
  computed: {

    isvalue() {
      console.log(this.isValue);
      return (this.isValue = this.value);
    },
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
    },
    otherList() {
      let arr = this.rankList.filter((currentValue, index, arr) => {
        return index >= this.defaultIndex && index <= this.rankList.length - 4;
      });
      return arr;
    },
    lastStartList() {
      let arr = this.rankList.filter((currentValue, index, arr) => {
        return  index>=this.defaultIndex&&index >= this.rankList.length -3 ;
      });
      return arr;
    }
  },
      filters: {
      filterPrice: function (value) {
        if (value) {
          return value > 10000 ? value / 10000 + '万' : value
        } else {
          return 0
        }
      }
    },
  methods: {
    // 用户进度
    async getUserProgress(){
      const res = await userprogress();
      this.userProgress=_get(res,'data',{})
    },
    // 排行榜列表
    async getRankList() {
      const res = await ranklist();
      this.ranklist = _get(res, "data", {});
      this.rankList=_get(res,'data.rankList',{})
    },
    // 累消领取奖励

    // 去完成(跳转游戏)
    playgame() {
      this.$emit("input", 12);
    },
    // 玩游戏后领取
   async gamedraw(sort,awards) {
     const res = await gamereceive(sort);
    this.gamereceive = _get(res,'data',{})
     this.num=awards
     console.log('传num',this.num)
     console.log('传进去sort',this.gamereceive)
    console.log('接子组件sort propType',this.gamereceive.propType)
      this.$emit("input", 7);
      // console.log("item", item);
      // this.newitem = item;
      // this.$emit("newitem", this.newitem);
      this.$emit('propType',this.gamereceive.propType)
      this.$emit('num',this.num)
      console.log("点击子组件", this.newitem);
    },
   async draw(type) {
      // 与领取玩游戏奖励区分
    const res = await taskReceive(type);
    this.taskreceive=_get(res,'data.code',{})
        if(this.taskreceive==='200'){
                this.$emit("input", 20);
        }else{
           this.$toast.show({
            message: '完成数未达到要求',
            duration: 1000
          })
        }

    },
    gocomplete() {},
    closeOpenProfit() {
      this.isOpen = true;
    },
    close() {
      this.$emit("input", 0);
      console.log(this.value);
    },
    gain() {
      this.$emit("input", 1);
      // this.value=1;
    },
    gorank() {
      this.$emit("input", 2);
      this.getRankList();
      // this.value=2;
    }
  },
  props: {
    value: {
      type: Number,
      default: 0
    }
  }
};
</script>
<style lang="less">
@keyframes upp {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.transition-enter-active {
  animation: upp 1s linear;
}
.transition-leave-active {
  animation: upp 1s linear reverse;
}
.mask {
  width: 7.2rem;
  //   height: 12.8rem;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 2;

  .second-container {
    width: 100%;
    height: 98%;

    position: fixed;
    z-index: 12;
    left: 0;
    bottom: 0;
    transition: 1s linear;

    .tab {
      width: 100%;
      height: 0.844rem;
      display: flex;
      position: fixed;
      z-index: 15;
      left: 0;
      overflow-y: hidden;
      .left {
        width: 50%;
        height: 0.85rem;
        background: #5a80fb;
        border-radius: 0.4rem 0 0 0;

        font-size: 0.36rem;
        font-family: Alibaba PuHuiTi;
        font-weight: bold;
        color: rgba(17, 58, 189, 1);
        text-align: center;
        line-height: 0.85rem;
      }
      .right {
        text-align: center;
        line-height: 0.85rem;
        width: 50%;
        height: 0.85rem;

        border-radius: 0 0.4rem 0 0;
        background: #113abd;

        font-size: 0.36rem;
        font-family: Alibaba PuHuiTi;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
      }
    }
    .second-middle {
      position: absolute;
      overflow-y: scroll;
      margin-top: 0.84rem;
      background-color: #5c7efb;
      // height: 100%;
      width: 100%;
      left: 0;
      bottom: 0;
      top: 0;
      right: 0;
      h5 {
        margin: 0.2rem 0 0 0.2rem;
        font-size: 0.24rem;
        font-family: Source Han Sans CN;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        display: flex;
        align-items: center;
        div {
          width: 0.12rem;
          height: 0.12rem;
          background: rgba(255, 255, 255, 1);
          border-radius: 50%;
        }
      }
      .task {
        display: flex;
        flex-direction: column;
        align-items: center;
        li {
          display: flex;
          align-items: center;
          justify-content: space-around;
          list-style: none;
          font-size: 0.3rem;
          font-family: Source Han Sans CN;
          font-weight: bold;
          color: rgba(102, 102, 102, 1);
          margin-top: 0.15rem;

          background: rgba(255, 255, 255, 1);
          box-shadow: 0px 0.05rem 0.09rem 0px rgba(79, 33, 26, 0.13);

          width: 6.47rem;
          height: 1.06rem;

          border-radius: 0.2rem;
          .left {
            margin-right: 0.7rem;
          }
          .right {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .complete {
            width: 0.89rem;
            height: 0.46rem;
            background: rgba(248, 159, 44, 1);
            border-radius: 0.23rem;
            text-align: center;
            font-size: 0.24rem;
            font-family: Source Han Sans CN;
            font-weight: bold;
            color: rgba(255, 255, 255, 1);
            line-height: 0.46rem;
          }
          .draw {
            width: 0.89rem;
            height: 0.46rem;
            background: rgba(255, 67, 48, 1);
            border-radius: 0.23rem;
            text-align: center;
            font-size: 0.24rem;
            font-family: Source Han Sans CN;
            font-weight: bold;
            color: rgba(255, 255, 255, 1);
            line-height: 0.46rem;
          }
          .completed {
            width: 0.89rem;
            height: 0.46rem;
            background: #979797;
            border-radius: 0.23rem;
            text-align: center;
            font-size: 0.24rem;
            font-family: Source Han Sans CN;
            font-weight: bold;
            color: rgba(255, 255, 255, 1);
            line-height: 0.46rem;
          }
          .num {
            font-size: 0.2rem;
            font-family: Alibaba PuHuiTi;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
          }
        }
      }
      .second-tips {
        line-height: 0.27rem;
        margin: 0.1rem auto;
        width: 6.06rem;
        font-size: 0.2rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        flex-wrap: wrap;
      }
      main {
        margin: 0.15rem auto;
        width: 6.46rem;
        height: 2.76rem;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0.05rem 0.09rem 0px rgba(79, 33, 26, 0.13);
        border-radius: 0.15rem;
        position: relative;
        .progess {
          width: 5.86rem;
          height: 0.15rem;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 0.9rem;
          background: rgba(90, 128, 251, 1);
          border-radius: 0.08rem;
          .line {
            width: 1.95rem;
            height: 0.15rem;
            background: rgba(255, 150, 57, 1);
            border-radius: 0.08rem;
            position: relative;
            &::after {
              box-sizing: border-box;
              top: 50%;
              transform: translateY(-50%);
              position: absolute;
              right: 0;
              display: block;
              content: "";
              width: 0.23rem;
              height: 0.23rem;
              background: rgba(255, 218, 20, 1);
              border-radius: 50%;
              border: 0.07rem solid #dc3900;
            }
          }
        }
        .main-container {
          height: 100%;
          ul {
            height: 2.2rem;

            display: flex;
            // justify-content: space-around;
            width: 95%;
            left: 50%;
            margin: 0 auto;
            position: absolute;
            transform: translateX(-50%);
            display: flex;
           
            width: 95%;
            margin: 0 auto;
            li {
              display: flex;
              flex-direction: column;
              align-self: center;
              align-items: center;
              width: 0.89rem;
              .point {
                height: 1.3rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                align-content: space-evenly;
                justify-content: space-between;
                .point-up,
                .point-down {
                  justify-content: center;
                  width: 0.89rem;
                  display: flex;
                  div {
                    width: 0.06rem;
                    height: 0.06rem;
                    background: rgba(220, 141, 0, 1);
                    border-radius: 50%;
                  }
                }
              }

              p {
                width: 0.9rem;
                text-align: center;
                font-size: 0.2rem;
                font-family: Source Han Sans CN;
                font-weight: 500;
                color: #ff4330;
              }
              .img {
                width: 0.621rem;
                height: 0.541rem;
                img {
                  display: block;
                  width: 0.621rem;
                  height: 0.541rem;
                }
              }
              .main-btn {
                margin-top: 0.1rem;
                background: url(../images/secondpage/lingqu.png) no-repeat;
                background-size: 100% 100%;
                width: 0.89rem;
                height: 0.46rem;
                text-align: center;
                line-height: 0.46rem;
                font-size: 0.24rem;
                font-family: Source Han Sans CN;
                font-weight: bold;
                color: rgba(255, 255, 255, 1);
              }
              .complete {
                margin-top: 0.1rem;
                width: 0.89rem;
                height: 0.46rem;
                background: rgba(248, 159, 44, 1);
                border-radius: 0.23rem;
                text-align: center;
                font-size: 0.24rem;
                font-family: Source Han Sans CN;
                font-weight: bold;
                color: rgba(255, 255, 255, 1);
                line-height: 0.46rem;
              }
              .completed {
                width: 0.89rem;
                height: 0.46rem;
                margin-top: 0.1rem;
                text-align: center;
                line-height: 0.46rem;
                font-size: 0.24rem;
                font-family: Source Han Sans CN;
                font-weight: bold;
                color: rgba(22, 61, 184, 1);
              }
            }
          }
        }
        .main-bottom {
          display: flex;
          position: absolute;
          bottom: 0;
          width: 6.46rem;
          height: 0.52rem;
          background: #163db8;
          border-radius: 0 0 0.15rem 0.15rem;
          align-items: center;
          span {
            font-size: 0.24rem;
            font-family: PingFang SC;
            font-weight: bold;
            color: rgba(255, 255, 255, 1);
          }
          .main-bottom-left {
            display: flex;
            line-height: 0.52rem;
            flex: 1;
            justify-content: center;
          }
          .shape {
            width: 0.01rem;
            height: 0.33rem;
            background: rgba(178, 112, 20, 1);
          }
          .main-bottom-right {
            display: flex;
            line-height: 0.52rem;
            flex: 1;
            justify-content: center;
          }
        }
      }
      section {
        position: relative;
        margin: 0.15rem auto;
        width: 6.46rem;
        height: 3.46rem;

        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0.05rem 0.09rem 0px rgba(79, 33, 26, 0.13);
        border-radius: 0.15rem;
        .section {
          justify-content: space-between;
          height: 2.95rem;
          display: flex;
          // align-items: center;
          padding: 0.21rem 0.3rem 0 0.3rem;
        }
        .prize {
          width: 1.79rem;
          height: 2.48rem;
          background: rgba(199, 212, 255, 1);
          border-radius: 0.1rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .prize-img {
            width: 1.28rem;
            height: 1.26rem;
            img {
              width: 1.28rem;
              height: 1.26rem;
            }
          }
          .prize-texts {
            p {
              text-align: center;
              font-size: 0.2rem;
              font-family: Alibaba PuHuiTi;
              font-weight: 400;
              color: rgba(154, 86, 25, 1);
              span {
                display: inline-block;
                width: 0.24rem;
                height: 0.24rem;
                background: rgba(231, 70, 21, 1);
                border-radius: 50%;
                text-align: center;
                line-height: 0.25rem;
                font-size: 0.18rem;
                font-family: Source Han Sans CN;
                font-weight: bold;
                color: rgba(255, 255, 255, 1);
              }
            }
          }
          .prize-btn {
            margin-top: 0.1rem;
            width: 0.96rem;
            height: 0.39rem;
            background: rgba(231, 70, 21, 1);
            border-radius: 0.2rem;
            line-height: 0.39rem;
            font-size: 0.24rem;
            font-family: Alibaba PuHuiTi;
            font-weight: bold;
            color: rgba(236, 244, 255, 1);
            text-align: center;
          }
        }
        .section-bottom {
          position: absolute;
          bottom: 0;
          width: 6.46rem;
          height: 0.52rem;
          background: #163db8;
          border-radius: 0 0 0.15rem 0.15rem;
          display: flex;
          align-items: center;
          .section-bottom-left {
            flex: 1;
            font-size: 0.24rem;
            font-family: PingFang SC;
            font-weight: bold;
            color: rgba(255, 255, 255, 1);
            line-height: 0.52rem;
            display: flex;
            justify-content: center;
          }
          .shape {
            width: 0.01rem;
            height: 0.33rem;
            background: #b27014;
          }
          .section-bottom-right {
            display: flex;
            justify-content: center;
            flex: 1;
            font-size: 0.24rem;
            font-family: PingFang SC;
            font-weight: bold;
            color: rgba(228, 169, 125, 1);
            line-height: 0.52rem;
          }
        }
      }
      .shouqi {
        background: url(../images/shouqi.png) no-repeat;
        position: absolute;
        background-size: 100% 100%;
        width: 0.7rem;
        height: 0.7rem;
        bottom: 1.5rem;
        right: 0;
      }
    }
    .rank-title {
      margin: 0.31rem auto 0;
      background: url(../images/secondpage/rank/title.png) no-repeat;
      background-size: 100% 100%;
      width: 4.69rem;
      height: 0.46rem;
      .back {
        display: block;
        width: 0.58rem;
        height: 0.58rem;
        background: rgba(17, 58, 189, 1);
        border: 0.02rem solid rgba(255, 255, 255, 0.84);
        border-radius: 50%;
        position: absolute;
        left: 0.19rem;
        top: 0.26rem;
      }
    }
    .rank-topthree {
      display: flex;
      justify-content: space-around;
      margin-top: 1.21rem;
      .rank-top {
        &.top-one {
          background: url("../images/secondpage/rank/bg.png") no-repeat;
          background-size: 100% 100%;
          width: 2rem;
          height: 2.76rem;
          position: relative;
          &::before {
            position: absolute;
            top: -0.9rem;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1;
            content: "";
            display: block;
            width: 0.88rem;
            height: 0.67rem;
            background: url(../images/secondpage/rank/1.png) no-repeat;
            background-size: 100% 100%;
          }
        }
        &.top-two {
          background: url("../images/secondpage/rank/bg.png") no-repeat;
          background-size: 100% 100%;
          width: 2rem;
          height: 2.76rem;
          margin-top: 0.88rem;
          position: relative;
          &::before {
            position: absolute;
            top: -0.9rem;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1;
            content: "";
            display: block;
            width: 0.88rem;
            height: 0.67rem;
            background: url(../images/secondpage/rank/2.png) no-repeat;
            background-size: 100% 100%;
          }
        }
        &.top-three {
          background: url("../images/secondpage/rank/bg.png") no-repeat;
          background-size: 100% 100%;
          width: 2rem;
          height: 2.76rem;
          margin-top: 0.86rem;
          position: relative;
          &::before {
            position: absolute;
            top: -0.9rem;
            left: 50%;
            transform: translateX(-50%);
            z-index: 1;
            content: "";
            display: block;
            width: 0.88rem;
            height: 0.67rem;
            background: url(../images/secondpage/rank/3.png) no-repeat;
            background-size: 100% 100%;
          }
        }
        .headpic {
          width: 1.07rem;
          height: 1.1rem;
          border-radius: 50%;
          background-color: pink;
          position: absolute;
          top: -0.4rem;
          left: 50%;
          transform: translateX(-50%);
          &,img{
               width: 1.07rem;
          height: 1.1rem;
          border-radius: 50%;
          }
        }
        .username {
          transform: translateX(-50%);
          position: absolute;
          top: 0.5rem;
          left: 50%;
          width: 1.42rem;
          height: 0.4rem;
          background: rgba(255, 255, 255, 1);
          border-radius: 0.2rem;
          text-align: center;
          line-height: 0.4rem;
          font-size: 0.22rem;
          font-family: Alibaba PuHuiTi;
          font-weight: 400;
          color: rgba(90, 128, 251, 1);
        }
        .num {
          white-space: nowrap;
          text-align: center;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 1.44rem;
          font-size: 0.24rem;
          font-family: Alibaba PuHuiTi;
          font-weight: bold;
          color: rgba(240, 136, 43, 1);
        }
        .prize-texts {
          // left: 56.5%;
          position: absolute;
          left: 50%;
          bottom: 0.5rem;
          height: 0.8rem;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          p {
            text-align: center;
            white-space: nowrap;
            font-size: 0.22rem;
            font-family: Alibaba PuHuiTi;
            font-weight: bold;
            color: rgba(255, 255, 255, 1);
          }
        }
      }
    }
    .rank-list-container {
      width: 6.4rem;
      height: 6.39rem;
      background: rgba(243, 246, 255, 1);
      border-radius: 0.2rem;
      margin: 0.3rem auto;
      .rank-list-top {
        justify-content: space-around;
        align-items: center;
        display: flex;
        width: 6.4rem;
        // height: 1.07rem;
        height: 0.88rem;
        background: rgba(22, 61, 184, 1);
        border-radius: 0.2rem 0.2rem 0 0;
        & div {
          height: 0.88rem;
          text-align: center;

        }
        & div:last-child{
          p{
            margin-top: 0;
          }
        }
        .top-num {
          margin-top: 0.16rem;
          font-size: 0.24rem;
          font-family: Alibaba PuHuiTi;
          font-weight: bold;
          color: rgba(255, 214, 105, 1);
        }
        .top-texts {
          font-size: 0.2rem;
          font-family: PingFang SC;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
        }
        .line {
          width: 0.01rem;
          height: 0.45rem;
          background: rgba(90, 128, 251, 1);
        }
      }
      .rank-list-main {
        .main-top {
          ul {
            overflow-y: scroll;
            height: 5.32rem;
            li {
              align-items: center;
              display: flex;

              border-bottom: 0.01rem solid #d1dcff;
              &:last-child {
                border: none;
              }
              &.title {
                margin-bottom: 0.21rem;
                border: none;
                margin-top: 0.16rem;
                font-size: 0.18rem;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: rgba(90, 128, 251, 1);
                // line-height:34px;
                .rank {
                  margin-right: 0.29rem;
                  margin-left: 0.37rem;
                }
                .nickname {
                  margin-left: 0.54rem;
                  margin-right: 0.56rem;
                }
                .virus-time {
                  margin-left: 0.4rem;
                  margin-right: 0.4rem;
                }
                .prize {
                  margin-left: 0.7rem;
                }
                .line {
                  width: 0.01rem;
                  height: 0.15rem;
                  background: rgba(90, 128, 251, 1);
                }
              }
            }
            // 排行榜后三名

            .rank-list {
              height: 0.66rem;

              // display: flex;
              // justify-content: space-around;
              .order {
                width: 0.35rem;
                height: 0.35rem;
                background: rgba(244, 198, 76, 1);
                border-radius: 50%;
                text-align: center;
              
                font-size: 0.24rem;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: rgba(255, 250, 241, 1);
                margin-right: 0.29rem;
    margin-left: 0.37rem;
                &.ordercss {
                  background: transparent;
                  font-size: 0.24rem;
                  font-family: Source Han Sans CN;
                  font-weight: 400;
                  color: rgba(255, 60, 60, 1);
                  // line-height:34px;
                }
              }
              .nick {
                text-align: center;
                font-size: 0.2rem;
                font-family: Source Han Sans CN;
                font-weight: 400;
                color: rgba(67, 91, 167, 1);
             width: 1.46rem;
                 white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
                // line-height:34px;
              }
              .num-time {
                  
                text-align: center;
              width: 2.01rem;
                p:nth-child(1) {
                    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
                  text-align: center;
                  font-size: 0.2rem;
                  font-family: Source Han Sans CN;
                  font-weight: 400;
                  color: rgba(67, 91, 167, 1);
                }
                p:nth-child(2) {
                  text-align: center;
                  font-size: 0.2rem;
                  font-family: Source Han Sans CN;
                  font-weight: 400;
                  color: rgba(153, 153, 153, 1);
                  // line-height:34px;
                }
              }
              .prize {
                text-align: center;
                margin-left: 0.2rem;
                p {
                  font-size: 0.2rem;
                  font-family: Source Han Sans CN;
                  font-weight: 400;
                  color: rgba(67, 91, 167, 1);
                  text-align: center;
                  // line-height:34px;
                }
              }
            }
            .btn-rank {
              border: none;
              img {
                width: 2.64rem;
                height: 0.46rem;
                margin: 0 auto;
              }
            }
          }
        }
      }
    }
  }
  .bottom-tips {
    font-size: 0.24rem;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(22, 61, 184, 1);
    text-align: center;
    margin-bottom: 0.49rem;
    margin-top: 0.66rem;
  }
}
</style>