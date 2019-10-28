<template>
  <div class="popup" v-if="value">
    <div class="mask"></div>
    <div class="container">
      <!-- 规则 -->
      <div class="rule" v-if="popupStatus == 1">
        <div class="title"></div>
        <div class="center">
          1.在夺宝期间，消耗夺宝卡投注，每次投 注获得一个夺宝码；每个用户每期可投注 次数有上限，由夺宝商品定义；<br> 
          2.达到开奖条件后，系统随机抽取一个号 码作为幸运码，持有幸运码的用户，获得 当期奖品。 <br>
          3.在夺宝期间，消耗夺宝卡投注，每次投 注获得一个夺宝码；每个用户每期可投注 次数有上限，达到开奖条件后，系统随机 抽取一个号码作为幸运码，持有幸运码的 用户，获得当期奖品。
        </div>
        <div class="confirm" @click="hide">确  定</div>
      </div>
      <!-- 中奖纪录 -->
      <div class="log" v-if="popupStatus == 2">
        <div class="title"></div>
        <div class="list" v-if="showList">
          <div class="list-nav">
            <div class="item">期数</div>
            <div class="item">幸运儿</div>
            <div class="item">夺宝奖品</div>
          </div>
          <ul>
            <li v-for="(item, index) in list" :key="index">
              <div class="item">{{item.periodId}}</div>
              <div class="item">
                {{item.nickName}}
              </div>
              <div class="item">
                {{item.title}}
              </div>
            </li>
          </ul>
        </div>
        <div class="no-list" v-else>
          暂无数据
        </div>
        <div class="confirm" @click="hide">去夺宝</div>
      </div>
      <div class="close" @click="hide"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'popup',
  props: {
    popupStatus: {
      default: 1
    },
    value: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: ()=> ([])
    }
  },
  computed: {
    showList() {
      return this.list.length
    }
  },
  methods: {
    hide() {
      this.$emit('input', false)
      if(this.popupStatus == 1) {
        GLOBALS.marchSetsPoint('A_H5PT0202002079')
      }
      if(this.popupStatus == 2) {
        GLOBALS.marchSetsPoint('A_H5PT0202002081')
      }
    }
  },
  watch: {
    value(newValue) {
      if(newValue && this.popupStatus == 1) {
        GLOBALS.marchSetsPoint('A_H5PT0202002078')
      }
      if(newValue && this.popupStatus == 2) {
        GLOBALS.marchSetsPoint('A_H5PT0202002080')
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .popup {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    z-index: 11;
    .mask {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      z-index: 1;
      background: rgba(0,0,0,.6);
    }
    .container {
      position: absolute;
      left: 50%;
      top: 50%;
      z-index: 2;
      transform: translate(-50%, -50%);
      .rule {
        overflow: hidden;
        width: 4.7rem;
        height: 5.37rem;
        background: url(../img/rule-pop-bg.png) no-repeat center center / 100% 100%;
        .title {
          margin: .38rem 0 .25rem;
          width: 100%;
          height: .38rem;
          background: url(../img/rule-title.png) no-repeat center center / 1.38rem .38rem;
        }
        .center {
          -webkit-overflow-scrolling: touch;
          overflow: scroll;
          margin: 0 auto;
          width: 3.95rem;
          height: 3.33rem;
          font-size: .22rem;
          color: #FFFFFF;
          line-height: .33rem;
        }
        .confirm {
          position: absolute;
          z-index: 3;
          left: 0;
          bottom: 0;
          width: 100%;
          height: .9rem;
          line-height: .9rem;
          text-align: center;
          font-size: .24rem;
          font-weight: bold;
          color: #F0303D;
        }
      }
      .log{
        overflow: hidden;
        width: 4.7rem;
        height: 6.67rem;
        background: url(../img/log-pop-bg.png) no-repeat center center / 100% 100%;
        .title {
          margin: .38rem 0 .25rem;
          width: 100%;
          height: .38rem;
          background: url(../img/log-title.png) no-repeat center center / 1.76rem 100%;
        }
        .list {
          padding: 0 .35rem;
          .list-nav {
            display: flex;
            justify-content: space-between;
            padding-bottom: .2rem;
            border-bottom: 1px solid #fff;
            .item {
              font-size: .22rem;
              color: #fff;
              font-weight: bold;
              white-space: nowrap;
              &:first-child {
                width: .78rem;
              }
              &:nth-child(2) {
                text-align: center;
                flex: 1;
              }
              &:last-child {
                width: 1.4rem;
              }
            }
          }
          ul {
            height: 4.1rem;
            overflow-y: scroll;
            overflow-x: hidden;
            -webkit-overflow-scrolling: touch;
            li {
              display: flex;
              justify-content: space-between;
              justify-items: center;
              padding: .18rem 0;
              white-space: nowrap;
              .item {
                font-size: .22rem;
                color: #fff;
                line-height: .4rem;
                &:first-child {
                  width: .78rem;
                }
                &:nth-child(2) {
                  flex: 1;
                  text-align: center;
                }
                &:last-child {
                  width: 1.4rem;
                }
              }
            }

          }
        }
        .no-list {
          padding-top: 2rem;
          color: #fff;
          text-align: center;
        }
        .confirm {
          position: absolute;
          z-index: 3;
          left: 0;
          bottom: 0;
          width: 100%;
          height: .9rem;
          line-height: .9rem;
          text-align: center;
          font-size: .24rem;
          font-weight: bold;
          color: #F0303D;
        }
      }
      .close {
        position: absolute;
        top: .12rem;
        right: .11rem;
        z-index: 3;
        width: .43rem;
        height: .43rem;
        background: url(../img/close-icon.png) no-repeat center center / 100% 100%
      }
    }
  }
</style>