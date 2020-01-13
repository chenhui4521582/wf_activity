<template>
  <div class="second-bc">
    <div class="top-text">
      <span>{{activityInfo.state===2?'已发榜，':''}}前30名上榜有奖</span>
    </div>
    <div class="topthree">
      <template v-for="(item,index) in topThreeList">
        <div class="top" :class="index===1?'top-one':''">
          <img class="rank-icon" :src="item.rank?require(`../img/second/${item.rank}.png`):''"
            alt />
          <div class="headpic">
            <img :src="item.profilePhoto|filter" alt />
          </div>
          <div class="name">
            <span>{{item.nickname}}</span>
          </div>
          <div class="prize">
            <p class="awards-number">{{item.awardsName|jdkFilter}}</p>
            <p>京东卡</p>
            <p>+</p>
            <p>
              <span class="awards-number">{{item.awardsName|jyzFilter}}</span><span>金叶子</span>
            </p>
          </div>
          <img class="prize-tip" src="../img/second/prize.png" alt />
        </div>
      </template>
    </div>
    <div class="my-rank-info-container">
      <div v-if="myRankInfo.myRank!==1 && activityInfo.state===1" class="information">
        <span>当前距离{{myRankInfo.myRank&&myRankInfo.myRank<=30?'前一名':'上榜'}}奖励还差{{myRankInfo.nextAwardsDiffBlessing}}福气</span>
      </div>
      <div class="my-rank-info">
        <div>
          <span>我的排名</span>
          <span>{{myRankInfo.myRank?myRankInfo.myRank:'暂未上榜'}}</span>
        </div>
        <div>
          <span>累计福气值</span>
          <span>{{myRankInfo.myBlessing||'暂无福气值'}}</span>
        </div>
        <div v-if="activityInfo.state===1" class="to-mall-btn" @click="toMall()"></div>
        <div v-else>
          <span>当前奖励</span>
          <span>{{myRankInfo.currentAwards||'暂无奖励'}}</span>
        </div>
      </div>
    </div>
    <div class="rank-list-wrapper">
      <ul class="rank-list-container">
        <li class="title">
          <p class="rank">排名</p>
          <p class="nickname">玩家昵称</p>
          <p class="totalNum">累计福气值</p>
          <p class="awardsName">当前奖励</p>
        </li>
        <li v-for="(item,index) in fourStartList ">
          <p class="rank">{{item.rank}}</p>
          <p class="nickname">{{item.nickname}}</p>
          <div class="totalNum">
            <p>{{item.totalNum}}</p>
            <p>{{item.updateTime}}</p>
          </div>
          <div class="awardsName">
            <p>{{item.awardsName.split('+')[0]}}+</p>
            <p>{{item.awardsName.split('+')[1]}}</p>
          </div>
        </li>
        <li v-if="otherList.length>0&&!isOpen">
          <img @click.stop="closeOpenProfit" src="../img/second/clickshow.png" alt />
        </li>
        <template v-if="isOpen">
          <li v-for="(item,index) in otherList">
            <p class="rank">{{item.rank}}</p>
            <p class="nickname">{{item.nickname}}</p>
            <div class="totalNum">
              <p>{{item.totalNum}}</p>
              <p>{{item.updateTime}}</p>
            </div>
            <div class="awardsName">
              <p>{{item.awardsName.split('+')[0]}}+</p>
              <p>{{item.awardsName.split('+')[1]}}</p>
            </div>
          </li>
        </template>
        <li v-for="(item,index) in lastStartList ">
          <p class="rank">{{item.rank}}</p>
          <p class="nickname">{{item.nickname}}</p>
          <div class="totalNum">
            <p>{{item.totalNum}}</p>
            <p>{{item.updateTime}}</p>
          </div>
          <div class="awardsName">
            <p>{{item.awardsName.split('+')[0]}}+</p>
            <p>{{item.awardsName.split('+')[1]}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-undef */
import { rankList } from '../services/api'
import _get from 'lodash.get'
export default {
  data () {
    return {
      isOpen: false,
      otherData: [],
      lastTwoData: [],
      rankList: [],
      myRankInfo: {},
      defaultIndex: 5
    }
  },
  mounted () {
    this.getRankList()
  },
  props: {
    activityInfo: {
      type: Object,
      default: {}
    }
  },
  methods: {
    closeOpenProfit () {
      this.isOpen = true
    },
    async getRankList () {
      const res = await rankList()
      this.rankList = _get(res, 'data.rankList', [])
      this.myRankInfo = {
        currentAwards: _get(res, 'data.currentAwards', ''),
        myBlessing: _get(res, 'data.myBlessing', 0),
        myRank: _get(res, 'data.myRank', 0),
        nextAwardsDiffBlessing: _get(res, 'data.nextAwardsDiffBlessing', 0)
      }
      GLOBALS.marchSetsPoint('A_H5PT0234002739') // H5平台-集福气赢大奖页-排行榜页面加载完成
    },
    toMall () {
      GLOBALS.marchSetsPoint('A_H5PT0234002740') // H5平台-集福气赢大奖页-我要福气按钮点击
      location.href = '/xmWap/#/payment/'
    }
  },
  filters: {
    jdkFilter (value) {
      if (value) {
        return value.split('京东')[0]
      }
      return ''
    },
    jyzFilter (value) {
      if (value) {
        return value.split('+')[1].split('金叶')[0]
      }
      return ''
    }
  },
  computed: {
    topThreeList () {
      let arr = this.rankList.filter((currentValue, index, arr) => {
        return index < 3
      })
      if (arr.length < 3) {
        let emptyArr = []
        for (let i = 0; i < 3 - arr.length; i++) {
          emptyArr.push({})
        }
        arr = [...arr, ...emptyArr]
      }
      let second = arr.splice(1, 1)
      arr.unshift(...second)
      return arr
    },
    fourStartList () {
      let arr = this.rankList.filter((currentValue, index, arr) => {
        return index > 2 && index < this.defaultIndex
      })
      return arr
    },
    otherList () {
      let arr = this.rankList.filter((currentValue, index, arr) => {
        return index >= this.defaultIndex && index !== this.rankList.length - 1
      })
      return arr
    },
    lastStartList () {
      let arr = this.rankList.filter((currentValue, index, arr) => {
        return index >= this.defaultIndex && index === this.rankList.length - 1
      })
      return arr
    }
  }

}
</script>
<style lang='less' scoped>
* {
  padding: 0;
  margin: 0;
}
.second-bc {
  background: url("../img/second/second-bc.png");
  background-size: 100% 100%;
  width: 7.2rem;
  height: 11.37rem;
  position: relative;
  overflow: hidden;
  margin: auto;
  top: 0;
  .top-text {
    display: flex;
    font-size: 0.2rem;
    font-weight: bold;
    color: #ffe300;
    justify-content: center;
    margin-top: 1.14rem;
    margin-bottom: 0.4rem;
  }
  .topthree {
    display: flex;
    justify-content: space-evenly;
    align-items: flex-end;
    height: 4.3rem;
    width: 90%;
    text-align: center;
    margin: -0.92rem auto 0.9rem;
    .top {
      position: relative;
      background-image: url(../img/second/top-two-or-three.png);
      background-size: 1.68rem 3.12rem;
      background-position: center bottom;
      background-repeat: no-repeat;
      width: 1.8rem;
      height: 3.44rem;
      font-size: 0;
      div {
        margin: auto;
      }
      .rank-icon {
        width: 0.53rem;
        height: 0.53rem;
        display: block;
        position: relative;
        margin: 0.2rem auto 0;
      }
      .headpic {
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%;
        overflow: hidden;
        border: none;
        margin-top: -0.26rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .prize-tip {
        position: absolute;
        top: 2rem;
        left: 0.3rem;
        width: 0.38rem;
        height: 0.38rem;
      }
      .name {
        background: url("../img/second/namebackground.png");
        background-size: 100% 100%;
        width: 1.29rem;
        height: 0.38rem;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: -0.1rem;
        position: relative;
        span {
          text-align: center;
          width: 0.8rem;
          font-size: 0.16rem;
          font-weight: bold;
          color: #fff7a7;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
      }
      .prize {
        width: 1rem;
        font-size: 0.18rem;
        line-height: 0.2rem;
        font-weight: bold;
        text-align: center;
        display: block;
        white-space: nowrap;
        margin-top: 0.1rem;
        color: #fff7a7;
        .awards-number {
          font-size: 0.18rem;
          font-weight: bold;
          color: rgba(255, 230, 0, 1);
          text-align: center;
        }
      }
    }
    .top-one {
      background-image: url(../img/second/top-one.png);
      background-size: 1.8rem 3.44rem;
      .rank-icon {
        margin-top: -0.16rem;
      }
      .headpic {
        width: 1.32rem;
        height: 1.32rem;
        border-radius: 50%;
        margin-top: -0.18rem;
      }
      .prize-tip {
        top: 1.9rem;
        left: 0.26rem;
      }
      .prize {
        margin-top: 0.24rem;
      }
    }
  }
  .my-rank-info-container {
    position: relative;
    font-size: 0;
    .information {
      background: url("../img/second/information.png");
      background-size: 100% 100%;
      min-width: 2.68rem;
      height: 0.66rem;
      position: absolute;
      top: -0.7rem;
      left: 1.9rem;
      white-space: nowrap;
      text-align: center;
      padding: 0 0.14rem;
      span {
        font-size: 0.2rem;
        font-weight: bold;
        color: #ffffff;
        height: 0.5rem;
        line-height: 0.5rem;
      }
    }
    .my-rank-info {
      display: flex;
      width: 80%;
      justify-content: space-around;
      margin: 0 auto;
      text-align: center;
      align-items: center;
      height: 0.6rem;
      line-height: 0.3rem;
      div {
        justify-content: center;
        display: block;
        align-items: center;
        width: 1.7rem;
        span:first-child {
          font-size: 0.2rem;
          font-weight: bold;
          color: rgba(255, 255, 255, 1);
        }
        span:last-child {
          font-size: 0.22rem;
          font-weight: bold;
          color: #ffdb48;
        }
        span {
          display: block;
        }
      }
      .to-mall-btn {
        width: 2.36rem;
        height: 1.04rem;
        background-image: url(../img/second/fuqi.png);
        background-position: center center;
        background-size: 100% 100%;
        background-repeat: no-repeat;
        margin-bottom: 0.22rem;
      }
    }
  }
}
.rank-list-wrapper {
  margin: 0 auto;
  overflow: hidden;
  padding: 0.2rem 0.4rem 0;
  .rank-list-container {
    height: 3.02rem;
    overflow-y: scroll;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    li {
      margin: 0 auto;
      min-height: 0.6rem;
      line-height: 0.3rem;
      list-style: none;
      font-size: 0.24rem;
      color: #ffe0c7;
      border-bottom: 1px solid #ff8d85;
      display: flex;
      align-items: center;
      text-align: center;
      &.title {
        font-weight: bold;
        min-height: 0.4rem;
      }
      .rank {
        min-width: 1rem;
        max-width: 1rem;
        padding: 0.02rem 0.04rem;
      }
      .nickname {
        width: 1.2rem;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 0.02rem 0.04rem;
      }
      .totalNum {
        width: 2rem;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 0.02rem 0.04rem;
      }
      .awardsName {
        flex: 1;
        padding: 0.02rem 0.04rem;
      }
    }
    img {
      width: 2.64rem;
      height: 0.46rem;
      margin: 0 auto;
    }
  }
}
</style>