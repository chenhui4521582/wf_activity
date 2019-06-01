<template>
  <section>
    <ul class="t-items">
      <li v-for="(item, index) in mowangList">
        <div :class="{'actived': item.taskStatus == 2}" style="display: flex;align-items: center;flex:1">
          <div class="pic">
            <img :src="item.awardsImage | filter" alt="">
          </div>
          <div class="item-text">
            <div class="title">
              <img src="../img/mowang-text.png" alt="">
              <p>（人人视频用户专属）</p>
            </div>
            <div class="percent-container">
              <div class="percent-box">
                <em :style="{width:item.finishNum/item.taskOps * 100 + '%'}"></em>
              </div>
            </div>
            <div class="new-item-award">
              <p>{{item.finishNum}}/{{item.taskOps}}</p>
              <p>连续7天玩游戏</p>
            </div>
          </div>
        </div>
        <p class="btn-box">
          <a href="javascript:" class="btn btn-receive" v-if="item.taskStatus == 0" @click="receive(item,'mowangTask')">领取</a>
          <a href="javascript:" class="btn btn-play" v-if="item.taskStatus == 1" @click="goFinishs(item, index)">去完成</a>
          <a href="javascript:" class="btn btn-gray" v-if="item.taskStatus == 2">已领取</a>
        </p>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: '',
  components: {

  },
  computed: {

  },
  watch: {

  },
  data () {
    return {
      mowangList: {}
    }
  },
  methods: {
    getitem () {
      this.axios.post('//platform-api.beeplay123.com/task/api/usertask/platCommonTaskByBatch', {
        value: 'renrenMedal'
      }).then((res) => {
        if (res.data.code == 200) {
          this.mowangList = res.data.data
        }
      })
    }
  },
  mounted () {
    this.getitem()
  },
  destroyed () {

  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.t-items {
  margin: 0 auto;

  li {
    height: 0.9rem;
    background: url("../img/mowang-bg.png") no-repeat center / 100% 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    margin-bottom: 0.2rem;
    border-radius: 0.04rem;
  }
  .pic {
    min-width: 0.58rem;
    width: 0.58rem;
    height: 0.68rem;
    float: left;
    margin: 0 0.13rem 0 0.16rem;

    img {
      min-width: 0.58rem;
      width: 0.58rem;
      height: 0.68rem;
      filter: drop-shadow(0 0 0.08rem #d38b55);
    }
  }

  .item-text {
    flex: 1;
    .title {
      font-size: 0;
      img {
        width: 1.28rem;
        height: 0.2rem;
        vertical-align: bottom;
      }
      p {
        vertical-align: bottom;
        display: inline-block;
        font-size: 0.16rem;
        color: #23190d;
      }
    }
  }

  .percent-container {
    margin-top: 0.1rem;
    margin-bottom: 0.06rem;
    display: flex;
    align-items: center;
    .percent-box {
      width: 2.4rem;
      height: 0.1rem;
      background: #0f1726;
      border-radius: 0.06rem;
      position: relative;
      float: left;
      margin-right: 0.1rem;
      em {
        height: 100%;
        max-width: 100% !important;
        background: #c7875b;
        position: absolute;
        left: 0;
        top: 0;
        border-radius: 0.06rem;
      }
    }
  }
  .new-item-award {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 2.4rem;
    font-size: 0.14rem;
    color: #624e42;
    p {
      height: 0.24rem;
      text-align: center;
    }

    span {
      font-size: 0.2rem;
      color: #f1e3d7;
      white-space: nowrap;
    }
  }
  .btn-box {
    margin-right: 0.16rem;
    width: 0.9rem;
    .btn {
      margin: 0 auto;
      display: block;
      width: 0.8rem;
      height: 0.4rem;
      line-height: 0.4rem;
      border-radius: 0.08rem;
      text-align: center;
      font-size: 0.2rem;
      color: #fff;
      &.btn-play {
        background: #ffc178;
        color: #782e01;
      }
      &.btn-receive {
        background: #dc4901;
        color: #fff;
      }
      &.btn-gray {
        background: #7b5c46;
        color: #e6d2c3;
      }
    }
  }
}
</style>
