<template>
  <transition name="scalc">
    <div class="rule" v-if="showHistory">
      <div class="mask"></div>
      <div class="box">
        <div class="title">翻倍记录</div>
        <div class="content">
          <div class="rule-table">
            <div class="rule-title">
              <ul>
                <li>
                  <span>投入</span>
                  <span>翻倍</span>
                  <span>赚取</span>
                </li>
              </ul>
            </div>
            <div class="rule-list">
              <ul v-if="list.length>0">
                <li v-for="(item, index) in list" :key="index">
                  <span>{{item.amount}}</span>
                  <span>{{item.returnRatio}}倍</span>
                  <span>{{item.profit}}金叶</span>
                </li>
              </ul>
              <div class="empty" v-else>
                <img src="../images/empty_icon.png" alt="">
                <p>暂无记录</p>
              </div>
            </div>
          </div>
        </div>
        <div class="closed" @click="hideHistory"></div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'history',
  props: {
    showHistory: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      list: []
    }
  },
  watch: {
    showHistory (val) {
      this.getList()
    }
  },
  methods: {
    hideHistory () {
      this.$emit('hideHistory')
    },
    getList () {
      this.axios.post('//ops-api.beeplay123.com/ops/api/leafswheel/getPlayRecord').then(data => {
        let params = data.data
        if (params.code === 200) {
          this.list = params.data
        }
      })
    }
  },
  mounted () {
    this.getList()
  }
}
</script>



<style scoped lang="less">
.rule {
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  z-index: 10;
  .mask {
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.6);
  }
  .box {
    position: absolute;
    left: 50%;
    top: 42%;
    transform: translate(-50%, -50%);
    width: 5.7rem;
    .title {
      height: 0.82rem;
      line-height: 0.82rem;
      text-align: center;
      color: #fdbe68;
      font-size: 0.36rem;
      background: #a8232c;
      font-weight: bold;
      border-radius: 10px 10px 0 0;
    }
    .content {
      border-radius: 0 0 10px 10px;
      background: #fdbe68;
      min-height: 5.44rem;
      .rule-table {
        text-align: center;
        .rule-title {
          font-size: 0.24rem;
          color: #f4e19e;
          background: rgba(194, 95, 52, 0.8);
          height: 0.54rem;
          line-height: 0.54rem;
          li {
            display: flex;
            justify-content: center;
            align-items: center;
            span {
              flex: 1;
            }
          }
        }
        .rule-list {
          font-size: 0.2rem;
          color: #ce723e;
          li {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 0.38rem;
            line-height: 0.38rem;
            border-bottom: 1px solid #ce723e;
            span {
              flex: 1;
              height: 0.38rem;
              line-height: 0.38rem;
            }
          }
          .empty {
            padding: 0.82rem;
            img {
              width: 1.26rem;
              height: 1.26rem;
            }
            p {
              margin-top: 0.32rem;
              font-size: 0.3rem;
              font-weight: bold;
            }
          }
        }
      }
    }
    .closed {
      position: absolute;
      bottom: -1rem;
      left: 50%;
      margin-left: -0.3rem;
      width: 0.6rem;
      height: 0.6rem;
      background: url("../images/closed_icon.png") no-repeat center center /
        100% 100%;
    }
  }
}
.scalc-enter-active {
  animation: fadeAnimation 0.3s ease-in-out;
}
@keyframes fadeAnimation {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
