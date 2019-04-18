<template>
  <div class="ranking-time">
    <img class="bg" src="../images/time-bg.png" alt="" />
    <div class="time-body">
      <ul>
        <li class="over">
          <div class="title">时间结束</div>
          <div class="time">
            08:00-09:00
          </div>
          <div class="status">
            已过期
          </div>
        </li>
        <li class="now">
          <div class="title">
            倒计时{{'00:00'}}
          </div>
          <div class="time">
            08:00-09:00
          </div>
          <div class="status">
            正在进行
          </div>
        </li>
        <li class="future last">
          <div class="title">敬请期待</div>
          <div class="time">
            08:00-09:00
          </div>
          <div class="status">
            即将开始
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
	name: 'rankingTime'
  }
</script>

<style scoped lang="less">
.ranking-time {
  position: relative;
  .bg {
    width: 100%;
    vertical-align: top;
  }
  .time-body {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 2;
    padding: .15rem .65rem;
    box-sizing: border-box;
    ul {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      li {
        width: 1.89rem ;
        margin-right: .12rem;
        text-align: center;
        &.over {
          height: 1rem;
          background: url("../images/end-time.png") no-repeat center top / 100% 100%;
          color: #342C29;
          &.title {
            color: #484443;
          }
        }
        &.now {
          height: 1.14rem;
          background: url("../images/now-time.png") no-repeat center top / 100% 100%;
          color: #73402D;
          .title {
            font-size: .22rem;
            color: #66291B;
          }
          .status {
            color: #fff;
          }
        }
        &.future {
          height: 1rem;
          background: url("../images/future-time.png") no-repeat center top / 100% 100%;
          color: #885E48;
          .title {
            color: #3C261E;
          }

        }
        &.last {
          margin-right: 0;
        }
        .title {
          text-align: center;
          height: .36rem;
          line-height: .36rem;
          font-size: .2rem;
        }
        .time {
          margin: .08rem auto;
          font-weight: bold;
        }
        .status {
          font-size: .18rem;
        }
      }
    }
  }
}
</style>
