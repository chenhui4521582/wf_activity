<template>
  <div class="award" v-if="value">
    <div class="mask"></div>
    <div class="center">
      <div class="title">规则须知</div>
      <div class="wrap">
        <!-- 上榜 -->
        <template  v-if="myRank !=0 && myRank <=15">
          <div class="ranking-list" :class="{big: oneAward}">
            <div class="item" v-for="(item, index) in rankingAward" :key="index">
              <div class="award-img">
                <img :src="awardsImg[item.awardsType]" alt="">
              </div>
              <div class="award-name">{{item.awardsName}}</div>
            </div>
            <div class="add" v-if="showAddIcon">+</div>
          </div>
          <div class="explain">恭喜您排名<span>第{{myRank}}</span>，获得以上奖品</div>
        </template>
        <!-- 没上榜 -->
        <template v-else>
          <div class="no-ranking-list">
            <div class="item">
              <div class="award-img">
                <img src="../img/no-ranking.png" alt="">
              </div>
              <div class="award-name">您暂未上榜</div>
            </div>
          </div>
          <div class="explain">下次继续加油哟！</div>
        </template>
      </div>
      <div class="closed" @click="hide"></div>
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
.rule{
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
      margin-top:.32rem;
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
  }
  .closed {
    position: absolute;
    left: 50%;
    bottom: -.93rem;
    z-index: 3;
    width: .6rem;
    height: .6rem;
    background: url(../img/close.png) no-repeat center center;
    background-size: 100% auto;
    transform: translate(-50%, 0);
  }
}
</style>