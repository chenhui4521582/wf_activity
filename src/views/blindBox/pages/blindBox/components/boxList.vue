<template>
  <section class="box-list-wrapper">
    <section class="box-list-container activity">
      <ul class="box-list"
        :class="{ 'all-has-shelf': isRefresh }"
        v-for="(items, key) in boxList"
        :key="'list' + key"
        :style="{ zIndex: 3 - key }">
        <li class="box-item"
          v-for="(item, index) in items"
          :key="'item' + index"
          :class="{ 'shake-rotate': hasShake(item.state) }"
          @click="toDetail(item)">
          <box-info :class="{ 'has-shelf': hasShelf(item) }"
            :info="item"></box-info>
          <div class="old-box-image box-drop"
            v-if="item.state === 3">
            <img :src="item.extend.oldColor | boxImage(item.state)"
              alt="" />
            <div class="awards-info">
              <p class="other-people">用户{{ item.extend.nickname }}正在购买</p>
            </div>
          </div>
        </li>
      </ul>
    </section>
    <article class="botton-wrapper">
      <!-- 非年货节按钮 begin-->
      <section class="handler activity">
        <div class="change-btn activity"
          @click="showRule">
          <!-- <img class="icon"
            src="../assets/rule.png"
            alt=""> -->
          <img class="icon"
            src="../activity/rule.png"
            alt="">
          活动规则
        </div>
        <div class="change-btn activity"
          @click="changeAll">
          <!-- <img class="icon"
            src="../assets/refresh.png"
            alt=""> -->
          <img class="icon"
            src="../activity/refresh.png"
            alt="">
          换一批
        </div>
      </section>
      <section class="btn-container">
        <img v-if="isCouponTip"
          class="coupon-tip"
          src="../assets/tip.png"
          alt="">
        <!-- <m-button @confirm="buyOne">{{
          isOpenBox ? `立即开盒` : "20元开一盒"
        }}<span v-if="isOpenBox"
            class="times">(<span>{{isOpenBox}}</span>次)</span></m-button> -->
        <div v-if="isOpenBox"
          class="activity-button"
          @click="buyOne">
          <p>立即开盒<span class="times activity">(<span>{{isOpenBox}}</span>次)</span></p>
        </div>
        <img @click="buyOne"
          v-if="!isOpenBox"
          src="../activity/button1.png"
          alt="">
        <img @click="buyTwo"
          v-if="!isOpenBox"
          src="../activity/button2.png"
          alt="">
        <img @click="bulkBuy"
          v-if="!isOpenBox"
          src="../activity/button3.png"
          alt="">
        <!-- <div v-if="!isOpenBox" class="button button1">
          20元开1盒
        </div>
        <div v-if="!isOpenBox" class="button button2">
          38元开2盒
        </div>
        <div v-if="!isOpenBox" class="button">
          55元开3盒
        </div> -->
      </section>
      <p class="leaf-buy activity"
        v-if="userInfo && userInfo.leafsPay"
        @click="leafsBuy">使用金叶子购买</p>
      <p class="buy-tip activity">购买成功后，即可任意选盒开奖</p>
      <!-- 非年货节按钮 end -->
    </article>
    <Dialog :show="isShowRule"
      title="活动规则"
      :close="true"
      @onClose="closeRule()">
      <p class="rule-content">
        1.盲盒规则：用户支付20元后可选择任意一个盲盒，打开盲盒即可获得惊喜奖品，购买盲盒可100%开出奖品，奖品价值15元到5499元不等。<span @click="viewGift"
          class="view-gift">点击查看全部奖品></span><br>
        2.透视卡规则：选择一个盲盒，支付5元获得一张透视卡，可查看该盲盒内是否是您想要的奖品。如果被查看的盲盒内是您想要的奖品，您可支付20元购买该盲盒并获得奖品；如果被查看的盲盒内不是您想要的奖品，您可放弃购买，但已支付的透视卡5元不予退还。<br>
        3.领取奖品方式：用户从盲盒中获得的奖品可在【我的奖品】中领取，请您填写真实的收货人及收货信息。<br>
        4.奖品领取成功后我们会在1-2个工作日内为您安排发货，如有疑问可联系在线客服（【我的】-【联系客服】）。受疫情影响，部分疫情严重地区的物流会受影响，请您耐心等待。<br>
        5.活动中的奖品图片仅供参考，请以具体实物为准。所有奖品均由正规第三方提供（即商品生产和销售商家）。<br>
        6.请您收到奖品后，及时检查获得奖品是否有问题、外观是否完好等。收到的奖品如非质量、运输损坏问题，不支持换货或退款。如若奖品质量存在问题，请通过在线客服尽快与我们反馈，收货后2日内无反馈，视为您已确认奖品无误。<br>
        7.非因奖品质量存在问题，您完成盲盒购买后概不支持退款哦。<br>
        8.盲盒购买金额不计入多多玩游戏平台的累充活动。<br>
        9.如出现不可抗力或情势变更的情况(包括但不限于重大灾害事件、活动受政府机关指令需要停止举办或调整的、活动遭受严重网络攻击或因系统故障需要暂停举办的),则多多玩可依相关法律法规的规定主张免责。<br>
        10.多多玩提醒您注意以上活动规则，参与活动即视为您已阅读并认可本活动规则，理解并愿意接受本活动规则的约束。<br>
        11.在法律允许范围内，多多玩对本次活动享有解释权。
      </p>
      <section class="rule-btn-wrapper"
        slot="footer">
        <div class="confirm"
          @click="closeRule()">
          我知道了
        </div>
      </section>
    </Dialog>
    <Dialog :show="isShowPop"
      title="支付完成"
      :close="true"
      @onClose="closePop()">
      <p class="pop-content">
        您已付款成功，选一个盲盒吧
      </p>
      <section class="pop-btn-wrapper"
        slot="footer">
        <div class="confirm"
          @click="closePop(1)">
          好的
        </div>
        <div class="cancel"
          @click="closePop(2)">
          不选了，随机开一个
        </div>
      </section>
    </Dialog>
    <TipDialog v-if="showTip"
      source="index"
      :show="showTip"
      @close="showTip=false" />
    <VirtualDialog :show="isVirtual"
      v-if="isVirtual"
      source="index"
      @close="isVirtual = false"
      @updateUserInfo="getUserInfo" />
  </section>
