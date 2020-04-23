<template>
  <transition name="scalc">
    <article class="pop-up-wrapper">
      <section class="mask"></section>
      <section class="content-wrapper" :class="`type-${type}`" ref="group">
        <section class="first-pop" v-if="[4,5,6].includes(type)">
          <img class="title" src="../img/pop-up-title.png" alt="">
          <template v-if="type===4">
            <div class="has-hf">
              <img class="sub-title" src="../img/yesterday.png" alt="">
              <img src="../img/hfq-icon.png" alt="">
              <p>{{awardInfo.awardNum}}话费</p>
            </div>
            <p v-if="info.state!==2">
              今日还没获得号码<br />
              可以在指定游戏消耗金叶或者完成活动任务<br />
              获得随机号码
            </p>
          </template>
          <template v-else-if="type===5">
            <img class="icon" src="../img/sad-icon.png" alt="">
            <p class="text">
              很遗憾！<br />
              您昨日未集齐4个号码<br />
              未获得奖励
            </p>
            <p v-if="info.state!==2">
              今日还没获得号码<br />
              可以在指定游戏消耗金叶或者完成活动任务<br />
              获得随机号码
            </p>
          </template>
          <template v-else-if="type===6">
            <img class="icon" src="../img/clock-icon.png" alt="">
            <p class="text">
              大赢家<br />
              正在努力为你开奖
            </p>
            <p>
              请稍等几分钟再进入活动页<br />
              点击“上期开奖结果”查看
            </p>
          </template>
          <div class="btn" @click="toLook()">快去看看</div>
          <p class="other-desc">搜集数字越多，中奖概率越大！</p>
        </section>
        <section class="content" v-else>
          <div class="title">
            <template v-if="type===1">
              <img src="../img/rule-title.png" alt="">
            </template>
            <template v-else>
              <img src="../img/back-icon.png" class="back" v-if="type===14" alt="" @click="type=13">
              {{title}}
            </template>
          </div>
          <div class="container">
            <template v-if="type===0">
              活动时间：{{info.beginDate}}至{{info.endDate}}<br />
              1. 活动期间内，玩家在指定游戏中消耗一定的叶子，可领取随机号码，将4个任意号码进行组合即可获得一注兑奖号；<br />
              2. 活动期间，玩家将集齐的每组号码与系统随机生成的中奖码进行匹配，<span
                class="bold">单组数字与中奖码数字和顺序一致越多，则瓜分的奖励越多</span><br />
              3. 玩家在活动中获得的号码越多，则组合越多。同时获奖概率越大。<br />
              4. 平台内所有玩家在游戏中消耗金叶会有一部分计入活动奖池，并换算成话费券。<br />
              比例：<span class="red-text bold">100金叶=1话费券=0.1元话费</span><br />
              <span class="click-span" @click="type=1">点击查看瓜分示意图</span><br />
              获奖金额计算方式：<br />
              改奖项在奖池金额的占比除以该奖项的号码注数<br />
              例：当日奖池为8万话费券，则特等奖总金额为16000话费券；如果有2注号码中特等奖，则每注可获得8000话费券。<br />
              5. 活动期间，每期开奖时间为次日<span class="red-text bold">1点</span>，奖励会在用户次日进入活动页面后发放；<br />
              6. 活动期间，活动金叶消耗进度<span class="red-text bold">每日重置</span>，请及时领取使用；<br />
              7. <span class="red-text bold">玩家当日未使用的号码，会在次日0点开奖后删除</span><br />
              8. 活动结束后，根据活动期间累计获得的数字进行排名并发放排行奖励，有奖排行榜仅限前30名玩家进榜，排行榜奖励将直接发放，排行榜单会展示一天<br />
              注意：<br />
              活动期间，超过当天24：00未领取的数字将清零<br />
              活动期间，未使用的数字将清零
            </template>
            <template v-else-if="type===1">
              <div class="rule-img-wrapper">
                <img src="../img/rule.png" alt="">
              </div>
            </template>
            <template v-else-if="type===2||type===3">
              <nav>
                <span :class="{activitied:type===2}" @click="type=2">攻略</span>
                <span :class="{activitied:type===3}" @click="type=3">奖励</span>
              </nav>
              <template v-if="type===2">
                <ul>
                  <li>
                    <div class="step">步骤一</div>
                    <div>
                      <p class="sub-title">获得数字:</p>
                      <p>
                        活动期间在指定游戏中消耗金叶子，购买充值礼包，完成每日任务可以获得随机号码
                      </p>
                    </div>
                  </li>
                  <li>
                    <div class="step">步骤二</div>
                    <div>
                      <p class="sub-title">
                        奖励获取:
                      </p>
                      <p>
                        玩家将搜集到的号码进行组合（4个为一组），并将每组号码与系统随机生成的中奖码进行匹配，单组号码与中奖码数字和顺序一致越多，则获得奖励越多
                        <span class="click-span" @click="type=3">查看奖励</span>
                      </p>
                    </div>
                  </li>
                  <li>
                    <div class="step">步骤三</div>
                    <div>
                      <p class="sub-title">
                        上榜赢大奖:
                      </p>
                      <p>
                        活动期间玩家获得的号码总量会计入最终排行榜，最高可得价值35000元大奖
                      </p>
                    </div>
                  </li>
                </ul>
              </template>
              <template v-else>
                <ul>
                  <li>
                    <div class="step">特等奖单注奖励</div>
                    <div>
                      <p class="sub-title">奖池总金额的10%除以中奖号码注数</p>
                    </div>
                  </li>
                  <li>
                    <div class="step">一等奖单注奖励</div>
                    <div>
                      <p class="sub-title">奖池总金额的10%除以中奖号码注数</p>
                    </div>
                  </li>
                  <li>
                    <div class="step">二等奖单注奖励</div>
                    <div>
                      <p class="sub-title">奖池总金额的10%除以中奖号码注数</p>
                    </div>
                  </li>
                  <li>
                    <div class="step">三等奖单注奖励</div>
                    <div>
                      <p class="sub-title">奖池总金额的30%除以中奖号码注数</p>
                    </div>
                  </li>
                  <li>
                    <div class="step">幸运奖单注奖励</div>
                    <div>
                      <p class="sub-title">奖池总金额的40%除以中奖号码注数</p>
                    </div>
                  </li>
                </ul>
              </template>
            </template>
            <template v-else-if="type===7">
              <div class="gamelist">
                <img :src="require(`../img/games/${index}.png`)" alt=""
                  v-for="(item,index) in games" class="game" @click="gotogame(item)">
              </div>
              <div class="gogames" @click="gotoindex">去玩更多游戏>></div>
            </template>
            <template v-else-if="type===8">
              <div class="sub-title"><span>号码展示</span></div>
              <ul class="number-list">
                <li :class="{selected:item.num}" v-for="(item,index) in numberList">
                  <span>{{item.value}}</span>
                  <span class="num">{{item.num}}</span>
                </li>
              </ul>
              <div class="btn" @click="closePop(true)">
                去组号
              </div>
            </template>
            <template v-else-if="type===10">
              <img src="../img/sad-icon.png" alt="">
              <p>
                您的号码不足4个<br>
                快去搜集数字吧
              </p>
              <div class="btn" @click="closePop(true)">
                去搜集
              </div>
            </template>
            <template v-else-if="type===11">
              <p>
                平台内所有玩家在游戏中消耗金叶会有一部分计入活动奖池，并换算成话费券。
                参与活动的用户可在次日依据<span class="click-span" @click="type=0">活动规则</span>进行奖池瓜分。<br />
                比例：100金叶=1话费券=0.1元话费
              </p>
              <p class="sub-title">当前金叶累计</p>
              <p class="leaf-number">{{info.awardPool*100}}金叶</p>
            </template>
            <template v-else-if="type===12">
              <p>备注：获得的号码会在次日零点清零并重新累计请尽快使用</p>
              <div class="number-area">
                <div class="sub-title"><span>可使用</span></div>
                <ul class="number-list">
                  <li v-for="(item,index) in numberList">
                    <div>{{item.value}}</div>
                    <span class="num">{{item.num}}</span>
                  </li>
                </ul>
              </div>
            </template>
            <template v-else-if="type===13">
              <ul class="last-number">
                <li v-for="(item,index) in lastNumber">
                  {{item}}</li>
              </ul>
              <div class="sub-title">恭喜您获得</div>
              <ul class="award-list">
                <li v-for="(item,index) in lastAwardList">
                  <div class="left">
                    <p>{{item.label}}</p>
                    <p class="num">{{item.num}}注</p>
                  </div>
                  <div class="middle">
                    <p>累计</p>
                    <p>{{item.hfNum}}话费券</p>
                  </div>
                  <p class="right" @click="selectAward(item)">查看详情</p>
                </li>
              </ul>
            </template>
            <template v-else-if="type===14">
              <ul class="last-award-list" ref="area">
                <li v-for="(items,index) in awardNumsArr" :key="`line-${index}`">
                  <p v-for="(item,key) in items.numGroup" :key="`item-${index}-${key}`"
                    :class="{activitied:item===lastNumber[key]}">{{item}}</p>
                </li>
              </ul>
            </template>
            <template v-else-if="type===15">
              <ul class="last-award-list">
                <li v-for="(items,index) in newNumGroup" :key="`line-${index}`">
                  <p v-for="(item,key) in items" :key="`item-${index}-${key}`">{{item}}</p>
                </li>
              </ul>
            </template>
            <template v-else-if="type===16">
              <template v-if="awardInfo.rankAward&&awardInfo.rankAward.length">
                <h4>恭喜你排名为第{{awardInfo.rankIdx}}名<br />
                  获得</h4>
                <div class="prize_info lte2">
                  <div class="prize_info_item" v-for="(item,index) in awardInfo.rankAward">
                    <div class="prize_info_img">
                      <img :src="`${require(`../img/common/${item.awardsType}.png`)}`" alt=""
                        v-if="item.awardsType">
                    </div>
                    <div class="prize_info_name">
                      <div class="prize_info_name_item" v-if="item.awardsType">
                        {{getAwardName(item.awardsType)}}</div>
                      <div class="prize_info_name_item" v-if="item.awardsName">
                        {{item.awardsName.replace(getAwardName(item.awardsType),'')}}
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                <img src="../img/sad-icon.png" alt="" class="icon">
                <div class="sad_tips">您未上榜，下次继续加油哦</div>
              </template>
              <div class="btn" @click="closePop()">我知道了</div>
            </template>
          </div>
          <div v-if="type===15" class="btn" @click="_addNumGroup()">保 存</div>
        </section>
        <div class="close-icon" v-if="hasClose" @click="closePop()"></div>
      </section>
    </article>
  </transition>
