<template>
  <div class="profit-container" :class="{full:isFull}">
    <div v-if="!isLoading" class="profit-inner-container">
      <div class="back" @click="back">
        <div>返回</div>
      </div>
      <img src="./images/title.png" class="title">
      <h4 v-if="countDown" class="p-time">发榜倒计时：{{countDown}}</h4>
      <h4 v-else class="p-time">活动已结束</h4>
      <div class="profit-tx-container">
        <ul class="profit-icon">
          <li v-for="(item,index) in topthreeData">
            <div class="s-tx">
              <img :src="(item.profilePhoto||defaultImg) | filter" :class="{second:index==0}">
            </div>
            <span class="icon-number"></span>
            <span class="s-text" :class="{second:index==0,last:index==2}">{{item.nickname}}</span>
            <span class="hammer-number" :class="{second:index==0,last:index==2}">{{item.totalNum|filterPrice}}个币</span>
            <span class="award-names">
              {{item.awardsName.split('+')[0].replace('金叶子','金叶')}}<br/><template v-if="item.awardsName.includes('+')">+{{item.awardsName.split('+')[1]&&item.awardsName.split('+')[1].replace('元','')}}</template>
            </span>
          </li>
        </ul>
      </div>
      <div class="profit-items" :class="{nodata:profitData.length==0}">
        <div class="p-header">
          <ul>
            <li>
              <h4>我的排名</h4>
              <span>{{myInfo.myRank?myInfo.myRank:'1000+'}}</span>
            </li>
            <li>
              <h4>累计获得游戏币</h4>
              <span>{{myInfo.totalNum|filterPrice}}个币</span>
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
              <span><em class="i-ellipsis">昵称</em></span>
              <span><em class="i-ellipsis">获得游戏币+时间</em></span>
              <span><em class="i-ellipsis" style="line-height: 0.68rem;">奖励</em></span>
            </li>
          </ul>
        </div>
        <div class="p-items p-items-content">
          <ul class="p-item-title">
            <li v-for="(item,index) in profitData.slice(3)">
              <span><i class="icon-dot" :class="'icon-dot'+item.rank">{{item.rank}}</i></span>
              <span><em class="i-ellipsis">{{item.nickname || '暂无昵称'}}</em></span>
              <span><em class="i-ellipsis">{{item.totalNum|filterPrice}}个币<br/><i
                class="time">{{item.updateTime}}</i></em></span>
              <span><em
                class="i-ellipsis">{{item.awardsName.split('+')[0]}}<template  v-if="item.awardsName.includes('+')">+<br/>{{item.awardsName.split('+')[1]}}</template></em></span>
            </li>
          </ul>
        </div>
      </div>
      <div class="profit-footer">活动期间累计获得游戏币数量前10名计入排行榜，排名以系统统计为准</div>
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
  import Services from '../../../../services/services'

  export default {
    data() {
      return {
        curIndex: 0,
        profitData: [],
        topthreeData: [],
        behindThreeData: [],
        otherData: [],
        lastThreeData: [],
        isOpen: true,
        endTime: '',
        isLoading: false,
        defaultImg: '/cdn/common/images/common/img_photo.png'
      }
    },
    props: {
      isFull: {
        type: Boolean,
        default: true
      },
      myInfo: {
        type: Object,
        default: null
      },
      countDown: {
        type: String,
        default: ''
      }
    },
    components: {},
    mounted() {
      this.getRankList()
    },
    methods: {
      back() {
        if (this.countDown) {
          this.$emit('back')
        } else {
          location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL') || '')
        }
      },
      closeOpenProfit() {
        GLOBALS.marchSetsPoint('A_H5PT0229002657') // H5平台-双旦活动页-排行榜页-查看更多榜单点击
        this.isOpen = true
      },
      async getRankList() {
        this.isLoading = true
        const {code, data} = (await Services.rankList()).data
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
      }
    },
    watch: {
      countDown(val) {
        if (!val) {
          this.getRankList()
          this.$emit('refresh', false)
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  @import "./index.less";

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
