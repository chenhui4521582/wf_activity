<template>
  <div class="profit-container" :class="{full:isFull}">
    <div v-if="!isLoading" class="profit-inner-container">
      <div class="ranktitle" :class="{full:isFull}">
        <img src="../../img/rankbank.png" class="back" @click="rankback" v-if="isFull">
        <img :src="$moduleConfig.superLotto.dropDown.inner.rank.title.url"
          :style="$moduleConfig.superLotto.dropDown.inner.rank.title.style" class="title">
      </div>
      <h4 class="p-time" :class="{nodata:profitData.length==0}">
        <template v-if="isFull">
          活动结束，已发榜
        </template>
        <template v-else>
          发榜时间 ：{{endDate}}
        </template>
      </h4>
      <div class="profit-tx-container" v-if="profitData.length">
        <!--查看我的奖励-->
        <div class="myprize" @click="showPop(1)" v-if="isFull">
          我的奖励
        </div>
        <ul class="profit-icon">
          <li v-for="(item,index) in topthreeData">
            <div class="s-tx">
              <img v-if="item.profilePhoto" :src="item.profilePhoto | filter">
              <img v-if="!item.profilePhoto" :src="defaultImg | filter">
            </div>
            <span class="s-text">{{item.nickname || '暂无昵称'}}</span>
            <span class="hammer-number">{{item.totalNum}}个</span>
            <span class="award-names">
              {{item.awardsName.split('+')[0].replace('金叶子','金叶')}}<br />+{{item.awardsName.split('+')[1]&&item.awardsName.split('+')[1].replace('元','')}}
            </span>
          </li>
        </ul>
      </div>
      <div class="profit-items" :class="{nodata:profitData.length==0}">
        <div class="p-header"
          :style="{background:$moduleConfig.superLotto.dropDown.inner.tabs.btnDefaultStyle.background}">
          <ul>
            <li>
              <h4
                :style="{color:$moduleConfig.superLotto.dropDown.inner.tabs.btnDefaultStyle.color}">
                我的排名</h4>
              <span>{{myInfo.myRank?myInfo.myRank:'1000+'}}</span>
            </li>
            <li :style="{borderColor:$moduleConfig.superLotto.dropDown.inner.bg.background}">
              <h4
                :style="{color:$moduleConfig.superLotto.dropDown.inner.tabs.btnDefaultStyle.color}">
                累计获得号码</h4>
              <span>{{myInfo.totalNum}}个</span>
            </li>
            <li>
              <h4
                :style="{color:$moduleConfig.superLotto.dropDown.inner.tabs.btnDefaultStyle.color}">
                当前奖励</h4>
              <span>{{myInfo.currentAwards}}</span>
            </li>
          </ul>
        </div>
        <div class="p-items p-items-header"
          :style="{background:$moduleConfig.superLotto.dropDown.inner.tabs.btnDefaultStyle.color,color:$moduleConfig.superLotto.dropDown.inner.tabs.btnDefaultStyle.background}">
          <ul class="p-item-title">
            <li style="border:none">
              <span>排名</span>
              <span><em class="i-ellipsis">昵称</em></span>
              <span><em class="i-ellipsis">获得号码+时间</em></span>
              <span><em class="i-ellipsis">奖励</em></span>
            </li>
          </ul>
        </div>
        <div class="p-items p-items-content"
          :style="{background:$moduleConfig.superLotto.dropDown.inner.tabs.btnDefaultStyle.color,color:$moduleConfig.superLotto.dropDown.inner.bg.background}">
          <ul class="p-item-title">
            <li v-for="(item,index) in behindThreeData">
              <span><i class="icon-dot" :class="'icon-dot'+item.rank">{{item.rank}}</i></span>
              <span><em class="i-ellipsis">{{item.nickname || '暂无昵称'}}</em></span>
              <span><em class="i-ellipsis awardsName">{{item.totalNum}}个<br /><i
                    class="i-font-style">{{item.updateTime || ''}}</i></em></span>
              <span><em
                  class="i-ellipsis awardsName">{{item.awardsName.split('+')[0]}}+<br />{{item.awardsName.split('+')[1]}}</em></span>
            </li>
            <li v-if="isOpen" v-for="(item,index) in otherData">
              <span><i class="icon-dot">{{item.rank}}</i></span>
              <span><em class="i-ellipsis">{{item.nickname || '暂无昵称'}}</em></span>
              <span><em class="i-ellipsis awardsName">{{item.totalNum}}个<br /><i
                    class="i-font-style">{{item.updateTime || ''}}</i></em></span>
              <span><em
                  class="i-ellipsis awardsName">{{item.awardsName.split('+')[0]}}+<br />{{item.awardsName.split('+')[1]}}</em></span>
            </li>
            <li v-if="!isOpen" style="border: none">
              <a href="javascript:" class="btn-check-profit"
                @click.stop="closeOpenProfit">点击展开完整榜单</a>
            </li>
            <li v-for="(item,index) in lastThreeData">
              <span><i class="icon-dot">{{item.rank}}</i></span>
              <span><em class="i-ellipsis">{{item.nickname || '暂无昵称'}}</em></span>
              <span><em class="i-ellipsis awardsName">{{item.totalNum}}个<br /><i
                    class="i-font-style">{{item.updateTime || ''}}</i></em></span>
              <span><em
                  class="i-ellipsis awardsName">{{item.awardsName.split('+')[0]}}+<br />{{item.awardsName.split('+')[1]}}</em></span>
            </li>
          </ul>
        </div>
      </div>
      <div class="profit-footer"
        :style="{color:$moduleConfig.superLotto.dropDown.inner.tabs.btnDefaultStyle.background}">
        活动期间累计获得号码数量计入排行榜前30名上榜有奖<br>
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
      curIndex: 0,
      profitData: [],
      topthreeData: [],
      behindThreeData: [],
      otherData: [],
      lastThreeData: [],
      isOpen: true,
      myInfo: {},
      isLoading: false,
      defaultImg: '/cdn/common/images/common/img_photo.png',
      popType: 0,
      awardData: null
    }
  },
  props: {
    isFull: {
      type: Boolean,
      default: false
    },
    from: {
      type: Number,
      default: 0
    },
    endDate: {
      type: String,
      default: ''
    }
  },
  mounted () {
    this.getRankList()
  },
  methods: {
    closeOpenProfit () {
      this.isOpen = true
      GLOBALS.marchSetsPoint('A_H5PT0248002915')   // 点击展开完整榜单
    },
    async getRankList () {
      this.isLoading = true
      const { code, data } = await rankList()
      if (code === 200) {
        this.myInfo = {
          myRank: data.myRank,
          totalNum: data.totalNum,
          currentAwards: data.currentAwards || '无'
        }
        this.profitData = data.rankList
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
      }
      this.isLoading = false
    },
    rankback () {
      location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL'))
    },
    showPop (type) {
      this.$emit('showPop', type)
    }
  },
  watch: {}
}
</script>
<style lang="less" scoped>
@import './index.less';

.loading-wrap {
  // position: fixed;
  // top: 0;
  // left: 0;
  // width: 100%;
  // height: 100%;
  // background-color: rgba(0, 0, 0, 0);
  // z-index: 15;
}

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
