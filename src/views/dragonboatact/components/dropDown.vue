<template>
  <section class="dropDown" :style="{zIndex:isShowPop?100:99}">
    <div class="pop-mask" v-if="isShowPop&&tabindex" @touchmove.prevent></div>
    <transition name="scalc">
      <div class="pop" v-if="isShowPop&&tabindex">
        <div class="wrap">
          <div class="main">
            <div class="tabs">
              <div class="item" v-for="(item,index) in tabs" :class="{selected:tabIndex==index}"
                   @click="tabIndex=index">{{item}}
              </div>
            </div>
            <div class="info" v-show="tabIndex==0">当天购买需到账并及时划桨使用，才计入当天划桨距离</div>
            <div class="info" v-show="tabIndex==1">当天累计游戏支持1万金叶，可获得1米划桨距离</div>
            <div class="g-package" v-show="tabIndex==0">
              <div class="g-package-container g1">
                <ul>
                  <li v-for="(item,index) in mallBizConfigs" @click="gotopay(item)"
                      :style="{background:$moduleConfig.superLotto.dropDown.inner.packageBlockBg}">
                    <img :src="$moduleConfig.superLotto.dropDown.inner.packageImgs[index]" alt="">
                    <div class="item-text"
                         :style="{color:$moduleConfig.superLotto.dropDown.inner.packageBlockTextColor}">
                      {{item.content.split('+')[0]}}<br/>
                      <span class="content"
                            :style="{color:$moduleConfig.superLotto.dropDown.inner.packageBlockBtnBg,display: 'flex',alignItems: 'center',justifyContent: 'center'}">
                      <img src="../images/give-icon.png"
                           style="min-width:0.24rem;max-width:0.24rem;height:0.24rem;margin-bottom:0.04rem">{{item.content.split('+')[1]}}</span>
                    </div>
                    <a href="javascript:" class="btn-price"
                       :style="{background:$moduleConfig.superLotto.dropDown.inner.packageBlockBtnBg}">￥{{item.price}}</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="games" v-show="tabIndex==1">
              <img :src="item.img" v-for="item in games.slice().sort((a,b)=>a.sort-b.sort)" class="games_item"
                   @click="gotogame(item)">
            </div>
          </div>
        </div>
        <div class="close" @click="isShowPop=false"></div>
      </div>
    </transition>
  </section>
</template>
<script>
  export default {
    name: "dropDown",
    props: {
      tabindex: {
        type: Number,
        default: 0
      },
      mallBizConfigs: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
        tabs: ['超值礼包', '玩游戏获取'],
        tabIndex: 0,
        isShowPop: false,
        games: [{
          id: 12,
          url: '/crush',
          img: `${require('../images/games/0.png')}`,
          sort: 0
        }, {
          id: 2, url: '/billiards',
          img: `${require('../images/games/1.png')}`,
          sort: 3
        }, {
          id: 10, url: '/fish',
          img: `${require('../images/games/2.png')}`,
          sort: 1
        }, {
          id: 13, url: '/kingdom2',
          img: `${require('../images/games/3.png')}`,
          sort: 2
        }, {
          id: 18, url: '/square',
          img: `${require('../images/games/4.png')}`,
          sort: 5
        }, {
          id: 21, url: '/Marbles',
          img: `${require('../images/games/5.png')}`,
          sort: 6
        },
          {
            id: 26, url: '/bird',
            img: `${require('../images/games/6.png')}`,
            sort: 7
          }, {
            id: 27, url: '/crush3',
            img: `${require('../images/games/7.png')}`,
            sort: 4
          }]
      }
    },
    methods: {
      async showPop() {
        this.isShowPop = true
      },
      gotogame({url, id}) {
        GLOBALS.jumpOutsideGame(url)
      },
      gotopay(item) {
        localStorage.setItem('originDeffer', window.location.href)
        localStorage.setItem('JDD_PARAM', JSON.stringify(item))
        localStorage.setItem('payment', JSON.stringify(item))
        location.href =
          'https://wap.beeplaying.com/xmWap/#/payment/paymentlist?isBack=true'
      },
      move(e) {
        e.preventDefault()
      }
    },
    watch: {
      isShowPop(value) {
        if (value) {
          document.body.style.overflow = 'hidden';
          document.addEventListener('touchmove', this.move, {passive: false});
        } else {
          document.body.style.overflow = null;
          document.removeEventListener('touchmove', this.move, {passive: false});
        }
      },
      tabIndex(val) {
        GLOBALS.marchSetsPoint(val ? 'A_H5PT0302003623' : 'A_H5PT0302003622')
      }
    }
  }
