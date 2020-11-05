<template>
  <div class="valuepackages" v-if="actInfo&&actInfo.state==1">
    <p class="back" @click="back">返回</p>
    <p class="rule" @click="showRule">规则</p>
    <div class="container">
      <div class="item" v-for="(item,index) in packages" @click="gotopay(item)">
        <p class="desc" v-html="'加赠'+item.content"></p>
        <div class="middle">
          <div class="icon-wrapper">
            <img :src="item.productIcon|filter" alt="">
          </div>
          <div>
            <p class="name">
              {{item.amount|amountFilter}}
            </p>
            <p class="old-price">
              原价：<span>￥{{item.originPrice}}</span>
            </p>
          </div>
        </div>
        <template
          v-if="actInfo.needGiftSet&&actInfo.needGiftSet.length&&actInfo.needGiftSet.includes(index+1)">
          <div class="btn blue" @click.stop="download">
            下载APP,领取加赠
          </div>
        </template>
        <template v-else>
          <div class="btn orange">
            ￥{{item.price}}
          </div>
        </template>
      </div>
    </div>
    <div class="footer">
      <template v-if="actInfo.type===1">
        <p class="ddw-text">更多超值优惠，尽在多多玩APP</p>
        <div class="download" @click="download"></div>
      </template>
      <p>
        多多玩APP由多多玩官方提供，<br />
        如有问题咨询多多玩官方客服微信：<span>youxikefu2020</span>
      </p>
    </div>
    <Modal v-model="isShowModal"></Modal>
    <awards-dialog v-model="isShowPop" tips-txt="恭喜获得多多玩APP充值加赠" @callback="closePop"
      confirmBtnText="继续购买">
      <div class="awards-content">
        <p>
          所有加赠奖品已到账：
        </p>
        <ul class="awards-list">
          <template v-for="item in awardsList">
            <li :key="item" v-if="awardsInfo[item+'Amount']>0">
              <div class="img-wrapper">
                <img :src="require(`./images/${item}.png`)" alt="">
              </div>
              <p>{{item|nameFilter(awardsInfo)}}</p>
            </li>
          </template>
        </ul>
      </div>
    </awards-dialog>
    <rule v-if="isShowRule" :actInfo="actInfo" @close="isShowRule=false"></rule>
  </div>
</template>
<script>
import { getActInfo, getPackages } from './utils/api'

export default {
  data () {
    return {
      actInfo: null,
      packages: [],
      isShowRule: false,
      isShowModal: false,
      isShowPop: false,
      awardsList: ['hfq', 'jdk', 'jyz'],
      awardsInfo: {
        hfqAmount: 0,
        jdkAmount: 0,
        jyzAmount: 0,
        popup: false
      }
    }
  },
  components: {
    rule: () => import('./components/rule'),
    Modal: () => import('./components/modal'),
    awardsDialog: () => import('@/components/awardsDialog/awardsDialog.vue')
  },
  filters: {
    amountFilter (value) {
      if (value > 10000) {
        return value / 10000 + '万金叶子'
      }
      return value + '金叶子'
    },
    nameFilter (value, info) {
      let type = ''
      switch (value) {
        case 'hfq':
          type = '元话费券'
          break
        case 'jdk':
          type = '元京东券'
          break
        case 'jyz':
          type = '金叶'
          break

        default:
          break
      }
      if (info[value + 'Amount'] > 10000) {
        return info[value + 'Amount'] / 10000 + type
      }
      return info[value + 'Amount'] + type
    }
  },
  methods: {
    back () {
      GLOBALS.marchSetsPoint('A_H5PT0295003519')
      location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL')) + '&time=' + new Date().getTime()
    },
    showRule () {
      GLOBALS.marchSetsPoint('A_H5PT0295003520')
      this.isShowRule = true
    },
    getBackground (item) {
      return `${item.productIcon.includes('//') ? item.productIcon : '//file.beeplaying.com' + item.productIcon}`
    },
    async getActInfo () {
      let { code, data } = await getActInfo()
      if (code == 200) {
        this.actInfo = data
        if (data.state == 1) {
          this.getPackages()
        }
        if (data.needGiftSet && data.needGiftSet.length) {
          this.isShowModal = true
        }
        if (data.popupInfo && data.popupInfo.popup) {
          this.isShowPop = true
          this.awardsInfo = data.popupInfo
        }
      }
    },
    async getPackages () {
      let { code, data } = await getPackages()
      if (code === 200) {
        this.packages = data.mallBizConfigs
      }
    },
    gotopay (item) {
      localStorage.setItem('originDeffer', window.location.href)
      GLOBALS.marchSetsPoint('A_H5PT0295003518', { product_price: item.price, product_id: item.productId, product_name: item.name })
      localStorage.setItem('JDD_PARAM', JSON.stringify(item))
      localStorage.setItem('payment', JSON.stringify(item))
      location.href =
        'https://wap.beeplaying.com/xmWap/#/payment/paymentlist?isBack=true'
    },
    download () {
      this.isShowModal = true
    },
    closePop () {
      this.isShowPop = false
    }
  },
  mounted () {
    this.getActInfo()
    GLOBALS.marchSetsPoint('P_H5PT0295', {
      source_address: GLOBALS.getUrlParam('from') || ''
    })
  }
}
</script>
<style lang="less">
@import '../../common/css/base.css';

