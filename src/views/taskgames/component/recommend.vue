<template>
  <div class="sdk-recommend" v-if="showRecommend">
    <div class="recommend-img" @click="showConfirm">
      <img src="../images/recommend-img.jpg" alt="">
    </div>
    <h4 class="crush-master-task" v-if="showTitle">成就任务</h4>
    <div class="mask" v-if="confirm"></div>
    <transition name="fade">
      <div class="confirm" v-if="confirm">
        <div class="title">
          温馨提示
          <div class="closed" @click="hideConfirm"></div>
        </div>
        <div class="content">
          即将离开当前游戏<br>
          是否前往参与活动?
        </div>
        <div class="btn">
          <div class="cancel-btn" @click="hideConfirm">
            取消
          </div>
          <div class="confirm-btn" @click="jump">
            确认
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'recommend',
  props: {
	showCrushMasterTask: {
	  type: Boolean,
      default: false
    },
	showKingTask: {
	  type: Boolean,
      default: false
    },
	currentGameType: {
	  default: 0
    },
	newUser: {
	  type: Object,
      default: () => ({
		isNew: false
	  })
    }
  },
  data: () => ({
    confirm: false,
    endTime: 0
  }),
  methods: {
    showConfirm () {
      GLOBALS.marchSetsPoint('A_H5PT0061000781')
      this.confirm = true
    },
    hideConfirm () {
	  GLOBALS.marchSetsPoint('A_H5PT0061000783')
	  this.confirm = false
    },
    getEndTime () {
      let url = 'https://ops-api.beeplay123.com/ops/api/plant-food/user-info'
      this.axios.post(url).then(res => {
        this.endTime = (res.data && res.data.data && res.data.data.settleTime) || 0
      })
    },
    async jump () {
	  await GLOBALS.marchSetsPoint('A_H5PT0061000782')
      parent.window.location.href = '//wap.beeplay123.com/moneyTree?time=' + new Date().getTime()
    }
  },
  computed: {
	showRecommend () {
	  return this.currentGameType != 10 && this.currentGameType != 15 && this.newUser && !this.newUser.isNew && this.endTime > 0
	},
    showTitle () {
	  return this.showCrushMasterTask || this.showKingTask
    }
  },
  created () {
    this.getEndTime()
  }
}
</script>

<style scoped lang="less">
.sdk-recommend {
  padding: 0.30rem 0.3rem 0;
  .recommend-img {
    padding-bottom: 1.38rem;
    height: 0;
    overflow: hidden;
    background: #6C2B3C;
    border-radius: 6px;
    img {
      vertical-align: top;
      width: 100%;
    }
  }
  .crush-master-task{
    margin: .3rem 0 0;
    font-size: 0.28rem;
  }
  .mask {
    position: fixed;
    z-index: 9;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0,0,0,.8);
  }
  .confirm {
    padding-bottom: .5rem;
    position: fixed;
    width: 80%;
    left: 10%;
    top: 3.5rem;
    z-index: 10;
    background: #0F1726;
    .title {
      position: relative;
      padding: .27rem;
      font-size: .26rem;
      text-align: center;
      background: #141F33;
      .closed {
        position: absolute;
        top: .3rem;
        right: .24rem;
        width: .2rem;
        height: .2rem;
        background: url("../images/closed.png") no-repeat center center / 100% 100%;
      }
    }
    .content {
      padding: .5rem 0;
      font-size: .24rem;
      text-align: center;
      line-height: .4rem;
    }
    .btn {
      display: flex;
      justify-content: center;
      .confirm-btn,.cancel-btn {
        margin: 0 .2rem;
        width: 1.8rem;
        height: .6rem;
        line-height: .6rem;
        text-align: center;
        border-radius: 4px;
      }
      .confirm-btn {
        background: #EF6F0C;
      }
      .cancel-btn {
        background: #2B3A55;
      }
    }
  }
}
.fade-enter-active{
  animation: fadeAnimation .3s ease-in-out;
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