</template>

<script>
/* eslint-disable no-undef */
import { BoxList, ChangeAll, PayPoint } from '../../../apis/box';
import { UserInfo, Popup } from '../../../apis/user';
import { Pay } from '../../../utils';
import Dialog from '../../../components/dialog';
import BoxInfo from './boxInfo';
import { boxGroup } from '../../../config/box';
import TipDialog from './tip-dialog'
import VirtualDialog from '../../../components/virtual-dialog'
import { List } from '../../../apis/coupon'

export default {
  name: '',
  components: {
    Dialog,
    BoxInfo,
    TipDialog,
    VirtualDialog
  },
  data () {
    return {
      buttonStyle: {
        background: 'linear-gradient(90deg,#A3A9C0,#646B84)',
        color: '#fff',
        fontSize: '0.34rem',
        marginTop: '0.2rem'
      },
      isVirtual: false,
      isShowRule: false,
      // 用户当天是否第一次进入页面
      isFirstIn: true,
      showTip: false,
      isChange: false,
      box: [],
      userInfo: {},
      isShowPop: false,
      isShake: false,
      isHasShelf: false,
      isRefresh: false,
      refreshTimer: null,
      boxTimer: null,
      isCouponTip: false
    }
  },
  filters: {
    boxImage (color, state) {
      let type = '';
      switch (state) {
        case 4:
          type = 'boxTransparent';
          break
        default:
          type = 'box';
          break
      }
      let index = boxGroup.findIndex(res => res.type === Number(color))
      return boxGroup[index][type]
    }
  },
  computed: {
    // 是否可以开盒
    isOpenBox () {
      return this.userInfo.openBoxTimes
    },
    boxList () {
      let len = this.box.length
      let n = 4 // 假设每行显示4个
      let lineNum = len % n === 0 ? len / n : Math.floor(len / n + 1)
      let res = []
      for (let i = 0; i < lineNum; i++) {
        // slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。且原始数组不会被修改。
        let temp = this.box.slice(i * n, i * n + n)
        res.push(temp)
      }
      return res
    }
  },
  async mounted () {
    await this.init()
    const { data: { data } } = await List({ gameId: 28, params: true })
    if (data.length > 0 && !this.isOpenBox) this.isCouponTip = true
    setTimeout(() => {
      this.isCouponTip = false
    }, 2000)
  },
  methods: {
    // 开三盒购买
    async bulkBuy () {
      GLOBALS.marchSetsPoint('A_H5PT0225002849')
      const {
        data: { data: payInfo }
      } = await PayPoint(1)
      Pay.toPay({ payInfo: payInfo.find(item => item.price === 55) })
    },
    viewGift () {
      this.$router.push({
        name: 'AllProducts'
      })
    },
    async init () {
      await this.getBoxInfo()
      await this.getUserInfo()
      await this.loopBox()
      if (!sessionStorage.blindBoxFirstTime) {
        sessionStorage.blindBoxFirstTime = true
        this.isRefresh = true
        this.isChange = true
        this.refreshTimer = setTimeout(() => {
          this.isRefresh = false
          this.isChange = false
          clearTimeout(this.refreshTimer)
        }, 1000)
      }
      this.$emit('load')
    },
    // 用户点击被透视的盒子是否弹窗
    async isPopup () {
      ({ data: { data: this.isFirstIn } } = await Popup(1))
    },
    // 活动规则
    showRule () {
      this.isShowRule = true
      GLOBALS.marchSetsPoint('A_H5PT0225002543') // H5平台-盲盒页面-活动规则点击
    },
    closeRule () {
      this.isShowRule = false
    },
    // 使用金叶子购买
    leafsBuy () {
      GLOBALS.marchSetsPoint('A_H5PT0225002683')
      this.isVirtual = true
    },
    // 获取盒子信息
    async getBoxInfo () {
      const res = await BoxList()
      const { data } = res.data
      this.$set(this, 'box', data || [])
    },
    loopBox () {
      clearTimeout(this.boxTimer)
      this.boxTimer = setTimeout(async () => {
        await this.getBoxInfo()
        this.loopBox()
      }, 3000)
    },
    // 换一批
    async changeAll () {
      if (this.isChange) return
      this.isChange = true
      const res = await ChangeAll()
      const { data } = res.data
      this.box = data || []
      this.loopBox()
      this.isRefresh = true
      this.refreshTimer = setTimeout(() => {
        this.isRefresh = false
        this.isChange = false
        clearTimeout(this.refreshTimer)
      }, 1000)
      GLOBALS.marchSetsPoint('A_H5PT0225002540') // H5平台-盲盒页面-换一批点击
    },
    // 获取用户活动信息
    async getUserInfo () {
      const res = await UserInfo()
      const { data } = res.data
      this.userInfo = data || {}
      if (this.userInfo.incrScore) {
        this.$score.show({
          message: `+${this.userInfo.incrScore}积分`,
          duration: 2000
        })
      }
      if (this.userInfo.openBoxTimes) {
        this.isShowPop = true
        GLOBALS.marchSetsPoint('A_H5PT0225002547') // H5平台-盲盒页面-购买盲盒支付成功弹窗加载完成
      }
    },
    async toDetail (item) {
      // this.isShake = false
      // 透视状态下点击盒子
      if (item.state === 2) {
        await this.isPopup()
        if (this.isFirstIn) {
          this.showTip = true
        } else {
          this.$toast.show({
            message: '该盒子正在被透视，请选择其他盒子',
            duration: 2000
          })
        }
        GLOBALS.marchSetsPoint('A_H5PT0225002686', {
          awards_id: item.sort
        })
      } else if (item.state === 3) {
        // 别人正在购买
        return
      } else {
        if (this.userInfo.openBoxTimes) {
          this.$router.push(
            `/openBox/${item.color}?sort=${item.sort}${
            item.state === 4 ? '&isTransparent=true' : ''
            }`
          )
        } else {
          this.$router.push(
            `/chooseBox/${item.color}?sort=${item.sort}${
            item.state === 4
              ? `&awardsName=${item.extend.awardsName}&awardsImage=${item.extend.awardsImage}&showAmount=${item.extend.showAmount}&awardsNum=${item.extend.awardsNum}`
              : ''
            }`
          )
        }
        GLOBALS.marchSetsPoint('A_H5PT0225002542', {
          awards_id: item.sort
        }) // H5平台-盲盒页面-点击选择盲盒(不计入假状态的盒子点击)
      }
    },
    async buyOne () {
      if (this.userInfo && this.userInfo.openBoxTimes) {
        GLOBALS.marchSetsPoint('A_H5PT0225002547') // H5平台-盲盒页面-购买盲盒支付成功弹窗加载完成
        this.isShowPop = true
      } else {
        const {
          data: { data: payInfo }
        } = await PayPoint(1)
        Pay.toPay({ payInfo: payInfo.find(item => item.price === 20) })
        GLOBALS.marchSetsPoint('A_H5PT0225002539') // H5平台-盲盒页面-开一次按钮点击(点击购买)
      }
    },
    async buyTwo () {
      GLOBALS.marchSetsPoint('A_H5PT0225003132')
      const {
        data: { data: payInfo }
      } = await PayPoint(1)
      Pay.toPay({ payInfo: payInfo.find(item => item.price === 38) })
    },
    closePop (type) {
      this.isShowPop = false
      switch (type) {
        case 1:
          this.isShake = true
          GLOBALS.marchSetsPoint('A_H5PT0225002548') // H5平台-盲盒页面-购买盲盒支付成功弹窗-好的点击
          break;
        case 2:
          let canBuyBoxArr = this.box.filter(
            item => item.state === 1 || item === 4
          )
          let selectedItem =
            canBuyBoxArr[Math.floor(Math.random() * canBuyBoxArr.length)]
          this.toDetail(selectedItem)
          GLOBALS.marchSetsPoint('A_H5PT0225002549') // H5平台-盲盒页面-购买盲盒支付成功弹窗-随机开点击
          break;
        default:
          GLOBALS.marchSetsPoint('A_H5PT0225002550') // H5平台-盲盒页面-购买盲盒支付成功弹窗-关闭点击
          break;
      }
    },
    hasShake (state) {
      return (state === 1 || state === 4) && this.isShake
    },
    hasShelf (item) {
      return item.state === 3
    },
    clearTimer () {
      clearTimeout(this.refreshTimer)
      clearInterval(this.boxTimer)
    }
  },
  destroyed () {
    this.clearTimer()
  }
}
</script>

