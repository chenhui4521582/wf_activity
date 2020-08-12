<template>
  <main class="bingo">
    <div class="bg">
      <img src="./img/bg.png" alt="">
    </div>
    <div class="back" @click="back()">返回</div>
    <rule :info="actData" />
    <article class="main-content" v-if="actData.state">
      <section class="time">
        <p>活动时间</p>
        <p>{{actData.startDate|timeFilter}} - {{actData.endDate|timeFilter}}</p>
      </section>
      <section class="title-img">
        <img src="./img/title.png" alt="">
      </section>
      <section class="gift-task-wrapper">
        <ul v-for="items in actList">
          <li v-for="item in items" @click="handleClick(item)">
            <template v-if="item.type===1">
              <div class="item item-gift" :class="`status-${actData.state===2?2:item.status}`">
                <p class="name">充<br />{{item.name}}</p>
                <p class="content">{{item.content|contentFilter}}</p>
                <p class="tips" v-if="actData.state===2">已结束</p>
                <p class="tips" v-else-if="item.status===2">已完成</p>
              </div>
            </template>
            <template v-else-if="item.type===2">
              <div class="item item-task" :class="`status-${item.status}`">
                <template v-if="item.status===0">
                  <p class="name"><span>{{item.awardName}}</span></p>
                  <div class='percent'>
                    可领取
                  </div>
                </template>
                <template v-if="item.status===1">
                  <p class="name">
                    {{item.awardName.split('+')[0]}}<br>+{{item.awardName.split('+')[1]}}
                  </p>
                  <div class='percent'>
                    <div class="percent-bg">
                      <div class="percent-content"
                        :style="{width:item.userProgress/item.progress*100+'%'}"
                        :class="{'full-width':item.userProgress-item.progress>=0}">
                      </div>
                      <div class="percent-text">{{item.userProgress}}/{{item.progress}}</div>
                    </div>
                  </div>
                </template>
                <template v-else-if="item.status===2">
                  <p class="name"><span>{{item.awardName}}</span></p>
                  <div class="percent"><span>已领取</span></div>
                </template>
              </div>
            </template>
            <template v-else>
              <div class="item item-empty">
              </div>
            </template>
          </li>
        </ul>
        <div class="landscape" :class="{show:step===1}" alt=""></div>
        <div class="portrait" :class="{show:step===2}" alt=""></div>
      </section>
      <section class="final-prize-wrapper">
        <div>
          <p>
            完成所有Bingo
          </p>
          <p>
            得额外奖励
          </p>
        </div>
        <div>
          <p>
            {{bingoInfo.awardName.split('+')[0]}}
          </p>
          <p>
            +{{bingoInfo.awardName.split('+')[1]}}
          </p>
        </div>
        <div>
          <template v-if="bingoInfo.status===0">
            <button class="receive btn" @click="_receiveAddedAward(bingoInfo)">可领取</button>
          </template>
          <template v-if="bingoInfo.status===1">
            <button class="normal-item btn">待领取</button>
            <div class='percent'>
              <div class="percent-bg">
                <div class="percent-content"
                  :style="{width:bingoInfo.userProgress/bingoInfo.progress*100+'%'}"
                  :class="{'full-width':bingoInfo.userProgress-bingoInfo.progress>=0}">
                </div>
                <div class="percent-text">{{bingoInfo.userProgress}}/{{bingoInfo.progress}}</div>
              </div>
            </div>
          </template>
          <template v-if="bingoInfo.status===2">
            <button class="received btn">已领取</button>
          </template>
        </div>
      </section>
      <button v-if="actData.state===1" class="one-more" @click="oneMore"></button>
      <button v-else class="one-more end" @click="end"></button>
    </article>
    <popup v-model="isShowPop" :type="popType" :awards-info="awardsInfo"
      @on-confirm="confirmCallback" @on-close="closeCallback" @on-cancel="cancelCallback" />
  </main>
</template>

