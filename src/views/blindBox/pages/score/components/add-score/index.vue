<template>
  <article>
    <Title title="新增积分">
      <div v-if="addScoreList.length > 0"
        class="subtitle"
        @click="toScoreDetail">查看更多>></div>
      <div v-else
        class="tip"
        @click="showRule">怎么赚积分？</div>
    </Title>
    <section v-if="addScoreList.length > 0"
      class="add-content">
      <div v-for="(item,index) in addScoreList"
        :key="index"
        class="detail">
        <p>{{type[item.type]}}</p>
        <p class="score">+{{item.score}}</p>
        <p class="time">{{item.createTime}}</p>
      </div>
    </section>
    <section v-else
      align="center"
      class="default">
      <img src="./assets/icon.png"
        alt="">
      <p>暂无积分</p>
    </section>
  </article>
</template>

<script>
import Title from '../title'

export default {
  components: {
    Title
  },
  methods: {
    showRule () {
      GLOBALS.marchSetsPoint('A_H5PT0225002941')
      this.$eventBus.$emit('showRule', true)
    },
    toScoreDetail () {
      GLOBALS.marchSetsPoint('A_H5PT0225002942')
      this.$router.push({
        name: 'ScoreDetail'
      })
    }
  },
  data () {
    return {
      type: {
        1: '签到',
        2: '购买盲盒',
        3: '购买透视卡',
        4: '回收奖品'
      }
    }
  },
  props: ['addScoreList']
}
</script>

<style lang="less" scoped>
.subtitle {
  color: #7f7f7f;
  font-size: 0.24rem;
}
.tip {
  color: #d1ac42;
  font-size: 0.24rem;
}
.default {
  padding-top: 0.2rem;
  color: #1b1f29;
  font-size: 0.24rem;
  p {
    padding: 0.15rem 0;
  }
  img {
    width: 1.26rem;
  }
}
.add-content {
  width: 6.6rem;
  background: #fff;
  margin: 0 auto;
  border-radius: 0.16rem;
  .detail {
    padding: 0.3rem 0.25rem 0;
    font-size: 0.28rem;
    color: #1b1f29;
    text-align: left;
    .time {
      font-size: 0.2rem;
      color: #999999;
      padding-top: 0.02rem;
      padding-bottom: 0.25rem;
      border-bottom: 1px solid #eeeeee;
    }
    &:last-child .time {
      border: none;
    }
    .score {
      font-size: 0.32rem;
      color: #ff2828;
      margin-top: -0.04rem;
      text-align: right;
    }
  }
}
</style>
