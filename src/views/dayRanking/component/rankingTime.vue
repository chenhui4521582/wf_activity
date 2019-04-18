<template>
  <div class="ranking-time">
    <img class="bg" src="../images/time-bg.png" alt="" />
    <div class="time-body">
      <ul>
        <li class="end">
          <div class="title"></div>
        </li>
        <li class="now"></li>
        <li class="end last"></li>
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
    padding: .1rem .65rem;
    box-sizing: border-box;
    ul {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      li {
        width: 1.89rem ;
        margin-right: .12rem;
        &.now {
          height: 1.14rem;
          background: url("../images/now-time.png") no-repeat center top / 100% 100%;
        }
        &.end {
          height: 1rem;
          background: url("../images/end-time.png") no-repeat center top / 100% 100%;
        }
        &.last {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
