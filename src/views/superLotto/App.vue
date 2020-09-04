<template>
  <main class="super-lotto-wrapper" :class="{end:isEnd}" ref="area" v-if="actInfoData">
    <template v-if="!isEnd">
      <Header :info="actInfoData" @showPop="openPop" @showDropDown="showDropDown" />
      <Jackpot :info="actInfoData" @showPop="openPop" />
      <activity-info :info="actInfoData" />
      <article class="number-area-wrapper">
        <section class="title">
          <h4>已合成{{actInfoData.userNumGroupCount}}注号码</h4>
          <span v-if="actInfoData.whatDay!==1" @click="openPop(13)">上期开奖结果></span>
        </section>
        <ul class="number-area">
          <template v-if="numGroup&&numGroup.length">
            <li v-for="(items,index) in numGroup" :key="`line-${index}`">
              <span class="line-number">{{index+1}}</span>
              <span class="number">{{items.numGroup[0]|numberFilter}}</span>
              <span class="number">{{items.numGroup[1]|numberFilter}}</span>
              <span class="number">{{items.numGroup[2]|numberFilter}}</span>
              <span class="number">{{items.numGroup[3]|numberFilter}}</span>
              <span class="edit-btn" v-if="showEdit(items)" @click="editLine(items,index)">编辑</span>
            </li>
          </template>
          <template v-else>
            <li>
              <span class="line-number">0</span>
              <span class="number" v-for="item in 4" :key="`empty-${item}`">?</span>
            </li>
          </template>
        </ul>
        <div class="add-btn" @click="addNewGroup">
          <span>新增一组号码</span>
          <img src="./img/plus-icon.png" alt="">
        </div>
      </article>
      <article class="my-number-box" v-show="isShowMyNumBox" @click="">
        <div class="pop-mask" @click="closeMyNumBox(true)"></div>
        <transition name="fade">
          <div class="my-number-list" v-show="isShowMyNumBox">
            <p>获得的号码会在次日零点清零并重新累计，请尽快使用</p>
            <ul class="edit-number-area">
              <li v-for="(item,index) in editNumber.newNumGroup"
                :class="{selected:item===0||item>0}" @click="delNum(item,index)">
                {{item|numberFilter}}</li>
            </ul>
            <ul>
              <li v-for="(item,index) in numberList"
                :class="{selected:editNumber.newNumGroup.includes(item.value),empty:item.num===0}"
                @click="selectNumber(item)">
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
    </template>
    <template v-else>
      <profit :is-full="true" @showPop="openPop" />
    </template>
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
import Profit from './component/profit/index.vue'
import DropDown from './dropDown.vue'
import utils from '@/common/js/utils'

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
    DropDown,
    Profit
  },
  data () {
    return {
      actInfoData: {},
      awardTipsInfo: {},
      numGroup: [],
      isShowPop: false,
      isShowMyNumBox: false,
      numberList: [],
      oldNumberList: '',
      popType: null,
      dropDownType: 0,
      selectedIndex: null,
      selectedLineIndex: null,
      isHasPopTip: false,
      page: 1,
      userNumCount: 0,
      editLineIndex: null,
      lastAwardInfo: {},
      el: {},
      editNumber: { newNumGroup: [null, null, null, null] },
      finished: false,
      loading: false,
      isEnd: true
    }
  },
  computed: {
    curChannel () {
      return localStorage.getItem('APP_CHANNEL') || utils.getUrlParam('channel')
    },
    sourceAddress () {
      return utils.getUrlParam('from')
    }
  },
  filters: {
    numberFilter (number) {
      return number || (number === 0 ? 0 : '?')
    }
  },
  mounted () {
    this.init()
    GLOBALS.marchSetsPoint('P_H5PT0277', { source_address: this.sourceAddress }) // H5平台-超级大赢家活动-页面加载完成

    this.el = this.$refs.area
    this.$nextTick(() => {
      this.el.addEventListener('touchend', this.onScroll)
    })
  },
  methods: {
    onScroll () {
      let bottom = this.el.getBoundingClientRect().bottom
      let height = window.innerHeight
      if (bottom - height < 50) {
        this._userNumGroups()
      }
    },
    removeScroll () {
      this.el.removeEventListener('touchend', this.onScroll)
    },
    async init () {
      this.page = 1
      const res = await activityInfo()
      this.page++
      this.actInfoData = _get(res, 'data', {})
      this.numGroup = _get(res, 'data.numGroup', [])
      this.userNumCount = this.actInfoData.userNumCount
      this.finished = false
      this.selectedIndex = null
      this.selectedLineIndex = null
      await this._userNumInfo()
      if (this.actInfoData.state === 2 || this.actInfoData.whatDay === 0) {
        this.isEnd = true
      } else {
        this.isEnd = false
      }
      if (this.actInfoData.state === 3 && !this.isHasPopTip) {
        this.isHasPopTip = true
        this.openPop(6)
      } else if (this.actInfoData.tipFlog === 0) {
        this._userAwardsTips()
      }
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
      if (this.lastAwardInfo && this.lastAwardInfo.awardNumGroup) {
        this.isShowPop = true
      } else {
        this.openPop(6)
      }
    },
    async _userNumGroups () {
      if (this.finished || this.loading) {
        return
      }
      this.loading = true
      const res = await userNumGroups(this.page)
      this.loading = false
      let arr = _get(res, 'data', [])
      if (arr.length) {
        this.finished = false
        this.numGroup = [...this.numGroup, ...arr]
        this.page++
      } else {
        this.finished = true
      }
    },
    _getNumberList ({ numCount, eightNum, fiveNum, fourNum, nineNum, oneNum, sevenNum, sixNum, threeNum, twoNum, zeroNum }) {
      this.userNumCount = numCount
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
        { value: 0, num: zeroNum }
      ]
    },
    async _userNumInfo (isShowPop = false) {
      const res = await userNumInfo()
      let data = _get(res, 'data', {})
      this._getNumberList(data)
      this.isShowPop = isShowPop
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
          this._userNumInfo(true)
          break
        case 13:
          GLOBALS.marchSetsPoint('A_H5PT0277003310') // H5平台-超级大赢家活动-上期开奖结果点击
          this._userAwardInfo()
          break

        default:
          this.isShowPop = true
          break
      }
    },
    closePop (isSure) {
      this.isShowPop = false
      if (isSure) {
        switch (this.popType) {
          case 8:
            this.showDropDown(0)
            break
          case 10:
            this.showDropDown(1)
            break
          case 15:
            this.init()
            break
          default:
            break
        }
      }
      this.popType = null
    },
    refresh (data) {
      if (data && data.numCount) {
        this.userNumCount = data.numCount
      }
    },
    showDropDown (type) {
      this.dropDownType = type
    },
    async addNewGroup () {
      GLOBALS.marchSetsPoint('A_H5PT0277003306') // H5平台-超级大赢家活动-新增一组号码按钮点击
      await this._userNumInfo()
      if (this.userNumCount < 4) {
        this.openPop(10)
        return
      }
      this.editNumber = { newNumGroup: [null, null, null, null] }
      this.oldNumberList = JSON.stringify(this.numberList)
      this.isShowMyNumBox = true
    },
    async editLine (items, index) {
      await this._userNumInfo()
      this.editLineIndex = index
      this.editNumber = { id: items.id, newNumGroup: [...items.numGroup] }
      this.oldNumberList = JSON.stringify(this.numberList)
      this.isShowMyNumBox = true
    },
    closeMyNumBox (needRestore) {
      this.editNumber = { newNumGroup: [null, null, null, null] }
      this.editLineIndex = null
      if (needRestore) {
        this.numberList = JSON.parse(this.oldNumberList)
      }
      this.isShowMyNumBox = false
    },
    delNum (item, index) {
      let numIndex = this.numberList.findIndex(element => element.value === item)
      this.numberList[numIndex].num++
      this.editNumber.newNumGroup[index] = null
    },
    selectNumber (item) {
      if (item.num) {
        let index = this.editNumber.newNumGroup.findIndex(element => element === null)
        if (index >= 0) {
          this.editNumber.newNumGroup[index] = item.value
          item.num--
        }
      } else {
        this.$toast.show({
          message: '所选号码数量不足',
          duration: 1000,
          isOneLine: true
        })
      }
    },
    saveNum () {
      if (this.editNumber.newNumGroup.findIndex(element => element === null) >= 0) {
        this.$toast.show({
          message: '需要4个号码才能保存哦~',
          duration: 1000,
          isOneLine: true
        })
        return
      }
      if (this.editNumber.id) {
        this._modifyNumGroup()
      } else {
        this._addNumGroup()
      }
    },
    async _addNumGroup () {
      const res = await addNumGroup({ newNumGroup: [this.editNumber.newNumGroup] })
      let code = _get(res, 'code', 0)
      if (code === 200) {
        this.closeMyNumBox()
        this.$toast.show({
          message: '保存成功',
          duration: 1000,
          isOneLine: true
        })
        this.init()
      }
    },
    async _modifyNumGroup () {
      const res = await modifyNumGroup({ id: this.editNumber.id, newNumGroup: this.editNumber.newNumGroup })
      let code = _get(res, 'code', 0)
      let data = _get(res, 'data', {})
      if (code === 200) {
        this.numGroup[this.editLineIndex].numGroup = this.editNumber.newNumGroup
        this.$toast.show({
          message: '保存成功',
          duration: 1000,
          isOneLine: true
        })
        this.closeMyNumBox()
        this._getNumberList(data)
      }
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
  /*overflow-y: scroll;*/
  /*-webkit-overflow-scrolling: touch;*/
  &.end {
    background: #ffa200;
  }
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
          top: 50%;
          margin-top: -0.16rem;
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
      height: 6rem;
      box-sizing: border-box;
      position: fixed;
      bottom: 0;
      z-index: 1;
      color: #c04102;
      text-align: center;
      font-size: 0.28rem;
      padding: 0.24rem;
      width: 100%;
      p {
        white-space: nowrap;
        margin: 0 -0.24rem;
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        li {
          width: 0.86rem;
          height: 0.86rem;
          border-radius: 50%;
          background: #ff7101;
          font-size: 0.44rem;
          color: #c04102;
          font-weight: bold;
          line-height: 0.86rem;
          text-align: center;
          margin: 0.12rem 0.2rem 0.24rem;
          &.selected {
            background: #fff;
          }
          &.empty {
            background: #a6a29c;
            color: #fff;
          }
          .num {
            display: block;
            font-size: 0.2rem;
            color: #fff;
            line-height: 0.36rem;
            text-align: center;
          }
        }
      }
      .edit-number-area {
        border-radius: 0.16rem;
        border: 0.02rem solid #fff;
        margin: 0.4rem auto 0.2rem;
        li {
          margin: 0.24rem 0.36rem;
          width: 0.66rem;
          height: 0.66rem;
          line-height: 0.66rem;
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