<script>
/* eslint-disable no-undef */
import rule from './components/rule/index'
import popup from './components/popup/index'
import { initAct, receiveAddedAward, resetUserActivity } from './services/api'
import _get from 'lodash.get'
import _clone from 'lodash.clonedeep'
export default {
  name: '',
  components: {
    rule,
    popup
  },
  data () {
    return {
      bingoInfo: {
        status: 1
      },
      isShowPop: false,
      popType: 'award',
      awardsInfo: {},
      step: 0,
      actData: {},
      giftData: {},
      payGiftBigIds: [],
      addedAwardRsps: []
    }
  },
  filters: {
    timeFilter (time) {
      if (time) {
        return time.split(' ')[0]
      }
      return ''
    },
    contentFilter (content) {
      let name = content || ''
      if (content && content.split('+').length > 1 && content.split('+')[1]) {
        name = '送' + content.split('+')[1]
      }
      return name
    }
  },
  computed: {
    actList () {
      let giftArr = _clone(this.giftData)
      let awardArr = _clone(this.addedAwardRsps)
      let newArr = []
      giftArr.forEach(item => {
        if (this.payGiftBigIds.length && this.payGiftBigIds.includes(item.productId.toString())) {
          item.status = 2
        } else {
          item.status = 1
        }
        item.type = 1
      })
      awardArr.forEach(item => {
        item.type = 2
      })
      while (giftArr.length > 0) {
        let item = awardArr.splice(0, 1)[0]
        newArr.push([...giftArr.splice(0, 3), item])
      }
      newArr.push(awardArr.splice(0, 3))
      return newArr
    }
  },
  async mounted () {
    await this._initAct()
    let bingoStart = localStorage.getItem('bingoStart')
    if (!bingoStart) {
      setTimeout(() => {
        this.step = 1
        setTimeout(() => {
          this.step = 2
          setTimeout(() => {
            this.step = 0
            let endTime = new Date(new Date().toLocaleDateString()).getTime().toString()
            localStorage.setItem('bingoStart', endTime)
          }, 2000)
        }, 2000)
      }, 200)
    }
    GLOBALS.marchSetsPoint('P_H5PT0311', { 'source_address': GLOBALS.getUrlParam('from') || '' }) // H5平台-bingo冲冲冲页面加载完成
  },
  methods: {
    back () {
      GLOBALS.marchSetsPoint('A_H5PT0311003867') // H5平台-bingo冲冲冲页面-点击关闭页面
      location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL') || '')
    },
    showPop (type, info) {
      this.popType = type
      this.awardsInfo = info
      this.isShowPop = true
    },
    oneMore () {
      GLOBALS.marchSetsPoint('A_H5PT0311003871') // H5平台-bingo冲冲冲页面-点击再来一次bingo按钮
      if (this.payGiftBigIds.length < 1) {
        this.$toast.show({
          message: '所有礼包都能购买哟～',
          duration: 3000,
          isOneLine: true
        })
        return
      }
      let awardsReceive = this.addedAwardRsps.filter(item => item.status === 0)
      if (awardsReceive.length) {
        this.$toast.show({
          message: '请先领取奖励哟～',
          duration: 3000,
          isOneLine: true
        })
        return
      }
      this.showPop('warning')
    },
    end () {
      this.$toast.show({
        message: '活动已结束',
        duration: 3000,
        isOneLine: true
      })
    },
    async _initAct () {
      const { actRes, giftRes } = await initAct()
      if (_get(actRes, 'code', 0) === 200 && _get(giftRes, 'code', 0) === 200) {
        this.actData = _get(actRes, 'data', {})
        this.addedAwardRsps = _get(actRes, 'data.addedAwardRsps', [])
        this.payGiftBigIds = _get(actRes, 'data.payGiftBigIds', [])
        this.bingoInfo = _get(actRes, 'data.addedAwardRsps[6]', {})
        this.giftData = _get(giftRes, 'data', {})
      } else if (_get(actRes, 'code', 0) === 101) {
        this.showPop('end')
      }
    },
    handleClick (item) {
      if (item.type === 1) {
        if (this.actData.state === 1) {
          this.goToPay(item)
        } else {
          this.end()
        }
      } else if (item.status === 0) {
        this._receiveAddedAward(item)
      }
    },
    goToPay (item) {
      if (item.status === 1) {
        GLOBALS.marchSetsPoint('A_H5PT0311003869', { product_id: item.productId }) // H5平台-bingo冲冲冲页面-点击购买礼包
        localStorage.setItem('payment', JSON.stringify(item))
        localStorage.setItem('originDeffer', location.href)
        location.href = 'https://wap.beeplaying.com/xmWap/#/payment/paymentlist'
      }
    },
    async _receiveAddedAward (item) {
      GLOBALS.marchSetsPoint('A_H5PT0311003868', { awards_id: item.addedAwardId }) // H5平台-bingo冲冲冲页面-点击领取bingo奖励按钮
      const res = await receiveAddedAward(item.addedAwardId)
      if (_get(res, 'code', 0) === 200) {
        let arr = _get(res, 'data', [])
        let list = []
        arr.forEach(element => {
          list.push({
            name: element.awardName,
            img: element.awardUrl
          })
        })
        this.showPop('award', {
          list: list,
          desc: ''
        })
      }
    },
    cancelCallback () {
      if (this.popType === 'warning') {
        GLOBALS.marchSetsPoint('A_H5PT0311003872') // H5平台-bingo冲冲冲-再来一次Bingo页面-点击取消
      }
    },
    closeCallback () {
      switch (this.popType) {
        case 'award':
          this._initAct()
          break

        case 'end':
          location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL') || '')
          break
        default:
          break
      }
    },
    confirmCallback () {
      switch (this.popType) {
        case 'warning':
          this._resetUserActivity()
          GLOBALS.marchSetsPoint('A_H5PT0311003873') // H5平台-bingo冲冲冲-再来一次Bingo页面-点击再来一次
          break
        case 'end':
          location.href = window.linkUrl.getBackUrl(localStorage.getItem('APP_CHANNEL') || '')
          break
        default:
          this._initAct()
          break
      }
    },
    async _resetUserActivity () {
      const res = await resetUserActivity()
      if (_get(res, 'code', 0) === 200) {
        this._initAct()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.bingo {
  position: relative;
  font-size: 0.24rem;
  overflow-x: hidden;
  overflow-y: scroll;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(90deg, #750433, #260419);
  .bg {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100vw;
    min-height: 100vh;
    img {
      display: block;
      margin: auto;
    }
  }
  .back {
    position: absolute;
    left: 0;
    top: 0.3rem;
    font-weight: bold;
    color: #a84401;
    background: #ffee4b;
    width: 0.7rem;
    line-height: 0.4rem;
    padding-left: 0.08rem;
    box-sizing: border-box;
    border-radius: 0 0.2rem 0.2rem 0;
  }
  .main-content {
    position: absolute;
    width: 100vw;
    top: 1.1rem;
    .time {
      color: #fff;
      font-weight: 800;
      text-align: center;
      font-size: 0.26rem;
    }
    .title-img {
      width: 6.7rem;
      margin: 0.28rem auto 0;
    }
    .gift-task-wrapper {
      width: 6.7rem;
      height: 6.38rem;
      background: #1e2429;
      border: 0.05rem solid #000;
      border-radius: 0.16rem;
      margin: 0.25rem auto 0;
      box-sizing: border-box;
      padding: 0.2rem 0.18rem;
      position: relative;
      ul {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        li {
          padding: 0.08rem;
          .item {
            width: 1.4rem;
            height: 1.3rem;
            box-sizing: border-box;
            &.item-gift {
              border: 0.02rem #000 solid;
              border-radius: 0.16rem;
              background: #153261;
              position: relative;
              text-align: center;
              color: #e2d6ff;
              font-size: 0.24rem;
              font-weight: bold;
              line-height: 0.3rem;
              padding-top: 0.1rem;
              white-space: nowrap;
              .content {
                position: absolute;
                bottom: 0.02rem;
                left: 0.02rem;
                color: #000510;
                background: #0072ff;
                height: 0.48rem;
                line-height: 0.48rem;
                width: 1.36rem;
                border-radius: 0 0 0.14rem 0.14rem;
              }
              .tips {
                background: #ffee4b;
                color: #a84401;
              }
              &.status-2 {
                background: #021637;
                color: rgba(226, 214, 255, 0.6);
                .content {
                  background: #153261;
                  color: #0072ff;
                }
              }
            }
            &.item-task {
              .name {
                background: #ffee4b;
                border: 2px solid #000;
                border-radius: 0.16rem;
                color: #a84401;
                text-align: center;
                line-height: 0.22rem;
                font-size: 0.2rem;
                height: 0.94rem;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0.14rem;
                box-sizing: border-box;
                margin-bottom: 0.08rem;
                font-weight: bold;
              }
              &.status-0 {
                .percent {
                  background: #ff742f;
                  color: #551c00;
                  border-radius: 0.13rem;
                }
              }
              &.status-2 {
                .name {
                  background: #8a7d00;
                  color: #dcd37c;
                }
                .percent {
                  background: #8a7d00;
                  color: #dcd37c;
                  border-radius: 0.13rem;
                }
              }
            }
            .tips {
              position: absolute;
              padding: 0 0.06rem;
              border: 0.02rem solid #000;
              font-size: 0.18rem;
              line-height: 0.26rem;
              text-align: center;
              top: -0.08rem;
              right: -0.08rem;
            }
          }
        }
      }
      .landscape {
        position: absolute;
        top: 0.2rem;
        left: 0.2rem;
        width: 0;
        height: 1.3rem;
        background: url('./img/landscape.png') no-repeat center left;
        background-size: auto 100%;
        transition: width 1s;
        z-index: -1;
        &.show {
          z-index: 1;
          width: 4.52rem;
        }
      }
      .portrait {
        position: absolute;
        top: 0.2rem;
        left: 0.2rem;
        width: 1.4rem;
        height: 0;
        background: url('./img/portrait.png') no-repeat top center;
        background-size: 100% auto;
        transition: height 1s;
        z-index: -1;
        &.show {
          z-index: 1;
          height: 4.26rem;
        }
      }
    }
    .final-prize-wrapper {
      width: 6.74rem;
      height: 1.36rem;
      background: url('./img/big-awards-bg.png') no-repeat center center;
      background-size: 100% 100%;
      margin: 0.28rem auto 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: center;
      color: #ffeda5;
      & > div:nth-child(1) {
        width: 2rem;
        font-size: 0.22rem;
      }
      & > div:nth-child(2) {
        flex: 1;
        font-size: 0.26rem;
      }
      & > div:nth-child(3) {
        width: 2rem;
      }
      .percent {
        width: 1.45rem;
        margin: 0.1rem auto 0;
      }
    }
    .one-more {
      width: 3.96rem;
      height: 1.16rem;
      background: url('./img/one-more.png') no-repeat center center;
      background-size: 100% 100%;
      display: block;
      margin: 0.38rem auto 0;
      &.end {
        background-image: url('./img/end.png');
      }
    }
    .normal-item {
      width: 1.4rem;
      height: 0.94rem;
      background: #ffee4b;
      border: 2px solid #000;
      border-radius: 0.16rem;
      font-size: 0.2rem;
      font-weight: bold;
      color: #a84401;
    }
    .receive {
      background: #b10050;
      color: #fff;
    }
    .received {
      background: #a11213;
      color: #ff9a9b;
    }
    .btn {
      width: 1.45rem;
      height: 0.5rem;
      line-height: 0.5rem;
      border-radius: 25px;
      font-size: 0.24rem;
      font-weight: 800;
      border: none;
    }
    .percent {
      display: flex;
      align-items: center;
      text-align: center;
      color: #551c00;
      font-size: 0.2rem;
      line-height: 0.26rem;
      font-weight: bold;
      justify-content: center;
      .percent-bg {
        position: relative;
        width: 100%;
        height: 0.26rem;
        border-radius: 0.13rem;
        background: #ffee4b;
        overflow: hidden;
      }
      .percent-content {
        position: absolute;
        height: 100%;
        background: #e3292a;
        box-sizing: border-box;
        border: 0.03rem #ffeda3 solid;
        border-radius: 0.13rem 0 0 0.13rem;
        max-width: 100%;
        &.full-width {
          border-radius: 0.13rem;
        }
      }
      .percent-text {
        position: relative;
      }
    }
  }
}
</style>
