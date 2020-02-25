<template>
  <article>
    <Title title="新增积分">
      <div class="subtitle">查看更多>></div>
    </Title>
    <section class="add-content">
      <div v-for="(item,index) in addScoreList"
        :key="index"
        class="detail">
        <p>{{type[item.type]}}</p>
        <p class="score">+{{item.score}}</p>
        <p class="time">{{item.createTime}}</p>
      </div>
    </section>
  </article>
</template>

<script>
import Title from '../title'

export default {
  components: {
    Title
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
.add-content {
  width: 6.6rem;
  background: #fff;
  margin: 0 auto;
  border-radius: 0.16rem;
  .detail {
    padding: 0.3rem 0.25rem;
    font-size: 0.28rem;
    color: #1b1f29;
    text-align: left;
    .score {
      font-size: 0.32rem;
      color: #ff2828;
      margin-top: -0.04rem;
      text-align: right;
    }
    .time {
      font-size: 0.2rem;
      color: #999999;
      padding-top: 0.02rem;
    }
  }
}
</style>
