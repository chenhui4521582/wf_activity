<template>
  <div class="wrapper" v-if="show">
    <div class="pnl_userInfo">
      <i class="iconfont icon-close" @click="close"></i>
      <div class="pnl_baseInfo">
        <img :src="( userInfo && userInfo.headImg || avatar ) | filter" />
        <ul>
          <li>昵称: {{ userInfo.nickName }}</li>
          <li>玩龄: {{ userInfo.playTime }}</li>
          <li>招财猫等级: {{ userInfo.catLevel }}</li>
        </ul>
      </div>
      <div class="pnl_infoDetail">
        <ul>
          <li>
            盈利榜<br />
            最高排名<br />
            <span class="count">{{ userInfo.profitMaxRanking }}</span>
          </li>
          <li>
            盈利榜<br />
            夺冠次数<br />
            <span class="count">{{ userInfo.profitTopOneTimes }}</span>
          </li>
          <li>
            盈利榜<br />
            前三次数<br />
            <span class="count">{{ userInfo.profitTopThreeTimes }}</span>
          </li>
          <li>
            金叶<br />
            财富<br />
            <span
              class="count">{{ userInfo.leafs > 10000 ? (userInfo.leafs/10000).toFixed(2)+'万' : userInfo.leafs}}</span>
          </li>
        </ul>
      </div>
      <div class="pnl_infoExternal" v-if="userInfo.gameRsps && userInfo.gameRsps.length > 0">
        <div class="pnl_recentPlay">
          <div class='title'>最近爱玩</div>
          <ul>
            <li v-for="game in userInfo.gameRsps" :key="game">
              <img @click="openGame(game)" :src="game.icon | filter" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Services from '../../../services/services'
import _get from 'lodash.get'
// import { jumpUrl } from '@/utils/utils'

export default {
  name: 'userInfo',
  data () {
    return {
      userInfo: {},
      show: false,
      avatar: '/cdn/common/images/common/img_photo.png'
    }
  },
  methods: {
    openGame (game) {
      if (game.url) {
        jumpUrl({ url: game.url })
      }
    },
    init (userId) {
      if (userId) {
        this.show = true
        Services.getStrategyUserInfo({
          userId
        }).then(res => {
          this.userInfo = _get(res, 'data.data', {})
        })
      }
    },
    close () {
      this.show = false
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 10;

  .pnl_userInfo {
    padding: .5rem .36rem .42rem .36rem;
    position: absolute;
    border-radius: .32rem;
    top: 2.5rem;
    left: 50%;
    transform: translate(-50%, 0);
    width: 5.1rem;
    min-height: 5.4rem;
    background: #fff;
    .icon-close {
      position: absolute;
      right: .25rem;
      top: .25rem;
      color: #888;
    }
    .pnl_baseInfo {
      padding-bottom: .27rem;
      border-bottom: 1px #ccc solid;

      img {
        float: left;
        width: 1rem;
      }
      ul {
        float: left;
        margin-left: .3rem;
        li {
          width: 2.8rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: .24rem;
          color: #000;
        }
      }
      &:after {
        content: '';
        display: block;
        clear: both;
      }
    }
  }

  .pnl_infoDetail {
    padding: .27rem 0 .07rem 0;
    border-bottom: 1px solid #CCCCCC; 
    ul {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      li {
        margin-right: .12rem;
        min-width: 1rem;
        margin-bottom: .2rem;
        font-size: .18rem;
        color: #888;
        &:last-child {
          margin-right: 0;
        }
        .count {
          font-size: .24rem;
          color: #000;
        }
      }
      &:after {
        content: '';
        display: block;
        clear: both;
      }
    }
  }

  .pnl_infoExternal {
    padding-top: .2rem;
    font-size: .2rem;
    border-top: 1px solid #ccc;
    .title {
      color: #888;
    }
    .pnl_recentPlay {
      ul {
        margin-top: .06rem;
        display: flex;
        li {
          margin-right: .3rem;
          img {
            width: .8rem;
          }
        }
      }
    }
  }
}
</style>
