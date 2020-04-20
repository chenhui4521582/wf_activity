<template>
  <main class="super-lotto-wrapper">
    <Header :info="actInfoData" @showPop="openPop" @showDropDown="showDropDown" />
    <Jackpot :info="actInfoData" @showPop="openPop" />
    <activity-info :info="actInfoData" />
    <article class="number-area-wrapper">
      <section class="title">
        <h4>已合成{{numGroupLength}}注号码</h4>
        <span v-if="whatDay" @click="openPop(13)">上期开奖结果></span>
      </section>
      <ul class="number-area">
        <li v-for="(items,index) in numGroup" :key="`line-${index}`">
          <span class="line-number">{{index+1}}</span>
          <span class="number"
            :class="{'is-select':selectedIndex===0 && selectedLineIndex=== index}"
            @click="editItem(index,items,0)">{{items.numGroup[0]|numberFilter}}</span>
          <span class="number"
            :class="{'is-select':selectedIndex===1 && selectedLineIndex=== index}"
            @click="editItem(index,items,1)">{{items.numGroup[1]|numberFilter}}</span>
          <span class="number"
            :class="{'is-select':selectedIndex===2 && selectedLineIndex=== index}"
            @click="editItem(index,items,2)">{{items.numGroup[2]|numberFilter}}</span>
          <span class="number"
            :class="{'is-select':selectedIndex===3 && selectedLineIndex=== index}"
            @click="editItem(index,items,3)">{{items.numGroup[3]|numberFilter}}</span>
          <span class="edit-btn" v-if="showEdit(items)" @click="editLine(items,index)">编辑</span>
        </li>
      </ul>
      <div class="add-btn" @click="addNewGroup">
        <span>新增一组号码</span>
        <img src="./img/plus-icon.png" alt="">
      </div>
    </article>
    <article class="my-number-box" v-show="isShowMyNumBox" @click="">
      <div class="pop-mask" @click="isShowMyNumBox=false"></div>
      <transition name="fade">
        <div class="my-number-list" v-show="isShowMyNumBox">
          <p>获得的号码会在次日零点清零并重新累计，请尽快使用</p>
          <ul>
            <li v-for="(item,index) in numberList">
              <span>{{item.value}}</span>
              <span class="num">{{item.num}}</span>
            </li>
          </ul>
          <div class="btn" @click="saveNum">
            确 定
          </div>
        </div>
      </transition>
    </article>
    <bottom-btns :user-num-count="userNumCount" @showPop="openPop" @showDropDown="showDropDown" />
    <drop-down ref="dropDown" v-model="dropDownType" :toDayUserCouponNum="actInfoData.totalNum"
      @refresh="refresh" :endDate="actInfoData.endDate" @showPop="openPop">
    </drop-down>
    <pop-up :info="actInfoData" :last-award-info="lastAwardInfo" :number-list="numberList"
      :award-info="awardTipsInfo" v-model="popType" v-show="isShowPop" @closePop="closePop" />
  </main>
</template>

