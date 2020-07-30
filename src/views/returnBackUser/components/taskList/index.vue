<template>
  <article class="task-list">
    <section class="title">做任务，赚话费红包</section>
    <p class="desc">领取奖励时，随机获得1~10个话费红包，游戏任务奖励更多</p>
    <section class="task-list-wrapper">
      <p class="sub-title">每日任务</p>
      <ul>
        <li v-for="item in list">
          <p class="name">{{item.taskName}}</p>
          <div class="percent">
            <div class="percent-bg">
              <div class="percent-content" :style="{width:percentWidth(item)}"></div>
            </div>
            <div class="percent-text">
              ({{item.userTaskProgress|conversion}}/{{item.taskProgress|conversion}})
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
          taskName: '体验2局欢乐竞技台球',
          userTaskProgress: 1,
          taskProgress: 3,
          awardName: '话费红包',
          taskStatus: 1
        },
        {
          taskName: '体验2局欢乐竞技台球',
          userTaskProgress: 1,
          taskProgress: 3,
          awardName: '话费红包',
          taskStatus: 1
        },
        {
          taskName: '体验2局欢乐竞技台球',
          userTaskProgress: 1,
          taskProgress: 3,
          awardName: '话费红包',
          taskStatus: 1
        },
        {
          taskName: '体验2局欢乐竞技台球',
          userTaskProgress: 1,
          taskProgress: 3,
          awardName: '话费红包',
          taskStatus: 1
        },
        {
          taskName: '体验2局欢乐竞技台球',
          userTaskProgress: 1,
          taskProgress: 3,
          awardName: '话费红包',
          taskStatus: 1
        }
      ]
    }
  },
  filters: {
    conversion (value) {
      if (value >= 10000) {
        return `${Math.floor(value / 1000) / 10}万`
      } else {
        return value || 0
      }
    }
  },
  mounted () {

  },
  methods: {
    percentWidth (item) {
      let userTaskProgress = item.userTaskProgress || 0
      let taskProgress = item.taskProgress || 1
      let percent = userTaskProgress / taskProgress * 100
      if (percent > 100) {
        percent = 100
      }
      return `${percent}%`
    }
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
    .sub-title {
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
        padding: 0.3rem 0;
        display: flex;
        flex-wrap: wrap;
        &:not(:last-child) {
          border-bottom: 1px solid #f59898;
        }
        .name {
          width: 100%;
          color: #0e0e0e;
          font-size: 0.3rem;
        }
        .percent {
          width: 100%;
          display: flex;
          align-items: center;
          .percent-bg {
            position: relative;
            width: 2.06rem;
            height: 0.14rem;
            border-radius: 0.07rem;
            background: #fff;
            overflow: hidden;
          }
          .percent-content {
            position: absolute;
            height: 100%;
            background: #e3292a;
          }
          .percent-text {
            text-align: center;
            color: #10174f;
            font-size: 0.22rem;
            margin-left: 0.18rem;
          }
          .award-wrapper {
            display: flex;
            align-items: center;
            font-size: 0.22rem;
            color: #e3292a;
            img {
              width: 0.16rem;
              height: 0.23rem;
              margin-left: 0.34rem;
              margin-right: 0.08rem;
            }
          }
        }
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
            background: #ff7e1b;
          }
          &.finish {
            background: #e3292a;
          }
          &.received {
            background: #a05f5f;
          }
        }
      }
    }
  }
}
</style>
