<template>
  <div class="profit" :style="{marginTop:current==1?'0.8rem':''}">
    <!-- 标题 -->
    <div class="rank-title" ></div>
    <!-- 榜单截至提示 -->
    <div class="rank-endtime">
      榜单统计截止{{rankEndTime.split(' ')[0]}}
    </div>
    <div class="profit-container" :class="{full:false}">
      <div v-if="!isLoading" class="profit-inner-container">
        <div class="profit-tx-container">
          <img src="../../../images/rank/top3.png" alt="" class="top3">
          <ul class="profit-icon">
            <li v-for="(item,index) in topthreeData">
              <div class="s-tx">
                <img v-if="item.profilePhoto" :src="item.profilePhoto | filter">
                <img v-if="!item.profilePhoto" :src="defaultImg | filter">
              </div>
              <span class="icon-number">{{item.nickName}}</span>
              <span class="s-text">{{item.plantFoodNum}}点</span>
            </li>
          </ul>
        </div>
        <div class="profit-items">
          <div class="p-header">
            <ul>
              <li>
                <h4>我的排名</h4>
                <span>{{myInfo.myRank?myInfo.myRank:'1000+'}}</span>
              </li>
              <li>
                <h4>累计获得翻牌点</h4>
                <span>{{myInfo.rankNum}}点</span>
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
                <span><em class="i-ellipsis">累计翻牌点+时间</em></span>
                <span><em class="i-ellipsis">奖励</em></span>
              </li>
            </ul>
          </div>
          <div class="p-items p-items-content">
            <ul class="p-item-title">
              <li v-for="(item,index) in behindThreeData">
                <span><i class="icon-dot" :class="'icon-dot'+item.rank">{{item.rank}}</i></span>
                <span><em class="i-ellipsis">{{item.nickName || '暂无昵称'}}</em></span>
                <span><em class="i-ellipsis">{{item.plantFoodNum}}点<br/><i class="i-font-style">{{item.updateTime || ''}}</i></em></span>
                <span><em
                  class="i-ellipsis">{{item.awardsName.split('+')[0]}}+<br/>{{item.awardsName.split('+')[1]}}</em></span>
              </li>
              <li v-if="isOpen" v-for="(item,index) in otherData">
                <span><i class="icon-dot">{{item.rank}}</i></span>
                <span><em class="i-ellipsis">{{item.nickName || '暂无昵称'}}</em></span>
                <span><em class="i-ellipsis">{{item.plantFoodNum}}点<br/><i class="i-font-style">{{item.updateTime || ''}}</i></em></span>
                <span><em
                  class="i-ellipsis">{{item.awardsName.split('+')[0]}}+<br/>{{item.awardsName.split('+')[1]}}</em></span>
              </li>
              <li v-if="!isOpen" style="border: none">
                <a href="javascript:" class="btn-check-profit" @click.stop="closeOpenProfit">点击展开完整榜单</a>
              </li>
              <li v-for="(item,index) in lastThreeData">
                <span><i class="icon-dot">{{item.rank}}</i></span>
                <span><em class="i-ellipsis">{{item.nickName || '暂无昵称'}}</em></span>
                <span><em class="i-ellipsis">{{item.plantFoodNum}}点<br/><i class="i-font-style">{{item.updateTime || ''}}</i></em></span>
                <span><em
                  class="i-ellipsis">{{item.awardsName.split('+')[0]}}+<br/>{{item.awardsName.split('+')[1]}}</em></span>
              </li>
            </ul>
          </div>
        </div>
        <div class="profit-footer"><i class="dot"></i>前30名上榜有奖励,最终累计翻牌点一样,则先达成排名靠前；<br><i class="dot"></i>高级场加赠翻牌点不计入排行榜中</div>
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
  </div>
</template>
<script type="text/javascript">
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
        defaultImg: '/cdn/common/images/common/img_photo.png',
        rankEndTime:''
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
      current:{
        type:Number,
       default:0 
      }
    },
    mounted() {
      this.getRankList()
      this.getUserRanking()
      this.getActivityInfo()
    },
    methods: {
      closeOpenProfit() {
        this.isOpen = true
        GLOBALS.marchSetsPoint('A_H5PT0156001780')//H5平台-翻牌活动-排行榜页-点击查看完整榜单点击
      },
      async getRankList() {
        this.isLoading = true
        const {code, data} = await rankList()
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
      async getUserRanking() {
        const {code, data} = await userRanking()
        if (code === 200) {
          this.myInfo = data
          if (this.isFull) {
            this.$emit('set-my-info', data)
          }
        }
      },
      async getActivityInfo(){
        const {code, data} = (await this.axios.post('//ops-api.beeplaying.com/ops/api/open-card/activity-info')).data
        if(code===200){
          this.rankEndTime=data.endDate
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  @import '../../../../../common/css/base.css';
  @import "index.less";

  .loading-wrap {
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
