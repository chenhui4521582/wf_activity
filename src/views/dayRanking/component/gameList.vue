<template>
    <div class="game-list">
      <img src="../images/ranking-bg1.png" alt="" class="bg">
      <div class="btn" @click="showGameList = true">
        <img src="../images/get-price-btn.png" alt="">
      </div>
      <transition name="scroll">
        <div class="list" v-if="showGameList">
          <div class="mask"></div>
          <div class="content">
            <div class="title">
              玩游戏赚幸运分
              <div class="close" @click="showGameList = false"></div>
            </div>
            <ul>
              <li>
                <a href="">
                  <img src="../images/games.png" alt="">
                </a>

              </li>
              <li>
                <a href="">
                  <img src="../images/games2.png" alt="">
                </a>
              </li>
              <li>
                <a href="">
                  <img src="../images/games3.png" alt="">
                </a>
              </li>
              <li>
                <a href="">
                  <img src="../images/games4.png" alt="">
                </a>
              </li>
            </ul>
            <div class="more-btn">
              更多游戏>
            </div>
          </div>
        </div>
      </transition>
    </div>
</template>

<script>
  export default {
	name: 'game-list',
    data: () => ({
	  showGameList: false
    }),
    methods: {

    }
  }
</script>

<style scoped lang="less">
.game-list {
  position: relative;
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
  .list {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    z-index: 5;
    .mask {
      position: absolute;
      left: 0;
      bottom: 0;
      right: 0;
      top: 0;
      background: rgba(0,0,0,.5);
    }
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
          width: 1.61rem;
          height: 2.19rem;
          img {
            display: block;
            width: 100%;
            height: 100%;
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
  }
}



.scroll-enter,.scroll-leave-to {
  bottom: -100%;
}
.scroll-enter-active,.scroll-leave-active{
  transition: all .3s;
}
</style>
