<template>
  <div class="spec-warp">
    <div class="spec-item">
      <div class="item-title">规格</div>
      <div class="item-content-spec">
        <span class="item-content-child item-active" v-if="info.specs" >
          {{info.specs}}
        </span>
      </div>
    </div>
    <div class="spec-item">
      <div class="item-title">已选</div>
      <div class="item-content item-content-title">{{info.specs}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'specifications',
  props: {
    info: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
<style lang="less" scoped>
.spec-warp {
  overflow: hidden;
  margin-bottom: .2rem;
  width: 100%;
  padding: .3rem .2rem 0 .2rem;
  border-radius: .16rem;
  background-color: #ffffff;
  box-sizing: border-box;
  .spec-item {
    display: flex;
    align-items: center;
    margin-bottom: .25rem;
    .item-title {
      width: .7rem;
      color: #888;
      font-size: .24rem;
    }
    .item-content-spec {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: .42rem;
      .item-content-child {
        padding: 0 .2rem;
        margin-right: .3rem;
        min-width: 1.2rem;
        height: .42rem;
        line-height: .42rem;
        background-color: #ededed;
        border-radius: .1rem;
        font-size: .24rem;
        color: #888888;
        text-align: center;
        box-sizing: border-box;
      }
      .item-active {
        background-color: #ff4141;
        color: #fff;
      }
    }
    .item-content {
      flex: 1;
      display: flex;
      .item-number-title {
        color: #acacac;
        font-size: .24rem;
        flex: 1;
        line-height: .42rem;
      }
      .item-number-add {
        display: flex;
        align-items: center;
      }
    }
    .item-content-title {
      font-size: .24rem;
      color: #ff4141;
    }
  }
  .spec-item-line {
    border-bottom: 2px solid #e6e6e6;
    margin-bottom: .2rem;
  }
  &.description-info{
    padding: .3rem .2rem;
    font-size: .24rem;
    font-weight: 400;
    color:rgba(0,0,0,1);
    i{
      color:rgba(136,136,136,1);
      margin-right: .23rem;
    }
  }
}
</style>