<script>
import Header from './component/header.vue'
import Jackpot from './component/jackpot.vue'
import ActivityInfo from './component/activityInfo.vue'
import BottomBtns from './component/bottomBtns.vue'
import PopUp from './component/popUp.vue'
import DropDown from './dropDown.vue'
import { activityInfo, userAwardInfo, userAwardsTips, userNumGroups, userNumInfo, addNumGroup, modifyNumGroup } from './services/api'
import _get from 'lodash.get'
export default {
  name: '',
  components: {
    Header,
    Jackpot,
    ActivityInfo,
    BottomBtns,
    PopUp,
    DropDown
  },
  data () {
    return {
      actInfoData: {},
      awardTipsInfo: {},
      numGroup: [],
      isShowPop: false,
      isShowMyNumBox: false,
      numberList: [],
      popType: 0,
      dropDownType: 0,
      selectedIndex: null,
      selectedLineIndex: null,
      isHasPopTip: false,
      page: 1,
      userNumCount: 0,
      lastAwardInfo: {}
    }
  },
  computed: {
    numGroupLength () {
      return this.numGroup.filter(items => items.id && items.numGroup && items.numGroup.length).length
    },
    whatDay () {
      return this.actInfoData.whatDay
    }
  },
  filters: {
    numberFilter (number) {
      return number || (number === 0 ? 0 : '?')
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    async init () {
      this.page = 1
      const res = await activityInfo()
      this.page++
      this.actInfoData = _get(res, 'data', {})
      this.numGroup = _get(res, 'data.numGroup', [])
      this.userNumCount = this.actInfoData.userNumCount
      if (this.actInfoData.state === 3 && !this.isHasPopTip) {
        this.isHasPopTip = true
        this.openPop(6)
      }
      if (this.actInfoData.tipFlog === 0) {
        this._userAwardsTips()
      }
      this.selectedIndex = null
      this.selectedLineIndex = null
    },
    async _userAwardsTips () {
      const res = await userAwardsTips()
      this.awardTipsInfo = _get(res, 'data', {})
      let type = 5
      if (this.awardTipsInfo.awardNum) {
        type = 4
      }
      this.openPop(type)
    },
    async _userAwardInfo () {
      const res = await userAwardInfo()
      this.lastAwardInfo = _get(res, 'data', {})
      this.isShowPop = true
    },
    async _userNumGroups () {
      const res = await userNumGroups(this.page)
      let arr = _get(res, 'data', [])
      this.numGroup = [...this.numGroup, ...arr]
    },
    _getNumberList ({ eightNum, fiveNum, fourNum, nineNum, oneNum, sevenNum, sixNum, threeNum, twoNum, zeroNum }) {
      this.numberList = [
        { value: 1, num: oneNum },
        { value: 2, num: twoNum },
        { value: 3, num: threeNum },
        { value: 4, num: fourNum },
        { value: 5, num: fiveNum },
        { value: 6, num: sixNum },
        { value: 7, num: sevenNum },
        { value: 8, num: eightNum },
        { value: 9, num: nineNum },
        { value: 0, num: zeroNum },
      ]
    },
    async _userNumInfo () {
      const res = await userNumInfo()
      let data = _get(res, 'data', {})
      this._getNumberList(data)
      this.userNumCount = data.numCount
      this.isShowPop = true
    },
    showEdit (items) {
      if (items.numGroup && items.numGroup.length === 4) {
        const all = (arr, fn = Boolean) => arr.every(fn)
        return all(items.numGroup, x => (x || x === 0))
      } else {
        return false
      }
    },
    openPop (type, data) {
      this.popType = type
      switch (type) {
        case 8:
          this._getNumberList(data)
          this.isShowPop = true
          break
        case 12:
        case 15:
          this._userNumInfo()
          break
        case 13:
          this._userAwardInfo()
          break

        default:
          this.isShowPop = true
          break
      }
    },
    closePop (type) {
      this.isShowPop = false
    },
    refresh () { },
    showDropDown (type) {
      this.dropDownType = type
    },
    addNewGroup () {
      this.selectedIndex = 0
      this.numGroup.push({ numGroup: [] })
      this.selectedLineIndex = this.numGroup.length - 1
    },
    editLine (items, index) {
      items.numGroup = []
      this.selectedLineIndex = index
      this.selectedIndex = 0
      this.isShowMyNumBox = true
    },
    editItem (index) {
      this.selectedIndex = index
      this.isShowMyNumBox = true
    },
    saveNum () { },
    async _addNumGroup (item) {
      if (item.numGroup.length === 4) {
        const res = await addNumGroup({ newNumGroup: item })
      }
    },
    async _modifyNumGroup (item) {
      const res = await modifyNumGroup({ id: item.id, newNumGroup: ite.numGroup })
    }
  }
}
</script>

<style lang="less" scoped>
.super-lotto-wrapper {
  min-height: 100vh;
  box-sizing: border-box;
  background: #ff7900 url('./img/bg.png') no-repeat center top;
  background-size: 100% auto;
  padding-top: 0.1rem;
  font-size: 0.24rem;
  font-family: Alibaba PuHuiTi;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  .number-area-wrapper {
    width: 6.7rem;
    margin: 0.14rem auto 0;
    .title {
      position: relative;
      text-align: center;
      margin-bottom: 0.1rem;
      h4 {
        font-size: 0.3rem;
        color: #fff2d1;
        font-weight: bold;
      }
      span {
        position: absolute;
        right: 0;
        top: 0.04rem;
        font-size: 0.24rem;
        font-weight: 400;
        text-decoration: underline;
        color: #f7dd9f;
      }
    }
    .number-area {
      li {
        height: 1.5rem;
        margin-bottom: 0.2rem;
        background: url('./img/list-item-bg.png') no-repeat center center;
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        .line-number {
          position: absolute;
          top: 0;
          left: 0;
          width: 0.42rem;
          height: 0.36rem;
          font-size: 0.24rem;
          line-height: 0.4rem;
          color: #edf5fd;
          text-align: center;
        }
        .number {
          color: #ffa32c;
          background: #c04102;
          border-radius: 50%;
          max-width: 1rem;
          min-width: 1rem;
          height: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.48rem;
          margin: 0 0.26rem 0 0.14rem;
          &.is-select {
            border: 1px solid #fdd130;
          }
        }
        .edit-btn {
          position: absolute;
          right: 0.2rem;
          color: #fdd130;
          font-size: 0.24rem;
          font-weight: 400;
          text-decoration: underline;
        }
      }
    }
    .add-btn {
      background: #fdd130;
      color: #c04102;
      font-size: 0.3rem;
      border-radius: 0.3rem;
      width: 2.72rem;
      height: 0.62rem;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0.2rem auto 1.8rem;
      img {
        width: 0.44rem;
        height: 0.44rem;
        margin-left: 0.12rem;
      }
    }
  }
  .my-number-box {
    position: fixed;
    z-index: 1;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    .pop-mask {
      width: 100%;
      height: 100%;
      position: fixed;
      left: 0;
      top: 0;
      background: rgba(0, 0, 0, 0.6);
      z-index: 1;
    }
    .my-number-list {
      background: #ffa200;
      border-radius: 0.2rem 0.2rem 0 0;
      height: 4.06rem;
      box-sizing: border-box;
      position: fixed;
      bottom: 0;
      z-index: 1;
      color: #c04102;
      text-align: center;
      font-size: 0.28rem;
      padding: 0.24rem;
      ul {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
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
          margin: 0.24rem 0.2rem 0;
          .num {
            position: absolute;
            display: block;
            font-size: 0.18rem;
            color: #ff7101;
            background: #fce6bf;
            width: 0.36rem;
            height: 0.36rem;
            line-height: 0.36rem;
            text-align: center;
            border-radius: 50%;
            right: -0.1rem;
            bottom: -0.1rem;
          }
        }
      }
      .btn {
        margin: 0.24rem auto 0;
        color: #ff7101;
        font-size: 0.3rem;
        font-weight: bold;
        text-align: center;
        width: 3.9rem;
        height: 0.68rem;
        line-height: 0.68rem;
        background: #fdd130;
        border-radius: 0.3rem;
      }
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}

/*低端机型之前的样式会有严重的展示问题，暂且用下面代替*/
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
