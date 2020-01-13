<template>
  <div class="mask">
    <div class="bg">
      <div class="play-title">
        <img src="../img/play/title.png" alt />
      </div>
      <!-- 中间 -->
      <div class="play-container">
        <div class="play-list" v-for="(item,key) in games" :key="key" @click="toGame(item)">
          <img :src="require(`../img/play/${key}.png`)" />
        </div>
        <div class="play-bottom">
          <div class="play-button" @click="toPlat()">
            <img src="../img/play/button.png" alt />
          </div>
          <div class="play-bottom-tips">
            小贴士：部分游戏不计入活动，详见规则
          </div>
        </div>
      </div>
    </div>
    <div class="congra-close" @click="close">
      <img src="../img/comPop/close.png" alt />
    </div>
  </div>
</template>
<script>
/* eslint-disable no-undef */
export default {
  data () {
    return {
      games: [
        {
          id: 12, url: '/crush'
        }, {
          id: 2, url: '/ball'
        }, {
          id: 10, url: '/fish'
        }, {
          id: 13, url: '/kingdom2'
        }, {
          id: 18, url: '/square'
        }, {
          id: 21, url: '/Marbles'
        }
      ]
    }
  },

  methods: {
    close () {
      this.$emit('close')
    },
    toGame (item) {
      GLOBALS.marchSetsPoint('A_H5PT0234002736', { target_project_id: item.id }) // H5平台-集福气赢大奖页-大家都在玩弹窗-各游戏点击
      location.href = item.url
    },
    toPlat () {
      this.$emit('close')
      GLOBALS.marchSetsPoint('A_H5PT0234002737') // H5平台-集福气赢大奖页-大家都在玩弹窗-更多游戏点击
      location.href = '/xmWap'
    }
  }
}
</script>
<style lang="less" scoped>
.mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.5);
}
.bg {
  background-image: url("../img/comPop/default-bg.png");
  height: 10.12rem;
  width: 6.46rem;
  background-position: center center;
  background-size: 100% 100%;
  padding: 0.2rem;
  box-sizing: border-box;
  margin: auto;
}
.congra-close {
  position: absolute;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  img {
    width: 0.52rem;
    height: 0.52rem;
  }
}
.play-title {
  margin-top: 2.7rem;
  text-align: center;
  font-size: 0;
  img {
    width: 1.98rem;
    height: 0.38rem;
  }
}
.play-container {
  padding: 0.2rem 0.8rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  .play-list {
    width: 1.24rem;
    height: 1.7rem;
    float: left;
    margin: 0.2rem 0 0;
    .list-text {
      font-size: 0.2rem;
      font-weight: 800;
      color: rgba(255, 255, 255, 1);
      position: relative;
      bottom: 0.7rem;
      text-align: center;
      white-space: nowrap;
    }
    img {
      width: 1.24rem;
      height: 1.69rem;
    }
  }
  .play-bottom {
    width: 100% !important;
    display: flex;
    justify-content: center;
    flex-direction: column;
    .play-bottom-tips {
      font-size: 0.2rem;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
      display: inline-block;
      text-align: center;
      line-height: 0.24rem;
    }
  }
  .play-button {
    display: flex;
    justify-content: center;
    img {
      width: 3.28rem;
      height: 0.98rem;
    }
  }
}
</style>