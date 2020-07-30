<template>
  <article class="task-list">
    <section class="title">做任务，赚话费红包</section>
    <p class="desc">领取奖励时，随机获得1~10个话费红包，游戏任务奖励更多</p>
    <section class="task-list-wrapper">
      <p>每日任务</p>
      <ul>
        <li v-for="item in list">
          <p class="title">{{item.taskName}}</p>
          <div class="percent">
            <div class="percent-bg">
              <div class="percent-content" :style="{width:percentWidth(item)}"></div>
              <div class="percent-text">
                {{item.userTaskProgress|conversion}}/{{item.taskProgress|conversion}}</div>
            </div>
            <div class="award-wrapper">
              <img src="../../img/little-red-icon.png" alt="">
              <span>{{item.awardName}}</span>
            </div>
          </div>
          <div class="btn receive" v-if="item.taskStatus===0" @click="receive(item)">可领取</div>
          <div class="btn finish" v-if="item.taskStatus===1" @click="toFinish(item)">去完成</div>
          <div class="btn received" v-if="item.taskStatus===2">已领取</div>
        </li>
      </ul>
    </section>
  </article>
</template>

<script>
export default {
  name: 'taskList',
  components: {

  },
  data () {
    return {
      list: [
        {
          taskName: '',
          userTaskProgress: 1,
          taskProgress: 3,
          awardName: '话费红包',
          taskStatus: 1
        }
      ]
    }
  },
  mounted () {

  },
  methods: {
    percentWidth (item) { }
  }
}
</script>

<style lang="less" scoped>
.task-list {
  position: relative;
  margin-top: 0.3rem;
  padding-bottom: 0.1rem;
  .title {
    width: 6.24rem;
    height: 0.7rem;
    background: url('../../img/title-bg.png') no-repeat center center;
    background-size: 100% 100%;
    font-size: 0.3rem;
    color: #ffd5d5;
    text-align: center;
    line-height: 0.56rem;
    margin: auto;
  }
  .desc {
    font-size: 0.2rem;
    color: #fffdfc;
    text-align: center;
    font-weight: 400;
    line-height: 0.36rem;
  }
  .task-list-wrapper {
    width: 6.6rem;
    margin: 0.12rem auto 0.2rem;
    p {
      background: #ff7a13;
      color: #fffdfc;
      font-size: 0.3rem;
      height: 0.78rem;
      line-height: 0.76rem;
      text-align: center;
      border-radius: 0.16rem 0.16rem 0 0;
    }
    ul {
      height: 5.5rem;
      overflow-x: hidden;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      background: #fbc2c2;
      border-radius: 0 0 0.16rem 0.16rem;
      width: 100%;
      padding: 0 0.3rem;
      box-sizing: border-box;
      li {
        position: relative;
        border-bottom: 1px solid #f59898;
        .btn {
          position: absolute;
          top: 50%;
          margin-top: -0.25rem;
          right: 0;
          width: 1.12rem;
          height: 0.5rem;
          line-height: 0.48rem;
          font-size: 0.22rem;
          text-align: center;
          border-radius: 0.25rem;
          color: #fff;
          &.receive {
          }
          &.finish {
          }
          &.received {
          }
        }
      }
    }
  }
}
</style>
