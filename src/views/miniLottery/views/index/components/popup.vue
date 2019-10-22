<template>
  <div class="popup">
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
        <div class="confirm">确  定</div>
      </div>
      <!-- 中奖纪录 -->
      <div class="log" v-if="popupStatus == 2">
        <div class="title"></div>
        <div class="list">
          <ul>
            <li></li>
          </ul>
        </div>
        <div class="confirm">去夺宝</div>
      </div>
      <div class="close"></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'popup',
  props: {
    popupStatus: {
      default: 1
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
          background: url(../img/rule-title.png) no-repeat center center / 1.76rem 100%;
        }
        .center {
          width: 3.95rem;
          height: 3.33rem;
          font-size: .22rem;
          color: #FFFFFF;
          line-height: .33rem;
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