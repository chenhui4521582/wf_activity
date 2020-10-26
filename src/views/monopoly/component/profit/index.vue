<template>
  <div class="profit-container full">
    <div v-if="!isLoading" class="profit-inner-container">
      <div class="ranktitle full">
        <div class="back" @click="rankback">返回</div>
        <img v-if="currentRankType==='today'" src="./img/today.png" class="title">
        <img v-if="currentRankType==='yesterday'" src="./img/yesterday.png" class="title">
        <div class="change-rank-type" @click="changeRankType('yesterday')"
          v-if="currentRankType==='today'">昨日榜单</div>
      </div>
      <h4 class="p-time" :class="{nodata:profitData.length==0}">
        <template v-if="actInfo.state===1">
          <template v-if="currentRankType==='today'">
            发榜时间 ：{{actInfo.endDate}}
          </template>
        </template>
        <template v-else>
          活动结束，已发榜
        </template>
      </h4>
      <div class="profit-tx-container" v-if="profitData.length">
        <ul class="profit-icon">
          <li v-for="(item,index) in topthreeData">
            <div class="s-tx">
              <img v-if="item.profilePhoto" :src="item.profilePhoto | filter">
              <img v-if="!item.profilePhoto" :src="defaultImg | filter">
            </div>
            <span class="s-text">{{item.nickname || '暂无昵称'}}</span>
            <!-- <span class="s-text">{{item.nickname || ('用户'+item.userId)}}</span> -->
            <span class="hammer-number">{{item.totalNum}}枚</span>
            <span class="award-names">
              {{item.awardsName.split('+')[0].replace('金叶子','金叶')}}<template
                v-if="item.awardsName.split('+')[1]"><br />+{{item.awardsName.split('+')[1].replace('元','')}}</template>
            </span>
          </li>
        </ul>
      </div>
      <div class="profit-items" :class="{nodata:profitData.length==0}">
        <div class="p-items p-items-header">
          <ul class="p-item-title">
            <li style="border:none">
              <span>排名</span>
              <span><em class="i-ellipsis">昵称</em></span>
              <span><em class="i-ellipsis">获得骰子+时间</em></span>
              <span><em class="i-ellipsis">奖励</em></span>
            </li>
          </ul>
        </div>
        <div class="p-items p-items-content">
          <ul class="p-item-title">
            <li v-for="(item,index) in behindThreeData">
              <span><i class="icon-dot" :class="'icon-dot'+item.rank">{{item.rank}}</i></span>
              <span><em class="i-ellipsis">{{item.nickname || '暂无昵称'}}</em></span>
              <!-- <span><em class="i-ellipsis">{{item.nickname || ('用户'+item.userId)}}</em></span> -->
              <span><em class="i-ellipsis awardsName">{{item.totalNum}}枚<br /><i
                    class="i-font-style">{{item.updateTime || ''}}</i></em></span>
              <span><em class="i-ellipsis awardsName">{{item.awardsName.split('+')[0]}}<template
                    v-if="item.awardsName.split('+')[1]">+<br />{{item.awardsName.split('+')[1]}}</template></em></span>
            </li>
          </ul>
        </div>
      </div>
      <ul class="my-rank-info">
        <li class="my-have">
          <p class="label">我的骰子</p>
          <p>{{myInfo.totalNum}}</p>
        </li>
        <li class="my-rank">
          <p class="label">我的排名</p>
          <p>{{myInfo.myRank}}</p>
        </li>
        <li class="my-award">
          <template v-if="currentRankType==='yesterday'||myInfo.myRank">
            <p class="label">奖励</p>
            <p>{{myInfo.currentAwards}}</p>
          </template>
          <template v-else>
            <p class="to-top" @click="getDice">去冲榜</p>
          </template>
        </li>
      </ul>
      <div class="profit-footer">
        每天累计获得骰子数量计入排行榜前15名上榜有奖，<br />
        如最终累计的数量一样，则先达成排名靠前
      </div>
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
import { rankList } from '../../services/api'

export default {
  data () {
    return {
      currentRankType: 'today',
      profitData: [],
      topthreeData: [],
      behindThreeData: [],
      myInfo: {},
      isLoading: false,
      defaultImg: '/cdn/common/images/common/img_photo.png'
    }
  },
  props: {
    actInfo: {
      type: Object,
      default: () => ({})
    }
  },
  mounted () {
  },
  methods: {
    async getRankList (info) {
      if (info && info.state === 2) {
        this.currentRankType = 'yesterday'
      }
      this.isLoading = true
      const { code, data } = await rankList(this.currentRankType)
      if (code === 200) {
        this.myInfo = {
          myRank: data.myRank || '未上榜',
          totalNum: data.totalNum,
          currentAwards: data.currentAwards || '无'
        }
        this.profitData = data.rankList
        this.topthreeData = this.profitData.slice(0, 3)
        this.behindThreeData = this.profitData.slice(3, this.profitData.length)
      }
      this.isLoading = false
    },
    changeRankType (type) {
      this.currentRankType = type
      if (type === 'yesterday') {
        GLOBALS.marchSetsPoint('A_H5PT0345004354') // H5平台-欢乐大富翁-昨日排行按钮点击
      }
      this.getRankList()
    },
    rankback () {
      if (this.actInfo.state === 2) {
        location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL'))
      } else if (this.currentRankType === 'yesterday') {
        this.changeRankType('today')
      } else {
        this.$emit('close')
      }
    },
    getDice () {
      this.$emit('get-dice')
      GLOBALS.marchSetsPoint('A_H5PT0345004353') // H5平台-欢乐大富翁-排行榜页面-去冲榜按钮点击
    },
    showPop (type) {
      this.$emit('show-pop', type)
    }
  },
  watch: {}
}
</script>
<style lang="less" scoped>
@import './index.less';

.container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 10%;
}

.spinner {
  height: 100%;
  width: 100%;
  position: relative;
  margin: 0 auto;
}

.spinner div {
  width: 10%;
  height: 26%;
  background-color: #e2812a;
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
