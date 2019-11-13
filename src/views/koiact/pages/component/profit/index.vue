<template>
  <div class="profit-container" :class="{full:isFull}">
    <div v-if="!isLoading" class="profit-inner-container">
      <h4 v-if="isFull" class="p-time"
          style="font-size:.3rem;font-weight:bold;color:rgba(155,66,1,1);margin-bottom: .32rem"></h4>
      <div class="profit-items">
        <div class="p-header">
          锦鲤名单
        </div>
        <div class="p-time" style="margin-bottom: .08rem;margin-top: 0.11rem;"></div>
        <div class="p-items p-items-content" :class="{isfull:isFull}">
          <ul style="margin: .2rem;font-size: .28rem;">
            <li>
              <span style="border-right: 1px solid #fff;">序号</span>
              <span style="border-right: 1px solid #fff;">玩家昵称</span>
              <span style="border-right: 1px solid #fff;">锦鲤分类</span>
              <span>奖品</span>
            </li>
          </ul>
          <div class="p-container" :class="{isfull:isFull}">
            <scroll :data="behindThreeData" ref="scroll" :listenScroll="true" :probeType="3">
              <ul class="p-item-title">
                <li v-for="(item,index) in behindThreeData">
                  <span><i class="icon-dot">{{index+1}}</i></span>
                  <span><em class="i-ellipsis">{{item.nickName || '暂无昵称'}}</em></span>
                  <span><em class="i-ellipsis">{{item.koiName}}</em></span>
                  <span><em class="i-ellipsis">{{item.awardName}}</em></span>
                </li>
                <li v-if="isOpen" v-for="(item,index) in otherData">
                  <span><i class="icon-dot">{{index+behindThreeData.length+1}}</i></span>
                  <span><em class="i-ellipsis">{{item.nickName || '暂无昵称'}}</em></span>
                  <span><em class="i-ellipsis">{{item.koiName}}</em></span>
                  <span><em class="i-ellipsis">{{item.awardName}}</em></span>
                </li>
                <li v-if="!isOpen">
                  <a href="javascript:" class="btn-check-profit" @click.stop="closeOpenProfit"></a>
                </li>
                <li v-for="(item,index) in lastThreeData">
                  <span><i class="icon-dot">{{index+behindThreeData.length+otherData.length+1}}</i></span>
                  <span><em class="i-ellipsis">{{item.nickName || '暂无昵称'}}</em></span>
                  <span><em class="i-ellipsis">{{item.koiName}}</em></span>
                  <span><em class="i-ellipsis">{{item.awardName}}</em></span>
                </li>
              </ul>
            </scroll>
          </div>
        </div>
      </div>
      <!--<div class="profit-footer">仅50名及以内有奖励</div>-->
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
  import rule from '../../../components/rule'
  import {rankList, activityInfo, userRanking} from '../../../utils/api'

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
        countTime: null,
        endTime: '',
        myInfo: {},
        isLoading: false,
        defaultImg: '/cdn/common/images/common/img_photo.png'
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
      }
    },
    components: {
      rule: () => import('../../../components/rule'),
      scroll: () => import('../../../components/scroll')
    },
    mounted() {
      this.getRankList()
      this.getActivityInfo()
    },
    methods: {
      closeOpenProfit() {
        this.isOpen = true
        setTimeout(() => {
          this.$refs.scroll.scrollTo(0, 0)// 滑到顶部
          this.$refs.scroll && this.$refs.scroll.refresh()
        })
      },
      async getRankList() {
        this.isLoading = true
        const {code, data} = await rankList()
        if (code === 200) {
          this.profitData = data
          this.isOpen = false
          this.lastThreeData = this.profitData.slice(this.profitData.length - 6)
          this.behindThreeData = this.profitData.slice(0, 6)
          this.otherData = this.profitData.slice(6, this.profitData.length - 6)
          this.isLoading = false
        }
      },
      async getActivityInfo() {
        const {code, data} = await activityInfo()
        if (code === 200) {
          this.endTime = data.endDate
        }
      },
      async getUserRanking() {
        const {code, data} = await userRanking()
        if (code === 200) {
          this.myInfo = data
          if (this.isFull) {
            this.$emit('set-my-info', data)
          }
        }
      },
      countDown(item) {
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
          // let countDay = day >= 10 ? day : '0' + day
          let countHour = hour >= 10 ? hour : '0' + hour
          let countMinute = minute >= 10 ? minute : '0' + minute
          let countSecond = second >= 10 ? second : '0' + second
          if (day >= 2) {
            this.countTime = 0
          } else if (day > 0) {
            this.countTime = `${day}天${countHour}:${countMinute}:${countSecond}`
          } else {
            this.countTime = `${countHour}:${countMinute}:${countSecond}`
          }
        }, 1000)
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
