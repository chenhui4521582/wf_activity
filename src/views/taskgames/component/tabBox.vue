<template>
  <div class="sdk-tab-box">
    <ul class="tabs">
      <li class="tab_item" :class="{'actived':isActived === item.name}" v-for="(item,index) in tabList" :key="index" @click="changeTab(item.name)"><img :src="require('../images/'+item.name+(isActived === item.name?'_actived':'')+'.png')" alt="">{{item.label}}</li>
    </ul>
    <template>
      <h4 class="crush-master-task">成就任务</h4>
      <slot>
      </slot>
    </template>
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
  data () {
    return {
      isActived: 'tasks',
      tabList: [{ label: '任务', name: 'tasks' }, { label: '活动', name: 'activities' }],
    }
  },
  methods: {
  },
  computed: {
  },
  created () {
  }
}
</script>

<style scoped lang="less">
.sdk-tab-box {
  padding: 0.3rem 0.3rem 0;
  .recommend-img {
    padding-bottom: 1.38rem;
    height: 0;
    overflow: hidden;
    background: #6c2b3c;
    border-radius: 6px;
    img {
      vertical-align: top;
      width: 100%;
    }
  }
  .crush-master-task {
    margin: 0.3rem 0 0;
    font-size: 0.28rem;
  }
  .mask {
    position: fixed;
    z-index: 9;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.8);
  }
  .confirm {
    padding-bottom: 0.5rem;
    position: fixed;
    width: 80%;
    left: 10%;
    top: 3.5rem;
    z-index: 10;
    background: #0f1726;
    .title {
      position: relative;
      padding: 0.27rem;
      font-size: 0.26rem;
      text-align: center;
      background: #141f33;
      .closed {
        position: absolute;
        top: 0.3rem;
        right: 0.24rem;
        width: 0.2rem;
        height: 0.2rem;
        background: url("../images/closed.png") no-repeat center center / 100%
          100%;
      }
    }
    .content {
      padding: 0.5rem 0;
      font-size: 0.24rem;
      text-align: center;
      line-height: 0.4rem;
    }
    .btn {
      display: flex;
      justify-content: center;
      .confirm-btn,
      .cancel-btn {
        margin: 0 0.2rem;
        width: 1.8rem;
        height: 0.6rem;
        line-height: 0.6rem;
        text-align: center;
        border-radius: 4px;
      }
      .confirm-btn {
        background: #ef6f0c;
      }
      .cancel-btn {
        background: #2b3a55;
      }
    }
  }
}
.fade-enter-active {
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
