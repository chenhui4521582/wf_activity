<template>
  <div class="award">
    <Header title="我的奖品"/>
    <div class="list" v-if="showList">
      <div class="item" v-for="(item, index) in list" :key="index">
        <div class="award-img">
          <img class="inner-img" :src="item.awardsImg | filter" alt="">
        </div>
        <div class="award-text">
          <div class="name">{{item.awardsName}}</div>
          <div class="desc">{{item.remark}}</div>
        </div>
        <div class="award-status">已到账</div>
      </div>
    </div>
    <div class="no-data" v-else>
      <img class="img1" src="../../img/no-data-1.png" alt="">
      <p>
        暂无奖品<br>
        开宝箱可中大奖
      </p>
    </div>
    <div class="btn" @click="goIndex">
      去开宝箱
    </div>
  </div>
</template>
<script>
import Services from '../../services/services'
import _get from 'lodash.get'
export default {
  name: 'award',
  data: () => ({
    list: []
  }),
  computed: {
    showList () {
      return this.list.length
    }
  },
  methods: {
    _getAward () {
      Services.getMyAwardLog().then(res => {
        const {code, data, message} = _get(res, 'data')
        if(code == 200) {
          this.list = data
        }
      })
    },
    goIndex () {
      this.$router.push({
        name: 'index'
      })
    }
  },
  mounted () {
    this._getAward()
  }
}
</script>
<style lang="less" scoped>
.award {
  padding: 1.1rem .24rem .9rem;
  min-height: 100vh;
  background: #F7F7F7;
  .list {
    position: fixed;
    left: .24rem;
    right: .24rem;
    top: 1.1rem;
    bottom: 1.1rem;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    .item{
      margin-bottom: .2rem;
      padding: 0 .24rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 1.3rem;
      background: #fff;
      border-radius: .16rem;
      .award-img {
        margin-right: .1rem;
        width: .8rem;
        height: .8rem;
      }
      .award-text {
        display: flex;
        flex-direction: column;
        .name {
          margin-bottom: .05rem;
          font-size: .24rem;
          color: #000;
        }
        .desc {
          font-size: .24rem;
          color: #888888;
        }
      }
      .award-status {
        margin-left: auto;
        font-size: .24rem;
        color: #BBBBBB;
      }
    }
  }
  .no-data {
    .img1 {
      margin: 3.06rem 0 .1rem 1.7rem;
      width: 3.38rem;
      height: 2.26rem;
    }
    p {
      padding-left: .65rem;
      text-align: center;
      font-size: .24rem;
      color: #BBBBBB;
    }
  }
  .btn{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: .9rem;
    background: #FF4141;
    font-size: .24rem;
    color: #FFFFFF;
    text-align: center;
    line-height: .92rem;
  }   
}
</style>