.valuepackages {
  min-height: 100vh;
  position: relative;
  background: #fc685c;
  padding-top: 2.3rem;
  padding-bottom: 0.6rem;
  box-sizing: border-box;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    width: 100%;
    height: 3.88rem;
    background: url('./images/top.png');
    background-size: 100% 100%;
  }
  .back,
  .rule {
    position: absolute;
    top: 0.3rem;
    width: 0.8rem;
    height: 0.4rem;
    background: #7182ff;
    color: #fff;
    text-align: center;
    line-height: 0.4rem;
    font-size: 0.22rem;
  }
  .back {
    left: 0;
    border-radius: 0 0.2rem 0.2rem 0;
  }
  .rule {
    right: 0;
    border-radius: 0.2rem 0 0 0.2rem;
  }
  .container {
    position: relative;
    left: 0;
    right: 0;
    margin: auto;
    width: 6.72rem;
    background: #fff;
    padding: 0.2rem 0.26rem;
    box-sizing: border-box;
    box-shadow: 0.02rem 0.05rem 0.05rem 0 rgba(149, 11, 0, 0.29);
    border-radius: 0.46rem;
    .item {
      display: inline-block;
      width: 3rem;
      height: 2.4rem;
      background: #fff8f7;
      border: 1px solid #f16d59;
      border-radius: 0.26rem;
      box-sizing: border-box;
      margin-top: 0.2rem;
      &:nth-child(2n + 1) {
        margin-right: 0.2rem;
      }
      .desc {
        width: 2.72rem;
        height: 0.34rem;
        line-height: 0.32rem;
        text-align: center;
        font-size: 0.2rem;
        color: #fff;
        background: url(./images/desc-bg.png) no-repeat;
        background-size: 100% 100%;
        margin: auto;
        font-weight: bold;
        span {
          color: #ffeb85;
        }
      }
      .middle {
        display: flex;
        align-items: center;
        margin-top: 0.14rem;
        .icon-wrapper {
          width: 1.18rem;
          height: 1.08rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .name {
          color: #fa3727;
          font-size: 0.26rem;
          font-weight: bold;
          line-height: 0.32rem;
        }
        .old-price {
          color: #aaa;
          font-size: 0.22rem;
          line-height: 0.32rem;
          span {
            text-decoration: line-through;
          }
        }
      }
      .btn {
        width: 2.58rem;
        height: 0.7rem;
        line-height: 0.7rem;
        text-align: center;
        margin: auto;
        font-size: 0.24rem;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        &.blue {
          background-image: url('./images/blue-btn-bg.png');
          color: #0c6871;
        }
        &.orange {
          background-image: url('./images/orange-btn-bg.png');
          color: #ff4200;
          font-weight: bold;
        }
      }
    }
  }
  .footer {
    text-align: center;
    color: #8d0b01;
    font-size: 0.2rem;
    margin-top: 0.22rem;
    span {
      color: #fee95a;
    }
    .ddw-text {
      color: #ffd31f;
      font-size: 0.3rem;
    }
    .download {
      width: 2.58rem;
      height: 0.78rem;
      background-image: url(./images/ddw-download.png);
      background-repeat: no-repeat;
      background-size: 100% 100%;
      margin: 0.26rem auto 0.44rem;
    }
  }

  .awards-content {
    text-align: center;
    p {
      color: #000;
      font-size: 0.24rem;
      margin: 0.16rem;
    }
    .awards-list {
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 0 0.3rem;
      li {
        p {
          color: #ff4141;
          font-size: 0.22rem;
          white-space: nowrap;
        }
        .img-wrapper {
          width: 1.2rem;
          height: 1.2rem;
          border: 0.01rem solid #eee;
          border-radius: 0.21rem;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            max-width: 100%;
          }
        }
      }
    }
  }
}
</style>
