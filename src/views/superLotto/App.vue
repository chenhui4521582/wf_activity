<template>
  <main class="super-lotto-wrapper">
    <Header @showPop="openPop" />
    <Jackpot @showPop="openPop" />
    <activity-info />
    <article class="number-area-wrapper">
      <section class="title">
        <h4>已合成{{numberArrLength}}注号码</h4>
        <span @click="openPop(13)">上期开奖结果></span>
      </section>
      <ul class="number-area">
        <li v-for="(items,index) in numberArr" :key="`line-${index}`">
          <span class="line-number">{{index+1}}</span>
          <span class="number first-number">{{items[0]|numberFilter}}</span>
          <span class="number second-number">{{items[1]|numberFilter}}</span>
          <span class="number third-number">{{items[2]|numberFilter}}</span>
          <span class="number fourth-number">{{items[3]|numberFilter}}</span>
          <span class="edit-btn" v-if="showEdit(items)">编辑</span>
        </li>
      </ul>
      <div class="add-btn">
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
          <div class="btn">
            确 定
          </div>
        </div>
      </transition>
    </article>
    <bottom-btns @showPop="openPop" />
    <pop-up v-model="popType" v-show="isShowPop" @closePop="closePop" />
  </main>
</template>

<script>
import Header from './component/header.vue'
import Jackpot from './component/jackpot.vue'
import ActivityInfo from './component/activityInfo.vue'
import BottomBtns from './component/bottomBtns.vue'
import PopUp from './component/popUp.vue'
export default {
  name: '',
  components: {
    Header,
    Jackpot,
    ActivityInfo,
    BottomBtns,
    PopUp
  },
  data () {
    return {
      numberArr: [],
      isShowPop: false,
      isShowMyNumBox: false,
      numberList: [
        { value: 0, num: 888 },
        { value: 1, num: 888 },
        { value: 2, num: 888 },
        { value: 3, num: 888 },
        { value: 4, num: 888 },
        { value: 5, num: 888 },
        { value: 6, num: 888 },
        { value: 7, num: 888 },
        { value: 8, num: 888 },
        { value: 9, num: 888 }
      ],
      popType: 0
    }
  },
  computed: {
    numberArrLength () {
      return this.numberArr.length
    }
  },
  filters: {
    numberFilter (number) {
      return number || (number === 0 ? 0 : '?')
    }
  },
  mounted () {
    // var arr = [...(new Array(1000)).fill(0), ...(new Array(1000)).fill(1), ...(new Array(1000)).fill(2), ...(new Array(1000)).fill(3), ...(new Array(1000)).fill(4), ...(new Array(1000)).fill(5), ...(new Array(1000)).fill(6), ...(new Array(1000)).fill(7), ...(new Array(1000)).fill(8), ...(new Array(1000)).fill(9)]
    // arr.sort(function () {
    //   return Math.random() - 0.5
    // })
    // arr.sort(function () {
    //   return Math.random() - 0.5
    // })
    // this.numberArr = this.arrTrans(4, arr)
  },
  methods: {
    showEdit (items) {
      const all = (arr, fn = Boolean) => arr.every(fn)
      return all(items, x => (x || x === 0))
    },
    arrTrans (num, arr) {
      const newArr = []
      while (arr.length > 0) {
        newArr.push(arr.splice(0, num))
      }
      return newArr
    },
    openPop (type) {
      this.popType = type
      this.isShowPop = true
    },
    closePop (type) {
      this.isShowPop = false
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
