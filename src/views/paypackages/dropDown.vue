<template>
  <div>
    <div class="pop-mask" v-if="curIndex" @touchmove.prevent></div>
    <transition name="fade">
      <div class="drop-down" v-if="curIndex">
        <div class="drop-down-content">
          <div class="bottom-wrap top">
          </div>
          <div class="exchange_container">
            <div class="exchange_info">
              <div class="item">
                当前拥有钻石：{{actInfoData&&actInfoData.remnantNum}}
              </div>
              <div class="item" @click="showPop(2)">换取记录>></div>
            </div>
            <div class="exchange_list">
              <div class="item" v-for="item in exchangeList">
                <div class="item_bg">
                  <img :src="`${require(`./images/awards/${item.awardsType}.png`)}`" alt="">
                  <div class="awards_name">{{item.awardsName}}</div>
                </div>
                <div class="item_btn" @click="exchagePrize(item)">{{item.consume}}<img src="./images/dropDown_gemstone.png" alt=""></div>
              </div>
            </div>
          </div>
          <!-- 右下角图标 -->
          <img src="./images/close.png" class="icon-back" @click.stop="close">
        </div>
      </div>
    </transition>
  </div>
</template>
<script type="text/javascript">
  import {getAwardsList} from './utils/api'

  export default {
    data () {
      return {
        curIndex: this.value,
        remanentNum: 0,
        exchangeList: []
      }
    },
    props: {
      value: {
        type: Number,
        default: 0
      },
      actInfoData: {
        type: Object,
        default: null
      },
      endDate: {
        type: String,
        default: ''
      }
    },
    methods: {
      innerHandleTab (idx) {
        this.handleTab(idx + 1)
      },
      outHandleTab () {
        this.curIndex = 1
        this.getAwardsList()
      },
      handleTab (idx) {
        this.curIndex = idx
      },
      close () {
        this.curIndex = 0
      },
      move (e) {
        e.preventDefault()
      },
      async getAwardsList () {
        let {code, data} = await getAwardsList()
        if (code == 200) {
          this.exchangeList = data
        }
      },
      showPop (poptype) {
        this.$emit('showPop', poptype)
      },
      exchagePrize (item) {
        this.$emit('exchagePrize', Object.assign(item, {
          sureChange: false
        }))
      }
    },
    watch: {
      curIndex (value) {
        if (value) {
          document.body.style.overflow = 'hidden'
          document.addEventListener('touchmove', this.move, {passive: false})
        } else {
          document.body.style.overflow = null
          document.removeEventListener('touchmove', this.move, {passive: false})
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .bottom-wrap {
    position: fixed;
    left: 0;
    width: 100vw;
    display: flex;
    padding: 0.2rem 0.2rem 0.16rem;
    box-sizing: border-box;
    &:not(.top) {
      bottom: 0;
    }
  }

  .drop-down {
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    z-index: 2;
  }

  .pop-mask {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1;
  }

  .drop-down-content {
    width: 100%;
    height: 100%;
    max-height: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    overflow-y: scroll;
    font-size: 0.2rem;
    z-index: 12;
    background: url("./images/dropDown_bg.png");
    background-size: 100% 100%;
    max-height: 11.21rem;
    .d-tab {
      overflow-y: hidden;
      width: 100%;
      position: relative;
      z-index: 15;
      ul {
        display: flex;
        li {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.3rem;
          font-weight: bold;
        }
      }
    }
  }

  .icon-back {
    width: 0.89rem;
    height: 0.89rem;
    position: absolute;
    right: 0.1rem;
    bottom: 0.98rem;
    z-index: 10;
  }
  .exchange_container {
    position: relative;
    //z-index: 1;
    padding: 2rem 0 .13rem;
    box-sizing: border-box;
    .exchange_info {
      margin: 0 .2rem;
      padding: 0 .3rem;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height:.56rem;
      background: #631256;
      border-radius:.28rem;
      .item {
        font-size: .3rem;
        font-weight: bold;
        &:nth-child(1) {
          display: flex;
          align-items: center;
          font-weight: 500;
          color: #FFE9BD;
        }
        &:nth-child(2) {
          font-weight: 400;
          color: #FF8EC9;
          padding-left: .12rem;
          border-left: 1px solid #FFB163;
        }
      }
    }
    .exchange_list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      .item {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: .3rem;
        width: 1.96rem;
        height: 2.48rem;
        background: url("./images/dropDown_itembg.png");
        background-size: 100% 100%;
        .item_bg {
          height: 1.6rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          .awards_name {
            height: .7rem;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: .26rem;
            font-weight: 400;
            color: #FFE9BD;
            text-align: center;
          }
          img {
            width: 1.75rem;
            margin-top: .11rem;
          }
        }
        .item_btn {
          margin-top: .07rem;
          width: 1.73rem;
          height: .68rem;
          background: url("./images/exchange_btn.png");
          background-size: 100% 100%;
          font-size: .22rem;
          font-weight: 500;
          color: #FFFFFF;
          display: flex;
          justify-content: center;
          align-items: center;
          img{
            margin-left: .06rem;
            width: .29rem;
            height: .26rem;
          }
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
