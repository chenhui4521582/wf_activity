<template>
  <div class="list">
    <ul v-if="showList">
      <template v-for="(item, index) in list">
        <li :key="index" :class="{'hot':index == 0}" v-if="index == 0">
          <div class="img">
            <img :src="item.picture | filter" alt="">
          </div>
          <div class="text">
            <div class="title">{{item.title}}</div>
            <div class="desc">三网直充 / 3~5个工作日到帐</div>
            <div class="edit">
              已抢2630次，至少开奖60次
            </div>
            <div class="count-down">
              夺宝剩余 
              26时20分32秒
            </div>
            <div class="btn">立即夺宝</div>
          </div>
        </li>
        <li :key="index" class="item" v-else>
          <div class="count-down">
            夺宝剩余 26时20分32秒
          </div>
          <div class="img">
            <img :src="item.picture | filter" alt="">
          </div>
          <div class="title">{{item.title}}</div>
          <div class="edit">
            已抢2630次，至少开奖60次
          </div>
          <div class="btn">立即夺宝</div>
        </li>
      </template>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'list',
  props: {
    list: {
      type: Object,
      default: () =>({})
    }
  },
  computed: {
    showList() {
      return this.list.length
    }
  }
}
</script>
<style lang="less" scoped>
*{
  box-sizing: border-box;
}
.list {
  padding: .4rem;
  ul {
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    li {
      background: #FEF3E8;
      border-radius: .16rem;
      margin-bottom: .21rem;
      &.hot {
        display: flex;
        justify-content: flex-start;
        padding: .33rem .3rem;
        width: 100%;
        flex: 1;
        .img {
          position: relative;
          height: 1.78rem;
          width: 2.22rem;
          border-right: 1px solid #7F603B;
          img {
            vertical-align: top;
            margin-top: .13rem;
            width: 2.03rem;
            height: 1.51rem;
          }
        }
        .text {
          position: relative;
          padding-left: .22rem; 
          .title {
            margin-bottom: .1rem;
            font-size: .32rem;
            font-weight: bold;
            color: #404040;
          }
          .desc {
            margin-bottom: .19rem;
            font-size: .22rem;
            color: #404040;
          }
          .edit {
            margin-bottom: .27rem;
            font-size: .22rem;
            color: #818181;
          }
          .count-down {
            width: 1.96rem;
            line-height: .3rem;
            font-size: .22rem;
            color: #FF4141;
          }
          .btn {
            position: absolute;
            left: 2.18rem;
            top: 1.28rem;
            width: 1.4rem;
            height: .56rem;
            line-height: .56rem;
            background: #FF4141;
            text-align: center;
            line-height: .56rem;
            border-radius: .16rem;
            font-size: .24rem;
            color: #fff;
          }
        }
      }
      &.item {
        margin-right: .19rem;
        padding: .16rem .24rem;
        width: 3.1rem;
        &:nth-of-type(odd) {
          margin-right: 0;
        }
        .count-down {
          font-size: .22rem;
          color: #FF4141;
          text-align: center;
        }
        .img {
          margin: 0 auto .21rem;
          padding: .22rem 0 .19rem;
          width: 2.45rem;
          border-bottom: 1px solid #7F603B;
          text-align: center;
          img {
            vertical-align: top;
            width: 1.84rem;
            height: .92rem;
          }
        }
        .title {
          margin-bottom: .19rem;
          text-align: center;
          font-size: .32rem;
          color: #404040;
          font-weight: Bold;
        }
        .edit {
          margin-bottom: .2rem;
          text-align: center;
          font-size: .22rem;
          color: #818181;
        }
        .btn {
          margin: 0 auto;
          width: 1.4rem;
          height: .56rem;
          line-height: .56rem;
          background: #FF4141;
          text-align: center;
          line-height: .56rem;
          border-radius: .16rem;
          font-size: .24rem;
          color: #fff;
        }
      }
    }
  }
}
</style>