</template>

<script>
import { userAwardNums, addNumGroup } from '../services/api'
import _get from 'lodash.get'
export default {
  name: 'popUp',
  components: {

  },
  data () {
    return {
      type: this.value,
      games: [{
        id: 12,
        url: '/crush'
      }, {
        id: 2, url: '/billiards'
      }, {
        id: 10, url: '/fish'
      }, {
        id: 13, url: '/kingdom2'
      }, {
        id: 18, url: '/square'
      }, {
        id: 21, url: '/Marbles'
      }],
      selectedTitle: '幸运奖',
      awardNumsArr: [],
      newNumGroup: [],
      awardGrade: 0,
      page: 1,
      group: {},
      finished: false,
      loading: false
    }
  },
  props: {
    value: {
      type: Number,
      default: 0
    },
    info: {
      type: Object,
      default: () => ({})
    },
    awardInfo: {
      type: Object,
      default: () => ({})
    },
    numberList: {
      type: Array,
      default: () => ([])
    },
    lastAwardInfo: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    title () {
      switch (this.type) {
        case 0:
          return '活动规则'
        case 2:
          return '活动攻略+奖励'
        case 3:
          return '活动攻略+奖励'
        case 7:
          return '大家都在玩'
        case 8:
          return '恭喜您获得'
        case 9:
        case 10:
          return '亲爱的玩家'
        case 11:
          return '温馨提示'
        case 12:
          return '我的号码箱'
        case 13:
          return '上次开奖结果'
        case 14:
          return this.selectedTitle
        case 15:
          return '随机号码结果'
        case 16:
          return '排行榜已发榜'
        default:
          return ''
      }
    },
    hasClose () {
      switch (this.type) {
        case 4:
        case 5:
        case 6:
          return false

        default:
          return true
      }
    },
    lastNumber () {
      let arr = this.lastAwardInfo.awardNumGroup && this.lastAwardInfo.awardNumGroup.split('') || []
      arr = arr.map(x => x = parseInt(x))
      return arr
    },
    lastAwardList () {
      let maxGroupAwardInfo = this.lastAwardInfo.maxGroupAwardInfo && this.lastAwardInfo.maxGroupAwardInfo.split(':') || [0, 0]
      let oneGroupAwardInfo = this.lastAwardInfo.oneGroupAwardInfo && this.lastAwardInfo.oneGroupAwardInfo.split(':') || [0, 0]
      let twoGroupAwardInfo = this.lastAwardInfo.twoGroupAwardInfo && this.lastAwardInfo.twoGroupAwardInfo.split(':') || [0, 0]
      let threeGroupAwardInfo = this.lastAwardInfo.threeGroupAwardInfo && this.lastAwardInfo.threeGroupAwardInfo.split(':') || [0, 0]
      let luckyGroupAwardInfo = this.lastAwardInfo.luckyGroupAwardInfo && this.lastAwardInfo.luckyGroupAwardInfo.split(':') || [0, 0]
      return [
        { label: '特等奖', num: maxGroupAwardInfo[0], hfNum: maxGroupAwardInfo[1], id: 0 },
        { label: '一等奖', num: oneGroupAwardInfo[0], hfNum: oneGroupAwardInfo[1], id: 1 },
        { label: '二等奖', num: twoGroupAwardInfo[0], hfNum: twoGroupAwardInfo[1], id: 2 },
        { label: '三等奖', num: threeGroupAwardInfo[0], hfNum: threeGroupAwardInfo[1], id: 3 },
        { label: '幸运奖', num: luckyGroupAwardInfo[0], hfNum: luckyGroupAwardInfo[1], id: 99 }
      ]
    }
  },
  mounted () {

  },
  methods: {
    closePop (isSure, data) {
      this.$emit('closePop', isSure, data)
    },
    toLook () {
      if (this.awardInfo.rankTips) {
        this.type = 16
      } else {
        this.closePop()
      }
    },
    getAwardName (awardType) {
      switch (awardType) {
        case 'jyz':
          return '金叶子'
        case 'yg':
          return '鱼干'
        case 'jdk':
          return '京东券'
        case 'hfq':
          return '话费券'
      }
    },
    gotogame ({ url, id }) {
      GLOBALS.jumpOutsideGame(url)
    },
    gotoindex () {
      window.location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL'))
    },
    selectAward (item) {
      this.selectedTitle = item.label
      this.type = 14
      this.awardGrade = item.id
      this.page = 1
      this.finished = false
      this.awardNumsArr = []
      this._userAwardNums()
    },
    onScroll () {
      let bottom = this.$refs.area.getBoundingClientRect().bottom
      let height = this.group.offsetHeight
      if (bottom - height < 50) {
        this._userAwardNums()
      }
    },
    removeScroll () {
      this.el.removeEventListener('touchend', this.onScroll)
    },
    async _userAwardNums () {
      if (this.finished || this.loading) {
        return
      }
      this.loading = true
      const res = await userAwardNums(this.awardGrade, this.page)
      this.loading = false
      let arr = _get(res, 'data', [])
      if (arr.length) {
        this.finished = false
        this.awardNumsArr = [...this.awardNumsArr, ...arr]
        this.page++
      } else {
        this.finished = true
      }
    },
    _createMoreNum () {
      let arr = []
      this.numberList.forEach(items => {
        let item = new Array(items.num).fill(items.value)
        arr = [...arr, ...item]
      })
      arr.sort(function () {
        return Math.random() - 0.5
      })
      arr.sort(function () {
        return Math.random() - 0.5
      })
      this.newNumGroup = this.arrTrans(4, arr)
    },
    arrTrans (num, arr) {
      const newArr = []
      while (arr.length >= num) {
        newArr.push(arr.splice(0, num))
      }
      return newArr
    },
    async _addNumGroup () {
      if (this.newNumGroup.length) {
        const res = await addNumGroup({ newNumGroup: this.newNumGroup })
        let { code, data } = res
        if (code === 200) {
          this.$toast.show({
            message: '生成成功',
            duration: 1000
          })
          this.closePop(true)
        }
      }
    }
  },
  watch: {
    value (val) {
      if (val === 14) {
        this.group = this.$refs.group
        this.$nextTick(() => {
          this.group.addEventListener('touchend', this.onScroll)
        })
      }
      this.type = val
    },
    type (val) {
      this.$emit('input', val)
    },
    numberList: {
      deep: true,
      handler (val) {
        if (this.value === 15) {
          this._createMoreNum()
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.pop-up-wrapper {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  z-index: 9;
  .mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
  }
  .content-wrapper {
    width: 6.6rem;
    position: relative;
    margin: 0 auto;
    z-index: 1;
    box-sizing: border-box;
    font-size: 0.3rem;
    .first-pop {
      width: 5.6rem;
      background: #ff7101;
      border-radius: 0.16rem;
      margin: 1.2rem auto 0;
      text-align: center;
      color: #fff;
      font-size: 0.2rem;
      line-height: 0.3rem;
      padding: 0.5rem 0;
      .title {
        width: 3.16rem;
      }
      .has-hf {
        background: #fff;
        border-radius: 0.16rem;
        width: 3.98rem;
        text-align: center;
        margin: 0.4rem auto 0.2rem;
        font-size: 0.36rem;
        color: #ff7101;
        font-weight: bold;
        padding: 0.16rem 0 0.2rem;
        img {
          width: 2.56rem;
          display: block;
          margin: 0.18rem auto;
        }
        .sub-title {
          width: 1.34rem;
          margin: auto;
        }
      }
      .icon {
        width: 1.8rem;
        display: block;
        margin: 0.4rem auto 0.14rem;
      }
      .text {
        font-size: 0.24rem;
        font-weight: bold;
        margin-bottom: 0.3rem;
      }
      .btn {
        color: #fff;
        background: #ffa801;
        height: 0.72rem;
        line-height: 0.72rem;
        border-radius: 0.36rem;
        font-size: 0.3rem;
        width: 2.78rem;
        margin: 0.38rem auto 0.18rem;
      }
      .other-desc {
        font-size: 0.18rem;
        color: #934203;
      }
    }
    .content {
      margin-top: 1.2rem;
      border-radius: 0.2rem;
      height: 6.68rem;
      background: #ffa200;
      .title {
        height: 0.9rem;
        font-size: 0.4rem;
        line-height: 0.9rem;
        color: #c04102;
        text-align: center;
        background: #fdd130;
        border-radius: 0.2rem 0.2rem 0 0;
        font-weight: bold;
        position: relative;
        img {
          height: 0.3rem;
          &.back {
            width: 0.56rem;
            height: 0.56rem;
            position: absolute;
            left: 0.2rem;
            top: 0.16rem;
          }
        }
      }
      .container {
        height: calc(~'100%' - 0.9rem);
        box-sizing: border-box;
        overflow-x: hidden;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        padding: 0.36rem;
        color: #fff;
        .click-span {
          text-decoration: underline;
          color: #0d7cd2;
        }
        .btn {
          margin: 0.1rem auto 0;
          color: #ff7101;
          font-size: 0.26rem;
          font-weight: bold;
          text-align: center;
          width: 3.54rem;
          height: 0.6rem;
          line-height: 0.6rem;
          background: #fdd130;
          border-radius: 0.3rem;
        }
      }
    }
    &.type-0,
    &.type-1,
    &.type-2,
    &.type-3,
    &.type-12,
    &.type-13,
    &.type-14,
    &.type-15 {
      .content {
        height: 7.76rem;
      }
    }
    &.type-0 {
      .red-text {
        color: #ff4330;
      }
      .bold {
        font-weight: bold;
      }
    }
    &.type-1 {
      .rule-img-wrapper {
        margin: -0.36rem -0.36rem 0 -0.36rem;
        img {
          width: 100%;
        }
      }
    }
    &.type-2,
    &.type-3 {
      nav {
        width: 4.5rem;
        height: 0.72rem;
        border-radius: 0.36rem;
        margin: 0 auto 0.36rem;
        display: flex;
        align-items: center;
        overflow: hidden;
        span {
          flex: 1;
          height: 100%;
          line-height: 0.72rem;
          text-align: center;
          background: #ff7101;
          color: #fdd130;
          font-size: 0.3rem;
          font-weight: bold;
          &.activitied {
            background: #fdd130;
            color: #c04102;
          }
        }
      }
      ul {
        li {
          border-radius: 0.2rem;
          background: #fff;
          color: #ff7f32;
          overflow: hidden;
          margin-bottom: 0.14rem;
          .step {
            background: #ff7f32;
            color: #fff;
            font-size: 0.36rem;
            text-align: center;
            font-weight: bold;
          }
          .sub-title {
            font-weight: bold;
          }
        }
      }
    }
    &.type-2 {
      ul {
        li {
          display: flex;
          div {
            padding: 0.26rem 0.3rem 0.34rem;
          }
          .step {
            min-width: 0.64rem;
            max-width: 0.64rem;
            padding: 0.3rem 0;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
    &.type-3 {
      ul {
        li {
          text-align: center;
          margin-bottom: 0.18rem;
          div {
            padding: 0.26rem 0 0.34rem;
            font-size: 0.3rem;
          }
          .step {
            height: 0.66rem;
            line-height: 0.66rem;
            padding: 0;
          }
        }
      }
    }
    &.type-7 {
      .gamelist {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 0 0.6rem;
        .game {
          margin-top: 0.4rem;
          width: 1.24rem;
          height: 1.69rem;
        }
      }
      .gogames {
        margin-top: 0.24rem;
        font-size: 0.4rem;
        color: #ffe1bd;
        font-weight: bold;
        text-align: center;
        padding-bottom: 0.1rem;
      }
    }
    &.type-8 {
      .sub-title {
        font-size: 0.4rem;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        &::before,
        &::after {
          content: '';
          width: 1.1rem;
          height: 0.32rem;
          background: url('../img/border-white.png') no-repeat center center;
          background-size: 100% 100%;
          margin: 0 0.12rem;
        }
      }
      .number-list {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        margin: auto -0.36rem;
        li {
          position: relative;
          width: 0.86rem;
          height: 0.86rem;
          border-radius: 50%;
          background: #ff7101;
          font-size: 0.44rem;
          color: #c04102;
          font-weight: bold;
          line-height: 0.86rem;
          text-align: center;
          margin: 0.4rem 0.18rem;
          .num {
            display: block;
            font-size: 0.2rem;
            color: #fff;
            line-height: 0.26rem;
            text-align: center;
            border-radius: 50%;
            margin-top: 0.2rem;
          }
          &.selected {
            background: #fff;
          }
        }
      }
      .content .container .btn {
        margin: 0.3rem auto 0;
      }
    }
    &.type-9,
    &.type-10 {
      img {
        display: block;
        width: 2.2rem;
        margin: 0.2rem auto 0;
      }
      p {
        color: #c34a04;
        font-size: 0.36rem;
        text-align: center;
        font-weight: bold;
        margin: 0.38rem auto 0.5rem;
      }
    }
    &.type-11 {
      .container {
        color: #c34a04;
        font-size: 0.3rem;
        .sub-title {
          text-align: center;
          color: #fff;
          font-size: 0.36rem;
          margin: 0.36rem auto;
        }
        .leaf-number {
          color: #ffa200;
          font-size: 0.48rem;
          background: #fff;
          width: 4.68rem;
          height: 1.3rem;
          line-height: 1.3rem;
          text-align: center;
          margin: auto;
          border-radius: 0.65rem;
          font-weight: bold;
        }
      }
    }
    &.type-12 {
      .container {
        color: #ffe37b;
        font-size: 0.2rem;
        text-align: center;
        p {
          white-space: nowrap;
        }
      }
      .number-area {
        background: #fff;
        border-radius: 0.16rem;
        margin-top: 0.4rem;
        padding: 0.24rem 0;
        .sub-title {
          font-size: 0.36rem;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #c04102;
          &::before,
          &::after {
            content: '';
            width: 1.1rem;
            height: 0.32rem;
            background: url('../img/border-orange.png') no-repeat center center;
            background-size: 100% 100%;
            margin: 0 0.12rem;
          }
        }

        .number-list {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          margin: auto -0.36rem;
          li {
            margin: 0.2rem 0.12rem 0;
            div {
              width: 0.9rem;
              height: 0.9rem;
              border-radius: 50%;
              background: #fec053;
              font-size: 0.48rem;
              color: #c04102;
              font-weight: bold;
              line-height: 0.9rem;
              text-align: center;
            }
            .num {
              display: block;
              font-size: 0.2rem;
              color: #ffa200;
              text-align: center;
              margin-top: 0.04rem;
            }
          }
        }
      }
    }
    &.type-13 {
      .last-number {
        display: flex;
        align-items: center;
        justify-content: center;
        li {
          background: #ff7101;
          width: 0.94rem;
          height: 0.94rem;
          line-height: 0.94rem;
          color: #c04102;
          font-size: 0.48rem;
          text-align: center;
          border-radius: 50%;
          font-weight: bold;
          margin: 0 0.2rem;
        }
      }
      .sub-title {
        font-size: 0.4rem;
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 0.4rem;
        &::before,
        &::after {
          content: '';
          width: 1.1rem;
          height: 0.32rem;
          background: url('../img/border-white.png') no-repeat center center;
          background-size: 100% 100%;
          margin: 0 0.12rem;
        }
      }
      .award-list {
        li {
          display: flex;
          background: #fff;
          align-items: center;
          justify-content: space-between;
          border-radius: 0.2rem;
          overflow: hidden;
          color: #ff7101;
          height: 1.4rem;
          margin-top: 0.2rem;
          .left {
            font-size: 0.36rem;
            font-weight: bold;
            width: 1.76rem;
            text-align: center;
            .num {
              font-size: 0.3rem;
              color: #fff;
              background: #ff7101;
              height: 0.52rem;
              line-height: 0.52rem;
              width: 1.24rem;
              border-radius: 0.26rem;
              margin: 0.06rem auto 0;
            }
          }
          .middle {
            flex: 1;
            font-weight: bold;
            font-size: 0.3rem;
            text-align: left;
            border-left: solid #fdd130 1px;
            padding-left: 0.26rem;
          }
          .right {
            background: #fdd130;
            font-size: 0.28rem;
            color: #ff7101;
            height: 100%;
            width: 0.96rem;
            padding: 0.16rem 0.36rem 0 0.3rem;
            box-sizing: border-box;
            line-height: 0.3rem;
            font-weight: bold;
          }
        }
      }
    }
    &.type-14,
    &.type-15 {
      .last-award-list {
        li {
          margin-bottom: 0.12rem;
          display: flex;
          align-items: center;
          justify-content: center;
          p {
            width: 0.94rem;
            height: 0.94rem;
            border-radius: 0.48rem;
            background: #ff7101;
            color: #c04102;
            font-size: 0.48rem;
            line-height: 0.94rem;
            text-align: center;
            margin: 0 0.2rem;
            &.activitied {
              background: #fff3e9;
            }
          }
        }
      }
    }
    &.type-15 {
      .last-award-list {
        margin-bottom: 0.8rem;
      }
      .content {
        position: relative;
        .btn {
          background: #d62901;
          height: 0.92rem;
          width: 100%;
          color: #ffa200;
          line-height: 0.92rem;
          text-align: center;
          font-size: 0.36rem;
          position: absolute;
          bottom: 0;
          left: 0;
          border-radius: 0 0 0.2rem 0.2rem;
        }
      }
    }
    &.type-16 {
      text-align: center;
      .sad_tips {
        font-size: 0.36rem;
        color: #c34a04;
        text-align: center;
        margin-bottom: 0.8rem;
      }
      .icon {
        width: 2.2rem;
        display: block;
        margin: 0.2rem auto 0.6rem;
      }
      h4 {
        font-size: 0.36rem;
        font-weight: 400;
        color: #c34a04;
        margin-bottom: 0.5rem;
        line-height: 0.44rem;
      }
      .prize_info {
        display: flex;
        flex-wrap: wrap;
        box-sizing: border-box;
        justify-content: space-between;
        position: relative;
        margin-bottom: 0.8rem;
        .prize_info_item {
          width: 1.22rem;
          &.empty {
            opacity: 0;
            width: 0.96rem;
          }
          .prize_info_img {
            height: 1.15rem;
            background: rgba(254, 253, 251, 1);
            border-radius: 0.2rem 0.2rem 0 0;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              width: 80%;
              margin: auto;
            }
          }
          .prize_info_name {
            height: 0.65rem;
            background: rgba(255, 127, 50, 1);
            border-radius: 0 0 0.2rem 0.2rem;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            padding: 0.1rem 0;
            box-sizing: border-box;
            .prize_info_name_item {
              font-size: 0.22rem;
              font-weight: 800;
              text-align: center;
              line-height: 0.24rem;
              &:nth-child(2) {
                color: #fff500;
              }
            }
          }
        }
        &.lte2 {
          justify-content: center;
          .prize_info_item:nth-child(1) {
            margin-right: 0.8rem;
          }
        }
        &.triple {
          width: 4.5rem;
          margin: auto;
        }
        &:after {
          content: '+';
          position: absolute;
          top: 0.7rem;
          bottom: 0;
          margin: auto;
          font-size: 0.36rem;
          font-weight: bold;
          color: #ff7f32;
        }
      }
    }
  }
  .close-icon {
    width: 0.6rem;
    height: 0.6rem;
    background: url('../img/close.png') no-repeat center center;
    background-size: 100% 100%;
    margin: 0.4rem auto;
  }
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
</style>
