<template>
  <div class="exchange-prize">
    <my-seal 
      :userInfo="userInfo" 
      :currentIndex="2" 
      @openAwardLog="openAwardLog"
    />
    <div class="prize-list" >
      <div class="item" v-for="(item, index) in awardsList" :key="index" @click="_exchange(item.sort)">
        <div class="item-img">
          <img class="" :src="AwardsImg[item.awardsTypeStr]" alt="">
        </div>
        <div class="item-name">{{item.awardsName}}</div>
        <div class="exchange-num">
          <div class="icon">
            <img src="../img/seal-icon.png" alt="">
          </div>
          x{{item.consumePropNum}}
        </div>
        <div class="btn"></div>
      </div>
    </div>
  </div>
</template>
<script>
import MySeal from './mySeal'
import Services from '../services/services'
import _get from 'lodash.get'
export default {
  name: 'exchangePrize',
  props: {
    userInfo: {
      type: Object,
      default: () => {}
    },
    awardsList: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    prizeList: [],
    AwardsImg: {
      jyz: require('../img/leaf-icon.png'),
      hfq: require('../img/hf-icon.png'),
      jdk: require('../img/jd-icon.png'),
      yhq: require('../img/copon-icon.png')
    }
  }),
  components: {
    MySeal
  },
  methods: {
    openAwardLog() {

    },
    /** 兑换 **/
    _exchange (sort) {
      Services.exchange(sort).then(res => {
        
      })
    }

  }
}
</script>
<style lang="less" scoped>
.exchange-prize {
  padding: 0 .3rem;
  background: url(../img/content2-bg.png) no-repeat center top;
  background-size: 100% auto;
  .prize-list {
    padding: 2.05rem .15rem 0;
    height: 7.2rem;
    .item {
      position: relative;
      float: left;
      width: 1.57rem;
      height: 2.42rem;
      .item-img {
        position: absolute;
        width: 1.57rem;
        height: 1.32rem;
        background: url(../img/award-bg.png) no-repeat center top;
        background-size: 100% 100%;
        img {
          position: absolute;
          left: .19rem;
          top: -.05rem;
          display: block;
          width: 1.18rem;
          height: 1.18rem;
          &.coupon {
            margin: -.13rem auto 0;
          }
        }
      }
      .item-name {
        position: absolute;
        top: .88rem;
        left: 0;
        width: 100%;
        height: .36rem;
        text-align: center;
        font-size: .2rem;
        color: #fff;
      }
      .exchange-num {
        position: absolute;
        top: 1.23rem;
        left: 0;
        width: 100%;
        height: .48rem;
        background: url(../img/exchange-num.png) no-repeat center center;
        background-size: 1.31rem .48rem;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        .icon {
          margin-right: .06rem;
          width: .26rem;
          height: .22rem;
          img {
            vertical-align: top;
            width: 100%;
            height: 100%;
          }
        }
        color: #FFEF51;
      }
      .btn {
        position: absolute;
        top: 1.58rem;
        left: .05rem;
        width: 1.49rem;
        height: .84rem;
        background: url(../img/exchange-btn.png) no-repeat center center;
        background-size: 100% 100%;
      }
    }
  }
}
</style>