<template>
  <div class="award" v-if="value">
    <div class="mask"></div>
    <div class="center">
      <div class="title">排行榜已发榜</div>
      <div class="wrap">
        <!-- 上榜 -->
        <template  v-if="info.myRank !=0 && info.myRank <=15">
          <div class="explain1">恭喜你排名{{info.myRank}}名获得</div>
          <div class="ranking-list">
            <div class="item" v-for="(item, index) in info.awardsList" :key="index">
              <div class="award-img">
                <img class="inner-img" :src="awardsImg[item.awardsType]" alt="">
              </div>
              <div class="award-name">{{item.awardsName}}</div>
            </div>
            <div class="add" v-if="showAddIcon">+</div>
          </div>
        </template>
        <!-- 没上榜 -->
        <template v-else>
          <div class="no-ranking-list">
            <div class="item">
              <div class="award-img">
                <img class="inner-img" src="../img/no-ranking.png" alt="">
              </div>
              <div class="award-name">您暂未上榜</div>
            </div>
          </div>
          <div class="explain">下次继续加油哟！</div>
        </template>
      </div>
      <div class="closed" @click="hide">我知道了</div>
    </div>
  </div>
  
</template>
<script>
export default {
  name: 'award',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    info: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    awardsImg: {
      jyz: require('../img/leaf-icon.png'),
      hfq: require('../img/hf-icon.png'),
      jdk: require('../img/jd-icon.png'),
    }
  }),
  methods: {
    hide() {
      this.$emit('input', false)
    },
    openBetAward () {
      this.$emit('input', false)
      this.$emit('openBetAward', false)
    }
  }
}
</script>
<style scoped lang="less">
*{
  box-sizing: border-box;
}
.inner-img {
  vertical-align: top;
  width: 100%;
  height: 100%;
}
.award{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
  .mask {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 1;
    background: rgba(0,0,0,.7)
  }
  .center {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 5.89rem;
    height: 6.55rem;
    z-index: 2;
    background: #649FEF;
    border-radius: .2rem;
    border:3px solid #000;
    transform: translate(-50%, -50%);
    .title {
      overflow: hidden;
      height: .93rem;
      line-height: .93rem;
      text-align: center;
      font-size: .36rem;
      color: #fff;
      border-bottom:3px solid #000;
      background: #0150E1;
      border-radius: .1rem .1rem 0 0;
    }
    .wrap {
      padding: 0 .2rem;
      overflow-y: scroll;
      overflow-x: hidden;
      -webkit-overflow-scrolling: touch;
      height: 4.6rem;
      color: #fff;
      line-height: .4rem;
      font-size: .24rem;
      a {
        color: #FFD941;
        text-decoration: underline;
      }
    }
    .no-ranking-list {
      margin-top: .67rem;
      .award-img {
        margin: 0 auto;
        width: 1.49rem;
        height: 1.59rem;
      }
      .award-name {
        margin-top: .34rem;
        font-size: .36rem;
        font-weight: bold;
        color: #1052C9;
      }
    }
    .ranking-list {
      display: flex;
      justify-content: space-between;
      .award-img{
        width: 2.54rem;
        height: 1.47rem;
      }
      .award-name{
        font-size: .3rem;
        color: #fff;
      }
    }
    .explain {
        font-size: .36rem;
        font-weight: bold;
        color: #1052C9;
    }
    .explain1 {
      margin: .4rem 0;
      font-size: .3rem;
      font-weight: bold;
      color: #1052C9;
      text-align: center;
    }
  }
  .closed {
    position: absolute;
    left: 50%;
    top: 4.83rem;
    z-index: 3;
    width: 2.83rem;
    height: .8rem;
    line-height: .8rem;
    transform: translate(-50%, 0);
    font-size: .36rem;
    color: #F42424;
    text-align: center;
    border-radius: .4rem;
    background: #fff;
    font-weight: bold;
  }
}
</style>