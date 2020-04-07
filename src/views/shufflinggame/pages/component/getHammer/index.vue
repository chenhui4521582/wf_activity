<template>
  <div class="get-hammer">
    <div class="s-title">
      <em></em>购买礼包得翻牌点
    </div>
    <span class="info">礼包可不限次购买，重复获取翻牌点</span>
    <div class="g-package">
      <div class="g-package-container g1">
        <ul>
          <li v-for="(item,index) in leaguePacksListArr" @click="gotopay(item)">
            <!-- 礼包右上角标签 -->
            <div class="package-tag">赠{{parseFloat(item.content.split('+')[1])}}翻牌点</div>
            <img
              :src="`${require(`../../../images/bottom/package${index+1}.png`)}`"
              alt
              class="img"
            />
            <span class="item-text">
              {{item.content.split('+')[0]}}
              <br />
              +{{item.content.split('+')[1]}}
            </span>
            <a href="javascript:" class="btn-price">￥{{item.price}}</a>
          </li>
        </ul>
      </div>
      <div class="g-package-info">
        <ul>
          <li>已购买礼包：{{pUserInfo.rechargeTime}}次</li>
          <li>累计翻牌点：{{pUserInfo.rechargeReturnNum}}点</li>
        </ul>
      </div>
    </div>
    <h4 class="s-title">
      <em></em>玩游戏获得翻牌点
    </h4>
    <span class="info">活动期间在游戏中累计支持金叶子达到一定值即可获得翻牌点</span>
    <div class="g-package">
      <div class="g-package-container g2">
        <hit-percent :detail-data="pUserInfo" @refresh="getUserInfo" @gotoplay="gotoplay"></hit-percent>
      </div>
      <div class="g-package-info">
        <ul>
          <li>已支持金叶：{{pUserInfo.gameBetting | filterPrice}}</li>
          <li>获得翻牌点：{{pUserInfo.gameReturnNum }}点</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { showLeaguePacksList, userInfo } from "../../../utils/api";

export default {
  data() {
    return {
      leaguePacksListArr: []
    };
  },
  props: {
    pUserInfo: {
      type: Object,
      default: null
    }
  },
  computed: {
    channel() {
      return localStorage.getItem("APP_CHANNEL") || "";
    }
  },
  components: {
    hitPercent: () => import("./component/hitPercent/hitPercent.vue")
  },
  mounted() {
    this.getShowLeaguePacksList();
  },
  filters: {
    filterPrice: function(value) {
      if (value) {
        return value > 10000 ? value / 10000 + "万" : value;
      } else {
        return 0;
      }
    }
  },
  methods: {
    gotopay(item) {
      localStorage.setItem("originDeffer", window.location.href);
      GLOBALS.marchSetsPoint("A_H5PT0156001776", {
        recharge_rmb: item.price,
        product_id: item.bizId
      }); // H5平台-翻牌活动-底部弹窗-礼包点击
      localStorage.setItem("JDD_PARAM", JSON.stringify(item));
      localStorage.setItem("payment", JSON.stringify(item));
      location.href =
        "https://wap.beeplaying.com/xmWap/#/payment/paymentlist?isBack=true";
    },
    async getShowLeaguePacksList() {
      const { code, data } = await showLeaguePacksList();
      if (code === 200) {
        this.leaguePacksListArr = data.leaguePacksList;
      }
    },
    async getUserInfo() {
      this.$emit("getUserInfo");
    },
    isGoBDPayment() {
      return window.linkUrl.getBackUrlFlag(this.channel) == "bdWap";
    },
    gotoplay() {
      this.$emit("gotoplay");
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../../../common/css/base.css";
.get-hammer {
  padding: 0 0.38rem 0;
  width: 100%;
  box-sizing: border-box;
  position: absolute;
  left: 0;
  top: 0.8rem;
  bottom: 0;
  overflow-y: scroll;
  // background: url("../../../images/bottom/bg1.png");
  background-color: #a60533;
  background-size: 100% 1.03rem;
  .s-title {
    font-size: 0.24rem;

    display: flex;
    align-items: center;
    margin-bottom: 0.12rem;
    font-weight: bold;
    margin-top: 0.2rem;

    color: rgba(250, 224, 227, 1);
    em {
      display: inline-block;
      width: 0.12rem;
      height: 0.12rem;
      border-radius: 50%;
      background: rgba(250, 224, 227, 1);
      margin-right: 0.05rem;
    }
  }
  .info {
    font-size: 0.2rem;
    font-weight: 400;
    padding-left: 0.17rem;
    line-height: 0.28rem;

    color: rgba(250, 224, 227, 1);
  }
}

.g-package {
  width: 100%;
  background: #f5c996;
  border-radius: 0.15rem;
  margin-top: 0.13rem;
  .g-package-container {
    background: #ffffff;
    border-radius: 0.15rem 0.15rem 0 0;
    &.g1 {
      height: 2.94rem;
      .package-tag {
        background: url(../../../images/bottom/package-tag.png) no-repeat;
        background-size: 100% 100%;
        width: 1.5rem;
        height: 0.3rem;
        position: absolute;
        top: 0;
        right: 0;
  text-align: center;
  line-height: 0.3rem;
        font-size: 0.2rem;
        font-family: PingFang SC;
        font-weight: 800;
        color: rgba(255, 241, 203, 1);
        z-index: 2;
      }
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
      background: rgba(245, 201, 150, 1);
      border-radius: 0.1rem;
      &:nth-child(2) {
        margin: 0 0.26rem;
      }
    }
    .img {
      width: 1.35rem;
      height: 1.14rem;
      position: relative;
      top: 0.2rem;
    }
    .item-text {
      font-size: 0.2rem;
      color: #9a5619;
      line-height: 0.26rem;
      position: absolute;
      top: 1.38rem;
      left: 50%;
      transform: translateX(-50%);
      width: 100%;
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
      margin: 0 auto;
      position: absolute;
      bottom: 0.1rem;
      left: 50%;
      margin-left: -0.48rem;
    }
  }
  .g-package-info {
    ul {
      list-style: none;
      margin: 0;
      display: flex;
      align-items: center;
      height: 0.52rem;
      text-align: left;
      li {
        flex: 1;
        height: 0.52rem;
        line-height: 0.52rem;
        position: relative;
        font-size: 0.24rem;
        color: #7c2244;
        text-indent: 0.27rem;
        &:nth-child(1):before {
          content: "";
          width: 1px;
          height: 0.33rem;
          background: rgba(178, 112, 20, 1);
          position: absolute;
          right: 0;
          top: 0.1rem;
        }
      }
    }
  }
}
</style>
