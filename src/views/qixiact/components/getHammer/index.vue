<template>
  <div class="get-hammer">
    <template
      v-for="(itemtitle,indextitle) in $moduleConfig.superLotto.dropDown.inner.info.titles">
      <h4 class="s-title"><em></em>{{itemtitle}}</h4>
      <template v-if="indextitle==0">
        <span class="info">{{$moduleConfig.superLotto.dropDown.inner.info.sideTitle}}<br><i>累计消耗{{actInfoData.bettingRate|filterPrice}}金叶=1米助力值</i></span>
        <div class="g-package"
             :style="{background:$moduleConfig.superLotto.dropDown.inner.tabs.btnDefaultStyle.background}">
          <div class="g-package-container g1" style="height: 4rem;">
            <div class="gamelist">
              <img :src="require(`../../images/comPop/games/${index}.png`)" alt=""
                   v-for="(item,index) in games" class="game" @click="gotogame(item)">
            </div>
          </div>
          <div class="g-package-info">
            <ul class="li0">
              <li>今日获得助力值（米）：{{actInfoData.todayGameAmount}}</li>
            </ul>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="g-package"
             :style="{background:$moduleConfig.superLotto.dropDown.inner.tabs.btnDefaultStyle.background}">
          <div class="g-package-container g1">
            <ul>
              <li v-for="(item,index) in mallBizConfigs.slice(0,3)" @click="gotopay(item)"
                  :style="{background:$moduleConfig.superLotto.dropDown.inner.packageBlockBg}">
                <img :src="$moduleConfig.superLotto.dropDown.inner.packageImgs[index]" alt="">
                <div class="item-text"
                     :style="{color:$moduleConfig.superLotto.dropDown.inner.packageBlockTextColor}">
                  {{item.content.split('+')[0]}}<br/>
                  <span class="content"
                        :style="{color:$moduleConfig.superLotto.dropDown.inner.packageBlockBtnBg,display: 'flex',alignItems: 'center',justifyContent: 'center'}">
                      <img src="../../images/give-icon.png"
                           style="min-width:0.24rem;max-width:0.24rem;height:0.24rem;margin-bottom:0.04rem">{{item.content.split('+')[1]}}</span>
                </div>
                <a href="javascript:" class="btn-price"
                   :style="{background:$moduleConfig.superLotto.dropDown.inner.packageBlockBtnBg}">￥{{item.price}}</a>
              </li>
            </ul>
          </div>
          <div class="g-package-info">
            <ul class="li0">
              <li>今日获得助力值（米）：{{actInfoData.todayBagAmount}}</li>
            </ul>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>
<script type="text/javascript">
  import {showLeaguePacksList} from '../../utils/api'

  export default {
    data() {
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
        },{
          id: 30, url: '/boom'
        }, {
          id: 13, url: '/kingdom2'
        }, {
          id: 2, url: '/billiards'
        }, {
          id: 18, url: '/square'
        },{
          id: 21, url: '/Marbles',
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
      conversion(value) {
        if (value >= 10000) {
          return `${Math.floor(value / 1000) / 10}万`
        } else {
          return value || 0
        }
      }
    },
    mounted() {
      this.getShowLeaguePacksList(this.actInfoData.bagBatchId)
    },
    methods: {
      gotogame(item) {
        GLOBALS.jumpOutsideGame(item.url)
      },
      gotopay(item) {
        localStorage.setItem('originDeffer', window.location.href)
        localStorage.setItem('JDD_PARAM', JSON.stringify(item))
        localStorage.setItem('payment', JSON.stringify(item))
        location.href =
          'https://wap.beeplaying.com/xmWap/#/payment/paymentlist?isBack=true'
      },
      async getShowLeaguePacksList() {
        const {code, data} = await showLeaguePacksList(this.actInfoData.bagBatchId)
        if (code === 200) {
          this.mallBizConfigs = data.mallBizConfigs
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .get-hammer {
    padding: 1rem 0.38rem 0;
    height: calc(100%);
    width: 100%;
    box-sizing: border-box;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    overflow-y: scroll;
    .s-title {
      font-size: 0.26rem;
      font-weight:bold;
      color:rgba(255,255,255,1);
      display: flex;
      align-items: center;
      margin-bottom: 0.12rem;
      em {
        display: inline-block;
        width: 0.12rem;
        height: 0.12rem;
        background: rgba(255,255,255,1);
        border-radius: 50%;
        margin-right: 0.05rem;
      }
    }
    .info {
      font-size: 0.2rem;
      font-weight: 400;
      color:rgba(130,205,249,1);
      padding-left: 0.17rem;
      line-height: 0.28rem;
      i{
        color:rgba(255,255,255,1);
      }
    }
  }

  .g-package {
    width: 100%;
    background: #73380c;
    margin-bottom: 0.2rem;
    border-radius: 0.15rem;
    .g-package-container {
      background: #54B2E7;
      margin-top: 0.19rem;
      border-radius: 0.15rem .15rem 0 0;
      font-size: 0;
      &.g1 {
        height: 2.94rem;
      }
      &.g2 {
        height: 2.4rem;
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

  .g-package-info {
    ul {
      display: flex;
      align-items: center;
      height: 0.66rem;
      text-align: left;
      li {
        position: relative;
        font-size: 0.3rem;
        font-weight:400;
        color:rgba(255,255,255,1);
        flex: 1;
        text-align: center;
      }
    }
  }
  .gamelist {
    display: flex;
    flex-wrap: wrap;
    height: 3.9rem;
    justify-content: space-between;
    padding: .18rem 0.3rem;
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
