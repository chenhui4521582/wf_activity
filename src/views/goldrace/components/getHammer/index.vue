<template>
  <div class="get-hammer">
    <template
      v-for="(itemtitle,indextitle) in $moduleConfig.superLotto.dropDown.inner.info.titles">
      <h4 class="s-title"><em></em>{{itemtitle}}</h4>
      <template v-if="indextitle==0">
        <!--actInfoData.bettingRate|filterPrice-->
        <span class="info"><i>累计消耗5万 <img src="../../img/leaf.png" alt="" style="width: .46rem;height: .46rem"> =1<img src="../../img/cup.png" style="width: .28rem;height: .3rem"></i>{{$moduleConfig.superLotto.dropDown.inner.info.sideTitle}}<br></span>
        <div class="g-package">
          <div class="g-package-container g1" style="height: 4rem;">
            <div class="gamelist">
              <img :src="require(`../../img/compop/games/game${index}.png`)" alt=""
                   v-for="(item,index) in games" class="game" @click="gotogame(item)">
            </div>
          </div>
          <div class="g-package-info">
            <ul class="li0">
              <!--{{actInfoData.todayGameAmount}}-->
              <li>当前赛次累计获得奖杯：{{actInfoData.userInfo.gameNum}}</li>
            </ul>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="g-package">
          <div class="g-package-container g1">
            <ul>
              <li v-for="(item,index) in mallBizConfigs.slice(0,6)" @click="gotopay(item)">
                <div class="div-container">
                  <img src="../../img/package.png" alt="">
                  <div class="item-text">
                    {{item.content.split('+')[0]}}<br/>+{{item.content.split('+')[1]}}
                  </div>
                </div>
                <a href="javascript:" class="btn-price">￥{{item.price}}</a>
              </li>
            </ul>
          </div>
          <div class="g-package-info">
            <ul class="li0">
              <!--{{actInfoData.todayBagAmount}}-->
              <li>当前赛次累计获得奖杯：{{actInfoData.userInfo.bagNum}}</li>
            </ul>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>
<script type="text/javascript">
  import {showLeaguePacksList} from '../../services/api'

  export default {
    data () {
      return {
        mallBizConfigs: [],
        pUserInfo: {},
        popType: 0,
        awardData: null,
        games: [{
          id: 12,
          url: '/crush'
        }, {
          id: 10, url: '/fish'
        }, {
          id: 30, url: '/boom'
        }, {
          id: 13, url: '/kingdom2'
        }, {
          id: 2, url: '/billiards'
        }, {
          id: 18, url: '/square'
        }, {
          id: 21, url: '/Marbles'
        }, {
          id: 27, url: '/crush3'
        }]
      }
    },
    props: {
      countTime: {
        type: Number,
        default: 0
      },
      actInfoData: {
        type: Object,
        default: null
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
      this.getShowLeaguePacksList()
    },
    methods: {
      gotogame (item) {
        GLOBALS.jumpOutsideGame(item.url)
      },
      gotopay (item) {
        localStorage.setItem('originDeffer', window.location.href)
        localStorage.setItem('JDD_PARAM', JSON.stringify(item))
        localStorage.setItem('payment', JSON.stringify(item))
        location.href =
          'https://wap.beeplaying.com/xmWap/#/payment/paymentlist?isBack=true'
      },
      async getShowLeaguePacksList () {
        const {code, data} = await showLeaguePacksList()
        if (code == 200) {
          this.mallBizConfigs = data.mallBizConfigs
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  i{
    font-style: normal;
  }
  .get-hammer {
    padding: 0 0.38rem;
    height: calc(85%);
    width: 100%;
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    top: 1.5rem;
    bottom: 0;
    overflow-y: scroll;
    .s-title {
      font-size: 0.24rem;
      font-weight:bold;
      color:#D4D3FF;
      display: flex;
      align-items: center;
      margin-bottom: 0.12rem;
      font-style: normal;
      em {
        display: inline-block;
        width: 0.12rem;
        height: 0.12rem;
        background: #D4D3FF;
        border-radius: 50%;
        margin-right: 0.05rem;
      }
    }
    .info {
      font-size: 0.24rem;
      font-weight: 400;
      color:#D4D3FF;
      line-height: 0.28rem;
      font-style: normal;
      i{
        margin-bottom: .17rem;
        display:flex;
        align-items: center;
      }
    }
  }

  .g-package {
    width: 100%;
    /*background: #73380c;*/
    margin-bottom: 0.2rem;
    border-radius: 0.15rem;
    .g-package-container {
      /*background: #54B2E7;*/
      margin-top: 0.19rem;
      border-radius: 0.15rem .15rem 0 0;
      font-size: 0;
      &.g2 {
        height: 2.4rem;
      }
      ul {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
      }
      li {
        width: 1.8rem;
        height: 2.48rem;
        text-align: center;
        position: relative;
        padding-top: 0.1rem;
        box-sizing: border-box;
        margin-bottom: .35rem;
        img {
          width: 1.07rem;
          height: 1.05rem;
        }
        .div-container{
          background: #0A0A37;
          border-radius: 0.16rem;
          height: 1.8rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: .17rem 0 0;
          box-sizing: border-box;
        }
      }
      .item-text {
        width: 100%;
        font-size: 0.22rem;
        color: #D4D3FF;
        line-height: .26rem;
        position: relative;
        font-weight: 500;
        height: .57rem;
        background: #5956C3;
        border-radius: 0 0 .16rem .16rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .btn-price {
        display: block;
        width: 1.2rem;
        height:.52rem;
        line-height: 0.52rem;
        background: linear-gradient(0deg, #FEEB4B, #FFC257);
        border-radius: 0.26rem;
        font-size: 0.22rem;
        font-weight: bold;
        color: #AD0900;
        text-align: center;
        position: absolute;
        bottom: -0.14rem;
        left: 0;
        right: 0;
        margin: auto;
        text-decoration: none;
      }
    }
  }

  .g-package-info {
    ul {
      display: flex;
      align-items: center;
      height: 0.66rem;
      text-align: left;
      li {
        position: relative;
        font-size: 0.24rem;
        font-weight: 400;
        color: #D4D3FF;
        flex: 1;
        text-align: left;
      }
    }
  }
  .gamelist {
    display: flex;
    flex-wrap: wrap;
    height: 3.9rem;
    justify-content: space-between;
    padding: .18rem 0.2rem;
    .game {
      width: 1.24rem;
      height: 1.69rem;
    }
  }
  .task_container {
    height: 1.06rem;
    background: #fff;
    box-shadow: 0px 5px 9px 0px rgba(79, 33, 26, 0.13);
    border-radius: 0.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.32rem;
    padding: 0 0.3rem;
    box-sizing: border-box;
    .item {
      font-size: 0.3rem;
      p {
        font-weight: bold;
        color: #666;
        i {
          margin-top: 0.13rem;
          font-size: 0.2rem;
          color: #f2374a;
          display: block;
        }
      }
      .btn {
        font-size: 0.24rem;
        width: 1rem;
        height: 0.46rem;
        line-height: 0.46rem;
        text-align: center;
        border-radius: 0.23rem;
        color: rgba(255, 255, 255, 1);
        font-weight: bold;
        &.btn_complete {
          background: #f89f2c;
        }
        &.btn-receive {
          background: #ff4330;
        }
        &.btn-gained {
          background: #979797;
        }
      }
      .btn_progress {
        line-height: 0.3rem;
        font-size: 0.2rem;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        text-align: center;
      }
    }
  }
</style>
