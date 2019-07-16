<template>
  <div class="profit-container" :class="{full:isFull}">
    <div v-if="!isLoading" class="profit-inner-container">
      <img src="../../images/package/profit/title.png" class="title">
      <h4 v-if="isFull" class="p-time">活动结束，已发榜</h4>
      <h4 v-else-if="countTime" class="p-time">发榜倒计时：{{countTime}}</h4>
      <h4 v-else class="p-time">发榜时间 ：{{endTime}}</h4>
      <div class="profit-tx-container">
        <ul class="profit-icon">
          <li v-for="(item,index) in topthreeData">
            <div class="s-tx">
              <img :src="item.profilePhoto | filter">
            </div>
            <span class="icon-number"></span>
            <span class="s-text">{{item.nickName}}</span>
            <span class="hammer-number">{{item.plantFoodNum}}个</span>
            <!-- <span class="s-text">第{{item.rank}}名</span> -->
            <!-- <div class="profit-award">{{item.awardsName.split('+')[0]}}+<br/>{{item.awardsName.split('+')[1]}}</div> -->
            <!-- <div class="profit-award"></div> -->
          </li>
        </ul>
      </div>
      <div class="profit-items">
        <div class="p-header">
          <ul>
            <li>
              <h4>我的排名</h4>
              <span>{{myInfo.myRank}}</span>
            </li>
            <li>
              <h4>累计获得锤子</h4>
              <span>{{myInfo.totalNum}}个</span>
            </li>
            <li>
              <h4>当前奖励</h4>
              <span>{{myInfo.currentAwards}}</span>
            </li>
          </ul>
        </div>
        <div class="p-items p-items-header">
          <ul class="p-item-title">
            <li style="border:none">
              <span>排名</span>
              <span>昵称</span>
              <span>累计锤子</span>
              <span>奖励</span>
            </li>
          </ul>
        </div>
        <div class="p-items p-items-content">
          <ul class="p-item-title">
            <li v-for="(item,index) in behindThreeData">
              <span><i class="icon-dot">{{item.rank}}</i></span>
              <span>{{item.nickName || '暂无昵称'}}</span>
              <span>{{item.plantFoodNum}}个</span>
              <span>{{item.awardsName.split('+')[0]}}+<br />{{item.awardsName.split('+')[1]}}</span>
            </li>
            <li v-if="isOpen" v-for="(item,index) in otherData">
              <span><i class="icon-dot">{{item.rank}}</i></span>
              <span>{{item.nickName || '暂无昵称'}}</span>
              <span>{{item.plantFoodNum}}个</span>
              <span>{{item.awardsName.split('+')[0]}}+<br />{{item.awardsName.split('+')[1]}}</span>
            </li>
            <li v-if="!isOpen">
              <a href="javascript:" class="btn-check-profit" @click.stop="closeOpenProfit">点击展开完整榜单</a>
            </li>
            <li v-for="(item,index) in lastThreeData">
              <span><i class="icon-dot">{{item.rank}}</i></span>
              <span>{{item.nickName || '暂无昵称'}}</span>
              <span>{{item.plantFoodNum}}个</span>
              <span>{{item.awardsName.split('+')[0]}}+<br />{{item.awardsName.split('+')[1]}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="profit-footer">仅30名及以内有奖励</div>
    </div>
    <div class="loading-wrap" v-if="isLoading">
      <div class="container">
        <div class="spinner">
          <div class="bar1"></div>
          <div class="bar2"></div>
          <div class="bar3"></div>
          <div class="bar4"></div>
          <div class="bar5"></div>
          <div class="bar6"></div>
          <div class="bar7"></div>
          <div class="bar8"></div>
          <div class="bar9"></div>
          <div class="bar10"></div>
          <div class="bar11"></div>
          <div class="bar12"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { rankList, activityInfo, userRanking } from '../../../utils/api'
export default {
  data () {
    return {
      curIndex: 0,
      profitData: [],
      topthreeData: [],
      behindThreeData: [],
      otherData: [],
      lastThreeData: [],
      isOpen: true,
      countTime: 0,
      endTime: '',
      myInfo: {},
      isLoading: false
    }
  },
  props: {
    isFull: {
      type: Boolean,
      default: false
    }
  },
  components: {
  },
  mounted () {
    this.getRankList()
    this.getActivityInfo()
    this.getUserRanking()
  },
  methods: {
    closeOpenProfit () {
      this.isOpen = true
    },
    async getRankList () {
      this.isLoading = true
      const { code, data } = await rankList()
      if (code === 200) {
        this.profitData = data
        if (this.profitData.length > 6) {
          this.lastThreeData = this.profitData.slice(6)
        }
        if (this.profitData.length > 9) {
          this.isOpen = false
          this.lastThreeData = this.profitData.slice(this.profitData.length - 3)
          this.otherData = this.profitData.slice(6, this.profitData.length - 3)
        }
        this.topthreeData = this.profitData.slice(0, 3)
        this.behindThreeData = this.profitData.slice(3, 6)
        this.isLoading = false
      }
    },
    async getActivityInfo () {
      const { code, data } = await activityInfo()
      if (code === 200) {
        this.endTime = data.endTime
        this.countDown(data.countdown)
      }
    },
    async getUserRanking () {
      const { code, data } = await userRanking()
      if (code === 200) {
        this.myInfo = data
        if (this.isFull) {
          this.$emit('set-my-info', data)
        }
      }
    },
    countDown (item) {
      if (!item) return false
      let date = item / 1000
      this.timer = setInterval(() => {
        date = date - 1
        if (date <= 0) {
          date = 0
          clearInterval(this.timer)
        }
        let day = Math.floor(date / 86400)
        let hour = Math.floor(parseInt(date / 60 / 60) % 24)
        let minute = Math.floor(parseInt(date / 60) % 60)
        let second = Math.floor(date % 60)
        let countDay = day >= 10 ? day : '0' + day
        let countHour = hour >= 10 ? hour : '0' + hour
        let countMinute = minute >= 10 ? minute : '0' + minute
        let countSecond = second >= 10 ? second : '0' + second
        if (day >= 2) {
          this.countTime = 0
        } else {
          this.countTime = `${countDay}天${countHour}:${countMinute}:${countSecond}`
        }
      }, 1000)
    }
  }
}
</script>
<style lang="less" scoped>
@import "./index.less";
.loading-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 15;
}
.container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  border-radius: 10%;
}
.spinner {
  height: 40%;
  width: 40%;
  position: relative;
  margin: 0 auto;
}
.spinner div {
  width: 10%;
  height: 26%;
  background-color: white;
  position: absolute;
  left: 44.5%;
  top: 37%;
  opacity: 0;
  border-radius: 30%;
  animation: fade 1s linear infinite;
}
.spinner div.bar1 {
  transform: rotate(0deg) translate(0, -142%);
  animation-delay: 0s;
}
.spinner div.bar2 {
  transform: rotate(30deg) translate(0, -142%);
  animation-delay: -0.9167s;
}
.spinner div.bar3 {
  transform: rotate(60deg) translate(0, -142%);
  animation-delay: -0.833s;
}
.spinner div.bar4 {
  transform: rotate(90deg) translate(0, -142%);
  animation-delay: -0.75s;
}
.spinner div.bar5 {
  transform: rotate(120deg) translate(0, -142%);
  animation-delay: -0.667s;
}
.spinner div.bar6 {
  transform: rotate(150deg) translate(0, -142%);
  animation-delay: -0.5833s;
}
.spinner div.bar7 {
  transform: rotate(180deg) translate(0, -142%);
  animation-delay: -0.5s;
}
.spinner div.bar8 {
  transform: rotate(210deg) translate(0, -142%);
  animation-delay: -0.41667s;
}
.spinner div.bar9 {
  transform: rotate(240deg) translate(0, -142%);
  animation-delay: -0.333s;
}
.spinner div.bar10 {
  transform: rotate(270deg) translate(0, -142%);
  animation-delay: -0.25s;
}
.spinner div.bar11 {
  transform: rotate(300deg) translate(0, -142%);
  animation-delay: -0.1667s;
}
.spinner div.bar12 {
  transform: rotate(330deg) translate(0, -142%);
  animation-delay: -0.0833s;
}

@keyframes fade {
  from {
    opacity: 0.8;
  }
  to {
    opacity: 0.25;
  }
}
</style>