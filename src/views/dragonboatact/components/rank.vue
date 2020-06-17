<template>
  <div class="rank">
    <img class="back" src="../images/back.png" alt="" @click="back">
    <div class="yesterday" @click="$emit('showPop',9)">昨日排行</div>
    <div class="my_info" v-if="myInfo">
      <div class="item">
        <div class="info">{{myInfo.trackLevel&&tabs[myInfo.trackLevel-1].replace('赛道','')||''}}</div>
        <div class="txt">我的赛道</div>
      </div>
      <div class="item">
        <div class="info">{{myInfo.rank}}</div>
        <div class="txt">我的排名</div>
      </div>
      <div class="item">
        <div class="info">{{myInfo.currentAmount}}米</div>
        <div class="txt">今日划桨</div>
      </div>
      <div class="item">
        <div class="info">{{myInfo.rankAwards||'暂无'}}</div>
        <div class="txt">超级奖励</div>
      </div>
    </div>
    <div class="rank-tabs">
      <div class="item" v-for="(item,index) in tabs" :class="{selected:tabIndex==index}" @click="tabIndex=index">
        {{item}}
      </div>
    </div>
    <div class="tabs_info">
      <p>• 每天到达各赛道终点且排名前10名再赢超级奖励（如获得则计入当前累计奖励）</p>
      <p>• 仅展示各赛道前20名选手 </p>
      <p>• 最终发榜以系统统计为准</p>
    </div>
    <profit :rankData="rankData" :tabIndex="tabIndex" v-if="myInfo"></profit>
  </div>
</template>

<script>
  import {getRankInfo} from '../utils/api'
  export default {
    name: "rank",
    data() {
      return {
        tabs: ['铜赛道', '银赛道', '金赛道'],
        tabIndex: 0,
        rankData:[],
        myInfo:null
      }
    },
    components: {
      profit: () => import('./profit')
    },
    methods: {
      back() {
        this.$emit('back')
      }
    },
    async mounted(){
      let {code,data}=await getRankInfo()
      if(code==200){
        GLOBALS.marchSetsPoint('A_H5PT0302003612')
        this.myInfo={
          currentAmount:data.currentAmount,
          rank:data.rank,
          rankAwards:data.rankAwards,
          trackLevel:data.trackLevel,
        }
        this.rankData=data.trackList
      }
    }
  }
</script>
<style lang="less" scoped>
  .rank {
    min-height: 100vh;
    position: relative;
    background: #16B0BA;
    padding-top: 4.01rem;
    box-sizing: border-box;
    &:before {
      content: '';
      width: 7.2rem;
      height: 6.56rem;
      position: absolute;
      top: 0;
      background: url("../images/rankbg.png");
      background-size: 100% 100%;
    }
    .back {
      width: .68rem;
      height: .68rem;
      position: absolute;
      top: .17rem;
      left: .15rem;
    }
    .yesterday {
      width: .61rem;
      height: 1.59rem;
      padding: 0 .2rem;
      box-sizing: border-box;
      background: rgba(255, 108, 0, 1);
      border-radius: .2rem 0 0 .2rem;
      position: absolute;
      top: .1rem;
      right: 0;
      font-size: .3rem;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      text-align: center;
      display: flex;
      align-items: center;
    }
    .my_info {
      position: absolute;
      top: 2.3rem;
      left: .26rem;
      right: .28rem;
      height: 1.4rem;
      display: flex;
      .item {
        width: 1.4rem;
        &:nth-child(3) {
          width: 1.76rem;
        }
        &:nth-child(4) {
          width: 2.1rem;
        }
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .info {
          font-size: .32rem;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
        }
        .txt {
          margin-top: .26rem;
          font-size: .24rem;
          font-weight: 400;
          color: rgba(149, 77, 11, 1);
        }
      }
    }
    .rank-tabs {
      position: relative;
      width: 6.54rem;
      height: .8rem;
      background: rgba(30, 185, 190, 1);
      border: .02rem solid rgba(255, 255, 255, 1);
      border-radius: .4rem;
      display: flex;
      overflow: hidden;
      margin: auto;
      .item {
        flex: 1;
        line-height: .8rem;
        font-size: .36rem;
        font-weight: bold;
        color: rgba(255, 255, 255, 1);
        text-align: center;
        &.selected {
          color: rgba(30, 185, 190, 1);
          background: rgba(255, 255, 255, 1);
        }
      }
    }
    .tabs_info {
      margin-top: .12rem;
      padding: 0 .48rem;
      font-size: .2rem;
      font-weight: 400;
      color: rgba(4, 108, 115, 1);
    }
  }
</style>
