<template>
  <div class="header">
    <ul>
      <li class="blessings-num">
        <p class="key">
          <img src="../images/bellsing-icon.png" alt="">我的福气值
        </p>
        <p class="value">
          {{userInfo.amount}}
        </p>
        <div class="line"></div>
      </li>
      <li class="my-ranking">
        <p class="key">
          <img src="../images/ranking-icon.png" alt="">我的排名
        </p>
        <p class="value">
          {{userInfo.ranking}}
        </p>
        <div class="line"></div>
      </li>
      <li class="my-price">
        <p class="key">
          <img src="../images/price-icon.png" alt="">当前奖励
        </p>
        <p class="value" :title="userInfo.currentPrize">
          {{userInfo.currentPrize}}
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
	name: 'blessing-header',
    props: {
	  userInfo: Object
	}

  }
</script>

<style scoped lang="less">
.header {
  color: #fff;
  background: rgba(32,3,126,.73);
  ul {
    display: flex;
    justify-content: space-between;
  }
  li {
    flex: 1;
    height: .9rem;
    position: relative;
    overflow: hidden;
    .line {
      position: absolute;
      right: 0;
      top: .2rem;
      width: 1px;
      height: .5rem;
      background:rgba(255,255,255,1);
    }
    .key {
      margin-top: .14rem;
      font-size: .28rem;
      line-height: .33rem;
      text-align: center;
      img {
        margin-right: .04rem;
        width: .33rem;
        height: .33rem;
        vertical-align: top;
      }
    }
    .value {
      padding: 0 .1rem;
      margin-top: .1rem;
      text-align: center;
      color: #FFD847;
      font-size: .24rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow:ellipsis;
    }
    &.blessings-num {

    }
    &.my-ranking {

    }
    &.my-price {
      .value{
        font-size: .18rem;
      }

    }
  }
}
</style>
