<template>
  <section class="game-list">
    <ul class="">
      <li class="normal" v-for="(item,index) in list" :key="index" @click="toggleGame(item)"
        :class="{'locked':item.state===0,'selected':currentGame===item.gameId,'end':item.state===2}">
        <p class="time">{{item|timeFilter}}</p>
        <div class="img-wrapper">
          <img class="item-bg" src="./img/selected-bg.png" alt="选中状态"
            v-if="currentGame===item.gameId">
          <img class="item-bg" src="./img/normal-bg.png" alt="默认状态" v-else>
          <img class="light" src="./img/light.png" alt="light" v-if="item.state===1">
          <img class="light" src="./img/locked-light.png" alt="light" v-if="item.state===0">
          <img class="game-icon" :src="item.url|filter" alt="游戏">
          <img class="end-text" src="./img/end.png" alt="已结束" v-if="item.state===2">
          <img class="locked-icon" src="./img/locked.png" alt="未解锁" v-if="item.state===0">
          <div class="need-receive" v-if="item.state===2&&item.hasRedPoint>0">奖励待领取</div>
        </div>
        <p class="time" @click.stop="goGame(item)"><span>{{item.name}}</span><span
            v-if="item.state===1">>></span></p>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'gameList',
  components: {

  },
  props: {
    list: {
      type: Array,
      default: () => ([])
    },
    currentGame: {
      type: [Number, String],
      default: 0
    }
  },
  filters: {
    timeFilter (item) {
      let time = ''
      if (item) {
        let startTime = item.startTime.split(' ')[0].split('-').splice(1, 2).join('.')
        let endTime = item.endTime.split(' ')[0].split('-').splice(1, 2).join('.')
        time = startTime + '-' + endTime
      }
      return time
    }
  },
  mounted () {

  },
  methods: {
    toggleGame (item) {
      if (!item.state) {
        return
      }
      GLOBALS.marchSetsPoint('A_H5PT0332004185', {
        section_id: item.gameId,
        section_name: item.name
      }) // H5平台-超级任务活动页-各游戏板块点击
      this.$emit('toggleGame', item.gameId)
    },
    goGame (item) {
      item.state === 1 && GLOBALS.jumpOutsideGame(item.gamePath)
    }
  }
}
</script>

<style lang="less" scoped>
.game-list {
  position: relative;
  ul {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    li {
      margin: 0 0.05rem;
      color: #d3a0ff;
      transition: transform 0.2s;
      .img-wrapper {
        position: relative;
        width: 2rem;
        height: 1.6rem;
        margin: 0.12rem 0;
        img {
          max-width: none;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate3D(-50%, -50%, 0);
        }
        .item-bg {
          width: 2rem;
        }
        .light {
          width: 1.76rem;
          height: 1.38rem;
        }
        .game-icon {
          width: 1.5rem;
          height: 1.1rem;
        }
        .end-text {
          width: 1.86rem;
          height: 0.34rem;
          bottom: 0;
          top: auto;
          transform: translate3D(-50%, -0.1rem, 0);
          z-index: 1;
        }
        .locked-icon {
          width: 0.42rem;
          height: 0.52rem;
          z-index: 1;
        }
        .need-receive {
          width: 1.3rem;
          height: 0.44rem;
          line-height: 0.44rem;
          text-align: center;
          background: #fef15c;
          opacity: 0.8;
          border-radius: 0.1rem;
          font-size: 0.2rem;
          color: #b93427;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate3D(-50%, -50%, 0);
          z-index: 1;
        }
      }
      &.selected {
        color: #00fdff;
        transform: scale(1.1);
        .img-wrapper {
          .item-bg {
            width: 2.52rem;
            height: 2.14rem;
          }
        }
      }
      &.locked,
      &.end {
        .img-wrapper::after {
          content: '';
          width: 1.5rem;
          height: 1.1rem;
          background: rgba(48, 22, 86, 0.3);
          position: absolute;
          border-radius: 0.16rem;
          top: 50%;
          left: 50%;
          transform: translate3d(-50%, -50%, 0);
        }
      }
    }
  }
}
</style>
