<template>
  <div class="ranking-list">
    <img class="bg" src="../images/ranking-bg.png" alt="" />
    <div class="list-body">
      <div class="title">
        * 幸运分可以通过玩游戏获得，游戏奖励1金叶子=1幸运分。幸运分越高，游戏奖励越丰厚哦！
      </div>
      <div class="container">
        <div class="list-nav">
          <ul>
            <li :class="{current: currentIndex == 0}" @click="currentIndex = 0">当前排行榜</li>
            <li :class="{current: currentIndex == 1}" @click="currentIndex = 1">奖励说明</li>
          </ul>
        </div>
        <div class="list-container">
          <div class="list" v-if="currentIndex == 0">
            <div class="nav">
              <div class="ranking">名次</div>
              <div class="nick-name">昵称</div>
              <div class="integral">幸运分</div>
              <div class="price-name">奖励</div>
            </div>
            <div class="content" ref="list-content">
              <ul>
                <li>
                  <div class="ranking">
                    <img src="../images/one-icon.png" alt="">
                  </div>
                  <div class="nick-name">nichggjgjgf</div>
                  <div class="integral">1000000</div>
                  <div class="price-name">960元话费券</div>
                </li>
                <li>
                  <div class="ranking">
                    <img src="../images/two-icon.png" alt="">
                  </div>
                  <div class="nick-name">nichggjgjgf</div>
                  <div class="integral">1000000</div>
                  <div class="price-name">960元话费券</div>
                </li>
                <li>
                  <div class="ranking">
                    <img src="../images/three-icon.png" alt="">
                  </div>
                  <div class="nick-name">nichggjgjgf</div>
                  <div class="integral">1000000</div>
                  <div class="price-name">960元话费券</div>
                </li>
              </ul>
            </div>

          </div>
          <div class="price" v-if="currentIndex == 1">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
	name: 'rankingList',
    data: () => ({
	  currentIndex: 0,
    }),
    methods: {
    }
  }
</script>

<style scoped lang="less">
.ranking-list {
  position: relative;
  .bg {
    width: 100%;
    vertical-align: top;
  }
  .list-body {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 2;
    padding: .5rem .72rem .58rem .75rem;
    box-sizing: border-box;
    .title {
      margin-bottom: .08rem;
      font-size: .18rem;
      color: #321B12;
      line-height: .3rem;
    }
    .container {
      background: #E0B58A;
      overflow: hidden;
      border-radius: 6px 6px 0 0;
      .list-nav {
        ul {
          display: flex;
          justify-content: center;
          li {
            width: 50%;
            height: .6rem;
            line-height: .6rem;
            font-size: .3rem;
            color: #E0B58A;
            text-align: center;
            background: #54362B ;
            &:first-child {
              border-radius: 6px 0  0 6px;
            }
            &:last-child {
              border-radius: 0 6px 6px 0;
            }
            &.current {
              background: #E0B58A ;
              color: #3B251D;
            }
          }
        }
      }
      .list-container {
        .list {
          padding: 0 .16rem 0 .19rem;
          box-sizing: border-box;
          .nav {
            display: flex;
            justify-content: flex-start;
            height: .57rem;
            line-height: .57rem;
            text-align: center;
            font-size: .2rem;
            color: #3B251D;
            border-bottom: 1px solid #C69E76;
            .ranking {
              text-align: left;
              width: 10%;
            }
            .nick-name {
              width: 35%;
            }
            .integral {
              width: 25%;
            }
            .price-name {
              width: 30%;
            }
          }
          ul {
            li {
              display: flex;
              justify-content: flex-start;
              height: .57rem;
              line-height: .57rem;
              text-align: center;
              font-size: .2rem;
              color: #3B251D;
              border-bottom: 1px solid #C69E76;
              .ranking {
                width: 10%;
                img {
                  margin: .095rem 0 0 0.07rem;
                  display: block;
                  width: .27rem;
                  height: .38rem;
                }
              }
              .nick-name {
                width: 35%;
              }
              .integral {
                width: 25%;
              }
              .price-name {
                width: 30%;
              }
            }
          }
        }
        .price {

        }
      }
    }
  }
}
</style>
