<template>
    <div class="game-list">
      <img src="../images/ranking-bg1.png" alt="" class="bg">
      <div class="btn" @click="show">
        <img src="../images/get-price-btn.png" alt="">
      </div>
      <div class="mask" v-if="showGameList"></div>
      <transition name="scroll">
        <div class="list" v-if="showGameList">
            <div class="content">
              <div class="title">
                玩游戏赚幸运分
                <div class="close" @click="hide"></div>
              </div>
              <ul>
                <li @click="playGame('billiards')">
                  <img src="../images/games.png" alt="">
                  <p>立即去玩</p>
                </li>
                <li @click="playGame('crush')">
                  <img src="../images/games2.png" alt="">
                  <p>立即去玩</p>
                </li>
                <li @click="playGame('fish')">
                  <img src="../images/games3.png" alt="">
                  <p>立即去玩</p>
                </li>
                <li @click="playGame('square')">
                  <img src="../images/games4.png" alt="">
                  <p>立即去玩</p>
                </li>
              </ul>
              <div class="more-btn" @click="playGame('more')">
              更多游戏>
            </div>
            </div>
        </div>
      </transition>
    </div>
</template>

<script>
  import common from '@/common/js/utils'
  export default {
	name: 'game-list',
    data: () => ({
	  showGameList: false,
	  APP_CHANNEL: localStorage.getItem('APP_CHANNEL') ? localStorage.getItem('APP_CHANNEL'):common.getUrlParam('channel'),
	  ACCOUNT_TOKEN: localStorage.getItem('ACCESS_TOKEN') ? localStorage.getItem('ACCESS_TOKEN'):common.getUrlParam('token'),
	  pageFrom: common.getUrlParam('from')
    }),
    methods: {
	  show () {
		this.showGameList = true
        this.$emit('noScroll')
      },
      hide () {
	    this.showGameList = false
		this.$emit('scroll')
      },
      playGame (type) {
        let games = {
		  crush: `https://wap.beeplay123.com/crush/?channel=${this.APP_CHANNEL}&token=${this.ACCOUNT_TOKEN}`,
		  billiards: `https://wap.beeplay123.com/billiards/?channel=${this.APP_CHANNEL}&token=${this.ACCOUNT_TOKEN}`,
		  fish: `https://wap.beeplay123.com/fish/?channel=${this.APP_CHANNEL}&token=${this.ACCOUNT_TOKEN}`,
		  square: `https://wap.beeplay123.com/square/?channel=${this.APP_CHANNEL}&token=${this.ACCOUNT_TOKEN}`,
          bdWap: `https://wap.beeplay123.com/bdWap/#/cGame?channel=${this.APP_CHANNEL}&token=${this.ACCOUNT_TOKEN}`,
          wap: `https://wap.beeplay123.com/wap/home/#/cGame?channel=${this.APP_CHANNEL}&token=${this.ACCOUNT_TOKEN}`
        },
		href = '';
        if(type == 'more') {
          switch (this.pageFrom) {
            case 'bdwap':
			  href = games.bdWap
              break;
            default :
              href = games.wap
		  }
		  GLOBALS.marchSetsPoint('A_H5PT0075000726')
        }else {
          switch (type) {
            case 'crush':
              href = games.crush
              break;
            case 'billiards':
              href = games.billiards
              break;
            case 'fish':
              href = games.fish
              break;
            case 'square':
              href = games.square
              break;
		  }
		  GLOBALS.marchSetsPoint('A_H5PT0075000725')
        }
        setTimeout(function () {
		  window.location.href = href
		},100)
      }
    }
  }
</script>

<style scoped lang="less">
.game-list {
  position: relative;
  min-height: .92rem;
  .bg {
    width: 100%;
    vertical-align: top;
  }
  .btn {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, 0);
    width: 6.28rem;
    height: .92rem;
    z-index: 2;
    img {
      width: 100%;
      vertical-align: top;
    }
  }
  .mask {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
    background: rgba(0,0,0,.5);
  }
  .list {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 6;
    .content {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 4.3rem;
      z-index: 1;
      background: #E0B58A;
      .title {
        position: relative;
        height: .75rem;
        line-height: .75rem;
        font-weight: bold;
        background: #AA7559;
        text-align: center;
        color: #3B251D;
        font-size: .36rem;
        .close {
          position: absolute;
          width: .46rem;
          height: .46rem;
          background: url("../images/close-btn.png") no-repeat center center / 100% 100%;
          right: .26rem;
          top: .15rem;
        }
      }
      ul {
        margin: .23rem 0 .27rem 0;
        padding: 0 .23rem 0 .22rem;
        display: flex;
        justify-content: space-between;
        li {
          position: relative;
          width: 1.61rem;
          height: 2.19rem;
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
          p {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: .5rem;
            line-height: .5rem;
            text-align: center;
            color: #fff;
            font-size: .24rem;
          }
        }
      }
      .more-btn {
        margin: 0 auto;
        width:2.39rem;
        height:.6rem;
        line-height: .6rem;
        border:1px solid rgba(84,54,43,1);
        border-radius:30px;
        font-size:.24rem;
        font-weight:bold;
        color:rgba(59,37,29,1);
        text-align: center;
      }
    }
    &.scroll-enter{
      bottom: -100%;
    }
    &.scroll-enter-to{
      bottom: 0;
    }
    &.scroll-leave {
      bottom: 0;
    }
    &.scroll-leave-to {
      bottom: -100%;
    }
    &.scroll-enter-active,.scroll-leave-active{
      transition: all .3s;
    }
  }
}




</style>