<style lang="less" scoped>
@import "../index.less";
.box-list-wrapper {
  position: relative;
  left: 0;
  top: 0;
  margin-top: -0.32rem;
  z-index: 99;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  .view-gift {
    color: #ff2828;
  }
  .btn-container {
    display: flex;
    padding: 0 0.25rem;
    position: relative;
    justify-content: space-around;
    img {
      width: 2.05rem;
      height: 0.76rem;
    }
    .button {
      width: 2.11rem;
      line-height: 0.81rem;
      color: #fff;
      text-align: center;
      background: url("../activity/bt3.png") no-repeat;
      background-size: 100% 100%;
      font-size: 0.36rem;
      &1 {
        background: url("../activity/bt1.png") no-repeat;
        background-size: 100% 100%;
        color: #7b4913;
      }
      &2 {
        background: url("../activity/bt2.png") no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  .leaf-buy {
    padding-top: 0.28rem;
    font-size: 0.3rem;
    text-align: center;
    background: linear-gradient(90deg, #FFF8DC, #FCA667);
    -webkit-background-clip: text;
    font-weight: bold;
    color: transparent;
  }
  .buy-tip {
    color: #6f768e;
    font-size: 0.24rem;
    text-align: center;
    padding-top: 0.33rem;
    &.activity {
      color: #fff;
    }
  }
  .activity-button {
    width: 3.3rem;
    line-height: 0.8rem;
    // border-radius: 0.4rem;
    color: #fff3e5;
    font-size: 0.36rem;
    text-align: center;
    margin: 0 auto;
    background: url("../activity/button-bg.png") no-repeat;
    background-size: 100% 100%;
    .money {
      font-size: 0.4rem;
    }
    .cost-price {
      color: #f1430f;
      font-size: 0.26rem;
      font-weight: bold;
      text-decoration: line-through;
    }
    &.batch {
      background: url("../activity/button2.png") no-repeat;
      color: rgb(255, 255, 255);
      background-size: 100% 100%;
      margin-top: 0.2rem;
    }
  }
  .botton-wrapper {
   
  }
  img.coupon-tip {
    width: 1.56rem;
    height: 0.54rem;
    position: absolute;
    left: 4rem;
    top: -0.54rem;
  }
  .rule-content {
    font-size: 0.24rem;
    font-weight: 500;
    color: #888888;
    line-height: 0.38rem;
    text-align: left;
    height: 50vh;
    overflow: scroll;
    box-sizing: border-box;
    padding: 0 0.44rem 0.2rem;
  }
  .rule-btn-wrapper {
    padding: 0.2rem 0;
    .confirm {
      width: 4.1rem;
      height: 0.7rem;
      line-height: 0.7rem;
      background: #d1ac42;
      border-radius: 0.16rem;
      margin: auto;
      color: #fff;
      font-size: 0.24rem;
      font-weight: bold;
    }
  }
  .button-wrapper {
    flex: 1;
  }
  .box-list-container {
    background: #f0ead1;
    &::after {
      content: "";
      display: block;
      width: 100%;
      height: 0.18rem;
      background: #1b1f29 url(../assets/list-bottom-bg.png) no-repeat center
        center / 100% 100%;
      font-size: 0;
    }
    &.activity::after {
      background-color: #fef2de;
    }
  }
  .box-list {
    background: url(../assets/list-bg.png) no-repeat center bottom / 100%
      0.96rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding: 0.04rem 0 0.2rem;
    position: relative;
    .box-info {
      background: url(../assets/box-shadow.png) no-repeat center ~"0.4rem" / 100%
        1.12rem;
    }
    &.all-has-shelf:after {
      content: "";
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
      top: 0;
      background: url(../assets/long-shelf.png) no-repeat center center / 98%
        1.2rem;
    }
    .gold-buy {
      margin-top: 0.15rem;
    }
    .box-item {
      min-width: 1.8rem;
      text-align: center;
      position: relative;
      // .has-shelf::after {
      //   content: "";
      //   position: absolute;
      //   display: block;
      //   width: 100%;
      //   height: 100%;
      //   top: 0;
      //   background: url(../assets/shelf.png) no-repeat center center / 90%
      //     1.2rem;
      // }
      .old-box-image {
        position: absolute;
        top: 0;
        left: 50%;
        margin-left: -0.73rem;
        height: 1.7rem;
        width: 1.46rem;
        background: url(../assets/box-shadow.png) no-repeat center ~"0.4rem" / 100%
          1.12rem;
        img {
          width: 100%;
          height: 100%;
        }

        .awards-info {
          position: absolute;
          top: 0.6rem;
          left: 0;
          width: 100%;
          text-align: center;
          .other-people {
            margin: 0.2rem 0 0;
            color: #2a2d3c;
            background: #fff;
            border-radius: 0.13rem;
            font-size: 0.18rem;
            padding: 0.1rem;
            word-break: break-all;
          }
        }
      }
    }
  }
  .handler {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 0.25rem 0.3rem;
    box-sizing: border-box;
    .times {
      padding-left: 0.2rem;
      span {
        color: #ff1520;
      }
      &.activity {
        padding-left: 0;
        span {
          color: #fff3e5;
        }
      }
    }
    .money-buy {
      margin: 0 auto;
      width: 3.07rem;
      line-height: 0.78rem;
      color: #f5dbbb;
      font-size: 0.36rem;
      text-align: center;
      background: url("../assets/button1.png") no-repeat;
      background-size: 100% 100%;
    }
    .button {
      margin: auto;
    }
    .change-btn {
      box-sizing: border-box;
      color: #B2498D;
      line-height: 0.42rem;
      font-size: 0.26rem;
      display: flex;
      align-items: center;
      .icon {
        width: 0.34rem;
        margin-right: 0.1rem;
      }
    }
  }

  .pop-content {
    font-size: 0.24rem;
    font-weight: bold;
    color: #1a1e28;
    line-height: 0.36rem;
    text-align: center;
    padding: 0 0.44rem 0.2rem;
  }
  .pop-btn-wrapper {
    padding: 0.2rem 0;
    .confirm {
      width: 4.1rem;
      height: 0.7rem;
      line-height: 0.7rem;
      background: #d1ac42;
      border-radius: 0.16rem;
      margin: auto;
      color: #fff;
      font-size: 0.24rem;
      font-weight: bold;
      border: #d1ac42 solid 0.02rem;
    }
    .cancel {
      width: 4.1rem;
      height: 0.7rem;
      line-height: 0.7rem;
      background: #fff;
      border-radius: 0.16rem;
      margin: 0.3rem auto 0;
      color: #d1ac42;
      font-size: 0.24rem;
      font-weight: bold;
      border: #d1ac42 solid 0.02rem;
    }
  }
}
</style>