</script>

<style lang="less" scoped>
  .dropDown {
    position: fixed;
    bottom: 0;
    width: 7.2rem;
    .pop-mask {
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.55);
    }
    .pop {
      position: relative;
      z-index: 10;
      .wrap {
        margin: 0 auto;
        box-sizing: border-box;
        .main {
          width: 7.2rem;
          height: 5.73rem;
          padding-top: .28rem;
          box-sizing: border-box;
          background: rgba(248, 130, 40, 1);
          font-size: 0.2rem;
          color: #fff;
          position: relative;
          .tabs {
            width: 4.86rem;
            height: .67rem;
            background: rgba(248, 130, 40, 1);
            border: .02rem solid rgba(255, 255, 255, 1);
            border-radius: .34rem;
            overflow: hidden;
            display: flex;
            margin: 0 auto .25rem;
            .item {
              flex: 1;
              font-size: .28rem;
              font-weight: bold;
              color: rgba(255, 255, 255, 1);
              text-align: center;
              line-height: .67rem;
              &.selected {
                background: rgba(255, 255, 255, 1);
                color: rgba(248, 130, 40, 1);
              }
            }
          }
          .info {
            font-size: .24rem;
            font-weight: bold;
            color: rgba(236, 244, 255, 1);
            text-align: center;
            margin-bottom: .1rem;
          }
          .g-package {
            width: 6.46rem;
            height: 3.07rem;
            background: rgba(255, 255, 255, 1);
            border-radius: .15rem;
            margin: .24rem auto 0;
            .g-package-container {
              background: #fff;
              margin-top: 0.19rem;
              border-radius: 0.15rem 0.15rem 0 0;
              font-size: 0;
              &.g1 {
                height: 2.94rem;
              }
              &.g2 {
                height: 2.24rem;
              }
              ul {
                display: flex;
                justify-content: center;
                padding-top: 0.21rem;
                justify-content: center;
              }
              li {
                width: 1.79rem;
                height: 2.48rem;
                text-align: center;
                position: relative;
                background: rgba(234, 181, 155, 1);
                border-radius: 0.1rem;
                margin-left: 0.26rem;
                padding-top: 0.1rem;
                box-sizing: border-box;
                &:nth-child(1) {
                  margin-left: 0;
                }
                img {
                  width: 1.28rem;
                  height: 1.26rem;
                }
              }
              .item-text {
                font-size: 0.2rem;
                color: #9a5619;
                line-height: 0.26rem;
                position: relative;
                font-weight: 500;
                .content {
                  font-weight: bold;
                  em {
                    display: inline-block;
                    font-size: 0.18rem;
                    width: 0.24rem;
                    height: 0.24rem;
                    line-height: 0.24rem;
                    text-align: center;
                    border-radius: 50%;
                    color: #fff;
                    font-style: normal;
                  }
                }
              }
              .btn-price {
                display: block;
                width: 0.96rem;
                height: 0.39rem;
                line-height: 0.39rem;
                background: #e74615;
                border-radius: 0.2rem;
                font-size: 0.24rem;
                color: #ecf4ff;
                font-weight: bold;
                text-align: center;
                position: absolute;
                bottom: 0.14rem;
                left: 0;
                right: 0;
                margin: auto;
                text-decoration: none;
              }
            }
          }
          .games {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            .games_item {
              margin-top: .24rem;
              margin-right: .4rem;
              width: 1.24rem;
              height: 1.69rem;
              flex-wrap: wrap;
              &:nth-child(4n) {
                margin-right: 0;
              }
            }
          }
        }
      }
    }
    .close {
      width: .81rem;
      height: .81rem;
      background: url("../images/expand.png");
      background-size: 100% 100%;
      position: absolute;
      right: .05rem;
      bottom: .61rem;
    }
    .scalc-enter-active {
      animation: fadeAnimation 0.3s ease-in-out;
    }
    @keyframes fadeAnimation {
      0% {
        transform: scale(0);
      }
      50% {
        transform: scale(1.2);
      }
      100% {
        transform: scale(1);
      }
    }
  }
</style>
